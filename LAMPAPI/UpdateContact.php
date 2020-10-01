<?php

$serverName = "localhost";
$dbUsername = "iamgroup_admin";
$dbPassword = "Freeponies28!";
$dbName = "iamgroup_main";

// Store JSON file in var inData
$inData = getRequestInfo();

// Store the data in vars
$oldFirst = $inData["oldFirst"];
$oldLast = $inData["oldLast"];
$firstName = $inData["firstName"];
$lastName = $inData["lastName"];
$phone = $inData["phone"];
$email = $inData["email"];
// This is the user who's adding the contact
$userID = $inData["userID"];

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Specifies the MySQL connection to use
$conn = new mysqli($serverName, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
// Check if such contact exists for such user
$sql = "SELECT userID, firstName, lastName FROM Contacts WHERE userID = $userID AND firstName = '$oldFirst' AND lastName = '$oldLast'";

$result = $conn->query($sql);

if($result->num_rows > 0)
{
  // This changes all values that are different from the input. For values that aren't updated, this keeps them the same as they were previously. 
  // Only changes the contacts whose ID and userID are correct.
  
  
  unset($sql);
  
  $sql = "UPDATE Contacts SET firstName = '$firstName', lastName = '$lastName', phone = '$phone', email = '$email' WHERE firstName = '$oldFirst' AND lastName = '$oldLast' AND userID = '$userID'";
  
  $result = $conn->query($sql);
 
  if ($result)
  {
        echo "User . '$firstName' . '$lastName' has had their database entry updated!";
     
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