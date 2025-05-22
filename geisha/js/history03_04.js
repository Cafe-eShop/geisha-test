$(function(){
    "use strict";
// -------------------------------------------------
// main
// -------------------------------------------------
    //get contents
    var type = $.url().param('type');
    var title = $.url().param('title');
    if(type==='shared'){
        var inst_shared = new PurchasedAOCItem(title,'shared');
        inst_shared.request();
    }else{
        var inst_owned = new PurchasedAOCItem(title,'owned');
        inst_owned.request();
    }
// -------------------------------------------------
// event
// -------------------------------------------------


});
// -------------------------------------------------
// functions
// -------------------------------------------------
function PurchasedAOCItem(ns_uid,type) {
    "use strict";
    var self = this;
    this.ns_uid = ns_uid;
    this.data_title = [];
    this.page_type = type;
    this.page_num = 0;
    this.total_num = 0;
    this.limit = 25;
    this.lock_flg = false;

    this.request = function(offset){
        var req_url;
        if(self.page_type==='shared'){
            req_url = ninjaBase+'ws/my/shared_aocs';
        }else{
            req_url = ninjaBase+'ws/my/owned_aocs';
        }
        var req_data;
        if(offset!==undefined){
            req_data = { 'title' : self.ns_uid,'offset' : offset,'limit' : self.limit};
        }else{
            req_data = { 'title' : self.ns_uid,'offset' : 0,'limit' : self.limit};
        }
        var req_obj = {
            url  : req_url,
            type : 'GET',
            data : req_data
        };
        //ajax
        $.getXml(req_obj,true)
        .done(
            function(xml){
                var res = false;
                if(self.lock_flg===false){
                    self.setDataTitles();
                    self.setOwnedList();
                    res = self.checkStatus();
                }
                if(res==='download'){
                    //DLタスク中
                    $.alert($('#dialog_msg_DL').text(),$('#dialog_msg_ok').text());
                    historyBack();
                }else if(res==='update'){
                    //更新
                    var redirector = function(e) {
                        e.preventDefault();
                        var url = 'buy01_01.html?type=aoc&title=' + self.ns_uid;
                        location.replace(url);
                        throw new Error('redirect stopper: ' + url);
                    };
                    $('#sel_update a').on('click', redirector);
                    $('#data_update').show();
                }else{
                    self.total_num = parseInt($(xml).find('aocs').attr('total'),10);
                    self.renderPager();
                    $.when(self.render(xml)).pipe(function(){
                        self.event();
                        self.checkDownload();
                        if(self.lock_flg===true){
                            enableUserOperation();
                            self.lock_flg = false;
                        }
                    });
                }
            }
        )
        .fail(
            function(xml){
                var error_code = $(xml.responseText).find('code').text();
                var error_msg = $(xml.responseText).find('message').text();
                setErrorHandler(prefixNinja, error_code, error_msg, function(){
                    switch(error_code){
                    case '3053': //ECGS_CONNECTION_FAILURE(汎用2)->トップ
                        location.href = './#top';
                        break;
                    case '3010': //NEI_INVALID_SESSION(専用1)
                    case '3049': //NEI_UNEXPECTED_SERVER_ERROR(汎用1)
                    case '6696': //ECS_IAS_ERROR(汎用1)
                    case '6699': //ECS_INTERNAL_ERROR(汎用1)
                    default:
                        break;
                    }
                });
            }
        );
    };
    this.render = function(xml){
        var aoc_available = $(xml).find('title').children('aoc_available').text();
        if (aoc_available === 'false') {
            // woodで発売しない追加コンテンツは一覧画面へのリンクを隠す SEE #18704
            $('.h21_data').hide();
        }

        if(self.total_num===0){
            $('#data_none').show();
        }else{
            $('#h2_addc').show();
            //ヘッダー
            var str_title = $(xml).find('title').children('name').text();
            var url_icon = $(xml).find('title').children('icon_url').text();
            var detail_url = 'data03_01.html?title='+self.ns_uid;
            $('#sel_title').html(str_title);
            $('#sel_icon').data('original',url_icon);
            $('#sel_detail').attr('href',detail_url);
            $('#data_exist').show();
            if(self.lock_flg){$('html,body').animate({ scrollTop: $('html,body').offset().top }, 0);}
            $('#sel_aoc_items  li').remove();
            //コンテンツ
            $(xml).find('aoc').each(function(){
                var data_aoc_id = $(this).attr('id');
                var data_variation = $(this).children('content_indexes').attr('variation');
                var data_content_index = [];
                $(this).children('content_indexes').children('content_index').each(function(){
                    data_content_index.push($(this).text());
                });
                var aoc_name = $(this).children('name').text();
                var url_icon = $(this).children('icon_url').text();

                //render template
                $('#template_aoc_item').tmpl({
                    'data_aoc_id' : data_aoc_id,
                    'data_variation' : data_variation,
                    'data_content_index' : data_content_index,
                    'url_icon'       : url_icon,
                    'str_aoc_name'  : aoc_name,
                    'str_redl'       : $('#str_redl').text()
                }).appendTo('#sel_aoc_items');
            });
        }
    };
    this.event = function(){
        lazyload('img.lazy');
        //prev next pagebuttonイベント
        $('.evt_aoc_pager_prev, .evt_aoc_pager_next, a.evt_aoc_pager_num').buttonAClick().click(function(e){
            e.preventDefault();
            var offset = ($(this).data('page_num')-1)*self.limit;
            self.page_num = $(this).data('page_num');
            if($(this).hasClass('evt_aoc_pager_num')){
                $('.evt_aoc_pager_num').removeClass('btn_006').addClass('btn_002');
                $(this).removeClass('btn_002').addClass('btn_006');
            }else if($(this).hasClass('evt_aoc_pager_prev')){
                $(this).parent().removeClass('ps_arrow_l02').addClass('ps_arrow_l03');
            }else if($(this).hasClass('evt_aoc_pager_next')){
                $(this).parent().removeClass('ps_arrow_r02').addClass('ps_arrow_r03');
            }
            disableUserOperation();
            self.lock_flg = true;
            self.request(offset);
        });
    };
    this.setDataTitles = function(){
        //データタイトル取得
        if(isWiiU){
            var conv = convertAOCNsuidToTitleid(self.ns_uid);
            if(conv.error){
                var error_code = conv.error.code_no;
                var error_msg = conv.error.message;
                setErrorHandler(prefixNinja, error_code, error_msg, function(){
                    switch(error_code){
                        case '3150': //NEI_TITLE_DISABLE_DOWNLOAD(汎用2)->トップ
                            location.href = './#top';
                            break;
                    }
                });
            }else{
                for(var i=0; i<conv.length; i++){
                    self.data_title[i] = {};
                    self.data_title[i].title_id = conv[i].title_id;
                    self.data_title[i].title_version = conv[i].title_ver;
                }
            }
        }
    };
    this.checkStatus = function(){
        if(self.data_title.length > 0){
            for(var i=0; i<self.data_title.length; i++){
                //タイトルID,最新バージョン取得
                var title_id = self.data_title[i].title_id;
                var title_version = self.data_title[i].title_version;

                //データタイトルの購入権利を持っているか
                for(var j=0; j<self.owned_list.length; j++){
                    var variation = self.owned_list[j].variation;
                    if(variation===title_id.slice(-2)){
                        //インストール済み更新チェック
                        var res_ver = wiiuDevice.getTitleInstallState(title_id);
                        processJsxError(res_ver);

                        // 現在タスクに積まれているタイトルを取得
                        // SEE #3460
                        var task_state = wiiuEC.getDownloadTaskState(title_id);
                        processJsxError(task_state);

                        if (task_state && task_state.registerd &&
                            task_state.titleVersion < parseInt(title_version,10)) {
                            return 'download';
                        }
                        if(res_ver.installed){
                            if(parseInt(res_ver.version,10) < parseInt(title_version,10)
                                && (task_state && task_state.registerd === false)){
                                //更新画面表示
                                $.print('NEED AOC UPDATE : new ver.'+ title_version + 'installed ver.'+ res_ver.version);
                                return 'update';
                            }
                        }
                    }
                }
            }
        }
        return 'none';
    };
    this.setOwnedList = function(){
        var variation_list = [];
        var owned_list = [];
        var req_obj_order = {
            url  : ninjaBase+'ws/my/owned_contents',
            type : 'GET',
            data : {
                'title':self.ns_uid,
                'lang':lang
            }
        };
        //ajax
        $.getXml(req_obj_order)
            .done(
            function(owned_xml){
                //レスポンスからvariation値取得
                $(owned_xml).find('owned_content').each(function(){
                    variation_list.push($(this).children('title_id').text().slice(-2));
                });
                //重複チェック（self,sibling）
                var storage = {};
                var variation_unique_arr = [];
                var i,value;
                for ( i=0; i<variation_list.length; i++) {
                    value = variation_list[i];
                    if(!(value in storage)) {
                        storage[value] = true;
                        variation_unique_arr.push(value);
                    }
                }
                //再度レスポンスからvariation単位でcontent_indexを取得
                // owned_list[i][variation]
                // owned_list[i][content_index][i]
                $.each(variation_unique_arr,function(key,value){
                    var owned_item = {};
                    owned_item.variation = variation_unique_arr[key];
                    owned_item.content_index = [];
                    $(owned_xml).find('owned_content').each(function(){
                        if(variation_unique_arr[key]===$(this).children('title_id').text().slice(-2)){
                            $(this).children('content_indexes').children('content_index').each(function(){
                                owned_item.content_index.push($(this).text());
                            });
                        }
                    });
                    owned_list.push(owned_item);
                });
                self.owned_list = owned_list;
            }
        )
            .fail(
            function(xml){
                var error_code = $(xml.responseText).find('code').text();
                var error_msg = $(xml.responseText).find('message').text();
                setErrorHandler(prefixNinja, error_code, error_msg, function(){
                    switch(error_code){
                        case '3021'://3021 NEI_TITLE_NOT_EXIST
                            historyBack();
                            break;
                        case '3052'://3052 ECGS_BAD_RESPONSE
                        case '3053'://3053 ECGS_CONNECTION_FAILURE
                            location.href='./#top';
                            break;
                        default:
                            break;
                    }
                });
            }
        );
    };

    this.checkDownload = function(){
        if(self.data_title.length > 0 && $('#sel_aoc_items li[data-aoc-id]').size() >0){
            //購入済みリスト取得
            var owned_list = [];
            var variation_list = [];
            var req_obj_order = {
                url  : ninjaBase+'ws/my/owned_contents',
                type : 'GET',
                data : {
                    'title':ns_uid,
                    'lang':lang
                }
            };
            //ajax
            $.getXml(req_obj_order)
                .done(
                function(owned_xml){
                    //レスポンスからvariation値取得
                    $(owned_xml).find('owned_content').each(function(){
                        variation_list.push($(this).children('title_id').text().slice(-2));
                    });
                    //重複チェック（self,sibling）
                    var storage = {};
                    var variation_unique_arr = [];
                    var i,value;
                    for ( i=0; i<variation_list.length; i++) {
                        value = variation_list[i];
                        if(!(value in storage)) {
                            storage[value] = true;
                            variation_unique_arr.push(value);
                        }
                    }
                    //再度レスポンスからvariation単位でcontent_indexを取得
                    //再受信チェック用
                    // owned_list[i][variation]
                    // owned_list[i][content_index][i]
                    $.each(variation_unique_arr,function(key,value){
                        owned_list[key] = {};
                        owned_list[key].variation = variation_unique_arr[key];
                        owned_list[key].content_index = [];
                        $(owned_xml).find('owned_content').each(function(){
                            if(variation_unique_arr[key]===$(this).children('title_id').text().slice(-2)){
                                $(this).children('content_indexes').children('content_index').each(function(){
                                    owned_list[key].content_index.push($(this).text());
                                });
                            }
                        });
                    });
                }
            )
                .fail(
                function(xml){
                    var error_code = $(xml.responseText).find('code').text();
                    var error_msg = $(xml.responseText).find('message').text();
                    setErrorHandler(prefixNinja, error_code, error_msg, function(){
                        switch(error_code){
                            case '3021'://3021 NEI_TITLE_NOT_EXIST
                                historyBack();
                                break;
                            case '3052'://3052 ECGS_BAD_RESPONSE
                            case '3053'://3053 ECGS_CONNECTION_FAILURE
                                location.href='./#top';
                                break;
                            default:
                                break;
                        }
                    });
                }
            );
            //インストール済みタイトル取得
            var installed_list = [];
            for(var j=0; j<self.data_title.length; j++){
                var ins_title_id = self.data_title[j].title_id;
                var res_install = wiiuDevice.getAocContentIndexList(ins_title_id);
                processJsxError(res_install);
                var variation = ins_title_id.slice(-2);
                installed_list[j] = {};
                installed_list[j].title_id = ins_title_id;
                installed_list[j].variation = variation;
                installed_list[j].content_index = res_install.indexes;
            }

            $('#sel_aoc_items li[data-aoc-id]').each(function(){
                //リストのID
                var aoc_id = $(this).attr('data-aoc-id');
                //リストのvariation
                var aoc_list_variation = $(this).attr('data-variation');
                //リストのcontent_index
                var aoc_list_content_index = [];
                aoc_list_content_index = $(this).attr('data-content-index').split(',');

                //購入済みcontent_indexチェック
                var aoc_list_owned = [];
                $.each(owned_list,function(key,value){
                    if(value.variation===aoc_list_variation){
                        for(var i=0 ; i<aoc_list_content_index.length; i++ ) {
                            if(value.content_index.indexOf(aoc_list_content_index[i])!== -1){
                                aoc_list_owned.push(aoc_list_content_index[i]);
                            }
                        }
                    }
                });
                //リストのcontent_indexをすべて所有
                if(aoc_list_content_index.length===aoc_list_owned.length){
                    //インストール済み判定
                    var aoc_list_installed = [];
                    $.each(installed_list,function(key,value){
                        if(value.variation===aoc_list_variation){
                            for(var i=0 ; i<aoc_list_content_index.length; i++ ) {
                                if(value.content_index.indexOf(aoc_list_content_index[i])!== -1){
                                    aoc_list_installed.push(aoc_list_content_index[i]);
                                }
                            }
                        }
                    });
                    //リストのcontent_indexをすべてインストール済
                    if(aoc_list_content_index.length!==aoc_list_installed.length ){
                        //再受信URL
                        $('.sel_redl a',this).attr('href','buy01_01.html?type=aoc&title='+ self.ns_uid + '&aoc[]=' + aoc_id);
                        //再受信ボタン表示
                        $('.sel_redl',this).show();
                    }
                }
            });
        }
    };
    this.renderPager = function(){
        $('.sel_aoc_navi li').remove();
        //ページャー
        if(self.total_num > self.limit){
            var total = Math.ceil(self.total_num/self.limit);//ページャー数
            if(total>1){
                var show_navi = 5;
                if(total < show_navi){
                    show_navi = total;
                }
                var current = 1;
                if(self.page_num>1){
                    current = parseInt(self.page_num,10);
                }
                var show_navih = Math.floor(show_navi / 2);
                var start = current - show_navih;
                var end = current + show_navih;
                if(start <= 0){
                    start = 1;
                    end = show_navi;
                }
                if(end > total){
                    start = total - show_navi+1;
                    end = total;
                }
                if((current < 4 && total > 7) || (current < 4 && total === 6)){
                    end++;
                }
                if((current > total-3 && total > 7) || (current > total-3 && total === 6)){
                    start--;
                }
                if(total===7){
                    start =1;
                    end =7;
                }
                var navi_html = '';
                //prev
                if(current > 1){
                    navi_html += '<li class="ps_arrow_l02"><a href="#" class="evt_aoc_pager_prev se" data-se-label="SE_WAVE_OK_SUB" data-page_num="'+(current - 1)+'">'+(current - 1)+'</a></li>';
                }else{
                    navi_html += '<li class="ps_arrow_l01"><a>&lt;</a></li>';
                }
                //min表示
                if(current > 3 && total >7){
                    navi_html += '<li><a href="#" class="btn_002 evt_aoc_pager_num se" data-se-label="SE_WAVE_OK_SUB" data-page_num="1">1</a></li>';
                    if(current > 4 && total >7){
                        navi_html += '<li class="ps_3point">...</li>';
                    }
                }
                for(var i=start; i<=end; i++){
                    if(i === current){
                        navi_html += '<li><a href="#" class="btn_006 evt_aoc_pager_num se" data-se-label="SE_WAVE_OK_SUB" data-page_num="'+i+'">'+i+'</a></li>';
                    }else{
                        navi_html += '<li><a href="#" class="btn_002 evt_aoc_pager_num se" data-se-label="SE_WAVE_OK_SUB" data-page_num="'+i+'">'+i+'</a></li>';
                    }
                }

                //max表示
                if(current < total - 2 && total>7 ){
                    if(current < total - 3 && total >7){
                        navi_html += '<li class="ps_3point">...</li>';
                    }
                    navi_html += '<li><a href="#" class="btn_002 evt_aoc_pager_num se" data-se-label="SE_WAVE_OK_SUB" data-page_num="'+total+'">'+total+'</a></li>';
                }
                //next
                if(current < total){
                    navi_html += '<li class="ps_arrow_r02"><a href="#" class="evt_aoc_pager_next se" data-se-label="SE_WAVE_OK_SUB" data-page_num="'+(current + 1)+'">'+(current + 1)+'</a></li>';
                }else{
                    navi_html += '<li class="ps_arrow_r01"><a>&gt;</a></li>';
                }
                $('.sel_aoc_navi').append(navi_html);
            }
        }
    };

}

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
