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

$user_id  = intval($data->user_id);
$car_name = $data->car_name ?? null;
$message  = $data->message  ?? null;

$stmt = $pdo->prepare("INSERT INTO contacts (user_id, car_name, message) VALUES (?, ?, ?)");
$stmt->execute([$user_id, $car_name, $message]);

echo json_encode(["status" => "success"]);
?>
