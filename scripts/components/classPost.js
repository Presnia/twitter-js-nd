class Post {
  constructor({ id, userName, nickname, postDate, text, img, likes = 0 }) {
    this.id = id || this.generateID();
    this.userName = userName;
    this.nickname = nickname;
    this.postDate = postDate ? this.correctDate(postDate) : new Date();
    this.text = text;
    this.img = img;
    this.likes = likes;
    this.liked = false;
  };

  changeLike() {
    this.liked = !this.liked;
    if(this.liked) {
      this.likes++;
    } else {
      this.likes--;
    }
  };

  generateID() {
    return Math.random().toString(32).substring(2, 9) + (+new Date).toString(32);
  }

  getDate = () => {

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return this.postDate.toLocaleString('ru-RU', options);
  };

  correctDate(date) {
    if(isNaN(Date.parse(date))) {
      console.log('Date is incorrect')
      date = date.replaceAll('.', '/')
    }
    return new Date(date);
  }
};

export default Post;