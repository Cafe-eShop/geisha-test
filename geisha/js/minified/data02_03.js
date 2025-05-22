$(function() {
    $.print("data02_03 called");
    "use strict";
// -------------------------------------------------
// main
// -------------------------------------------------

    var canplay_enabled = true;

    //set menubar
    var menu_bar = new MenuBar(7);
    $('#data02_03_02').hide();

    var ns_uid = $.url().param('title');
    var aoc_id = $.url().param('aoc');
    var video = document.getElementById('sel_aoc_mov');
    var seek_time = video.currentTime;
    var rating_flg = true;
    var esrb_flg = false;
    var end_flg = false;

    var req_obj = {
        url  : samuraiBase + 'ws/' + country + '/title/' + ns_uid,
        type : 'GET',
        data : {'lang':lang}
    };
    //ajax
    var movie = $.getXml(req_obj)
        .done(
        function(xml){
            //ãƒ¬ãƒ¼ãƒ†ã‚£ãƒ³ã‚°æƒ…å ±å–å¾—
            var rating_sys_id,rating_id,rating_age;
            var title_id = $(xml).find('title').attr('id');
            if($(xml).find('title').children('rating_info').size() >0){
                var $rating = $(xml).find('title').children('rating_info');
                rating_sys_id = $rating.children('rating_system').attr('id');
                rating_id = $rating.children('rating').attr('id');
                rating_age = $rating.children('rating').children('age').text();
                esrb_flg = $rating.children('rating_system').children('name').text() === 'ESRB';

                var RATING_CLASSES = {
                    '201': 'rd_cero',
                    '202': 'rd_esrb',
                    '203': 'rd_usk',
                    '204': 'rd_pegi',
                    '206': 'rd_pegi',
                    '207': 'rd_bbfc',
                    '208': 'rd_cob',
                    '209': 'rd_oflc',
                    '212': 'rd_rar',
                    '303': 'rd_iarc_usk',
                    '304': 'rd_iarc_pegi',
                    '306': 'rd_iarc_pegi',
                    '308': 'rd_iarc_cob',
                    '309': 'rd_iarc_oflc'
                };
                var rating_class = RATING_CLASSES[rating_sys_id];
                if (rating_class) {
                    $('#rating_display').addClass(rating_class);
                }
                var rating_sys_img;
                if($(xml).find('alternate_rating_image_url').size() >0){
                    rating_sys_img = $(xml).find('alternate_rating_image_url').text();
                }else{
                    rating_sys_img = $rating.children('rating')
                            .children('icons').find('icon[type="normal"]').attr('url');
                    $rating.find('descriptor').each(function(){
                        if($(this).children('icons').find('icon[type="normal"]').size() >0){
                            var descriptor_img = $(this).children('icons')
                                            .find('icon[type="normal"]').attr('url');
                            $('#rd_r').append('<img src='+ descriptor_img +' />');
                        }else{
                            var descriptor_text = $(this).children('name').text();
                            $('#rd_r').append('<p>'+descriptor_text+'</p>');
                        }
                    });
                }
                $('#rd_l').append('<p><img src='+ rating_sys_img +' /></p>');
            }else{
                $('#rating_display').hide();
                rating_flg = false;
            }
            //AGEã‚²ãƒ¼ãƒˆ
            var res_age;
            if(rating_flg){
                res_age = checkAgeGate(0,rating_sys_id,rating_age,title_id);
            }else{
                res_age = true;
            }
            if(!res_age){
                $.alert($('#dialog_msg_age').text(),$('#dialog_msg_ok').text());
                historyBack();
            }else{
                //ãƒšã‚¢ãƒ¬ãƒ³ã‚¿ãƒ«ã‚³ãƒ³ãƒˆãƒ­ãƒ¼ãƒ«(å¹´é½¢)
                var res_parental = checkParentalControlForGamePlay(rating_age);
                if(!res_parental){
                    var url = $.url();
                    location.replace('legal01_01.html?seq='+encodeURIComponent(url.attr('file')+'?'+url.attr('query'))+'#gameplay');
                }else{
                    $('body').removeClass('display_cover');
                    var req_mov = {
                        url  : samuraiBase + 'ws/' + country + '/aocs',
                        type : 'GET',
                        data : { 'lang' : lang,
                            'aoc[]' : aoc_id
                        }
                    };
                    //ajax
                    $.getXml(req_mov, true)
                        .done(
                        function(xml){
                            $(xml).find('aoc').each(function(){
                                var promo_name = $(this).children('name').text();
                                var promo_icon = $(this).children('icon_url').text();
                                var promo_desc = $(this).children('description').text();

                                var $movie_name = $('#sel_movie_name');
                                // Textoverflow
                                $movie_name.html(promo_name);
                                var html = $movie_name.html();
                                var $clone = $movie_name.clone();

                                $clone.css({
                                    'display' : 'none',
                                    'position' : 'absolute',
                                    'overflow' : 'visible',
                                    'width' : $movie_name.width(),
                                    'height' : 'auto'
                                });
                                $movie_name.after($clone);
                                while((html.length > 0) && ($clone.height() > $movie_name.height())) {
                                    html = html.substr(0, html.length - 1);
                                    $clone.html(html + '...');
                                }
                                $movie_name.html($clone.html());
                                $clone.remove();

                                $('#sel_movie_full_name').html(promo_name);
                                $('#sel_icon').attr('src',promo_icon);
                                $('#sel_desc').html(promo_desc);
                                var promo_url = $(this).children('promotion_movie_url').text();
                                //å†ç”Ÿãƒ ãƒ¼ãƒ“ãƒ¼
                                $('#sel_aoc_mov').attr('src' , promo_url);
                            });
                        }
                    )
                        .fail(
                        function(xml){
                            var error_code = $(xml.responseText).find('code').text();
                            var error_msg = $(xml.responseText).find('message').text();
                            setErrorHandler(prefixSamurai, error_code, error_msg, function(){
                                historyBack();
                            });
                        }
                    );
                }
            }

        }
    )
        .fail(
        function(xml){
            var error_code = $(xml.responseText).find('code').text();
            var error_msg = $(xml.responseText).find('message').text();
            setErrorHandler(prefixSamurai, error_code, error_msg, function(){
                historyBack();
            });
        }
    );
    $.when(movie).pipe(function(){
        $("#sel_icon").on("error", function(){
            $(this).attr('src','image/placeholder/place_icon_add_c.png');
        });
    });
    //ç”»é¢è¡¨ç¤ºæ™‚é–“(ãƒŸãƒªç§’)
    var DISPLAY_TIME = {
        RATING_ON : 4 * 1000,
        RATING_OFF : 1000
    };

    $(window).load( function() {
        if (rating_flg) {
            //ãƒ¬ãƒ¼ãƒ†ã‚£ãƒ³ã‚°ãŒESRBã®å ´åˆå†ç”Ÿãƒœã‚¿ãƒ³ã«åˆ‡ã‚Šæ›¿ãˆã‚‹
            if (esrb_flg) {
                setTimeout( function() {
                    $('#dmc01').fadeOut('normal', function() {
                        $('#dmc02').show();
                    });
                }, DISPLAY_TIME.RATING_ON);
            } else {
                setTimeout( function() {
                    videoPLay();
                }, DISPLAY_TIME.RATING_ON);
            }
        } else {
            setTimeout( function() {
                videoPLay();
            }, DISPLAY_TIME.RATING_OFF);
        }
    });

// -------------------------------------------------
// event
// -------------------------------------------------
    $('#top_link_07').buttonAClick().click(function(e){
        e.preventDefault();
        historyBack();
    });
    //é«˜ç”»è³ªé–‰ã˜ã‚‹ã‚¤ãƒ™ãƒ³ãƒˆ
    video.addEventListener('wiiu_videoplayer_end', closeVideoPlayer,true);
    //é«˜ç”»è³ªå†ç”Ÿå¯èƒ½ã‚¤ãƒ™ãƒ³ãƒˆ
    video.addEventListener("canplay", function() {
        if (!canplay_enabled) {
            return;
        }
        video.currentTime = seek_time;
        canplay_enabled = false;
    },true);
    //é«˜ç”»è³ªå†ç”Ÿé–‹å§‹ã‚¤ãƒ™ãƒ³ãƒˆ
    video.addEventListener("play", function() {
        end_flg = false;
    },true);
    //é«˜ç”»è³ªå†ç”Ÿçµ‚äº†ã‚¤ãƒ™ãƒ³ãƒˆ
    video.addEventListener("ended", function() {
        end_flg = true;
    },true);
    $('#evt_play').buttonAClick().click(function(e){
        e.preventDefault();
        wood.jsExt.playSound('SE_WAVE_OK', 1);
        videoPLay();
    });
    //é«˜ç”»è³ªå†ç”Ÿ
    function videoPLay(){
        if(!end_flg){
            seek_time = video.currentTime;
        }else{
            seek_time = 0;
        }
        var analytics = function(promo_url) {
            var movie = promo_url.match(/\d{14}/);
            var movie_id = (movie && movie.length > 0) ? movie[0] : '';
            Wood.Analytics.sendMoviePlay(movie_id);
        };
        analytics($('#sel_aoc_mov').attr('src'));

        end_flg = false;
        video.load();
        video.play();
        window.wiiu.videoplayer.viewMode = false;
        $('#data02_03_02').show();
        $('#sel_menu_bar').hide();
        $('#data02_03_01').hide();
        $('body').unbind('keydown');
    }
});

// -------------------------------------------------
// functions
// -------------------------------------------------
function closeVideoPlayer(){
    //ãƒ¦ãƒ¼ã‚¶æ“ä½œç¦æ­¢
    disableUserOperation();

    // BTS 1821
    hideLoadingIcon();

    //ãƒ¦ãƒ¼ã‚¶æ“ä½œç¦æ­¢è§£é™¤
    enableUserOperation();
    historyBack();
}

//history.backæ™‚ã®å‡¦ç†
window.onpageshow = function(e) {
    getBalance();
    //BGM
    setBGM('main');
};