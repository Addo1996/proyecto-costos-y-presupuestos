let ingredientesRecetaActual = [];
// ============================================
// RECETAS ESTANDARIZADAS
// ============================================

const recetasEstandarizadas = [


    {
        nombre: "Hamburguesa Clásica",
        imagen: "img/hamburguesaClasica.png",

        ingredientes: [
            { nombre: "Pan hamburguesa", cantidad: 1, unidad: "u" },
            { nombre: "Carne molida", cantidad: 250, unidad: "gr" },
            { nombre: "Queso cheddar", cantidad: 1, unidad: "u" },
            { nombre: "Lechuga", cantidad: 20, unidad: "gr" },
            { nombre: "Salsa de tomate", cantidad: 15, unidad: "ml" }
        ],
        extras: [
            { nombre: "Carne extra", precio: 1.50, imagen: "img/extras/carne.png" },
            { nombre: "Queso extra", precio: 0.50, imagen: "img/extras/queso.png" },
            { nombre: "Tocino", precio: 1.00, imagen: "img/extras/tocino.png" }
        ],

        tiempoPreparacion: 10,
        porciones: 1,
    },

    {
        nombre: "Big Burger",
        imagen: "img/bigBurger.png",
        ingredientes: [
            { nombre: "Pan hamburguesa", cantidad: 1, unidad: "u" },
            { nombre: "Carne molida", cantidad: 500, unidad: "gr" },
            { nombre: "Queso cheddar", cantidad: 2, unidad: "u" },
            { nombre: "Lechuga", cantidad: 20, unidad: "gr" },
            { nombre: "Tomate", cantidad: 30, unidad: "gr" }
        ],
        extras: [
            { nombre: "Carne extra", precio: 1.50, imagen: "img/extras/carne.png" },
            { nombre: "Queso extra", precio: 0.50, imagen: "img/extras/queso.png" },
            { nombre: "Tocino", precio: 1.00, imagen: "img/extras/tocino.png" }
        ],

        tiempoPreparacion: 15,
        porciones: 1,
    },

    {
        nombre: "Salchipapa Especial",
        imagen: "img/salchipapaEspecial.png",
        ingredientes: [
            { nombre: "Papa", cantidad: 250, unidad: "gr" },
            { nombre: "Salchicha", cantidad: 2, unidad: "u" },
            { nombre: "Mayonesa", cantidad: 15, unidad: "ml" },
            { nombre: "Salsa de tomate", cantidad: 15, unidad: "ml" }
        ],
        extras: [
            { nombre: "Salchicha extra", precio: 1.25, imagen: "img/extras/salchicha.png" },
            { nombre: "Queso extra", precio: 0.50, imagen: "img/extras/queso.png" },
            { nombre: "Salsa extra", precio: 0.25, imagen: "img/extras/salsa.png" }
        ],

        tiempoPreparacion: 12,
        porciones: 1,
    },

    {
        nombre: "Hot Dog Especial",
        imagen: "img/hotDogEspecial.png",
        ingredientes: [
            { nombre: "Pan hot dog", cantidad: 1, unidad: "u" },
            { nombre: "Salchicha", cantidad: 1, unidad: "u" },
            { nombre: "Cebolla", cantidad: 15, unidad: "gr" },
            { nombre: "Repollo", cantidad: 20, unidad: "gr" },
            { nombre: "Mayonesa", cantidad: 10, unidad: "ml" },
            { nombre: "Mostaza", cantidad: 10, unidad: "ml" }
        ],
        extras: [
            { nombre: "Salchicha extra", precio: 1.25, imagen: "img/extras/salchicha.png" },
            { nombre: "Queso extra", precio: 0.50, imagen: "img/extras/queso.png" },
            { nombre: "Salsa extra", precio: 0.25, imagen: "img/extras/salsa.png" }
        ],

        tiempoPreparacion: 8,
        porciones: 1,
    },

    {
        nombre: "Nuggets con Papas",
        imagen: "img/nuggetsPapas.png",
        ingredientes: [
            { nombre: "Nuggets", cantidad: 6, unidad: "u" },
            { nombre: "Papa", cantidad: 200, unidad: "gr" },
            { nombre: "Aceite", cantidad: 30, unidad: "ml" },
            { nombre: "Salsa de tomate", cantidad: 15, unidad: "ml" }
        ],
        extras: [
            { nombre: "Salchicha extra", precio: 1.25, imagen: "img/extras/salchicha.png" },
            { nombre: "Queso extra", precio: 0.50, imagen: "img/extras/queso.png" },
            { nombre: "Salsa extra", precio: 0.25, imagen: "img/extras/salsa.png" }
        ],

        tiempoPreparacion: 10,
        porciones: 1,
    }

];
//======================
// COMPRAS Y CARRITO
//======================
let carrito = [];

