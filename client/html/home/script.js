import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

document.addEventListener("DOMContentLoaded", () => {
  // Iniciando manualmente el modal
  /*
  const elems = document.querySelector(".modal");
  const instances = M.Modal.init(elems, null);
  */

  // O automáticamente
  M.AutoInit();

  for (const i of [0, 1, 2, 3]) {
    const productTemplate = document.getElementById("product-card");

    setTimeout(() => {
      // pasando un `true` hace un deep clone
      const newProduct = productTemplate.cloneNode(true);
      newProduct.querySelector(".card-title").innerHTML = `Product ${i}`;
      productTemplate.parentNode.appendChild(newProduct);
    }, 2000 * (i + 1));
  }
});
