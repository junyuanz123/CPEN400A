/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function cartDisplay(checkOut) {
    //clear modal
    $('.modal').remove();

    var string = '';

    //modal initial
    string = '<div class="modal" role="dialog" aria-labelledby="gridSystemModalLabel">';
    string = string + '<div class="modal-dialog modal-lg" role="document">';
    string = string + '<div class="modal-content">';

    //modal header
    string = string + '<div class="modal-header">';
    string = string + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    if (checkOut)
        string = string + '<h4 class="modal-title">Final Step</h4>';
    else
        string = string + '<h4 class="modal-title">Shopping Cart</h4>';
    string = string + '</div>';

    //modal body
    string = string + '<div class="modal-body">';

    //first row
    string = string + '<div class="row">';
    string = string + '<div class="col-md-3">Product Name</div>';
    string = string + '<div class="col-md-2">Product Number</div>';
    string = string + '<div class="col-md-2">Price</div>';
    string = string + '<div class="col-md-2">Total Price</div>';
    string = string + '<div class="col-md-3">Add/Delete</div>';
    string = string + '</div>';

    //generate table
    for (var product in cart) {
        if (cart[product] !== 0 && product !== 'total')
        {
            string = string + '<div class="row">';
            string = string + '<div class="col-md-3">' + product + '</div>'; //add product name
            string = string + '<div class="col-md-2">' + cart[product] + '</div>'; //add prodct number
            string = string + '<div class="col-md-2">' + '$' + products[product].price + '</div>'; //add prodct number
            string = string + '<div class="col-md-2">' + '$' + products[product].price * cart[product] + '</div>';
            string = string + '<div class="col-md-3">';
            string = string + '<button type="button" class="btn btn-default cartAdd btn-xs"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span></button>';
            string = string + '<button type="button" class="btn btn-default cartDelete btn-xs"><span class="glyphicon glyphicon-minus-sign" aria-hidden="true"></span></button>';
            string = string + '</div></div>';
        }
    }
    string = string + '</div>';

    //add total sum
    if (checkOut) {
        string = string + '<div class="modal-footer">Origianl Total Sum: $' + oldTotalPrice + '</div>';
        string = string + '<div class="modal-footer">Current Total Sum: $' + totalPrice + '</div>';
    }
    else
        string = string + '<div class="modal-footer">Total Sum: $' + totalPrice + '</div>';

    //two button;
    string = string + '<div class="modal-footer">';
    string = string + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';

    if (checkOut)
        string = string + '<button type="button" class="btn btn-primary" id="pay">Pay</button>';
    else
        string = string + '<button type="button" class="btn btn-primary" id="checkOut">Check Out</button>';
    string = string + '</div></div></div></div>';
    /*
     * insert after the footer;
     */
    $(string).insertAfter($('#footer'));
}

$(document).keydown(function (e) {
    // ESCAPE key pressed
    if (e.keyCode === 27) {
        $('.modal').modal('hide');
    }
});

$(document).on("click", "#checkOut", function () {
    if (totalPrice !== 0)
        jQueryAJAXConfirm();
    else {
        $('.modal').modal('hide');
        addSomethingDisplay();
        $(".modal").modal({keyboard: false});
    }

});

function updateCart() {

    //Create Modal
    $('.modal').modal('hide');
    $('.modal').remove();
    var string = '';

    //Modal Initial
    string = '<div class="modal" role="dialog" aria-labelledby="gridSystemModalLabel">';
    string = string + '<div class="modal-dialog modal-lg" role="document">';
    string = string + '<div class="modal-content">';

    //Modal header
    string = string + '<div class="modal-header">';
    string = string + '<h4 class="modal-title">Please Confirm Changes</h4>';
    string = string + '</div>';

    //Product Price Change
    string = string + '<div class="modal-body">';
    string = string + '<div class="row">';
    string = string + '<div class="col-md-4">Product Name</div>';
    string = string + '<div class="col-md-4">Original Product Price</div>';
    string = string + '<div class="col-md-4">Current Product Price</div>';
    string = string + '</div>';
    for (var product in cart) {
        if (product !== 'total') {
            if ((oldProducts[product].price !== products[product].price) && cart[product] !== 0)
            {
                string = string + '<div class="row">';
                string = string + '<div class="col-md-4">' + product + '</div>';
                string = string + '<div class="col-md-4">' + '$' + oldProducts[product].price + '</div>';
                string = string + '<div class="col-md-4">' + '$' + products[product].price + '</div>';
                string = string + '</div>';
            }

        }

    }
    string = string + '</div>';


    //Product Quality Change
    string = string + '<div class="modal-body">';
    string = string + '<div class="row">';
    string = string + '<div class="col-md-4">Product Name</div>';
    string = string + '<div class="col-md-4">Quantity In Carts</div>';
    string = string + '<div class="col-md-4">Quantity Available</div>';
    string = string + '</div>';
    for (var product in cart) {
        if (product !== 'total') {
            if (cart[product] > products[product].quantity)
            {
                string = string + '<div class="row">';
                string = string + '<div class="col-md-4">' + product + '</div>';
                string = string + '<div class="col-md-4">' + cart[product] + '</div>';
                string = string + '<div class="col-md-4">' + products[product].quantity + '</div>';
                string = string + '</div>';
                newCart[product] = products[product].quantity;
            }
            else
                newCart[product] = cart[product];
        }
    }
    string = string + '</div>';

    //two Button
    string = string + '<div class="modal-footer">';
    string = string + '<button type="button" class="btn btn-primary" id="changeConfirm">Confirm</button>';
    string = string + '</div></div></div></div>';

    $(string).insertAfter($('#footer'));
    $(".modal").modal({keyboard: false});

}

