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
        if ($(".alert").length !== 0) {
            $('.alert').remove();
        }
        var text = '<div class="alert alert-success alert-dismissible" id="cartResult" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                + cart.toString() +
                '</div>';
        $(text).insertAfter($('#showCart')).show('slow');
    });


});


function popUpAlert() {
    alert('Hey there! Are you still planning to buy something?');
}
var inactiveTime = setInterval(popUpAlert, 30000);
    
/* Add to cart function */
function addToCart(selectedAddItem) {

    if (isNaN(cart[selectedAddItem]))
        cart[selectedAddItem] = 1;
    else
        cart[selectedAddItem]++;
    products[selectedAddItem]--;
    
    clearInterval(inactiveTime);
    inactiveTime = setInterval(popUpAlert, 30000);
};

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
    clearInterval(inactiveTime);
    inactiveTime = setInterval(popUpAlert, 30000);
}

/* Initial 'product' array */
function getProduct(pArray) {
    for (var i = 0; i < pArray.length; i = i + 2) {
        products[pArray[i + 1].innerHTML] = 100;
    }
}

cart.toString = function () {
    var result;
    var index;
    result = "<table><tr><td>Product Name</td><td>Number</td></tr>";
    for (index in cart) {
        if (!isNaN(cart[index])) {
            result = result + '<tr><td>' + index + '</td><td>' + cart[index] + '</td></tr>';
        }
    }
    result = result + '</table>';
    return result;
};




