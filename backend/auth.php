<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once "db.php";
$data = json_decode(file_get_contents("php://input"));
$action = $data->action;
if ($action === "register") {
    $name = $data->name;
    $email = $data->email; 
    $password = password_hash($data->password, PASSWORD_DEFAULT); 
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->execute([$name, $email, $password]);
    echo json_encode(["status" => "success", "message" => "Registered"]);
}
if ($action === "login") {
    $email = $data->email;
    $password = $data->password;
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    if ($user && password_verify($password, $user['password'])) {
        echo json_encode(["status" => "success", "message" => "Logged in", "name" => $user['name']]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
    }
}
?>