$(document).on("click", "#changeConfirm", function () {
    oldTotalPrice = totalPrice;
    totalPrice = 0;
    cart = newCart;
    $('.modal').modal('hide');
    for (product in cart) {
        if (product !== 'total') {
            products[product].quantity = products[product].quantity - cart[product];
            totalPrice = totalPrice + cart[product] * products[product].price;
        }
    }
    cartDisplay(true);
    updateTotalPrice();
    $(".modal").modal({keyboard: false});
});


$(document).on("click", "#pay", function () {

    $.extend(cart, {"total": totalPrice});
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Xoe2inasd')
        },
        url: "http://localhost:5000/checkpoint",
        type: "POST",
        data: JSON.stringify(cart),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
    }).success(function () {
        $('.modal').modal('hide');
        thanksDisplay();
        jQueryAJAX();
        totalPrice = 0;
        updateTotalPrice();
        cart['total'] = 0;
        $(".modal").modal({keyboard: false});
    }).fail(function (response) {
        if (response.status === 404) {
            $('.modal').modal('hide');
            authorizationfailDisplay();
            $(".modal").modal({keyboard: false});
        }
        else {
            alert('Network Error');
        }
    });
});

function thanksDisplay() {
    //clear modal
    $('.modal').remove();

    var string = '';

    //modal initial
    string = '<div class="modal" role="dialog" aria-labelledby="gridSystemModalLabel">';
    string = string + '<div class="modal-dialog modal-lg" role="document">';
    string = string + '<div class="modal-content">';

    //modal header
    string = string + '<div class="modal-header">';
    string = string + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    string = string + '<h4 class="modal-title">Thank You!</h4>';
    string = string + '</div>';

    //two button;
    string = string + '<div class="modal-footer">';
    string = string + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';

    string = string + '</div></div></div></div>';
    /*
     * insert after the footer;
     */
    $(string).insertAfter($('#footer'));
}

function addSomethingDisplay() {
    //clear modal
    $('.modal').remove();

    var string = '';

    //modal initial
    string = '<div class="modal" role="dialog" aria-labelledby="gridSystemModalLabel">';
    string = string + '<div class="modal-dialog modal-lg" role="document">';
    string = string + '<div class="modal-content">';

    //modal header
    string = string + '<div class="modal-header">';
    string = string + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    string = string + '<h4 class="modal-title">Please Add Something Products First!</h4>';
    string = string + '</div>';

    //two button;
    string = string + '<div class="modal-footer">';
    string = string + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';

    string = string + '</div></div></div></div>';
    /*
     * insert after the footer;
     */
    $(string).insertAfter($('#footer'));
}

function authorizationfailDisplay() {
    //clear modal
    $('.modal').remove();

    var string = '';

    //modal initial
    string = '<div class="modal" role="dialog" aria-labelledby="gridSystemModalLabel">';
    string = string + '<div class="modal-dialog modal-lg" role="document">';
    string = string + '<div class="modal-content">';

    //modal header
    string = string + '<div class="modal-header">';
    string = string + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    string = string + '<h4 class="modal-title">Please Check Your Token!</h4>';
    string = string + '</div>';

    //two button;
    string = string + '<div class="modal-footer">';
    string = string + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';

    string = string + '</div></div></div></div>';
    /*
     * insert after the footer;
     */
    $(string).insertAfter($('#footer'));
}