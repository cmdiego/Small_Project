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
    $sql = "SELECT firstName, lastName, userID FROM Contacts WHERE firstName = '$firstName' and lastName = '$lastName' and userID = '$userID'";
    
    $result = $conn->query($sql);
    
    if($result->num_rows > 0)
    {
      echo "CONTACT ALREADY EXIST" . mysql_error($conn);
    }
    else 
    {
      $sql = "INSERT INTO Contacts (firstName, lastName, phone, email, userID) 
              VALUES ('".$firstName."','".$lastName."','".$phone."','".$email."',".$userID.")";

      $result = $conn->query($sql);

      if ($result)
      {
        echo "Contact: " . $firstName . " was successfully added to your contacts list";
      }
      else
      {
        echo "ERROR INSERTING INTO CONTACTS" . mysql_error($conn);
      }

      $sql = "SELECT ID FROM Contacts WHERE firstName = '$firstName' and lastName = '$lastName' and userID = '$userID'";
      
      // Do query and get results
      $result = $conn->query($sql);

      // Check number of rows (this can be many entries or just a single one, this case is the latter)
      if ($result->num_rows > 0)
      {
        // Parse data in row
        // fetch_assoc(): 
        // 					Returns an associative array that corresponds to 
        // 					the fetched row or NULL if there are no more rows.
        $row = $result->fetch_assoc();  
			
        // Select the ID assigned to the newly added contact
        $id = $row["ID"];

        returnWithInfo($id);
      }
      else
      {
        returnWithError( "No Records Found" );
      }
      
      $conn->close();
    }
}

function sendResultInfoAsJson( $obj )
{
  header('Content-type: application/json');
  echo $obj;
}

function getRequestInfo()
{
  return json_decode(file_get_contents('php://input'), true);
}

function returnWithInfo($id)
{
  $retValue = '{"ID" :' . $id . '"}';

  sendResultInfoAsJson($retValue);
}

function returnWithError( $err )
{
  $retValue = '{"id":0,"error":"' . $err . '"}';
  sendResultInfoAsJson( $retValue );
}

?>