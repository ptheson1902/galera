<?php

//new_switch
// 1 新しいもの
// 0 すでに知らせたもの

//DBへの接続
    require('php/db_connect.php');
  
    if(ISSET($_POST["name"])){
        //ユーザーの記録を取得
        $switch = $_POST["switch"];
        if($switch == "view"){
            $username = $_POST["name"];
            $message_query = "SELECT * FROM galea_enquiry WHERE username = '$username' AND new_switch = 1";
            $message_result = $db->query($message_query);

            $message_data = [];

            if($message_result){

                foreach($message_result as $key=>$value){
                    $message_data[$key]["company_name"] = $value["company_name"];
                    $message_data[$key]["answer_time"] = $value["answer_time"];
                }

                echo json_encode($message_data);
            }
        }else{
            $name = $_POST["name"];
            $message_set_query = "UPDATE galea_enquiry SET new_switch = 0 WHERE(username = '$name' AND new_switch = 1)";
            $message_set_result = $db->query($message_set_query);

            if(!$message_set_result){
                echo json_encode($message_set_query);
            }else{
                echo json_encode("ok");
            }
        }
    }

?>