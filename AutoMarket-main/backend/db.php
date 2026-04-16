<?php
$host = "localhost" ;
$dbname = "tunluxauto" ;
$username = "root" ;
$password = "" ;
try{
    $pdo = new PDO("mysql:host=$host=$dbname" , $username , $password);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE::ERRMODE_EXCEPTION);
}catch (PDOException $e){
    echo json_encode(["status" => "error" , "message" => $e -> getMessage()]);
    exit;
}
?>