$(()=>{
    //変数・落ちる単語画面
    let _wordBg = $(".wordBg");
    //変数・loginMain画面
    let _loginMain = $(".loginMain");
    //変数・ユーザー登録画面
    let _signUser = $(".signUser");
    //変数・ユーザー登録Back
    let _signUser_back = $(".signUser .back");
    //変数・会社登録画面
    let _signCompany = $(".signCompany");
    //変数・会社登録Back
    let _signCompany_back = $(".signCompany .back");

    //ユーザー登録
    $(".loginMain .userSiginBtn").on("click",()=>{
        _loginMain.addClass("hidden");
        _wordBg.addClass("hidden");
        _signUser.removeClass("hidden");
    });

    //会社登録
    $(".loginMain .companySiginBtn").on("click",()=>{
        _loginMain.addClass("hidden");
        _wordBg.addClass("hidden");
        _signCompany.removeClass("hidden");
    });

    //ユーザー登録から前のページへ
    _signUser_back.on("click",()=>{
        _loginMain.removeClass("hidden");
        _wordBg.removeClass("hidden");
        _signUser.addClass("hidden");
    });

    //会社登録から前のページへ
    _signCompany_back.on("click",()=>{
        _loginMain.removeClass("hidden");
        _wordBg.removeClass("hidden");
        _signCompany.addClass("hidden");
    });

});