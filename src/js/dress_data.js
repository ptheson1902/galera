$(()=>{
    //着替えの承認
    let dress_save_yes = $(".dressup__btn .yes");
    $(dress_save_yes).off("click");
    $(dress_save_yes).on("click",()=>{
        let _user_name = $(".mypage__content__user__message .name").text();
        let _dress_parts = $(".dressup__avatar__choose .parts");
        let new_dress = [];
        let dress_temp;
        let dress_num = 0;
        for(let i=0;i<_dress_parts.length;i++){
            if($("img",$(_dress_parts[i])).attr('src')!==undefined){
                dress_temp = $("img",$(_dress_parts[i])).attr('src');
                dress_temp = dress_temp.replace('img/parts/','');
                dress_temp = dress_temp.replace('.svg','');
                dress_temp = dress_temp.replace('illu-','');
                dress_temp = dress_temp.replace('-0','');
                dress_temp = Number(dress_temp.slice(-1));
                new_dress[dress_num] = [i+1,dress_temp];
                dress_num++;
            }
        }//for
        dress_send(_user_name,new_dress);
    });

    //着替えをDBに
    let dress_send = (name,dress)=>{
        let send_data = {send:dress,username:name};
        $.ajax({
            method: "POST",
            url: "dress_send.php",
            data: send_data,
            dataType: "json",
            timeout: 3000
        }).done((data)=>{
            console.log(data[0]);
            $(".dressup").addClass("hidden");
            $(".mypage").removeClass("hidden");
            let avatar_set =(data,content)=>{
                let parts_name;
                $(`.${content} .accessory`).addClass("hidden");
                for(let i=0;i<data.length;i++){
                    if(data[i][0]==1){
                        $(`.${content} .head`).attr('src',`img/parts/illu-hairstyle-0${data[i][1]}-d.svg`);
                    }else if(data[i][0]==2){
                        $(`.${content} .body`).attr('src',`img/parts/illu-suit-0${data[i][1]}-d.svg`);
                    }else{
                        switch(data[i][1]){
                            case "1":
                                parts_name = "headband";
                                break;
                            case "2":
                                parts_name = "glass";
                                break;
                            case "3":
                                parts_name = "ribbon";
                                break;
                            case "4":
                                parts_name = "blackhat";
                                break;
                            case "5":
                                parts_name = "devil";
                                break;
                            case "6":
                                parts_name = "rabit";
                                break;
                        }//switch
                        console.log(parts_name);
                        $(`.${content} .${parts_name}`).removeClass("hidden");
                    }//if
                }//for
            }//function
            avatar_set(data,"mypage__content__user__dresson");
            // avatar_set(data,"dressup__avatar__dresson");
            avatar_set(data,"game__main .user>p");
            avatar_set(data,"simulation__question__avatar .avatar");
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            $(".dressup").addClass("hidden");
            $(".mypage").removeClass("hidden");
        });
    };
    
});