const customFetch = (url = "", options = {}) => {
  options.credentials = "include";
  const _url = `${process.env.SERVER_HOST}:${process.env.SERVER_PORT}${url}`;
  return fetch(_url, options);
};

export default customFetch;
