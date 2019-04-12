import {v4 as uuid} from 'uuid';
import customFetch from '/static/js/fetch';
import Product from '/static/js/Product';

export default class ProductCard extends Product {
  markup() {
    return `
            <div id="product-component" class="col xl4 l6 m12 s12">
              <div class="card ${this.isOutOfStock()}">
                <div class="card-image">
                  <img src="${this.product['imageUrl']}" />
                  <span class="card-title pink lighten-2">${
                    this.product['name']
                  }</span>
                </div>
                <div class="card-content">
                  <span class="truncate">${this.product['description']}</span>
                </div>
                <div class="card-action">
                  <b><span id="price" class="orange-text">$${
                    this.product['price']
                  }</span></b>
                  <span class="">Stock: <b id="stock">${
                    this.getStock() === 0 ? 'OUT' : this.getStock()
                  }</b></span>
                  <div>
                    <a id="add-btn" class="btn-floating waves-effect waves-light red ${this.isOutOfStock()}"
                      ><i class="material-icons">add</i></a
                    >
                    <a id="sub-btn" class="btn-floating waves-effect waves-light red"
                      ><i class="material-icons">remove</i></a
                    >
                  </div>
                </div>
              </div>
            </div>
    `;
  }
  constructor(container, product) {
    /*
     * container => element container
     * product => product to display
     * emitts `product-added` event on add button click
     * emitts `product-substracted` event on sub button click
     * */ // The constructor should only contain the boiler plate code for finding or creating the reference.
    super();
    if (typeof container.dataset.ref === 'undefined') {
      this.ref = uuid();
      this.product = product;
      ProductCard.refs[this.ref] = this;
      container.dataset.ref = this.ref;
      this.init(container);
    } else {
      // If this element has already been instantiated, use the existing reference.
      return ProductCard.refs[container.dataset.ref];
    }
  }
}
ProductCard.refs = {};
