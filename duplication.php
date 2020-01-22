<?php

/*
    login_siwtch
    1  かり登録状態
    0  登録されている状態
    2  削除状態
*/

//DBへの接続
require('php/db_connect.php');

$backData = "";
//データのアップロード
if(ISSET($_POST["username"])){
    //データの受取
    $username = filter_input(INPUT_POST,"username");
    $mail = filter_input(INPUT_POST,"mail");

    //重複検索
    $mailQuery = "SELECT * FROM galea_company WHERE (mail = '{$mail}' AND login_switch = 0)";
    $nameQueryComapny = "SELECT * FROM galea_company WHERE (company_name = '{$username}' AND login_switch = 0)";
    $nameQueryUser = "SELECT * FROM galea_user WHERE (username = '{$username}' AND login_switch = 0)";

    $mailResult = $db->query($mailQuery);
    $nameResultCompany = $db->query($nameQueryComapny);
    $nameResultUser = $db->query($nameQueryUser);

    if($nameResultUser->rowCount()){
        $backData = 12;
        echo json_encode($backData);
    }else if($nameResultCompany->rowCount()){
        $backData = 12;
        echo json_encode($backData);
    }else if($mailResult->rowCount()){
        $backData = 11;
        echo json_encode($backData);
    }else{
        $backData = true;
        echo json_encode($backData);
    }
}

?>