function agregarRecetaAlCarrito() {
    const selector = document.getElementById("selectorReceta");

    if (selector.value === "") {
        alert("Seleccione una receta");
        return;
    }

    let receta;

    if (selector.value.startsWith("P-")) {

        const nombre =
            selector.value.replace("P-", "");

        const recetasPersonalizadas =
            JSON.parse(
                localStorage.getItem("recetasPersonalizadas")
            ) || [];

        receta =
            recetasPersonalizadas.find(r => r.nombre === nombre);

    } else {

        receta =
            recetasEstandarizadas[selector.value];

    }

    if (!receta) {
        alert("No se encontró la receta seleccionada.");
        return;
    }

    // 1. Recalcular el costo total de producción exacto como en el detalle
    let ingredientesQuitados = [];

    const checksQuitar =
        document.querySelectorAll(".quitar-checkbox");

    checksQuitar.forEach(function (q) {

        if (q.checked) {
            ingredientesQuitados.push(q.dataset.nombre);
        }

    });

    let costoBase = 0;

    receta.ingredientes.forEach(function (ingrediente) {

        if (!ingredientesQuitados.includes(ingrediente.nombre)) {

            costoBase += calcularCostoIngrediente(
                ingrediente.nombre,
                ingrediente.cantidad,
                ingrediente.unidad
            );

        }

    });

    let totalManoObra = 0;
    if (typeof listaGastosOperativos !== "undefined") {
        listaGastosOperativos.forEach(function (gasto) {
            if (gasto.tipo === "manodeobra") totalManoObra += gasto.monto;
        });
    }
    const costoManoObraReceta = totalManoObra / 1080;

    let totalCostosIndirectos = 0;
    if (typeof listaGastosOperativos !== "undefined") {
        listaGastosOperativos.forEach(function (gasto) {
            if (gasto.tipo === "fijo") totalCostosIndirectos += gasto.monto;
        });
    }
    const costoIndirectoReceta = totalCostosIndirectos / 1080;

    const costoProduccionTotal = costoBase + costoManoObraReceta + costoIndirectoReceta;
    const margenGanancia = 30;
    let precioSugerido = costoProduccionTotal / (1 - margenGanancia / 100);

    // 2. Sumar los extras que estén seleccionados en el HTML actual
    let totalExtras = 0;
    const checks = document.querySelectorAll(".extra-checkbox");
    checks.forEach(function (c) {
        if (c.checked) {
            totalExtras += parseFloat(c.dataset.precio);
        }
    });

    // El precio final de venta de este artículo
    let precioFinalVenta = precioSugerido + totalExtras;

    // buscar si ya existe con el mismo precio (por si se añade con/sin extras diferentes)
    let existente = carrito.find(item => item.nombre === receta.nombre && item.precio.toFixed(2) === precioFinalVenta.toFixed(2));

    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({
            nombre: receta.nombre +
                (ingredientesQuitados.length > 0
                    ? " sin " + ingredientesQuitados.join(", ")
                    : ""),
            precio: precioFinalVenta, // ¡Ahora sí guarda el precio de venta sugerido + extras!
            cantidad: 1
        });
    }

    // Desmarcar los checkboxes para una nueva compra
    checks.forEach(c => c.checked = false);
    if (document.getElementById("costoExtras")) document.getElementById("costoExtras").textContent = "0.00";
    if (document.getElementById("costoTotalReceta")) document.getElementById("costoTotalReceta").textContent = costoBase.toFixed(2);

    mostrarCarrito();
}

