import Search from './models/Search';

/** Global state of the app
 * - search object
 * - current recipe object
 * - Shopping list object
 * - Linked recipe
 */
const state = {};

const controlSearch = async () => {
    // get query from the view
    const query = 'pizza' // TODO

    if (query) {
        // New search object and add it to state
        state.search = new Search(query);

        // Prepare UI for results

        // Search for recipes
        await state.search.getResults();

        // Render results on UI
        console.log(state.search.result)
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault(); // prevents window from loading
})
const search = new Search('pizza');
console.log(search);
search.getResults();












// https://forkify-api.herokuapp.com/api/search?q=pizza
// Currently I am going to build the app with a free API that does not use proxy or key






// TEST CODE
// import string from './models/Search';

// //import { add as a , multiply as mul, ID } from './views/searchViews';
// import * as searchView from './views/searchViews';

// console.log(`Using imported functions. ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${string}`);
