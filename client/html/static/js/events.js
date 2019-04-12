import customFetch from '/static/js/fetch';
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

export {onLogout};
