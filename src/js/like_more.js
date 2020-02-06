$(()=>{
    //いいね押した企業のリストを追加して表示
    $(".mypage__like__more").on("click",()=>{
        let _username = $(".loginSuccess__jaTtl span").text();
        let _now_num = $(".mypage__like__list li").length;
        console.log(_now_num);
        let send_data = {name: _username,now_num: _now_num};
        $.ajax({
            method: "POST",
            url: "like_data_more.php",
            data: send_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            console.log(data);
            if(data.length<_now_num){
                $(".mypage__like__more").addClass("hidden");
                $(".mypage__like__none").removeClass("hidden");
            }

            let _like_list_area = $(".mypage__like__list");
            let _like_list = $(".mypage__like>.likeList");

            for(let i=0;i<data.length;i++){
                _like_list_area.append(_like_list.clone());
                $(".mypage__like__list>li:last-child").removeClass("hidden");
                $(".mypage__like__list>li:last-child .mess>.companyName").text(data[i]["company_name"]);
                $(".mypage__like__list>li:last-child .mess>.borderline").text("Borderline"+data[i]["company_point"]+"~");
                $(".mypage__like__list>li:last-child .like>i").removeClass("like_none");
                $(".mypage__like__list>li:last-child .like>i").addClass("like_choose");
            }//for

        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    });
});