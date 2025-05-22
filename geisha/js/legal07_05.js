$(function() {
    "use strict";

// -------------------------------------------------  
// main  
// -------------------------------------------------  
    var url = $.url();
    //set menubar
    var menu_bar;
    menu_bar = new MenuBar(1);


// -------------------------------------------------  
// event  
// -------------------------------------------------  
    $('#evt_setting').buttonAClick().click(function(e){
        e.preventDefault();
        wood.jsExt.playSound('SE_WAVE_OK', 1);
        var req_obj = {
            url  : ninjaBase + 'ws/my/tax_location/!delete',
            type : 'POST'
        };
        //ajax
        $.getXml(req_obj)
            .done(
            function(xml){
                location.replace('legal07_02.html');
            }
        )
            .fail(
            function(xml){
                location.replace('legal07_02.html');
            }
        );
    });
});
// -------------------------------------------------  
// functions  
// -------------------------------------------------

//history.back時の処理
window.onpageshow = function(e) {
    if (e.persisted) {
        $('#sel_menu_bar .on').removeClass('on'); // SEE #11973
    }
    getBalance();
    //BGM
    setBGM('setting');
};
