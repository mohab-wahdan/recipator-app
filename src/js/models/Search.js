import axios from 'axios';
import { url, pass } from '../config';
import { elements } from '../views/base';
export default class Search {
  constructor(quiry) {
    this.quiry = quiry;
  }
  async getResult() {
    //const proxy = 'https://cors-anywhere.herokuapp.com/';
    try {
      const response = await axios(
        `${url}search?apiKey=${pass}&query=${this.quiry}&number=30`
      );
      this.result = response.data.results;
      //console.log(this.result);
    } catch (error) {
      alert(error);
    }
  }
  clearResult() {
    elements.searchResultList.innerHTML = '';
    elements.searchButtonsContainer.innerHTML = '';
  }
}
