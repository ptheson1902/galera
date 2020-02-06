$(()=>{

    //いいね押した企業のリストを表示
    $(".menu__list__item:nth-of-type(5)").on("click",()=>{
        let _username = $(".loginSuccess__jaTtl span").text();
        console.log(_username);
        let send_data = {name: _username};
        $.ajax({
            method: "POST",
            url: "like_data.php",
            data: send_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            console.log(data);

            let _like_list_area = $(".mypage__like__list");
            let _like_list = $(".mypage__like>.likeList");
            _like_list_area.html("");

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