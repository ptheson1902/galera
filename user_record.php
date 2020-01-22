<?php
    //DBへの接続
    require('php/db_connect.php');
  
    if(ISSET($_POST["name"])){
        //ユーザーの記録を取得
        $username = $_POST["name"];
        $record_query = "SELECT username,now_game_num,now_point FROM galea_record WHERE username = '$username'";
        $record_result = $db->query($record_query);

        $user_record = [];
        if($record_result){
            foreach($record_result as $_row){
                $user_record["name"] = $_row["username"];
                $user_record["now_game_num"] = $_row["now_game_num"];
                $user_record["now_point"] = $_row["now_point"];
            }
            echo json_encode($user_record);
        }else{
            $backData = "no";
            echo json_encode($backData);
        }
    }

?>