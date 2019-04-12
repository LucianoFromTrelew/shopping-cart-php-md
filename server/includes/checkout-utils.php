<?php
    
require_once("db.php");

function create_order($user) {
    $link = get_connection();

    if ($stmt = $link->prepare("INSERT INTO orders (userID) VALUES (?)")) {
        $stmt->bind_param("s", $user);
        $stmt->execute();

        $order_id = $link->insert_id;
        $stmt->close();
        $link->close();

        return $order_id;
    } else {
        $stmt->close();
        $link->close();
        return FALSE;
    }

}

function create_order_detail($order_id, $product_id, $orderLineNumber, $quantity, $price) {
    $link = get_connection();

    if ($stmt = $link->prepare("INSERT INTO orderDetails VALUES (?, ?, ?, ?, ?)")) {
        $stmt->bind_param("iiiid", $order_id, $product_id, $orderLineNumber, $quantity, $price);
        $stmt->execute();

        $order_detail_id = $link->insert_id;
        $stmt->close();
        $link->close();

        return $order_detail_id;
    } else {
        $stmt->close();
        $link->close();
        return FALSE;
    }


}
?>
