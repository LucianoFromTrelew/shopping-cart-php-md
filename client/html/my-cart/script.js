import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import {getShoppingCart} from './getShoppingCart';

document.addEventListener('DOMContentLoaded', () => {
  getShoppingCart().then(res => {
    console.log({res});
  });
});
