<?php
session_start();

if (!isset($_SESSION['email'])) {
    header("Location: login_session.php");
    exit;
}

$conn = mysqli_connect("localhost", "root", "", "traveluma");

if (!$conn) {
    die("Connessione al database fallita.");
}

$email = $_SESSION['email'];

$query = "SELECT viaggi.nome, viaggi.prezzo, viaggi.immagine
          FROM preferiti
          JOIN viaggi ON preferiti.id_viaggio = viaggi.id
          WHERE preferiti.email_utente = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

$preferiti = [];
while ($row = mysqli_fetch_assoc($result)) {
    $preferiti[] = $row;
}
mysqli_close($conn);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>TRAVELUMA - Preferiti</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <h1>I tuoi viaggi preferiti</h1>
    <?php if (empty($preferiti)): ?>
        <p>Non hai ancora aggiunto preferiti.</p>
    <?php else: ?>
        <ul>
            <?php foreach ($preferiti as $viaggio): ?>
                <li style="margin-bottom: 20px;">
                    <img src="<?= htmlspecialchars($viaggio['immagine']) ?>" width="150">
                    <strong><?= htmlspecialchars($viaggio['nome']) ?></strong> - 
                    <?= htmlspecialchars($viaggio['prezzo']) ?> €
                </li>
            <?php endforeach; ?>
        </ul>
    <?php endif; ?>
    <p><a href="home_session.php">Torna al profilo</a></p>
    <p><a href="index.php">Torna alla home del sito</a></p>
</body>
</html>