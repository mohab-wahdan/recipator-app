import { elements } from './base';
export const getInput = () => elements.searchInput.value;
const adjustTitle = (title, limit = 17) => {
  if (limit > title.length) {
    return title;
  }
  title = title.slice(0, limit);
  if (title.includes(' ')) {
    while (!title.endsWith(' ')) {
      title = title.slice(0, title.length - 1);
    }
  }
  return `${title}...`;
};
const renderRecipe = recipe => {
  const markup = `
                <li>
                    <a class="results__link 
                    " href="#${recipe.id}">
                        <figure class="results__fig">
                            <img src="https://spoonacular.com/recipeImages/${
                              recipe.image
                            }" alt="${adjustTitle(recipe.title)}">
                        </figure>
                        <div class="results__data">
                            <h4 class="results__name">${adjustTitle(
                              recipe.title
                            )}</h4>
                            <p class="results__author">${extractHostName(
                              recipe.sourceUrl
                            )}</p>
                        </div>
                    </a>
                </li>
    `;
  elements.searchResultList.insertAdjacentHTML('beforeend', markup);
};
const extractHostName = url => {
  url = new URL(url).hostname;
  return url; //url.slice(0, url.indexOf('.'));
};

const createButton = (page, type) => `
                <button class="btn-inline results__btn--${type}" data-goto=${
  type === 'prev' ? page - 1 : page + 1
}>
                    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${
                          type === 'prev' ? 'left' : 'right'
                        }"></use>
                    </svg>
                </button>
`;
let button;
const renderButtons = (page, numberOfResults, numberPerPage) => {
  const numberOfPages = Math.ceil(numberOfResults / numberPerPage);
  if ((page === 1) & (numberOfPages > 1)) {
    //button to next page
    button = createButton(page, 'next');
  } else if (page < numberOfPages) {
    //both button
    button = `${createButton(page, 'prev')} 
    ${createButton(page, 'next')}`;
  } else if ((page === numberOfPages) & (numberOfPages > 1)) {
    //button to previous page
    button = createButton(page, 'prev');
  }
  elements.searchButtonsContainer.insertAdjacentHTML('afterbegin', button);
};

export const renderResults = (recipes, page = 1, resultPerPage = 10) => {
  //render results of current page
  const start = (page - 1) * resultPerPage;
  const end = page * resultPerPage;
  recipes.slice(start, end).forEach(renderRecipe);
  //render pagination buttons
  renderButtons(page, recipes.length, resultPerPage);
};

export const clearSearch = () => {
  elements.searchInput.value = '';
};
