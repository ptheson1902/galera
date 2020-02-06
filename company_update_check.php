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
if(ISSET($_POST["username"])){
    //データの受取
    $username = filter_input(INPUT_POST,"username");
    $mail = filter_input(INPUT_POST,"mail");

    $oldname = $_POST["oldname"];

    $mail_query = "SELECT * FROM galea_company WHERE company_name != '{$oldname}' AND mail = '{$mail}' AND login_switch = 0 ";
    $name_query = "SELECT * FROM galea_company WHERE company_name != '{$oldname}' AND company_name = '{$username}' AND login_switch = 0 ";
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
        echo json_encode("ok");
    }

}

?>