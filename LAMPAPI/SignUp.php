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
    // echo "Connection established!";

    // SQL query string
    $sql = "INSERT INTO Users (login, password) 
    VALUES ('$login', '$password')";

    $result = $conn->query($sql);
    if ($result)
    {
        // echo "User '$login' was successfully added to the database";

        // New SQL query string to return ID of user to front-end
        $sql = "SELECT ID FROM Users WHERE login = '$login'";

        $result = $conn->query($sql);

        if ($result->num_rows > 0) 
        {
            $row = $result->fetch_assoc();
            $id = $row["ID"];
            // Sucessful search
            echo "Login: " . $login . " ID: " . $id . "\n";

            returnWithInfo($id);
        }
    }
    else
    {
        echo "Error: " . $sql . "" . mysql_error($conn);
    }
}

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson( $obj )
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithInfo( $searchResults )
{
    $retValue = '{"results":[' . $searchResults . ']}';
    sendResultInfoAsJson( $retValue );
}

function returnWithError( $err )
{
    $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
    sendResultInfoAsJson( $retValue );
}

?>