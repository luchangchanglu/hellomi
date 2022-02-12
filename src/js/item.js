$('.xz').click(function(){

    $(this).siblings().removeClass('active');
    $(this).addClass('active');
})
window.onscroll=function(){
    let gohome=document.querySelector('.gogo');
    if(document.documentElement.scrollTop>=500){
        
        gohome.style.display='flex';

    }else{
        gohome.style.display='none';
    }
}
