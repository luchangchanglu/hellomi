let terseInput=document.querySelector(".terseInput");
let terseInput_inputDiv=document.querySelector(".terseInput_inputDiv");
let terseInput_span=document.querySelector(".terseInput_span");
function start(){
    console.log(terseInput);
    console.log(terseInput_inputDiv);
    console.log(terseInput_span);
    terseInput_inputDiv.style.display="none";
    $('.terseInput_span').addClass("terseInput_span_state_down")
}
window.onload = function(){
    start();
    console.log(terseInput_inputDiv);
}

$('#username').click(function(){
    $('#username>.terseInput_span').removeClass("terseInput_span_animat_down")
    $('#username>.terseInput_span').addClass("terseInput_span_animat_up")
    terseInput_inputDiv.style.display="block";
    $('#username>.terseInput_inputDiv>.terseInput_input').focus();
});
$('#username>.terseInput_inputDiv>.terseInput_input').focusout(function(){
    
    if($('.terseInput_input').val() == ""){
        $('#username>.terseInput_span').removeClass("terseInput_span_animat_up")
        $('#username>.terseInput_span').addClass("terseInput_span_animat_down")
    }
    
})
$('#password').click(function(){
    $('#password>.terseInput_span').removeClass("terseInput_span_animat_down")
    $('#password>.terseInput_span').addClass("terseInput_span_animat_up")
    terseInput_inputDiv.style.display="block";
    $('#password>.terseInput_inputDiv>.terseInput_input').focus();
});
$('#password>.terseInput_inputDiv>.terseInput_input').focusout(function(){
    
    if($('.terseInput_input').val() == ""){
        $('#password>.terseInput_span').removeClass("terseInput_span_animat_up")
        $('#password>.terseInput_span').addClass("terseInput_span_animat_down")
    }
    
})