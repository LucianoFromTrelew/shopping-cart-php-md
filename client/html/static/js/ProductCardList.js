import {v4 as uuid} from 'uuid';
import ProductCard from '/static/js/ProductCard';
import ProductList from '/static/js/ProductList';

export default class ProductCardList extends ProductList {
  render() {
    this.container.innerHTML = this.markup();

    for (const i in this.products) {
      const product = this.products[i];
      const container = document.createElement('div');
      this.products[i] = new ProductCard(container, product);
      this.container.appendChild(container);
    }

    this.container.addEventListener(
      'product-added',
      this.onProductAddedHandler,
    );

    this.container.addEventListener(
      'product-substracted',
      this.onProductSubstractedHandler,
    );
  }

  markup() {
    return ``;
  }

  constructor(
    container,
    products,
    onProductAddedHandler,
    onProductSubstractedHandler,
  ) {
    /*
     * container => element container
     * products => products list to display
     * onProductAddedHandler => event handler
     * onProductSubstractedHandler => event handler
     * */

    // The constructor should only contain the boiler plate code for finding or creating the reference.
    super();
    if (typeof container.dataset.ref === 'undefined') {
      this.ref = uuid();
      this.products = products;
      this.onProductAddedHandler = onProductAddedHandler;
      this.onProductSubstractedHandler = onProductSubstractedHandler;
      ProductCardList.refs[this.ref] = this;
      container.dataset.ref = this.ref;
      this.init(container);
    } else {
      // If this element has already been instantiated, use the existing reference.
      return ProductCardList.refs[container.dataset.ref];
    }
  }
}

ProductCardList.refs = {};
