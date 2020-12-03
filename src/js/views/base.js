export const elements = {
  searchForm: document.querySelector('.search'),
  searchInput: document.querySelector('.search__field'),
  searchResultList: document.querySelector('.results__list'),
  searchResult: document.querySelector('.results'),
  searchButtonsContainer: document.querySelector('.results__pages'),
  recipe: document.querySelector('.recipe'),
  shoppingList: document.querySelector('.shopping__list'),
  likesMenu: document.querySelector('.likes__field'),
  likesList: document.querySelector('.likes__list')
};

export const elemStrings = {
  loader: 'loader'
};

export const adjustLoader = parent => {
  const loader = `
    <div class="${elemStrings.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;
  parent.insertAdjacentHTML('afterbegin', loader);
};
export const clearloader = () => {
  const loader = document.querySelector(`.${elemStrings.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
