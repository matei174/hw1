<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    var_dump($_POST); 
}


$conn = mysqli_connect("localhost", "root", "", "traveluma");

if (!$conn) {
    die("Connessione fallita: " . mysqli_connect_error());
}

$nome = $_POST['nome'];
$cognome = $_POST['cognome'];
$email = $_POST['email'];
$password = $_POST['password'];
$conferma = $_POST['conferma_password'];

if (empty($nome) || empty($cognome) || empty($email) || empty($password) || empty($conferma)) {
    echo "Compila tutti i campi.";
    exit;
}

if ($password !== $conferma) {
    echo "Le password non coincidono.";
    exit;
}

if (
    strlen($password) < 8 ||
    !preg_match('/[A-Z]/', $password) ||
    !preg_match('/[0-9]/', $password) ||
    !preg_match('/[.!?]/', $password)
) {
    echo "La password deve contenere almeno 8 caratteri, una maiuscola, un numero e un simbolo tra .,!?";
    exit;
}

$password_hash = password_hash($password, PASSWORD_DEFAULT);

$query = "SELECT * FROM utenti WHERE email = ?";
$stmt = mysqli_prepare($conn, $query);
mysqli_stmt_bind_param($stmt, "s", $email);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($result) > 0) {
    echo "Email già registrata.";
    exit;
}

$insert = "INSERT INTO utenti (nome, cognome, email, password) VALUES (?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $insert);
mysqli_stmt_bind_param($stmt, "ssss", $nome, $cognome, $email, $password_hash);

if (mysqli_stmt_execute($stmt)) {
    $messaggio = "Benvenuto, $nome!";
} else {
    $messaggio = "Errore durante la registrazione.";
}

echo $messaggio;

mysqli_close($conn);
?>