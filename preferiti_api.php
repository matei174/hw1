<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['email'])) {
  echo json_encode(['ok' => false, 'error' => 'Non loggato']);
  exit;
}

$conn = mysqli_connect("localhost","root","","traveluma");
if (!$conn) {
  echo json_encode(['ok'=>false,'error'=>'DB error']);
  exit;
}

$email = $_SESSION['email'];
$query = "
  SELECT v.id, v.nome, v.prezzo, v.descrizione, v.immagine
  FROM preferiti p
  JOIN viaggi v ON p.id_viaggio = v.id
  WHERE p.email_utente = ?
";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt,"s",$email);
mysqli_stmt_execute($stmt);
$res = mysqli_stmt_get_result($stmt);

$viaggi = [];
while ($r = mysqli_fetch_assoc($res)) {
  $viaggi[] = $r;
}

echo json_encode($viaggi);
mysqli_close($conn);

?>

<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <title>TRAVELUMA – I tuoi preferiti</title>
  <link rel="stylesheet" href="mhw3.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
  <nav>
    <a href="home_session.php">Home Profilo</a> |
    <a href="logout_session.php">Logout</a>
  </nav>
  <h1>I tuoi preferiti</h1>
  <section id="preferiti-container">Caricamento...</section>
  
  <script src="preferiti.js"></script>
</body>
</html>