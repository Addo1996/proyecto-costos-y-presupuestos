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

    const receta = recetasEstandarizadas[selector.value];

    // 1. Recalcular el costo total de producción exacto como en el detalle
    let costoBase = 0;
    receta.ingredientes.forEach(function (ingrediente) {
        costoBase += calcularCostoIngrediente(ingrediente.nombre, ingrediente.cantidad, ingrediente.unidad);
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
            nombre: receta.nombre,
            precio: precioFinalVenta, // ¡Ahora sí guarda el precio de venta sugerido + extras!
            cantidad: 1
        });
    }

    // Desmarcar los checkboxes para una nueva compra
    checks.forEach(c => c.checked = false);
    if(document.getElementById("costoExtras")) document.getElementById("costoExtras").textContent = "0.00";
    if(document.getElementById("costoTotalReceta")) document.getElementById("costoTotalReceta").textContent = costoBase.toFixed(2);

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

    // Si el selector no existe, salimos
    if (!selector) return;

    // Limpiar opciones
    selector.innerHTML = `
        <option value="">
            Seleccione una receta
        </option>
    `;

    // Agregar cada receta
    recetasEstandarizadas.forEach(function (receta, indice) {

        selector.innerHTML += `
            <option value="${indice}">
                ${receta.nombre}
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

    const receta =
        recetasEstandarizadas[indice];

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
    <img src="${receta.imagen}"alt="${receta.nombre}"class="imagen-receta">
    <p><strong>Tiempo de preparación:</strong>
    ${receta.tiempoPreparacion} minutos</p>

    <p><strong>Porciones:</strong>
    ${receta.porciones}</p>

   <p>
    <strong>Costo Materia Prima:</strong>
    $${costoBase.toFixed(2)}
</p>

<p>
    <strong>Costo por Porción:</strong>
    $${costoPorPorcion.toFixed(2)}
</p>
<p>
    <strong>Costo Mano de Obra:</strong>
    $${costoManoObraReceta.toFixed(2)}
</p>
<p>
    <strong>Costos Indirectos:</strong>
    $${costoIndirectoReceta.toFixed(2)}
</p>
<p>
    <strong>Costo Total Producción:</strong>
    $${costoProduccionTotal.toFixed(2)}
</p>
<p>
    <strong>Precio Sugerido de Venta:</strong>
    $${precioSugerido.toFixed(2)}
</p>
<p>
    <strong>Margen de Ganancia:</strong>
    ${margenGanancia}%
</p>
    <h4 class="titulo-ficha">
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

    const checks = document.querySelectorAll(".extra-checkbox");

    checks.forEach(function (check) {

        check.onchange = function () {

            let totalExtras = 0;

            checks.forEach(function (c) {

                if (c.checked) {
                    totalExtras += parseFloat(c.dataset.precio);
                }

            });

            const selector = document.getElementById("selectorReceta");

            const receta = recetasEstandarizadas[selector.value];

            let costoBase = 0;

            receta.ingredientes.forEach(function (ingrediente) {

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

        };

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

    // Convertimos a minúsculas
    unidadReceta = unidadReceta.toLowerCase();
    unidadCompra = unidadCompra.toLowerCase();

    // Igualdad exacta
    if (unidadReceta === unidadCompra) {
        return cantidad;
    }

    // UNIDADES
    if (unidadReceta === "u" &&
        unidadCompra === "unidades") {
        return cantidad;
    }

    if (unidadReceta === "unidades" &&
        unidadCompra === "u") {
        return cantidad;
    }

    // GRAMOS ↔ KILOGRAMOS
    if ((unidadReceta === "gr" || unidadReceta === "g") &&
        unidadCompra === "kilogramos") {
        return cantidad / 1000;
    }

    if (unidadReceta === "kilogramos" &&
        (unidadCompra === "gr" || unidadCompra === "g")) {
        return cantidad * 1000;
    }

    // GRAMOS ↔ LIBRAS
    if ((unidadReceta === "gr" || unidadReceta === "g") &&
        unidadCompra === "libras") {
        return cantidad / 453.592;
    }

    if (unidadReceta === "libras" &&
        (unidadCompra === "gr" || unidadCompra === "g")) {
        return cantidad * 453.592;
    }

    // ML ↔ LITROS
    if (unidadReceta === "ml" &&
        unidadCompra === "litros") {
        return cantidad / 1000;
    }

    if (unidadReceta === "litros" &&
        unidadCompra === "ml") {
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

// ============================================
// DOM CONTENT LOADED - CARGAR RECETAS EN EL SELECT
// ============================================
document.addEventListener("DOMContentLoaded", function () {

    cargarRecetasEstandarizadas();

});

