<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data['code'])) {
    $random = substr(md5(mt_rand()), 0, 7);
    $filePath = "C:/xampp/programe_compilator/" . $random . ".py";

    $programFile = fopen($filePath, "w");
    fwrite($programFile, htmlspecialchars_decode($data['code']));
    fclose($programFile);

    // $output = shell_exec("C:/Python311/python.exe $filePath 2>&1");
    $output = shell_exec("C:/Users/leona/AppData/Local/Programs/Python/Python39/python3.exe $filePath 2>&1");
    // echo "Python Code: " . htmlspecialchars($data['code']) . "\n";
    // echo "Output: " . $output;


    echo json_encode([
        'success' => true,
        'output' => $output,
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Invalid input data',
    ]);
}

?>
