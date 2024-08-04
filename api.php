<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("localhost", "username", "password", "food_delivery");

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($method) {
    case 'GET':
        handleGet($action, $conn);
        break;
    case 'POST':
        handlePost($action, $conn);
        break;
    case 'PUT':
        handlePut($action, $conn);
        break;
    case 'DELETE':
        handleDelete($action, $conn);
        break;
    default:
        echo json_encode(["error" => "Invalid method"]);
        break;
}

function handleGet($action, $conn) {
    switch ($action) {
        case 'restaurants':
            $result = $conn->query("SELECT * FROM restaurants");
            $restaurants = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($restaurants);
            break;
        case 'menus':
            $result = $conn->query("SELECT m.*, r.name as restaurant_name FROM menus m JOIN restaurants r ON m.restaurant_id = r.id");
            $menus = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($menus);
            break;
        case 'delivery_persons':
            $result = $conn->query("SELECT * FROM delivery_persons");
            $delivery_persons = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($delivery_persons);
            break;
        case 'orders':
            $result = $conn->query("SELECT o.*, r.name as restaurant_name, d.name as delivery_person_name FROM orders o JOIN restaurants r ON o.restaurant_id = r.id JOIN delivery_persons d ON o.delivery_person_id = d.id");
            $orders = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($orders);
            break;
        default:
            echo json_encode(["error" => "Invalid action"]);
            break;
    }
}

function handlePost($action, $conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    switch ($action) {
        case 'restaurant':
            $stmt = $conn->prepare("INSERT INTO restaurants (name, address) VALUES (?, ?)");
            $stmt->bind_param("ss", $data['name'], $data['address']);
            $stmt->execute();
            echo json_encode(["id" => $conn->insert_id]);
            break;
        case 'menu':
            $stmt = $conn->prepare("INSERT INTO menus (restaurant_id, item, price) VALUES (?, ?, ?)");
            $stmt->bind_param("isd", $data['restaurant_id'], $data['item'], $data['price']);
            $stmt->execute();
            echo json_encode(["id" => $conn->insert_id]);
            break;
        case 'delivery_person':
            $stmt = $conn->prepare("INSERT INTO delivery_persons (name) VALUES (?)");
            $stmt->bind_param("s", $data['name']);
            $stmt->execute();
            echo json_encode(["id" => $conn->insert_id]);
            break;
        case 'order':
            $stmt = $conn->prepare("INSERT INTO orders (restaurant_id, delivery_person_id, details, date) VALUES (?, ?, ?, NOW())");
            $stmt->bind_param("iis", $data['restaurant_id'], $data['delivery_person_id'], $data['details']);
            $stmt->execute();
            echo json_encode(["id" => $conn->insert_id]);
            break;
        default:
            echo json_encode(["error" => "Invalid action"]);
            break;
    }
}

function handlePut($action, $conn) {
    $data = json_decode(file_get_contents("php://input"), true);
    switch ($action) {
        case 'restaurant':
            $stmt = $conn->prepare("UPDATE restaurants SET name = ?, address = ? WHERE id = ?");
            $stmt->bind_param("ssi", $data['name'], $data['address'], $data['id']);
            $stmt->execute();
            echo json_encode(["success" => true]);
            break;
        case 'menu':
            $stmt = $conn->prepare("UPDATE menus SET item = ?, price = ? WHERE id = ?");
            $stmt->bind_param("sdi", $data['item'], $data['price'], $data['id']);
            $stmt->execute();
            echo json_encode(["success" => true]);
            break;
        case 'delivery_person':
            $stmt = $conn->prepare("UPDATE delivery_persons SET name = ?, blocked = ?, paused = ? WHERE id = ?");
            $stmt->bind_param("siii", $data['name'], $data['blocked'], $data['paused'], $data['id']);
            $stmt->execute();
            echo json_encode(["success" => true]);
            break;
        default:
            echo json_encode(["error" => "Invalid action"]);
            break;
    }
}

function handleDelete($action, $conn) {
    $id = isset($_GET['id']) ? $_GET['id'] : null;
    if (!$id) {
        echo json_encode(["error" => "ID is required"]);
        return;
    }
    switch ($action) {
        case 'restaurant':
            $stmt = $conn->prepare("DELETE FROM restaurants WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            echo json_encode(["success" => true]);
            break;
        case 'menu':
            $stmt = $conn->prepare("DELETE FROM menus WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            echo json_encode(["success" => true]);
            break;
        case 'delivery_person':
            $stmt = $conn->prepare("DELETE FROM delivery_persons WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            echo json_encode(["success" => true]);
            break;
        case 'order':
            $stmt = $conn->prepare("DELETE FROM orders WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            echo json_encode(["success" => true]);
            break;
        default:
            echo json_encode(["error" => "Invalid action"]);
            break;
    }
}

$conn->close();
