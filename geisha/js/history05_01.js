$(function(){
    "use strict";
// -------------------------------------------------
// main
// -------------------------------------------------
    var tran_id = $.url().param('tran_id');
    if(tran_id!==undefined){
        var req_obj = {
            url  : ninjaBase+'ws/my/transaction/'+ tran_id+'/receipt',
            type : 'GET'
        };
        //ajax
        $.getXml(req_obj)
        .done(
            function(xml){
                var receipt_html = '';
                receipt_html += $(xml).find('header:first').text()+'<br /><br />';

                $(xml).find('statement').each(function(){
                    receipt_html += '--------------------------------------------------------------------------<br />';
                    receipt_html += $(this).children('header').text().replace(/\n/g, "<br />")+'<br style="line-height: 1.8;"/>';
                    if ($(this).children('content').text() !== ""){
                        receipt_html += $(this).children('content').text().replace(/\n/g, "<br />")+'<br /><br />';
                    }
                });
                $('#p2_rating_wrap p').append(receipt_html);
            }
        )
        .fail(
            function(xml){
                var error_code = $(xml.responseText).find('code').text();
                var error_msg = $(xml.responseText).find('message').text();
                setErrorHandler(prefixNinja, error_code, error_msg, function(){
                    switch(error_code){
                    case '3053': //ECGS_CONNECTION_FAILURE(æ±Žç”¨2)->ãƒˆãƒƒãƒ—
                    case '3021': //NEI_TITLE_NOT_EXIST(å°‚ç”¨2)->ãƒˆãƒƒãƒ—
                    case '6670': //ECS_BAD_TRANSACTION_ID(å°‚ç”¨2)->ãƒˆãƒƒãƒ—
                        location.href = './#top';
                        break;
                    case '3001': //NEI_INVALID_PARAMETER(æ±Žç”¨1)
                    case '3010': //NEI_INVALID_SESSION(å°‚ç”¨1)
                    case '3049': //NEI_UNEXPECTED_SERVER_ERROR(æ±Žç”¨1)
                    case '6699': //ECS_INTERNAL_ERROR(æ±Žç”¨1)
                    default:
                        break;
                    }
                });
            }
        );
    }else{
        setErrorHandler(null, errorCodeRetriable, '', function(){
            //æ±Žç”¨2
            historyBack();
        });
    }
});
//history.backæ™‚ã®å‡¦ç†
window.onpageshow = function(e) {
    if (e.persisted) {
        $('#sel_menu_bar .on').removeClass('on'); // SEE #11973
    }
    getBalance();
    setBGM('setting');
};