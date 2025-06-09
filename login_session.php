<?php
session_start();

var_dump($_POST);

if (isset($_SESSION["email"])) {
    header("Location: home_session.php");
    exit;
}

if (isset($_POST["email"]) && isset($_POST["password"])) {

    $conn = mysqli_connect("localhost", "root", "", "traveluma");

    if (!$conn) {
        die("Connessione fallita: " . mysqli_connect_error());
    }

    $query = "SELECT * FROM utenti WHERE email = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $_POST["email"]);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {

        var_dump($_POST["password"]);
        var_dump($row["password"]);

        if (password_verify($_POST["password"], $row["password"])) {
            echo "Password OK<br>";
            $_SESSION["email"] = $row["email"];
            $_SESSION["nome"] = $row["nome"];

            header("Location: home_session.php");
            exit;
        } else {
            echo "Password NON valida<br>";
            $errore = true;
        }
    } else {
        echo "Email NON trovata<br>";
        $errore = true;
    }

    mysqli_close($conn);
}
?>

<html>
    <head>
        <meta charset="utf-8">
        <title>TRAVELUMA - Login</title>
    </head>
    <body>
        <?php
            if (isset($errore)) {
                echo "<p class='errore'>Credenziali non valide.</p>";
            }
        ?>
        <main>
            <h1>TRAVELUMA - Login</h1>
            <form name='nome_form' method='post'>
                <p>
                    <label>Email <input type='text' name='email' required></label>
                </p>
                <p>
                    <label>Password <input type='password' name='password' required></label>
                </p>
                <p>
                    <input type='submit' value='Accedi'>
                </p>
            </form>
        </main>
    </body>
</html>