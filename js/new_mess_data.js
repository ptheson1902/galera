$(()=>{
    //メッセージあるかどうかをチェック
    $(".menu__list__item").on("click",()=>{
        $(".newMess span").addClass("hidden");
        let _notice = $(".newList li");
        for(let j=0;j<_notice.length;j++){
            if(!$(_notice[j]).hasClass("hidden")){
                $(_notice[j]).remove();
            }
        }

        let username = $(".loginSuccess__jaTtl span").text();
        let send_data = {switch:"view",name:username};
        $.ajax({
            method: "POST",
            url: "new_mess.php",
            data: send_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            let notice_list = $(".newList li");
            console.log(data);
            if(data.length!==0){
                $(".newMess span").removeClass("hidden");
                for(let i=0;i<data.length;i++){
                    $(".newList").append(notice_list.clone());
                    $(".newList li:last-child").removeClass("hidden");
                    $(".newList li:last-child time").text(data[i]["answer_time"]);
                    $(".newList li:last-child time").attr('datetime',data[i]["answer_time"]);
                    $(".newList li:last-child span").text(data[i]["company_name"]);
                }
            }//if
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    });
});
