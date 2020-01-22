<?php

    //DBへの接続
    require('php/db_connect.php');

    if(ISSET($_POST["switch"])){
        //点数・正確率・正答の数
        $point = $_POST["now_point"];
        $new_correct_num = $_POST["correct"];
        $new_incorrect_num = $_POST["incorrect"];
        
        $username = $_POST["name"];

        $old_correct_query = "SELECT * FROM galea_record WHERE username = '{$username}'";
        $old_correct_result= $db->query($old_correct_query);

        $old_correct_num = 0;
        $old_incorrect_num = 0;
        foreach($old_correct_result as $row){
            $old_correct_num = $row["correct_num"];
            $old_incorrect_num = $row["incorrect_num"];
        }

        $incorrect_num = $old_incorrect_num+$new_incorrect_num;
        $correct_num = $old_correct_num+$new_correct_num;

        $percent = round(($correct_num*100)/($correct_num+$incorrect_num),2);

        $correct_update_query = "UPDATE galea_record SET now_point = $point,correct_percent = $percent,correct_num = $correct_num,incorrect_num = $incorrect_num WHERE username = '{$username}'";
        $correct_update_result = $db->query($correct_update_query);

        $backData = $point;
        echo json_encode($backData);

        //問題・ジャンルのユーザーごと記録
        if($_POST["switch"]=="game"){
            $new_step = $_POST["step"];
            $game_update_query = "UPDATE galea_record SET now_game_num = $new_step WHERE username = '{$username}'";
            $game_update_result = $db->query($game_update_query); 
        }
    }

?>