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
// This is the user who's adding the contact
$userID = $inData["ID"];

// Specifies the MySQL connection to use
$conn = new mysqli($serverName, $dbUsername, $dbPassword, $dbName);


// Check connection
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
else
{
    //$sql = "SELECT firstName, lastName, userID FROM Contacts WHERE firstName = '$firstName' and lastName = '$lastName' and userID = '$userID'";
    $sql = "SELECT firstName, lastName, userID FROM Contacts WHERE firstName = '" . $inData["firstName"] . " ' and lastName = '" . $inData["lastName"] . "' and userID = '" . $inData["ID"] . "'";
    
    
    $result = $conn->query($sql);
    
    if($result->num_rows > 0)
    {
      die("contact already exists" . $conn->connect_error);
      $conn->close();
    }
    else 
    {
        // Prepare SQL query string
        // Insert new contact
        // $sql = "INSERT INTO Contacts (firstName, lastName, phone, email, userID) 
        //         VALUES ('. $firstName . ',' . $lastName . ',' . $phone ',' . $email . ',' . $userID .')";
                
        // $sql = "INSERT INTO Contacts (firstName, lastName, phone, email, userID) 
        // VALUES ('$firstName','$lastName','$phone','$email', $userID)";
        
        $sql = "INSERT INTO Contacts (firstName, lastName, phone, email, userID) 
                VALUES ('" . $inData["firstName"] . "','" . $inData["lastName"] . "','" . $inData["phone"] . "','" . $inData["email"] . "','" . $inData["userID"] . "')";
        
        echo "SQL: " . $sql;
        //$result = mysqli_query($conn, $sql);
        $result = $conn->query($sql);
  
        $conn->close();
    }
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

?>