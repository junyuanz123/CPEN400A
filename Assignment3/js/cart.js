/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function cartDisplay() {
    $('.modal').remove();
    var string = '';
    string = '<div class="modal" role="dialog" aria-labelledby="gridSystemModalLabel">';
    string = string + '<div class="modal-dialog modal-lg" role="document">';
    string = string + '<div class="modal-content">';
    string = string + '<div class="modal-header">';
    string = string + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    string = string + '<h4 class="modal-title">Shopping Cart</h4>';
    string = string + '</div>';
    string = string + '<div class="modal-body">';
    string = string + '<div class="row">';
    string = string + '<div class="col-md-3">Product Name</div>';
    string = string + '<div class="col-md-2">Product Number</div>';
    string = string + '<div class="col-md-3">Price</div>';
    string = string + '<div class="col-md-4">Add/Delete</div>';
    string = string + '</div>';
    for (var product in cart) {
        if (cart[product] !== 0)
        {
            string = string + '<div class="row">';
            string = string + '<div class="col-md-3">' + product + '</div>'; //add product name
            string = string + '<div class="col-md-2">' + cart[product] + '</div>'; //add prodct number
            string = string + '<div class="col-md-3">' + '$' + products[product].price * cart[product] + '</div>';
            string = string + '<div class="col-md-4">';
            string = string + '<button type="button" class="btn btn-default cartAdd btn-xs"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button>';
            string = string + '<button type="button" class="btn btn-default cartDelete btn-xs"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span></button>';
            string = string + '</div></div>';
        }
    }
    string = string + '<div class="modal-footer">Total Sum: $' + totalPrice + '</div>';
    string = string + '</div>';
    string = string + '<div class="modal-footer">';
    string = string + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
    string = string + '<button type="button" class="btn btn-primary">Check Out</button>';
    string = string + '</div></div></div></div>';
    $(string).insertAfter($('#footer'));
}

$(document).on("click", ".cartAdd", function () {
    addToCart($(this).parent().parent().children().eq(0).toArray()[0].innerHTML);
    $('.modal').modal('hide');
    cartDisplay();
    $(".modal").modal({keyboard: false});
});

$(document).on("click", ".cartDelete", function () {
    removeFromCart($(this).parent().parent().children().eq(0).toArray()[0].innerHTML);
    $('.modal').modal('hide');
    cartDisplay();
    $(".modal").modal({keyboard: false});
});

/* Add to cart function */
function addToCart(selectedAddIteam) {
    resetInterval();
    cart[selectedAddIteam]++;
    products[selectedAddIteam].quanitity--;
    totalPrice = totalPrice + parseInt(products[selectedAddIteam].price);
    updateTotalPrice();
};

/* Remove from cart function */
function removeFromCart(selectedDeleteIteam) {
    resetInterval();
    cart[selectedDeleteIteam]--;
    products[selectedDeleteIteam].quanitity++;
    if (cart[selectedDeleteIteam] !== -1)
        totalPrice = totalPrice - parseInt(products[selectedDeleteIteam].price);
    else
        cart[selectedDeleteIteam] = 0;
    updateTotalPrice();
}
;

function updateTotalPrice() {
    $('#cartLogo').toArray()[0].innerHTML = 'Cart ($' + totalPrice + ')';
};







