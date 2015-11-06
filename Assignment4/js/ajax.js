function jQueryAJAX(checkOut) {
    $.ajax({
        dataType: "json",
        url: "https://cpen400a.herokuapp.com/products",
        timeout: 500 //500ms
    }).success(function (response) {
        totalError = 0;
        var i = 0;
        jQueryProductImg = $('.product .productImg');
        jQueryPrice = $('.product .price');
        jQueryTag = $('.product .tag');
        products = response;
        getCart();
        for (var obj in response) {
            jQueryProductImg[i].src = response[obj].url;
            jQueryPrice[i].innerHTML = '$' + response[obj].price;
            jQueryTag[i].innerHTML = obj;
            i = i + 1;
        }
    }).fail(function () {
        totalError++;
        if (totalError < 10)
            jQueryAJAX();
        else
            alert('Network Error');
    });
}

function jQueryAJAXConfirm() {
    $.ajax({
        dataType: "json",
        url: "https://cpen400a.herokuapp.com/products",
        timeout: 500 //500ms
    }).success(function (response) {
        totalError = 0;
        var i = 0;
        jQueryProductImg = $('.product .productImg');
        jQueryPrice = $('.product .price');
        jQueryTag = $('.product .tag');
        oldProducts = products;
        products = response;
        for (var obj in response) {
            jQueryProductImg[i].src = response[obj].url;
            jQueryPrice[i].innerHTML = '$' + response[obj].price;
            jQueryTag[i].innerHTML = obj;
            i = i + 1;
        }
        updateCart();
    }).fail(function () {
        totalError++;
        if (totalError < 10)
            jQueryAJAXConfirm();
        else
            alert('Network Error');
    });
}