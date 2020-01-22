$(()=>{
    //ユーザーログインの確認
    let _company_next_btn = $(".signCompany__nextBtn");
    let _company_send_btn = $(".signCompany__sendBtn");

    let word_num_count = (n)=>{
        let word_length = 0;
        for(i=0;i<n.length;i++){
            if(n[i].match(/[ -~]/)){
                word_length += 1;
            }
            else {
                word_length += 2;
            }
        }
        return word_length;
    };
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
    // 13 未入力・基準ポイント
    // 14 形式に誤りがある・基準ポイント
    // 15 数の制限を超えた・基準ポイント
    // 16 画像未選択
    // 17 未入力・キャッチ
    // 18 規定違反の言葉がある・キャッチ
    // 19 文字数制限を超えた・キャッチ
    // 20 未入力・説明
    // 21 規定違反の言葉がある・説明
    // 22 文字数制限を超えた・説明

    // 23 タイプはjpg/png/gifのみ
    // 24 画像サイズが制限を超えた

    _company_next_btn.on("click",()=>{
        if(data_check()==1){
            back_mess("userPassword","形式に誤りがある");
        }else if(data_check()==2){
            back_mess("userPassword","二回入力したのが異なる");
        }else if(data_check()==3){
            back_mess("mailAddress","形式に誤りがある");
        }else if(data_check()==4){
            back_mess("mailAddress","未入力");
        }else if(data_check()==5){
            back_mess("companyName","未入力");
        }else if(data_check()==6){
            back_mess("userPassword","未入力");
        }else if(data_check()==7){
            back_mess("userConfirmPassword","未入力");
        }else if(data_check()==8){
            back_mess("companyName","形式に誤りがある");
        }else if(data_check()==9){
            back_mess("userPassword","半角英数6~16文字");
        }else if(data_check()==10){
            back_mess("companyName","全角16文字/半角32文字以内");
        }else if(data_check()==13){
            back_mess("referencePoint","未入力");
        }else if(data_check()==14){
            back_mess("referencePoint","形式に誤りがある");
        }else if(data_check()==15){
            back_mess("referencePoint","上限は3000");
        }else{
            user_duplication();
        }//else
    });

    _company_send_btn.on("click",()=>{
        if(data_check()==16){
            back_mess("image","画像未選択");
        }else if(data_check()==17){
            back_mess("catch","未入力");
        }else if(data_check()==18){
            back_mess("catch","規定違反の言葉がある");
        }else if(data_check()==19){
            back_mess("catch","全角32/半角64文字以内");
        }else if(data_check()==20){
            back_mess("companyDesc","未入力");
        }else if(data_check()==21){
            back_mess("companyDesc","規定違反の言葉がある");
        }else if(data_check()==22){
            back_mess("companyDesc","全角300/半角600文字以内");
        }else{
            let company_image = $(".signCompany__item__image .thumbView img").attr('src');
            let company_name = $(".signCompany .companyName input").val();
            image_check(company_image,company_name);
        }
    });

    let back_mess = (input_name,message)=>{
        if(input_name=="image"){
            $(`.signCompany .${input_name}`).css('background','#D3E0E0');
        }
        $(`.signCompany .${input_name} input,.signCompany .${input_name} textarea`).focus();
        $(`.signCompany .${input_name} span`).text(message);
        $(`.signCompany .${input_name} span`).removeClass("hidden");
        setTimeout(() => {
            $(`.signCompany .${input_name} span`).text("");
            if(input_name=="image"){
                $(`.signCompany .${input_name}`).css('background','none');
            }
        }, 3000);
    };

    let data_check = ()=>{
        //正規表現
        let _company_name = $(".signCompany .companyName input").val();
        let _mail = $(".signCompany .mailAddress input").val();
        let _password = $(".signCompany .userPassword input").val();
        let _confirm_password = $(".signCompany .userConfirmPassword input").val();
        let _reference_point = $(".signCompany .referencePoint input").val();
        let _img_src = $(".signCompany .thumbView img").attr('src');
        let _catch = $(".signCompany .catch textarea").val();
        let _companyDesc = $(".signCompany .companyDesc textarea").val();

        //正規表現
        let _mail_check = /^([a-zA-Z0-9][a-zA-Z0-9\._-]+)@([a-zA-Z0-9]+[a-zA-Z0-9\._-]+)$/;
        let _pass_check = /^([ a-zA-Z0-9])+$/;
        let _point_check = /^([0-9])+$/;
        let _name_check = /^([一-龠ぁ-んァ-ヶA-Za-z][一-龠ぁ-んァ-ヶA-Za-z0-9ー]+)$/;
        let _text_check = /^([0-9]+)|([うんち|ばか|あほ|くそ|おしっこ|糞|小便|大便|遺体|死亡|亡く|殺人|自殺|他殺|暴力|死体|ヤクザ|麻薬|逝去|暴飲])$/;

        //チェック
        if(_mail==""){
            return 4;
        }else if(_company_name==""){
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
        }else if(!(_name_check.test(_company_name))){
            return 8;
        }else if(word_num_count(_password)>16){
            return 9;
        }else if(word_num_count(_company_name)>32){
            return 10;
        }else if(_reference_point==""){
            return 13;
        }else if(!(_point_check.test(_reference_point))){
            return 14;
        }else if((_point_check>=0)&&(_point_check<=3000)){
            return 15;
        }else if(_img_src==""){
            return 16;
        }else if(_catch==""){
            return 17;
        }else if(_text_check.test(_catch)){
            return 18;
        }else if(word_num_count(_catch)>64){
            return 19;
        }else if(_companyDesc==""){
            return 20;
        }else if(_text_check.test(_companyDesc)){
            return 21;
        }else if(word_num_count(_companyDesc)>600){
            return 22;
        }
    };//data_check

    let user_duplication = ()=>{
        $(".signCompany__nextBtn").addClass("hidden");
        $(".signCompany__waittime").removeClass("hidden");
        //データ
        let username = $(".signCompany .companyName input").val();
        let mail = $(".signCompany .mailAddress input").val();

        let send_user_data = {
            username : username,
            mail : mail
        }

        $.ajax({
            method: "POST",
            url: "duplication.php",
            data: send_user_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            console.log(data);
            $(".signCompany__nextBtn").removeClass("hidden");
            $(".signCompany__waittime").addClass("hidden");
            if(data == 11){
                back_mess("mailAddress","登録されたメール");
            }else if(data == 12){
                back_mess("companyName","すでに登録された会社");
            }else{
                _company_next_btn.addClass("hidden");
                $(".signCompany .companyName,.signCompany .mailAddress,.signCompany .userPassword,.signCompany .userConfirmPassword,.signCompany .referencePoint").addClass("hidden");
                _company_send_btn.removeClass("hidden");
                $(".signCompany .image,.signCompany .catch,.signCompany .companyDesc").removeClass("hidden");
            }
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    };//send_data

    let image_check = (image,company_name)=>{
        $(".signCompany__sendBtn").addClass("hidden");
        $(".signCompany__waittime").removeClass("hidden");
        //画像データ
        let send_image_data = {data:image,name:company_name};
        $.ajax({
            method: "POST",
            url: "image_process.php",
            data: send_image_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            console.log(data);
            if(data == 23){
                back_mess("image","タイプはjpg/png/gifのみ");
            }else if(data == 24){
                back_mess("image","幅と高さが不足");
            }else{
                send_data();
            }
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            $(".signCompany__waittime").addClass("hidden");
            $(".signCompany__sendBtn").removeClass("hidden");
            back_mess("image","6Mの上限を超えた");
        });
    };

    let send_data = ()=>{
        //データ
        let company_name = $(".signCompany .companyName input").val();
        let mail = $(".signCompany .mailAddress input").val();
        let password = $(".signCompany .userPassword input").val();
        let point = $(".signCompany .referencePoint input").val();
        let catchcopy = $(".signCompany .catch textarea").val();
        let desc = $(".signCompany .companyDesc textarea").val();

        $(".authent__ttl span").text(company_name);
    
        let send_company_data = {
            company_name : company_name,
            mail : mail,
            password : password,
            point : point,
            catch : catchcopy,
            desc : desc
        }

        $.ajax({
            method: "POST",
            url: "company_sigin.php",
            data: send_company_data,
            dataType:"json",
            timeout: 6000
        }).done((data)=>{
            console.log(data);
            // $(".signCompany__waittime").addClass("hidden");
            // $(".signCompany__sendBtn").removeClass("hidden");
            
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
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    };//send_data

    let user_authent = (result,company_name)=>{
        let send_success_data = [];
        send_success_data = {success_data:result,name:company_name};
        console.log(send_success_data);
        $.ajax({
            method: "POST",
            url: "company_sigin_success.php",
            data: send_success_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            console.log(data);
            $(".authent__num input").val("");
            if(data == "trueB"){
                $(".notmatch").removeClass("hidden");
            }else if(data == "trueA"){
                // $(".howtouse__ttl span").text(company_name);
                $(".howtouse").removeClass("hidden");
                $(".signCompany .companyName input").val("");
                $(".signCompany .mailAddress input").val("");
                $(".signCompany .userPassword input").val("");
                $(".signCompany .userConfirmPassword input").val("");
                $(".signCompany .referencePoint input").val("");
                $(".signCompany .catch textarea").val("");
                $(".signCompany .companyDesc textarea").val("");

                $(".howtouse__entryBtn").on("click",()=>{
                    location.reload();
                });
            }//if
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    }

    $(".notmatch__entryBtn").on("click",()=>{
        location.reload();
    });
    
});