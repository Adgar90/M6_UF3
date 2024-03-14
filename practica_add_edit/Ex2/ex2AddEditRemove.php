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
    //Realitzem isset per comprovar que esta setejat la variable "state"
    if(isset($_POST["state"])) {
        //Condicional per comprovar quina query hem de realitzar
        if ($_POST["state"] == "remove") {
            $sql = "DELETE FROM `productes` where id=".$_POST['id'];
        } else {
            if(isset($_POST["nomProducte"]) && !empty($_POST["nomProducte"])){
                
                if($_POST["id"]==0){
                    $sql = "INSERT INTO productes (nom) VALUES ('" . $_POST["nomProducte"] ."')";
                }else{
                    $sql = "UPDATE productes SET nom='" . $_POST["nomProducte"] . "' WHERE id=" . $_POST["id"];
                }
    
            }
        }

        echo $sql;
        if ($conn->query($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        $conn->close();
    }    
    
    header('Location: ex2FormLlistat.php');

?>