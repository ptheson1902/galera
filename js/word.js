$(()=>{
    //ジャンルを選ぶ
    let _type = $(".word__list .design,.word__list .engineer");
    _type.on("click",(event)=>{
        let type_name = $(event.target).attr('typename');
        let type_word = $(event.target).children("p").text();

        let item_type_area = $(".wordTest__list .itemName");
        if(type_name == "design"){
            item_type_area.addClass("design");
            item_type_area.removeClass("engineer");
        }else{
            item_type_area.addClass("engineer");
            item_type_area.removeClass("design");
        }
        
        $("p",item_type_area).text(type_word);
        
        $(".word__list").addClass("hidden");
        $(".wordTest").removeClass("hidden");
    });

    $(".wordTest .back").on("click",()=>{
        $(".word__list").removeClass("hidden");
        $(".wordTest").addClass("hidden");
    });

    //問題の配列
    let question = [
        {
            "word": "through",
            "question": "I’ll put you ( ).",
            "option": [
                "through",
                "on",
                "out",
                "to"
            ],
            "point": 5
        },
        {
            "word": "reproduction",
            "question": "再生",
            "option": [
                "reproduction",
                "return",
                "reappearance",
                "production"
            ],
            "point": 5
        },
        {
            "word": "update",
            "question": "更新",
            "option": [
                "update",
                "renovation",
                "renewal",
                "reset"
            ],
            "point": 5
        },
        {
            "word": "hold",
            "question": "Could you ( ) , please?",
            "option": [
                "hold",
                "hang",
                "wait for",
                "hund"
            ],
            "point": 5
        },
        {
            "word": "application",
            "question": "Cloud you help me to install this ().",
            "option": [
                "application",
                "apple",
                "pencil",
                "butterfly"
            ],
            "point": 5
        }
    ];

    //点数管理
    //now_point 今のポイント数　correct_num 間違いた問題数　incorrect_num 正しい問題数
    let correct_num=0,incorrect_num=0;

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

    //各画面
    let word_list = $(".word__list");
    let word_test = $(".wordTest");
    let new_word = $(".newWord");
    let word_point = $(".wordPoint");

    //単語クイズ終わり、戻る
    $(".wordPoint__list__item__button__comeBack").off("click");
    $(".wordPoint__list__item__button__comeBack").on("click",()=>{
        $(word_list).removeClass("hidden");
        $(word_point).addClass("hidden");
        $(".menu").removeClass("hidden");
    });

    //問題を混ぜる question_num 問題の総数
    let question_num = [0,1,2,3,4];
    shuffle(question_num);
    
    //回答の管理
    //now_num 今の問題数
    let now_num = 0;

    //問題の回答を始める
    $(".wordTest__list__btn").on("click",()=>{
        $(word_test).addClass("hidden");
        $(new_word).removeClass("hidden");
        $(".menu").addClass("hidden");
        word_game(now_num);
    });


    let word_game=(now_num)=>{
        //値
        let _word_option = $(".newWord__list__ans__list__item");
        let _word_quesiton = $(".newWord__list__question");

        //正・誤
        let _correct_mark = $(".newWord__list__true");
        let _incorrect_mark = $(".newWord__list__false");

        //選択肢を混ぜる
        let option_num = [0,1,2,3];
        shuffle(option_num);
        //値の入れ替え
        $(_word_quesiton).text(question[question_num[now_num]]["question"]);
        for(let j=0;j<_word_option.length;j++){
            $(_word_option[j]).text(question[question_num[now_num]]["option"][option_num[j]]);
        }

        //正解
        let correct = question[question_num[now_num]]["option"][0];
        let question_point = question[question_num[now_num]]["point"];
        console.log(correct);

        //選択肢をクリックした時
        let option_flag = 1;
        _word_option.off("click");
        _word_option.on("click",(event)=>{
            if(option_flag == 1){        
                $(event.target).addClass("choose_on");
                if($(event.target).text()==correct){
                    _correct_mark.removeClass("hidden");
                    correct_num++;
                    console.log("正・"+correct_num);
                }else{
                    _incorrect_mark.removeClass("hidden");
                    incorrect_num++;
                    console.log("誤・"+incorrect_num);
                }
                
                setTimeout(() => {
                    _word_option.removeClass("choose_on");
                    if(_correct_mark.hasClass("hidden")){
                        _incorrect_mark.addClass("hidden");
                    }else{
                        _correct_mark.addClass("hidden");
                    }
                    now_num++;
                    if(now_num<question.length){
                        word_game(now_num);
                    }else{
                        $(".wordPoint__list__item__box__point span").text(correct_num);
                        new_word.addClass("hidden");
                        word_point.removeClass("hidden");
                        $(".menu").removeClass("hidden");
                        correct_num = 0;
                        incorrect_num = 0;
                    }
                }, 1600);
            }
        option_flag++;
        });

    };

});