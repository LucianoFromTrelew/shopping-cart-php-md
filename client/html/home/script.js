import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";
import customFetch from "../shared/js/fetch";

document.addEventListener("DOMContentLoaded", () => {
  // Iniciando manualmente el modal
  /*
  const elems = document.querySelector(".modal");
  const instances = M.Modal.init(elems, null);
  */

  // O automáticamente
  M.AutoInit();

  customFetch("/api/products.php/")
    .then(res => res.json())
    .then(products => {
      console.log({ products });
      products.forEach((product, i) => {
        const productTemplate = document.getElementById("product-card");

        setTimeout(() => {
          // pasando un `true` hace un deep clone
          const newProduct = productTemplate.cloneNode(true);
          newProduct.querySelector(".card-title").innerHTML = product["name"];
          newProduct.querySelector(".card-image img").src = product["imageUrl"];
          productTemplate.parentNode.appendChild(newProduct);
        }, 2000 * (i + 1));
      });
    })
    .catch(err => {
      console.log({ err });
    });
});
