$(function() {
// -------------------------------------------------
// main
// -------------------------------------------------
    function changeMenubarBack() {
        menu_bar.changeBackEvt(function(){
            menu_bar.initBackEvt('money04_01.html');
        });
    }

    //set menubar
    $('input[name="cc_pass"]').attr('placeholder',$('#str_pass').text());
    $('input[name="cc_pass2"]').attr('placeholder',$('#str_pass').text());

    function setUpCcWeb() {
        var delayCheckDeferred;
        var $card_info_frame = $('#card_info_frame');
        var CCPM = Wood.CCPM;
        var CC_MESSAGE = CCPM.MESSAGE;
        CCPM.setTargetOrigin('https://ccweb.wup.shop.nintendo.net');
        var promise = CCPM.getPMPromise($card_info_frame);
        promise.done(function(postMessage) {
            // カード情報初期化
            CCPM.onMessage(receiveMessage);
            function receiveMessage(event) {
                var data = JSON.parse(event.data);
                if (data.type === CC_MESSAGE.VALIDATE && delayCheckDeferred) {
                    // data.payload が true なら valid
                    delayCheckDeferred.resolve(data.payload);
                } else if (data.type === CC_MESSAGE.GO_BACK) {
                    // iframe内でBボタンが押されたら戻る
                    $('#top_link_05 > div').click();
                }
            }
        })

        return {
            // カード情報validateのPromiseを返す関数を返す
            delayCheck: function () {
                delayCheckDeferred = jQuery.Deferred();
                promise.done(function(postMessage) {
                    postMessage(CCPM.createMessage(CC_MESSAGE.CHECK));
                });

                return delayCheckDeferred.promise();
            },
            setCardType: function (card_type) {
                promise.done(function(postMessage) {
                    postMessage(CCPM.createMessage(CC_MESSAGE.SET_CARD_TYPE, card_type));
                    enableUserOperation();
                });
            },
            postSave: function () {
                promise.done(function(postMessage) {
                    postMessage(CCPM.createMessage(CC_MESSAGE.SAVE));
                });
            }
        }
    }
    // クレカ入力用のiframe処理
    var ccWeb = setUpCcWeb();

    var ref,menu_bar;
    var back_url = null;
    // 継続課金
    var contract_id = $.sessionStorage().getItem('auto_billing_contract_id');
    var is_auto_billing = !!contract_id;
    var is_update = $.sessionStorage().getItem('credit_card_update') === 'true';
    //購入フロー（残高不足分）から
    if($.sessionStorage().getItem('buying_section')==='card'){
        ref= $.sessionStorage().getItem('money_referrer');
        back_url = ref;
    // 継続課金
    }else if(is_auto_billing) {
        // 継続課金のときはhistoryBack
        back_url = undefined;
    // カードの変更
    }else if(is_update) {
        back_url = 'set04_01.html';
    //購入フロー（残高追加）or 通常フロー
    }else{
        back_url = 'money03_01.html';
    }
    menu_bar = new MenuBar(4, back_url);

    if (!is_auto_billing && !is_update &&
        ($.sessionStorage().getItem('addbal_cc') === null ||
         $.sessionStorage().getItem('ccard_registration') === null)
        ) {
        location.replace(ref);
    }
    var screen_arr = [];
    screen_arr.push('money04_01','money04_02','money04_03','money04_05','money04_06');

    var screen = new SwitchScreen(screen_arr);
    function showMoney04_05() {
        if (is_auto_billing || is_update) {
            // 継続課金 または カードの変更 では必ずクレカ登録する
            screen.change('money04_06');
            // 「Wii U GamePadで入力を進めてください。」の画像を表示する SEE #14207 #14809
            showRequestDrc(back_url);
            enableUserOperation();
            changeMenubarBack();
        } else {
            screen.change('money04_05');
        }
    }

    if (is_auto_billing || is_update) {
        // 継続課金 または カードの変更 ではヘッダーを変更
        $('#header_common > h1').text($('#str_cc_setting').text());
    }

    //パスワードチェック未入力戻り
    if($.url().param('seq')==='pass_back'){
        showMoney04_05();
        // 「Wii U GamePadで入力を進めてください。」の画像を表示する SEE #14207 #14809
        showRequestDrc(back_url);
        changeMenubarBack();
    //パスワードチェック戻り
    }else if($.url().param('seq')==='pass'){
        $.sessionStorage().setItem('ccard_registration','none');
        screen.change('money04_06');
        // 「Wii U GamePadで入力を進めてください。」の画像を表示する SEE #14207 #14809
        showRequestDrc(back_url);
        changeMenubarBack();
    //Postalコード入力戻り
    }else if($.url().param('seq')==='postal'){
        if($.sessionStorage().getItem('postal_code')===null){
            $.showError(errorCodeRetriable);
            location.replace('money03_01.html');
        }
        showMoney04_05();
        // 「Wii U GamePadで入力を進めてください。」の画像を表示する SEE #14207 #14809
        showRequestDrc(back_url);

        showMoney04_05();
        changeMenubarBack();
    }else{
        initCardInputInfo();
        // JCB出し分け
        if(country == 'JP'){
            $('#sel_JCB').removeAttr('style');
        }
        screen.change('money04_01');
    }
// -------------------------------------------------
// event
// -------------------------------------------------
    $('#money04_ul a').buttonAClick().click(function(e){
        e.preventDefault();

        disableUserOperation();
        var $card_info_frame = $('#card_info_frame');
        var JCB_HEIGHT = 150;
        var OTHER_HEIGHT = 225;
        var card_type = $(this).data('card-type');
        if(card_type==='JCB'){
            $('#sel_img_jcb').show();
            // セキュリティコード削除
            var $card_dom = $('#money04_02_dl');
            $card_dom.find('.sel_sec_code').hide();
            $card_dom.find('.btn_wrapper').hide();
            $card_dom.find('.sel_sec_date').removeClass('bb');
            // iframe の大きさを調整
             $card_info_frame.height(JCB_HEIGHT);
        }else if(card_type==='Master'){
            $('#sel_img_master').show();
             $card_info_frame.height(OTHER_HEIGHT);
        }else if(card_type==='VISA'){
            $('#sel_img_visa').show();
             $card_info_frame.height(OTHER_HEIGHT);
        }
        $.sessionStorage().setItem('cc_type', card_type);
        ccWeb.setCardType(card_type);
        screen.change('money04_02');
        // 「Wii U GamePadで入力を進めてください。」の画像を表示する SEE #14207
        showRequestDrc(back_url);
        var card_country_text = $(getShopRegion() === 'AUS'
            ? '#str_card_country_au'
            : '#str_card_country'
        ).text();
        $('#card_country').text(card_country_text);
        changeMenubarBack();
    });

    // カード情報入力画面に戻る。
    function backToCardInput() {
        menu_bar.applyButtonBEffect(function() {
            changeMenubarBack();
            screen.change('money04_02');
            // 「Wii U GamePadで入力を進めてください。」の画像を表示する SEE #14207
            showRequestDrc(back_url);
        });
    }

    //セキュリティコード画面
    $('#evt_sec_code').buttonAClick().click(function(e){
        e.preventDefault();
        screen.change('money04_03');
        menu_bar.changeBackEvt(function(){
            $('#top_link_05 > div').click(function(e){
                e.preventDefault();
                backToCardInput();
            });
            $('body').buttonB(function() {
                wood.jsExt.playSound('SE_WAVE_HWKEY_MENU_TRG', 1);
                wood.jsExt.playSound('SE_WAVE_BACK', 1);
                backToCardInput();
            });
        });
    });
    $('#evt_reg_card').buttonAClick().click(function(e){
        e.preventDefault();
        wood.jsExt.playSound('SE_WAVE_OK', 1);
        //ユーザ操作無効
        disableUserOperation();

        ccWeb.delayCheck()
        .done(function(isValid){
            if(!isValid){
                $.alert($('#dialog_msg_card').text(),$('#dialog_msg_ok').text());
                enableUserOperation();
                return false;
            }

            ccWeb.postSave();
            $.sessionStorage().setItem('ccard_registration','done');
            //クレカ住所設定（US,CAのみ）
            if(country === 'US' || country === 'CA'){
                // ccWeb.postSave の処理が終わりそうな時間まで待ってから遷移 SEE #71096
                setTimeout(function() {
                    location.replace('legal06_01.html');
                }, 500);
                return false;
            }
            changeMenubarBack();
            showMoney04_05();
            enableUserOperation();
        });
    });
    $('#evt_pass_no').buttonAClick().click(function(e){
        e.preventDefault();
        disableUserOperation();
        location.replace('money03_02.html');
    });
    $('#evt_pass_yes').buttonAClick().click(function(e){
        e.preventDefault();
        disableUserOperation();
        screen.change('money04_06');
        // 「Wii U GamePadで入力を進めてください。」の画像を表示する SEE #14207 #14809
        showRequestDrc(back_url);
        enableUserOperation();
        menu_bar.changeBackEvt(function(){
            menu_bar.initBackEvt('money04_01.html?seq=pass_back');
        });
    });
    $('input[name="cc_pass"]').change(function(){
        //ユーザ操作無効
        disableUserOperation();
        if($(this).val() === '' || $(this).val() === $('#str_pass').text()){ return false;}
        var pass1 = $(this).val();
        //パスワード英数字チェック
        if(!pass1.match(/^[a-zA-Z0-9]{4,8}$/)){
            $.alert($('#dialog_msg_bad_pass_type').text(),$('#dialog_msg_ok').text());
            $('input[name="cc_pass"]').blur().val('');
            screen.change('money04_06');
            enableUserOperation();
            return false;
        }
        //パスワード連続文字チェック
        if(pass1.match(/^([a-zA-Z0-9])\1{1,}$/)){
            $.alert($('#dialog_msg_bad_pass_seq').text(),$('#dialog_msg_ok').text());
            $('input[name="cc_pass"]').blur().val('');
            screen.change('money04_06');
            enableUserOperation();
            return false;
        }
        if(isWiiU) {
            $.alert($('#dialog_msg_confirm').text(),$('#dialog_msg_ok').text());
            enableUserOperation();
            var pass2 = wiiuKeyboard.openInPasswordMode(4, 8);
            if (pass2 === '') {
                screen.change('money04_06');
                $(this).blur().val('');
                return false;
            } else if (pass1!==pass2) {
                $.alert($('#dialog_msg_wrong_pass').text(),$('#dialog_msg_ok').text());
                screen.change('money04_06');
                $(this).blur().val('');
                return false;
            }
            disableUserOperation();
            $.sessionStorage().setItem('cc_pass',pass2);
            location.replace('money03_02.html');
        }else{
            //PC
            $.sessionStorage().setItem('cc_pass',pass1);
            location.replace('money03_02.html');
        }
    });
});

// -------------------------------------------------
// functions
// -------------------------------------------------
function initCardInputInfo(){
    "use strict";
    $.sessionStorage().removeItem('cc_type');
    $.sessionStorage().removeItem('cc_pass');
}

//history.back時の処理
window.onpageshow = function(e) {
    getBalance();
    //BGM
    setBGM('setting');
};
