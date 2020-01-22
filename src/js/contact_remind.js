$(()=>{

     //すでに入力した数を計算
     let possible = (n)=>{
        let word_length = 0;
        for(i=0;i<n.length;i++){
            if(n[i].match(/[ -~]/)){
                word_length += 0.5;
            }else{
                word_length += 1;
            }
        }
        return word_length;
    };

    let data_check = (data)=>{
        let _text_check = /うんち|ばか|あほ|アホ|ちくしょ|チクショ|バカ|くそ|おしっこ|糞|小便|大便|遺体|死亡|亡く|殺人|自殺|他殺|暴力|死体|ヤクザ|麻薬|逝去|暴飲/m;
        
        if(data == ""){
            return 1;
        }else if((_text_check.test(data))){
            return 2;
        }else if(Math.ceil(possible(data))>250){
            return 3;
        }
    };

    //内容通らない時の処理
    let back_mess = (message)=>{
        $(".mypageCompany__rejection .text").text(message);
        $(".mypageCompany__rejection").removeClass("hidden");
    };

    //無視
    $(".contactArea").on("click",".contactArea__item .flyBtn",(event)=>{
        let _contacts_item = $(event.target).parents(".contactArea__item");
        let _contacts_id  = $(event.target).parents(".contactArea__item").attr('num');

        let send_contact_data = {switch: "fly",num: _contacts_id};

        $.ajax({
            method: "POST",
            url: "contact_switch.php",
            data: send_contact_data,
            dataType:"json",
            timeout: 3000
        }).done((fly)=>{
            if(fly == "ok"){
                _contacts_item.remove();
            }
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    });

    //返信
    $(".contactArea").on("click",".contactArea__item .resendBtn",(event)=>{
        $(event.target).parent().addClass("hidden");
        $(event.target).parents(".contactArea__item").children(".resendArea").removeClass("hidden");
    });

    //送信
    $(".contactArea").on("click",".contactArea__item .sendBtn",(event)=>{
        let _contacts_id  = $(event.target).parents(".contactArea__item").attr('num');
        let _answer_data = $(event.target).parent().parent().children("textarea");
        let _resend_area = $(event.target).parents(".resendArea");
        let _contact_end = $(event.target).parents(".contactArea__item").children(".end");
        if(data_check(_answer_data.val())==1){
            back_mess("内容は入力されていません。");
        }else if(data_check(_answer_data.val())==2){
            back_mess("まずい内容が入っているかもしれません。");
        }else if(data_check(_answer_data.val())==3){
            back_mess("文字数が制限に超えています。");
        }else{
            let send_message_data = {switch: "resend",num: _contacts_id,answer:_answer_data.val()};

            $.ajax({
                method: "POST",
                url: "contact_switch.php",
                data: send_message_data,
                dataType: "json",
                timeout: 3000
            }).done((resend)=>{
                console.log(resend);
                if(resend == "ok"){
                    $(".mypageCompany__success").removeClass("hidden");
                    $(_answer_data).val("");
                    $(_resend_area).addClass("hidden");
                    $(_contact_end).removeClass("hidden");
                }
            }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
                console.log(errorThrown);
            });
            console.log(_contacts_id);
        }

    });

    //修正
    $(".mypageCompany__rejection .btn").on("click",(event)=>{
        $(event.target).parent().addClass("hidden");
    });

    //成功
    $(".mypageCompany__success .btn").on("click",(event)=>{
        $(event.target).parent().addClass("hidden");
    });

});