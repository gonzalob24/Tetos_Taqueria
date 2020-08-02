import Search from "./models/Search";
import * as searchView from "./views/searchViews";
import * as recipeView from "./views/recipeView";
import { elements, renderLoader, clearLoader } from "./views/base";
import Recipe from "./models/recipe";

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
    renderLoader(elements.searchResults);
    try {
      // Search for recipes
      await state.search.getResults();
      clearLoader();
      // Render results on UI
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert('Problem with the search...');
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevents window from loading
  controlSearch();
});

// TESTING//
// window.addEventListener('load', (e) => {
//   e.preventDefault(); // prevents window from loading
//   controlSearch();
// });


/**
 * RECIPE CONTROLLER
 */

// hashchange helps with geting id from browser
const controlRecipe = async () => {
  // Get ID from URL 
  const id = window.location.hash.replace('#', '');
  console.log(id);

  if (id) {
    // preapre UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);
    // create new recipe object
    state.recipe = new Recipe(id);

    //TESTING
    // window.r = state.recipe;

    try {
      // Get recipe
      await state.recipe.getRecipe();
      console.log(state.recipe.ingredients)
      state.recipe.parseIngredients();
      // Calculate serving and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);
      console.log(state.recipe);
    } catch (error) {
      alert('Problem in processing recipe')
    }
  }
}

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));



// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// const recipe = new Recipe(47746);
// recipe.getRecipe();
// console.log(recipe);
// https://forkify-api.herokuapp.com/api/search?q=pizza
// Currently I am going to build the app with a free API that does not use proxy or key

// TEST CODE
// import string from './models/Search';

// //import { add as a , multiply as mul, ID } from './views/searchViews';
// import * as searchView from './views/searchViews';

// console.log(`Using imported functions. ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${string}`);
