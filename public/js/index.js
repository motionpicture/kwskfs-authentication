var KEY_ENTER = 'Enter';
var KEY_ESCAPE = 'Escape';
var qrReaderInputValue = '';

$(function () {
    // QRリーダー入力
    $(window).on('keypress', qrReaderInput);
});

/**
 * QRリーダー入力
 * @function qrReaderInput
 * @param {Event} event 
 */
function qrReaderInput(event) {
    $('.success,.failure').hide();
    if (event.key === KEY_ENTER && qrReaderInputValue.length > 0) {
        console.log(qrReaderInputValue);
        if (qrReaderInputValue === '1234') {
            success();
        } else {
            failure();
        }
        qrReaderInputValue = '';
    } else if (event.key !== KEY_ESCAPE) {
        qrReaderInputValue += event.key;
    }
}


/**
 * 成功
 */
function success() {
    $('.success').show();
}

/**
 * 失敗
 */
function failure() {
    $('.failure').show();
}