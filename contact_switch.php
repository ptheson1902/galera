<?php

    //DBへの接続
    require('php/db_connect.php');

    if(ISSET($_POST["switch"])){
        $_switch = $_POST["switch"];
        $_num = $_POST["num"];
        if($_switch == "fly"){
            $contact_fly_query = "UPDATE galea_enquiry SET switch = 0 WHERE `id` = '{$_num}'";
            $contact_fly_result = $db->query($contact_fly_query);

            if($contact_fly_result){
                $backData = "ok";
                echo json_encode($backData);
            }
        }else{
            $time = "now()";
            $_answer = $_POST["answer"];
            $contact_resend_query = "UPDATE galea_enquiry SET answer = '{$_answer}',answer_time = $time,switch = 2,new_switch = 1 WHERE `id` = '{$_num}'";
            $contact_resend_result = $db->query($contact_resend_query);

            if($contact_resend_result){
                $backData = "ok";
                echo json_encode($backData);
            }
        }
    }//if

?>