//===================================
// MOSTRAR CARRITO DE PEDIDOS
//===================================
function mostrarCarrito() {
    const contenedor = document.getElementById("carrito");

    if (!contenedor) return;

    contenedor.innerHTML = "<h3>🛒 Carrito de pedidos</h3>";

    let total = 0;

    carrito.forEach((item, indice) => {
        let subtotal = item.precio * item.cantidad;
        total += subtotal;

        contenedor.innerHTML += `
            <div class="carrito-item">
                <span class="carrito-info">
                    <strong>${item.nombre}</strong> x${item.cantidad} - $${subtotal.toFixed(2)} 
                    <small>($${item.precio.toFixed(2)} c/u)</small>
                </span>
                <button onclick="eliminarDelCarrito(${indice})" class="btn-borrar">
                    ❌
                </button>
            </div>
        `;
    });

    contenedor.innerHTML += `
        <hr>
        <h4 class="carrito-total">Total a Pagar: $${total.toFixed(2)}</h4>
        <button onclick="finalizarCompra()" class="btn-finalizar">
            ✅ Finalizar Compra
        </button>
    `;
}

//===================================
// FUNCIÓN PARA ELIMINAR UN ITEM DEL CARRITO
//===================================
function eliminarDelCarrito(indice) {
    // Eliminamos 1 elemento en la posición 'indice' del array
    carrito.splice(indice, 1);

    // Volvemos a renderizar el carrito actualizado en pantalla
    mostrarCarrito();
}
const costosExtras = {
    "Carne extra": 1.50,
    "Queso extra": 0.50,
    "Tocino": 1.00,
    "Salchicha extra": 1.25,
    "Salsa extra": 0.25
};


// ============================================
// MOSTRAR SUBSECCIONES DE RECETAS
// ============================================

function mostrarSubReceta(idSubReceta) {

    let subrecetas =
        document.querySelectorAll(".subreceta");

    subrecetas.forEach(function (sub) {

        sub.style.display = "none";

    });

    document.getElementById(idSubReceta)
        .style.display = "block";

}

// ============================================
// CARGAR RECETAS EN EL SELECT
// ============================================

function cargarRecetasEstandarizadas() {

    let selector =
        document.getElementById("selectorReceta");

    if (!selector) return;

    selector.innerHTML = `
        <option value="">
            Seleccione una receta
        </option>
    `;

    // Recetas originales
    recetasEstandarizadas.forEach(function (receta, indice) {

        selector.innerHTML += `
            <option value="${indice}">
                ${receta.nombre}
            </option>
        `;

    });

    // Recetas creadas por el usuario
    let recetasPersonalizadas =
        JSON.parse(
            localStorage.getItem("recetasPersonalizadas")
        ) || [];

    recetasPersonalizadas.forEach(function (receta) {

        selector.innerHTML += `
            <option value="P-${receta.nombre}">
                ⭐ ${receta.nombre}
            </option>
        `;

    });

}
// ============================================
// MOSTRAR DETALLE DE LA RECETA
// ============================================

