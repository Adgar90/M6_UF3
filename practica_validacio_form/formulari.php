<!-- Agafem els values de la nostra variable global $_POST el qual rep a través del form -->
<?php
    $name = $_POST["name"];
    $email = $_POST["email"];
    $code = $_POST["code"];
    $pass = $_POST["pass"];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resposta Form</title>
</head>
<body>
    <!-- Mostrem les dades en una llista desordenada -->
    <h1>Dades que rebem a través del formulari:</h1>
    <ul>
        <li><?php echo $name ?></li>
        <li><?php echo $email ?></li>
        <li><?php echo $code ?></li>
        <li><?php echo $pass ?></li>
    </ul>
</body>
</html>