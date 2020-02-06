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

//データのアップロード
if(ISSET($_POST["company_name"])){
    //データの受取
    $oldname = $_POST["oldname"];
    $username = filter_input(INPUT_POST,"company_name");
    $mail = filter_input(INPUT_POST,"mail");
    $point = filter_input(INPUT_POST,"point");
    $catch = filter_input(INPUT_POST,"catch");
    $desc = filter_input(INPUT_POST,"desc");
    $phone = filter_input(INPUT_POST,"phone");

    $address = filter_input(INPUT_POST,"address");
    $people = filter_input(INPUT_POST,"people");
    $money = filter_input(INPUT_POST,"money");
    $agent = filter_input(INPUT_POST,"agent");

    //全角変換
    $username = mb_convert_kana($username,"as");
    $agent = mb_convert_kana($agent,"as");
    $mail = mb_convert_kana($mail,"as");

    //スペース
    $username = trim($username);
    $mail = trim($mail);
    $agent = trim($agent);
    $mail = trim($mail);
    
    if($phone !== ""){
        $user_update_phone = "UPDATE  `galea_company` SET `phone`='{$phone}' WHERE company_name = '{$oldname}'";
        $db->query($user_update_phone);
    }
    if($address !== ""){
        $user_update_address = "UPDATE  `galea_company` SET `address`='{$address}' WHERE company_name = '{$oldname}'";
        $db->query($user_update_address);
    }
    if($people !== ""){
        $user_update_people = "UPDATE  `galea_company` SET `people`='{$people}' WHERE company_name = '{$oldname}'";
        $db->query($user_update_people);
    }
    if($money !== ""){
        $user_update_money = "UPDATE  `galea_company` SET `money`='{$money}' WHERE company_name = '{$oldname}'";
        $db->query($user_update_money);
    }
    if($agent !== ""){
        $user_update_agent = "UPDATE  `galea_company` SET `agent`='{$agent}' WHERE company_name = '{$oldname}'";
        $db->query($user_update_agent);
    }

    //データベースにデータ
    $user_update_query = "UPDATE `galea_company` SET `company_name`='{$username}',`mail`='{$mail}',`company_point`='{$point}',`catch`='{$catch}',`company_desc`='{$desc}' WHERE company_name = '{$oldname}'";
    $user_record_update_query = "UPDATE `galea_record` SET `username`='{$username}' WHERE username = '{$oldname}'";
    $user_enquiry_update_query = "UPDATE `galea_enquiry` SET `company_name`='{$username}' WHERE company_name = '{$oldname}'";
    $user_companylike_update_query = "UPDATE `galea_company_like` SET `username`='{$username}' WHERE username = '{$oldname}'";
    $user_like_update_query = "UPDATE `galea_company_like` SET `company_name`='{$username}' WHERE company_name = '{$oldname}'";
    $user_token_update_query = "UPDATE `galea_token` SET `username`='{$username}' WHERE username = '{$oldname}'";
    $user_update_result = $db->query($user_update_query);
    $user_record_update_result = $db->query($user_record_update_query);
    $user_enquiry_update_result = $db->query($user_enquiry_update_query);
    $user_like_update_result = $db->query($user_like_update_query);
    $user_companylike_update_result = $db->query($user_companylike_update_query);
    $user_token_update_result = $db->query($user_token_update_query);
    
    if(!$user_update_result){
        $backData = $user_update_query;
        echo json_encode($backData);
    }else if(!$user_record_update_result){
        $backData = $user_record_update_query;
        echo json_encode($backData);
    }else if(!$user_enquiry_update_result){
        $backData = $user_enquiry_update_query;
        echo json_encode($backData);
    }else if(!$user_like_update_result){
        $backData = $user_companylike_update_query;
        echo json_encode($backData);
    }else if(!$user_companylike_update_result){
        $backData = $user_like_update_query;
        echo json_encode($backData);
    }else if(!$user_token_update_result){
        $backData = $user_token_update_query;
        echo json_encode($backData);
    }else{
        $backData = "ok";
        echo json_encode($backData);
    }
}

?>