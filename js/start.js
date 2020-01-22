$(()=>{

    let _loading = $(".loading");
    let _login_main = $(".loginMain");
    let _simulation = $(".simulation");
    //使い方紹介画面
    let _signUser = $(".signUser");
    let _authent = $(".authent");
    let _howtouse = $(".howtouse");
    let _menu = $(".menu");

    $(".howtouse__entryBtn").on("click",()=>{
        _signUser.addClass("hidden");
        _authent.addClass("hidden");
        _howtouse.addClass("hidden");
        _simulation.removeClass("hidden");
        _menu.removeClass("hidden");
        user_message();
    });

    //ユーザー情報請求
    let user_message = ()=>{
        let _send_message = {switch: "galea"};
        $.ajax({
            method: "POST",
            url: "user_switch.php",
            data: _send_message,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            location.reload();
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    }
});