/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function cartDisplay() {
    /*
     * clear the modal first
     */
    $('.modal').remove();
    
    var string = '';
    
    /*
     * modal initial
     */
    string = '<div class="modal" role="dialog" aria-labelledby="gridSystemModalLabel">';
    
    string = string + '<div class="modal-dialog modal-lg" role="document">';
    
    string = string + '<div class="modal-content">';
    
    /*
     * modal header
     */
    string = string + '<div class="modal-header">';
    string = string + '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    string = string + '<h4 class="modal-title">Shopping Cart</h4>';
    string = string + '</div>';
    
    /*
     * modal body
     */
    string = string + '<div class="modal-body">';
    
    /*
     * modal row: first row
     */
    string = string + '<div class="row">';
    string = string + '<div class="col-md-3">Product Name</div>';
    string = string + '<div class="col-md-2">Product Number</div>';
    string = string + '<div class="col-md-3">Price</div>';
    string = string + '<div class="col-md-4">Add/Delete</div>';
    string = string + '</div>';
    
    /*
     * generate the row automaticly
     * @type @arr;cart
     */
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
    string = string + '</div>';
    
    /*
     * add total sum row;
     */
    string = string + '<div class="modal-footer">Total Sum: $' + totalPrice + '</div>';
    /*
     * two button;
     */
    string = string + '<div class="modal-footer">';
    string = string + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
    string = string + '<button type="button" class="btn btn-primary">Check Out</button>';
    string = string + '</div></div></div></div>';
    /*
     * insert after the footer;
     */
    $(string).insertAfter($('#footer'));
}

$(document).keydown(function(e) {
    // ESCAPE key pressed
    if (e.keyCode === 27) {
        $('.modal').modal('hide');
    }
});