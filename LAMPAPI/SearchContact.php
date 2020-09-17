<?php

$serverName = "localhost";
$dbUsername = "iamgroup_admin";
$dbPassword = "Freeponies28!";
$dbName = "iamgroup_main";

// Store JSON file in var inData
$inData = getRequestInfo();

// Contact to be deleted firstName
$firstName = $inData["firstName"];
// Contact to be deleted lastName
$lastName = $inData["lastName"];
// User's ID to identify its contacts
$userID = $inData["ID"];

$conn = new mysqli($serverName, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_error)
{
    returnWithError($conn->connect_error);
}
else
{
    $sql = "SELECT firstName, lastName FROM Contacts WHERE firstName LIKE '%" . $firstName . 
    "%' AND lastName LIKE '%" . $lastName . "%' AND userID = " . $userID;

    $result = $conn->query($sql);

    if ($result->num_rows > 0)
    {
        while ($row = $result->fetch_assoc())
        {
            if ($searchCount > 0)
            {
                $searchResults .= ",";
            }
            $searchCount++;
            $searchResults .= '"' .$row["firstName"] . ' ' . $row["lastName"] .'"';
        }
    }
    else
    {
        returnWithError("No records Found");
    }
    $conn->close();
}

returnWithInfo($searchResults);

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithInfo( $searchResults )
{
    $retValue = '{"results":[' . $searchResults . '],"error":""}';
    sendResultInfoAsJson( $retValue );
}

function returnWithError( $err )
{
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}