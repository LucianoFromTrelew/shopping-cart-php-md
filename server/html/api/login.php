<?php
  
require_once("_init.php");
require_once(INCLUDES_PATH . "db.php");

session_start();

$link = get_connection();

if ($stmt = $link->prepare("SELECT * FROM users WHERE username=? AND PASSWORD=?")) {
    $stmt->bind_param("ss", $_POST["username"], $_POST["password"]);
    $stmt->execute();
    $result = $stmt->get_result();

    if (empty($result->num_rows)) {
        http_response_code(401);
        echo json_encode(array(
            "msg" => "Incorrect user or password"
        ));
        $stmt->close();
        $link->close();
        exit;
    }

    $_SESSION["user"] = $_POST["username"];

    http_response_code(200);
    echo json_encode(array(
        "msg" => "Logged in successfully as " .$_POST["username"]
    ));
    $stmt->close();
    $link->close();
} else {
    http_response_code(500);
    echo json_encode(array(
        "msg" => "Something went wrong :/"
    ));
}

?>
