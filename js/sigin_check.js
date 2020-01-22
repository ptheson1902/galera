$(()=>{
    //ユーザーログインの確認
    let _user_btn = $(".signUser__nextBtn");

    let back_mess = (input_name,message)=>{
        $(`.signUser .${input_name} input`).focus();
        $(`.signUser .${input_name} span`).text(message);
        $(`.signUser .${input_name} span`).removeClass("hidden");
        setTimeout(() => {
            $(`.signUser .${input_name} span`).text("");
        }, 3000);
    };

    let data_check = ()=>{
        //正規表現
        let _username = $(".signUser .userName input").val();
        let _mail = $(".signUser .mailAddress input").val();
        let _password = $(".signUser .userPassword input").val();
        let _confirm_password = $(".signUser .userConfirmPassword input").val();

        //正規表現
        let _mail_check = /^([a-zA-Z0-9][a-zA-Z0-9\._-]+)@([a-zA-Z0-9]+[a-zA-Z0-9\._-]+)$/;
        let _pass_check = /^([ a-zA-Z0-9])+$/;
        let _name_check = /^([一-龠ぁ-んァ-ヶA-Za-z][一-龠ぁ-んァ-ヶA-Za-z0-9]+)$/;
        let _pass_length_check = /^.{6,16}$/;
        let _name_length_check = /^.{1,16}$/;

        //チェック
        if(_mail==""){
            return 4;
        }else if(_username==""){
            return 5;
        }else if(_password==""){
            return 6;
        }else if(_confirm_password==""){
            return 7;
        }else if(!(_pass_check.test(_password))){
            return 1;
        }else if(_password !== _confirm_password){
            return 2;
        }else if(!(_mail_check.test(_mail))){
            return 3;
        }else if(!(_name_check.test(_username))){
            return 8;
        }else if(!(_pass_length_check.test(_password))){
            return 9;
        }else if(!(_name_length_check.test(_username))){
            return 10;
        }
    };//data_check

    //エラー番号
    // 0  エラーありません
    // 1  形式に誤りがある・パスワード
    // 2  二回入力したのが異なる・パスワード
    // 3  形式に誤りがある・メール
    // 4  未入力・メール
    // 5  未入力・ユーザー名
    // 6  未入力・パスワード確認
    // 7  未入力・パスワード
    // 8  形式に誤りがある・ユーザー名
    // 9  半角英数6~16文字
    // 10 文字数制限を超えた
    // 11 このメールはすでに登録された
    // 12 このユーザー名はすでに使用された

    _user_btn.on("click",()=>{
        if(data_check()==1){
            back_mess("userPassword","形式に誤りがある");
        }else if(data_check()==2){
            back_mess("userPassword","二回入力したのが異なる");
        }else if(data_check()==3){
            back_mess("mailAddress","形式に誤りがある");
        }else if(data_check()==4){
            back_mess("mailAddress","未入力");
        }else if(data_check()==5){
            back_mess("userName","未入力");
        }else if(data_check()==6){
            back_mess("userPassword","未入力");
        }else if(data_check()==7){
            back_mess("userConfirmPassword","未入力");
        }else if(data_check()==8){
            back_mess("userName","形式に誤りがある");
        }else if(data_check()==9){
            back_mess("userPassword","半角英数6~16文字");
        }else if(data_check()==10){
            back_mess("userName","文字数制限を超えた");
        }else{
            send_data();
        }
    });

    let send_data = ()=>{
        $(".signUser__nextBtn").addClass("hidden");
        $(".signUser__waittime").removeClass("hidden");
        //データ
        let username = $(".signUser .userName input").val();
        let mail = $(".signUser .mailAddress input").val();
        let password = $(".signUser .userPassword input").val();
        let occupation = $(".signUser .occupation select").val();
        let field = $(".signUser .field select").val();

        $(".authent__ttl span").text(username);
    
        let send_user_data = {
            username : username,
            mail : mail,
            password : password,
            occupation : occupation,
            field : field
        }

        $.ajax({
            method: "POST",
            url: "user_sigin.php",
            data: send_user_data,
            dataType:"json",
            timeout: 9000
        }).done((data)=>{
            console.log(data);
            if(data == 11){
                $(".signUser__waittime").addClass("hidden");
                $(".signUser__nextBtn").removeClass("hidden");
                back_mess("mailAddress","登録されたメール");
            }else if(data == 12){
                $(".signUser__waittime").addClass("hidden");
                $(".signUser__nextBtn").removeClass("hidden");
                back_mess("userName","使用されたユーザー名");
            }else{
                let sigin_result="";
                $(".signUser__waittime").addClass("hidden");
                $(".authent").removeClass("hidden");
                $(".authent__entryBtn").on("click",(event)=>{
                    let system_num = data[1];
                    console.log(data);
                    let user_input_num = $(".authent__num input").val();
                    console.log(user_input_num);
                    if(user_input_num==system_num){
                        sigin_result = "true";
                    }else{
                        sigin_result = "false";
                    }
                    user_authent(sigin_result,data[2]);
                });
                $(".authent__closeBtn").on("click",()=>{
                    location.reload();
                });
            }
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    };//send_data


    let user_authent = (result,username)=>{
        let send_success_data = [];
        send_success_data = {success_data:result,name:username};
        console.log(send_success_data);
        $.ajax({
            method: "POST",
            url: "user_sigin_success.php",
            data: send_success_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            console.log(data);
            $(".authent__num input").val("");
            if(data == "trueB"){
                // $(".authent").addClass("hidden");
                $(".notmatch").removeClass("hidden");
            }else if(data == "trueA"){
                // $(".howtouse__ttl span").text(username);
                // $(".authent").addClass("hidden");
                $(".howtouse").removeClass("hidden");
                $(".userName input").val("");
                $(".mailAddress input").val("");
                $(".userPassword input").val("");
                $(".userConfirmPassword input").val("");
            }//if
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    };

    $(".notmatch__entryBtn").on("click",()=>{
        location.reload();
    });
    
});