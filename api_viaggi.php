<?php
header('Content-Type: application/json');

$conn = mysqli_connect("localhost", "root", "", "traveluma");

if (!$conn) {
    echo json_encode(['ok' => false, 'error' => 'Errore connessione DB']);
    exit;
}

$query = "SELECT id, nome, prezzo, descrizione, immagine FROM viaggi";
$result = mysqli_query($conn, $query);

$viaggi = array();
while ($row = mysqli_fetch_assoc($result)) {
    $viaggi[] = $row;
}

echo json_encode($viaggi);

mysqli_close($conn);
?>