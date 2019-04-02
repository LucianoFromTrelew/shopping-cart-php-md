import customFetch from "../shared/js/fetch";

window.onload = () => {
  const urlParam = new URLSearchParams(window.location.search);

  console.log(urlParam.has("post"));
  console.log(urlParam.get("post"));

  const postDiv = document.querySelector("#post");
  if (urlParam.has("post") && urlParam.get("post")) {
    postDiv.innerHTML = `Post number ${urlParam.get("post")}`;
  } else {
    postDiv.innerHTML = "No post provided";
  }

  customFetch("/api/")
    .then(res => res.json())
    .then(msg => {
      console.log({ ...msg });
    })
    .catch(err => {
      console.error({ err });
    });
};
