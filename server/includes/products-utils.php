<?php

require_once("db.php");

function get_product_by_id($product_id) {
    $link = get_connection();

    if ($stmt = $link->prepare("SELECT * FROM products WHERE id=? LIMIT 1")) {
        $stmt->bind_param("d", $product_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if (empty($result->num_rows)) {
            http_response_code(401);
            echo json_encode(array(
                "msg" => "Product does not exist"
            ));
            $stmt->close();
            $link->close();
            exit;
        }

        $row = $result->fetch_array(MYSQLI_ASSOC);
        $stmt->close();
        $link->close();
        return $row;

    } else {
        $stmt->close();
        $link->close();
        return FALSE;
    }
}

function update_stock($product_id, $qty) {
    error_log("UPDATE_STOCK");
    if ($product = get_product_by_id($product_id)) {
        $new_stock = $product['stock'] - $qty;
        $link = get_connection();
        if ($stmt = $link->prepare("UPDATE products SET stock=? WHERE id=?")) {
            $stmt->bind_param("dd", $new_stock, $product_id);
            $status = $stmt->execute();
            $stmt->close();
            $link->close();
            return $status;
        } else {
            $stmt->close();
            $link->close();
            return FALSE;
        }
    } else {
        return FALSE;
    }
}

?>
