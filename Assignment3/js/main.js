/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var products = []; /* 'product' array */
var cart = [];     /* 'cart' array */
var inactiveTime = 0;
var totalPrice = 0;

var cartAddArray = [];
var cartDeleteArray = [];
var selectedAddIteam;
var selectedDeleteIteam;


$(document).ready(function () {
    
    /* Call to Initial 'products' and 'cart' array */
    getProduct($('div.product p').toArray());
    getCart();
    
    cartDisplay();

    /* Show Cart Button */
    $('<button type="button" class="btn btn-danger" id="cartLogo">Cart ($'+ totalPrice+ ')</button>').insertBefore($('nav'));

    /* Picture Hover */
    $(".product").hover(function () {
        if(cart[($(this).find('.tag').toArray())[0].innerHTML]) {
            $(this).find('div').removeClass("CartHidden").addClass("CartVisible");
            $('<button type="button" class="btn btn-success" id="add" onclick="addToCart(selecteAddIteam)">Add</button>').insertAfter($(this).find('div').find('img'));
            $('<button type="button" class="btn btn-danger" id="delete" onclick="removeFromCart(selecteDeletedIteam)">Delete</button>').insertAfter($(this).find('div').find('img'));
            cartAddArray = $('#add').parent().siblings('p').toArray();
            selecteAddIteam = cartAddArray[1].innerHTML;
            cartDeleteArray = $('#delete').parent().siblings('p').toArray();
            selecteDeletedIteam = cartDeleteArray[1].innerHTML;
        }
        else {
            $(this).find('div').removeClass("CartHidden").addClass("CartVisible");
            $('<button type="button" class="btn btn-success" id="add" onclick="addToCart(selecteAddIteam)">Add</button>').insertAfter($(this).find('div').find('img')); 
            cartAddArray = $('#add').parent().siblings('p').toArray();
            selecteAddIteam = cartAddArray[1].innerHTML;
        }
    }, function () {
        $(this).find('div').removeClass("CartVisible").addClass("CartHidden");
        $(this).find('button').remove();
    });

    /* Button Click: Show Cart */
    $('#cartLogo').click(function () {
        resetInterval();
        cartDisplay();
        $(".modal").modal({ keyboard: false });
    });

});

