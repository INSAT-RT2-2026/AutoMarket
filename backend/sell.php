<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "db.php";

$brand       = $_POST['brand'] ?? '';
$model       = $_POST['model'] ?? '';
$year        = $_POST['year'] ?? '';
$price       = $_POST['price'] ?? '';
$horsepower  = $_POST['horsepower'] ?? null;
$description = $_POST['description'] ?? '';
$name        = $_POST['name'] ?? '';
$phone       = $_POST['phone'] ?? '';
$email       = $_POST['email'] ?? '';

// pics
$uploadedPaths = [];
$uploadDir = __DIR__ . '/../frontend/car_images/';
if (!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

if (!empty($_FILES['images']['name'][0])) {
    foreach ($_FILES['images']['tmp_name'] as $i => $tmp) {
        if ($_FILES['images']['error'][$i] === 0) {
            $ext = pathinfo($_FILES['images']['name'][$i], PATHINFO_EXTENSION);
            $filename = uniqid('listing_') . '.' . $ext;
            move_uploaded_file($tmp, $uploadDir . $filename);
            $uploadedPaths[] = 'car_images/' . $filename;
        }
    }
}

$imagesJson = json_encode($uploadedPaths);

$stmt = $pdo->prepare("INSERT INTO cars 
    (brand, model, year, price, horsepower, description, seller_name, seller_phone, seller_email, images) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->execute([$brand, $model, $year, $price, $horsepower, $description, $name, $phone, $email, $imagesJson]);

echo json_encode(["status" => "success"]);
?>