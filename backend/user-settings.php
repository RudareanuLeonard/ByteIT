<?php


// Specify domains from which requests are allowed
header('Access-Control-Allow-Origin: *');

// Specify which request methods are allowed
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');

// Additional headers which may be sent along with the CORS request
header('Access-Control-Allow-Headers: X-Requested-With,Authorization,Content-Type');

// Set the age to 1 day to improve speed/caching.
header('Access-Control-Max-Age: 86400');


$my_server = "localhost";
$username_conn = "root";
$password_conn = "1234";
$dbname_conn = "byteit_database";

$conn = mysqli_connect($my_server, $username_conn, $password_conn, $dbname_conn);


$datas = [];
$table_name = 'users';



$get_username = $_GET["username"];


// $get_username = 
$sql = "SELECT * from ".$table_name." WHERE username = '".$get_username."'";

if($result = mysqli_query($conn,$sql)){
    $cr = 0;
    while($row = mysqli_fetch_assoc($result)){
        $datas[$cr]['id'] = $row['id'];
        $datas[$cr]['fullname'] = $row['fullname'];
        $datas[$cr]['email'] = $row['email'];
        $datas[$cr]['username'] = $row['username'];
        $datas[$cr]['password'] = $row['password'];
        // $datas[$cr]['picture_url'] = $row['picture_url'];
        $datas[$cr]['subscription'] = $row['subscription'];
        $datas[$cr]['level'] = $row['level'];

        $cr = $cr + 1;
    }
    echo json_encode(['data'=>$datas]);
}
else{
    http_response_code(404);
}







// $query = "SELECT * from ".$table_name." WHERE username = ".$get_username;

// $result = $conn->query($query);

// if(!$result)
//     die("Error executing query: ".$conn->error);

// $data = array();

// while($row = $result->fetch_assoc()){
//     $data[] = $row;
// }

// echo json_encode($data);



// $html_content = file_get_contents("user-settings.component.html");


?>