import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import {getShoppingCart} from './getShoppingCart';
import {displayNotProductsMessage} from '/static/js/utils';

import ProductItem from '/static/js/ProductItem';
import ProductList from '/static/js/ProductList';

const onProductEvent = event => {
  console.log('onProductEvent');
  console.log({event});
};

document.addEventListener('DOMContentLoaded', () => {
  M.AutoInit();

  getShoppingCart()
    .then(products => {
      console.log({products});
      const productListContainer = document.querySelector('#product-list');

      const productList = new ProductList(
        productListContainer,
        products,
        ProductItem,
        onProductEvent,
        onProductEvent,
      );
    })
    .catch(err => {
      displayNotProductsMessage();
      console.log({err});
    });
});
