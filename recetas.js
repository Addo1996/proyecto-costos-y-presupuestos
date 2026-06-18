// ============================================
// RECETAS ESTANDARIZADAS
// ============================================

const recetasEstandarizadas = [
    
    
    {
        nombre: "Hamburguesa Clásica",
        imagen: "img/hamburguesaClasica.png",

        ingredientes: [
            { nombre: "Pan hamburguesa", cantidad: 1 },
            { nombre: "Carne molida", cantidad: 0.25 },
            { nombre: "Queso cheddar", cantidad: 1 },
            { nombre: "Lechuga", cantidad: 20 },
            { nombre: "Salsa de tomate", cantidad: 15 }
        ],
        extras: [
            "Carne extra",
            "Queso extra",
            "Tocino"
        ],

        tiempoPreparacion: 10,
        porciones: 1
    },

    {
        nombre: "Big Burger",
        imagen: "img/bigBurger.png",
        ingredientes: [
            { nombre: "Pan hamburguesa", cantidad: 1 },
            { nombre: "Carne molida", cantidad: 0.50 },
            { nombre: "Queso cheddar", cantidad: 2 },
            { nombre: "Lechuga", cantidad: 20 },
            { nombre: "Tomate", cantidad: 30 }
        ],
        extras: [
            "Carne extra",
            "Queso extra",
            "Tocino"
        ],

        tiempoPreparacion: 15,
        porciones: 1
    },

    {
        nombre: "Salchipapa Especial",
        imagen: "img/salchipapaEspecial.png",
        ingredientes: [
            { nombre: "Papa", cantidad: 250 },
            { nombre: "Salchicha", cantidad: 2 },
            { nombre: "Mayonesa", cantidad: 15 },
            { nombre: "Salsa de tomate", cantidad: 15 }
        ],
        extras: [
            "Salchicha extra",
            "Queso extra",
            "Salsa extra"
        ],

        tiempoPreparacion: 12,
        porciones: 1
    },

    {
        nombre: "Hot Dog Especial",
        imagen: "img/hotDogEspecial.png",
        ingredientes: [
            { nombre: "Pan hot dog", cantidad: 1 },
            { nombre: "Salchicha", cantidad: 1 },
            { nombre: "Cebolla", cantidad: 15 },
            { nombre: "Repollo", cantidad: 20 },
            { nombre: "Mayonesa", cantidad: 10 },
            { nombre: "Mostaza", cantidad: 10 }
        ],
        extras: [
            "Salchicha extra",
            "Queso extra",
            "Salsa extra"
        ],

        tiempoPreparacion: 8,
        porciones: 1
    },

    {
        nombre: "Nuggets con Papas",
        imagen: "img/nuggetsPapas.png",
        ingredientes: [
            { nombre: "Nuggets", cantidad: 6 },
            { nombre: "Papa", cantidad: 200 },
            { nombre: "Aceite", cantidad: 30 },
            { nombre: "Salsa de tomate", cantidad: 15 }
        ],
        extras: [
            "Salchicha extra",
            "Queso extra",
            "Salsa extra"
        ],

        tiempoPreparacion: 10,
        porciones: 1
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

    let html = `
    
        <h3>🍽️ ${receta.nombre}</h3>
        <img src="${receta.imagen}"alt="${receta.nombre}"class="imagen-receta">
        <p><strong>Tiempo de preparación:</strong>
        ${receta.tiempoPreparacion} minutos</p>

        <p><strong>Porciones:</strong>
        ${receta.porciones}</p>

        <h4>Ingredientes:</h4>

        <ul>
    `;

    receta.ingredientes.forEach(function (ingrediente) {

        html += `
            <li>
                ${ingrediente.nombre}
                :
                ${ingrediente.cantidad}
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
                value="${extra}"
            >

            ${extra}

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

function actualizarCostoExtras(){

    const checks =
        document.querySelectorAll(".extra-checkbox");

    checks.forEach(function(check){

        check.addEventListener("change", function(){

            let totalExtras = 0;

            checks.forEach(function(c){

                if(c.checked){

                    totalExtras +=
                        costosExtras[c.value] || 0;

                }

            });

            document.getElementById("costoExtras")
                .textContent =
                totalExtras.toFixed(2);

            document.getElementById("costoTotalReceta")
                .textContent =
                totalExtras.toFixed(2);

        });

    });

}

// ============================================
// DOM CONTENT LOADED - CARGAR RECETAS EN EL SELECT
// ============================================
document.addEventListener("DOMContentLoaded", function () {

    cargarRecetasEstandarizadas();

});

