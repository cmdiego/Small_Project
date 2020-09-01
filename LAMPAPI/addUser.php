<?php

$servername = "localhost";
$dbUsername = "iamthegroup";
$dbPassword = "Freeponies28!";
$dbName = "iamgroup28_main";

// Define variables and initialize with empty values
$username = $password = $confirm_password = $phone = $email = "";

// Create connection
$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
else {
    // Q&A: Do we use _POST, _GET, or _REQUEST?
    $username = mysqli_real_escape_string($conn, $_REQUEST['username']); // the insert.php has to have "username"
    $password = mysqli_real_escape_string($conn, $_REQUEST['password']); // the insert.php has to have "password"
    $confirm_password = mysqli_real_escape_string($conn, $_REQUEST['confirm_password']); // the insert.php has to have "confirm_password"
    $phone = mysqli_real_escape_string($conn, $_REQUEST['phone']); // the insert.php has to have "phone"
    $email = mysqli_real_escape_string($conn, $_REQUEST['email']); // the insert.php has to have "email"

    // Attemp to insert query execution
    $sql = "INSERT INTO Users (Email, Phone, Username, Password) VALUES ('$email', '$phone', '$username', '$password')";

    if (mysqli_query($conn, $sql)) {
        echo "Records added successfully!";
    }
    else {
        echo "ERROR: Could not execute $sql. " . mysqli_error($conn);
    }
}