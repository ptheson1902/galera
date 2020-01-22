$(()=>{

    let back_mess = (input_name,message)=>{
        $(`.mypage__messageFix .${input_name} input`).focus();
        $(`.mypage__messageFix .${input_name} span`).text(message);
        $(`.mypage__messageFix .${input_name} span`).removeClass("hidden");
        setTimeout(() => {
            $(`.mypage__messageFix .${input_name} span`).text("");
        }, 3000);
    };

    let data_check = ()=>{
        //正規表現
        let _username = $(".mypage__messageFix .userName input").val();
        let _mail = $(".mypage__messageFix .mailAddress input").val();

        //正規表現
        let _mail_check = /^([a-zA-Z0-9][a-zA-Z0-9\._-]+)@([a-zA-Z0-9]+[a-zA-Z0-9\._-]+)$/;
        let _name_check = /^([一-龠ぁ-んァ-ヶA-Za-z][一-龠ぁ-んァ-ヶA-Za-z0-9]+)$/;
        let _name_length_check = /^.{1,16}$/;

        //チェック
        if(_mail==""){
            return 4;
        }else if(_username==""){
            return 5;
        }else if(!(_mail_check.test(_mail))){
            return 3;
        }else if(!(_name_check.test(_username))){
            return 8;
        }else if(!(_name_length_check.test(_username))){
            return 10;
        }
    };//data_check

    let send_data=() => {
        //オルドネーム
        let old_name = $(".loginSuccess__jaTtl span").text();

        //データ
        let username = $(".mypage__messageFix .userName input").val();
        let mail = $(".mypage__messageFix .mailAddress input").val();
        let occupation = $(".mypage__messageFix .occupation select").val();
        let field = $(".mypage__messageFix .field select").val();
    
        let send_user_data = {
            oldname: old_name,
            user_name : username,
            mail : mail,
            occupation : occupation,
            field : field
        };

        $.ajax({
            method: "POST",
            url: "user_update.php",
            data: send_user_data,
            dataType:"json",
            timeout: 3000
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
                location.reload();
            }
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    };//send_data

    //ユーザーの情報修正　完了を押すと
    $(".mypage__messageFix__btn .yes").on("click",(event)=>{
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

});