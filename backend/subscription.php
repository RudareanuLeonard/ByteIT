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

$data = json_decode(file_get_contents("php://input"));

$username = htmlspecialchars(trim($data->username));
$subscription = htmlspecialchars(trim($data->subscription));


$can_update = 1;

$table_name = "users";
$search_email_query = "SELECT * FROM ".$table_name." WHERE username = '".$username."'";

$query_result = mysqli_query($conn, $search_email_query);

if (mysqli_num_rows($query_result) === 0) { // If email is not in the database
    $can_update = 0;
}

if ($can_update == 1) {
    $update_query = "UPDATE ".$table_name." SET subscription = ? WHERE username = ?";
    
    $stmt = $conn->prepare($update_query);
    $stmt->bind_param("ss", $subscription, $username);

    if ($stmt->execute()) {
        http_response_code(200);
        echo json_encode([
            'success' => 1,
            'message' => 'Successfully updated'
        ]);
    } 
    else {
        error_log("Error executing query: " . $stmt->error);
        // Failure
        echo json_encode([
            'success' => 0,
            'message' => 'Update failed!!!!'
            // 'error' => $stmt->error
        ]);
    }
} 
else {
    echo json_encode([
        'success' => 0,
        'message' => 'Update failed!!!!!!!!!!!'
    ]);
}
?>