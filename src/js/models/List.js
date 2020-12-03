import uniqid from 'uniqid';
export default class List {
  constructor() {
    this.items = [];
  }

  addItem(amount, name, unit) {
    const item = {
      id: uniqid(),
      name,
      amount,
      unit
    };
    this.items.push(item);
    return item;
  }

  deleteItem(id) {
    const idIndex = this.items.findIndex(el => el.id === id);
    this.items.splice(idIndex, 1);
  }

  updateAmount(id, newAmount) {
    this.items.find(el => el.id === id).amount = newAmount;
  }
}