function mostrarDetalleReceta() {

    const selector =
        document.getElementById("selectorReceta");

    const detalle =
        document.getElementById("detalleReceta");

    const indice =
        selector.value;

    if (indice === "") {

        detalle.innerHTML = "";

        return;
    }

    let receta;

    if (indice.startsWith("P-")) {

        const nombre =
            indice.replace("P-", "");

        const recetasPersonalizadas =
            JSON.parse(
                localStorage.getItem("recetasPersonalizadas")
            ) || [];

        receta =
            recetasPersonalizadas.find(r => r.nombre === nombre);

    } else {

        receta =
            recetasEstandarizadas[indice];

    }

    let costoBase = 0;

    receta.ingredientes.forEach(function (ingrediente) {

        costoBase += calcularCostoIngrediente(

            ingrediente.nombre,

            ingrediente.cantidad,

            ingrediente.unidad

        );
    });
    const costoPorPorcion =
        costoBase / receta.porciones;

    // =====================================
    // MANO DE OBRA POR RECETA
    // =====================================

    let totalManoObra = 0;

    if (typeof listaGastosOperativos !== "undefined") {

        listaGastosOperativos.forEach(function (gasto) {

            if (gasto.tipo === "manodeobra") {

                totalManoObra += gasto.monto;

            }

        });

    }

    // 1080 ventas proyectadas mensuales
    const costoManoObraReceta =
        totalManoObra / 1080;
    // =====================================
    // COSTOS INDIRECTOS
    // =====================================

    let totalCostosIndirectos = 0;

    if (typeof listaGastosOperativos !== "undefined") {

        listaGastosOperativos.forEach(function (gasto) {

            if (gasto.tipo === "fijo") {

                totalCostosIndirectos += gasto.monto;

            }

        });

    }

    const costoIndirectoReceta =
        totalCostosIndirectos / 1080;

    const costoProduccionTotal = costoBase + costoManoObraReceta + costoIndirectoReceta;
    // =====================================
    // PRECIO SUGERIDO Y MARGEN
    // =====================================

    const margenGanancia = 30;

    const precioSugerido = costoProduccionTotal / (1 - margenGanancia / 100);

    let html = `
    
    <h3>🍽️ ${receta.nombre}</h3>
    <img src="${receta.imagen}" alt="${receta.nombre}" class="imagen-receta" style="margin-bottom: 20px;">
    
    <div class="grid-casillas-receta">
        <div class="casilla-info">
            <span class="etiqueta">⏱️ Tiempo</span>
            <span class="valor">${receta.tiempoPreparacion} min</span>
        </div>
        <div class="casilla-info">
            <span class="etiqueta">🍽️ Porciones</span>
            <span class="valor">${receta.porciones}</span>
        </div>
        <div class="casilla-info">
            <span class="etiqueta">📦 C. Materia Prima</span>
            <span class="valor">$${costoBase.toFixed(2)}</span>
        </div>
        <div class="casilla-info">
            <span class="etiqueta">🍕 Costo x Porción</span>
            <span class="valor">$${costoPorPorcion.toFixed(2)}</span>
        </div>
        <div class="casilla-info">
            <span class="etiqueta">👨‍🍳 Mano de Obra</span>
            <span class="valor">$${costoManoObraReceta.toFixed(2)}</span>
        </div>
        <div class="casilla-info">
            <span class="etiqueta">⚙️ C. Indirectos</span>
            <span class="valor">$${costoIndirectoReceta.toFixed(2)}</span>
        </div>
        <div class="casilla-info destacada-naranja">
            <span class="etiqueta">💰 C. Producción Total</span>
            <span class="valor">$${costoProduccionTotal.toFixed(2)}</span>
        </div>
        <div class="casilla-info destacada-verde">
            <span class="etiqueta">🏷️ Precio Sugerido</span>
            <span class="valor">$${precioSugerido.toFixed(2)}</span>
        </div>
        <div class="casilla-info">
            <span class="etiqueta">📈 Margen</span>
            <span class="valor">${margenGanancia}%</span>
        </div>
    </div>

    <h4 class="titulo-ficha" style="margin-top: 25px;">
        📋 Ficha Técnica de Ingredientes
    </h4>

    <table class="tabla-ingredientes-receta">
        <thead>
            <tr>
                <th>Ingrediente</th>
                <th>Cantidad</th>
                <th>Unidad</th>
            </tr>
        </thead>
        <tbody>
    `;

    receta.ingredientes.forEach(function (ingrediente) {

        html += `
            <tr>
                <td>${ingrediente.nombre}</td>
                <td>${ingrediente.cantidad}</td>
                <td>${ingrediente.unidad}</td>
            </tr>
        `;

    });
    html += `
        </tbody>
    </table>

    <h4>🚫 Quitar Ingredientes:</h4>

    <div class="quitar-ingredientes">
`;

    receta.ingredientes.forEach(function (ingrediente) {

        html += `
        <label class="quitar-item">
            <input
                type="checkbox"
                class="quitar-checkbox"
                data-nombre="${ingrediente.nombre}"
                data-cantidad="${ingrediente.cantidad}"
                data-unidad="${ingrediente.unidad}"
            >
            Sin ${ingrediente.nombre}
        </label>
    `;

    });

    html += `
    </div>

    <h4>➕ Extras Disponibles:</h4>

    <div class="extras-receta">
`;
    receta.extras.forEach(function (extra) {

        html += `
        <label class="extra-item">

    <img src="${extra.imagen}"
         alt="${extra.nombre}"
         class="imagen-extra">

    <div class="extra-info">

        <span>${extra.nombre}</span>

        <small>$${extra.precio.toFixed(2)}</small>

    </div>

    <input
        type="checkbox"
        class="extra-checkbox"
        data-nombre="${extra.nombre}"
        data-precio="${extra.precio}"
    >

</label>
    `;

    });
    html += `
        </div>

        <hr>

        <h4>
            💰 Costo Extras:
            $<span id="costoExtras">0.00</span>
        </h4>

        <h4>
            💵 Costo Total:
           $<span id="costoTotalReceta">${costoBase.toFixed(2)}</span>
        </h4>

        <div class="resumen-financiero-receta">

            <p>
                💵 <strong>Precio Sugerido:</strong>
                $${precioSugerido.toFixed(2)}
            </p>

            <p>
                📈 <strong>Margen de Ganancia:</strong>
                ${margenGanancia}%
            </p>

        </div>
`;
    html += `
    <button onclick="agregarRecetaAlCarrito()">
        🛒 Comprar
    </button>
`;
    detalle.innerHTML = html;
    actualizarCostoExtras();
}

