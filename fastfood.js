// ============================
// VARIABLES GLOBALES
// ============================

let totalIngredientes = 0;

// ============================
// BOTON AGREGAR INGREDIENTE
// ============================

document
    .getElementById("btnAgregar")
    .addEventListener("click", agregarIngrediente);

// ============================
// FUNCION AGREGAR INGREDIENTE
// ============================

function agregarIngrediente() {

    let ingrediente =
        document.getElementById("ingrediente").value;

    let cantidad =
        parseFloat(
            document.getElementById("cantidadReceta").value
        );

    let unidad =
        document.getElementById("unidadUso").value;

    let precio =
        parseFloat(
            document.getElementById("precioCompra").value
        );

    // Validación

    if (
        ingrediente === "" ||
        isNaN(cantidad) ||
        isNaN(precio)
    ) {

        alert("Complete todos los campos");

        return;
    }

    // Calcular costo

    let costo = cantidad * precio;

    // Acumular total

    totalIngredientes += costo;

    // Agregar fila

    let tabla =
        document.getElementById("tablaIngredientes");

    let fila =
        document.createElement("tr");

    fila.innerHTML = `
        <td>${ingrediente}</td>
        <td>${cantidad}</td>
        <td>${unidad}</td>
        <td>$${costo.toFixed(2)}</td>
    `;

    tabla.appendChild(fila);

    // Mostrar total

    document.getElementById(
        "totalIngredientes"
    ).textContent =
        totalIngredientes.toFixed(2);

    limpiarFormulario();
}

// ============================
// LIMPIAR CAMPOS
// ============================

function limpiarFormulario() {

    document.getElementById("ingrediente").value = "";

    document.getElementById("cantidadReceta").value = "";

    document.getElementById("precioCompra").value = "";

}

function mostrarPagina(idPagina){

    let paginas =
        document.querySelectorAll(".pagina");

    paginas.forEach(function(pagina){

        pagina.style.display = "none";

    });

    document.getElementById(idPagina)
        .style.display = "block";

    // Si entra a Teoría ocultar todas las subsecciones

    if(idPagina === "teoria"){

        let subsecciones =
            document.querySelectorAll(".subseccion");

        subsecciones.forEach(function(sub){

            sub.style.display = "none";

        });

    }
}
// ============================
// Sub Secciones en Teoria (Addonys)
// ============================
function mostrarSubSeccion(idSubSeccion){

    let subsecciones =
        document.querySelectorAll(".subseccion");

    subsecciones.forEach(function(sub){

        sub.style.display = "none";

    });

    document.getElementById(idSubSeccion)
        .style.display = "block";
}
