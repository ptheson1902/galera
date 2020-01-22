$(()=>{

    let _question_send = $(".matching__officeDesc__btn");
    let _question_data = $(".matching__officeDesc__text textarea");

    //入力文字数を表示
    $(_question_data).on("keydown",(event)=>{
        let now_num;
        let possible_num = 128;
        let now_length = possible($(event.target).val());
        now_num = possible_num - Math.ceil(now_length);
        if(now_num>=0){
            $(".matching__officeDesc__length span").text(now_num);
        }
    });

    //OKボタンを押す時
    $(".matching__rejection .btn,.matching__success .btn").on("click",(event)=>{
        $(event.target).parent().addClass("hidden");
    });
    
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
        let _text_check = /^([0-9]+)|([うんち|ばか|あほ|くそ|おしっこ|糞|小便|大便|遺体|死亡|亡く|殺人|自殺|他殺|暴力|死体|ヤクザ|麻薬|逝去|暴飲])$/;
        
        if(data == ""){
            return 1;
        }else if((_text_check.test(data))){
            return 2;
        }else if(Math.ceil(possible(data))>128){
            return 3;
        }
    };

    //内容通らない時の処理
    let back_mess = (message)=>{
        $(".matching__rejection .text").text(message);
        $(".matching__rejection").removeClass("hidden");
    };

    //内容通る時の処理
    let send_mess = ()=>{
        let message = $(".matching__officeDesc__text textarea").val();
        let username = $(".loginSuccess__jaTtl span").text();
        let company = $(".matching__officeDesc__name").text();
        let send_data = {user:username,enquiry:message,company_name:company};
        $.ajax({
            method: "POST",
            url: "enquiry.php",
            data: send_data,
            dataType: "json",
            timeout: 3000
        }).done((data)=>{
            console.log(data);
            if(data == "1"){
                back_mess("すでにこの質問が聞かれています。");
            }else{
                $(".matching__success").removeClass("hidden");
            }
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    };

    //送信を押す時の処理
    $(_question_send).on("click",()=>{
        if(data_check(_question_data.val())==1){
            back_mess("内容は入力されていません。");
        }else if(data_check(_question_data.val())==2){
            back_mess("まずい内容が入っているかもしれません。");
        }else if(data_check(_question_data.val())==3){
            back_mess("文字数が制限に超えています。");
        }else{
            send_mess();
            $(".matching__officeDesc__text textarea").val("");
        }
    });

});