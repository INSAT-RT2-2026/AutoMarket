<?php
header("Access-Control-Allow-Origin : *");
header("Content-Type : application/json");
$data = json_decode(file_get_contents("php ://input"));
$name = $data->name ;
$phone = $data->phone ;
$email = $data->email ;
$car = $data->car_interest;
$message = $data->message ;
echo json_encode ([
    "status" => "success" ,
    "received" => [
        "name" => $name;
        "phone" => $phone;
        "email" => $email;
        "car" => $car ;
        "message" => $message;
    ]
]);
?>