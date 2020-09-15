<?php

$serverName = "localhost";
$dbUsername = "iamgroup_admin";
$dbPassword = "Freeponies28!";
$dbName = "iamgroup_main";

// Store JSON file in var inData
$inData = getRequestInfo();

// Store the data in vars
$login = $inData["login"];
$password = $inData["password"];

// Specifies the MySQL connection to use
$conn = new mysqli($serverName, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
else
{
    echo "Connection established!";

    // SQL query string
    $sql = "INSERT INTO Users (login, password) 
    VALUES ('$login', '$password')";

    $result = $conn->query($sql);
    if ($result)
    {
        echo "User . '$login' was successfully added to the database";
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