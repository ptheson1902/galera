$(()=>{

    let old_point;
    
    //ゲームの初期準備
    $(".menu__list__item:nth-of-type(3)").on("click",()=>{
        $(".game .load").removeClass("hidden");
        $(".game__start").addClass("hidden");
        let username = $(".loginSuccess__jaTtl span").text();
        let send_data = {name:username};
        $.ajax({
            method: "POST",
            url: "user_record.php",
            data: send_data,
            dataType: "json",
            timeout: 3000
        }).done((data)=>{
            $(".game__start__ttl span").text(Number(data["now_game_num"])+1);
            $(".game .load").addClass("hidden");
            $(".game__start").removeClass("hidden");

            //元の点数を取得
            old_point = Number(data["now_point"]);
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    });

    //元の点数、取得した新しい点数
    let new_point = 0,correct_flag = 0,incorrect_flag = 0;
    //満点
    let prefect_point = 0;
    //ゲームデータ
    let _game_data =[];
    //現在のステップ
    let now_step = 0;
    
    $(".game__start__btn").off("click");
    $(".game__start__btn").on("click",()=>{
        $(".game .load").removeClass("hidden");
        $(".game .newMess").addClass("hidden");
        $(".game__start").addClass("hidden");

        //もともと点数の取得
        let username = $(".loginSuccess__jaTtl span").text();
        let send_user_data = {name:username};
        $.ajax({
            method: "POST",
            url: "user_record.php",
            data: send_user_data,
            dataType: "json",
            timeout: 3000
        }).done((data)=>{
            //元の点数を取得
            old_point = Number(data["now_point"]);
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
        
        //ゲームデータの取得
        now_step = $(".game__start__ttl span").text();
        let send_data = {step:now_step};

        $.ajax({
            method: "POST",
            url: "game_step.php",
            data: send_data,
            dataType: "json",
            timeout: 3000
        }).done((data)=>{
            _game_data = data;

            //満点
            for(let j=0;j<_game_data.length;j++){
                let question_point = Number(_game_data[j]["point"]);
                prefect_point += question_point;
            }

            //背景場所の初期設定
            let _view_area = $(".game__main__top");
            $(_view_area).removeClass("classroomBack");
            $(_view_area).removeClass("workingroomBack");
            $(_view_area).removeClass("meetingroomBack");
            switch(_game_data[0]["view"]){
                case "1":
                    $(_view_area).addClass("classroomBack");
                    break;
                case "2":
                    $(_view_area).addClass("meetingroomBack");
                    break;
                case "3":
                    $(_view_area).addClass("workingroomBack");
                    break;
            };
            
            $(".game .load").addClass("hidden");
            _game_start.addClass("hidden");
            _game_main.removeClass("hidden");
            $(".game__title").addClass("hidden");
            $(".menu").addClass("hidden");
            game_function(0);

            question_num = Number(data.length)-1;
            now_num = 1;

        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    });

    //読み上げの準備
    let synthes = new SpeechSynthesisUtterance();

    let say_boy = (message)=>{
        //音声の読み上げ
        //GB男
        synthes.lang = 'en-GB'

        let voices = speechSynthesis.getVoices();
        synthes.voice = voices.filter((voice)=>{return voice.name == 'Alex';})[0];
        
        synthes.rate = 0.8;
        synthes.pitch = 1;
        synthes.text = message;
        speechSynthesis.speak(synthes);
    };

    let say_girl = (message)=>{
        //音声の読み上げ
        //AU女
        synthes.lang = 'en-AU';

        let voices = speechSynthesis.getVoices();
        synthes.voice = voices.filter((voice)=>{return voice.name == 'Karen';})[0];

        synthes.rate = 0.8;
        synthes.pitch = 1.5;
        synthes.text = message;
        speechSynthesis.speak(synthes);
    };

    let point_view = (new_point,old_point)=>{
        //点数表示処理
        let now_point = Number(new_point) + Number(old_point);
        $(".game__result .getPoint").text(now_point);
        $(".game__result__resultArea__get .point").text(new_point+"p");
        let percentage = Math.round((now_point*19)/600);
        let style_sheet = document.styleSheets[0];
        let keyframes = "@keyframes cir_ani {\n"+"0% { stroke-dasharray: 100,0; }\n"+
        `100% { stroke-dasharray: 100,${percentage}; }\n`+
        "}" ;
        style_sheet.insertRule(keyframes,style_sheet.cssRules.length);
    };

    //ゲームの各画面
    let _game_start = $(".game__start");
    let _game_main = $(".game__main");
    let _game_result = $(".game__result");

    //会話履歴を見る
    let _game_history = $(".game__history");
    $(".game__main__historyBtn").on("click",()=>{
        _game_history.removeClass("hidden");
    });
    $(".game__history__back").on("click",()=>{
        _game_history.addClass("hidden");
    });

    //各テキストやボタンを取得
    let _history = $(".game__history__textArea");
    let _game_question_text = $(".game__main__bottom__text .question");
    let _game_option_text = $(".game__main__bottom__text .option");
    let _history_text = $(".game__history__textArea__text").clone();
    let _micro = $(".game__main__bottom__microBtn");

    //次の問題へボタン
    _micro.on("click",()=>{
        if(now_num<=question_num){
            _micro.addClass("hidden");
            $(".game__main .user").addClass("hidden");
            _game_option_text.addClass("hidden");
            _game_option_text.removeClass("choose");
            game_function(now_num);
        }else{
            point_view(new_point,old_point);
            if(new_point==prefect_point){
                $(".game__result__resultArea .switchB").addClass("hidden");
                $(".game__result__resultArea .switchA").removeClass("hidden");
            }else{
                $(".game__result__resultArea .switchB").removeClass("hidden");
                $(".game__result__resultArea .switchA").addClass("hidden");
            }
            _game_main.addClass("hidden");
            _micro.addClass("hidden");
            _game_result.removeClass("hidden");

            //点数データを更新
            let point_num = Number(new_point)+Number(old_point);
            let username = $(".loginSuccess__jaTtl span").text();
            let send_data = {switch:"game",name:username,now_point:point_num,correct:correct_flag,incorrect:incorrect_flag,step:now_step};
            $.ajax({
                method: "POST",
                url: "set_point.php",
                data: send_data,
                dataType: "json",
                timeout: 3000
            }).done((data)=>{
                console.log(data);
            }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
                console.log(errorThrown);
            });

            //ゲーム終了
            game_end();

            //初期化
            _game_option_text.removeClass("choose");
            _game_question_text.text("");
            $(".game__history__textArea").text("");
            now_num = 0;
            new_point = 0;
            old_point = 0;
            prefect_point = 0;
            correct_flag = 0;
            incorrect_flag = 0;
        }
        now_num++;
    });

    let game_end = ()=>{
        $(".game__result__resultArea__btn").on("click",()=>{
            $(".game .newMess").removeClass("hidden");
            _game_result.addClass("hidden");
            $(".game__title,.menu").removeClass("hidden");
            _game_start.removeClass("hidden");
            $(".game__main .user").addClass("hidden");
            _game_option_text.addClass("hidden");

            $(".game .load").removeClass("hidden");
            let username = $(".loginSuccess__jaTtl span").text();
            let send_data = {name:username};
            $.ajax({
                method: "POST",
                url: "user_record.php",
                data: send_data,
                dataType: "json",
                timeout: 3000
            }).done((data)=>{
                console.log(data);
                $(".game__start__ttl span").text(Number(data["now_game_num"])+1);
                $(".game .load").addClass("hidden");
                $(".game__start").removeClass("hidden");
            }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
                console.log(errorThrown);
            });
        });
    };

    let game_function = (data_num)=>{
        //ランダム選択肢
        let random = Math.floor(Math.random()*2);
        let _option = [];
        if(random == 0){
            _option = [_game_data[data_num]["me_answer_a"],_game_data[data_num]["me_answer_b"]];
        }else{
            _option = [_game_data[data_num]["me_answer_b"],_game_data[data_num]["me_answer_a"]];
        }

        $(".game__main__bottom__text").removeClass("transparent");
        $(".game__main__bottom__text .choose").addClass("hidden");

        //問題入れ
        let _question_point = _game_data[data_num]["point"];
        let _question = _game_data[data_num]["cp_text"];
        $(".game__main .character").removeClass("hidden");
        _game_question_text.removeClass("hidden");
        _game_question_text.text(_question);
        _history.append(_history_text.clone());
        $(".game__history__textArea div:last-child").removeClass("hidden");
        $(".game__history__textArea div:last-child .text").text(_question);

        //音声
        setTimeout(() => {
            say_boy(_question);
            // console.log("say_boy run!!!!!");
        }, 500);
        setTimeout(() => {
            $(".game__main__bottom__text .option").removeClass("hidden");
            $(".game__main__bottom__text").addClass("transparent");
            //答え
            $("span",_game_option_text[0]).text(_option[0]);
            $("span",_game_option_text[1]).text(_option[1]);

            $(".game__main .character").addClass("hidden");
            _game_question_text.addClass("hidden");
            $(".game__main .user").removeClass("hidden");
            _game_question_text.text("");
            _game_option_text.removeClass("hidden");
        }, 4500);

        let flag=1;
        $(".game__main__bottom__text .option").off("click");
        $(".game__main__bottom__text .option").on("click",(event)=>{
            console.log("bottom_text click");
            if(flag==1){
                $(".choose",$(event.target)).removeClass("hidden");
                let _choose_text = $("span",event.target).text();
                say_girl(_choose_text);
                // console.log("say_girl run!!!!!");
                _history.append(_history_text.clone());
                $(".game__history__textArea div:last-child").removeClass("hidden");
                $(".game__history__textArea div:last-child .text").text(_choose_text);
                $(".game__history__textArea div:last-child .people").text("＜ ME ＞");
                if(_choose_text == _game_data[data_num]["me_answer_a"]){
                    new_point += Number(_question_point);
                    correct_flag++;
                    console.log("正しい数："+correct_flag);
                    console.log(new_point);

                    //点数知らせ
                    $(".game__main__point").text(`+${_question_point}`);
                    $(".game__main__point").addClass("point_on");
                    $(".game__main__point").addClass("pointCorrect");
                    setTimeout(() => {
                        $(".game__main__point").text("");
                        $(".game__main__point").removeClass("point_on");
                        $(".game__main__point").removeClass("pointCorrect");
                    }, 1200);
                }else{
                    new_point++;
                    incorrect_flag++;
                    console.log("間違いの数："+incorrect_flag);
                    console.log(new_point);

                    //点数知らせ
                    $(".game__main__point").text(`+1`);
                    $(".game__main__point").addClass("point_on");
                    $(".game__main__point").addClass("pointIncorrect");
                    setTimeout(() => {
                        $(".game__main__point").text("");
                        $(".game__main__point").removeClass("point_on");
                        $(".game__main__point").removeClass("pointIncorrect");
                    }, 1200);
                }
                setTimeout(() => {
                    _micro.removeClass("hidden");
                    _question = "";
                    _option = [];    
                }, 1500);
            }//if flag
            flag++;
        });
        
    };

});