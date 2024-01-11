<?php

function dbConnection(){
    $myServer = "localhost";
    $usernameConn = "root";
    $passwordConn = "1234";
    $dbnameConn = "byteit_database";
    
    $conn = mysqli_connect($myServer, $usernameConn, $passwordConn, $dbnameConn);
    
    
    if(!($conn))
       echo "<script>console.log('Connection to db failed!');</script> fasddddddddddddddddddd";
    else
        echo "<script>console.log('Connection to db succeded!');</script> qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq";
    return $conn;
}


?>
