$(function() {
// -------------------------------------------------
// main
// -------------------------------------------------

    var seq = decodeURIComponent($.url().param('seq'));
    var ref = seq;
    var menu_bar = new MenuBar(4,ref);
    var is_from_nfc = /^money06_01\.html/.test(seq);

    if (is_from_nfc) {
        // money06から来たときはメッセージを差し替える
        $('#attention_for_parent').html($('#str_nfc_agree').html());
    } else {
    }


    var contract_id = $.sessionStorage().getItem('auto_billing_contract_id');
    var is_auto_billing = !!contract_id;
    var is_update = $.sessionStorage().getItem('credit_card_update') === 'true';

    if (is_auto_billing || is_update) {
        // 継続課金 または カードの変更 ではヘッダーを変更
        $('#header_common > h1').text($('#str_cc_setting').text());
    }
// -------------------------------------------------
// event
// -------------------------------------------------

    $('#evt_disagree').buttonAClick().click(function(e){
        e.preventDefault();
        historyBack();
    });
    $('#evt_agree').buttonAClick().click(function(e){
        e.preventDefault();
        if(seq.slice(-1) == '?'){
            seq+='seq=underage';
        }else if(seq.indexOf('?')>0){
            seq+='&seq=underage';
        }else{
            seq+='?seq=underage';
        }
        location.replace(seq);
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
