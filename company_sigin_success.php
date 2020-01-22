<?php

    /*
    login_siwtch
    1  かり登録状態
    0  登録されている状態
    2  削除状態
    */

    //DBへの接続
    require('php/db_connect.php');

    if(ISSET($_POST["success_data"])){   
        $success = $_POST["success_data"];
        if($success=="true"){
            $username = $_POST["name"];
            //ユーザー認証処理 3
            $userInsertQuery = "UPDATE galea_company SET login_switch = 0 WHERE (company_name = '{$username}' AND login_switch = 1) ";
            $result = $db->query($userInsertQuery);
            if($result){
                //トークン発行
                $tokenID = get_csrf_token();
                $backData = "{$tokenID}";
                $dateTime = "now()";
                
                //トークンデータを保存
                $tokenQuery = "INSERT INTO `galea_token`(`token_id`, `username`, `createdate`,`user_type`) VALUES ('{$tokenID}','{$username}',$dateTime,1)";
                $result = $db->query($tokenQuery);

                $user_record_query = "INSERT INTO `galea_record`(`username`) VALUES ('$username')";
                $db->query($user_record_query);
                
                if(!$result){
                    $backData = "{$tokenQuery}";
                    echo json_encode($backData);
                }else{
                    setcookie("userID",$tokenID,time()+60,"/");
                    $backData = "trueA";
                    echo json_encode($backData);
                }
            }else{
                $backData = "falseA";
                echo json_encode($backData);
            }         
        }else if($success=="false"){
            $username = $_POST["name"];
            //ユーザー認証処理 2
            $userInsertQuery = "UPDATE galea_company SET login_switch = 2 WHERE (company_name = '{$username}' AND login_switch = 1) ";
            $result = $db->query($userInsertQuery);
            if($result){
                $backData = "trueB";
                echo json_encode($backData);
            }else{
                $backData = "falseB";
                echo json_encode($backData);
            }
        }
    }

    //tokenの発行
    function get_csrf_token() {
        $TOKEN_LENGTH = 16;
        $bytes = openssl_random_pseudo_bytes($TOKEN_LENGTH);
        return bin2hex($bytes);
    }

?>