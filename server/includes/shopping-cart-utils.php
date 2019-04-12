<?php
    
require_once("products-utils.php");

function add_to_cart($product_id) {
    if ($status = update_stock($product_id, 1)) {
        if (!isset($_SESSION["cart"])) {
            $_SESSION["cart"] = array();
        }

        if (!isset($_SESSION["cart"][$product_id])) {
            $_SESSION["cart"][$product_id] = 0;
        }

        $_SESSION["cart"][$product_id] += 1;
    } else {
        return FALSE;
    }

}

function sub_from_cart($product_id) {
    if (!isset($_SESSION["cart"])) {
        return FALSE;
    }
    if (!isset($_SESSION["cart"][$product_id])) {
        return FALSE;
    }
    if ($status = update_stock($product_id, -1)) {
        $_SESSION["cart"][$product_id] -= 1;
        if ($_SESSION["cart"][$product_id] <= 0) {
            unset($_SESSION["cart"][$product_id]);
        }
        return $status;
    } else {
        return FALSE;
    }
}

function get_shopping_cart() {
    return $_SESSION["cart"];
}

function clear_cart() {
    unset($_SESSION["cart"]);
}
?>
