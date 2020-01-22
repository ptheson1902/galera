$(()=>{

    //マイページのデータロード
    $(".menu__list__item:nth-of-type(5)").on("click",()=>{
        let mypage_flag;
        $(".mypage .load").removeClass("hidden");
        if($(".mypage__content").hasClass("hidden")){
            $(".mypageCompany__content").addClass("hidden");
            mypage_flag = 1;
        }else{
            $(".mypage__content").addClass("hidden");
            mypage_flag = 2;
        }
        let username = $(".loginSuccess__jaTtl span").text();
        let send_data = {name:username};
        $.ajax({
            method: "POST",
            url: "mypage_data.php",
            data: send_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            $(`.mypage__item .correct span`).text(data["correct_num"]);
            $(`.mypage__item .percent span`).text(data["correct_percent"]);
            $(`.mypage__item .point span`).text(data["now_point"]);

            $(".mypage__item").removeClass("hidden");
            
            if(mypage_flag == 1){
                $(".mypageCompany__messageFix").addClass("hidden");
                $(".mypage__messageFix").addClass("hidden");
                $(".mypageCompany__content__contact").addClass("hidden");
                $(".mypageCompany__content").removeClass("hidden");
                $(".mypageCompany__content__user").removeClass("hidden");
                $(".mypageCompany__content__user").addClass("flex");
                $(".mypageCompany__content__messAdjust").removeClass("hidden");
            }else{
                $(".mypage__content").removeClass("hidden");
                $(".mypage__content__user").removeClass("hidden");
                $(".mypage__content__user").addClass("flex");
            }
            $(".mypage .load").addClass("hidden");
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });

        $(".contactArea").text("");
        //企業の場合、問い合わせデータを取る
        if($(".mypage__content").hasClass("hidden")){
            let send_contact_data = {name:username};
            $.ajax({
                method: "POST",
                url: "contact_data.php",
                data: send_contact_data,
                dataType:"json",
                timeout: 3000
            }).done((contact)=>{
                console.log(contact);
                if(contact == ""){
                    $(".contactArea").text("すみません。記録がないです。");
                }else{
                    let _contant_item = $(".contactArea__item");
                    for(let j=0;j<contact.length;j++){
                        $(".contactArea").append(_contant_item.clone());
                        let _time = contact[j]["time"];
                        _time = _time.substr(0,10);
                        $(".contactArea div:last-child").removeClass("hidden");
                        $(".contactArea div:last-child").attr('num',contact[j]["num"]);
                        $(".contactArea div:last-child .date").text(_time);
                        $(".contactArea div:last-child .date").attr('datetime',_time);
                        $(".contactArea div:last-child .name").text(contact[j]["username"]);
                        $(".contactArea div:last-child .content").text(contact[j]["question"]);
                        if(contact[j]["switch"] == 2){
                            $(".contactArea div:last-child .btn").addClass("hidden");
                            $(".contactArea div:last-child .end").removeClass("hidden");
                        }
                        $(".resendArea").addClass("hidden");
                        
                    }
                }//if
            }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
                console.log(errorThrown);
            });
        }//if
    });

    //個人情報を修正するボタン
    let _user_fix = $(".mypage__content__user__fix img");
    //着替えするボタン
    let _dress_btn = $(".mypage__content__dressBtn");
    //マイページ　メイン画面
    let _mypage_main = $(".mypage__content");
    //マイページ　情報を修正するページ
    let _mypage_fix = $(".mypage__messageFix");
    //マイページ　着替えするページ
    let _dressup = $(".dressup");
    //ユーザー情報
    let _user_item = $(".mypage__item");

    _user_fix.on("click",()=>{
        _mypage_main.addClass("hidden");
        _mypage_fix.removeClass("hidden");
        _user_item.addClass("hidden");
    });

    _dress_btn.on("click",()=>{
        $(".mypage").addClass("hidden");
        _dressup.removeClass("hidden");
    });

    //個人情報修正画面・メインに戻る取り消しボタン
    let _fix_cancel = $(".mypage__messageFix__btn .no");
    _fix_cancel.on("click",()=>{
        _mypage_fix.addClass("hidden");
        _mypage_main.removeClass("hidden");
        _user_item.removeClass("hidden");
    });

    //個人情報バックボタン
    $(".mypage__messageFix .back").on("click",()=>{
        _mypage_fix.addClass("hidden");
        _mypage_main.removeClass("hidden");
        _user_item.removeClass("hidden");
    });

    //着替え画面・メインに戻る取り消しボタン
    let _dress_cancel = $(".dressup__btn .no");
    _dress_cancel.on("click",()=>{
        _dressup.addClass("hidden");
        $(".mypage").removeClass("hidden");
    });

    //企業の情報を修正
    let _message_company_fix = $(".mypageCompany__messageFix");
    let _company_content = $(".mypageCompany__content");

    let _company_fix_btn = $(".mypageCompany__content__user__fix");

    _company_fix_btn.on("click",()=>{
        _company_content.addClass("hidden");
        _user_item.addClass("hidden");
        _message_company_fix.removeClass("hidden");
    });

    $(".mypageCompany__messageFix .back").on("click",()=>{
        _company_content.removeClass("hidden");
        _user_item.removeClass("hidden");
        _message_company_fix.addClass("hidden");
    });

    $(".mypageCompany__messageFix__btn .no").on("click",()=>{
        _company_content.removeClass("hidden");
        _user_item.removeClass("hidden");
        _message_company_fix.addClass("hidden");
    });

    $(".mypageCompany__messageFix__btn .yes").on("click",()=>{
        _company_content.removeClass("hidden");
        _user_item.removeClass("hidden");
        _message_company_fix.addClass("hidden");
    });

    //お問い合わせへ
    $(".mypageCompany__content__messAdjust").on("click",()=>{
        _user_item.addClass("hidden");
        $(".mypageCompany__content__user").removeClass("flex");
        $(".mypageCompany__content__user").addClass("hidden");
        $(".mypageCompany__content__contact").removeClass("hidden");
        $(".mypageCompany__content__messAdjust").addClass("hidden");
    });

    $(".mypageCompany__content__contact .back").on("click",()=>{
        $(".mypageCompany__content__contact").addClass("hidden");
        _user_item.removeClass("hidden");
        $(".mypageCompany__content__user").removeClass("hidden");
        $(".mypageCompany__content__user").addClass("flex");
        $(".mypageCompany__content__messAdjust").removeClass("hidden");
    });
});