// ============================================
// CALCULAR COSTO DE EXTRAS
// ============================================

function actualizarCostoExtras() {

    const checksExtras =
        document.querySelectorAll(".extra-checkbox");

    const checksQuitar =
        document.querySelectorAll(".quitar-checkbox");

    function recalcularTotal() {

        let totalExtras = 0;

        checksExtras.forEach(function(c){

            if (c.checked) {
                totalExtras += parseFloat(c.dataset.precio);
            }

        });

        // Importante:
        // El precio base se mantiene igual aunque se quite un ingrediente.
        // Solo aumentan los extras.
        const selector =
            document.getElementById("selectorReceta");

        let receta;

        if (selector.value.startsWith("P-")) {

            const nombre =
                selector.value.replace("P-", "");

            const recetasPersonalizadas =
                JSON.parse(
                    localStorage.getItem("recetasPersonalizadas")
                ) || [];

            receta =
                recetasPersonalizadas.find(r => r.nombre === nombre);

        } else {

            receta =
                recetasEstandarizadas[selector.value];

        }

        let costoBase = 0;

        receta.ingredientes.forEach(function(ingrediente){

            costoBase += calcularCostoIngrediente(
                ingrediente.nombre,
                ingrediente.cantidad,
                ingrediente.unidad
            );

        });

        let total = costoBase + totalExtras;

        document.getElementById("costoExtras").textContent =
            totalExtras.toFixed(2);

        document.getElementById("costoTotalReceta").textContent =
            total.toFixed(2);
    }

    checksExtras.forEach(function(check){
        check.onchange = recalcularTotal;
    });

    checksQuitar.forEach(function(check){
        check.onchange = recalcularTotal;
    });

}

// ============================================
// OBTENER COSTO DE UN INGREDIENTE
// ============================================

function calcularCostoIngrediente(nombreIngrediente,
    cantidadUsada,
    unidadReceta) {

    const ingrediente =
        materiasPrimas.find(mp =>
            mp.nombre.toLowerCase() ===
            nombreIngrediente.toLowerCase()
        );

    if (!ingrediente) {

        console.warn(
            "No se encontró:",
            nombreIngrediente
        );

        return 0;
    }

    let cantidadCompra =
        ingrediente.cantidad;

    let precioCompra =
        ingrediente.precio;

    let merma =
        ingrediente.merma;

    let unidadCompra =
        ingrediente.unidad;

    // Aplicar merma
    let cantidadUtil =
        cantidadCompra *
        (1 - merma / 100);

    // Convertir unidades
    let cantidadUsadaConvertida =
        convertirUnidad(
            cantidadUsada,
            unidadReceta,
            unidadCompra
        );

    // Costo unitario
    let costoUnitario =
        precioCompra /
        cantidadUtil;

    const costo =
        costoUnitario *
        cantidadUsadaConvertida;

    console.log(
        "Ingrediente:",
        nombreIngrediente,
        "| Compra:",
        cantidadCompra,
        unidadCompra,
        "| Precio:", precioCompra,
        "| Merma:", merma,
        "| Usa:", cantidadUsada,
        unidadReceta,
        "| Convertido:", cantidadUsadaConvertida,
        "| Costo:", costo.toFixed(2)
    );

    return costo;
}

// ============================================
// CONVERTIR UNIDADES
// ============================================

