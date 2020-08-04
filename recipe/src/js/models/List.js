import uniqid from 'uniqid';

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, units, ingredients) {
        const item = {
            id: uniqid(), // create a inique ide for each item in list of objects
            count,
            units,
            ingredients
        };
        this.items.push(item);
        return item;
    }

    removeItem(id) {
        const index = this.items.findIndex(item => item.id === id);
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        this.items.find(item => item.id === id).count = newCount;
    }
}