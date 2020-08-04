import Search from "./models/Search";
import * as searchView from "./views/searchViews";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import { elements, renderLoader, clearLoader } from "./views/base";
import Recipe from "./models/recipe";
import List from './models/List';
import Likes from './models/Likes';
import * as likesView from './views/likesView';


/** Global state of the app
 * - search object
 * - current recipe object
 * - Shopping list object
 * - Linked recipe
 */
const state = {};
// window.state = state;
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
            alert("Problem with the search...");
            clearLoader();
        }
    }
};

elements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault(); // prevents window from loading
    controlSearch();
});

// FOR TESTING//
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
    const id = window.location.hash.replace("#", "");
    // console.log(id);

    if (id) {
        // preapre UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) {
            searchView.highlightSelected(id);
        }
        // create new recipe object
        state.recipe = new Recipe(id);

        //TESTING
        // window.r = state.recipe;

        try {
            // Get recipe
            await state.recipe.getRecipe();
            // console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();
            // Calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe, state.like.isItemLiked(id));
            // console.log(state.recipe);
        } catch (error) {
            console.log(error);
            alert("Problem in processing recipe");
        }
    }
};

["hashchange", "load"].forEach((event) =>
    window.addEventListener(event, controlRecipe)
);

/**
 * LIST CONTROLLER
 */
const controlList = () => {
    // create new list if there is no list
    if (!state.list) {
        state.list = new List();
    }
    // Add each ingredient to the list
    state.recipe.ingredients.forEach(ingred => {
        const items = state.list.addItem(ingred.count, ingred.units, ingred.ingredients);
        listView.renderItems(items);
    });
};


// delete and update list items

elements.shoppingList.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // delte item
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // Delete from the state object
        state.list.removeItem(id);
        // Delete from UI
        listView.deleteItems(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const value = parseFloat(e.target.value);
        state.list.updateCount(id, value);
    }
});

/**
 * LIKE CONTROLLER
 */

const controlLike = () => {
    if (!state.like) {
        state.like = new Likes();
    }
    const currentID = state.recipe.id;

    // User has not like recipe
    if (!state.like.isItemLiked(currentID)) {
        // Add like to state object
        const newLike = state.like.addLike(
            currentID,
            state.recipe.title,
            state.recipe.author,
            state.recipe.image
        );
        // Toggle like button
        likesView.showHideLikeButton(true);

        // add like to UI list
        likesView.renderLike(newLike);
        // console.log(state.like);

        // User has liked recipe   
    } else {
        // Remove like from state object
        state.like.removeLikedItem(currentID);

        // Toggle like button
        likesView.showHideLikeButton(false);

        // Remove like from UI list
        likesView.removeLike(currentID);
        // console.log(state.like);
    }
    // likesView.showLikeMenue(state.like.getLikes());
};

// When the page loads
window.addEventListener('load', () => {
    state.like = new Likes();
    state.like.readStorage();
    likesView.showLikesMenue(state.like.getLikes());
    state.like.likes.forEach(like => likesView.renderLike(like));
});

// recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // decrease servings
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase servings
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
    // console.log(state.recipe);
});

// window.l = new List();
// window.addEventListener('hashchange', ntrolRecipe);
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
