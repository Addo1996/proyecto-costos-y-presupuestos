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

    let html = `
    
    <h3>🍽️ ${receta.nombre}</h3>
    <img src="${receta.imagen}"alt="${receta.nombre}"class="imagen-receta">
    <p><strong>Tiempo de preparación:</strong>
    ${receta.tiempoPreparacion} minutos</p>

    <p><strong>Porciones:</strong>
    ${receta.porciones}</p>

    <p><strong>Costo Base:</strong>
    $${costoBase.toFixed(2)}</p>
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
           $<span id="costoTotalReceta"> ${costoBase.toFixed(2)}</span>
        </h4>
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

function convertirUnidad(cantidad, unidadReceta, unidadCompra){

    // Convertimos a minúsculas
    unidadReceta = unidadReceta.toLowerCase();
    unidadCompra = unidadCompra.toLowerCase();

    // Igualdad exacta
    if(unidadReceta === unidadCompra){
        return cantidad;
    }

    // UNIDADES
    if(unidadReceta === "u" &&
       unidadCompra === "unidades"){
        return cantidad;
    }

    if(unidadReceta === "unidades" &&
       unidadCompra === "u"){
        return cantidad;
    }

    // GRAMOS ↔ KILOGRAMOS
    if((unidadReceta === "gr" || unidadReceta === "g") &&
       unidadCompra === "kilogramos"){
        return cantidad / 1000;
    }

    if(unidadReceta === "kilogramos" &&
       (unidadCompra === "gr" || unidadCompra === "g")){
        return cantidad * 1000;
    }

    // GRAMOS ↔ LIBRAS
    if((unidadReceta === "gr" || unidadReceta === "g") &&
       unidadCompra === "libras"){
        return cantidad / 453.592;
    }

    if(unidadReceta === "libras" &&
       (unidadCompra === "gr" || unidadCompra === "g")){
        return cantidad * 453.592;
    }

    // ML ↔ LITROS
    if(unidadReceta === "ml" &&
       unidadCompra === "litros"){
        return cantidad / 1000;
    }

    if(unidadReceta === "litros" &&
       unidadCompra === "ml"){
        return cantidad * 1000;
    }

    console.warn(
        `No existe conversión entre ${unidadReceta} y ${unidadCompra}`
    );

    return cantidad;
}

// ============================================
// DOM CONTENT LOADED - CARGAR RECETAS EN EL SELECT
// ============================================
document.addEventListener("DOMContentLoaded", function () {

    cargarRecetasEstandarizadas();

});