function convertirUnidad(cantidad, unidadReceta, unidadCompra) {

    unidadReceta = unidadReceta.toLowerCase();
    unidadCompra = unidadCompra.toLowerCase();

    if (unidadReceta === unidadCompra) {
        return cantidad;
    }

    if (unidadReceta === "u" && unidadCompra === "unidades") {
        return cantidad;
    }

    if (unidadReceta === "unidades" && unidadCompra === "u") {
        return cantidad;
    }

    if ((unidadReceta === "gr" || unidadReceta === "g") &&
        unidadCompra === "kilogramos") {
        return (cantidad / 1000);
    }

    if ((unidadReceta === "gr" || unidadReceta === "g") &&
        unidadCompra === "kg") {
        return (cantidad / 1000);
    }

    if (unidadReceta === "kilogramos" &&
        (unidadCompra === "gr" || unidadCompra === "g")) {
        return (cantidad * 1000);
    }

    if ((unidadReceta === "gr" || unidadReceta === "g") &&
        unidadCompra === "libras") {
        return cantidad / 453.592;
    }

    if (unidadReceta === "libras" &&
        (unidadCompra === "gr" || unidadCompra === "g")) {
        return cantidad * 453.592;
    }

    if (unidadReceta === "kilogramos" &&
        unidadCompra === "libras") {
        return cantidad * 2.20462;
    }

    if (unidadReceta === "libras" &&
        unidadCompra === "kilogramos") {
        return cantidad / 2.20462;
    }

    if (unidadReceta === "ml" && unidadCompra === "litros") {
        return cantidad / 1000;
    }

    if (unidadReceta === "litros" && unidadCompra === "ml") {
        return cantidad * 1000;
    }

    console.warn(
        `No existe conversión entre ${unidadReceta} y ${unidadCompra}`
    );

    return cantidad;
}

//===================================
// FUNCIÓN PARA FINALIZAR LA COMPRA
//===================================
function finalizarCompra() {
    // Si el carrito está vacío, no permitimos finalizar
    if (carrito.length === 0) {
        alert("El carrito está vacío. Agrega una receta antes de finalizar.");
        return;
    }

    let total = 0;
    carrito.forEach(item => {
        total += item.precio * item.cantidad;
    });

    // Mensaje de éxito para el usuario
    alert(`¡Pedido procesado con éxito!\nTotal de la venta: $${total.toFixed(2)}\n¡Gracias por tu compra en FastFood Express!`);

    // Limpiamos el array del carrito para dejarlo vacío
    carrito = [];

    // Actualizamos la interfaz para que vuelva a mostrar el carrito limpio
    mostrarCarrito();
}
//=========================================================================================
// Funcion para cargar los ingredientes de la receta a un slect en el HTML, si es necesario
//=========================================================================================
function cargarIngredientesReceta() {

    const selector =
        document.getElementById(
            "ingredienteReceta"
        );

    if (!selector) return;

    selector.innerHTML = "";

    materiasPrimas.forEach(function (mp) {

        selector.innerHTML += `
            <option value="${mp.nombre}">
                ${mp.nombre}
            </option>
        `;

    });

}
// Funcion para agregar un ingrediente a la receta actual
function agregarIngredienteReceta() {

    const nombre =
        document.getElementById("ingredienteReceta").value;

    const cantidad =
        parseFloat(
            document.getElementById("cantidadIngredienteReceta").value
        );

    const unidad =
        document.getElementById("unidadIngredienteReceta").value;

    if (nombre === "" || isNaN(cantidad)) {
        alert("Seleccione un ingrediente e ingrese cantidad.");
        return;
    }

    ingredientesRecetaActual.push({
        nombre: nombre,
        cantidad: cantidad,
        unidad: unidad
    });

    document.getElementById("cantidadIngredienteReceta").value = "";

    actualizarListaIngredientesReceta();
}

function actualizarListaIngredientesReceta() {

    const contenedor =
        document.getElementById("listaIngredientesReceta");

    if (!contenedor) return;

    contenedor.innerHTML = "";

    ingredientesRecetaActual.forEach(function (ing, index) {

        contenedor.innerHTML += `
            <p>
                ${ing.nombre} - ${ing.cantidad} ${ing.unidad}
                <button type="button" onclick="eliminarIngredienteReceta(${index})">
                    ❌
                </button>
            </p>
        `;

    });

}
function eliminarIngredienteReceta(index) {

    ingredientesRecetaActual.splice(index, 1);

    actualizarListaIngredientesReceta();
}

// ======================================
// CREAR RECETA PERSONALIZADA
// ======================================

