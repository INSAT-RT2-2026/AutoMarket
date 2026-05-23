<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once "db.php";

if (isset($_GET['id'])) {
    $car_id = intval($_GET['id']);
    $stmt = $pdo->prepare("SELECT * FROM cars WHERE car_id = ? AND status = 'approved'");
    $stmt->execute([$car_id]);
    $car = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$car) {
        echo json_encode(["status" => "error", "message" => "Not found"]);
        exit;
    }
    echo json_encode(["status" => "success", "car" => $car]);
} else {
    $stmt = $pdo->query("SELECT * FROM cars WHERE status = 'approved' ORDER BY submitted_at DESC");
    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "cars" => $cars]);
}
?>