<?php

    //DBへの接続
    require('php/db_connect.php');
    
    //着替えデータをデータベースに入れる
    $dress= [];
    if(ISSET($_POST["send"])){
        $username = $_POST["username"];
        $dress = $_POST["send"];

        $dress_set_query = "UPDATE galea_user_part SET `part1`=0,`part2`=0,`part3`=0,`part4`=0 WHERE `user_name`='{$username}'";
        $dress_set_result = $db->query($dress_set_query);

        foreach($dress as $value){
            $_dress = $value;
            $_dress = array_values($_dress);
            $type_num = $_dress[0];
            $num = $_dress[1];
            $dress_query = "UPDATE galea_user_part SET `part{$type_num}`=$num WHERE `user_name`='{$username}'";
            $dress_result = $db->query($dress_query);
        }
        echo json_encode($dress);
    }
?>