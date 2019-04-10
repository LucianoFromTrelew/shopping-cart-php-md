import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import customFetch from '../shared/js/fetch';

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
      console.log({products});
      document.querySelector('#spinner').classList.add('scale-out');
      document.querySelectorAll('li.logout-link').forEach(el => {
        el.classList.remove('hide');
      });
      products.forEach((product, i) => {
        const productTemplate = document.getElementById('product-card');

        setTimeout(() => {
          // pasando un `true` hace un deep clone
          const newProduct = productTemplate.cloneNode(true);
          newProduct.classList.remove('hide');
          newProduct.querySelector('.card-title').innerHTML = product['name'];
          newProduct.querySelector('.card-image img').src = product['imageUrl'];
          newProduct.querySelector('.card-content span').innerHTML =
            product['description'];
          newProduct.querySelector('#price').innerHTML = `$${product['price']}`;
          const stock = getStock(product['stock']);
          newProduct.querySelector('#stock').innerHTML = stock;
          if (stock === 'OUT') {
            const card = newProduct.querySelector('.card');
            card.classList.add('disabled');
            card.classList.add('grey');
            card.classList.add('lighten-2');
          }
          productTemplate.parentNode.appendChild(newProduct);
        }, 1000 * (i + 1));
      });
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
