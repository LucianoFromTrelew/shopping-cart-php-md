import { sha256 } from "js-sha256";
import customFetch from "../shared/js/fetch";

window.onload = () => {
  document.querySelector("#login-form").addEventListener("submit", event => {
    event.preventDefault();
    const username = document.querySelector("#username").value;
    const password = sha256(document.querySelector("#password").value);
    console.log({ username, password });
    customFetch("/api/login.php/", {
      method: "post",
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: `username=${username}&password=${password}`
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error("Qué problema che :/");
        }
        return res.json();
      })
      .then(msg => {
        console.log({ msg });
        setTimeout(
          function() {
            window.location = "/";
          }.bind(this),
          2000
        );
      })
      .catch(err => {
        console.error({ err });
      });
  });
};
