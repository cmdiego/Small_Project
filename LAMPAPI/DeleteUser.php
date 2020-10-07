<?php

$serverName = "localhost";
$dbUsername = "iamgroup_admin";
$dbPassword = "Freeponies28!";
$dbName = "iamgroup_main";

// Store JSON file in var inData
$inData = getRequestInfo();

// Store the data in vars
$id = $inData["ID"];

// For testing/output message only
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
    echo "Connection established!";

    // SQL query string
    $sql = "DELETE FROM Users WHERE ID = $id";

    $result = $conn->query($sql);
    if ($result)
    {
        echo "User {$firstName} {$lastName} was successfully deleted from the database";
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