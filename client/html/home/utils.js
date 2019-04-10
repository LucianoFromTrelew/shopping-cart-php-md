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

export {
  hideSpinner,
  displayCart,
  displayLogout,
  displayLogin,
  displayNotLoggedInMessage,
  getTotalElementsInCart,
  showElementsInCart,
};
