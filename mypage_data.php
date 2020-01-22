<?php

    //DBへの接続
    require('php/db_connect.php');

    if(ISSET($_POST["name"])){
        
        $username = $_POST["name"];

        // ユーザーの記録を取得
        $record_query = "SELECT * FROM galea_record WHERE username = '{$username}'";
        $record_result= $db->query($record_query);

        if($record_result){
            $record_data = [];
            foreach($record_result as $row){
                $record_data["now_point"] = $row["now_point"];
                $record_data["correct_num"] = $row["correct_num"];
                $record_data["correct_percent"] = $row["correct_percent"];
            }
            echo json_encode($record_data);
        }else{
            $backData = "no";
            echo json_encode($backData);
        }
    
    }

?>