import Post from './classPost.js';

class Posts {
  constructor({ posts = [] } = {}) {
    this.posts = posts;
  };

  addPost = (tweet) => {
    this.posts.unshift(new Post(tweet));
  }; 

  deletePost(id) {
    this.posts = this.posts.filter(item => item.id !== id);
  };

  likePost(id) {
    this.posts.forEach(item => {
      if (item.id === id) {
        item.changeLike();
      }
    })
  };
};

export default Posts;