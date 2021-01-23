import FetchData from './fetchData.js';
import Posts from './classPosts.js';

class Twitter {
  constructor({ 
    user, 
    listElem, 
    modalElems, 
    tweetElems, 
    classDeleteTweet, 
    classLikeTweet, 
    sortElem, 
    showUserPostElem, 
    showLikedPostElem }) {
    const fetchData = new FetchData();
    this.user = user;
    this.tweets = new Posts();
    this.elements = {
      listElem: document.querySelector(listElem),
      sortElem: document.querySelector(sortElem),
      modal: modalElems, 
      tweetElems,
      showUserPostElem: document.querySelector(showUserPostElem),
      showLikedPostElem: document.querySelector(showLikedPostElem),
    }
    this.class = {
      classDeleteTweet,
      classLikeTweet
    };
    this.sortDate = true;
    
    fetchData.getPost()
        .then(data => {
          data.forEach(this.tweets.addPost)
          this.showAllPosts();
        });

        this.elements.modal.forEach(this.handlerModal, this);
        this.elements.tweetElems.forEach(this.addTweet, this);

        this.elements.listElem.addEventListener('click', this.handlerTweet);
        this.elements.sortElem.addEventListener('click', this.changeSort);

        this.elements.showUserPostElem.addEventListener('click', this.showUserPost);
        this.elements.showLikedPostElem.addEventListener('click', this.showLikedPost); 
  }

  renderPosts(tweets) {
    const sortPost = tweets.sort(this.sortFields());
    this.elements.listElem.textContent = '';    
    sortPost.forEach(({ id, 
      userName, 
      nickname, 
      getDate, 
      text, 
      img, 
      likes, 
      liked }) => {
      this.elements.listElem.insertAdjacentHTML('beforeend', `
          <li>
							<article class="tweet">
								<div class="row">
									<img class="avatar" src="images/${nickname}.jpg" alt="Аватар пользователя ">
									<div class="tweet__wrapper">
										<header class="tweet__header">
											<h3 class="tweet-author">${userName}
												<span class="tweet-author__add tweet-author__nickname">@${nickname}</span>
												<time class="tweet-author__add tweet__date">${getDate()}</time>
											</h3>
											<button class="tweet__delete-button chest-icon" data-id="${id}"></button>
										</header>
										<div class="tweet-post">
											<p class="tweet-post__text">${text}</p>
                      ${img ? 
                        `<figure class="tweet-post__image">
                            <img src=${img} alt="${nickname}">
                      </figure>` : 
                      ''}
										</div>
									</div>
								</div>
								<footer>
									<button class="tweet__like ${liked ? this.class.classLikeTweet.active : ''}" data-id="${id}">
										${likes}
									</button>
								</footer>
							</article>
					</li>
      `)
    })
  }

  showUserPost = () => {
    const post = this.tweets.posts.filter(item => item.nickname === this.user.nick);
    this.renderPosts(post);
  }

  showLikedPost = () => {
    const post = this.tweets.posts.filter(item => item.liked);
    this.renderPosts(post);
  }

  showAllPosts() {
    this.renderPosts(this.tweets.posts);
  }

  handlerModal({ button, modal, overlay, close }) {
    const buttonElem = document.querySelector(button); 
    const modalElem = document.querySelector(modal); 
    const overlayElem = document.querySelector(overlay); 
    const closeElem = document.querySelector(close); 

    const openModal = () => {
      modalElem.style.display = 'block';
    }

    const closeModal = (elem, event) => {
      const target = event.target;
      if (target === elem) {
        modalElem.style.display = 'none';
      }      
    }

    buttonElem.addEventListener('click', openModal);
    if (closeElem) {
      closeElem.addEventListener('click', closeModal.bind(null, closeElem));
    }
    if (overlayElem) {
      overlayElem.addEventListener('click', closeModal.bind(null, overlayElem));
    }

    this.handlerModal.closeModal = () => {
      modalElem.style.display = 'none';
    };
  }

  addTweet({ text, img, submit }) {
    const textElem = document.querySelector(text);
    const imgElem = document.querySelector(img);
    const submitElem = document.querySelector(submit);

    let imgUrl = '';
    let tempString = textElem.innerHTML; 

    submitElem.addEventListener('click', () => {
      this.tweets.addPost({
        userName: this.user.name,
        nickname: this.user.nick,
        text: textElem.innerHTML,
        img: imgUrl,
      })
      this.showAllPosts();
      this.handlerModal.closeModal();
      textElem.innerHTML = tempString;
    })

    textElem.addEventListener('click', () => {
      if (textElem.innerHTML === tempString) {
        textElem.textContent = '';
      }
    })

    imgElem.addEventListener('click', () => {
      imgUrl = prompt('Please, enter image address')
    })
  }

  handlerTweet = event => {
    const target = event.target;
    if (target.classList.contains(this.class.classDeleteTweet)) {
      this.tweets.deletePost(target.dataset.id);
      this.showAllPosts();
    }
    
    if (target.classList.contains(this.class.classLikeTweet.like)) {
      this.tweets.likePost(target.dataset.id);
      this.showAllPosts();
    }
  }

  changeSort = () => {
    this.sortDate = !this.sortDate;
    this.showAllPosts();
  }

  sortFields() {
    if (this.sortDate) {
      return (a, b) => {
        const dateA = new Date(a.postDate);
        const dateB = new Date(b.postDate);
        return dateB - dateA;
      }
    } else {
      return (a, b) => b.likes - a.likes; 
    }
  } 
}

export default Twitter;