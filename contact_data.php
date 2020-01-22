<?php
    //DBへの接続
    require('php/db_connect.php');
    
    //問い合わせのデータを取得
    if(ISSET($_POST["name"])){
        //ユーザーの記録を取得
        $username = $_POST["name"];
        
        $contact_query = "SELECT * FROM galea_enquiry WHERE company_name = '$username' AND(switch = 1 OR switch = 2)";
        $contact_result = $db->query($contact_query);

        $contact_data = [];
        if($contact_result){
            foreach($contact_result as $key => $value){
                $contact_data[$key]["question"] = $value["question"];
                $contact_data[$key]["time"] = $value["question_time"];
                $contact_data[$key]["username"] = $value["username"];
                $contact_data[$key]["num"] = $value["id"];
                $contact_data[$key]["switch"] = $value["switch"];
            }
            echo json_encode($contact_data);
        }else{
            $backData = "no";
            echo json_encode($backData);
        }

        // $backData = "no";
        // echo json_encode($backData);
    }

?>