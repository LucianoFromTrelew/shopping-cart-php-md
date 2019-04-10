import {v4 as uuid} from 'uuid';
import customFetch from '/static/js/fetch';

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
    this.addBtn.onclick = this.onAddToCart.bind(this);
    this.subBtn.onclick = this.onSubFromCart.bind(this);
  }

  addToCart() {
    const queryParams = new URLSearchParams();
    queryParams.append('add-product', this.product['id']);
    return customFetch('/api/shopping-cart.php/?' + queryParams, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).then(res => {
      if (res.status !== 200) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      return res.json();
    });
  }

  onAddToCart(event) {
    const stock = this.getStock();
    if (stock === 0) return;

    this.addToCart()
      .then(res => {
        console.log({res});
        this.product['stock'] = stock - 1;

        M.toast({
          html: 'Producto agregado al carrito correctamente',
          classes: 'green rounded',
        });

        const productAddedEvent = this.createAddedEvent();
        productAddedEvent.detail.cart = res.cart;
        this.container.dispatchEvent(productAddedEvent);

        this.render();
      })
      .catch(err => {
        console.log({err});
        M.toast({
          html: `No se pudo agregar el producto al carrito :/ [${err}]`,
          classes: 'red',
        });
      });
  }

  subFromCart() {
    const queryParams = new URLSearchParams();
    queryParams.append('sub-product', this.product['id']);
    return customFetch('/api/shopping-cart.php/?' + queryParams, {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
    }).then(res => {
      if (res.status !== 200) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      return res.json();
    });
  }

  onSubFromCart(event) {
    this.subFromCart()
      .then(res => {
        console.log({res});
        this.product['stock'] = this.getStock() + 1;

        M.toast({
          html: 'Producto eliminado del carrito correctamente',
          classes: 'yellow darken-2 rounded pink-text',
        });

        const productSubstractedEvent = this.createSubstractedEvent();
        productSubstractedEvent.detail.cart = res.cart;
        this.container.dispatchEvent(productSubstractedEvent);

        this.render();
      })
      .catch(err => {
        console.log({err});
        M.toast({
          html: `No se pudo eliminar el producto del carrito; [${err}]`,
          classes: 'red',
        });
      });
  }
  createAddedEvent() {
    return new CustomEvent('product-added', {
      bubbles: true,
      detail: {
        product: this.product,
      },
    });
  }
  createSubstractedEvent() {
    return new CustomEvent('product-substracted', {
      bubbles: true,
      detail: {
        product: this.product,
      },
    });
  }
  getStock() {
    const stock = parseInt(this.product['stock']);
    return stock;
  }
  isOutOfStock() {
    const stock = this.getStock();
    if (stock === 0) {
      return 'disabled grey lighten-2';
    }
    return '';
  }
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
