$(function() {
    "use strict";
// -------------------------------------------------
// main
// -------------------------------------------------

    var url = $.url();
    //set menubar
    var menu_bar;
    //購入フローから
    if(url.param('buying_section')==='addr'){
        menu_bar= new MenuBar(6);
        $.sessionStorage().setItem('buying_section',url.param('buying_section'));
        switch(url.param('type')){
            case'title':
                $.sessionStorage().setItem('addr_referrer','buy01_01.html?type='+url.param('type') +
                    '&title='+url.param('title')+
                    getCouponCodeUrlQuery() +
                    '&buying_section='+url.param('buying_section'));
                break;
            case'aoc':
                $.sessionStorage().setItem('buying_aoc',url.param('aoc[]'));
                $.sessionStorage().setItem('addr_referrer','buy01_01.html?type='+url.param('type') +
                    '&title='+url.param('title')+
                    '&buying_section='+url.param('buying_section')+
                    '&aoc[]='+url.param('aoc[]'));
                break;
            case'ticket':
                $.sessionStorage().setItem('buying_ticket',url.param('ticket'));
                $.sessionStorage().setItem('addr_referrer','buy01_01.html?type='+url.param('type') +
                    '&title='+url.param('title')+
                    '&buying_section='+url.param('buying_section')+
                    '&ticket='+url.param('ticket'));
                break;
            case'demo':
                $.sessionStorage().setItem('addr_referrer','buy01_01.html?type='+url.param('type') +
                    '&title='+url.param('title')+
                    '&demo='+url.param('demo')+
                    '&buying_section='+url.param('buying_section'));
                break;
            default:
                break;
        }
        menu_bar.initBackEvt($.sessionStorage().getItem('addr_referrer'));
    //戻る
    }else if($.sessionStorage().getItem('buying_section')==='addr'){
        menu_bar= new MenuBar(6);
        menu_bar.initBackEvt($.sessionStorage().getItem('addr_referrer'));
    }else{
        menu_bar = new MenuBar(1);
    }

    var screen_arr = [];
    screen_arr.push('legal07_02','legal07_03','legal07_04','legal07_07');

    var screen = new SwitchScreen(screen_arr);
    var current_screen_no = '02';

    $('input[name="zipcode"]').attr('placeholder',$('#str_zipcode').text());
    if(country === 'CA'){
        var req_obj = {
                      url  : ninjaBase+'ws/' + country + '/tax_locations',
                      type : 'GET',
                      data : {'lang':lang }
        };
        //ajax
        $.getXml(req_obj)
        .done(
            function(xml){
                $('#sel_ca_location_list li').remove();
                $(xml).find('tax_location').each(function(){
                    //parse xml
                    var data_tax_location = $(this).attr('id');
                    var data_state_name = $(this).children('state').text();

                    //render template
                    $('#template_ca_tax_locations').tmpl({
                                            'data_tax_location' : data_tax_location,
                                            'data_state'        : data_state_name
                    }).appendTo('#sel_ca_location_list');
                    screen.change('legal07_07');
                    current_screen_no = '07';

                });
                $('.evt_sel_location').buttonAClick().click(function(e){
                    e.preventDefault();
                    //render template
                    $('#result_dl').empty();

                    $('#template_ca_tax_location').tmpl({
                        'str_province_name' : $(this).data('state'),
                        'str_province'      : $('#str_province').text()
                    }).appendTo('#result_dl');

                    $('#evt_tax_reg').attr('data-tax-location',$(this).data('tax-location'));
                    screen.change('legal07_04');
                    current_screen_no = '04-07';
                });
            }
        )
        .fail(
            function(xml){
                var error_code = $(xml.responseText).find('code').text();
                var error_msg = $(xml.responseText).find('message').text();
                setErrorHandler(prefixNinja, error_code, error_msg, function(status){
                    switch(error_code){
                    case '3121': //NEI_INVALID_POSTAL_CODE(専用2)->Legal07のZipコード入力画面
                    case '3122': //NEI_TAX_LOCATION_NOT_FOUND(専用2)->Legal07のZipコード入力画面
                        $.alert(error_msg, $('#dialog_error_ok').text());
                        break;
                    case '3055': //VCSPAS_CONNECTION_FAILURE(汎用2)->トップ
                    case '3056': //VCSPAS_BAD_RESPONSE(汎用2)->トップ
                    case '9009': //VCSPAS_TECHNICAL_DIFFICULTY(汎用2)->トップ
                    case '9010': //VCSPAS_SYSTEM_ERROR(汎用2)->トップ
                        location.href = './#top';
                        break;
                    }
                });
            }
        );
    }else{
        screen.change('legal07_02');
        current_screen_no = '02';
    }

// -------------------------------------------------
// event
// -------------------------------------------------
    //input zip code
    $('input[name="zipcode"]').change(function(){
        if($(this).val() === '' || $(this).val() === $('#str_zipcode').text()){return false;}
            //※zipコードが正しいかチェック
            var zip_code = $(this).val();
            if(isFinite(zip_code)){
                var req_obj = {
                              url  : ninjaBase+'ws/' + country + '/tax_locations',
                              type : 'GET',
                              data : {'lang':lang,
                                      'postal_code' : zip_code}
                };
                //ajax
                $.getXml(req_obj)
                .done(
                    function(xml){
                        $('#sel_location_list li').remove();
                        if($(xml).find('tax_location').size() >1){
                            $(xml).find('tax_location').each(function(){
                                //parse xml
                                var data_tax_location = $(this).attr('id');
                                var data_postal_code = $(this).children('postal_code').text();
                                var data_city_name = $(this).children('city').text();
                                var data_county_name = $(this).children('county').text();
                                var data_state_name = $(this).children('state').text();

                                //render template
                                $('#template_tax_locations').tmpl({
                                                        'data_tax_location' : data_tax_location,
                                                        'data_zip_code'     : data_postal_code,
                                                        'data_city'         : data_city_name,
                                                        'data_county'       : data_county_name,
                                                        'data_state'        : data_state_name
                                }).appendTo('#sel_location_list');
                                screen.change('legal07_03');
                                current_screen_no = '03';
                            });
                        }else{
                            $(xml).find('tax_location').each(function(){
                                //render template
                                $('#result_dl').empty();
                                $('#template_tax_location').tmpl({
                                                        'str_zip_code'     : $(this).children('postal_code').text(),
                                                        'str_city_name'    : $(this).children('city').text(),
                                                        'str_county_name'  : $(this).children('county').text(),
                                                        'str_state_name'   : $(this).children('state').text(),
                                                        'str_zip'          : $('#str_zip').text(),
                                                        'str_city'         : $('#str_city').text(),
                                                        'str_county'       : $('#str_county').text(),
                                                        'str_state'        : $('#str_state').text()
                                }).appendTo('#result_dl');
                                $('#evt_tax_reg').attr('data-tax-location',$(this).attr('id'));
                                screen.change('legal07_04');
                                current_screen_no = '04-02';
                            });
                        }
                        $('.evt_sel_location').buttonAClick().click(function(e){
                            e.preventDefault();
                            //render template
                            $('#result_dl').empty();
                            $('#template_tax_location').tmpl({
                                'str_zip_code'     : $(this).data('zip-code'),
                                'str_city_name'    : $(this).data('city'),
                                'str_county_name'  : $(this).data('county'),
                                'str_state_name'   : $(this).data('state'),
                                'str_zip'          : $('#str_zip').text(),
                                'str_city'         : $('#str_city').text(),
                                'str_county'       : $('#str_county').text(),
                                'str_state'        : $('#str_state').text()
                            }).appendTo('#result_dl');

                            $('#evt_tax_reg').attr('data-tax-location',$(this).data('tax-location'));
                            screen.change('legal07_04');
                            current_screen_no = '04-03';
                        });
                    }
                )
                .fail(
                    function(xml){
                        var error_code = $(xml.responseText).find('code').text();
                        var error_msg = $(xml.responseText).find('message').text();
                        setErrorHandler(prefixNinja, error_code, error_msg, function(status){
                            switch(error_code){
                            case '3121': //NEI_INVALID_POSTAL_CODE(専用2)->Legal07のZipコード入力画面
                            case '3122': //NEI_TAX_LOCATION_NOT_FOUND(専用2)->Legal07のZipコード入力画面
                                $.alert(error_msg, $('#dialog_error_ok').text());
                                break;
                            case '3055': //VCSPAS_CONNECTION_FAILURE(汎用2)->トップ
                            case '3056': //VCSPAS_BAD_RESPONSE(汎用2)->トップ
                            case '9009': //VCSPAS_TECHNICAL_DIFFICULTY(汎用2)->トップ
                            case '9010': //VCSPAS_SYSTEM_ERROR(汎用2)->トップ
                                location.href = './#top';
                                break;
                            }
                        });
                    }
                );
            }
    }).change();
    //select location
    //register location
    $('#evt_tax_reg').click(function(e){
        e.preventDefault();
        wood.jsExt.playSound('SE_WAVE_OK', 1);
        var req_obj = {
                      url  : ninjaBase + 'ws/my/tax_location/!put ',
                      type : 'POST',
                      data : {'tax_location_id' : $(this).data('tax-location')}
        };
        //ajax
        $.getXml(req_obj)
        .done(
            function(xml){
                //buying title
                if($.sessionStorage().getItem('buying_section')==='addr'){
                	// 購入シーケンスに戻る
                    menu_bar.initBackEvt($.sessionStorage().getItem('addr_referrer'));
                    location.replace($.sessionStorage().getItem('addr_referrer'));
                }else{
                    historyBack();
                }
            }
        )
        .fail(
            function(xml){
                var error_code = $(xml.responseText).find('code').text();
                var error_msg = $(xml.responseText).find('message').text();
                setErrorHandler(prefixNinja, error_code, error_msg, function(){
                    switch(error_code){
                    case '3124': //NEI_INVALID_TAX_LOCATION_ID(専用2)->フロー通り(起こりえない)
                        location.replace('legal07_02.html');
                        break;
                    case '3055': //VCSPAS_CONNECTION_FAILURE(汎用2)->トップ
                    case '3056': //VCSPAS_BAD_RESPONSE(汎用2)->トップ
                        location.href = './#top';
                        break;
                    case '9034': //TODO VCSPAS_INVALID_TAX_LOCATION_ID(汎用2)->US/CAではTax住所の再設定US/CA以外は購入画面トップ
                        if(country==='CA' || country==='US'){
                            location.replace('legal07_02.html');
                        }else{
                            historyBack();
                        }
                        break;
                    }
                });
            }
        );
        return false;
    });

    menu_bar.changeBackEvt(function(){
        var backevt = function(){
            if(current_screen_no === '02' || current_screen_no === '07'){
                historyBack();
            }else if(current_screen_no === '03'){
                $('input[name="zipcode"]').val('');
                screen.change('legal07_02');
                current_screen_no = '02';
            }else if(current_screen_no === '04-03'){
                screen.change('legal07_03');
                current_screen_no = '03';
            }else if(current_screen_no === '04-02'){
                $('input[name="zipcode"]').val('');
                screen.change('legal07_02');
                current_screen_no = '02';
            }else if(current_screen_no === '04-07'){
                screen.change('legal07_07');
                current_screen_no = '07';
            }
        }
        $('#top_link_05 > div').click(function(e){
            e.preventDefault();
            menu_bar.applyButtonBEffect(backevt);
        });
        $('body').buttonB(function() {
            wood.jsExt.playSound('SE_WAVE_HWKEY_MENU_TRG', 1);
            wood.jsExt.playSound('SE_WAVE_BACK', 1);
            menu_bar.applyButtonBEffect(backevt);
        });
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
