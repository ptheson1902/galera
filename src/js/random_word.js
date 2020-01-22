$(()=>{
    // ランダム文字列が落ちるアニメション  
    let word = ["border","color","left","underline","bottom","photography","padding","margin","position","absolute","transition","animation","design","switch","background","session","java","center","display","develop","gradation","right","auto"];
    let word_p = $(".wordBg__word");
    for(let i=0;i<word_p.length;i++){
        let word_choose = word[Math.floor(Math.random()*word.length)];
        let rotate = Math.floor(Math.random()*60)-30;
        let font_size = Math.random()*3+2;
        let left = Math.random()*90-10;
        if($(word_p[i]).text()==""){
            $(word_p[i]).text(word_choose);
            let css_style = {
                transform: `rotate(${rotate}deg)`,
                fontSize: `${font_size}rem`,
                left: `${left}%`
            }
            $(word_p[i]).css(css_style);
        }//if
    }//for
});