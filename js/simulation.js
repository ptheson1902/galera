$(()=>{

    //問題の配列
    let question = [
        {
            "question": "Hello, May I speak to Yamada?",
            "option": [
                "I’m afraid he is out of office now.",
                "Yes. Wait a moment.",
                "Sorry, May I have your name please?",
                "Would you like him to call you later?"
            ],
            "desc": "ここではどういうふうに丁寧に相手が話したい人がいるかどうかを伝えるのがポイントです。<br>たとえ相手が居なくても、「I'm afraid」など「すみません」という気持ちが含まれている言葉を使うと、相手が気持ちよく受けます。",
            "point": 5
        },
        {
            "question": "「I am very sorry, but thank you for your understanding and cooperation.」",
            "option": [
                "You are Welcome.",
                "I'm sorry ,I can't.",
                "I'm sorry ,I can't cooperation.",
                "I want to cooperation but i can't."
            ],
            "desc": "頼まれたことで大事な案件などを断るのはナンセンス！",
            "point": 5
        },
        {
            "question": "Please finish this design until November.",
            "option": [
                "OK.Let me take care of that.",
                "It will be done until December.",
                "Can't extend the deadline?",
                "I'm sorry , I can't."
            ],
            "desc": "依頼されたときに納期を伸ばすのはよくないので、とりあえずわかりましたと言いましょう！",
            "point": 5
        },
        {
            "question": "Excuse me. Please correct.",
            "option": [
                "I'm understand . I'll finish that in a week.",
                "I don't want to do.",
                "Please ask a different person, not me.",
                "It could take long time .Is it ok ?"
            ],
            "desc": "仕事としてやっているのでここではすぐ仕上げるということを伝えましょう！",
            "point": 5
        },
        {
            "question": "Hello, May I speak to Takamoto?",
            "option": [
                "I’m afraid he is out of office now.",
                "Yes. Wait a moment.",
                "Sorry, May I have your name please?",
                "Would you like him to call you later?"
            ],
            "desc": "ここではどういうふうに丁寧に相手が話したい人がいるかどうかを伝えるのがポイントです。<br>たとえ相手が居なくても、「I'm afraid」など「すみません」という気持ちが含まれている言葉を使うと、相手が気持ちよく受けます。",
            "point": 5
        }
    ];

    //ジャンル管理
    let view_num=0,lesson_num=0;

    //点数管理
    //now_point 今のポイント数　correct_num 間違いた問題数　incorrect_num 正しい問題数
    let incorrect_question_num = [];
    let now_point=0,correct_num=0,incorrect_num=0;

    //シャッフル
    let shuffle =(array)=>{
        let _question_num;
        for(let i=array.length-1;i>0;i--){
            let r=Math.floor(Math.random()*(i+1));
            _question_num = array[i];
            array[i] = array[r];
            array[r] = _question_num;
        }
    };
    //問題を混ぜる question_num 問題の総数
    let question_num = [0,1,2,3,4];
    shuffle(question_num);

    //メニューからジャンル画面に戻る
    $(".simulation__menu .back").on("click",()=>{
        //lessonメニューの初期化
        let _lessonarea = $(".simulation__menu__lessonArea__item");
        for(let i=0;i<_lessonarea.length;i++){
            $(_lessonarea[i]).removeClass("pointer");
            $(".mark",$(_lessonarea[i])).addClass("keyBack");
            $(".mark",$(_lessonarea[i])).removeClass("notkeyBack");
            $(".key",$(_lessonarea[i])).removeClass("nosee");
        }
        $(".simulation__menu").addClass("hidden");
        $(".simulation__type").removeClass("hidden");
    });

    //ゲームの結果画面からメニューに戻る
    $(".simulation .return").on("click",()=>{
        $(".simulation__question").addClass("hidden");
        $(".simulation__result").addClass("hidden");
        $(".simulation__menu").removeClass("hidden");
        $(".simulation__title").removeClass("hidden");
        $(".menu").removeClass("hidden");

        //初期化
        now_num=0;
        now_point=0,correct_num=0,incorrect_num=0;
        $(".simulation__result__list li").addClass("hidden");
    });

    //対話クイズメイン画面からメニューに戻る
    $(".simulation__question .back").on("click",()=>{
        $(".simulation__question").addClass("hidden");
        $(".simulation__result").addClass("hidden");
        $(".simulation__menu").removeClass("hidden");
        $(".simulation__title").removeClass("hidden");
        $(".menu").removeClass("hidden");

        //初期化
        now_num=0;
        now_point=0,correct_num=0,incorrect_num=0;
        $(".simulation__result__list li").addClass("hidden");
    });
    
    //電話などの種類選択ボタン
    let _simulation_type = $(".simulation__type__list__item figure");
    for(let i=0;i<_simulation_type.length;i++){
        $(_simulation_type[i]).on("click",(event)=>{
            console.log(event.target);
            $(".simulation__type").addClass("hidden");
            $(".simulation__menu").removeClass("hidden");
            view_num = i;
            let username = $(".loginSuccess__jaTtl span").text();
            let send_data = {view:view_num,name:username};
            $.ajax({
                method: "POST",
                url: "simulation_view_lesson.php",
                data: send_data,
                dataType:"json",
                timeout: 3000
            }).done((data)=>{
                console.log(data);
                lesson_num = Number(data);
                console.log(lesson_num);
                let _lessonarea = $(".simulation__menu__lessonArea__item");
                for(let i=0;i<lesson_num+1;i++){
                    console.log(_lessonarea[i]);
                    $(_lessonarea[i]).addClass("pointer");
                    $(".mark",$(_lessonarea[i])).removeClass("keyBack");
                    $(".mark",$(_lessonarea[i])).addClass("notkeyBack");
                    $(".key",$(_lessonarea[i])).addClass("nosee");
                }
            }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
                console.log(errorThrown);
            });
        });
    }

    // now_num 今の問題の番号
    let now_num = 0;
    //スタートボタンからの１回目ゲーム
    let _simulation_lesson = $(".simulation__menu__lessonArea__item");
    for(let i=0;i<_simulation_lesson.length;i++){
        $(_simulation_lesson[i]).off("click");
        $(_simulation_lesson[i]).on("click",(event)=>{
            if($(event.target).hasClass("pointer")){
                console.log(event.target);
                $(".newMess").addClass("hidden");
                $(".back").addClass("hidden");
                $(".simulation__menu").addClass("hidden");
                $(".simulation__title").addClass("hidden");
                $(".simulation__question").removeClass("hidden");
                $(".menu").addClass("hidden");
            }
            simulation_start(now_num);
        });
    }

    //各画面
    let result_correct = $(".simulation__result")[0];
    let result_incorrect = $(".simulation__result")[1];
    let look_back = $(".simulation__result")[2];
    let simlation_success = $(".simulation__result")[3];
    let simlation_nosuccess = $(".simulation__result")[4];

    //次の問題へ回す
    $(".simulation__result .next").off("click");
    $(".simulation__result .next").on("click",(event)=>{
        console.log(question_num.length);
        now_num++;
        if(now_num<question_num.length){
            if(!($(event.target).parent().hasClass("hidden"))){
                $(event.target).parent().addClass("hidden");
                if(now_num<question_num.length){
                    simulation_start(now_num);
                }
            }
        }else{
            console.log(correct_num);
            console.log(question_num.length);
            if(correct_num<question_num.length){
                $(".simulation__result__num span",$(simlation_nosuccess)).text(correct_num);
                console.log(incorrect_question_num);
                let _incorrect_list = $(".simulation__result__list li",simlation_nosuccess);
                for(let i=0;i<incorrect_question_num.length;i++){
                    $(_incorrect_list[i]).removeClass("hidden");
                    $(_incorrect_list[i]).text(`Lesson ${lesson_num+1} - ${incorrect_question_num[i]["num"]}`);
                }//for
                $(simlation_nosuccess).removeClass("hidden");
            }else{
                $(".simulation__result__num span",$(simlation_success)).text(correct_num);
                $(simlation_success).removeClass("hidden");
            }
        }//if
    });

    //結果画面で間違った問題のタグをクリックする時
    let _incorrect_lesson = $(".simulation__result__list li");
    for(let i=0;i<_incorrect_lesson.length;i++){
        $(_incorrect_lesson[i]).on("click",()=>{
            console.log("aaa");
            $(simlation_nosuccess).addClass("hidden");
            $(look_back).removeClass("hidden");
            $(".simulation__result__question",look_back).text(incorrect_question_num[i]["question"]);
            $(".simulation__result__desc",look_back).text(incorrect_question_num[i]["option"][0]);
            $(".simulation__result__content",look_back).text(incorrect_question_num[i]["desc"]);
        });
    }
    $(".simulation__result__btn",look_back).on("click",()=>{
        $(look_back).addClass("hidden");
        $(simlation_nosuccess).removeClass("hidden");
    });
    
    //問題を当てるから選択する仕組み
    let simulation_start = (now_num)=>{
        //選択肢を混ぜる
        let option_num = [0,1,2,3];
        shuffle(option_num);
        //初期値
        $(".simulation__question__ttl .qusetionNum").text(now_num+1);
        let simulation_ttl = $(".simulation__question__item .ttl");
        let simulation_option = $(".simulation__question__item .option");
        let now_question = question[question_num[now_num]]["question"];
        let now_question_desc = question[question_num[now_num]]["desc"];
        simulation_ttl.text(now_question);
        for(let j=0;j<simulation_option.length;j++){
            $(simulation_option[j]).text(question[question_num[now_num]]["option"][option_num[j]]);
        }//for

        let correct = question[question_num[now_num]]["option"][0];

        let option_flag = 1 ;
        $(".simulation__question__item .option").off("click"); 
        $(".simulation__question__item .option").on("click",(event)=>{
            //正しい・正しくないの判断
            if($(event.target).text()==correct){
                now_point += Number(question[question_num[now_num]]["point"]);
                correct_num++;
                console.log("正・今の点数"+now_point);
                console.log("正・"+correct_num);
            }else{
                now_point -= Number(question[question_num[now_num]]["point"]);
                incorrect_num++;
                console.log("誤・今の点数"+now_point);
                console.log("誤・"+incorrect_num);
                incorrect_question_num[incorrect_num-1] = question[now_num];
                incorrect_question_num[incorrect_num-1]["num"] = now_num+1;
                console.log(incorrect_question_num);
            }//if

            if(option_flag == 1){
                $(event.target).addClass("option_choose");
                setTimeout(() => {
                    $(event.target).removeClass("option_choose");
                    if($(event.target).text()==correct){
                        $(result_correct).removeClass("hidden");
                        $(".simulation__result__desc").text(correct);
                        $(".simulation__result__question").text(now_question);
                        $(".simulation__result__content").html(now_question_desc);
                    }else{
                        $(result_incorrect).removeClass("hidden");
                        $(".simulation__result__desc").text(correct);
                        $(".simulation__result__content").html(now_question_desc);
                    }//if
                }, 500);
            }//if
            option_flag++;
        });
    };

    //シミュレーションのジャンル
    let simulation_type = (num)=>{
        switch(num){
            case 0:
                return "phone";
            case 1:
                return "meetting";
            case 2:
                return "communication";
            case 3:
                return "presentation";
            case 4:
                return "seminar";
            case 5:
                return "request";
        }
    }
});