import {v4 as uuid} from 'uuid';
import Product from '/static/js/Product';

export default class ProductList {
  set title(title) {
    this.titleValue = title;
    this.render();
  }

  get title() {
    return titleValue;
  }

  init(container) {
    this.container = container;
    this.titleValue = this.container.dataset.title;
    this.render();
  }

  render() {
    this.container.innerHTML = this.markup();

    for (const product of this.products) {
      const container = document.createElement('div');
      new Product(container, product);
      this.container.appendChild(container);
    }
  }

  markup() {
    return `
      <div class="product-list-container"></div>
    `;
  }

  constructor(container, products) {
    // The constructor should only contain the boiler plate code for finding or creating the reference.
    if (typeof container.dataset.ref === 'undefined') {
      this.ref = uuid();
      this.products = products;
      ProductList.refs[this.ref] = this;
      container.dataset.ref = this.ref;
      this.init(container);
    } else {
      // If this element has already been instantiated, use the existing reference.
      return ProductList.refs[container.dataset.ref];
    }
  }
}

ProductList.refs = {};
