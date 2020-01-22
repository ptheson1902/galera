$(()=>{
    //アップロードのビュー
    $(".signCompany .image #file_up").on("change",(event)=>{
        console.log("aaa");
        let fileElement = event.currentTarget;
        //ファイル情報
        let file = fileElement.files[0];
        //ファイルリダー
        let fileReader = new FileReader();
        fileReader.readAsDataURL(file);
    
        $(fileReader).on("load",(event)=>{
            let imageBase64Data = event.currentTarget.result;
            let upFileWrap = $(fileElement).parents(".signCompany__item__image");
            $(".thumbView img",upFileWrap).attr('src',imageBase64Data).hide().fadeIn(800);
        });
    });
    
    //ポイント基準を見る
    let _reference_btn = $(".signCompany__item__referenceBook");
    _reference_btn.on("click",()=>{
        $(".referenceBook").removeClass("hidden");
    });

    let _reference_close = $(".referenceBook__closeBtn");
    _reference_close.on("click",()=>{
        $(".referenceBook").addClass("hidden");
    });
});