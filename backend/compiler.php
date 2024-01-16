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

// $my_server = "localhost";
// $username_conn = "root";
// $password_conn = "";
// $dbname_conn = "byteit_database";

// $conn = mysqli_connect($my_server, $username_conn, $password_conn, $dbname_conn);

// $table_name = 'exercises';
// $sql = "SELECT * from ".$table_name."";

$data = json_decode(file_get_contents("php://input"));

$language = htmlspecialchars(trim($data->language));
$code =  htmlspecialchars_decode(trim($data->code));
    $output = '';

    $random = substr(md5(mt_rand()), 0, 7);
    $filePath = "C:/xampp/programe_compilator" . $random . "." . $language;
    $programFile = fopen($filePath, "w");
    fwrite($programFile, $code);
    fclose($programFile);


    if ($language == "py") {
        // Enclose the path in double quotes to handle spaces
        $output = shell_exec('"C:/Users/leona/AppData/Local/Programs/Python/Python39/python.exe" ' . $filePath . ' 2>&1');
    }
    

    if($language == "c") {
        $outputExe = $random . ".exe";
        shell_exec("gcc $filePath -o $outputExe");
        $output = shell_exec(__DIR__ . "//$outputExe");

    }
    if($language == "cpp") {
        $outputExe = $random . ".exe";
        shell_exec("g++ $filePath -o $outputExe");
        $output = shell_exec(__DIR__ . "//$outputExe");
    }

    $response = array(
        'language' => $language,
        'output' => $output
    );

    // Send the response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
?>