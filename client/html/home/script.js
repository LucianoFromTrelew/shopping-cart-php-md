import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import {getProducts} from './getProducts';
import ProductList from '/static/js/ProductList';
import customFetch from '/static/js/fetch';

const onProductAdded = event => {
  //console.log(`Agregado al carrito ${event.detail.product['name']}`);
  showElementsInCart(getTotalElementsInCart(event.detail.cart));
};

const onProductSubstracted = event => {
  //console.log('Producto eliminado del carrito');
  //const {detail} = event;
  //console.log({detail});
  showElementsInCart(getTotalElementsInCart(event.detail.cart));
};

const hideSpinner = () => {
  document.querySelector('#spinner').classList.add('scale-out');
};

const displayCart = () => {
  document.querySelectorAll('#shopping-cart-anchor').forEach(el => {
    el.classList.remove('hide');
  });
};

const displayLogout = () => {
  document.querySelectorAll('li.logout-link').forEach(el => {
    el.classList.remove('hide');
  });
};

const displayLogin = () => {
  document.querySelectorAll('li.login-link').forEach(el => {
    el.classList.remove('hide');
  });
};

const getTotalElementsInCart = cart => {
  //Cart is empty
  const values = Object.values(cart);
  if (!values.length) return 0;
  return Object.values(cart).reduce((accum, current) => accum + current);
};

const showElementsInCart = total => {
  if (total) {
    document.querySelectorAll('#cart-elements').forEach(el => {
      el.classList.remove('hide');
      el.innerHTML = total;
    });
  } else {
    document.querySelectorAll('#cart-elements').forEach(el => {
      el.classList.add('hide');
    });
  }
};

const onLogout = event => {
  event.preventDefault();
  customFetch('/api/logout.php/')
    .then(res => res.json())
    .then(msg => {
      M.toast({html: msg.msg});
      setTimeout(
        function() {
          window.location = '/home/';
        }.bind(this),
        1000,
      );
    })
    .catch(err => {
      console.log({err});
    });
};

document.addEventListener('DOMContentLoaded', () => {
  // Iniciando manualmente el modal
  /*
  const elems = document.querySelector(".modal");
  const instances = M.Modal.init(elems, null);
  */

  // O automáticamente
  M.AutoInit();

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
    })
    .catch(err => {
      console.log({err});
      displayLogin();
    });

  customFetch('/api/')
    .then(res => res.json())
    .then(res => {
      const {cart} = res;
      showElementsInCart(getTotalElementsInCart(cart));
    })
    .catch(err => {
      console.log({err});
    });

  document.querySelector('#logout').addEventListener('click', onLogout);
});
