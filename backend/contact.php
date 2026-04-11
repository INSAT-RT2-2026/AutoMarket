<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "db.php";

$data    = json_decode(file_get_contents("php://input"));
$name    = $data->name;
$phone   = $data->phone;
$email   = $data->email;
$car     = $data->car_interest ?? "Not specified";
$message = $data->message ?? "No message";

$stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, car, message) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$name, $phone, $email, $car, $message]);

echo json_encode(["status" => "success"]);
?>