<?php
    defined("INCLUDES_PATH")
    or define("INCLUDES_PATH", dirname(dirname(__DIR__))."/includes/");
    error_log(print_r("INCLUDES_PATH => " . INCLUDES_PATH, TRUE));
?>
