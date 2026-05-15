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

if (!$data || empty($data->user_id)) {
    echo json_encode(["status" => "error", "message" => "Missing user"]);
    exit;
}

$user_id = intval($data->user_id ?? 0);
if ($user_id <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid user"]);
    exit;
}

$check = $pdo->prepare("SELECT user_id FROM users WHERE user_id = ?");
$check->execute([$user_id]);
if (!$check->fetch()) {
    echo json_encode(["status" => "error", "message" => "User not found"]);
    exit;
}

$car_name = isset($data->car_name) ? strip_tags(trim($data->car_name)) : null;
$message  = isset($data->message)  ? strip_tags(trim($data->message))  : null;

if ($car_name && strlen($car_name) > 150) {
    echo json_encode(["status" => "error", "message" => "Invalid car name"]);
    exit;
}
if ($message && strlen($message) > 1000) {
    echo json_encode(["status" => "error", "message" => "Message too long"]);
    exit;
}

$stmt = $pdo->prepare("INSERT INTO contacts (user_id, car_name, message) VALUES (?, ?, ?)");
$stmt->execute([$user_id, $car_name, $message]);

echo json_encode(["status" => "success"]);
?>
