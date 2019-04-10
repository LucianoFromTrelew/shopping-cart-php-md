import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import customFetch from '/static/js/fetch';
import ProductList from '/static/js/ProductList';
import Product from '/static/js/Product';

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

  customFetch('/api/products.php/')
    .then(res => {
      if (res.status !== 200) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .then(products => {
      document.querySelector('#spinner').classList.add('scale-out');
      document.querySelectorAll('li.logout-link').forEach(el => {
        el.classList.remove('hide');
      });

      const productListContainer = document.querySelector('#product-list');
      new ProductList(productListContainer, products);
    })
    .catch(err => {
      console.log({err});
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
