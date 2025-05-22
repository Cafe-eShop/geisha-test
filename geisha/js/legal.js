$(function() {

    var menu_bar;
    menu_bar = new MenuBar(1);
});
//history.back時の処理
window.onpageshow = function(e) {
    if (e.persisted) {
        $('#sel_menu_bar .on').removeClass('on'); // SEE #11973
    }
    getBalance();
    //BGM
    setBGM('setting');
};
