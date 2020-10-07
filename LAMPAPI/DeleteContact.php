<?php

$serverName = "localhost";
$dbUsername = "iamgroup_admin";
$dbPassword = "Freeponies28!";
$dbName = "iamgroup_main";

// Store JSON file in var inData
$inData = getRequestInfo();

// Store the data in vars
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$phone = $inData["phone"];
$email = $inData["email"];
// User's ID that added the contact. 
// Similar to AddContact.
$id = $inData["ID"];

// Specifies the MySQL connection to use
$conn = new mysqli($serverName, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}

// Check if User is in the contact list
$sql = "SELECT firstName, lastName, userID FROM Contacts WHERE firstName = '$firstName' AND lastName = '$lastName' AND userID = $id";

$result = $conn->query($sql);

if($result->num_rows > 0)
{
  $sql = "DELETE FROM Contacts WHERE userID = $id AND firstName = '$firstName' AND lastName = '$lastName'";

  // Run query against database
  $conn->query($sql);

  echo $firstName . " " . $lastName . " was successfully deleted";
}
else
{
  echo "No records found";
}

$conn->close();

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

?>