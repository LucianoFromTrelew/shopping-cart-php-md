import customFetch from '/static/js/fetch';
import {disableCheckoutBtn, displayNoProductsMessage} from '/static/js/utils';

const onProductAdd = event => {
  const {cart} = event.detail;
  console.log({cart});
};

const onProductSub = ({detail}) => {
  const {cart} = detail;
  const cartArray = Object.values(cart);
  if (!cartArray || !cartArray.length) {
    disableCheckoutBtn();
    displayNoProductsMessage();
  }
};

const onCheckoutConfirmClick = event => {
  document.querySelector('#spinner').classList.add('scale-in');
  customFetch('/api/checkout.php/')
    .then(res => {
      if (res.status !== 200) {
        throw new Error(`${res.status}: ${res.statusText}`);
      }
      return res.json();
    })
    .then(msg => {
      setTimeout(() => {
        console.log({msg});
        document.querySelector('#spinner').classList.remove('scale-in');
        M.toast({
          html: msg.msg,
          classes: 'green',
        });
        setTimeout(() => {
          window.location = '/';
        }, 1500);
      }, 1500);
    })
    .catch(err => {
      console.log({err});
    });
};

export {onProductSub, onProductAdd, onCheckoutConfirmClick};
