<?php
function get_connection() {
  $link = @new mysqli(
    getenv("MYSQL_HOST"),
    getenv("MYSQL_USER"),
    getenv("MYSQL_PASSWORD"),
    getenv("MYSQL_DATABASE"),
  );

  if ($link->connect_error) {
      http_response_code(500);
      echo json_encode(array(
          "msg" => "Could not connect to database",
          "result" => "No me pude conectar a la base"
      ));
      exit;
  }
  return $link;
} 
?>
