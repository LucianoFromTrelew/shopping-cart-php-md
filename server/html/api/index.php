<?php

require_once("_init.php");
require_once(INCLUDES_PATH . "auht.php");

session_start();


if(is_logged_in()) {
    error_log("USUARIO LOGUEADO");
    http_response_code(200);
    echo json_encode(array("msg" => "Hurray! You are logged in :D"));
} else {
    error_log("USUARIO NO ESTA LOGUEADO");
    http_response_code(401);
    echo json_encode(array("msg" => "You are not logged in :/"));
}

?>
