$(function() {

    //set menubar
    var menu_bar = new MenuBar(1);

});
//history.back時の処理
window.onpageshow = function() {
    getBalance();
    //BGM
    setBGM('setting');
};