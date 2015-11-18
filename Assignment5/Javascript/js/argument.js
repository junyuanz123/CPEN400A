/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global cart */
function getCart() {
    for (var product in products) {
        cart[product] = 0;
    }
}
