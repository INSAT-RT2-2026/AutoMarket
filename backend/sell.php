<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$origin  = $_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '';
$allowed = getenv('https://automarket-production-ac0c.up.railway.app');

if ($allowed && !str_contains($origin, $allowed)) {
    echo json_encode(["status" => "error", "message" => "Forbidden"]);
    exit;
}

require_once "db.php";

$user_id     = isset($_POST['user_id']) ? intval($_POST['user_id']) : null;
$brand       = $_POST['brand'] ?? '';
$model       = $_POST['model'] ?? '';
$year        = $_POST['year'] ?? '';
$price       = $_POST['price'] ?? '';
$horsepower  = $_POST['horsepower'] ?? null;
$description = $_POST['description'] ?? '';
$name        = $_POST['name'] ?? '';
$phone       = $_POST['phone'] ?? '';
$email       = $_POST['email'] ?? '';

$uploadedPaths = [];
$uploadDir = __DIR__ . '/../frontend/car_images/listings/';
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

$allowed_types = ['image/jpeg', 'image/png', 'image/webp'];

if (!empty($_FILES['images']['name'][0])) {
    foreach ($_FILES['images']['tmp_name'] as $i => $tmp) {
        if ($_FILES['images']['error'][$i] === 0) {
            if (!in_array(mime_content_type($tmp), $allowed_types)) {
                echo json_encode(["status" => "error", "message" => "Invalid file type"]);
                exit;
            }
            $ext = pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION);
            $filename = uniqid('listing_') . '.' . $ext;
            move_uploaded_file($tmp, $uploadDir . $filename);
            $uploadedPaths[] = 'car_images/' . $filename;
        }
    }
}

$imagesJson = json_encode($uploadedPaths);

$stmt = $pdo->prepare("INSERT INTO cars 
    (user_id, brand, model, year, price, horsepower, description, seller_name, seller_phone, seller_email, images) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([$user_id, $brand, $model, $year, $price, $horsepower, $description, $name, $phone, $email, $imagesJson]);

echo json_encode(["status" => "success"]);
?>