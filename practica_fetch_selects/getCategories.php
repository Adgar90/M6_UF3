<?php
    include('db_connection.php');

    $select = 'SELECT * FROM categories';
    $result = mysqli_query($conn, $select);
    
    $return = array();
    //Creació d'objecte per afegir les dades de les categories
    foreach ($result->fetch_all(MYSQLI_ASSOC) as $row){
        $object = new stdClass();
        $object->id = $row["id"];
        $object->nom = $row["nom"];
        $return[] = $object; 
    }
    echo json_encode($return);