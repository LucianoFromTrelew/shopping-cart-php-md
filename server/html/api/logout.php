<?php
require_once("_init.php");
require_once(INCLUDES_PATH . "auth.php");
require_once(INCLUDES_PATH . "shopping-cart-utils.php");
require_once(INCLUDES_PATH . "products-utils.php");

session_start();

if (!is_logged_in()) {
    http_response_code(400);
    echo json_encode(array(
        "msg" => "You cannot logout if you are not logged in :/"
    ));
    exit;
}

foreach (get_shopping_cart() as $product_id => $reserved_stock) {
    $new_stock = -1 * abs($reserved_stock);
    if (!update_stock($product_id, $new_stock)) {
        http_response_code(500);
        error_log("COULD NOT RELEASE $product_id STOCK");
        echo json_encode(array(
            "msg" => "COULD NOT RELEASE $product_id STOCK"
        ));
    }
}

session_unset();
session_destroy();
session_write_close();
setcookie(session_name(),'',0,'/');
@session_regenerate_id(true);

http_response_code(200);
echo json_encode(array(
    "msg" => "Successful logout"
));
?>
