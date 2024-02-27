<?php
    include('db_connection.php');
    $id_cat = $_POST['cat'];
    // Inserts a subcategoria
    // $insert = 'INSERT INTO subcategories (`nom`, `cat`) VALUES ("subcat11", '.$result['id'].')';
    // mysqli_query($conn, $insert);

    $select = "SELECT * FROM `subcategories` WHERE cat=".$id_cat;
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