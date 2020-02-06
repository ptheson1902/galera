$(()=>{

    let _new_order = $(".matching__content__select__new");
    //会社をもっと見るときの表示
    $(".matching__content__more").on("click",(event)=>{

        $(".matching .load").removeClass("hidden");
        let type_switch;
        //1 最新順 2 人気順
        if($(_new_order).hasClass("border")){
            type_switch = 1;
        }else{
            type_switch = 2;
        }

        let _office_content = $(".matching__content__officeArea .matching__content__officeArea__office");
        
        let send_data = {type:type_switch,now_num:_office_content.length};
        console.log(send_data);

        $.ajax({
            method: "POST",
            url: "office_more.php",
            data: send_data,
            dataType:"json",
            timeout: 3000
        }).done((data)=>{
            console.log(data);
            let page_view_num = data.length;
            
            let office_clone = $(".matching__content>.matching__content__officeArea__office").clone();
            for(let i=1;i<=page_view_num;i++){
                $(".matching__content__officeArea").append(office_clone.clone());
                $(`.matching__content__officeArea__office:last-child`).removeClass("hidden");
                $(`.matching__content__officeArea__office:last-child .photo img`).attr('src',data[i-1]["company_image"]);
                $(`.matching__content__officeArea__office:last-child .name`).text(data[i-1]["company_name"]);
                $(`.matching__content__officeArea__office:last-child .like span`).text(data[i-1]["company_like"]);
                $(`.matching__content__officeArea__office:last-child .border span`).text(data[i-1]["company_point"]);
                $(`.matching__content__officeArea__office:last-child .explain`).text(data[i-1]["company_catch"]);
            }
            if(page_view_num<=3){
                $(".matching__content__more").addClass("hidden");
                $(".matching__content__nodata").removeClass("hidden");
            }else{
                $(".matching__content__more").removeClass("hidden");
                $(".matching__content__nodata").addClass("hidden");
            }
            $(".matching .load").addClass("hidden");
        }).fail((XMLHttpRequest, textStatus, errorThrown)=>{
            console.log(errorThrown);
        });
    });
});