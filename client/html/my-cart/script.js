import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import {getShoppingCart} from './getShoppingCart';
import {onProductAdd, onProductSub, onCheckoutConfirmClick} from './events';
import {
  displayLogout,
  displayNoProductsMessage,
  enableCheckoutBtn,
  disableCheckoutBtn,
  setLogout,
} from '/static/js/utils';

import ProductItem from '/static/js/ProductItem';
import ProductList from '/static/js/ProductList';

document.addEventListener('DOMContentLoaded', () => {
  M.AutoInit();

  setLogout();
  displayLogout();
  document
    .querySelector('#checkout-confirm-btn')
    .addEventListener('click', onCheckoutConfirmClick);

  getShoppingCart()
    .then(products => {
      enableCheckoutBtn();
      const productListContainer = document.querySelector('#product-list');

      const productList = new ProductList(
        productListContainer,
        products,
        ProductItem,
        onProductAdd,
        onProductSub,
      );
    })
    .catch(err => {
      displayNoProductsMessage();
      console.log({err});
    });
});
