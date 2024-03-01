<?php
    //include per fer servir la connexió
    include('db_connection.php');
    //agafem el value que rep per method post
    $id_cat = $_POST['cat'];

    $select = "SELECT * FROM `subcategories` WHERE cat in (".$id_cat.")";
    $result = mysqli_query($conn, $select);
    
    $return = array();

     //Creació d'objecte per afegir les dades de les subcategories
     foreach ($result->fetch_all(MYSQLI_ASSOC) as $row){
        $object = new stdClass();
        $object->id = $row["id"];
        $object->nom = $row["nom"];
        $return[] = $object; 
    }

    echo json_encode($return);