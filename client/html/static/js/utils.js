import customFetch from './fetch';
import {onLogout} from './events';

const encodeObj = obj => {
  /* Codifica un objeto como si fuese una URL */
  //Sacado de acá: https://stackoverflow.com/a/35416293
  return Object.keys(obj)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(obj[k])}`)
    .join('&');
};

const hideSpinner = () => {
  setTimeout(() => {
    document.querySelector('#spinner').setAttribute('hidden', true);
    document.querySelector('#spinner').classList.add('scale-out');
  }, 1000);
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

const displayNotLoggedInMessage = () => {
  setTimeout(() => {
    document.querySelector('#not-logged-in-message').removeAttribute('hidden');
    document.querySelector('#not-logged-in-message').classList.add('scale-in');
  }, 1000);
};

const displayNotProductsMessage = () => {
  document.querySelector('#no-products-message').removeAttribute('hidden');
  document.querySelector('#no-products-message').classList.add('scale-in');
};

const enableCheckoutBtn = () => {
  document.querySelector('#checkout-btn').removeAttribute('disabled');
};

const disableCheckoutBtn = () => {
  document.querySelector('#checkout-btn').setAttribute('disabled', 'true');
};

const getTotalElementsInCart = cart => {
  if (!cart) return 0;
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
const setLogout = () => {
  document.querySelectorAll('#logout').forEach(el => {
    el.addEventListener('click', onLogout);
  });
};

export {
  hideSpinner,
  displayCart,
  displayLogout,
  displayLogin,
  displayNotLoggedInMessage,
  displayNotProductsMessage,
  enableCheckoutBtn,
  disableCheckoutBtn,
  getTotalElementsInCart,
  showElementsInCart,
  setLogout,
  encodeObj,
};
