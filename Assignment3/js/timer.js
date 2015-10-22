/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 * Timeout Function
 */

var tempinactiveTime = 0;

var timeOut = setInterval(function () {

    inactiveTime++;
    tempinactiveTime++;
    $('#inactiveTimer').toArray()[0].innerHTML = 'inactiveTimer: ' + inactiveTime;

    if (tempinactiveTime > 300) {
        tempinactiveTime = 0;
        alert("Do you want to buy soemthing?");
    }

}, 1000);

function resetInterval() {
    clearInterval(timeOut);
    inactiveTime = 0;
    tempinactiveTime = 0;
    timeOut = setInterval(function () {
        inactiveTime++;
        tempinactiveTime++;
        $('#inactiveTimer').toArray()[0].innerHTML = 'inactiveTimer: ' + inactiveTime;
        if (tempinactiveTime > 300) {
            tempinactiveTime = 0;
            alert("Do you want to buy soemthing?");
        }
    }, 1000);
}


