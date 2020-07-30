import axios from 'axios'; // works with all browsers

async function getResults(query) {
    // const proxy = 'https://cors-anywhere.herokuapp.com'
    // const key = ''; // I dont need a key with thi API
    try {
        const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${query}`);
        const recipes = result.data.recipes
        console.log(recipes);
    } catch (error) {
        alert(error)
    }
}

getResults("tacos");


// https://forkify-api.herokuapp.com/api/search?q=pizza

// Currently I am going to build the app with a free API that does not use proxy or key






// TEST CODE
// import string from './models/Search';

// //import { add as a , multiply as mul, ID } from './views/searchViews';
// import * as searchView from './views/searchViews';

// console.log(`Using imported functions. ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${string}`);
