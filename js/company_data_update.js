$(()=>{

    //ポイントの説明
    $(".mypageCompany__messageFix__item__referenceBook").on("click",()=>{
        console.log("click");
        $(".referenceBook").removeClass("hidden");
    });


    //データチェック
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
    // 25 電話番号の形式

    let _company_update_btn = $(".mypageCompany__messageFix__btn .yes");

    _company_update_btn.on("click",()=>{
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
        }else if(data_check()==16){
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
        }else if(data_check()==22){
                back_mess("phone","形式に誤りがある");
        }else{
            user_duplication();
        }
    });

    let back_mess = (input_name,message)=>{
        if(input_name=="image"){
            $(`.mypageCompany__messageFix .${input_name}`).css('background','#D3E0E0');
        }
        $(`.mypageCompany__messageFix .${input_name} input,.signCompany .${input_name} textarea`).focus();
        $(`.mypageCompany__messageFix .${input_name} span`).text(message);
        $(`.mypageCompany__messageFix .${input_name} span`).removeClass("hidden");
        setTimeout(() => {
            $(`.mypageCompany__messageFix .${input_name} span`).text("");
            if(input_name=="image"){
                $(`.mypageCompany__messageFix .${input_name}`).css('background','none');
            }
        }, 3000);
    };

    let data_check = ()=>{
        //正規表現
        let _company_name = $(".mypageCompany__messageFix .companyName input").val();
        let _mail = $(".mypageCompany__messageFix .mailAddress input").val();

        let _reference_point = $(".mypageCompany__messageFix .referencePoint input").val();
        let _catch = $(".mypageCompany__messageFix .catch textarea").val();
        let _companyDesc = $(".mypageCompany__messageFix .companyDesc textarea").val();

        let _phone_a = $(".mypageCompany__messageFix .phone .sosmall:nth-of-type(1)").val();
        let _phone_b = $(".mypageCompany__messageFix .phone .sosmall:nth-of-type(2)").val();
        let _phone_c = $(".mypageCompany__messageFix .phone .sosmall:nth-of-type(3)").val();

        let _phone = `${_phone_a}`+`${_phone_b}`+`${_phone_c}`;
        let _address = $(".mypageCompany__messageFix .address input").val();
        let _people = $(".mypageCompany__messageFix .people input").val();
        let _money = $(".mypageCompany__messageFix .money input").val();
        let _agent = $(".mypageCompany__messageFix .agent input").val();

        //正規表現
        let _mail_check = /^([a-zA-Z0-9][a-zA-Z0-9\._-]+)@([a-zA-Z0-9]+[a-zA-Z0-9\._-]+)$/;
        let _point_check = /^([0-9])+$/;
        let _phone_check = /^[0-9]{11}$/;
        let _people_check = /^[1-9][0-9]+$/;
        let _money_check = /^[1-9][0-9]+$/;
        let _address_check = /県|府|道|市/;

        let _name_check = /^([一-龠ぁ-んァ-ヶA-Za-z][一-龠ぁ-んァ-ヶA-Za-z0-9ー]+)$/;
        let _text_check = /^([0-9]+)|([うんち|ばか|あほ|くそ|おしっこ|糞|小便|大便|遺体|死亡|亡く|殺人|自殺|他殺|暴力|死体|ヤクザ|麻薬|逝去|暴飲])$/;

        //チェック
        if(_mail==""){
            return 4;
        }else if(_company_name==""){
            return 5;
        }else if(!(_mail_check.test(_mail))){
            return 3;
        }else if(!(_name_check.test(_company_name))){
            return 8;
        }else if(word_num_count(_company_name)>32){
            return 10;
        }else if(_reference_point==""){
            return 13;
        }else if(!(_point_check.test(_reference_point))){
            return 14;
        }else if((_point_check>=0)&&(_point_check<=3000)){
            return 15;
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
        }else if(_phone_check.test(_phone)){
            return 25;
        }else if(_people_check.test(_people)){
            return 26;
        }else if(_money_check.test(_money)){
            return 27;
        }else if(_address_check.test(_address)){
            return 28;
        }
    };//data_check

    let send_data = (oldname)=>{
        //データ
        let company_name = $(".mypageCompany__messageFix .companyName input").val();
        let mail = $(".mypageCompany__messageFix .mailAddress input").val();
        let point = $(".mypageCompany__messageFix .referencePoint input").val();
        let catchcopy = $(".mypageCompany__messageFix .catch textarea").val();
        let desc = $(".mypageCompany__messageFix .companyDesc textarea").val();

        let _phone_a = $(".mypageCompany__messageFix .phone .sosmall:nth-of-type(1)").val();
        let _phone_b = $(".mypageCompany__messageFix .phone .sosmall:nth-of-type(2)").val();
        let _phone_c = $(".mypageCompany__messageFix .phone .sosmall:nth-of-type(3)").val();

        let _phone = `${_phone_a}`+`${_phone_b}`+`${_phone_c}`;
        let _address = $(".mypageCompany__messageFix .address input").val();
        let _people = $(".mypageCompany__messageFix .people input").val();
        let _money = $(".mypageCompany__messageFix .money input").val();
        let _agent = $(".mypageCompany__messageFix .agent input").val();

        $(".authent__ttl span").text(company_name);
    
        let send_company_data = {
            oldname: oldname,
            company_name : company_name,
            mail : mail,
            point : point,
            catch : catchcopy,
            desc : desc,
            phone: _phone,
            address: _address,
            people: _people,
            money: _money,
            agent: _agent
        }

        $.ajax({
            method: "POST",
            url: "company_update.php",
            data: send_company_data,
            dataType:"json",
            timeout: 6000
        }).done((data)=>{
            console.log(data);
            if(data == "ok"){
                location.reload();
            }
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    };//send_data

    let user_duplication = ()=>{
        //データ
        let oldname = $(".loginSuccess__jaTtl span").text();
        
        let username = $(".mypageCompany__messageFix .companyName input").val();
        let mail = $(".mypageCompany__messageFix .mailAddress input").val();

        let send_user_data = {
            oldname : oldname,
            username : username,
            mail : mail
        }

        $.ajax({
            method: "POST",
            url: "company_update_check.php",
            data: send_user_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            if(data == 11){
                back_mess("mailAddress","登録されたメール");
            }else if(data == 12){
                back_mess("companyName","すでに登録された会社");
            }else{
                send_data(oldname);
            }
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    };//send_data
});