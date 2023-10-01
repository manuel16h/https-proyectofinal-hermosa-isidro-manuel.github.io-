let searchBoxInput;
let searchKey;
let searchResultLength;
let searchButton;
let formSearch;
let searchResume;
let products;
let totalContainer;
let totalPrice;
let productIndex;
let data;
let buyButton;

// Obtengo el valor de lo ingresado por input
function getSearchBoxValue(event) {
    let searchBoxInputValue = searchBoxInput.val();
    let searchResult = products.search(searchBoxInputValue);

    if (searchBoxInputValue.trim() !== '') {
        setSearchKeyRender(searchBoxInputValue, searchResult.length);
        products.buildList('products-container', 'results');
    }   
}

// Muestro los resultados obtenidos
function setSearchKeyRender(key, resultLength) {
    searchResultLength.html (resultLength);
    searchKey.html (key);
    searchResume.css("display", "block");
}

//Llamada ajax a un archivo JSON a nivel local.
function loadData() {
    const urlLocal = '../Proyecto Final/data/data.json';
    

    //Llamada AJAX
    $.ajax({
        method: "GET",
        url: urlLocal,
    }).done(function (data) {
        products.init(data);
        products.buildList('products-container', 'data');
    }).fail(function (error) {
        console.log(error);
    });
}

//Agrego un elemento al carrito
function addToCart(id) {
    let product = products.getById(id)[0];
    shoppingCart.add(product);
    shoppingCart.showTotal('total-container');
    $('#aside').show('slow');
}

//Remuevo un item del carrito.
function removeFromCart(index) {
    let i = index;
    shoppingCart.remove(i);
    shoppingCart.showTotal('total-container');
}

//Oculto la grilla de productos y muestro el formulario.
function checkOut() {
    $('#products-container').slideUp('fast');
    $('#checkout').slideDown('slow');
    $('#main-title, #form-search, #search-resume').fadeOut('slow');
}

$(document).ready(() => {

    // Cargo los productos
    loadData();
    products = new Products();

    shoppingCart = new ShoppingCart();
    shoppingCart.populate();
    shoppingCart.showTotal('total-container');
    shoppingCart.buildCart('cart-container');

    searchKey = $('#search-key');
    searchResultLength = $('#search-result-length');

    searchButton = $('#search-button');
    searchButton.click(function(event){
        getSearchBoxValue(event);
    });
    searchBoxInput = $('#search-box-input');

    searchResume = $('#search-resume');
    searchResume.css("display", "none");

    $("#step2").hide();
    $("#resume").hide();
    $('#step1-label').css('font-weight', 'bold');


    // Validación del primer paso del formulario.
    $("form[name='step1']").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true,
                minlength: 5
            }
        },
        messages: {
            email: {
                required: 'El campo email es obligatorio',
                email: 'Ingrese un email valido'
            },
            password: {
                required: 'El campo clave es obligatorio',
                minlength: 'La clave debe tener al menos 5 caracteres'
            }            
        },
        submitHandler: function(form) {
            $("#step1").slideUp("slow", function() {
                $("#step2").slideDown("slow", function(){
                    $('#step1-label').css('font-weight', 'normal');
                    $('#step2-label').css('font-weight', 'bold');
                })
            });                    
        }                
    });

    // Validación del segundo paso del formulario.
    $("form[name='step2']").validate({
        rules: {
            nombre: {
                required: true,
            },
            apellido: {
                required: true,
            }
        },
        messages: {
            nombre: {
                required: 'El campo nombre es obligatorio',
            },
            apellido: {
                required: 'El campo apellido es obligatorio',
            }            
        },
        submitHandler: function(form) {
            $("#step2").slideUp("slow", function() {
                $('#aside').hide('1500');
                $('#step2-label').css('font-weight', 'normal')
                $('#step3-label').css('font-weight', 'bold')
                $("#resume").slideDown('slow');
                $('#resumeName').html($('input[name="nombre"]').val());
                $('#resumeEmail').html($('input[name="email"]').val());
                
            });                    
        }                
    });

});