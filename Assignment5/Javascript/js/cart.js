/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).on("click", ".cartAdd", function () {
    /*
     * run addToCart function
     */
    addToCart($(this).parent().parent().children().eq(0).toArray()[0].innerHTML);
    /*
     * close the modal
     */
    $('.modal').modal('hide');
    /*
     * clean the modal and reconstruct the modal
     */
    cartDisplay();
    /*
     * display the modal
     */
    $(".modal").modal({keyboard: false});
});

$(document).on("click", ".cartDelete", function () {
    /*
     * run removeFromCart function
     */
    removeFromCart($(this).parent().parent().children().eq(0).toArray()[0].innerHTML);
    /*
     * close the modal
     */
    $('.modal').modal('hide');
    /*
     * clean the modal and reconstruct the modal
     */
    cartDisplay();
    /*
     * display the modal
     */
    $(".modal").modal({keyboard: false});
});


/* Add to cart function */
function addToCart(selectedAddIteam) {
    resetInterval();
    cart[selectedAddIteam]++;
    products[selectedAddIteam].quantity --;
    /*
     * update total price and display the price
     */
    totalPrice = totalPrice + parseInt(products[selectedAddIteam].price);
    updateTotalPrice();
};

/* Remove from cart function */
function removeFromCart(selectedDeleteIteam) {

    resetInterval();
    cart[selectedDeleteIteam]--;
    products[selectedDeleteIteam].quantity ++;
    /*
     * update total price and display the price
     */
    if (cart[selectedDeleteIteam] !== -1)
        totalPrice = totalPrice - parseInt(products[selectedDeleteIteam].price);
    else
        cart[selectedDeleteIteam] = 0;
    updateTotalPrice();
};

function updateTotalPrice() {
    $('#cartLogo').toArray()[0].innerHTML = 'Cart ($' + totalPrice + ')';
};

/* Show Cart Button */
$('<button type="button" class="btn btn-danger" id="cartLogo">Cart ($' + totalPrice + ')</button>').insertBefore($('nav'));

/* productCartDisplay (ADD/DELETE) BUTTON */
function productCartDisplay(product, that) {
    if (cart[product]) {
        $('<button type="button" class="btn btn-success" id="add">Add</button>').insertAfter($(that).find('div').find('img'));
        $('<button type="button" class="btn btn-danger" id="delete">Delete</button>').insertAfter($(that).find('div').find('img'));
    }
    else
        $('<button type="button" class="btn btn-success" id="add">Add</button>').insertAfter($(that).find('div').find('img'));
};

$(document).on("click", "#add", function () {
    var that = $('#add').parent().parent();
    var those = $('#add').parent();

    addToCart($('#add').parent().siblings('p').toArray()[1].innerHTML);
    $(this).parent().find('button').remove();
    productCartDisplay(those.siblings('p').toArray()[1].innerHTML, that);
});

$(document).on("click", "#delete", function () {
    var that = $('#delete').parent().parent();
    var those = $('#delete').parent();

    removeFromCart($('#delete').parent().siblings('p').toArray()[1].innerHTML);
    $(this).parent().find('button').remove();
    productCartDisplay(those.siblings('p').toArray()[1].innerHTML, that);
});




