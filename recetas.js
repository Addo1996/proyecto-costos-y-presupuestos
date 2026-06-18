// ============================================
// RECETAS ESTANDARIZADAS
// ============================================

const recetasEstandarizadas = [


    {
        nombre: "Hamburguesa Clásica",
        imagen: "img/hamburguesaClasica.png",

            ingredientes: [
                { nombre: "Pan hamburguesa", cantidad: 1, unidad: "u" },
                { nombre: "Carne molida", cantidad: 250, unidad: "g" },
                { nombre: "Queso cheddar", cantidad: 1, unidad: "u" },
                { nombre: "Lechuga", cantidad: 20, unidad: "g" },
                { nombre: "Salsa de tomate", cantidad: 15, unidad: "ml" }
            ],
        extras: [
            { nombre: "Carne extra", precio: 1.50, imagen: "img/extras/carne.png" },
            { nombre: "Queso extra", precio: 0.50, imagen: "img/extras/queso.png" },
            { nombre: "Tocino", precio: 1.00, imagen: "img/extras/tocino.png" }
        ],

        tiempoPreparacion: 10,
        porciones: 1,
        costoBase: 3.50
    },

    {
        nombre: "Big Burger",
        imagen: "img/bigBurger.png",
        ingredientes: [
            { nombre: "Pan hamburguesa", cantidad: 1, unidad: "u" },
            { nombre: "Carne molida", cantidad: 500, unidad: "g" },
            { nombre: "Queso cheddar", cantidad: 2, unidad: "u" },
            { nombre: "Lechuga", cantidad: 20, unidad: "g" },
            { nombre: "Tomate", cantidad: 30, unidad: "g" }
        ],
        extras: [
            { nombre: "Carne extra", precio: 1.50, imagen: "img/extras/carne.png" },
            { nombre: "Queso extra", precio: 0.50, imagen: "img/extras/queso.png" },
            { nombre: "Tocino", precio: 1.00, imagen: "img/extras/tocino.png" }
        ],

        tiempoPreparacion: 15,
        porciones: 1,
        costoBase: 5.00
    },

    {
        nombre: "Salchipapa Especial",
        imagen: "img/salchipapaEspecial.png",
        ingredientes: [
            { nombre: "Papa", cantidad: 250, unidad: "g" },
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
        costoBase: 3.75
    },

    {
        nombre: "Hot Dog Especial",
        imagen: "img/hotDogEspecial.png",
        ingredientes: [
            { nombre: "Pan hot dog", cantidad: 1, unidad: "u" },
            { nombre: "Salchicha", cantidad: 1, unidad: "u" },
            { nombre: "Cebolla", cantidad: 15, unidad: "g" },
            { nombre: "Repollo", cantidad: 20, unidad: "g" },
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
        costoBase: 4.00
    },

    {
        nombre: "Nuggets con Papas",
        imagen: "img/nuggetsPapas.png",
        ingredientes: [
            { nombre: "Nuggets", cantidad: 6, unidad: "u" },
            { nombre: "Papa", cantidad: 200, unidad: "g" },
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
        costoBase: 4.25
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

    const costoBase = receta.costoBase;

    let html = `
    
        <h3>🍽️ ${receta.nombre}</h3>
        <img src="${receta.imagen}"alt="${receta.nombre}"class="imagen-receta">
        <p><strong>Tiempo de preparación:</strong>
        ${receta.tiempoPreparacion} minutos</p>

        <p><strong>Porciones:</strong>
        ${receta.porciones}</p>

        <p><strong>Costo Base:</strong>
$${receta.costoBase.toFixed(2)}</p>

        <h4>Ingredientes:</h4>

        <ul>
    `;

    receta.ingredientes.forEach(function (ingrediente) {

        html += `
            <li>
                ${ingrediente.nombre}
                :
                ${ingrediente.cantidad} ${ingrediente.unidad}
            </li>
        `;

    });

    html += `
        </ul>

        <h4>➕ Extras Disponibles:</h4>

        <div class="extras-receta">
    `;
    receta.extras.forEach(function (extra) {

        html += `
        <label class="extra-item">

            <input
                type="checkbox"
                class="extra-checkbox"
                data-nombre="${extra.nombre}"
                data-precio="${extra.precio}"
            >

            <img src="${extra.imagen}" alt="${extra.nombre}" class="imagen-extra">

            <div class="extra-info">
                <span>${extra.nombre}</span>
                <small>$${extra.precio.toFixed(2)}</small>
            </div>

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
            $<span id="costoTotalReceta">0.00</span>
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

            let costoBase = receta.costoBase;
            let total = costoBase + totalExtras;

            document.getElementById("costoExtras").textContent =
                totalExtras.toFixed(2);

            document.getElementById("costoTotalReceta").textContent =
                total.toFixed(2);

        };

    });

}

// ============================================
// DOM CONTENT LOADED - CARGAR RECETAS EN EL SELECT
// ============================================
document.addEventListener("DOMContentLoaded", function () {

    cargarRecetasEstandarizadas();

});

