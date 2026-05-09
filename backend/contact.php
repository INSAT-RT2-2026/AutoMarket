<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
    exit;
}

require_once "db.php";

$data = json_decode(file_get_contents("php://input"));

if (!$data || empty($data->name) || empty($data->phone) || empty($data->email)) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

$name    = $data->name;
$phone   = $data->phone;
$email   = $data->email;
$car     = $data->car_interest ?? "Not specified";
$message = $data->message ?? "No message";

$stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, car, message) VALUES (?, ?, ?, ?, ?)");
$stmt->execute([$name, $phone, $email, $car, $message]);

echo json_encode(["status" => "success"]);
?>
