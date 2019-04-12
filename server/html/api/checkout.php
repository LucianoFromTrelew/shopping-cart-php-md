<?php
require_once("_init.php");
require_once(INCLUDES_PATH . "auth.php");
require_once(INCLUDES_PATH . "shopping-cart-utils.php");
require_once(INCLUDES_PATH . "products-utils.php");
require_once(INCLUDES_PATH . "checkout-utils.php");

session_start();

if (!is_logged_in()) {
    error_log("USUARIO NO ESTA LOGUEADO");
    http_response_code(401);
    echo json_encode(array("msg" => "You are not logged in :/"));
    exit;
}

$cart = get_shopping_cart();
if (empty($cart)) {
    http_response_code(400);
    echo json_encode(array("msg" => "Empty cart"));
    exit;
}


if ($order_id = create_order(get_user())) {
    $index = 0;
    foreach ($cart as $product_id => $quantity) {
        $product_row = get_product_by_id($product_id);
        $order_detail_id = create_order_detail($order_id, $product_id, $index, $quantity, $product_row["price"]);
        if ($order_detail_id !== FALSE) {
            $index++;
        } else {
            http_response_code(500);
            echo json_encode(array(
                "msg" => "COULD NOT CREATE ORDER DETAIL FOR PRODUCT $product_id (stock $quantity)")
            );
            exit;
        }
    }

    clear_cart();
    http_response_code(200);
    echo json_encode(array("msg" => "Order created successfully!"));
} else {
    http_response_code(500);
    echo json_encode(array("msg" => "COULD NOT CREATE ORDER"));
}

?>
