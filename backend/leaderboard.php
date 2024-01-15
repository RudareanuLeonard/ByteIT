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


$table_name = 'users';
$sql = "SELECT * from ".$table_name." ORDER BY exercises_solved DESC";

$datas = [];

if($result = mysqli_query($conn,$sql)){
    $cr = 0;
    while($row = mysqli_fetch_assoc($result)){
      $datas[$cr]['fullname'] = $row['fullname'];
      // $datas[$cr]['picture_url'] = $row['picture_url'];
      $datas[$cr]['level'] = $row['level'];
      $datas[$cr]['exercises_solved'] = $row['exercises_solved'];
        
        $cr = $cr + 1;
    }
    echo json_encode(['data'=>$datas]);
}
else{
    http_response_code(404);
}

?>