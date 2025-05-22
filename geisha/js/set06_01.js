$(function() {
    "use strict";
// -------------------------------------------------
// main
// -------------------------------------------------

    //set menubar
    var menu_bar = new MenuBar(1);
    if ($.localStorage().getItem('movie_type') !== null) {
        $('#sel_quality li').removeClass('ck_lamp_on').addClass('ck_lamp');
        $('input[name="quality"][value="' +  $.localStorage().getItem('movie_type') + '"]').prop('checked', true).parent().parent().removeClass('ck_lamp').addClass('ck_lamp_on');
    } else {
        $('input[name="quality"][value="hq"]').prop('checked', true).parent().parent().removeClass('ck_lamp').addClass('ck_lamp_on');
    }
// -------------------------------------------------
// event
// -------------------------------------------------
    // Checkbox Change
    $('#sel_quality input').buttonAClick().click(function() {
        $('#sel_quality li').removeClass('ck_lamp_on').addClass('ck_lamp');
        $('#sel_quality input').prop('checked', false);
        $(this).prop('checked', true).parent().parent().removeClass('ck_lamp').addClass('ck_lamp_on');
    });
    $('#evt_ok').buttonAClick().click(function(e){
        e.preventDefault();
        wood.jsExt.playSound('SE_WAVE_OK', 1);
        var quality =  $('input[name="quality"]:checked').val();
        if(quality==='hq'){
            $.alert($('#dialog_msg_hq').text(),$('#dialog_msg_ok').text());
            $.localStorage().setItem('movie_type',quality);
            //ホームボタン禁止
            disableHomeButton();
            $.save();
            //ホームボタン禁止解除
            enableHomeButton();
            historyBack();
        }else if(quality==='lq'){
            $.alert($('#dialog_msg_lq').text(),$('#dialog_msg_ok').text());
            $.localStorage().setItem('movie_type',quality);
            //ホームボタン禁止
            disableHomeButton();
            $.save();
            //ホームボタン禁止解除
            enableHomeButton();
            historyBack();
        }
    });

});
//history.back時の処理
window.onpageshow = function(e) {
    if (e.persisted) {
        $('#sel_menu_bar .on').removeClass('on'); // SEE #11973
    }
    getBalance();
    //BGM
    setBGM('setting');
};
