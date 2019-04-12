import {v4 as uuid} from 'uuid';
import customFetch from '/static/js/fetch';
import Product from '/static/js/Product';

export default class ProductItem extends Product {
  markup() {
    return `
        <div class="row">
          <div class="col s12">
            <div class="card-panel grey lighten-5 z-depth-1">
              <div class="row valign-wrapper">
                <div class="col s6 m2 product-image-container">
                  <img src="${
                    this.product['imageUrl']
                  }" alt="Product image" class="product-image responsive-img">
                </div>
                <div class="col s6 m10">
                    <div class="row">
                      <div class="col s12">
                        <h4>
                          ${this.product['name']}
                        </h4>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col 12">
                        <span class="product-description grey-text text-darken-2">
                          ${this.product['description']}
                        </span>
                      </div>
                    </div>
                    <div class="row product-actions">
                      <div class="col s4">
                        <span class="flow-text">Stock: ${
                          this.product['stock']
                        }</span>
                      </div>
                      <div class="col s8 offset-m8 offset-s2">
                        <a id="add-btn" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">add</i></a>
                        <a id="sub-btn" class="btn-floating btn-small waves-effect waves-light red"><i class="material-icons">remove</i></a>
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>

    `;
  }

  onAddToCart(event) {
    this.addToCart()
      .then(res => {
        console.log({res});
        this.product['stock'] = this.getStock() + 1;

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
  onSubFromCart(event) {
    this.subFromCart()
      .then(res => {
        console.log({res});
        this.product['stock'] = this.getStock() - 1;

        if (this.getStock() <= 0) {
          this.container.remove();
        }

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
      ProductItem.refs[this.ref] = this;
      container.dataset.ref = this.ref;
      this.init(container);
    } else {
      // If this element has already been instantiated, use the existing reference.
      return ProductItem.refs[container.dataset.ref];
    }
  }
}
ProductItem.refs = {};
