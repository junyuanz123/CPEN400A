/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* Initial 'product' array */
function getProduct(pArray) {
    var reg = /\d+/;
    for (var i = 0; i < pArray.length; i = i + 2) {
        products[pArray[i + 1].innerHTML] = {
            price: pArray[i].innerHTML.match(reg)[0],
            quanitity: 10
        };
    }
}

function getCart() {
    for (var product in products) {
        cart[product] = 0;
    }
}
