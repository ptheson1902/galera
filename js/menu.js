$(()=>{

    // メニューを切り替え仕組み
    let _menu_btn = $(".menu__list__item");
    let _main = $("main");

    _menu_btn.on("click",(event)=>{
        $(_menu_btn).removeClass("visited");

        //クリックしたボタン
        let _click_btn = $(event.target);
        _click_btn.addClass("visited");

        let _click_text = $(".name",_click_btn).text();

        //mainの番号
        let main_num;
        switch(_click_text){
            case "word":
                main_num = 0;
                break;
            case "simulation":
                main_num = 1;
                break;
            case "game":
                main_num = 2;
                break;
            case "matching":
                main_num = 3;
                break;
            case "mypage":
                main_num = 4;
                break;
        }

        //画面の切り替え
        _main.addClass("hidden");
        $("h1",_main).removeClass("open");
        $(_main[main_num]).removeClass("hidden");
        $("h1",_main[main_num]).addClass("open");
        
    }); 

});