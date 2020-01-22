<?php

/*
    login_siwtch
    1  かり登録状態
    0  登録されている状態
    2  削除状態
*/
    //DBへの接続
    require('php/db_connect.php');
    //今のユーザー情報
    if(ISSET($_POST["switch"])){
        // $user_type = $_POST["type"];
        if(ISSET($_COOKIE["userID"])){
            $userID = $_COOKIE["userID"];
            $userQuery = "SELECT * FROM galea_token WHERE token_id = '{$userID}'";
            $userResult = $db->query($userQuery);
            if(!$userResult){
                $backData = $userQuery;
                echo json_encode($backData);
            }else{
                foreach ($userResult as $row) {
                    $username = $row["username"];
                    $usertype = $row["user_type"];
                }
                if($usertype == 1){
                    $companyMessQuery = "SELECT * FROM galea_company WHERE company_name = '{$username}'";
                    $companyMessResult= $db->query($companyMessQuery);
                    if($companyMessResult){
                        $userData = [];
                        foreach ($companyMessResult as $row){
                            $userData["username"] = $row["company_name"];
                            $userData["reference"] = $row["company_point"];
                            $userData["mail"] = $row["mail"];
                            $userData["catch"] = $row["catch"];
                            $userData["company_desc"] = $row["company_desc"];
                            $userData["money"] = $row["money"];
                            $userData["agent"] = $row["agent"];
                            $userData["phone"] = $row["phone"];
                            $userData["address"] = $row["address"];
                            $userData["like"] = $row["like_num"];
                        }
                        $userData["type"] = 1;
                        echo json_encode($userData);
                    }else{
                        $backData = "no";
                        echo json_encode($backData);
                    }
                }else{
                    $userMessQuery = "SELECT * FROM galea_user WHERE username = '{$username}'";
                    $userMessResult= $db->query($userMessQuery);

                    $recordQuery = "SELECT * FROM galea_record WHERE username = '{$username}'";
                    $recordResult= $db->query($recordQuery);
                    
                    $userDressQuery = "SELECT * FROM galea_user_part WHERE `user_name` = '{$username}'";
                    $userDressResult = $db->query($userDressQuery);

                    $userData = [];
                    foreach($userMessResult as $row){
                        $userData["username"] = $row["username"];
                        $userData["job"] = $row["job"];
                        $userData["work"] = $row["work"];
                        $userData["mail"] = $row["mail"];
                    }
                    foreach($userDressResult as $row){
                        $userData["dress"] = [$row["part1"],$row["part2"],$row["part3"],$row["part4"]];
                    }
                    foreach($recordResult as $row){
                        $userData["point"] = $row["now_point"];
                    }
                    $userData["type"] = 2;
                    echo json_encode($userData);
                }
            }//if
        }else{
            $backData = "noUser";
            echo json_encode($backData);
        }
    }//if

    
?>