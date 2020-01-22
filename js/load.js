$(()=>{
    //ユーザー情報請求
    let user_message = ()=>{
        let _send_message = {switch:"galea"};
        $.ajax({
            method: "POST",
            url: "user_switch.php",
            data: _send_message,
            dataType: "json",
            timeout: 3000
        }).done((data)=>{
            if(data == "noUser"){
                setTimeout(() => {
                    _loading.removeClass("flex");
                    _loading.addClass("hidden");
                    _login_main.removeClass("hidden");
                }, 2600);
            }else{
                setTimeout(() => {
                    //ログイン成功・ファスト画面
                    _simulation.removeClass("hidden");
                    _menu.removeClass("hidden");
                    _loading.removeClass("flex");
                    _loading.addClass("hidden");
                    $(".loginSuccess").removeClass("hidden");

                    //現在の点数
                    let send_data = {name:data["username"]};
                    $.ajax({
                        method: "POST",
                        url: "mypage_data.php",
                        data: send_data,
                        dataType:"json",
                        timeout: 3000
                    }).done((data)=>{
                        console.log(data);
                        $(`.loginSuccess__content span`).text(data["now_point"]);
                    }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
                        console.log(errorThrown);
                    });
                    
                    if(data["type"] == 2){
                        //ログイン成功画面
                        $(".loginSuccess__content").removeClass("hidden");
                        $(".loginSuccess__reference").addClass("hidden");
                        $(".loginSuccess__content span").text(data["point"]);
                        $(".loginSuccess__jaTtl span").text(data["username"]);
                        //マイページ
                        $(".mypageCompany__content").addClass("hidden");
                        $(".mypage__content").removeClass("hidden");

                        //マイページ・ユーザー
                        $(".mypage__content__user__message .name").text(data["username"]);
                        $(".mypage__content__user__message .mail").text(data["mail"]);
                        let user_work = ()=>{
                            switch(data["work"]){
                                case 0:
                                    return "未選択";
                                case 1:
                                    return "UIデザイン";
                                case 2:
                                    return "フロントエンド";
                                case 3:
                                    return "バックエンド";    
                                case 4:
                                    return "Web設計・企画";
                            }
                        };
                        let user_job = ()=>{
                            switch(data["job"]){
                                case 0:
                                    return "未選択";
                                case 1:
                                    return "Webデザイナー";
                                case 2:
                                    return "Webエンジニア";
                                case 3:
                                    return "Webディレクター";
                            }
                        };
                        $(".mypage__content__user__message .work").text(user_work(data["work"]));
                        $(".mypage__content__user__message .job").text(user_job(data["job"]));
                    
                        //更新画面の元データ
                        $(".mypage__messageFix .userName input").val(data["username"]);
                        $(".mypage__messageFix .mailAddress input").val(data["mail"]);
                        $(".mypage__messageFix .occupation select").val(data["job"]);
                        $(".mypage__messageFix .field select").val(data["work"]);

                        //アバター　着替えの解錠
                        let now_user_point = data["point"];
                        let avatar_parts_area = $(".dressup__control__list td");
                        for(let j=0;j<avatar_parts_area.length;j++){
                            let _need_point = $(".needPoint span",$(avatar_parts_area[j])).text();
                            if(Number(_need_point)<=now_user_point){
                                $(avatar_parts_area[j]).removeClass("nopointer");
                                $(".key",$(avatar_parts_area[j])).addClass("hidden");
                            }
                        }//for

                        //着替え
                        let dress_data = data["dress"];
                        let dressup = $(".dressup__avatar__choose .parts");
                        let accessory_switch =(data)=>{
                            switch(data){
                                case "1":
                                    return "headband";
                                case "2":
                                    return "glass";
                                case "3":
                                    return "ribbon";
                                case "4":
                                    return "blackhat";
                                case "5":
                                    return "devil";
                                case "6":
                                    return "rabit";
                            }//switch
                        };
                        
                        if(dress_data[0]!=="0"){
                            $(dressup[0]).html(`<img src='img/parts/illu-hairstyle-0${dress_data[0]}.svg' alt="">`);
                        }
                        if(dress_data[1]!=="0"){
                            $(dressup[1]).html(`<img src='img/parts/illu-suit-0${dress_data[1]}.svg' alt="">`);
                        }
                        if(dress_data[2]!=="0"){
                            $(dressup[2]).html(`<img class='accessory' src='img/parts/illu-accessory-0${dress_data[2]}.svg' alt='${accessory_switch(dress_data[2])}'>`);
                        }
                        if(dress_data[3]!=="0"){
                            
                            $(dressup[3]).html(`<img class='accessory' src='img/parts/illu-accessory-0${dress_data[3]}.svg' alt='${accessory_switch(dress_data[3])}'>`);
                        }
                        let avatar_set =(dress_data,content)=>{
                            let parts_name;
                            $(`.${content} .accessory`).addClass("hidden");
                            for(let i=0;i<dress_data.length;i++){
                                if(i=="0"){
                                    if(dress_data[i]=="0"){
                                        $(`.${content} .head`).attr('src',`img/avatarHead.svg`);
                                    }else{
                                        $(`.${content} .head`).attr('src',`img/parts/illu-hairstyle-0${dress_data[i]}-d.svg`);
                                    }
                                }else if(i=="1"){
                                    if(dress_data[i]=="0"){
                                        $(`.${content} .body`).attr('src',`img/avatarBody.svg`);
                                    }else{
                                        $(`.${content} .body`).attr('src',`img/parts/illu-suit-0${dress_data[i]}-d.svg`);
                                    }
                                }else{
                                    if(dress_data[i]!==0){
                                        parts_name = accessory_switch(dress_data[i]);
                                        $(`.${content} .${parts_name}`).removeClass("hidden");
                                    }
                                }//if
                            }//for
                        }//function
                        avatar_set(dress_data,"mypage__content__user__dresson");
                        avatar_set(dress_data,"dressup__avatar__dresson");
                        avatar_set(dress_data,"game__main .user>p");
                        avatar_set(dress_data,"simulation__question__avatar .avatar");
                    }else{
                        //ログイン成功画面
                        $(".loginSuccess__reference").removeClass("hidden");
                        $(".loginSuccess__content").addClass("hidden");
                        $(".loginSuccess__reference span").text(data["reference"]);
                        $(".loginSuccess__jaTtl span").text(data["username"]);
                        //マイページ
                        $(".mypage__content").addClass("hidden");
                        $(".mypageCompany__content").removeClass("hidden");

                        //企業ユーザー・マイページデータ
                        $(".mypageCompany__content__user__message .name").text(data["username"]);
                        $(".mypageCompany__content__user__message .like span").text(data["like"]);
                        $(".mypageCompany__content__user__message .mail span").text(data["mail"]);

                        console.log(data);
                        let _company_user_message = $(".mypageCompany__content__user__message");
                        if(data["people"]==null){
                            $(".people span",_company_user_message).text("未記入");
                        }else{
                            $(".people span",_company_user_message).text(data["people"])
                        }

                        if(data["money"]==null){
                            $(".money span",_company_user_message).text("未記入");
                        }else{
                            $(".money span",_company_user_message).text(data["money"])
                        }
                        
                        if(data["agent"]==null){
                            $(".agent span",_company_user_message).text("未記入");
                        }else{
                            $(".agent span",_company_user_message).text(data["agent"])
                        }

                        if(data["phone"]==null){
                            $(".phone span",_company_user_message).text("未記入");
                        }else{
                            $(".phone span",_company_user_message).text(data["phone"])
                        }

                        if(data["address"]==null){
                            $(".address span",_company_user_message).text("未記入");
                        }else{
                            $(".address span",_company_user_message).text(data["address"])
                        }
                    }//if
                }, 2600);
            }//if
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    };

    //loginを表示
    let _loading = $(".loading");
    let _login_main = $(".loginMain");
    let _simulation = $(".simulation");
    let _menu = $(".menu");
    user_message();
});