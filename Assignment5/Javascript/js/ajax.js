function jQueryAJAX(checkOut) {
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Xoe2inasd')
        },
        dataType: "json",
        url: "http://localhost:5000/products",
        timeout: 3000 //500ms
    }).success(function (response) {
        totalError = 0;
        var i = 0;
        jQueryProductImg = $('.product .productImg');
        jQueryPrice = $('.product .price');
        jQueryTag = $('.product .tag');
        for (var obj in response[0]) {
            if (typeof response[0][obj] === "object") {
                jQueryProductImg[i].src = response[0][obj].url;
                jQueryPrice[i].innerHTML = '$' + response[0][obj].price;
                jQueryTag[i].innerHTML = obj;
                i = i + 1;
                products[obj] = response[0][obj];
            }
        }
        getCart();
    }).fail(function (response) {
        if (response.status !== 404) {
            totalError++;
            if (totalError < 3)
                jQueryAJAX();
            else
                alert('Network Error');
        }
        else {
            $('.modal').modal('hide');
            authorizationfailDisplay();
            $(".modal").modal({keyboard: false});
        }

    });
}

function jQueryAJAXConfirm() {
    $.ajax({
        beforeSend: function (xhr) {
            xhr.setRequestHeader('Authorization', 'Xoe2inasd1')
        },
        dataType: "json",
        url: "http://localhost:5000/products",
        timeout: 3000 //500ms
    }).success(function (response) {
        totalError = 0;
        var i = 0;
        jQueryProductImg = $('.product .productImg');
        jQueryPrice = $('.product .price');
        jQueryTag = $('.product .tag');
        oldProducts = products;
        for (var obj in response[0]) {
            if (typeof response[0][obj] === "object") {
                jQueryProductImg[i].src = response[0][obj].url;
                jQueryPrice[i].innerHTML = '$' + response[0][obj].price;
                jQueryTag[i].innerHTML = obj;
                i = i + 1;
                products[obj] = response[0][obj];
            }
        }
        updateCart();
    }).fail(function (response) {
        if (response.status !== 404) {
            totalError++;
            if (totalError < 3)
                jQueryAJAXConfirm();
            else
                alert('Network Error');
        }
        else {
            $('.modal').modal('hide');
            authorizationfailDisplay();
            $(".modal").modal({keyboard: false});
        }
    });
}