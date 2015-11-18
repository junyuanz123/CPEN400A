/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var products = {}; /* 'product' array */
var oldProducts;
var newCart = {};
var cart = {};     /* 'cart' array */
var inactiveTime = 0;
var totalPrice = 0;
var oldTotalPrice = 0;
var totalError = 0;
   
$(document).ready(function () {

    jQueryAJAX();
    /* Picture Hover */
    $(".product").hover(function () {
        var that = this;
        $(this).find('div').removeClass("CartHidden").addClass("CartVisible");
        productCartDisplay($(this).find('p').toArray()[1].innerHTML, that);
        
    }, function () {
        $(this).find('div').removeClass("CartVisible").addClass("CartHidden");
        $(this).find('button').remove();
    });

    /* Button Click: Show Cart */
    $('#cartLogo').click(function () {
        resetInterval();
        /*
         * reconstruct the cart modal
         */
        cartDisplay();
        $(".modal").modal({ keyboard: false });
    });

});

