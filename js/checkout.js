// Función para obtener los datos del formulario y guardarlos en localStorage
function saveFormData() {
    const formData = {
        nombre: document.querySelector('.f-name').value,
        apellido: document.querySelector('.l-name').value,
        email: document.querySelector('.email').value,
        celular: document.querySelector('.phone').value,
        direccion: document.querySelector('.address').value,
        direccion2: document.querySelector('.address2').value,
        notas: document.querySelector('.noe').value
    };

    // Guardar datos del formulario en localStorage
    localStorage.setItem('formData', JSON.stringify(formData));

    return formData;
}

// Función para obtener el resumen de la orden desde localStorage
function getOrderSummary() {
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary'));
    return orderSummary ? orderSummary : null;
}

// Función para cargar los datos del formulario desde localStorage (si existen)
function loadFormData() {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
        document.querySelector('.f-name').value = savedData.nombre;
        document.querySelector('.l-name').value = savedData.apellido;
        document.querySelector('.email').value = savedData.email;
        document.querySelector('.phone').value = savedData.celular;
        document.querySelector('.address').value = savedData.direccion;
        document.querySelector('.address2').value = savedData.direccion2;
        document.querySelector('.noe').value = savedData.notas;
    }
}

let baseTotal = 0; // Variable global para guardar el total original sin aumento

// Función para cargar el resumen de la orden desde localStorage
function loadOrderSummary() {
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary'));

    if (orderSummary) {
        const subtotalElement = document.querySelector(".cart-summary .d-flex:nth-of-type(3) p:nth-of-type(2)");
        const entregaElement = document.querySelector(".cart-summary .d-flex:nth-of-type(1) p:nth-of-type(2)");
        const descuentoElement = document.querySelector(".cart-summary .d-flex:nth-of-type(2) p:nth-of-type(2)");
        const totalElement = document.querySelector(".cart-summary h5:nth-of-type(2)");

        // Verificamos si los elementos existen antes de intentar cambiar su contenido
        if (subtotalElement) {
            subtotalElement.textContent = `$${orderSummary.subtotal}`;
        }
        if (entregaElement) {
            entregaElement.textContent = `$${orderSummary.entrega}`;
        }
        if (descuentoElement) {
            descuentoElement.textContent = `$${orderSummary.descuento}`;
        }
        if (totalElement) {
            totalElement.textContent = `$${orderSummary.total}`;
            baseTotal = parseFloat(orderSummary.total); // Guardar el total base (sin aumento del 5%)
        }
    }
}

// Función para actualizar el total basado en la opción de pago seleccionada
function updateTotalWithPaymentOption() {
    const totalElement = document.querySelector(".cart-summary h5:nth-of-type(2)");

    // Verificar si el elemento existe antes de modificar su contenido
    if (totalElement) {
        let total = baseTotal; // Reiniciar el total al precio base

        // Verificar el método de pago seleccionado
        const paymentMethod = document.querySelector('input[name="radio"]:checked');
        if (paymentMethod && paymentMethod.value === '1') { // Contraentrega seleccionada
            total *= 1.05; // Aumento del 5%
        }

        totalElement.textContent = `$${total.toFixed(2)}`;
        console.log("El total a pagar es: " + total);

        return total; // Retornar el total actualizado
    } else {
        console.log("Elemento 'total' no encontrado en el DOM.");
        return null; // Manejar el caso cuando no se encuentre el total
    }
}

// Añadir un evento para detectar cambios en las opciones de pago
document.querySelectorAll('input[name="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        updateTotalWithPaymentOption();
    });
});

// Función para guardar los datos del formulario y del resumen de la orden en un array dentro del localStorage
function saveOrderData() {
    const formData = saveFormData(); // Obtener datos del formulario
    const orderSummary = getOrderSummary(); // Obtener resumen de la orden

    // Aplicar aumento del 5% si es "Contraentrega"
    const updatedTotal = updateTotalWithPaymentOption();

    // Crear un array que combine ambos
    const combinedData = {
        formData: formData,
        orderSummary: {
            ...orderSummary,
            total: updatedTotal // Actualizar con el total modificado si es necesario
        }
    };

    // Guardar los datos en un array en localStorage
    let allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    allOrders.push(combinedData);
    localStorage.setItem('orders', JSON.stringify(allOrders));
}

// Evento al enviar el formulario y realizar el pedido
document.querySelector('.formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado

    saveOrderData(); // Guardar datos del formulario y del resumen
    console.log("Datos del pedido guardados en localStorage");

    Swal.fire({
        title: '¡Pedido realizado con éxito!',
        text: 'Tu pedido ha sido registrado y los datos han sido guardados.',
        icon: 'success',
        timer: 3000, // Se cerrará en 3 segundos
        showConfirmButton: false, // Quita el botón para que cierre sola
        background: '#f9f9f9', // Cambia el fondo de la alerta
        color: '#000000', // Cambia el color del texto
        iconColor: '#00b410', // Cambia el color del ícono
        padding: '1.5rem', // Ajusta el padding de la alerta
        width: '350px' // Ajusta el tamaño de la alerta
    }).then(() => {
        // Después de mostrar el mensaje, redirigir a la página principal
        window.location.href = 'index.html'; // Reemplaza con la URL de la página principal

        // Limpiar datos del localStorage
        localStorage.removeItem('carrito');
        localStorage.removeItem('orderSummary');
        localStorage.removeItem('formData');

        // Enviar los datos almacenados en 'orders' a la base de datos
        // const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
        // sendOrdersToDatabase(allOrders);

        // Limpiar 'orders' después de enviar a la base de datos
        localStorage.removeItem('orders');
    });
});

// Cargar los datos al cargar la página
window.addEventListener('load', function () {
    loadFormData();
    loadOrderSummary();
    updateTotalWithPaymentOption(); // Asegurar que se muestre el total correcto
});


// Función para enviar los datos de 'orders' a la base de datos usando fetch
// function sendOrdersToDatabase(orders) {
//     // Reemplaza 'your-server-endpoint' con la URL de tu endpoint en el servidor
//     fetch('https://your-server-endpoint.com/api/saveOrders', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ orders: orders })
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Error en la respuesta del servidor');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Datos enviados a la base de datos:', data);
//     })
//     .catch(error => {
//         console.error('Error al enviar los datos a la base de datos:', error);
//     });
// }
