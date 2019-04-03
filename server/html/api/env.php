<?php
  
echo json_encode(array("msg" => [
  getenv('MYSQL_USER'),
  getenv('MYSQL_DATABASE'),
  getenv('MYSQL_PASSWORD'),
]));
?>
