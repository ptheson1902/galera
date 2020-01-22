$(()=>{

    // 切り替えパーツを選択する仕組み
    let _list_td = $(".dressup__control__list td");
    let _choose_td = $(".dressup__avatar__choose .parts");

    //アバターのパーツ
    let _dress = $(".dressup__avatar__dresson img");

    //パーツの種類別処理の切り替え
    let flag = false;

    _list_td.on("click",(event)=>{
        let dress_parts = $(event.target).children("img");
        let dress_parts_src = $(dress_parts).attr('src');
        let dress_parts_class = $(dress_parts).attr('class');
        let dress_parts_alt = $(dress_parts).attr('alt');
        for(let i=0;i<_choose_td.length;i++){
            if(dress_parts_class == "head"||dress_parts_class == "body"){
                if($(_choose_td[i]).hasClass(dress_parts_class)){
                    if($(_choose_td[i]).html()!==""){
                        $(_choose_td[i]).html("");
                    }
                    $(_choose_td[i]).append(dress_parts.clone());
                    flag = true;
                    break;
                }//if
            }else{
                if($(_choose_td[i]).hasClass(dress_parts_class)){
                    if($(_choose_td[i]).html()==""){
                        $(_choose_td[i]).append(dress_parts.clone());
                        flag = true;
                        break;
                    }
                }//if
            }//if
        }//for

        if(flag==true){
            flag = false;
            for(let i=0;i<_dress.length;i++){
                //alt値の判断
                if($(_dress[i]).attr('alt') == dress_parts_alt){
                    if(dress_parts_alt == "head"||dress_parts_alt == "body"){
                        let dresson_src = [];
                        dresson_src = dress_parts_src.split('.');
                        dress_parts_src = dresson_src[0]+"-d."+dresson_src[1];
                        $(_dress[i]).attr('src',dress_parts_src);
                    }else{
                        $(_dress[i]).removeClass("hidden");
                    }
                }//if
            }//for
        }//flag

    });

    $(_choose_td).on("click",(event)=>{
        let choose_parts = $(event.target).children("img");
        if($(event.target).hasClass("accessory")){
            choose_parts.remove();
            for(let i=0;i<_dress.length;i++){
                if($(_dress[i]).hasClass(choose_parts.attr('alt'))){
                    $(_dress[i]).addClass("hidden");
                }//if
            }//for
        }else{
            choose_parts.remove();
            if($(event.target).hasClass("head")){
                $(".dressup__avatar__dresson .head").attr('src','img/avatarHead.svg');
            }else{
                $(".dressup__avatar__dresson .body").attr('src','img/avatarBody.svg');
            }
        }//if
    });  
        
    

});