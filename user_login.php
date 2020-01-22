<?php
/*
    login_siwtch
    1  かり登録状態
    0  登録されている状態
    2  削除状態
*/

//DBへの接続
require('php/db_connect.php');

    //データのアップロード
    if(ISSET($_POST["username"])){
        $backData = array();
        $userName = $_POST["username"];
        $userPass = $_POST["password"];
        $state = $_POST["state"];

        //DBから結果を取る
        $result_user = $db->query("SELECT * FROM galea_user WHERE (username='{$userName}' AND login_switch=0)");
        $result_company = $db->query("SELECT * FROM galea_company WHERE (company_name='{$userName}' AND login_switch=0)");

        if($result_company->rowCount()){
            foreach($result_company as $row){
                $_userPass = $row["company_password"];
                $_userName = $row["company_name"];
            }//foreach
            $user_type = 1;
        }else if($result_user->rowCount()){
            foreach($result_user as $row){
                $_userPass = $row["password"];
                $_userName = $row["username"];
            }//foreach
            $user_type = 2;
        }else{
            $backData = array('login'=>false); 
        }

        if(($user_type == 1)|($user_type == 2)){
            $_salt = "galea-user" ;
            $_hasPassword = hash("md5",$userPass);
            $_hasSalt = hash("md5",$_salt);
            $_hasSaltPassword = hash("sha256",$_hasPassword.$_hasSalt);
            
            if($_userPass == $_hasSaltPassword){
                // トークン発行
                $tokenID = get_csrf_token();
                $backData = "{$tokenID}";
                $dateTime = "now()";
                
                //トークンデータを保存
                $tokenQuery = "INSERT INTO `galea_token`(`token_id`, `username`, `createdate`, `user_type`) VALUES ('$tokenID','$userName',$dateTime,$user_type)";
                $result = $db->query($tokenQuery);

                if($state = true){
                    setcookie("userID",$tokenID,time()+60*14400,"/");
                }else{
                    setcookie("userID",$tokenID,time()+60,"/");
                }
                $backData = array('login'=>true);
            }else{
                $backData = array('login'=>false);
            }
        }
        echo json_encode($backData);
    }

    //tokenの発行
    function get_csrf_token() {
        $TOKEN_LENGTH = 16;
        $bytes = openssl_random_pseudo_bytes($TOKEN_LENGTH);
        return bin2hex($bytes);
    }

?>