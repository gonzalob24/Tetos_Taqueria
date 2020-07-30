import { elements } from './base';

// Get input from search field
export const getInput = () => elements.searchInput.value;

// Clear  search field
export const clearInput = () => {
    elements.searchInput.value = "";
};

// Clear left side results list
export const clearResultsList = () => {
    elements.searchResultList.innerHTML = "";
}

// function to add items to list
const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${recipe.title}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    // console.log(recipes);
    recipes.forEach(renderRecipe);
};