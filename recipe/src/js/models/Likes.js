export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, image) {
        const likeObject = {
            id,
            title,
            author,
            image
        }
        this.likes.push(likeObject);

        // add item to localstorage
        this.persistData();
        return likeObject;
    }

    removeLikedItem(id) {
        const index = this.likes.findIndex(item => item.id === id);
        this.likes.splice(index, 1);
    };

    isItemLiked(id) {
        return this.likes.findIndex(item => item.id === id) !== -1;
    }

    getLikes() {
        return this.likes.length;
    }
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    // read data from localstorage
    readStorage() {
        const data = JSON.parse(localStorage.getItem('likes'));
        if (data) {
            this.likes = data;
        }
    }
}