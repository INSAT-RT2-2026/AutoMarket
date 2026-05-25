<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require_once "db.php";

$data = json_decode(file_get_contents("php://input"));
$action = $data->action;

if ($action === "register") {
    $name  = strip_tags(trim($data->name));
    $email = filter_var(trim($data->email), FILTER_VALIDATE_EMAIL);
    if (!$email) {
        echo json_encode(["status" => "error", "message" => "Invalid email"]);
        exit;
    }
    $phone = $data->phone;
    $password = password_hash($data->password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)");
        $stmt->execute([$name, $email, $phone, $password]);
        $newId = $pdo->lastInsertId();
        require_once "mailer.php";
        sendWelcomeEmail($email, $name);
        echo json_encode([
            "status" => "success",
            "user_id" => $newId,
            "name"   => $name,
            "email"  => $email,
            "phone"  => $phone,
            "role"   => "user"
        ]);
    } catch (PDOException $e) {
        echo json_encode(["status" => "error", "message" => "Email already in use"]);
    }
}

if ($action === "login") {
        $email = $data->email;
        $password = $data->password;


    $ip = $_SERVER['REMOTE_ADDR'];

    $pdo->prepare("DELETE FROM login_attempts WHERE attempted_at < NOW() - INTERVAL 15 MINUTE")->execute();

    $stmt = $pdo->prepare("SELECT COUNT(*) FROM login_attempts WHERE ip = ?");
    $stmt->execute([$ip]);
    if ($stmt->fetchColumn() >= 5) {
        echo json_encode(["status" => "error", "message" => "Too many failed attempts. Try again in 15 minutes."]);
        exit;
    }

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
        $pdo->prepare("DELETE FROM login_attempts WHERE ip = ?")->execute([$ip]);
        echo json_encode([
            "status"  => "success",
            "user_id" => $user['user_id'],
            "message" => "Logged in",
            "name"    => $user['name'],
            "email"   => $user['email'],
            "phone"   => $user['phone'],
            "role"    => $user['role']
        ]);
    } else {
        $pdo->prepare("INSERT INTO login_attempts (ip) VALUES (?)")->execute([$ip]);
        echo json_encode(["status" => "error", "message" => "Invalid credentials"]);
    }
}

if ($action !== "register" && $action !== "login") {
    echo json_encode(["status" => "error", "message" => "Unknown action"]);
}
?>