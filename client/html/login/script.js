import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import { sha256 } from "js-sha256";
import customFetch from "../shared/js/fetch";
import { encodeObj } from "../shared/js/utils";

window.onload = () => {
  document.querySelector("#login-form").addEventListener("submit", event => {
    event.preventDefault();

    const username = document.querySelector("#username").value;
    const password = sha256(document.querySelector("#password").value);

    document.querySelector("#spinner").classList.add("scale-in");

    setTimeout(() => {
      customFetch("/api/login.php/", {
        method: "post",
        headers: {
          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: encodeObj({ username, password })
      })
        .then(res => {
          if (res.status !== 200) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then(msg => {
          document.querySelector("#error-msg").classList.remove("scale-in");
          document.location = "/home/";
        })
        .catch(err => {
          document.querySelector("#error-msg").classList.add("scale-in");
        })
        .finally(() => {
          document.querySelector("#spinner").classList.remove("scale-in");
        });
    }, 2000);
  });
};
