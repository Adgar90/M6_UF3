<?php
    //include per fer servir la connexió
    include('db_connection.php');
    //agafem el value que rep per method post
    $districte_id = $_POST['id'];

    $select = 'SELECT * FROM barris WHERE id_districte='.$districte_id;
    $result = mysqli_query($conn, $select);
    
    $return = array();

     //Creació d'objecte per afegir les dades de les subcategories
     foreach ($result->fetch_all(MYSQLI_ASSOC) as $row){
        $object = new stdClass();
        $object->id = $row["id"];
        $object->name = $row["name"];
        array_push($return, $object);
    }
    echo json_encode($return);

    mysqli_close($conn);