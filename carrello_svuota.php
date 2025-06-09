<?php
session_start();

$conn = mysqli_connect("localhost", "root", "", "traveluma");

if (!$conn) {
    die("Connessione fallita: " . mysqli_connect_error());
}

unset($_SESSION['carrello']);

if (isset($_SESSION['email'])) {
    $email = $_SESSION['email'];

    $query = "DELETE FROM carrello_utente WHERE email_utente = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
}

mysqli_close($conn);

header('Location: carrello.php');
exit;
?>