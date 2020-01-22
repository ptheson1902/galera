$(()=>{

    //新しいメッセージへの処理
    $(".newMess").on("click",(event)=>{
        if(!$(event.target).children("span").hasClass("hidden")){
            if($(".newList").hasClass("hidden")){
                $(".newList").removeClass("hidden");
            }else{
                $(".newList").addClass("hidden");
                let username = $(".loginSuccess__jaTtl span").text();
                let send_data = {switch:"delete",name:username};
                console.log(username);
                $.ajax({
                    method: "POST",
                    url: "new_mess.php",
                    data: send_data,
                    dataType:"json",
                    timeout: 3000
                }).done((data)=>{

                }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
                    console.log(errorThrown);
                });
            }
        }//if
    });

  

});