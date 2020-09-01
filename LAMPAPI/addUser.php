<?php

$servername = "localhost";
$username = "iamthegroup";
$password = "Freeponies28!";
$dbname = "iamgroup28_main";

// Define variables and initialize with empty values
$username = $password = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = "";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else {
    $sql = 
}