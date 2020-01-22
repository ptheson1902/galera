$(()=>{
    var _slide = $(".howtouse__content__slide li");
    var _slideCir = $(".howtouse__content__slideCir li");

    //今の説明するdivの番号
    var now_num=0 ;

    //クリックするとき
    for(let i=0;i<_slideCir.length;i++){
        $(_slideCir[i]).on("click",(event)=>{
            $(_slide[now_num]).addClass("img_switch_off");
            $(_slide[now_num]).removeClass("img_switch_on");
            $(_slideCir).removeClass("active");
            $(event.target).addClass("active");
            $(_slide[i]).removeClass("img_switch_off");
            $(_slide[i]).addClass("img_switch_on");
            now_num = i;
            clearInterval(image_switch);
            image_switch = setInterval(()=>{
                intval_content();
            }, 5000);
        });
    }

    //指でタッチするときの動き
    var start_num,end_num,X;

    $(".howtouse__content__slide li").on('touchstart',(event)=>{
        event.preventDefault();
        start_num = event.changedTouches[0].pageX;
    })
    .on('touchmove',(event)=>{
        event.preventDefault();
        end_num = event.changedTouches[0].pageX
    })
    .on('touchend',(event)=>{
        X = end_num - start_num;
        if(X<0){
            $(_slide[now_num]).addClass("img_switch_off");
            $(_slide[now_num]).removeClass("img_switch_on");
            $(_slideCir[now_num]).removeClass("active");
            now_num++;
            if(now_num>_slide.length-1){
                now_num = 0;
            }
            $(_slide[now_num]).removeClass("img_switch_off");
            $(_slide[now_num]).addClass("img_switch_on");
            $(_slideCir[now_num]).addClass("active");
        }
        clearInterval(image_switch);
        image_switch = setInterval(() => {
            intval_content();
        }, 5000);
    });

    let image_switch = setInterval(() => {
        intval_content();
    }, 5000);

    let intval_content = ()=>{
        $(_slide[now_num]).removeClass("img_switch_on");
        $(_slide[now_num]).addClass("img_switch_off");
        $(_slideCir[now_num]).removeClass("active");
        now_num++;
        if(now_num>_slide.length-1){
            now_num = 0;
        }
        $(_slide[now_num]).removeClass("img_switch_off");
        $(_slide[now_num]).addClass("img_switch_on");
        $(_slideCir[now_num]).addClass("active");
    };
});