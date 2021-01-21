class Twitter {
  constructor({ listElem }) {
    this.tweets = new Posts();
    this.elements = {
      listElem: document.querySelector(listElem)
    }

  }

  renderPosts() {

  }

  showUserPost() {

  }

  showLikedPost() {

  }

  showAllPosts() {
    
  }

  openModal() {

  }
}

class Posts {
  constructor({ posts = [] } = {}) {
    this.posts = posts;
  };

  addPost(tweet) {
    const post = new Post(tweet);
    this.tweets.push(post);
  };

  deletePost(id) {

  };

  likePost(id) {

  };
};
class Post {
  constructor(param) {
    this.id = param.id ? param.id : this.generateID();
    this.userName = param.userName;
    this.nickName = param.nickName;
    this.postData = param.postData;
    this.text = param.text;
    this.img = param.img;
    this.likes = param.likes;
    this.like = false;
  };

  changeLike() {
    this.like = !this.liked;
    if(this.like) {
      this.likes++;
    } else {
      this.likes--;
    }
  };

  generateID() {
    return (new Date)
  }
};

const twitter = new Twitter({
  listElem: '.tweet -list'
});

console.log('twitter: ', twitter)
console.log(new Date)