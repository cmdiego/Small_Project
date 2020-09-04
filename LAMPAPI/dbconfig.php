<?
//Define your host here.
$hostname = "localhost";

//Define your database username here.
$username = "iamthegroup";

//Define your database password here.
$password = "Freeponies28!";

//Define your database name here.
$dbname = "iamgroup28_main";

// Create connection
$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbName);
 
// Checking conenction
if ($conn->connect_error)
{
    die("Connection failed: " . $conn->connect_error);
}
else
{
    echo "Connection established!";
}
?>