function crearReceta() {

    const nombre =
        document.getElementById(
            "nombreReceta"
        ).value.trim();

    const tiempo =
        parseInt(
            document.getElementById(
                "tiempoPreparacion"
            ).value
        );

    const porciones =
        parseInt(
            document.getElementById(
                "porciones"
            ).value
        );
    const imagenIngresada =
        document.getElementById("imagenReceta").value.trim();

    if (
        nombre === "" ||
        isNaN(tiempo) ||
        isNaN(porciones)
    ) {

        alert("Complete todos los campos");

        return;
    }

    if (
        ingredientesRecetaActual.length === 0
    ) {

        alert(
            "Agregue ingredientes a la receta"
        );

        return;
    }

    let recetasPersonalizadas =
        JSON.parse(
            localStorage.getItem(
                "recetasPersonalizadas"
            )
        ) || [];

    recetasPersonalizadas.push({

        nombre: nombre,

        tiempoPreparacion: tiempo,

        porciones: porciones,

        ingredientes:
            structuredClone(ingredientesRecetaActual),

        extras: [],

        imagen: imagenIngresada === ""
            ? "img/recetaPersonalizada.png"
            : "img/" + imagenIngresada

    });

    localStorage.setItem(

        "recetasPersonalizadas",

        JSON.stringify(
            recetasPersonalizadas
        )

    );
    cargarRecetasEstandarizadas();
    actualizarTablaRecetas();
    if (typeof calcularConsolidadoFinanciero === "function") {
        calcularConsolidadoFinanciero();
    }
    alert(
        "Receta creada correctamente"
    );

    ingredientesRecetaActual = [];

    actualizarListaIngredientesReceta();

    document.getElementById(
        "nombreReceta"
    ).value = "";

    document.getElementById(
        "tiempoPreparacion"
    ).value = "";

    document.getElementById(
        "porciones"
    ).value = "";
    document.getElementById(
        "imagenReceta"
    ).value = "";

}

function actualizarTablaRecetas() {

    const tabla =
        document.getElementById("tablaRecetas");

    if (!tabla) return;

    tabla.innerHTML = "";

    const recetasPersonalizadas =
        JSON.parse(
            localStorage.getItem("recetasPersonalizadas")
        ) || [];

    recetasPersonalizadas.forEach(function (receta, index) {

        tabla.innerHTML += `
            <tr>
                <td>${receta.nombre}</td>
                <td>${receta.tiempoPreparacion} min</td>
                <td>${receta.porciones}</td>
                <td>
                    <button type="button" onclick="editarRecetaPersonalizada(${index})">
                        ✏️ Editar
                    </button>

                    <button type="button" onclick="eliminarRecetaPersonalizada(${index})">
                        🗑️ Borrar
                    </button>
                </td>
            </tr>
        `;

    });

}
function eliminarRecetaPersonalizada(index) {

    let recetasPersonalizadas =
        JSON.parse(
            localStorage.getItem("recetasPersonalizadas")
        ) || [];

    if (!confirm("¿Desea borrar esta receta?")) {
        return;
    }

    recetasPersonalizadas.splice(index, 1);

    localStorage.setItem(
        "recetasPersonalizadas",
        JSON.stringify(recetasPersonalizadas)
    );

    actualizarTablaRecetas();
    cargarRecetasEstandarizadas();

    alert("Receta eliminada correctamente.");
}
function editarRecetaPersonalizada(index) {

    let recetasPersonalizadas =
        JSON.parse(
            localStorage.getItem("recetasPersonalizadas")
        ) || [];

    const receta =
        recetasPersonalizadas[index];

    document.getElementById("nombreReceta").value =
        receta.nombre;

    document.getElementById("tiempoPreparacion").value =
        receta.tiempoPreparacion;

    document.getElementById("porciones").value =
        receta.porciones;
    document.getElementById("imagenReceta").value =
        receta.imagen.replace("img/", "");

    ingredientesRecetaActual =
        receta.ingredientes;

    actualizarListaIngredientesReceta();

    recetasPersonalizadas.splice(index, 1);

    localStorage.setItem(
        "recetasPersonalizadas",
        JSON.stringify(recetasPersonalizadas)
    );

    actualizarTablaRecetas();
    cargarRecetasEstandarizadas();
    if (typeof calcularConsolidadoFinanciero === "function") {
        calcularConsolidadoFinanciero();
    }

    alert("Modifique la receta y presione Crear Receta para guardar los cambios.");
}
// ============================================
// DOM CONTENT LOADED - CARGAR RECETAS EN EL SELECT
// ============================================
document.addEventListener("DOMContentLoaded", function () {

    cargarRecetasEstandarizadas();
    cargarIngredientesReceta();
    actualizarTablaRecetas();

});

