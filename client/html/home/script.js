import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import {getProducts} from './getProducts';
import ProductList from '/static/js/ProductList';

const getStock = stock => {
  return parseInt(stock) === 0 ? 'OUT' : parseInt(stock);
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
      document.querySelector('#spinner').classList.add('scale-out');
      // Display logout link
      document.querySelectorAll('li.logout-link').forEach(el => {
        el.classList.remove('hide');
      });

      const productListContainer = document.querySelector('#product-list');
      const productList = new ProductList(productListContainer, products);
      console.log({productList});
    })
    .catch(err => {
      console.log({err});
      // Display login link
      document.querySelectorAll('li.login-link').forEach(el => {
        el.classList.remove('hide');
      });
    });

  document.querySelector('#logout').addEventListener('click', event => {
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
  });
});
