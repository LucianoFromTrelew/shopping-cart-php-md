<?php

require_once("_init.php");
require_once(INCLUDES_PATH . "db.php");
require_once(INCLUDES_PATH . "auth.php");

session_start();

if (is_logged_in()) {
    $link = get_connection();

    if ($result = $link->query("SELECT * FROM products")) {

        $json = array();
        $index = 0;

        while ($row = $result->fetch_assoc()) {
            $json[$index] = array(
                "id" => $row["id"],
                "name" => $row["name"],
                "stock" => $row["stock"],
                "price" => $row["price"],
                "description" => $row["description"],
                "imageUrl" => $row["imageUrl"],
            );
            $index++;
        }

        http_response_code(200);
        echo json_encode($json);

    } else {

        http_response_code(500);
        echo json_encode(array(
            "msg" => "Something went wrong :/"
        ));

    }
} else {

    http_response_code(401);
    echo json_encode(array(
        "msg" => "You are not logged in :/"
    ));

}


?>
