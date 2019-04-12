import customFetch from '/static/js/fetch';
import {showElementsInCart, getTotalElementsInCart} from '/static/js/utils';

const onProductAdded = event => {
  showElementsInCart(getTotalElementsInCart(event.detail.cart));
};

const onProductSubstracted = event => {
  showElementsInCart(getTotalElementsInCart(event.detail.cart));
};

export {onProductAdded, onProductSubstracted};
