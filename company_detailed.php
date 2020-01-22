<?php

    //DBへの接続
    require('php/db_connect.php');
    
    if(ISSET($_POST["company_name"])){
        
        $company_name = $_POST["company_name"];
        
        //今の好きの数を取得
        $detailed_query = "SELECT company_desc,mail,people,`money`,agent,phone,`address` FROM galea_company WHERE company_name = '{$company_name}'";
        $detailed_result = $db->query($detailed_query);

        $company_data = [];
        if($detailed_result){
            foreach($detailed_result as $row){
                $company_data["company_desc"] = $row["company_desc"];
                $company_data["mail"] = $row["mail"];
                $company_data["people"] = $row["people"];
                $company_data["money"] = $row["money"];
                $company_data["agent"] = $row["agent"];
                $company_data["phone"] = $row["phone"];
                $company_data["address"] = $row["address"];
            }
        }

        echo json_encode($company_data);
        
    }

?>