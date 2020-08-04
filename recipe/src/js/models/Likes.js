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
}