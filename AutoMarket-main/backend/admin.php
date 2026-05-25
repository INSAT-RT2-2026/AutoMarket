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
    $user_id = intval($data->user_id ?? 0);
    $new_password = trim($data->new_password ?? '');

    if ($user_id <= 0) {
        echo json_encode(["status" => "error", "message" => "Invalid user"]);
        exit;
    }
    if (strlen($new_password) < 6) {
        echo json_encode(["status" => "error", "message" => "Password too short"]);
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

// ── get_pending_cars ──────────────────────────────────────────────────────────
if ($action === "get_pending_cars") {
    $stmt = $pdo->query("SELECT * FROM cars WHERE status = 'pending' ORDER BY submitted_at DESC");
    $cars = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "cars" => $cars]);
    exit;
}

// ── set_car_status ────────────────────────────────────────────────────────────
if ($action === "set_car_status") {
    $car_id = intval($data->car_id ?? 0);
    $status = $data->status ?? '';
    if (!in_array($status, ['approved', 'rejected'])) {
        echo json_encode(["status" => "error", "message" => "Invalid status"]);
        exit;
    }
    $stmt = $pdo->prepare("UPDATE cars SET status = ? WHERE car_id = ?");
    $stmt->execute([$status, $car_id]);
    echo json_encode(["status" => "success"]);
    exit;
}

// ── get_inquiries ─────────────────────────────────────────────────────────────
if ($action === "get_inquiries") {
    $stmt = $pdo->query("SELECT c.*, u.name as user_name FROM contacts c JOIN users u ON c.user_id = u.user_id ORDER BY c.submitted_at DESC");
    $inquiries = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode(["status" => "success", "inquiries" => $inquiries]);
    exit;
}

// ── reply_inquiry ─────────────────────────────────────────────────────────────
if ($action === "reply_inquiry") {
    $contact_id = intval($data->contact_id ?? 0);
    $reply = strip_tags(trim($data->reply ?? ''));
    if (!$contact_id || !$reply) {
        echo json_encode(["status" => "error", "message" => "Invalid data"]);
        exit;
    }
    $stmt = $pdo->prepare("UPDATE contacts SET admin_reply = ?, status = 'answered' WHERE contact_id = ?");
    $stmt->execute([$reply, $contact_id]);
    echo json_encode(["status" => "success"]);
    exit;
}

echo json_encode(["status" => "error", "message" => "Unknown action"]);
?>

