// ============================================
// VARIABLES GLOBALES Y BANCO DE PREGUNTAS
// ============================================
let totalIngredientes = 0;
let preguntasSeleccionadas = [];

const bancoPreguntas = [
    {
        id: 1,
        pregunta: "¿Cuál de las siguientes opciones define correctamente a los costos fijos?",
        opciones: ["A) Gastos que aumentan proporcionalmente con el volumen de ventas.", "A) Gastos que aumentan proporcionalmente con el volumen de ventas.", "C) Gastos que permanecen constantes independientemente del nivel de producción o ventas.", "D) Gastos destinados exclusivamente a la compra de materia prima."],
        correcta: 2
    },
    {
        id: 2,
        pregunta: "Si una empresa debe pagar $3 en ingredientes por cada pizza fabricada, ¿cómo se clasifica este gasto?",
        opciones: ["A) Costo Fijo.", "B) Costo Variable.", "B) Costo Variable.", "D) Amortización Alemana."],
        correcta: 1
    },
    {
        id: 3,
        pregunta: " En una panadería, el sueldo de un supervisor de planta que no fabrica directamente el pan se considera:",
        opciones: ["A) Mano de obra directa.", "B) Materia prima directa.", "C) Mano de obra indirecta.", "D) Punto de equilibrio."],
        correcta: 2
    },
    {
        id: 4,
        pregunta: "¿Qué representa el PUNTO DE EQUILIBRIO para un emprendimiento?",
        opciones: ["A) El momento en que la empresa obtiene su máxima utilidad posible.", "B) El nivel de ventas donde los ingresos son iguales a los costos totales (no hay pérdidas ni ganancias).", "C) La diferencia porcentual entre el costo de producción y el precio de venta.", "D) La suma total de los costos directos e indirectos del mes."],
        correcta: 1
    },
    {
        id: 5,
        pregunta: "Si producir un pastel cuesta 15, ¿cuál es el margen de ganancia en valor monetario?",
        opciones: ["A) $10", "B) $5", "C) $25", "D) $1.5"],
        correcta: 1
    },
    {
        id: 6,
        pregunta: "¿Qué representa específicamente el COSTO DE MATERIA PRIMA en la producción?",
        opciones: ["A) Los gastos de publicidad y marketing del mes.", "B) El valor de los materiales utilizados exclusivamente para fabricar un producto.", "C) El sueldo de los gerentes y personal administrativo.", "D) El pago de licencias de software y servicios de internet."],
        correcta: 1
    },
    {
        id: 7,
        pregunta: "¿Cuál de los siguientes ejemplos se clasifica como Mano de Obra Directa?",
        opciones: ["A) El personal de vigilancia del taller.", "B) Los carpinteros que ensamblan los muebles.", "C) Los supervisores que revisan la calidad general de la planta.", "D) El personal encargado de la limpieza de las oficinas."],
        correcta: 1
    },
    {
        id: 8,
        pregunta: "¿Cuál es el propósito fundamental de realizar un COSTEO DE RECETAS?",
        opciones: ["A) Identificar los ingredientes y sus precios unitarios para establecer un precio de venta que garantice rentabilidad.", "B) Calcular cuántas horas extras debe trabajar el personal de cocina.", "C) Determinar el costo de alquiler y servicios básicos del restaurante.", "D) Listar los pasos de preparación para mejorar el sabor del platillo."],
        correcta: 0
    },
    {
        id: 9,
        pregunta: "¿Cómo se calcula correctamente el Porcentaje de Ganancia de un producto?",
        opciones: ["A) Dividiendo el costo total por el precio de venta.", "B) Sumando la ganancia al costo total y multiplicando por 100.", "C) Dividiendo la ganancia obtenida para el costo del producto y multiplicando el resultado por 100.", "D) Restando los costos variables a los costos fijos."],
        correcta: 2
    },
    {
        id: 10,
        pregunta: "¿Qué utilidad estratégica tiene el PUNTO DE EQUILIBRIO para una empresa?",
        opciones: ["A) Indica el momento en que se debe pagar el IVA al SRI.", "A) Indica el momento en que se debe pagar el IVA al SRI.", "C) Sirve para calcular el sueldo de los operarios de planta.", "D) Define el porcentaje exacto de impuestos que se debe aplicar a cada factura."],
        correcta: 1
    }
];

// ============================================
// INICIALIZACIÓN SEGURA DEL DOM
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    // Escuchador original para agregar ingredientes (protegido aquí dentro)
    const btnAgregar = document.getElementById("btnAgregar");
    if (btnAgregar) {
        btnAgregar.addEventListener("click", agregarIngrediente);
    }
});


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


