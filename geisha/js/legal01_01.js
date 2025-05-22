$(function() {
    "use strict";
// -------------------------------------------------
// main
// -------------------------------------------------
    
    //set menubar
    var menu_bar;

    var back_url = null;

    $('input[name="pin_code"]').attr('placeholder',$('#str_password').text());

    if(location.hash === '#underage'){
        $('#sel_header').show();
        $('#sel_message').text($('#str_underage').text());
        $('#sel_message_sub').text($('#str_underage_sub').text());
        var buying_section = $.sessionStorage().getItem('buying_section');
        if(buying_section === 'card' || buying_section === 'iccard'){
            //残高不足から来た場合
            $.print('from buy');
            back_url = $.sessionStorage().getItem('money_referrer');
            menu_bar = new MenuBar(4, back_url);
        }else{
            $.print('from money01_01');
            back_url = 'money01_01.html';
            menu_bar = new MenuBar(4, back_url);
        }
    }else{
        $('#sel_message').text($('#str_normal').text());
        $('#sel_message_sub').text($('#str_normal_sub').text());
        //トップと戻るだけ表示

        // アプリジャンプの対応（SEE #3917）
        var url        = $.url();
        var passed_url = decodeURIComponent(url.param('seq'));
        if (passed_url.match(/seq=appJump/)) {
            back_url = 'data01_03.html?seq='
                + encodeURIComponent(passed_url);
            menu_bar = new MenuBar(6, back_url);
        } else {
            menu_bar = new MenuBar(6);
        }

    }
    // 「Wii U GamePadで入力を進めてください。」の画像を表示する SEE #14207
    showRequestDrc(back_url);
// -------------------------------------------------
// event
// -------------------------------------------------
    var fail_count = 0;
    $('input[name="pin_code"]').change(function(){
        if($(this).val() === '' || $(this).val() === $('#str_input').text()){ return false;}
        var chk_flg = false;
        if(isWiiU){
            var res = wiiuSystemSetting.checkParentalPinCode($(this).val());
            processJsxError(res);
            if(res.result === true){
                chk_flg = true;
            }
        }else{
            // 非Wii Uでは0000でOKにする
            if($(this).val() === '0000'){
                chk_flg = true;
            }
        }

        if(!chk_flg){
            // 失敗
            fail_count += 1;
            if(fail_count < 3){
                $('input[name="pin_code"]').blur().val('');
                $.alert($('#dialog_msg_invalid').text(), $('#dialog_msg_ok').text());
            }else{
                $.alert($('#dialog_msg_invalid').text(), $('#dialog_msg_top').text());
                location.replace('./#top');
            }
        }else{
            // 成功
            if(location.hash == '#underage'){
                location.replace('money05_01.html?seq='+$.url().param('seq'));
            }else if(location.hash == '#gameplay'){
                $.sessionStorage().setItem('pin_code_checked', 'true');
                location.replace(Wood.Util.encodeValues(
                    decodeURIComponent($.url().param('seq'))));
            }else if(location.hash == '#eshop'){
                $.sessionStorage().setItem('pin_code_checked', 'true');
                $.sessionStorage().setItem('pin_code_checked_for_eshop', 'true');
                location.replace(Wood.Util.encodeValues(
                    decodeURIComponent($.url().param('seq'))));
            }else if(location.hash == '#money'){
                $.sessionStorage().setItem('pin_code_checked', 'true');
                $.sessionStorage().setItem('pin_code_checked_for_eshop', 'true');
                $.sessionStorage().setItem('pin_code_checked_money', 'true');
                location.replace(Wood.Util.encodeValues(
                    decodeURIComponent($.url().param('seq'))));
            }

        }
    });
});
//history.back時の処理
window.onpageshow = function(e) {
    getBalance();
    //BGM
    setBGM('setting');
};
