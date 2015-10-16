/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var products = []; /* 'product' array */
var cart = [];     /* 'cart' array */
var cartAddArray = [];
var cartDeleteArray = [];
var selectedAddItem;
var selectedDeleteItem;
var flagPopup;

var result = [];
var inactiveTime = 0;

$(document).ready(function () {

    /* Call to Initial 'products' array */
    getProduct($('div.product p').toArray());

    /* Show Cart Button */
    $('<button type="button" class="btn btn-danger" id="showCart">Show Cart</button>').insertBefore($('nav'));

    /* Picture Hover */
    $(".product").hover(function () {
        $(this).find('div').removeClass("CartHidden").addClass("CartVisible");
        $('<button type="button" class="btn btn-success" id="add" onclick="addToCart(selecteAddItem)">Add</button>').insertAfter($(this).find('div').find('img'));
        $('<button type="button" class="btn btn-danger" id="delete" onclick="removeFromCart(selecteDeletedItem)">Delete</button>').insertAfter($(this).find('div').find('img'));
        cartAddArray = $('#add').parent().siblings('p').toArray();
        selecteAddItem = cartAddArray[1].innerHTML;
        cartDeleteArray = $('#delete').parent().siblings('p').toArray();
        selecteDeletedItem = cartDeleteArray[1].innerHTML;
    }, function () {
        $(this).find('div').removeClass("CartVisible").addClass("CartHidden");
        $(this).find('button').remove();
    });

    /* Button Click: Show Cart */
    $('#showCart').click(function () {
        var i = 0;
        for (var index in products) {
            result[i] = index;
            i++;
        }
        var cartPopTime = setInterval(cartpop, 30000); //30s
        inactiveTime = 0;
    });
    
});


function popUpAlert() {
    alert('Hey there! Are you still planning to buy something?');
}

var popUp = setInterval(popUpAlert, 30000);


function getconvCart() {
    var that = this;
    var lastResult = -1;
    var flag = true;
    
    this.get = function () {
        var i = 0;
        
        for (i = lastResult + 1; i < result.length; i++) {
            if (!isNaN(cart[result[i]]) && flag === true) {
                lastResult = i;
                flag = false;
            }
        }
        
        if (flag === true) {
            for (i = -1; i < result.length; i++) {
                if (!isNaN(cart[result[i]]) && flag === true) {
                    lastResult = i;
                    flag = false;
                }
            }
        }
        flag = true;
    };
    this.get();
    
    return {
        get: function() { that.get(); },
        result: function() { return lastResult }
    };
};

var returngetconvCart = getconvCart();
var cartpop = function() {
    returngetconvCart.get();
    var point = returngetconvCart.result();
    alert("Name:                          Number:\n" + result[point] + "                   " + cart[result[point]]);
};

/* Add to cart function */
function addToCart(selectedAddItem) {

    if (isNaN(cart[selectedAddItem]))
        cart[selectedAddItem] = 1;
    else
        cart[selectedAddItem]++;
    products[selectedAddItem]--;

    clearInterval(popUp);
    popUp = setInterval(popUpAlert, 30000);
    inactiveTime = 0;
}
;

/* Remove from cart function */
function removeFromCart(selectedDeleteItem) {
    if (isNaN(cart[selectedDeleteItem]))
        cart[selectedDeleteItem] = 0;
    else
    if (cart[selectedDeleteItem] !== 0)
    {
        cart[selectedDeleteItem]--;
        products[selectedDeleteItem]++;
    }
    if (cart[selectedDeleteItem] === 0)
        cart[selectedDeleteItem] = undefined;
    clearInterval(popUp);
    popUp = setInterval(popUpAlert, 30000);
    inactiveTime = 0;
}

/* Initial 'product' array */
function getProduct(pArray) {
    for (var i = 0; i < pArray.length; i = i + 2) {
        products[pArray[i + 1].innerHTML] = 100;
    }
}


function startTime() {
    inactiveTime ++;
    var t = setTimeout(startTime, 1000);
};

