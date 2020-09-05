<?php

$serverName = "localhost";
$dbUsername = "iamthegroup";
$dbPassword = "Freeponies28!";
$dbName = "iamgroup28_main";

// Store JSON file in var inData
$inData = getRequestInfo();

// Store the data in vars
$login = $inData["login"];
$password = $inData["password"];
$phone = $inData["phone"];
$email = $inData["email"];
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];

// Specifies the MySQL connection to use
$conn = new mysqli($serverName, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
else
{
    echo "Connection stablished!";

    // SQL query string
    $sql = "INSERT INTO Users (email, phone, login, password, firstName, lastName) 
    VALUES ('$email', '$phone', '$login', '$password', '$firstName', '$lastName')";

    $result = $conn->query($sql);
    if ($result)
    {
        echo "User{ $firstName} {$lastName} was successfully added to the database";
    }
    else
    {
        echo "Error: " . $sql . "" . mysql_error($conn);
    }
    $conn->close();
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

?>