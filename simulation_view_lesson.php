<?php

//DBへの接続
require('php/db_connect.php');

if(ISSET($_POST["view"])){
    //当ステップのゲームデータを取得
    $view = $_POST["view"];
    $view++;
    $username = $_POST["name"];
    $view_query = "SELECT now_simlation{$view}_num FROM galea_record WHERE username = '$username'";
    $view_result = $db->query($view_query);

    foreach($view_result as $row){
        $lesson_now = $row["now_simlation{$view}_num"];
    }
    
    // $backData = "ok";
    echo json_encode($lesson_now);

}

?>