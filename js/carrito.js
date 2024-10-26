// Función para cargar los productos en el carrito
function loadCartItems() {
    let cartData = JSON.parse(localStorage.getItem('carrito')) || [];
    let cartTableBody = document.querySelector('.cart-table tbody');
    
    cartData.forEach(item => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td class="product-block">
                <a href="#" class="remove-from-cart-btn"><i class="fa-solid fa-x"></i></a>
                <img src="${item.imagen}" alt="">
                <a href="product-detail.html" class="h5">${item.nombre}</a>
            </td>
            <td>
                <p class="lead color-black">$ ${item.precio}</p>
            </td>
            <td></td>
            <td>
                <div class="quantity quantity-wrap">
                    <div class="decrement">
                        <i class="fa-solid fa-minus"></i>
                    </div>
                    <input type="text" name="quantity" value="1" maxlength="2" size="1" class="number">
                    <div class="increment">
                        <i class="fa-solid fa-plus"></i>
                    </div>
                </div>
            </td>
            <td>
                <h6>$${item.precio}</h6> <!-- Subtotal inicial por producto -->
            </td>
        `;
        cartTableBody.appendChild(row);
    });

    // Asignamos los oyentes de eventos a los botones
    addEventListeners();

    // Actualizamos el total del carrito tan pronto como se cargan los productos
    updateCartTotal();
}

// Función para agregar los detectores de eventos a los botones después de generar el DOM
function addEventListeners() {
    let removeButtons = document.querySelectorAll(".remove-from-cart-btn");
    let btnDecrement = document.querySelectorAll(".decrement i");
    let btnIncrement = document.querySelectorAll(".increment i");
    let countProduct = document.querySelectorAll(".quantity input.number");

    // Función para manejar el incremento de la cantidad
    btnIncrement.forEach((btnI, pos) => {
        btnI.addEventListener('click', () => {
            let currentValue = parseInt(countProduct[pos].value);
            countProduct[pos].value = currentValue + 1;
            updateCartTotal(); // Actualiza el total del carrito después de cambiar la cantidad
        });
    });

    // Función para manejar el decremento de la cantidad
    btnDecrement.forEach((btnD, pos) => {
        btnD.addEventListener('click', () => {
            let currentValue = parseInt(countProduct[pos].value);
            if (currentValue > 1) {
                countProduct[pos].value = currentValue - 1;
                updateCartTotal(); // Actualiza el total del carrito después de cambiar la cantidad
            }
        });
    });

    // Función para manejar la eliminación de productos
    removeButtons.forEach((btn, index) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            let productRow = btn.closest("tr");
            productRow.remove();

            // Actualizar carrito en localStorage
            let cartData = JSON.parse(localStorage.getItem('carrito')) || [];
            cartData.splice(index, 1); // Elimina el producto del array
            localStorage.setItem('carrito', JSON.stringify(cartData)); // Actualiza el localStorage

            updateCartTotal(); // Actualiza el total del carrito después de eliminar un producto
        });
    });

    // Añadir evento al botón "Ir a Pagar"
    let payButton = document.querySelector('#pay-button');
    if (payButton) {
        payButton.addEventListener('click', () => {
            saveOrderSummaryToLocalStorage();
        });
    }
}

// Función para actualizar el total del carrito
function updateCartTotal() {
    let subtotal = 0;
    let rows = document.querySelectorAll(".cart-table tbody tr");

    rows.forEach((row) => {
        let priceElement = row.querySelector("td:nth-child(2) p");
        let quantityElement = row.querySelector(".quantity input.number");
        let totalElement = row.querySelector("td:nth-child(5) h6");

        if (priceElement && quantityElement && totalElement) {
            let precio = parseFloat(priceElement.textContent.replace('$', ''));
            let quantity = parseInt(quantityElement.value);
            let rowSubtotal = precio * quantity;

            // Actualiza el subtotal en la fila
            totalElement.textContent = `$${rowSubtotal.toFixed(2)}`;
            subtotal += rowSubtotal;
        }
    });

    // Obtener el valor del envío y el descuento
    const deliveryElement = document.getElementById("delivery");
    const discountElement = document.getElementById("discount");
    const totalElement = document.getElementById("total");

    let deliveryValue = parseFloat(deliveryElement ? deliveryElement.textContent.replace('$', '') : '10000');
    let discount = parseFloat(discountElement ? discountElement.textContent.replace('$', '') : '5500');

    // Calcular el total
    let total = subtotal + deliveryValue - discount;
    console.log("El total es: " + total);

    // Actualizar el subtotal y total en el HTML
    document.querySelector(".cart-summary .d-flex:nth-of-type(1) p:nth-of-type(2)").textContent = `$${subtotal.toFixed(2)}`;
    if (totalElement) {
        totalElement.textContent = `$${total.toFixed(2)}`;
    }

    // Guardar el resumen de la orden en localStorage
    const orderSummary = {
        subtotal: subtotal.toFixed(2),
        entrega: deliveryValue.toFixed(2),
        descuento: discount.toFixed(2),
        total: total.toFixed(2)
    };
    localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
}

// Función para guardar el resumen de la orden en localStorage cuando el usuario haga clic en el botón "Ir a Pagar"
function saveOrderSummaryToLocalStorage() {
    updateCartTotal(); // Asegurarse de que el resumen esté actualizado
    let cartData = JSON.parse(localStorage.getItem('carrito')) || [];
    const orderSummary = {
        carrito: cartData,
        subtotal: document.querySelector(".cart-summary .d-flex:nth-of-type(1) p:nth-of-type(2)").textContent.replace('$', ''),
        entrega: document.querySelector(".cart-summary .d-flex:nth-of-type(2) p:nth-of-type(2)").textContent.replace('$', ''),
        descuento: document.querySelector(".cart-summary .d-flex:nth-of-type(3) p:nth-of-type(2)").textContent.replace('$', ''),
        total: document.querySelector(".cart-summary  h5:nth-of-type(2)").textContent.replace('$', '')
    };
    localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
}

// Función para cargar el resumen del pedido desde el localStorage
function loadOrderSummary() {
    const storedSummary = JSON.parse(localStorage.getItem('orderSummary'));

    if (storedSummary) {
        // Mostrar los valores guardados en el HTML
        document.querySelector(".cart-summary .d-flex:nth-of-type(1) p:nth-of-type(2)").textContent = `$${storedSummary.subtotal}`;
        document.querySelector(".cart-summary .d-flex:nth-of-type(2) p:nth-of-type(2)").textContent = `$${storedSummary.entrega}`;
        document.querySelector(".cart-summary .d-flex:nth-of-type(3) p:nth-of-type(2)").textContent = `$${storedSummary.descuento}`;
        document.querySelector(".cart-summary  h5:nth-of-type(2)").textContent = `$${storedSummary.total}`;
    } else {
        // Si no hay resumen guardado, calcular y guardar
        updateCartTotal();
    }
}

// Llamar a las funciones al cargar la página
loadCartItems();
loadOrderSummary();
