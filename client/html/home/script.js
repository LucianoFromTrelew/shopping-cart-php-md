import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import {getProducts} from './getProducts';
import {
  hideSpinner,
  displayCart,
  displayLogout,
  displayLogin,
  displayNotLoggedInMessage,
  getTotalElementsInCart,
  showElementsInCart,
} from '/static/js/utils';
import {onProductAdded, onProductSubstracted, onLogout} from './events';
import ProductList from '/static/js/ProductList';
import customFetch from '/static/js/fetch';

document.addEventListener('DOMContentLoaded', () => {
  // Iniciando manualmente el modal
  /*
  const elems = document.querySelector(".modal");
  const instances = M.Modal.init(elems, null);
  */

  // O automáticamente
  M.AutoInit();

  document.querySelector('#logout').addEventListener('click', onLogout);

  getProducts()
    .then(products => {
      hideSpinner();
      displayLogout();
      displayCart();

      const productListContainer = document.querySelector('#product-list');
      const productList = new ProductList(
        productListContainer,
        products,
        onProductAdded,
        onProductSubstracted,
      );

      customFetch('/api/')
        .then(res => {
          if (res.status !== 200) {
            throw new Error(`${res.status}: ${res.statusText}`);
          }
          return res.json();
        })
        .then(res => {
          const {cart} = res;
          showElementsInCart(getTotalElementsInCart(cart));
        })
        .catch(err => {
          console.log({err});
        });
    })
    .catch(err => {
      console.log({err});
      displayLogin();
      hideSpinner();
      displayNotLoggedInMessage();
    });
});
