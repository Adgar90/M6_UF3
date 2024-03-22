<?php
    include('db_connection.php');

    $select = 'SELECT * FROM districtes';
    $result = mysqli_query($conn, $select);
    
    $return = array();
    //Creació d'objecte per afegir les dades de les categories
    foreach ($result->fetch_all(MYSQLI_ASSOC) as $row){
        $object = new stdClass();
        $object->id = $row["id"];
        $object->name = $row["name"];
        $return[] = $object; 
    }
    echo json_encode($return);

    mysqli_close($conn);