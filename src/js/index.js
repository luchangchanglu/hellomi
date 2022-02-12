window.onload=function(){
    let seek=document.querySelector("#seek");
    let fangdajingbox=document.querySelector(".fangdajing");
    let fandajing=document.querySelector(".icon-fangdajing");
    let dht2=document.querySelectorAll(".daohan>.xbk")
    let bk=document.querySelector(".head2")
    console.log(dht2);
    seek.onmouseover=function(){
        fandajing.style.color="white";
        seek.style.backgroundColor="#f69000";
    }
    seek.onmouseout=function(){
        fandajing.style.color="black";
        seek.style.backgroundColor="white";
    }
    fangdajingbox.onmouseover=function(){
        seek.style.backgroundColor="#f69000";
        fandajing.style.color="white";
    }
    fangdajingbox.onmouseout=function(){
        fandajing.style.color="black";
        seek.style.backgroundColor="white";
    }
    dht2.forEach(function(item,index,dht2){
        dht2[index].onmouseover=function(){
            bk.style.borderBottom="1px solid #b4b4b4"
        }
        dht2[index].onmouseout=function(){
            bk.style.borderBottom="0px solid #b4b4b4"
        }
    })
}
//菜单栏的显示
$("#banner_menu_wrap").children().hover(function(){
    $(this).css("background","#ff6700");
    $(this).children(".banner_menu_content").css("border","1px solid #F0F0F0").show();
},function(){
    $(this).css("background","none");
    $(this).children(".banner_menu_content").css("border","0px solid #F0F0F0").hide();
});
//轮播
$(function(){
    var i=0;
    var big_banner_pic = $("#big_banner_pic");
    var allimg=$("#big_banner_pic li").length;
    function img_change(){
        var img_i=i*-1226+"px";
        big_banner_pic.animate({opacity:".2"},100,function(){
            big_banner_pic.css("left",img_i );
            big_banner_pic.animate({
                opacity: "1"
            }, 100);
        })
    }
    function automatic(){
        i+=1;
        if(i>=allimg){
            i=0;
        }
        img_change();
    }
    change_self_time = setInterval(automatic, 3000);
    //轮播上一张下一张图标控制
    $("#big_banner_change_wrap").hover(function(){
        clearInterval(change_self_time);
        $("#big_banner_change_wrap").children().show();
    },function(){
        change_self_time = setInterval(automatic, 3000);
        $("#big_banner_change_wrap").children().hide();
    })
    $("#big_banner_change_prev").click(function(){
        i += 1;
        if (i >= allimg) {
            i = 0;
        }
        img_change();
    })
    $("#big_banner_change_next").click(function(){
        i -= 1;
        if (i <= 0) {
            i = allimg - 1;
        }
        img_change();
    })
})
window.onscroll=function(){
    let gohome=document.querySelector('.gogo');
    if(document.documentElement.scrollTop>=500){
        
        gohome.style.display='flex';

    }else{
        gohome.style.display='none';
    }
}


    
    $('.yiru').hover(function(){
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
    })