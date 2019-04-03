<?php
  
//http_response_code(201);
echo json_encode(array("msg" => "Hola ". $_POST["username"] ."!"));
//http_response_code(404);
//echo json_encode(array("msg" => "Pinchose todo"));

?>
