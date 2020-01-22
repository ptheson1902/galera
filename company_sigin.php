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
if(ISSET($_POST["company_name"])){
    // データの受取
    $companyname = filter_input(INPUT_POST,"company_name");
    $mail = filter_input(INPUT_POST,"mail");
    $password = filter_input(INPUT_POST,"password");
    $point = filter_input(INPUT_POST,"point");
    $catch = filter_input(INPUT_POST,"catch");
    $desc = filter_input(INPUT_POST,"desc");

    //全角変換
    $companyname = mb_convert_kana($companyname,"as");
    $catch = mb_convert_kana($catch,"as");
    $desc = mb_convert_kana($desc,"as");
    
    //スペース
    $companyname = trim($companyname);
    $password = trim($password);
    $catch = trim($catch);
    $desc = trim($desc);

    //無害化
    $companyname = htmlspecialchars($companyname);
    $password = htmlspecialchars($password);
    $mail = htmlspecialchars($mail);
    $catch = htmlspecialchars($catch);
    $desc = htmlspecialchars($desc);

    $authent="";
    //  メール認証  //
    //最大値
    $max = pow(10,6) - 1;
    //乱数
    $rand = random_int(100100,$max);
    
    //日付け
    $nowDate = date('Y/m/d');

    $title = "【gelea・認証用】Thank you for atend with us! ";
    $content = "{$companyname} さま<br>本サービスをご利用いただき、誠にありがとうございます。<br>認証番号：{$rand}<br>このメールに返信する必要はありません。<br>{$nowDate}";

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

    $message = [$authent,$rand,$companyname];
    echo json_encode($message);

    if($authent = true){
        //パスワード処理
        $_salt = "galea-user" ;
        $_hasPassword = hash("md5",$password);
        $_hasSalt = hash("md5",$_salt);
        $_hasSaltPassword = hash("sha256",$_hasPassword.$_hasSalt);

        //データベースにデータ
        $user_insert_query = "INSERT INTO `galea_company`(`company_name`,`company_point`,`company_desc`,`mail`,`catch`,`company_password`,`login_switch`) VALUES ('$companyname','$point','$desc','$mail','$catch','$_hasSaltPassword',1)";
        $db->query($user_insert_query);
    }//if
}

?>