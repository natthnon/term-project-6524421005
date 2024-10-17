<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json");

include '../DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

$method = $_SERVER['REQUEST_METHOD'];
switch ($method) {
    case "GET":
        $sql = "SELECT * FROM books";
        $path = explode('/', $_SERVER['REQUEST_URI']);
        
       
        $genre = isset($_GET['genre']) ? $_GET['genre'] : null;
        
        if (isset($path[4]) && is_numeric($path[4])) {
            // ถ้ามีการระบุ ID
            $sql .= " WHERE id = :id";
            if ($genre) {
                $sql .= " AND genre = :genre"; 
            }

            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4], PDO::PARAM_INT);
            if ($genre) {
                $stmt->bindParam(':genre', $genre);
            }
            $stmt->execute();
            $book = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if ($book) {
                echo json_encode($book);
            } else {
                http_response_code(404);
                echo json_encode(["message" => "Book not found"]);
            }
        } else {
            
            if ($genre) {
                $sql .= " WHERE genre = :genre"; 
            }
            $stmt = $conn->prepare($sql);
            if ($genre) {
                $stmt->bindParam(':genre', $genre);
            }
            $stmt->execute();
            $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($books ? $books : []);
        }
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        if (isset($data['title']) && isset($data['genre']) && isset($data['published_year'])) {
            $sql = "INSERT INTO books (title, genre, published_year) VALUES (:title, :genre, :published_year)";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':title', $data['title']);
            $stmt->bindParam(':genre', $data['genre']);
            $stmt->bindParam(':published_year', $data['published_year']);
            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode(["message" => "Book created successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Error creating book"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid input"]);
        }
        break;

    case "PUT":
        $data = json_decode(file_get_contents("php://input"), true);
        $path = explode('/', $_SERVER['REQUEST_URI']);
        
        if (isset($path[4]) && is_numeric($path[4])) {
            if (isset($data['title']) || isset($data['genre']) || isset($data['published_year'])) {
                $sql = "UPDATE books SET 
                        title = COALESCE(:title, title), 
                        genre = COALESCE(:genre, genre), 
                        published_year = COALESCE(:published_year, published_year) 
                        WHERE id = :id";
                $stmt = $conn->prepare($sql);
                $stmt->bindParam(':id', $path[4], PDO::PARAM_INT);
                $stmt->bindParam(':title', $data['title']);
                $stmt->bindParam(':genre', $data['genre']);
                $stmt->bindParam(':published_year', $data['published_year']);
                
                if ($stmt->execute()) {
                    echo json_encode(["message" => "Book updated successfully"]);
                } else {
                    http_response_code(500);
                    echo json_encode(["message" => "Error updating book"]);
                }
            } else {
                http_response_code(400);
                echo json_encode(["message" => "No data provided for update"]);
            }
        } else {
            http_response_code(404);
            echo json_encode(["message" => "Book not found"]);
        }
        break;

    case "DELETE":
        $path = explode('/', $_SERVER['REQUEST_URI']);
        
        if (isset($path[4]) && is_numeric($path[4])) {
            $sql = "DELETE FROM books WHERE id = :id";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':id', $path[4], PDO::PARAM_INT);
            if ($stmt->execute()) {
                echo json_encode(["message" => "Book deleted successfully"]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Error deleting book"]);
            }
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Invalid ID"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
        break;
}
?>
