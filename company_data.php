<?php

//DBへの接続
require('php/db_connect.php');

if(ISSET($_POST["switch"])){
    $company_data_result = "";
    $_switch = $_POST["switch"];
    $_username = $_POST["username"];
    if($_switch=="new_order"){
        //データベースから取得
        $company_data_query = "SELECT company.company_name,company.company_point,company.like_num,company.catch,image.`binary`,image.mine,image.update_at FROM galea_company as company LEFT OUTER JOIN galea_image as image ON company.company_name = image.company_name WHERE company.login_switch = 0 ORDER BY image.update_at DESC LIMIT 4";
        $company_data_result = $db->query($company_data_query);
    }
    if($_switch=="like_order"){
        $company_data_query = "SELECT company.company_name,company.company_point,company.like_num,company.catch,image.`binary`,image.mine,image.update_at FROM galea_company as company LEFT OUTER JOIN galea_image as image ON company.company_name = image.company_name WHERE company.login_switch = 0 ORDER BY company.like_num DESC LIMIT 4";
        $company_data_result = $db->query($company_data_query);
    }

    if($company_data_result){
        $company_main_data = [];
        foreach($company_data_result as $key => $value){
            $company_main_data[$key]["company_name"] = $value["company_name"];
            $company_main_data[$key]["company_point"] = $value["company_point"];
            $company_main_data[$key]["company_catch"] = $value["catch"];
            $company_main_data[$key]["company_like"] = $value["like_num"];
            $company_main_data[$key]["company_image"] = "data:".$value["mine"].";base64,".$value["binary"];
        }
        echo json_encode($company_main_data);
    }else{
        $backData = $company_data_query;
        echo json_encode($backData);
    }
}//if

?>