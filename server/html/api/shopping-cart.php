<?php
    
require_once("_init.php");
require_once(INCLUDES_PATH . "auth.php");
require_once(INCLUDES_PATH . "shopping-cart-utils.php");
require_once(INCLUDES_PATH . "products-utils.php");

session_start();

if (!is_logged_in()) {
    error_log("USUARIO NO ESTA LOGUEADO");
    http_response_code(401);
    echo json_encode(array("msg" => "You are not logged in :/"));
    exit;
}

if (isset($_GET["add-product"])) {
    error_log("AGREGAR PRODUCTO ID = ".print_r($_GET["add-product"], TRUE));

    if (add_to_cart($_GET["add-product"]) !== FALSE) {
        http_response_code(200);
        echo json_encode(array(
            "msg" => "Successfully added to the shopping cart",
            "cart" => get_shopping_cart()));
    } else {
        http_response_code(500);
        echo json_encode(array("msg" => "Error while trying to add the product to the shopping cart :/"));
    }
} else if (isset($_GET["sub-product"])) {
    error_log("RESTAR PRODUCTO ID = ". print_r($_GET["sub-product"], TRUE));

    if (sub_from_cart($_GET["sub-product"]) !== FALSE) {
        http_response_code(200);
        echo json_encode(array(
            "msg" => "Successfully substracted from shopping cart",
            "cart" => get_shopping_cart()));
    } else {
        http_response_code(500);
        echo json_encode(array("msg" => "Error while trying to sub the product from the shopping cart :/"));
    }
} else {
    error_log("DEVOLVER TODOS LOS PRODUCTOS DEL CARRITO");
    $cart = get_shopping_cart();

    if (empty($cart)) {
        http_response_code(404);
        echo json_encode(array("msg" => "Empty cart"));
        exit;
    }

    $json = array();
    $index = 0;
    foreach ($cart as $product_id => $stock) {
        $product_row = get_product_by_id($product_id);
        $product_row["stock"] = $stock;
        $json[$index] = $product_row;
        $index++;
    }
    http_response_code(200);
    echo json_encode($json);
}


?>
