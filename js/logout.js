$(()=>{
    //ログアウト仕組み
    let _logout = $(".mypage .logout");

    _logout.on("click",()=>{
        console.log(event.target);
        let _send_message = {switch: "logout"};
        $.ajax({
            method: "POST",
            url: "user_logout.php",
            data: _send_message,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            location.reload();
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    });
});