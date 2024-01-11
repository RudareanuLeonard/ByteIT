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



// cors();

$my_server = "localhost";
$username_conn = "root";
$password_conn = "1234";
$dbname_conn = "byteit_database";

$conn = mysqli_connect($my_server, $username_conn, $password_conn, $dbname_conn);


if(!($conn))
    echo("Connection failed");

echo "<script> alert('php file is connected');</script>";

$table_name = "users";

if($_SERVER['REQUEST_METHOD'] !== 'POST'){
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => "bad request! only acceptinhg post method on form"
    ]);
}

$data = json_decode(file_get_contents("php://input"));

$username = htmlspecialchars(trim($data->username));
$email = htmlspecialchars(trim($data->email));
$name = htmlspecialchars(trim($data->name));
$password = htmlspecialchars(trim($data->password));
$confirm_password = htmlspecialchars(trim($data->confirmPassword));
$subscription = "no_subscription";
$level = "introduction";


$can_insert = 1;

if($password != $confirm_password) //check if pass and confirm pass are different or not
$can_insert = 0;

$search_email_query = "SELECT email FROM ".$table_name." WHERE email = '".$email."'";


$query_result = mysqli_query($conn, $search_email_query);

if(mysqli_num_rows($query_result) > 0) // if email already in db
    $can_insert = 0;


if($can_insert == 1){
    $query = "INSERT INTO `".$table_name."`(username, email, fullname, password, subscription, level)
    VALUES ('".$username."', '".$email."', '".$name."', '".$password."', '".$subscription."', '".$level."')";
    
    
    $stmt = $conn->prepare($query);
    
    if($stmt->execute()){
        http_response_code(201);
    
        echo json_encode([
            'success' => "1",
            "message" => "Successfully inserted"
        ]);
        
    }
    else{
        error_log("Error executing query: " . $stmt->error);
        // Failure
        echo json_encode([
            "success" => 0,
            "message" => "Insert failed!"
        ]);
    }

}
else{
    echo json_encode([
        "success" => 0,
        "message" => "Insert failed!"
    ]);
}

   


//echo "REGISTTTTTTTTTTTTTTTTTTTTER";

?>