$(function() {
    "use strict";
// -------------------------------------------------
// main
// -------------------------------------------------

    //set menubar
    var menu_bar = new MenuBar(1);
    var screen_arr = [];
    screen_arr.push('set07_01','set07_03');

    var screen = new SwitchScreen(screen_arr);
    screen.change();

    //country(JP)のみ入力フォーマットを変更
    if (country === 'JP') {
        $('#club_id').attr({
            maxlength : '12',
            keyboard : 'nnid',
            inputform : 'monospace'
        });
        $('#club_pass').attr({
            maxlength : '12',
            keyboard : 'nnid',
            inputform : 'monospace'
        });
    }

    //アカウント取得
    var req_obj = {
        url  : ninjaBase + 'ws/my/loyalty_account/',
        type : 'GET'
    };
    //ajax
    $.getXml(req_obj)
        .done(
        function(xml){
            if($(xml).find('loyalty_account_id').size() >0){
                $('#sel_loyalty_id').text($(xml).find('loyalty_account_id').text());
                $('#evt_club_remove').attr('data-loyalty-id',$(xml).find('loyalty_account_id').text());
                screen.change('set07_03');
            }else{
                screen.change('set07_01');
            }
        }
    )
        .fail(
        function(xml){
            var error_code = $(xml.responseText).find('code').text();
            var error_msg = $(xml.responseText).find('message').text();
            setErrorHandler(prefixNinja, error_code, error_msg, function(){
                switch(error_code){
                case '3051': //ECGS_CONNECTION_FAILURE(汎用2)->トップ
                    location.href = './#top';
                case '3200': //NEI_NO_LOYALTY_ACCOUNT->入力画面に留まる
                    screen.change('set07_01');
                        break;
                case '7499': //IAS_LAS_SERVER_MAINTENANCE(専用2)->入力画面に留まる
                    break;
                }
            });
        }
    );


// -------------------------------------------------
// event
// -------------------------------------------------
    //登録
    $('#evt_club_reg').buttonAClick().click(function(e){
        e.preventDefault();
        disableUserOperation();
        wood.jsExt.playSound('SE_WAVE_OK', 1);
        var id = $('input[name="id"]').val();
        var pass = $('input[name="pass"]').val();
        if(id!=='' && pass!==''){
            var req_obj_set = {
                url  : ninjaBase + 'ws/my/loyalty_account/!link',
                type : 'POST',
                data : {'loyalty_account_id' : id,
                    'loyalty_account_password' : pass}
            };
            //ajax
            $.getXml(req_obj_set)
                .done(
                function(xml){
                    $.alert($('#dialog_msg_complete').text(),$('#dialog_ok').text());
                    historyBack();
                }
            )
                .fail(
                function(xml){
                    //パスワードを空にする
                    $('input[name="pass"]').blur().val('');
                    var error_code = $(xml.responseText).find('code').text();
                    var error_msg = $(xml.responseText).find('message').text();
                    setErrorHandler(prefixNinja, error_code, error_msg, function(){
                        switch(error_code){
                        case '3051': //ECGS_CONNECTION_FAILURE(汎用2)->トップ
                            location.href = './#top';
                            break;
                        case '6941': //IAS_LOYALTY_AUTH_SERVICE_ERROR->番号を入力したページ
                        case '6942': //IAS_LOYALTY_AUTH_SERVICE_NOT_AVAILABLE->番号を入力したページ
                        case '6943': //IAS_LOYALTY_ID_OR_PWD_FORMAT_ERROR->番号を入力したページ
                        case '6989': //IAS_LOYALTY_LINK_LIMIT_ERROR(専用2)->入力画面に留まる
                        case '7401': //IAS_LAS_PASSWORD_MISMATCH(専用2)->番号を入力したページ
                        case '7402': //IAS_LAS_USAGE_STOPPED(汎用2)->番号を入力したページ
                        case '7403': //IAS_LAS_NO_AUTHORITY(専用2)->番号を入力したページ
                        case '7499': //IAS_LAS_SERVER_MAINTENANCE(専用2)->入力画面に留まる
                        default:
                            enableUserOperation();
                            break;
                        }
                    });
                }
            );
        }else{
            enableUserOperation();
        }
    });
    //解除
    $('#evt_club_remove').buttonAClick().click(function(e){
        e.preventDefault();
        disableUserOperation();
        wood.jsExt.playSound('SE_WAVE_OK', 1);
        var res = $.confirm($('#dialog_msg_confirm').text(),$('#dialog_cancel').text(),$('#dialog_remove').text());
        if(res === true){
            var req_obj_set = {
                url  : ninjaBase + 'ws/my/loyalty_account/!unlink',
                type : 'POST',
                data : {'loyalty_account_id' : $(this).data('loyalty-id')}
            };
            //ajax
            $.getXml(req_obj_set)
                .done(
                function(xml){
                    $.alert($('#dialog_msg_remove').text(),$('#dialog_ok').text());
                    historyBack();
                }
            )
                .fail(
                function(xml){
                    //パスワードを空にする
                    $('input[name="pass"]').blur().val('');
                    var error_code = $(xml.responseText).find('code').text();
                    var error_msg = $(xml.responseText).find('message').text();
                    setErrorHandler(prefixNinja, error_code, error_msg, function(){
                        switch(error_code){
                        case '3051': //ECGS_CONNECTION_FAILURE(汎用2)->トップ
                            location.href = './#top';
                            break;
                        case '7499': //IAS_LAS_SERVER_MAINTENANCE(専用2)->入力画面に留まる
                        default:
                            enableUserOperation();
                            break;
                        }
                    });
                }
            );
        }else{
            enableUserOperation();
        }
    });
});
//history.back時の処理
window.onpageshow = function(e) {
    if (e.persisted) {
        $('body').addClass('display_cover');
        location.reload();
    }
    getBalance();
    //BGM
    setBGM('setting');
};
