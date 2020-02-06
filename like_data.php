<?php

//DBへの接続
require('php/db_connect.php');
  
if(ISSET($_POST["name"])){
    $username = $_POST["name"];

    $like_data_query = "SELECT `like`.company_name,company.company_point FROM galea_company_like as `like` LEFT OUTER JOIN galea_company as company ON company.company_name = `like`.company_name WHERE `like`.username = '$username' ORDER BY `like`.like_time DESC LIMIT 4";

    $like_data_result = $db->query($like_data_query);

    if($like_data_result){
        $like_data = [];
        foreach($like_data_result as $key => $value){
            $like_data[$key]["company_name"] = $value["company_name"];
            $like_data[$key]["company_point"] = $value["company_point"];
        }//foreach

        echo json_encode($like_data);
    }else{
        $DataBack = $like_data_query;
        echo json_encode($DataBack);
    }
}

?>