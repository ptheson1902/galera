<?php

    //DBへの接続
    require('php/db_connect.php');
    
    if(ISSET($_POST["data"])){
        $image_name = filter_input(INPUT_POST,"name");
        $_base64_image = filter_input(INPUT_POST,"data");
        
        $image_type = image_type_check($_base64_image);
        //$image_size = [];
        $image_size = image_size_check($_base64_image);
        $image_data = image_send($_base64_image);

        if($image_type == null){
            $backData = 23;
            echo json_encode($backData);
        }else if($image_size !== true){
            $backData = 24;
            echo json_encode($backData);
        }else{
            if($image_data[0]>600){
                image_trimming($image_data[2],$image_data[0],600,"x","y",$image_name);
            }else{
                image_trimming($image_data[2],$image_data[1],300,"y","x",$image_name);
            }//if
        }//if
    }//if

    //種類に合うかどうかのチェック
    function image_type_check($_base64_image){
        //情報を分析
        $put_image_size = getimagesize($_base64_image);
        $put_mime_type = $put_image_size["mime"];
        return $put_mime_type;
    }

    //幅・高さが足りるかどうかをチェック
    function image_size_check($_base64_image){
        //情報を分析
        $put_image_size = getimagesize($_base64_image);
        $width = $put_image_size[0];
        $height = $put_image_size[1];

        if($width<=600 && $height<=300){
            return false;
        }else{
            return true;
        }
    }

    //画像のリサイズ・トリミング
    function image_send($_base64_image){
        //情報を分析
        $put_image_size = getimagesize($_base64_image);
        $put_mime_type = $put_image_size["mime"];

        //画像idの取得
        $image_id = "";
        switch($put_mime_type){
            case 'image/jpeg':
                $image_id = imagecreatefromjpeg($_base64_image);
                break;
            case 'image/png':
                $image_id = imagecreatefrompng($_base64_image);
                break;
            case 'image/gif':
                $image_id = imagecreatefromgif($_base64_image);
                break;
        }

        //目標サイズの取得
        $width = $put_image_size[0];
        $height = $put_image_size[1];

        $result = "";
        $new_width = "";
        $new_height = "";

        $result = ($height*600)/$width;
        $result = intval($result);
        $new_height = $result;

        if($new_height<=300){
            $result = ($width*300)/$height;
            $result = intval($result);
            $new_width = $result;
        }

        if($new_width !== ""){
            $new_height = 300;
        }else{
            $new_width = 600;
        }

        $img_canvas = imagecreatetruecolor($new_width,$new_height);
        
        imagecopyresampled(
            $img_canvas,$image_id,
            0,0,0,0,
            $new_width,$new_height,$width,$height
        );
        
        $img_path = "temp/temp";
        $img_quality = 90;

        switch($put_mime_type){
            case 'image/jpeg':
                imagejpeg($img_canvas,"{$img_path}.jpg",$img_quality);
                $img_type = "jpg";
                break;
            case 'image/png' :
                $img_quality = 9;
                imagepng($img_canvas,"{$img_path}.png",$img_quality);
                $img_type = "png";
                break;
            case 'image/gif' :
                imagegif($img_canvas,"{$img_path}.gif",$img_quality);
                $img_type = "gif";
                break;
        }

        $image_file = file_get_contents($img_path.".".$img_type);
       
        //新しくできた幅・高を返す
        $back_size= [$new_width,$new_height,$image_file];
        return $back_size;
    }

    function image_trimming($image_file,$new_width_height,$rule_length,$side1,$side2,$company_name){
        //トリミングするときの始めるところ
        $new_length = (intval($new_width_height)-intval($rule_length))/2;
        
        //ファイル分析
        $temp_image_base64 = base64_encode($image_file);
        $temp_image_base64 = "data:;base64,".$temp_image_base64;
        $temp_image_size = getimagesize($temp_image_base64);
        $temp_mime_type = $temp_image_size["mime"];
        
        switch($temp_mime_type){
            case 'image/jpeg':
                $image_id = imagecreatefromjpeg($temp_image_base64);
                break;
            case 'image/png':
                $image_id = imagecreatefrompng($temp_image_base64);
                break;
            case 'image/gif':
                $image_id = imagecreatefromgif($temp_image_base64);
                break;
        }
       
        $temp_image_crop = imagecrop($image_id,[$side1=>$new_length,$side2=>0,'width'=>600,'height'=>300]);
        
        $temp_new_path = "temp/temp";
        $temp_new_quality = 90;
        
        switch($temp_mime_type){
            case 'image/jpeg':
                imagejpeg($temp_image_crop,"{$temp_new_path}.jpg",$temp_new_quality);
                $temp_type = "jpg";
                break;
            case 'image/png' :
                $temp_new_quality = 9;
                imagepng($temp_image_crop,"{$temp_new_path}.png",$temp_new_quality);
                $temp_type = "png";
                break;
            case 'image/gif' :
                imagegif($temp_image_crop,"{$temp_new_path}.gif",$temp_new_quality);
                $temp_type = "gif";
                break;
        }

        $temp_file = file_get_contents($temp_new_path.".".$temp_type);
        $temp_base64 = base64_encode($temp_file);
        
        //データベースに入れる
        require('php/db_connect.php');
        $_createdate = "now()";
        $imageQuery = "INSERT INTO galea_image(company_name,`binary`,`mine`,`ex`,created_at) VALUES ('$company_name','$temp_base64','$temp_mime_type','$temp_type',$_createdate)";
        $db->query($imageQuery);
        $backData = "ok";
        echo json_encode($backData);
    }

?>