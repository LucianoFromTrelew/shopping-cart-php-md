import customFetch from '/static/js/fetch';

const getShoppingCart = () => {
  return customFetch('/api/shopping-cart.php/').then(res => {
    if (res.status !== 200) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }
    return res.json();
  });
};

export {getShoppingCart};
