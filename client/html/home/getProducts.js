import customFetch from '/static/js/fetch';

const getProducts = () => {
  return customFetch('/api/products.php/').then(res => {
    if (res.status !== 200) {
      throw new Error(`${res.status}: ${res.statusText}`);
    }
    return res.json();
  });
};

export {getProducts};
