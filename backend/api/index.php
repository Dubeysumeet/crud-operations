<?php

include 'database.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

var_dump($conn);