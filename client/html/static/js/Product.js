import {v4 as uuid} from 'uuid';

export default class Product {
  init(container) {
    this.container = container;
    this.render();
  }

  render() {
    this.container.innerHTML = this.markup(this);
    this.addBtn = this.container.querySelector('#add-btn');
    this.subBtn = this.container.querySelector('#sub-btn');
    this.addEventListeners();
  }

  addEventListeners() {
    this.addBtn.onclick = this.onAddToCart;
    this.subBtn.onclick = this.onSubToCart;
  }

  onAddToCart(event) {
    console.log({event});
  }

  getStock() {
    const stock = parseInt(this.product['stock']);
    return stock === 0 ? 'OUT' : stock;
  }

  isOutOfStock() {
    const stock = this.getStock();
    if (stock === 'OUT') {
      return 'disabled grey lighten-2';
    }
    return '';
  }

  markup() {
    return `
            <div class="col xl4 l6 m12 s12">
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
                  <span class="">Stock: <b id="stock">${this.getStock()}</b></span>
                  <div>
                    <a id="add-btn" class="btn-floating waves-effect waves-light red ${this.isOutOfStock()}"
                      ><i class="material-icons">add</i></a
                    >
                    <a id="sub-btn" class="btn-floating waves-effect waves-light red ${this.isOutOfStock()}"
                      ><i class="material-icons">remove</i></a
                    >
                  </div>
                </div>
              </div>
            </div>
    `;
  }

  constructor(container, product) {
    // The constructor should only contain the boiler plate code for finding or creating the reference.
    if (typeof container.dataset.ref === 'undefined') {
      this.ref = uuid();
      this.product = product;
      Product.refs[this.ref] = this;
      container.dataset.ref = this.ref;
      this.init(container);
    } else {
      // If this element has already been instantiated, use the existing reference.
      return Product.refs[container.dataset.ref];
    }
  }
}

Product.refs = {};
