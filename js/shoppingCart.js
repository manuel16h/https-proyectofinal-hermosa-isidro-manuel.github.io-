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
        let html = '';
        this.cart.forEach(function (product, index) {
            let counter = index + 1;
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
        let container = document.getElementById(containerId);
        container.innerHTML = "";
        let html = `
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
        let total = 0;
        this.cart.forEach(function (product) {
            total = total + product.price;
        });
        let container = document.getElementById(containerId);
        container.innerHTML = "";
        let html = `<div class="my-5">
                    <h3 class="total">$${total}</h3>
                    </div>`
        container.innerHTML = html;
    }

}