<?php



function mailCode($mail,$username,$length){
    // $mail = "syuseyikalili@gmail.com";
    // $username = "力";
    // $rand = "666666";

    //最大値
    $max = pow(10,$length) - 1;
    //乱数
    $rand = random_int(10010,$max);

    //日付け
    $nowDate = date('Y/m/d');

    $title = "【gelea・認証用】Thank you for atend with us! ";
    $content = "{$username} さん\n"."本サービスをご利用いただき、誠にありがとうございます。\n"."認証番号：{$rand}\n"."このメールに返信する必要はありません。\n"."{$nowDate}";

    //メール送信
    $sendMail = new PHPMailer();
    $sendMail->IsSMTP();
    $sendMail->SMTPDebug = 1;
    $sendMail->Host = MAIL_HOST;
    $sendMail->SMTPSecure = MAIL_ENCRPT;
    $sendMail->Port = SMTP_PORT;
    $sendMail->SMTPAuth = true;
    $sendMail->IsHTML(false);
    $sendMail->Username = MAIL_USERNAME;
    $sendMail->Password = MAIL_PASSWORD;
    $sendMail->setFrom(MAIL_FROM,MAIL_FROM_NAME);
    $sendMail->CharSet = "utf-8";
    $sendMail->Encoding = "base64";

    $sendMail->addAddress($mail);
    $sendMail->Subject = mb_convert_encoding($title,"UTF-8");
    // $sendMail->IsHTML(true);
    $sendMail->Body =  mb_convert_encoding($content,"UTF-8");
    // $sendMail->send();
    $sendMail->send();
    // if(!$sendMail->send()) {
    //     $message  = "Message was not sent<br/ >";
    //     $message .= "Mailer Error: " . $sendMail->ErrorInfo;
    // } else {
    //     $message  = "Message has been sent";
    // }

    // return $message;
}

?>