import Search from "./models/Search";
import * as searchView from "./views/searchViews";
import { elements } from "./views/base";
import Recipes from "./models/recipe";

/** Global state of the app
 * - search object
 * - current recipe object
 * - Shopping list object
 * - Linked recipe
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
  // get query from the view
  const query = searchView.getInput();

  if (query) {
    // New search object and add it to state
    state.search = new Search(query);

    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResultsList();

    // Search for recipes
    await state.search.getResults();

    // Render results on UI
    searchView.renderResults(state.search.result);
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevents window from loading
  controlSearch();
});

/**
 * RECIPE CONTROLLER
 */

const recipe = new Recipes(47746);
recipe.getRecipe();
console.log(recipe);
// https://forkify-api.herokuapp.com/api/search?q=pizza
// Currently I am going to build the app with a free API that does not use proxy or key

// TEST CODE
// import string from './models/Search';

// //import { add as a , multiply as mul, ID } from './views/searchViews';
// import * as searchView from './views/searchViews';

// console.log(`Using imported functions. ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${string}`);
