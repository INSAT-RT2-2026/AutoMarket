<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

require_once "db.php";

$data = json_decode(file_get_contents("php://input"));

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

$action      = $data->action      ?? '';
$admin_email = $data->admin_email ?? '';

// ── Verify requester is an admin ──────────────────────────────────────────────
$stmt = $pdo->prepare("SELECT role FROM users WHERE email = ?");
$stmt->execute([$admin_email]);
$admin = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$admin || $admin['role'] !== 'admin') {
    echo json_encode(["status" => "error", "message" => "Unauthorized"]);
    exit;
}

// ── get_users ─────────────────────────────────────────────────────────────────
if ($action === "get_users") {
    $stmt  = $pdo->query("SELECT user_id, name, email, phone, role, created_at FROM users ORDER BY created_at DESC");
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "users" => $users]);
    exit;
}

// ── set_password ──────────────────────────────────────────────────────────────
if ($action === "set_password") {
    $user_id     = intval($data->user_id     ?? 0);
    $new_password = $data->new_password ?? '';

    if (!$user_id || strlen($new_password) < 6) {
        echo json_encode(["status" => "error", "message" => "Password must be at least 6 characters"]);
        exit;
    }

    $hashed = password_hash($new_password, PASSWORD_DEFAULT);
    $stmt   = $pdo->prepare("UPDATE users SET password = ? WHERE user_id = ?");
    $stmt->execute([$hashed, $user_id]);

    echo json_encode(["status" => "success", "message" => "Password updated successfully"]);
    exit;
}

// ── set_role ──────────────────────────────────────────────────────────────────
if ($action === "set_role") {
    $user_id  = intval($data->user_id  ?? 0);
    $new_role = $data->new_role ?? '';

    if (!in_array($new_role, ['user', 'admin'])) {
        echo json_encode(["status" => "error", "message" => "Invalid role"]);
        exit;
    }

    $stmt = $pdo->prepare("UPDATE users SET role = ? WHERE user_id = ?");
    $stmt->execute([$new_role, $user_id]);

    echo json_encode(["status" => "success", "message" => "Role updated"]);
    exit;
}

// ── delete_user ───────────────────────────────────────────────────────────────
if ($action === "delete_user") {
    $user_id = intval($data->user_id ?? 0);

    if (!$user_id) {
        echo json_encode(["status" => "error", "message" => "Invalid user ID"]);
        exit;
    }

    // Prevent deleting other admins for safety
    $stmt = $pdo->prepare("DELETE FROM users WHERE user_id = ? AND role != 'admin'");
    $stmt->execute([$user_id]);

    echo json_encode(["status" => "success", "message" => "User deleted"]);
    exit;
}

echo json_encode(["status" => "error", "message" => "Unknown action"]);
?>
