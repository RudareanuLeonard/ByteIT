<?php

// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: *');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');

// Additional headers which may be sent along with the CORS request
header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');

// Set the age to 1 day to improve speed/caching.
header('Access-Control-Max-Age: 86400');

// Exit early so the page isn't fully loaded for options requests
if (strtolower($_SERVER['REQUEST_METHOD']) == 'options') {
    exit();
}



$my_server = "localhost";
$username_conn = "root";
$password_conn = "1234";
$dbname_conn = "byteit_database";

$conn = mysqli_connect($my_server, $username_conn, $password_conn, $dbname_conn);


if(!($conn))
    echo("Connection failed");

// echo "<script> console.log('php file is connected');</script>\n";

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => "bad request! only acceptinhg post method on form\n"
    ]);
}


$data = json_decode(file_get_contents("php://input"));

$username = htmlspecialchars(trim($data->username));
// echo "\n<script>THE USERNAME = </script>".$username;
$password = htmlspecialchars(trim($data->password));
// echo "\n<script>THE PASSWORD = </script>".$password;
$table_name = "users";

$query = "SELECT * from ".$table_name." WHERE username = '".$username."' AND password = '".$password."'";

$query_result = mysqli_query($conn, $query);

// $stmt = $conn->prepare($query);

// $result = $stmt->execute();

// echo("\n\n\n\n<script>console.log('RESULT OF QUERY = ')".$result."</script>\n\n\n\n");

if(mysqli_num_rows($query_result) > 0){
    http_response_code(201);

    echo json_encode([
        'success' => "1",
        "message" => "USER FOUND!"
    ]);
    
}
else{
    error_log("Error executing query: " );
    // Failure
    echo json_encode([
        "success" => 0,
        "message" => "User not found. Not connected!"
    ]);
}

?>