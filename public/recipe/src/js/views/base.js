export const elements = {
    searchForm: document.querySelector(".search"),
    searchInput: document.querySelector(".search__field"),
    searchResultList: document.querySelector(".results__list"),
    searchResults: document.querySelector(".results"),
    searchResultsPages: document.querySelector(".results__pages"),
    recipe: document.querySelector(".recipe"),
    shoppingList: document.querySelector('.shopping__list'),
    likeMenue: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
};

// keep class selecters in one place
export const elementStrings = {
    loader: "loader",
};

export const renderLoader = (parent) => {
    // attach loader as a child element
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
};
