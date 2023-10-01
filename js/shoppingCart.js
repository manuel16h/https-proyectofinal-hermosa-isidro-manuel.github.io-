function ShoppingCart() {

    this.cart = [];
    this.productIndex;

    this.populate = function () {
        this.cart = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    }

    //Agrego un producto al carrito.
    //método add
    this.add = function (item) {
        this.cart.push(item);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.buildCart('cart-container');
    }

    // Elimino un producto del carrito.
    // Método remove
    this.remove = function (index) {
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.buildCart('cart-container');
    }

    //Método get
    this.get = function () {
        return this.cart;
    }

    // Método buildList
    this.buildList = function () {
        var html = '';
        this.cart.forEach(function (product, index) {
            var counter = index + 1;
            html = html + `<li class="list-group-item">
                            <span>
                            <button id="remove" class="btn btn-danger" onclick="removeFromCart(${index})">x</button>
                            </span>
                           <span class="mx-2">${counter}</span>
                           ${product.model}
                           </li>
                           `;
        });
        return html;
    }

    //Método buildCart
    this.buildCart = function (containerId) {
        var container = document.getElementById(containerId);
        container.innerHTML = "";
        var html = `
            <h5>Carrito de compras (${this.cart.length})</h5>
            <ul class="list-group my-3">
                ${this.buildList()}
            </ul>
            <button id="buy-button" class="btn btn-primary" onclick="checkOut()">Comprar</button>        
        `
        container.innerHTML = html;
    }

    //Método showTotal
    this.showTotal = function (containerId) {
        var total = 0;
        this.cart.forEach(function (product) {
            total = total + product.price;
        });
        var container = document.getElementById(containerId);
        container.innerHTML = "";
        var html = `<div class="my-5">
                    <h3 class="total">$${total}</h3>
                    </div>`
        container.innerHTML = html;
    }

}