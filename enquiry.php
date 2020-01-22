<?php

//switch
// 0  審査中
// 1  回答待ち中
// 2  公開

//DBへの接続
require('php/db_connect.php');
  
if(ISSET($_POST["user"])){
    $username = $_POST["user"];
    $company = $_POST["company_name"];
    $enquiry = filter_input(INPUT_POST,"enquiry");
    
    //スペース
    $enquiry = trim($enquiry);
    $enquiry = htmlspecialchars($enquiry);

    $time = "now()";

    //重複探し
    $enquiry_select_query = "SELECT * FROM galea_enquiry WHERE(company_name = '$company' AND question = '$enquiry')";
    $enquiry_select_result = $db->query($enquiry_select_query);

    if($enquiry_select_result->rowCount()){
        $backData = "1";
    }else{
        //データベースにデータ
        $backData = "ok";
        $enquiry_insert_query = "INSERT INTO `galea_enquiry`(`username`,`company_name`,`question`,`question_time`,`switch`) VALUES ('$username','$company','$enquiry',$time,'1')";
        $enquiry_insert_result = $db->query($enquiry_insert_query);
    }

    echo json_encode($backData);
}//if

?>