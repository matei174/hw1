<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['email'])) {
    echo json_encode(['ok' => false, 'error' => 'Non loggato']);
    exit;
}

if (isset($_POST['nome_viaggio']) && isset($_POST['prezzo'])) {
    $email = $_SESSION['email'];
    $nome_viaggio = $_POST['nome_viaggio'];
    $prezzo = $_POST['prezzo'];

    $conn = mysqli_connect("localhost", "root", "", "traveluma");

    if (!$conn) {
        echo json_encode(['ok' => false, 'error' => 'Errore connessione DB']);
        exit;
    }

    $query = "INSERT INTO carrello_utente (email_utente, nome_viaggio, prezzo) VALUES (?, ?, ?)";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ssd", $email, $nome_viaggio, $prezzo);
    mysqli_stmt_execute($stmt);
 
    if (!isset($_SESSION['carrello'])) {
        $_SESSION['carrello'] = array();        
    }

    $_SESSION['carrello'][] = array(
        'nome' => $nome_viaggio,
        'prezzo' => $prezzo
    );

    echo json_encode(['ok' => true]);

    mysqli_close($conn);
}
?>