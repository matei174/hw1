<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['email'])) {
    echo json_encode(['ok' => false, 'error' => 'Non loggato']);
    exit;
}

if (isset($_POST['id_viaggio'])) {
    $email = $_SESSION['email'];
    $id_viaggio = $_POST['id_viaggio'];

    $conn = mysqli_connect("localhost", "root", "", "traveluma");

    $check = "SELECT * FROM preferiti WHERE email_utente = ? AND id_viaggio = ?";
    $stmt = mysqli_prepare($conn, $check);
    mysqli_stmt_bind_param($stmt, "si", $email, $id_viaggio);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0) {
        echo json_encode(['ok' => false, 'error' => 'Già nei preferiti']);
    } else {
        $query = "INSERT INTO preferiti (email_utente, id_viaggio) VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "si", $email, $id_viaggio);
        mysqli_stmt_execute($stmt);

        echo json_encode(['ok' => true]);
    }

    mysqli_close($conn);
}
?>