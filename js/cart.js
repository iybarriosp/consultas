// variables globales 
let iconCart = document.querySelector(".carrito");
let iconCount = document.querySelector(".contar-pro");
let btnProducts = document.querySelectorAll(".btn-product");
let contentProducts = document.querySelector(".content-pro");
let listCart = document.querySelector(".list-cart tbody");
let btnCart = document.querySelector(".btn-cart");
let con = 1; // contador de productos agregados
let cart = {}; // carrito de productos

// Evento para cargar productos al cargar la página
document.addEventListener("DOMContentLoaded", ()=>{
    getProductData();
});


// Evento para mostrar/ocultar el carrito
iconCart.addEventListener("click", ()=>{
    if (listCart.parentElement.style.display == "none"){
        listCart.parentElement.style.display = "block";
    }else{
        listCart.parentElement.style.display = "none";
    }
});

// Función para obtener información del producto y agregarlo al carrito
let getInfoProduct = (id) =>{
    let products = [];
    let productPrevius = JSON.parse(localStorage.getItem("productos"));
    if( productPrevius != null ) {
        products = Object.values(productPrevius);
    }
    
    let product = products[id];
    addProCart(product);

    Swal.fire({
        title: '¡Producto agregado al carrito con exito!',
        text: '',
        icon: 'success',
        timer: 1000,  // Se cerrará en 3 segundos
        showConfirmButton: false, // Quita el botón para que cierre sola
        background: '#f9f9f9',     // Cambia el fondo de la alerta
        color: '#000000',             // Cambia el color del texto
        iconColor: '#00b410',      // Cambia el color del ícono
        padding: '1.5rem',         // Ajusta el padding de la alerta
        width: '350px'
    });
      
    
    //agregar evento al boton ver carrito
    btnCart.addEventListener("click", ()=>{
        storageProduct(products[id]);//pasando productos a la funcion
    });
    
    // Actualizamos el contador del carrito
    iconCount.textContent = Object.keys(cart).length;
};

//funcion para guardar los productos del carrito en localStorage
let storageProduct = (product)=>{
    let products = [];
    let productPrevius = JSON.parse(localStorage.getItem("carrito"));
    if( productPrevius != null ) {
        products = Object.values(productPrevius);
    }
    products.push(product);
    localStorage.setItem("carrito", JSON.stringify(products));//guardando en localStorage
    location.href = "cart.html"; //redirigir a la pagina carrito
};

// Función para agregar el producto al carrito
let addProCart = (prod) => {
    if (!cart[prod.id]) {
        cart[prod.id] = {...prod, cantidad: 1};
    } else {
        cart[prod.id].cantidad += 1;
    }

    // Limpiar el carrito en el DOM antes de volver a pintarlo
    listCart.innerHTML = "";

    // Volver a renderizar el carrito con los productos
    Object.values(cart).forEach((prod, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td> ${index + 1} </td>
            <td> <img src="${prod.imagen}" width="70px" </td>
            <td> ${prod.nombre} </td>
            <td> ${prod.precio} </td>
            <td> ${prod.cantidad} </td>
            <td>
                <button onclick="deleteCart(${prod.id});" type="button" class="btn-delete btn text-danger">X</button>
            </td>
        `;
        listCart.appendChild(row);  
    });

    // Actualizamos el contador del carrito
    iconCount.textContent = Object.keys(cart).length;
};

// Función para eliminar un producto del carrito
let deleteCart = (id) => {
    if (cart[id]) {
        delete cart[id]; // Eliminar el producto del carrito

        // Volver a renderizar el carrito
        listCart.innerHTML = "";

        Object.values(cart).forEach((prod, index) => {
            let row = document.createElement("tr");
            row.innerHTML = `
                <td> ${index + 1} </td>
                <td> <img src="${prod.imagen}" width="70px" </td>
                <td> ${prod.nombre} </td>
                <td> ${prod.precio} </td>
                <td> ${prod.cantidad} </td>
                <td>
                    <button onclick="deleteCart(${prod.id});" type="button" class="btn-delete btn text-danger">X</button>
                </td>
            `;
            listCart.appendChild(row);  
        });

        Swal.fire({
            title: '¡Producto eliminado con exito!',
            text: '',
            icon: 'warning',
            timer: 1000,  // Se cerrará en 3 segundos
            showConfirmButton: false, // Quita el botón para que cierre sola
            background: '#f9f9f9',     // Cambia el fondo de la alerta
            color: '#000000',             // Cambia el color del texto
            iconColor: '#b10000',      // Cambia el color del ícono
            padding: '1.5rem',         // Ajusta el padding de la alerta
            width: '350px'
          });

        // Actualizar el contador del carrito
        iconCount.textContent = Object.keys(cart).length;
    }
};


let getProductData = async ()=> {
    let url = "http://localhost/backend-apiCrud/productos";
    try{
        let respuesta = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json"
            }
        });
        if (respuesta.status === 204 ){
            console.log("No hay datos en la BD");
        }else{
            let tableData= await respuesta.json();
            console.log(tableData);
            //agregar los datos de la tabla a localStorage
            localStorage.setItem("productos", JSON.stringify(tableData));
            //agregar los datos a la tabla
            tableData.forEach((dato, i) => {
                contentProducts.innerHTML += `
                <div class="col-4">
                    <div class="card" style="width: 18rem;">
                        <a href="#"><img src="${dato.imagen}" class="card-img-top" alt="..."></a>
                        <div class="card-body">
                            <h5 class="card-title">${dato.nombre}</h5>
                            <div class="rating">
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star"></i>
                                <i class="fa fa-star-o"></i>
                            </div>
                            <p class="card-text">$ ${dato.precio}</p>
                            <a href="#" class="btn-product btn btn-primary" onclick="getInfoProduct(${i})">Add Cart</a>
                        </div>
                    </div>
                </div>&nbsp;
                `;
            });
        }
    }catch (error) {
        console.log(error);
    }
};