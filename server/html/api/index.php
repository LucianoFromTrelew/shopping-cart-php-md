<?php
  session_start();
  
  if(isset($_SESSION['counter'])) {
    $_SESSION['counter'] += 1;
  } else {
    $_SESSION['counter'] = 1;
  }

  error_log(print_r(apache_request_headers(), TRUE));
  error_log(print_r("Session counter => ".$_SESSION['counter'], TRUE));

  echo json_encode(array("msg" => $_SESSION['counter']));
?>
