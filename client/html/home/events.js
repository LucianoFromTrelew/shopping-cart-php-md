import customFetch from '/static/js/fetch';
import {showElementsInCart, getTotalElementsInCart} from '/static/js/utils';

const onProductAdded = event => {
  showElementsInCart(getTotalElementsInCart(event.detail.cart));
};

const onProductSubstracted = event => {
  showElementsInCart(getTotalElementsInCart(event.detail.cart));
};

const onLogout = event => {
  event.preventDefault();
  customFetch('/api/logout.php/')
    .then(res => res.json())
    .then(msg => {
      M.toast({html: msg.msg});
      setTimeout(() => {
        window.location = '/home/';
      }, 1000);
    })
    .catch(err => {
      console.log({err});
    });
};

export {onProductAdded, onProductSubstracted, onLogout};
