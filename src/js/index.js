import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import { elements, adjustLoader, clearloader } from './views/base';
import likes from './models/Likes';
/**global state of the app
 * -search object
 * -current recipe object
 * -shopping list object
 * -liked recipes
 */
const state = {};

/**
 * the search controller
 */
const ctrlSearch = async () => {
  //1-get query from view
  const quiry = searchView.getInput();
  if (quiry) {
    //2-new search object and add it to state
    state.search = new Search(quiry);

    //3- prepare ui for results
    adjustLoader(elements.searchResult);
    state.search.clearResult();
    searchView.clearSearch();
    try {
      //4-search for the recipes
      await state.search.getResult();
      //5-render results on ui
      clearloader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      alert('something went wrong!');
      clearloader();
    }
  }
};

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  ctrlSearch();
});

elements.searchButtonsContainer.addEventListener('click', e => {
  const button = e.target.closest('.btn-inline');
  if (button) {
    const goToPage = parseInt(button.dataset.goto, 10);
    state.search.clearResult();
    searchView.renderResults(state.search.result, goToPage);
    console.log(goToPage);
  }
});

/**
 * the recipe controller
 */

const ctrlRecipe = async () => {
  //get id from url
  const id = window.location.hash.replace('#', '');
  if (id) {
    //prepare ui for changes
    recipeView.clearRecipe();
    adjustLoader(elements.recipe);
    if (state.recipe) recipeView.highlightSelected(id);

    //create new recipe object
    state.recipe = new Recipe(id);
    try {
      //get recipe data
      await state.recipe.getRecipe();
      //render result
      clearloader();
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      alert('error loading recipe!');
      console.log(error);
    }
  }
};
['load', 'hashchange'].forEach(event =>
  window.addEventListener(event, ctrlRecipe)
);
/**
 * the List controller
 */
const ctrlList = () => {
  //create list object if there is not
  if (!state.list) state.list = new List();

  //add ingredients to list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.amount, el.name, el.unit);
    listView.renderItem(item);
  });
};
//update and delete list buttons
elements.shoppingList.addEventListener('click', event => {
  const id = event.target.closest('.shopping__item').dataset.itemid;
  if (event.target.matches('.shopping__delete , .shopping__delete *')) {
    state.list.deleteItem(id);
    listView.deleteItem(id);
  } else if (event.target.matches('.shopping__count-value')) {
    const value = parseFloat(event.target.value, 10);
    state.list.updateAmount(id, value);
  }
});

/**
 * the likes controller
 */

const ctrlLike = () => {
  if (!state.likes) state.likes = new likes();
  //not liked

  if (!state.likes.isLiked(state.recipe.id)) {
    //add to likes
    const newLike = state.likes.addLike(
      state.recipe.id,
      state.recipe.title,
      state.recipe.author,
      state.recipe.image
    );
    //toggle love button
    likesView.toggleLikeButton(true);
    //add it to ui
    likesView.renderLike(newLike);
  } else {
    //remove from likes
    state.likes.deleteLike(state.recipe.id);
    //toggle love button
    likesView.toggleLikeButton(false);
    //remove it from ui
    likesView.deleteLike(state.recipe.id);
  }
  likesView.toggleLikemenu(state.likes.getNumberOfLikes());
};
//handle the likes list when reloading page
window.addEventListener('load', () => {
  state.likes = new likes();
  state.likes.readStorageData();
  likesView.toggleLikemenu(state.likes.getNumberOfLikes());
  state.likes.likes.forEach(like => {
    likesView.renderLike(like);
  });
});

//recipe buttons
elements.recipe.addEventListener('click', event => {
  if (event.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      //decrease amount
      state.recipe.updateServings('dec');
      recipeView.updateServings_ingredients(state.recipe);
    }
  } else if (event.target.matches('.btn-increase, .btn-increase *')) {
    if (state.recipe.servings < 100) {
      //increase amount
      state.recipe.updateServings('inc');
      recipeView.updateServings_ingredients(state.recipe);
    }
  } else if (event.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    ctrlList();
  } else if (event.target.matches('.recipe__love, .recipe__love *')) {
    ctrlLike();
  }
});
