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
          html: 'Product added to your cart successfully',
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
          html: `Unable to add the product to your cart :/ [${err}]`,
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
          html: 'Product removed from your cart successfully',
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
          html: `Unable to remove the product from your cart :/ [${err}]`,
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
    throw new TypeError(
      'Abstract class "Product" cannot be instantiated directly',
    );
  }
  constructor(container, product) {
    if (this.constructor === Product) {
      throw new TypeError(
        'Abstract class "Product" cannot be instantiated directly',
      );
    }
  }
}
