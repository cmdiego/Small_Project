<?php

	$inData = getRequestInfo();
	
	$id = 0;

	$conn = new mysqli("localhost", "iamgroup_admin", "Freeponies28!", "iamgroup_main");

	// Checking conenction
	if ($conn->connect_error)
	{
		// echo "Connection failed!";
		returnWithError( $conn->connect_error );
	}
	else
	{
		echo "Connection established!";

		// Create SQL query string
		$sql = "SELECT ID, login FROM Users where Login='" . $inData["login"] . "' and Password='" . $inData["password"] . "'";

		
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

			
			// Select firstName & lastName
			$id = $row["ID"];
			$login = $row["login"];

			returnWithInfo($id, $login);
		}
		else
		{
			returnWithError( "No Records Found" );
		}
		$conn->close();
	}
	
	// Get JSON file
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo($id, $login)
	{
		$retValue = '{"ID" :' . $id . ',"Login" :"' . $login . '"}'; // ? For some reason login and id are switched in the display

		sendResultInfoAsJson($retValue);
	}
	
?>