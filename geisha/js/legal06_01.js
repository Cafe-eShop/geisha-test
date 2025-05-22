$(function() {
// -------------------------------------------------
// main
// -------------------------------------------------

    //set menubar
    menu_bar = new MenuBar(4, 'money04_01.html');

    if(country==='US'){
        $('#sel_prompt').text($('#str_prompt_us').text());
        $('input[name="postal_code"]').attr('placeholder', $('#str_label_us').text());
    }else if(country==='CA'){
    	$('input[name="postal_code"]').attr('keyboard', 'nnid').attr('maxlength', '6').attr('minlength', '6');
        $('#sel_prompt').text($('#str_prompt_ca').text());
        $('input[name="postal_code"]').attr('placeholder', $('#str_label_ca').text());
    }

// -------------------------------------------------
// event
// -------------------------------------------------

    $('input[name="postal_code"]').change(function(){
        disableUserOperation();
        var postal_code = $(this).val();
        var chk_flg = false;
        if(postal_code!==null && postal_code!==''){
            //Zipコードチェック
            if(country==='US'){
                if(postal_code.match(/^[0-9]{5}$/)){
                    chk_flg = true;
                }else{
                    $.alert($('#dialog_msg_us').text(), $('#dialog_ok').text());
                }
            //Postalコードチェック
            }else if(country==='CA'){
                if(postal_code.match(/^[a-zA-Z0-9]{6}$/)){
                    chk_flg = true;
                }else{
                    $.alert($('#dialog_msg_ca').text(), $('#dialog_ok').text());
                }
            }
        }
        if(chk_flg){
            $.sessionStorage().setItem('postal_code', postal_code);
            location.replace('money04_01.html?seq=postal');
        }else{
            enableUserOperation();
        }
    });
});

// -------------------------------------------------
// functions
// -------------------------------------------------


//history.back時の処理
window.onpageshow = function(e) {
    getBalance();
    //BGM
    setBGM('setting');
};
