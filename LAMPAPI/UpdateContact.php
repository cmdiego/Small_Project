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

if ($result->num_rows > 0)
{
  // This changes all values that are different from the input. For values that aren't updated, this keeps them the same as they were previously. 
  // Only changes the contacts whose ID and userID are correct.
  
  if ($phone != "")
  {
      $sql = "UPDATE Contacts SET phone = '$phone' WHERE firstName = '$oldFirst' AND lastName = '$oldLast' AND userID = '$userID'";
      $result = $conn->query($sql);
      if ($result)
      {
          echo "User's phone number updated!'";
      }
      else
      {
          echo "Error: " . $sql . "" . mysql_error($conn);
      }
  }
  
  if ($email != "")
  {
      $sql = "UPDATE Contacts SET email = '$email' WHERE firstName = '$oldFirst' AND lastName = '$oldLast' AND userID = '$userID'";
      $result = $conn->query($sql);
      if ($result)
      {
          echo "User's email updated!'";
      }
      else
      {
          echo "Error: " . $sql . "" . mysql_error($conn);
      }
  }
  
  $tmp = "";
  
  if ($firstName != "" || $lastName != "")
  {
      if ($firstName != "" && $lastName != "")
      {
          $sql = "UPDATE Contacts SET firstName = '$firstName', lastName = '$lastName' WHERE firstName = '$oldFirst' AND lastName = '$oldLast' AND userID = '$userID'";
          $result = $conn->query($sql);
          if ($result)
          {
              echo "User's first and last name updated!'";
          }
          else
          {
              echo "Error: " . $sql . "" . mysql_error($conn);
          }
      }
      else
      {
          if ($firstName != "")
          {
              $sql = "UPDATE Contacts SET firstName = '$firstName' WHERE firstName = '$oldFirst' AND lastName = '$oldLast' AND userID = '$userID'";
              $result = $conn->query($sql);
              if ($result)
              {
                  echo "User's first name updated!'";
              }
              else
              {
                  echo "Error: " . $sql . "" . mysql_error($conn);
              }
              $tmp = "firstupdated";
          }
          if ($lastName != "" && $tmp == "firstupdated")
          {
              $sql = "UPDATE Contacts SET lastName = '$lastName' WHERE firstName = '$firstName' AND lastName = '$oldLast' AND userID = '$userID'";
              $result = $conn->query($sql);
              if ($result)
              {
                  echo "User's last name updated!'";
              }
              else
              {
                  echo "Error: " . $sql . "" . mysql_error($conn);
              }
          }
          else
          {
              $sql = "UPDATE Contacts SET lastName = '$lastName' WHERE firstName = '$oldFirst' AND lastName = '$oldLast' AND userID = '$userID'";
              $result = $conn->query($sql);
              if ($result)
              {
                  echo "User's last name updated!'";
              }
              else
              {
                  echo "Error: " . $sql . "" . mysql_error($conn);
              }
          }
      }
  }
  
  // RESULT
  echo "User's database update complete!";
  
  $conn->close();
}


function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

?>
