<?php
session_start();
header('Content-Type: application/json');
if (!isset($_SESSION['email'])) {
  echo json_encode(['ok'=>false,'error'=>'Non loggato']);
  exit;
}
if (!isset($_POST['id_viaggio'])) {
  echo json_encode(['ok'=>false,'error'=>'Manca id']);
  exit;
}

$conn = mysqli_connect("localhost","root","","traveluma");
if (!$conn) {
  echo json_encode(['ok'=>false,'error'=>'DB error']);
  exit;
}

$stmt = mysqli_prepare(
  $conn,
  "DELETE FROM preferiti WHERE email_utente = ? AND id_viaggio = ?"
);
mysqli_stmt_bind_param($stmt, "si", $_SESSION['email'], $_POST['id_viaggio']);
mysqli_stmt_execute($stmt);
mysqli_close($conn);

echo json_encode(['ok'=>true]);
?>