<?php
session_start();

if(!isset($_SESSION['email'])) {
    header("Location: login_session.php");
    exit;
}

if(!isset($_SESSION['carrello'])) {
    $_SESSION['carrello'] = array();
}

$totale = 0;
for($i = 0; $i < count($_SESSION['carrello']); $i++) {
    $totale += $_SESSION['carrello'][$i]['prezzo'];
}
?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>TRAVELUMA - Il tuo carrello</title>
    </head>
    <body>
        <h1>Il tuo carrello</h1>

        <?php if (count($_SESSION['carrello']) == 0) : ?>
            <p>Il carrello è vuoto.</p>
        <?php else: ?>
            <ul>
                <?php
                for($i = 0; $i < count($_SESSION['carrello']); $i++) {
                    echo "<li>" .
                    htmlspecialchars($_SESSION['carrello'][$i]['nome']) .
                    " - " .
                    number_format($_SESSION['carrello'][$i]['prezzo'], 2) .
                    " €</li>";
                }
                ?>
            </ul>
            <p><strong>Totale: <?php echo number_format($totale,2); ?> €</strong></p>
        <?php endif; ?>
        
        <p><a href="home_session.php">Torna alla pagina del tuo profilo</a></p>
        <p><a href="index.php">Torna alla home del sito</a></p>
        <p><a href="carrello_svuota.php">Svuota carrello</a></p>
    </body>    
</html>