<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();

if (!isset($_SESSION['email'])) {
    header("Location: login_session.php");
    exit;
}
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>TRAVELUMA - Home</title>
    <link rel="stylesheet" href="index.css">
</head>

<body>

    <header>
        <h1>Benvenuto su TRAVELUMA, <?php echo htmlspecialchars($_SESSION["nome"]); ?>!</h1>
        <p>Email: <?php echo htmlspecialchars($_SESSION["email"]); ?></p>
        <p><a href="logout_session.php">Logout</a></p>
    </header>

    <main>
        <h2>Cosa vuoi fare oggi?</h2>
        <ul>
            <li><a href="preferiti_home.php">Visualizza la lista dei viaggi preferiti</a></li>
            <li><a href="carrello.php">Controlla il tuo carrello</a></li>
            <li><a href="#">Modifica il profilo</a></li>
        </ul>
    </main>

    <footer>
        <p>&copy; 2025 TRAVELUMA. Tutti i diritti riservati.</p>
    </footer>

</body>

</html>