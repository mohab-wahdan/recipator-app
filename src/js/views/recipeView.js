import { elements } from './base';
import { Fraction } from 'fractional';

const formatAmount = amount => {
  if (amount) {
    const [int, decimal] = amount
      .toString()
      .split('.')
      .map(el => parseInt(el, 10));
    if (!decimal) return amount;
    if (int === 0) {
      const fraction = new Fraction(amount);
      return `${fraction.numerator}/${fraction.denominator}`;
    } else {
      const fraction = new Fraction(amount - int);
      return `${int} ${fraction.numerator}/${fraction.denominator}`;
    }
  }
};
export const clearRecipe = () => {
  elements.recipe.innerHTML = '';
};
export const highlightSelected = id => {
  const allHighlighted = Array.from(
    document.querySelectorAll('.results__link')
  );
  if (allHighlighted.length > 1) {
    allHighlighted.forEach(el => {
      el.classList.remove('results__link--active');
    });
    document
      .querySelector(`.results__link[href="#${id}"]`)
      .classList.add('results__link--active');
  }
};
const createIngredient = ingredient =>
  `
                    <li class="recipe__item">
                        <svg class="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__count">${formatAmount(
                          ingredient.amount
                        )}</div>
                        <div class="recipe__ingredient">
                            <span class="recipe__unit">${ingredient.unit}</span>
                            ${ingredient.name}
                        </div>
                    </li>
`;
export const renderRecipe = (recipe, isLiked) => {
  const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.image}" alt="${
    recipe.title
  }" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${
                      recipe.cockingTime
                    }</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${
                      recipe.servings
                    }</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#${
                          isLiked ? 'icon-heart' : 'icon-heart-outlined'
                        }"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                ${recipe.ingredients
                  .map(element => createIngredient(element))
                  .join('')}
                    
                </ul>

                <button class="btn-small recipe__btn--add">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${
                      recipe.author
                    }</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${
                  recipe.url
                }" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `;
  elements.recipe.insertAdjacentHTML('afterbegin', markup);
};
export const updateServings_ingredients = recipe => {
  document.querySelector('.recipe__info-data--people').textContent =
    recipe.servings;
  const ingredients = Array.from(document.querySelectorAll('.recipe__count'));
  ingredients.forEach((ing, i) => {
    ing.textContent = formatAmount(recipe.ingredients[i].amount);
  });
};
