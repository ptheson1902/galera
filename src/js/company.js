$(()=>{
    let _match_content = $(".matching__content");
    let _match_officeDesc = $(".matching__officeDesc");
    let _mactch_load = $(".matching .load");
    
    //好きボタン
    let _like_btn = $(".matching__content__officeArea__office__like .fa-heart");

    let like_send = (name)=>{
        let now_user = $(".loginSuccess__jaTtl span").text();
        let send_data = {switch:"like",company:name,user:now_user};
        $.ajax({
            method: "POST",
            url: "company_like.php",
            data: send_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            console.log(data);
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    };

    $(_match_content).on("click",_like_btn,(event)=>{
        if($(event.target).hasClass("like")){
            if($(event.target).children("i").hasClass("like_none")){
                $(event.target).children("i").removeClass("like_none");
                $(event.target).children("i").addClass("like_choose");
                let _like_span = $(event.target).children("span");
                let _like_num = Number($(_like_span).text());
                _like_num++
                $(_like_span).text(_like_num);
                let company_name = $(event.target).parent().children(".name").text();
                like_send(company_name);
            }
        }
    });

    $(".matching__officeDesc__like .fa-heart").on("click",(event)=>{
        if($(event.target).hasClass("like_none")){
            $(event.target).removeClass("like_none");
            $(event.target).addClass("like_choose");
            let _like_span = $(".matching__officeDesc__like span");
            let _like_num = Number($(_like_span).text());
            _like_num++;
            _like_span.text(_like_num);
            let company_name = $(".matching__officeDesc__name").text();
            like_send(company_name);

            let company_content = $(".matching__content__officeArea__office");
            for(let i=0;i<company_content.length;i++){
                if($(".name",company_content[i]).text()==company_name){
                    $(".like i",company_content[i]).removeClass("like_none");
                    $(".like i",company_content[i]).addClass("like_choose");
                    $(".like span",company_content[i]).text(_like_num);
                }//if
            }//for
        }
    });

    //会社のコンテンツをクリックするとき
    $(_match_content).on("click",".matching__content__officeArea__office__photo,.matching__content__officeArea__office__name",(event)=>{
        _match_content.addClass("hidden");
        _match_officeDesc.removeClass("hidden");
        
        let _choose_company = $(event.target).parent();
        //画像
        let _company_image = $(".photo img",_choose_company).attr('src');
        let _company_name = $(".name",_choose_company).text();
        let _company_point = $(".border span",_choose_company).text();
        if($(".like i",_choose_company).hasClass("like_choose")){
            $(".matching__officeDesc__like i").removeClass("like_none");
            $(".matching__officeDesc__like i").addClass("like_choose");
        }else{
            $(".matching__officeDesc__like i").addClass("like_none");
            $(".matching__officeDesc__like i").removeClass("like_choose");
        }
        let _company_like_num = $(".like span",_choose_company).text();
        $(".matching__officeDesc__photo img").attr('src',_company_image);
        $(".matching__officeDesc__name").text(_company_name);
        $(".matching__officeDesc__border span").text(_company_point);  
        $(".matching__officeDesc__like span").text(_company_like_num);

        company_detailed(_company_name);
    });

    let company_detailed = (company_name)=>{
        let send_data = {company_name:company_name};
        $.ajax({
            method: "POST",
            url: "company_detailed.php",
            data: send_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            let _detailed = [];
            _detailed[0] = data["company_desc"];
            _detailed[1] = data["mail"];
            _detailed[2] = data["people"]+"人";
            _detailed[3] = data["money"]+"万円";
            _detailed[4] = data["agent"];
            _detailed[5] = data["phone"];
            _detailed[6] = data["address"];
            for(let i=0;i<_detailed.length;i++){
                if((_detailed[i]==null)||(_detailed[i]=="null人")||(_detailed[i]=="null万円")){
                    _detailed[i] = "未記入";
                }
            }//for
            $(".matching__officeDesc__desc").text(_detailed[0]);
            $(".matching__officeDesc__item .mail").text(_detailed[1]);
            $(".matching__officeDesc__item .phone").text(_detailed[5]);
            $(".matching__officeDesc__item .address").text(_detailed[6]);
            $(".matching__officeDesc__item .people").text(_detailed[2]);
            $(".matching__officeDesc__item .money").text(_detailed[3]);
            $(".matching__officeDesc__item .agent").text(_detailed[4]);
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    }

    let _match_back = $(".matching__officeDesc .back");
    _match_back.on("click",()=>{
        _match_officeDesc.addClass("hidden");
        _match_content.removeClass("hidden");
    });

    //マッチングのメニューボタンを押すとき
    $(".menu__list__item:nth-of-type(4)").on("click",()=>{
        company_send("new_order");
    });

    //人気順
    let order_siwtch = $(".matching__content__select p");
    $(order_siwtch[1]).on("click",(event)=>{
        order_siwtch.removeClass("border");
        $(event.target).addClass("border");
        company_send("like_order");
    });
    
    //最新順
    $(order_siwtch[0]).on("click",()=>{
        order_siwtch.removeClass("border");
        $(event.target).addClass("border");
        company_send("new_order");
    });

    let company_send = (word)=>{
        $(".matching__officeDesc").addClass("hidden");
        let now_user = $(".loginSuccess__jaTtl span").text();
        $(".matching .load").removeClass("hidden");
        $(".matching__content").addClass("hidden");
        let send_data = {switch:`${word}`,username:now_user};
        $.ajax({
            method: "POST",
            url: "company_data.php",
            data: send_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            $(".matching__content__officeArea").html("");
            let office_clone = $(".matching__content__officeArea__office").clone();
            let page_view_num = data.length;
            for(let i=1;i<=page_view_num;i++){
                $(".matching__content__officeArea").append(office_clone.clone());
                $(`.matching__content__officeArea__office:last-child`).removeClass("hidden");
                $(`.matching__content__officeArea__office:last-child .photo img`).attr('src',data[i-1]["company_image"]);
                $(`.matching__content__officeArea__office:last-child .name`).text(data[i-1]["company_name"]);
                $(`.matching__content__officeArea__office:last-child .like span`).text(data[i-1]["company_like"]);
                $(`.matching__content__officeArea__office:last-child .border span`).text(data[i-1]["company_point"]);
                $(`.matching__content__officeArea__office:last-child .explain`).text(data[i-1]["company_catch"]);
            }

            $(".matching .load").addClass("hidden");
            $(".matching__content").removeClass("hidden");

            setTimeout(() => {
                $(".matching__content__more").removeClass("hidden");
                $(".matching__content__nodata").addClass("hidden"); 
            }, 10);

            let like_set = (user)=>{
                let send_data = {now_user:user};
                $.ajax({
                    method: "POST",
                    url: "company_like_data.php",
                    data: send_data,
                    dataType:"json",
                    timeout: 3000
                }).done((data)=>{
                    console.log(data);
                    let _office = $(".matching__content__officeArea__office");
                    for(let i=0;i<data.length;i++){
                        for(let j=0;j<_office.length;j++){
                            if(data[i]==$(".name",$(_office[j])).text()){
                                $(".like i",$(_office[j])).removeClass("like_none");
                                $(".like i",$(_office[j])).addClass("like_choose");
                            }//if
                        }//for
                    }//for
                }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
                    console.log(errorThrown);
                });
            };
            like_set(now_user);

            $(".matching__content__more").on("click",()=>{
                setTimeout(() => {
                    like_set(now_user);
                }, 100);
            });

        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
            if(errorThrown == "timeout"){
                alert('ネットの通信が忙しいです。更新してください。');
            }
        });
    }
});