// ============================================
// Control de los 8 Subtemas de Estudio
// ============================================
function mostrarSubTemas(idSubTema) {
    // Ocultamos todos los contenidos de los subtemas
    let subtemas = document.querySelectorAll(".subtema-contenido");
    subtemas.forEach(function(tema) {
        tema.style.display = "none";
    });

    // Mostramos únicamente el subtema seleccionado
    document.getElementById(idSubTema).style.display = "block";
}

// ============================================
// Sub Secciones en Teoria (Addonys) - Actualizada
// ============================================
function mostrarSubSeccion(idSubSeccion){

    let subsecciones =
        document.querySelectorAll(".subseccion");

    subsecciones.forEach(function(sub){

        sub.style.display = "none";

    });

    document.getElementById(idSubSeccion)
        .style.display = "block";

    // Si el usuario entra a la evaluación, generamos un examen nuevo con preguntas al azar
    if (idSubSeccion === 'evaluacion') {
        generarEvaluacionAleatoria();
    }
}

// ============================================
// LÓGICA DE LA EVALUACIÓN ALEATORIA
// ============================================
function generarEvaluacionAleatoria() {
    document.getElementById("resultado-evaluacion").style.display = "none";
    document.getElementById("retroalimentacion-detalles").innerHTML = "";
    
    let preguntasClonadas = [...bancoPreguntas];
    for (let i = preguntasClonadas.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [preguntasClonadas[i], preguntasClonadas[j]] = [preguntasClonadas[j], preguntasClonadas[i]];
    }
    
    preguntasSeleccionadas = preguntasClonadas.slice(0, 5);
    
    const contenedor = document.getElementById("contenedor-preguntas");
    contenedor.innerHTML = "";
    
    preguntasSeleccionadas.forEach((item, index) => {
        let preguntaHTML = `
            <div class="pregunta-bloque" style="margin-bottom: 20px; padding: 15px; background: #fff; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
                <p style="font-weight: bold; margin-bottom: 10px;">${index + 1}. ${item.pregunta}</p>
        `;
        
        item.opciones.forEach((opcion, opcIndex) => {
            preguntaHTML += `
                <label style="display: block; margin-bottom: 5px; cursor: pointer;">
                    <input type="radio" name="pregunta_${index}" value="${opcIndex}" style="width: auto; margin-right: 10px;">
                    ${opcion}
                </label>
            `;
        });
        
        preguntaHTML += `</div>`;
        contenedor.innerHTML += preguntaHTML;
    });
}

function calificarEvaluacion() {
    let aciertos = 0;
    let retroalimentacionHTML = "";
    
    for (let i = 0; i < preguntasSeleccionadas.length; i++) {
        const opciones = document.getElementsByName(`pregunta_${i}`);
        let respondida = false;
        for (const opcion of opciones) {
            if (opcion.checked) {
                respondida = true;
                break;
            }
        }
        if (!respondida) {
            alert("Por favor, responde todas las preguntas antes de enviar.");
            return;
        }
    }
    
    preguntasSeleccionadas.forEach((item, index) => {
        const opciones = document.getElementsByName(`pregunta_${index}`);
        let respuestaUsuario = -1;
        
        opciones.forEach((opcion) => {
            if (opcion.checked) {
                respuestaUsuario = parseInt(opcion.value);
            }
        });
        
        if (respuestaUsuario === item.correcta) {
            aciertos++;
            retroalimentacionHTML += `
                <p style="color: #2e7d32; font-weight: bold; margin-bottom: 5px;">✔️ Pregunta ${index + 1}: ¡Correcto!</p>
                <p style="color: #555; margin-left: 20px; margin-bottom: 15px;"><i>${item.pregunta}</i></p>
            `;
        } else {
            const respuestaCorrectaTexto = item.opciones[item.correcta];
            retroalimentacionHTML += `
                <p style="color: #c62828; font-weight: bold; margin-bottom: 5px;">❌ Pregunta ${index + 1}: Incorrecto</p>
                <p style="color: #333; margin-left: 20px; margin-bottom: 2px;"><b>Enunciado:</b> <i>${item.pregunta}</i></p>
                <p style="color: #2e7d32; margin-left: 20px; margin-bottom: 15px;">💡 <b>Respuesta correcta:</b> ${respuestaCorrectaTexto}</p>
            `;
        }
    });
    
    let notaFinal = aciertos; 
    const contenedorResultados = document.getElementById("resultado-evaluacion");
    const textoPuntaje = document.getElementById("puntaje-texto");
    const detallesRetro = document.getElementById("retroalimentacion-detalles");
    
    textoPuntaje.textContent = `🎯 Tu puntaje es: ${notaFinal} / 5 (${(notaFinal * 2).toFixed(0)} / 10)`;
    textoPuntaje.style.color = notaFinal >= 3 ? "#2e7d32" : "#c62828";
    
    detallesRetro.innerHTML = retroalimentacionHTML;
    contenedorResultados.style.display = "block";
    
    contenedorResultados.scrollIntoView({ behavior: 'smooth' });
}