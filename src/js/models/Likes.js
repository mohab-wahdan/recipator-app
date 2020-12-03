export default class likes {
  constructor() {
    this.likes = [];
  }
  addLike(id, title, author, image) {
    const like = {
      id,
      title,
      author,
      image
    };
    this.likes.push(like);
    //presist likes
    this.presistData();
    return like;
  }
  deleteLike(id) {
    const idIndex = this.likes.findIndex(el => el.id === id);
    this.likes.splice(idIndex, 1);
    //presist likes
    this.presistData();
  }
  isLiked(id) {
    return this.likes.findIndex(el => el.id === id) !== -1;
  }
  getNumberOfLikes() {
    return this.likes.length;
  }
  presistData() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  }
  readStorageData() {
    const storedLikes = JSON.parse(localStorage.getItem('likes'));
    //restore date from Lokal storage
    if (storedLikes) this.likes = storedLikes;
  }
}
