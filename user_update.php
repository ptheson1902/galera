<?php

/*
    login_siwtch
    1  かり登録状態
    0  登録されている状態
    2  削除状態
*/

//DBへの接続
require('php/db_connect.php');
require('php/db_mail.php');

//メール設定
require('lib/PHPMailer/class.phpmailer.php');
date_default_timezone_set('Asia/Tokyo');
mb_language("ja");
mb_internal_encoding("UTF-8");

$backData = "";
$error_flag = false;
//データのアップロード
if(ISSET($_POST["user_name"])){
    //データの受取
    $username = filter_input(INPUT_POST,"user_name");
    $mail = filter_input(INPUT_POST,"mail");

    $oldname = $_POST["oldname"];

    //全角変換
    $username = mb_convert_kana($username,"as");
    //スペース
    $username = trim($username);
    $mail = trim($mail);
    //無害化
    $username = htmlspecialchars($username);
    $mail = htmlspecialchars($mail);

    $occupation = $_POST["occupation"];
    $field = $_POST["field"];

    if($username === ""){
        $backData = 5;
        echo json_encode($backData);
        $error_flag = true;
    }else if(!preg_match('/^([一-龠ぁ-んァ-ヶA-Za-z][一-龠ぁ-んァ-ヶA-Za-z0-9]+)$/',$username)){
        $backData = 3;
        echo json_encode($backData);
        $error_flag = true;
    }

    if($mail === ""){
        $backData = 4;
        echo json_encode($backData);
        $error_flag = true;
    }else if(!preg_match('/^([a-zA-Z0-9])([a-zA-Z0-9\._-]+)@([a-zA-Z0-9]+)([a-zA-Z0-9\._-]+)$/',$mail)){
        $backData = 8;
        echo json_encode($backData);
        $error_flag = true;
    }

    if($error_flag!==true){
        $mail_query = "SELECT * FROM galea_user WHERE username != '{$oldname}' AND mail = '{$mail}' AND login_switch = 0 ";
        $name_query = "SELECT * FROM galea_user WHERE username != '{$oldname}' AND username = '{$username}' AND login_switch = 0 ";
        $mail_result = $db->query($mail_query);
        $name_result = $db->query($name_query);

        if($name_result->rowCount()){
            $backData = 12;
            echo json_encode($backData);
            $error_flag = true;
        }else if($mail_result->rowCount()){
            $backData = 11;
            echo json_encode($backData);
            $error_flag = true;
        }else{
            //データベースにデータ
            $user_update_query = "UPDATE `galea_user` SET `job`='{$occupation}', `work`='{$field}', `mail`='{$mail}', `username`='{$username}' WHERE username = '{$oldname}'";
            $user_record_update_query = "UPDATE `galea_record` SET `username`='{$username}' WHERE username = '{$oldname}'";
            $user_dress_update_query = "UPDATE `galea_user_part` SET `user_name`='{$username}' WHERE `user_name` = '{$oldname}'";
            $user_enquiry_update_query = "UPDATE `galea_enquiry` SET `username`='{$username}' WHERE username = '{$oldname}'";
            $user_companylike_update_query = "UPDATE `galea_company_like` SET `username`='{$username}' WHERE username = '{$oldname}'";
            $user_token_update_query = "UPDATE `galea_token` SET `username`='{$username}' WHERE username = '{$oldname}'";
            $db->query($user_update_query);
            $db->query($user_record_update_query);
            $db->query($user_dress_update_query);
            $db->query($user_enquiry_update_query);
            $db->query($user_companylike_update_query);
            $db->query($user_token_update_query);
            
            if($user_update_query){
                $backData = "ok";
                echo json_encode($backData);
            }
        }//if
    }
}

?>