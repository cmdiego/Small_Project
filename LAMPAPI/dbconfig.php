<?

//Define your host here.
$hostname = "localhost";

//Define your database username here.
$username = "iamthegroup";

//Define your database password here.
$password = "Freeponies28!";

//Define your database name here.
$dbname = "iamgroup28_main";

$conn = mysql_connect($hostname, $username, $password);
 
if (!$conn) 
{

    die('Could not connect: ' . mysql_error());

}

mysql_select_db($dbname, $conn);

?>