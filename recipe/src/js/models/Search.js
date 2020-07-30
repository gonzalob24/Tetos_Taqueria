import axios from 'axios'; // works with all browsers

export default class Serach {
    constructor(query) {
        this.query = query;
    }

    // async function to get results from api call
    async getResults() {
        // const proxy = 'https://cors-anywhere.herokuapp.com'
        // const key = ''; // I dont need a key with thi API
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            this.result = result.data.recipes;
            // console.log(this.result);
        } catch (error) {
            alert(error);
        }
    }
}