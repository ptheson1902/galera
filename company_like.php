<?php

    //DBへの接続
    require('php/db_connect.php');
  
    if(ISSET($_POST["company"])){
        
        $company_name = $_POST["company"];
        $username = $_POST["user"];

        //ユーザーを好き押した記録
        $record_query = "INSERT INTO `galea_company_like`(`company_name`, `username`) VALUES ('{$company_name}','{$username}')";
        $record_result = $db->query($record_query);
       
        //今の好きの数を取得
        $like_query = "SELECT like_num FROM galea_company WHERE company_name = '{$company_name}'";
        $like_result = $db->query($like_query);

        if($like_result){
            foreach($like_result as $row){
                $like_num = $row["like_num"];
            }
        }
        
        $like_num++;
        
        $like_update_query = "UPDATE galea_company SET like_num = '{$like_num}' WHERE company_name = '{$company_name}'";
        $like_update_result = $db->query($like_update_query);

        $backData = "ok";
        echo json_encode($backData);
    }

?>