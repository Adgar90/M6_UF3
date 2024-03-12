<?php
    
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "dades";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    if(isset($_POST["id"]) && !empty($_POST["id"])){
        $sql = "DELETE FROM `productes` where id=".$_POST['id'];

        echo $sql;

        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }

        $conn->close();
    }

?>