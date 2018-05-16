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
        var ticketToken = qrReaderInputValue;
        checkIn(ticketToken, function() {
            qrReaderInputValue = '';
        });
    } else if (event.key !== KEY_ESCAPE) {
        qrReaderInputValue += event.key;
    }
}

/**
 * QR認証
 * @param {string} ticketToken
 * @param {Function} cb
 */
function checkIn(ticketToken, cb) {
    var options = {
        url: '/api/authorize/checkIn',
        type: 'POST',
        dataType: 'json',
        data: {
            ticketToken: ticketToken
        },
        timeout: 30 * 1000
    };
    var done = function (data, textStatus, jqXHR) {
        console.log(data, textStatus, jqXHR);
        success(data);
    };
    var fail = function (jqXHR, textStatus, errorThrown) {
        console.log(jqXHR, textStatus, errorThrown);
        failure();
    };
    var always = function () {
        cb();
    };
    $.ajax(options)
        .done(done)
        .fail(fail)
        .always(always);
}


/**
 * 成功
 */
function success(data) {
    $('.success-count').text(data.length);
    $('.success').show();
}

/**
 * 失敗
 */
function failure() {
    $('.failure').show();
}