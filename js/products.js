
function Products() {

    this.data = [];
    this.results = [];

    this.init = function(data) {
        this.data = data;
    }

    this.getById = function(id) {
        return this.data.filter((product)=> product.id === id);
    }

    //Método buildHTMLProduct
    this.buildHtmlProduct = function(product){
        return `
                <div class="col-md-4">
                <img src="${product.img}" class="card-img-top" alt="smartphone">
                    <div class="card-body">
                    <h5 class="card-title">$${product.price}</h5>
                    <h6 class="card-title">${product.brand}</h6>
                    <h6 class="card-title">${product.model}</h6>
                    <input type="button" class="btn btn-primary my-2" value="Agregar al carro" onclick="addToCart('${product.id}')">
                    <button class="btn btn-secondary" data-toggle="modal" data-target="#modal-window">
                    Ver Detalle
                    </button>
                    </div>
                </div>
                <div class="modal" id="modal-window" tabindex="-1" role="dialog" aria-labelledby="title-window" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 id="title-window">Detalle del Producto</h5>
                    <button class="close" data-dismiss="modal" aria-label="cerrar"></button>
                    <span aria-hidden="true">&times;</span>
                </div>
                <div class="modal-body">
                <div class="alert alert-success">
                    <h6>${product.description}</h6>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" type="button" data-dismiss="modal">Cerrar</button>
            </div>
            </div>
        </div> 
        </div>

        ` 
    }

    this.buildList = function(containerId, sourceData) {
        var container = document.getElementById(containerId);
        container.innerHTML = '';
        var html = '';

        this[sourceData].forEach(product => {
            html = html + this.buildHtmlProduct(product); 
        });
        
        container.innerHTML = html;
    }

    this.search = function(key) {
        this.results = [];
        this.data.forEach((product) => {
            if(product.brand.toLowerCase().includes(key.toLowerCase())){
                this.results.push(product);
            }
        });
        return this.results;
    }

}