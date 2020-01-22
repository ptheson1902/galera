<?php

/*
    login_siwtch
    1  かり登録状態
    0  登録されている状態
    2  削除状態
*/

//DBへの接続
require('php/db_connect.php');

    if(ISSET($_POST["switch"])){
        /// パス指定でcookieを削除
        if($_COOKIE["userID"]){
            $tokenID = $_COOKIE["userID"];
            setcookie("userID",$tokenID,time(),"/");
            unset($_COOKIE["userID"]);
        }
        $backData = "true";
        echo json_encode($backData);
    }

?>