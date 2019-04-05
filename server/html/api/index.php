<?php
session_start();


if(isset($_SESSION['user'])) {
  error_log("USUARIO LOGUEADO");
} else {
  error_log("USUARIO NO ESTA LOGUEADO");
}

error_log(print_r(apache_request_headers(), TRUE));
error_log(print_r("Session counter => ".$_SESSION['counter'], TRUE));

echo json_encode(array("msg" => $_SESSION['counter']));
?>
