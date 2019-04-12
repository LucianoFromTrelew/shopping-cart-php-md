<?php

function is_logged_in() {
    return isset($_SESSION["user"]);
}

function get_user() {
    return $_SESSION["user"];
}

?>
