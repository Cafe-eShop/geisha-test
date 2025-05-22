$(function() {
// -------------------------------------------------
// main
// -------------------------------------------------
    var menu_bar = new MenuBar(4);

    var is_auto_billing;
    var url = $.url();
    //ペアレンタルコントロール(残高)
    var res_parental = checkParentalControlForEShop();
    $.print('res_parental:'+res_parental);
    if(!res_parental){
        location.replace('legal01_01.html?seq='+encodeURIComponent(url.attr('file')+'?'+url.attr('query'))+'#eshop');
        return false;
    }
    $('body').addClass('display_cover');


    //未成年ユーザチェック承諾後
    if(url.param('seq')==='underage'){
        gotoCreditCardInput();
        reutrn;
    }

    var screen_arr = [];
    screen_arr.push('data_exist','data_none','data_none_register');
    var screen = new SwitchScreen(screen_arr);

    //カード情報取得
    var req_obj = {
        url  : ninjaBase+'ws/my/credit_card',
        type : 'GET'
    };
    //ajax
    $.getXml(req_obj)
        .done(function(xml){
            var str_card_name = '';
            is_auto_billing =
                $(xml).find('credit_card').attr('auto_billing') === 'true';
            var card_type = $(xml).find('type_name').text();
            if(card_type==='VISA'){
                str_card_name = $('#str_card_VISA').text();
            }else if(card_type==='Master'){
                str_card_name = $('#str_card_Master').text();
            }else if(card_type==='JCB'){
                str_card_name = $('#str_card_JCB').text();
            }
            var card_num = str_card_name + ' ' +$(xml).find('masked_number').text();
            var expire_date = $(xml).find('exp_month').text()+'/20'+$(xml).find('exp_year').text();

            $('#sel_card_num').text(card_num);
            $('#sel_expire_date').text(expire_date);
            $('body').removeClass('display_cover');
            screen.change('data_exist');
            if (is_auto_billing) {
                $('#update_button').show();
            }
        }).fail(function(xml){
            var error_code = $(xml.responseText).find('code').text();
            var error_msg = $(xml.responseText).find('message').text();
            if(error_code == '3180'){
                showNoneOrRegister();
            }else{
                setErrorHandler(prefixNinja, error_code, error_msg, function(){
                    location.href = './#top';
                });
            }
        }
    );

    function showNoneOrRegister() {
        var req_plans_obj = {
            url: ninjaBase + 'ws/my/auto_billing/plans',
            type: 'GET'
        };
        //ajax
        $.getXml(req_plans_obj)
            .done(function(xml) {
                var is_contracted = $(xml).find('title_contract').size() > 0;
                var type = is_contracted ? 'data_none_register' : 'data_none';
                $('#' + type).removeAttr('style');
                $('body').removeClass('display_cover');
                screen.change(type);
            }).fail(function(xml) {
                var error_code = $(xml.responseText).find('code').text();
                var error_msg = $(xml.responseText).find('message').text();
                setErrorHandler(prefixNinja, error_code, error_msg, function() {
                    location.href = './#top';
                });
            }
        );
    }
// -------------------------------------------------
// event
// -------------------------------------------------
    $('#evt_delete').click(function(e){
        e.preventDefault();
        wood.jsExt.playSound('SE_WAVE_OK', 1);
        var confirm_msg = is_auto_billing ?
            $('#dialog_msg_auto_billing_delete').text() :
            $('#dialog_msg_confirm').text();
        var res = $.confirm(confirm_msg,
            $('#dialog_cancel').text(),
            $('#dialog_delete').text());

        if(res === true){
            var req_del = {
                          url  : ninjaBase+'ws/my/credit_card/!delete',
                          type : 'POST'
                          };
            //ajax
            $.getXml(req_del)
            .done(
                function(xml){
                    $.alert($('#dialog_msg_complete').text(),$('#dialog_ok').text());
                    $.sessionStorage().setItem('ccard_registration','none');
                    historyBack();
                }
            )
            .fail(
                function(xml){
                    initCardInfo();
                    var error_code = $(xml.responseText).find('code').text();
                    var error_msg = $(xml.responseText).find('message').text();
                    setErrorHandler(prefixNinja, error_code, error_msg, function(){});
                }
            );
        }
    });
    $('#evt_update').click(function(e){
        e.preventDefault();
        wood.jsExt.playSound('SE_WAVE_OK', 1);
        var res = $.confirm($('#dialog_msg_auto_billing_change').text(),
            $('#dialog_cancel').text(),
            $('#dialog_ok').text());

        if(res === true){
            routeViaCheckUnderAge(url, function() {
                gotoCreditCardInput();
            });
        }
    });
    $('#evt_register').click(function(e){
        e.preventDefault();
        wood.jsExt.playSound('SE_WAVE_OK', 1);
        routeViaCheckUnderAge(url, function() {
            gotoCreditCardInput();
        });
    });


    function gotoCreditCardInput() {
        $.sessionStorage().setItem('credit_card_update', 'true');
        location.replace('money04_01.html');
    }
});

// -------------------------------------------------
// functions
// -------------------------------------------------

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
