<?php

    //DBへの接続
    require('php/db_connect.php');

    if(ISSET($_POST)){
        $_username = $_POST["now_user"];
        
        $company_like_query = "SELECT company_name FROM galea_company_like WHERE username = '{$_username}'";
        $company_like_result = $db->query($company_like_query);

        $company_like_data = [];
        foreach($company_like_result as $key => $value){
            $company_like_data[$key] = $value["company_name"];
        }

        echo json_encode($company_like_data);
    }

?>