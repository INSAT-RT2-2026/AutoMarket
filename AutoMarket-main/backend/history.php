<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require_once "db.php";

$data    = json_decode(file_get_contents("php://input"));
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

$stmt = $pdo->prepare("SELECT * FROM contacts WHERE user_id = ? ORDER BY submitted_at DESC");
$stmt->execute([$user_id]);
$contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

$email = $data->email ?? '';
$listings = [];
if ($email) {
    $lstmt = $pdo->prepare("SELECT car_id, brand, model, year, price, status, submitted_at FROM cars WHERE seller_email = ? ORDER BY submitted_at DESC");
    $lstmt->execute([$email]);
    $listings = $lstmt->fetchAll(PDO::FETCH_ASSOC);
}

echo json_encode(["status" => "success", "contacts" => $contacts, "listings" => $listings]);
?>