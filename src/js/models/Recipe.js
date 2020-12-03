import axios from 'axios';
import { url, pass } from '../config';
export default class recipe {
  constructor(id) {
    this.id = id;
  }
  async getRecipe() {
    try {
      const result = await axios(`${url}${this.id}/information?apiKey=${pass}`);
      this.title = result.data.title;
      this.author = result.data.sourceName;
      this.url = result.data.sourceUrl;
      this.image = result.data.image;
      this.ingredients = result.data.extendedIngredients.map(value => {
        return {
          name: value.name,
          unit: value.unit,
          amount: value.amount.toFixed(1),
          desciption: value.meta
        };
      });
      this.cockingTime = result.data.readyInMinutes;
      this.servings = result.data.servings;
      this.pricePerServing = result.data.pricePerServing;
    } catch (error) {
      console.log(error);
      alert('something went wrong!');
    }
  }

  updateServings(type) {
    const newServing = type === 'inc' ? this.servings + 1 : this.servings - 1;
    this.ingredients.forEach(ing => {
      ing.amount = (ing.amount * (newServing / this.servings)).toFixed(1);
    });
    this.servings = newServing;
  }
}
