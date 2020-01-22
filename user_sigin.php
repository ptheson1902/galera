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
if(ISSET($_POST["username"])){
    //データの受取
    $username = filter_input(INPUT_POST,"username");
    $mail = filter_input(INPUT_POST,"mail");
    $password = filter_input(INPUT_POST,"password");

    //全角変換
    $username = mb_convert_kana($username,"as");
    //スペース
    $username = trim($username);
    $password = trim($password);
    $mail = trim($mail);
    //無害化
    $username = htmlspecialchars($username);
    $password = htmlspecialchars($password);
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

    if($password === ""){
        $backData = 6;
        echo json_encode($backData);
        $error_flag = true;
    }else if(!preg_match('/^([a-zA-Z0-9])+$/',$password)){
        $backData = 1;
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
        $mailQuery = "SELECT * FROM galea_user WHERE mail = '{$mail}' AND login_switch = 0 ";
        $nameQuery = "SELECT * FROM galea_user WHERE username = '{$username}' AND login_switch = 0 ";
        $mailResult = $db->query($mailQuery);
        $nameResult = $db->query($nameQuery);

        if($nameResult->rowCount()){
            $backData = 12;
            echo json_encode($backData);
            $error_flag = true;
        }else if($mailResult->rowCount()){
            $backData = 11;
            echo json_encode($backData);
            $error_flag = true;
        }else{
            $authent="";
            //  メール認証  //
            //最大値
            $max = pow(10,6) - 1;
            //乱数
            $rand = random_int(100100,$max);
           
            //日付け
            $nowDate = date('Y/m/d');
        
            $title = "【gelea・認証用】Thank you for atend with us! ";
            $content = "{$username} さん<br>本サービスをご利用いただき、誠にありがとうございます。<br>認証番号：{$rand}<br>このメールに返信する必要はありません。<br>{$nowDate}";
        
            //メール送信
            $sendMail = new PHPMailer();
            $sendMail->IsSMTP();
            $sendMail->SMTPDebug = 1;
            $sendMail->Host = MAIL_HOST;
            $sendMail->SMTPSecure = MAIL_ENCRPT;
            $sendMail->Port = SMTP_PORT;
            $sendMail->SMTPAuth = true;
            $sendMail->IsHTML(true);
            $sendMail->Username = MAIL_USERNAME;
            $sendMail->Password = MAIL_PASSWORD;
            $sendMail->setFrom(MAIL_FROM,MAIL_FROM_NAME);
            $sendMail->CharSet = "utf-8";
            $sendMail->Encoding = "base64";
        
            $sendMail->addAddress($mail);
            $sendMail->Subject = mb_convert_encoding($title,"UTF-8");
            $sendMail->Body =  mb_convert_encoding($content,"UTF-8");

            if(!$sendMail->send()){
                $authent  = false;
                // $message .= "Mailer Error: " . $sendMail->ErrorInfo;
            }else{
                $authent  = true;
            }

            $message = [$authent,$rand,$username];
            echo json_encode($message);

            if($authent = true){
                //パスワード処理
                $_salt = "galea-user" ;
                $_hasPassword = hash("md5",$password);
                $_hasSalt = hash("md5",$_salt);
                $_hasSaltPassword = hash("sha256",$_hasPassword.$_hasSalt);

                //データベースにデータ
                $userInsertQuery = "INSERT INTO `galea_user`(`job`, `work`, `mail`, `password`, `login_switch`, `username`) VALUES ($occupation,$field,'{$mail}','{$_hasSaltPassword}',1,'{$username}')";
                $dressInsertQuery = "INSERT INTO `galea_user_part`(`user_name`) VALUES ('{$username}')";
                $db->query($userInsertQuery);
                $db->query($dressInsertQuery);
            }//if
        }//if
    }
}

?>