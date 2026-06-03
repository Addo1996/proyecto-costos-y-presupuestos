// ============================================
// VARIABLES GLOBALES Y BANCO DE PREGUNTAS
// ============================================
let totalIngredientes = 0;
let preguntasSeleccionadas = [];
let nombreActual = "";
let apellidoActual = "";
let historialNotas =
    JSON.parse(
        localStorage.getItem(
            "historialNotas"
        )
    ) || [];
let valoraciones =
JSON.parse(
localStorage.getItem("valoraciones")
) || [];
// ============================================
// INICIAR EVALUACION - VALIDACION DE NOMBRE Y APELLIDO
// ============================================
function iniciarEvaluacion(){
    let nombre =
        document.getElementById(
            "nombreEvaluacion"
        ).value.trim();

    let apellido =
        document.getElementById(
            "apellidoEvaluacion"
        ).value.trim();

    if(nombre === "" || apellido === ""){

        alert(
            "Debe ingresar nombre y apellido."
        );

        return;
    }
    nombreActual = nombre;
    apellidoActual = apellido;
    document.getElementById(
        "contenidoEvaluacion"
    ).style.display = "block";
    generarEvaluacionAleatoria();
}
const bancoPreguntas = [
    {
        id: 1,
        pregunta: "¿Cuál de las siguientes opciones define correctamente a los costos fijos?",
        opciones: ["A) Gastos que aumentan proporcionalmente con el volumen de ventas.", "B) Gastos que cambian de acuerdo con la cantidad de productos elaborados.", "C) Gastos que permanecen constantes independientemente del nivel de producción o ventas.", "D) Gastos destinados exclusivamente a la compra de materia prima."],
        correcta: 2
    },
    {
        id: 2,
        pregunta: "Si una empresa debe pagar $3 en ingredientes por cada pizza fabricada, ¿cómo se clasifica este gasto?",
        opciones: ["A) Costo Fijo.", "B) Costo Variable.", "C) Marngen de Ganancia.", "D) Amortización Alemana."],
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
        opciones: ["A) Indica el momento en que se debe pagar el IVA al SRI.", "B) Ayuda a determinar el número mínimo de unidades que deben venderse para cubrir todos los gastos operativos sin generar pérdidas.", "C) Sirve para calcular el sueldo de los operarios de planta.", "D) Define el porcentaje exacto de impuestos que se debe aplicar a cada factura."],
        correcta: 1
    }
];


// ============================================
// INICIALIZACIÓN SEGURA DEL DOM
// ============================================
document.addEventListener("DOMContentLoaded", function() {
    // Escuchador original para agregar ingredientes (protegido aquí dentro)
    actualizarResultados();// Actualizamos el historial de notas al cargar la pagina
    actualizarValoraciones();// Actualizamos el historial de valoraciones al cargar la pagina
    actualizarSlider();// Actualizamos el valor del slider al cargar la pagina
    const btnAgregar = document.getElementById("btnAgregar");
    if (btnAgregar) {
        btnAgregar.addEventListener("click", agregarIngrediente);
    }
});



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
//=========================================
//CALIFICAR EVALUACION
//=========================================
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
    historialNotas.push({

    nombre: nombreActual,

    apellido: apellidoActual,

    nota: notaFinal * 2 // Escalamos a 10 puntos para el registro historico
});
localStorage.setItem(
    "historialNotas",
    JSON.stringify(
        historialNotas
    )
);
actualizarResultados();
    const contenedorResultados = document.getElementById("resultado-evaluacion");
    const textoPuntaje = document.getElementById("puntaje-texto");
    const detallesRetro = document.getElementById("retroalimentacion-detalles");
    
    textoPuntaje.textContent = `🎯`+nombreActual+` `+apellidoActual+` Tu puntaje es: ${notaFinal} / 5 (${(notaFinal * 2).toFixed(0)} / 10)`;
    textoPuntaje.style.color = notaFinal >= 3 ? "#2e7d32" : "#c62828";
    
    detallesRetro.innerHTML = retroalimentacionHTML;
    contenedorResultados.style.display = "block";
    
    contenedorResultados.scrollIntoView({ behavior: 'smooth' });
}


// ============================================
// COSTOS FIJOS
// ============================================
function agregarParametroFijo() {
    let nombre = document.getElementById("nuevoNombreFijo").value.trim();
    let valor = parseFloat(document.getElementById("nuevoValorFijo").value);

    if (nombre === "" || isNaN(valor)) {
        alert("Por favor, introduce un nombre y un valor válido para el costo.");
        return;
    }

    // Crear el nuevo bloque de interfaz e inyectarlo en la lista
    let lista = document.getElementById("listaParametrosFijos");
    let nuevoItem = document.createElement("div");
    nuevoItem.className = "parametro-fijo-item";
    nuevoItem.style.marginBottom = "10px";

    nuevoItem.innerHTML = `
        <label style="font-weight: bold; font-size: 0.9rem; color: #444; display: block;">📋 ${nombre} ($):</label>
        <input type="number" class="input-costo-fijo" value="${valor}" style="margin-top: 5px; width: 100%;">
    `;

    lista.appendChild(nuevoItem);

    // Limpiar campos del formulario de creación
    document.getElementById("nuevoNombreFijo").value = "";
    document.getElementById("nuevoValorFijo").value = "";
}

function calcularSimuladorFijos() {
    // Obtenemos todos los inputs de costo que existan en la lista actual
    let inputs = document.querySelectorAll(".input-costo-fijo");
    let costoFijoTotal = 0;

    // Sumamos dinámicamente cada uno de ellos
    inputs.forEach(function(input) {
        costoFijoTotal += parseFloat(input.value) || 0;
    });

    // Se asigna el resultado recalculado a todos los escenarios demostrativos
    document.getElementById("txtCostoFijoTotal").textContent = "$" + costoFijoTotal.toFixed(2);
    document.getElementById("tdFijoCero").textContent = "$" + costoFijoTotal.toFixed(2);
    document.getElementById("tdFijoDoscientos").textContent = "$" + costoFijoTotal.toFixed(2);
    document.getElementById("tdFijoMil").textContent = "$" + costoFijoTotal.toFixed(2);

    // Muestra el panel de resultados
    let pizarra = document.getElementById("pizarraFijos");
    pizarra.style.display = "block";
    
    pizarra.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limpiarSimuladorFijos() {

    let lista = document.getElementById("listaParametrosFijos");
    
    while (lista.children.length > 3) {
        lista.removeChild(lista.lastChild);
    }

    document.getElementById("nuevoNombreFijo").value = "";
    document.getElementById("nuevoValorFijo").value = "";

    document.getElementById("pizarraFijos").style.display = "none";
}
// ============================================
// COSTOS VARIABLES
// ============================================
function agregarParametroVariable() {
    let nombre = document.getElementById("nuevoNombreVariable").value.trim();
    let valor = parseFloat(document.getElementById("nuevoValorVariable").value);

    if (nombre === "" || isNaN(valor)) {
        alert("Por favor, introduce el nombre del insumo y su costo por unidad.");
        return;
    }

    let lista = document.getElementById("listaParametrosVariables");
    let nuevoItem = document.createElement("div");
    nuevoItem.className = "parametro-variable-item";
    nuevoItem.style.marginBottom = "10px";

    nuevoItem.innerHTML = `
        <label style="font-weight: bold; font-size: 0.9rem; color: #444; display: block;">📋 ${nombre} (por unidad $):</label>
        <input type="number" class="input-costo-variable" value="${valor}" step="0.01" style="margin-top: 5px; width: 100%;">
    `;

    lista.appendChild(nuevoItem);

    // Limpiar campos del mini formulario
    document.getElementById("nuevoNombreVariable").value = "";
    document.getElementById("nuevoValorVariable").value = "";
}

function calcularSimuladorVariables() {
    let inputs = document.querySelectorAll(".input-costo-variable");
    let costoVariableUnitario = 0;

    // Sumamos el valor individual de cada ingrediente del plato
    inputs.forEach(function(input) {
        costoVariableUnitario += parseFloat(input.value) || 0;
    });

    // Operaciones matemáticas de escala: Costo Unitario x Volumen de producción
    let costoTotalCero = costoVariableUnitario * 0;
    let costoTotalCien = costoVariableUnitario * 100;
    let costoTotalMil = costoVariableUnitario * 1000;

    // Reflejar resultados en la pizarra
    document.getElementById("txtCostoVariableUnitario").textContent = "$" + costoVariableUnitario.toFixed(2);
    document.getElementById("tdVariableCero").textContent = "$" + costoTotalCero.toFixed(2);
    document.getElementById("tdVariableCien").textContent = "$" + costoTotalCien.toFixed(2);
    document.getElementById("tdVariableMil").textContent = "$" + costoTotalMil.toFixed(2);

    // Mostrar el panel explicativo
    let pizarra = document.getElementById("pizarraVariables");
    pizarra.style.display = "block";
    pizarra.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limpiarSimuladorVariables() {
    // Reestablecer valores por defecto de la receta base
    let inputsBase = document.querySelectorAll(".input-costo-variable");
    if(inputsBase[0]) inputsBase[0].value = "1.50";
    if(inputsBase[1]) inputsBase[1].value = "0.30";
    if(inputsBase[2]) inputsBase[2].value = "0.20";

    // Eliminar insumos extras agregados por el estudiante
    let lista = document.getElementById("listaParametrosVariables");
    while (lista.children.length > 3) {
        lista.removeChild(lista.lastChild);
    }

    // Limpiar inputs de creación
    document.getElementById("nuevoNombreVariable").value = "";
    document.getElementById("nuevoValorVariable").value = "";

    // Ocultar pizarra de resultados
    document.getElementById("pizarraVariables").style.display = "none";
}


// ====================================================
// COSTOS DIRECTOS E INDIRECTOS
// ====================================================
function agregarParametroMixto() {
    let nombre = document.getElementById("nuevoNombreMixto").value.trim();
    let valor = parseFloat(document.getElementById("nuevoValorMixto").value);
    let tipo = document.getElementById("nuevoTipoMixto").value;

    if (nombre === "" || isNaN(valor)) {
        alert("Por favor, introduce el nombre del gasto y su valor en dólares.");
        return;
    }

    let lista = document.getElementById("listaParametrosDirectosIndirectos");
    let nuevoItem = document.createElement("div");
    nuevoItem.className = "parametro-mixto-item";
    nuevoItem.style.marginBottom = "12px";
    nuevoItem.style.padding = "8px";
    nuevoItem.style.background = "#fff";
    nuevoItem.style.borderRadius = "6px";
    nuevoItem.style.border = "1px solid #ffe0cc";

    // Definir la etiqueta visual dependiendo del tipo seleccionado
    let etiquetaText = tipo === "directo" ? "[COSTO DIRECTO - Va directo al plato]" : "[COSTO INDIRECTO - Es general para todo]";
    let etiquetaColor = tipo === "directo" ? "#ff914d" : "#2e7d32";

    nuevoItem.innerHTML = `
        <label style="font-weight: bold; font-size: 0.9rem; color: #444; display: block;">📋 ${nombre} ($):</label>
        <span style="font-size: 0.8rem; color: ${etiquetaColor}; font-weight: bold;">${etiquetaText}</span>
        <input type="number" class="input-costo-mixto" data-tipo="${tipo}" value="${valor}" style="margin-top: 5px; width: 100%;">
    `;

    lista.appendChild(nuevoItem);

    // Limpiar campos del mini formulario
    document.getElementById("nuevoNombreMixto").value = "";
    document.getElementById("nuevoValorMixto").value = "";
}

function calcularSimuladorMixto() {
    let inputs = document.querySelectorAll(".input-costo-mixto");
    
    let totalDirectos = 0;
    let totalIndirectos = 0;

    // Clasificar y sumar usando el atributo personalizado data-tipo
    inputs.forEach(function(input) {
        let valor = parseFloat(input.value) || 0;
        let tipo = input.getAttribute("data-tipo");

        if (tipo === "directo") {
            totalDirectos += valor;
        } else if (tipo === "indirecto") {
            totalIndirectos += valor;
        }
    });

    let totalCombinado = totalDirectos + totalIndirectos;

    // Renderizar los valores calculados en la pizarra de resultados
    document.getElementById("tdTotalDirecto").textContent = "$" + totalDirectos.toFixed(2);
    document.getElementById("tdTotalIndirecto").textContent = "$" + totalIndirectos.toFixed(2);
    document.getElementById("tdTotalMixto").textContent = "$" + totalCombinado.toFixed(2);

    // Desplegar la pizarra de resultados
    let pizarra = document.getElementById("pizarraMixto");
    pizarra.style.display = "block";
    pizarra.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limpiarSimuladorMixto() {
    // Reestablecer valores iniciales de los tres inputs base
    let inputsBase = document.querySelectorAll(".input-costo-mixto");
    if(inputsBase[0]) inputsBase[0].value = "600";
    if(inputsBase[1]) inputsBase[1].value = "80";
    if(inputsBase[2]) inputsBase[2].value = "40";

    // Eliminar los parámetros extras creados dinámicamente (manteniendo los 3 iniciales)
    let lista = document.getElementById("listaParametrosDirectosIndirectos");
    while (lista.children.length > 3) {
        lista.removeChild(lista.lastChild);
    }

    // Limpiar el formulario de inserción
    document.getElementById("nuevoNombreMixto").value = "";
    document.getElementById("nuevoValorMixto").value = "";
    document.getElementById("nuevoTipoMixto").value = "directo";

    // Ocultar la pizarra de resultados
    document.getElementById("pizarraMixto").style.display = "none";
}

// ====================================================
//  MATERIA PRIMA DIRECTA
// ====================================================
function agregarParametroMateria() {
    let nombre = document.getElementById("nuevoNombreMateria").value.trim();
    let valor = parseFloat(document.getElementById("nuevoValorMateria").value);

    if (nombre === "" || isNaN(valor)) {
        alert("Por favor, ingresa el nombre del ingrediente nuevo y su costo unitario por plato.");
        return;
    }

    let lista = document.getElementById("listaParametrosMateria");
    let nuevoItem = document.createElement("div");
    nuevoItem.className = "parametro-materia-item";
    nuevoItem.style.marginBottom = "10px";

    nuevoItem.innerHTML = `
        <label style="font-weight: bold; font-size: 0.9rem; color: #444; display: block;">📋 ${nombre} (Costo por plato $):</label>
        <input type="number" class="input-costo-materia" value="${valor}" step="0.01" style="margin-top: 5px; width: 100%;">
    `;

    lista.appendChild(nuevoItem);

    // Limpiar campos del mini formulario
    document.getElementById("nuevoNombreMateria").value = "";
    document.getElementById("nuevoValorMateria").value = "";
}

function calcularSimuladorMateria() {
    let inputs = document.querySelectorAll(".input-costo-materia");
    let cantidadLote = parseInt(document.getElementById("simuCantidadLote").value) || 0;

    if (cantidadLote <= 0) {
        alert("Por favor, ingresa una cantidad de platos válida y mayor a cero.");
        return;
    }

    let costoMateriaUnitario = 0;

    // Sumatoria de cada ingrediente del plato individual
    inputs.forEach(function(input) {
        costoMateriaUnitario += parseFloat(input.value) || 0;
    });

    // Multiplicación matemática por el tamaño del lote deseado
    let costoTotalLote = costoMateriaUnitario * cantidadLote;

    // Renderizar datos calculados en la tabla del Canva
    document.getElementById("tdMateriaUnitario").textContent = "$" + costoMateriaUnitario.toFixed(2);
    document.getElementById("tdMateriaUnidadesLote").textContent = cantidadLote + " platos";
    document.getElementById("tdMateriaTotalLote").textContent = "$" + costoTotalLote.toFixed(2);

    // Mostrar panel explicativo
    let pizarra = document.getElementById("pizarraMateria");
    pizarra.style.display = "block";
    pizarra.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limpiarSimuladorMateria() {
    // Reestablecer el valor del lote por defecto
    document.getElementById("simuCantidadLote").value = "150";

    // Reestablecer valores iniciales de la receta base
    let inputsBase = document.querySelectorAll(".input-costo-materia");
    if(inputsBase[0]) inputsBase[0].value = "0.60";
    if(inputsBase[1]) inputsBase[1].value = "0.40";
    if(inputsBase[2]) inputsBase[2].value = "0.15";

    // Eliminar ingredientes dinámicos extras creados por el alumno (manteniendo los 3 base)
    let lista = document.getElementById("listaParametrosMateria");
    while (lista.children.length > 3) {
        lista.removeChild(lista.lastChild);
    }

    // Limpiar campos del mini formulario de creación
    document.getElementById("nuevoNombreMateria").value = "";
    document.getElementById("nuevoValorMateria").value = "";

    //  Ocultar la pizarra de resultados
    document.getElementById("pizarraMateria").style.display = "none";
}

// ====================================================
// MANO DE OBRA DIRECTA
// ====================================================
function agregarParametroMano() {
    let nombre = document.getElementById("nuevoNombreMano").value.trim();
    let valor = parseFloat(document.getElementById("nuevoValorMano").value);

    if (nombre === "" || isNaN(valor)) {
        alert("Por favor, ingresa el cargo del personal y su sueldo mensual asignado.");
        return;
    }

    let lista = document.getElementById("listaParametrosMano");
    let nuevoItem = document.createElement("div");
    nuevoItem.className = "parametro-mano-item";
    nuevoItem.style.marginBottom = "10px";

    nuevoItem.innerHTML = `
        <label style="font-weight: bold; font-size: 0.9rem; color: #444; display: block;">📋 Sueldo Mensual de ${nombre} ($):</label>
        <input type="number" class="input-costo-mano" value="${valor}" style="margin-top: 5px; width: 100%;">
    `;

    lista.appendChild(nuevoItem);

    // Limpiar inputs del mini formulario
    document.getElementById("nuevoNombreMano").value = "";
    document.getElementById("nuevoValorMano").value = "";
}

function calcularSimuladorMano() {
    let inputs = document.querySelectorAll(".input-costo-mano");
    let produccionMeta = parseInt(document.getElementById("simuProduccionMano").value) || 0;

    if (produccionMeta <= 0) {
        alert("Por favor, introduce una cantidad estimada de platos válida y mayor a cero.");
        return;
    }

    let sueldoTotalMensual = 0;

    // Sumar todos los sueldos de la lista actual
    inputs.forEach(function(input) {
        sueldoTotalMensual += parseFloat(input.value) || 0;
    });

    // Dividir toda la nómina mensual entre los platos estimados para hallar el costo unitario
    let costoManoPorPlato = sueldoTotalMensual / produccionMeta;

    // Renderizar resultados en la pizarra
    document.getElementById("tdManoTotalMensual").textContent = "$" + sueldoTotalMensual.toFixed(2);
    document.getElementById("tdManoPlatosMeta").textContent = produccionMeta + " platos";
    document.getElementById("tdManoCostoPorPlato").textContent = "$" + costoManoPorPlato.toFixed(2);

    // Desplegar panel con scroll fluido
    let pizarra = document.getElementById("pizarraMano");
    pizarra.style.display = "block";
    pizarra.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limpiarSimuladorMano() {
    // Reestablecer el volumen de producción base
    document.getElementById("simuProduccionMano").value = "1000";

    // Reestablecer valores por defecto del equipo inicial
    let inputsBase = document.querySelectorAll(".input-costo-mano");
    if(inputsBase[0]) inputsBase[0].value = "450";
    if(inputsBase[1]) inputsBase[1].value = "400";

    // Eliminar personal extra creado dinámicamente por el estudiante (manteniendo los 2 base)
    let lista = document.getElementById("listaParametrosMano");
    while (lista.children.length > 2) {
        lista.removeChild(lista.lastChild);
    }

    // Limpiar los campos del formulario de creación
    document.getElementById("nuevoNombreMano").value = "";
    document.getElementById("nuevoValorMano").value = "";

    // Ocultar la pizarra de resultados
    document.getElementById("pizarraMano").style.display = "none";
}

// ====================================================
// COSTEO DE RECETAS
// ====================================================
function agregarParametroReceta() {
    let nombre = document.getElementById("nuevoNombreComponente").value.trim();
    let valor = parseFloat(document.getElementById("nuevoValorComponente").value);

    if (nombre === "" || isNaN(valor)) {
        alert("Por favor, ingresa el concepto del costo extra y su valor por porción.");
        return;
    }

    let lista = document.getElementById("listaComponentesReceta");
    let nuevoItem = document.createElement("div");
    nuevoItem.className = "componente-receta-item";
    nuevoItem.style.marginBottom = "10px";

    nuevoItem.innerHTML = `
        <label style="font-weight: bold; font-size: 0.9rem; color: #444; display: block;">📋 ${nombre} (por porción $):</label>
        <input type="number" class="input-costo-receta" value="${valor}" step="0.01" style="margin-top: 5px; width: 100%;">
    `;

    lista.appendChild(nuevoItem);

    // Limpiar inputs del mini formulario
    document.getElementById("nuevoNombreComponente").value = "";
    document.getElementById("nuevoValorComponente").value = "";
}

function calcularSimuladorReceta() {
    let inputs = document.querySelectorAll(".input-costo-receta");
    let porcentajeGanancia = parseFloat(document.getElementById("simuPorcentajeGanancia").value) || 0;

    if (porcentajeGanancia < 0) {
        alert("Por favor, introduce un porcentaje de ganancia válido (0 o mayor).");
        return;
    }

    let costoProduccionTotal = 0;

    // Calcular la suma absoluta de todos los costos de la receta por porción
    inputs.forEach(function(input) {
        costoProduccionTotal += parseFloat(input.value) || 0;
    });

    // Calcular la utilidad en dólares y el PVP final
    let gananciaDolares = costoProduccionTotal * (porcentajeGanancia / 100);
    let precioVentaFinal = costoProduccionTotal + gananciaDolares;

    // Colocar resultados en la pizarra
    document.getElementById("tdRecetaCostoTotal").textContent = "$" + costoProduccionTotal.toFixed(2);
    document.getElementById("tdRecetaGananciaDolares").textContent = "$" + gananciaDolares.toFixed(2);
    document.getElementById("tdRecetaPrecioVenta").textContent = "$" + precioVentaFinal.toFixed(2);

    // Desplegar panel con scroll fluido hacia la tabla
    let pizarra = document.getElementById("pizarraReceta");
    pizarra.style.display = "block";
    pizarra.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limpiarSimuladorReceta() {
    // Restaurar porcentaje de ganancia inicial
    document.getElementById("simuPorcentajeGanancia").value = "30";

    // Restaurar los 3 costos predeterminados del ejemplo base
    let inputsBase = document.querySelectorAll(".input-costo-receta");
    if(inputsBase[0]) inputsBase[0].value = "2.00";
    if(inputsBase[1]) inputsBase[1].value = "0.50";
    if(inputsBase[2]) inputsBase[2].value = "0.30";

    // Eliminar componentes de costo extras creados por el alumno (manteniendo los 3 iniciales)
    let lista = document.getElementById("listaComponentesReceta");
    while (lista.children.length > 3) {
        lista.removeChild(lista.lastChild);
    }

    // Limpiar inputs del mini formulario de creación
    document.getElementById("nuevoNombreComponente").value = "";
    document.getElementById("nuevoValorComponente").value = "";

    // Ocultar la pizarra de resultados
    document.getElementById("pizarraReceta").style.display = "none";
}

// ====================================================
// MARGEN DE GANANCIA
// ====================================================
function agregarParametroMargen() {
    let nombre = document.getElementById("nuevoNombreMargen").value.trim();
    let valor = parseFloat(document.getElementById("nuevoValorMargen").value);

    if (nombre === "" || isNaN(valor)) {
        alert("Por favor, ingresa el concepto del costo y su valor en dólares.");
        return;
    }

    let lista = document.getElementById("listaComponentesMargen");
    let nuevoItem = document.createElement("div");
    nuevoItem.className = "componente-margen-item";
    nuevoItem.style.marginBottom = "10px";

    nuevoItem.innerHTML = `
        <label style="font-weight: bold; font-size: 0.9rem; color: #444; display: block;">📋 ${nombre} ($):</label>
        <input type="number" class="input-costo-margen" value="${valor}" step="0.01" style="margin-top: 5px; width: 100%;">
    `;

    lista.appendChild(nuevoItem);

    // Limpiar campos del mini formulario
    document.getElementById("nuevoNombreMargen").value = "";
    document.getElementById("nuevoValorMargen").value = "";
}

function calcularSimuladorMargen() {
    let precioVenta = parseFloat(document.getElementById("simuPrecioVentaBase").value) || 0;
    let inputsCosto = document.querySelectorAll(".input-costo-margen");

    if (precioVenta <= 0) {
        alert("Por favor, introduce un precio de venta mayor a cero.");
        return;
    }

    let costoTotal = 0;
    // Sumamos el costo base más todos los parámetros dinámicos creados
    inputsCosto.forEach(function(input) {
        costoTotal += parseFloat(input.value) || 0;
    });

    // Fórmula del Margen Financiero
    let utilidadDolares = precioVenta - costoTotal;
    let porcentajeMargen = (utilidadDolares / precioVenta) * 100;

    // Colocar resultados en la tabla
    document.getElementById("tdMargenPVP").textContent = "$" + precioVenta.toFixed(2);
    document.getElementById("tdMargenCostoAcumulado").textContent = "$" + costoTotal.toFixed(2);
    document.getElementById("tdMargenUtilidadDolares").textContent = "$" + utilidadDolares.toFixed(2);
    document.getElementById("tdMargenPorcentaje").textContent = porcentajeMargen.toFixed(2) + "%";

    // Alertas didácticas visuales por si están vendiendo a pérdida
    if (utilidadDolares < 0) {
        document.getElementById("tdMargenPorcentaje").style.color = "#ff3131";
        document.getElementById("tdMargenUtilidadDolares").style.color = "#ff3131";
    } else {
        document.getElementById("tdMargenPorcentaje").style.color = "#2e7d32";
        document.getElementById("tdMargenUtilidadDolares").style.color = "#2e7d32";
    }

    // Desplegar panel con scroll fluido hacia la tabla
    let pizarra = document.getElementById("pizarraMargen");
    pizarra.style.display = "block";
    pizarra.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limpiarSimuladorMargen() {
    // Restaurar precio de venta predeterminado
    document.getElementById("simuPrecioVentaBase").value = "5.00";

    // Restaurar el primer input de costo (Costo base de producción)
    let inputsCosto = document.querySelectorAll(".input-costo-margen");
    if(inputsCosto[0]) inputsCosto[0].value = "3.00";

    // Eliminar costos extras dinámicos del contenedor (manteniendo el costo base)
    let lista = document.getElementById("listaComponentesMargen");
    while (lista.children.length > 2) {
        lista.removeChild(lista.lastChild);
    }

    // Limpiar los campos de texto del mini formulario
    document.getElementById("nuevoNombreMargen").value = "";
    document.getElementById("nuevoValorMargen").value = "";

    // Ocultar la pizarra de resultados
    document.getElementById("pizarraMargen").style.display = "none";
}

// ====================================================
//PUNTO DE EQUILIBRIO
// ====================================================
function agregarCostoFijoEquilibrio() {
    // CORRECCIÓN: Ahora lee los IDs con terminación PE
    let nombre = document.getElementById("nuevoNombreFijoPE").value.trim();
    let valor = parseFloat(document.getElementById("nuevoValorFijoPE").value);

    if (nombre === "" || isNaN(valor)) {
        alert("Por favor, ingresa el concepto del costo fijo y su valor mensual.");
        return;
    }

    let lista = document.getElementById("listaCostosFijosEquilibrio");
    let nuevoItem = document.createElement("div");
    nuevoItem.className = "costo-fijo-item";
    nuevoItem.style.marginBottom = "10px";

    nuevoItem.innerHTML = `
        <label style="font-weight: bold; font-size: 0.9rem; color: #444; display: block;">📋 Costo Fijo: ${nombre} ($/mes):</label>
        <input type="number" class="input-costo-fijo" value="${valor}" style="margin-top: 5px; width: 100%;">
    `;

    lista.appendChild(nuevoItem);

    // Limpiar campos usando los IDs correctos
    document.getElementById("nuevoNombreFijoPE").value = "";
    document.getElementById("nuevoValorFijoPE").value = "";
}

function calcularSimuladorEquilibrio() {
    let pvp = parseFloat(document.getElementById("simuEquilibrioPVP").value) || 0;
    let variable = parseFloat(document.getElementById("simuEquilibrioVariable").value) || 0;
    let inputsFijos = document.querySelectorAll(".input-costo-fijo");

    if (pvp <= 0) {
        alert("El precio de venta debe ser mayor a cero.");
        return;
    }

    if (pvp <= variable) {
        alert("¡Error didáctico crítico! El precio de venta no puede ser menor o igual que el costo variable. Si vendes por debajo del costo de los ingredientes, el negocio jamás llegará a un punto de equilibrio.");
        return;
    }

    let costosFijosTotales = 0;
    // Sumamos todos los costos fijos de la lista de inputs
    inputsFijos.forEach(function(input) {
        costosFijosTotales += parseFloat(input.value) || 0;
    });

    // Operaciones del algoritmo financiero
    let margenContribucion = pvp - variable;
    let unidadesEquilibrio = Math.ceil(costosFijosTotales / margenContribucion); // Redondeo superior para porciones exactas
    let dineroEquilibrio = unidadesEquilibrio * pvp;

    // Asignación de valores en la tabla informativa
    document.getElementById("tdEquilibrioFijosTotales").textContent = "$" + costosFijosTotales.toFixed(2);
    document.getElementById("tdEquilibrioMargenContribucion").textContent = "$" + margenContribucion.toFixed(2);
    document.getElementById("tdEquilibrioUnidades").textContent = unidadesEquilibrio + " combos / platos";
    document.getElementById("tdEquilibrioVentasMoneda").textContent = "$" + dineroEquilibrio.toFixed(2);

    // Mostrar sección con desplazamiento suave
    let pizarra = document.getElementById("pizarraEquilibrio");
    pizarra.style.display = "block";
    pizarra.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function limpiarSimuladorEquilibrio() {
    //Reestablecer variables de producto base
    document.getElementById("nuevoNombreFijoPE").value = "";
    document.getElementById("nuevoValorFijoPE").value = "";

    // Reestablecer los costos fijos por defecto (Alquiler y Servicios)
    let inputsFijos = document.querySelectorAll(".input-costo-fijo");
    if(inputsFijos[0]) inputsFijos[0].value = "400";
    if(inputsFijos[1]) inputsFijos[1].value = "200";

    //Remover los nodos hijos extras que superen los 2 iniciales
    let lista = document.getElementById("listaCostosFijosEquilibrio");
    while (lista.children.length > 2) {
        lista.removeChild(lista.lastChild);
    }

    //Limpiar los inputs del formulario dinámico
    document.getElementById("nuevoNombreFijo").value = "";
    document.getElementById("nuevoValorFijo").value = "";

    // Ocultar la pizarra de resultados
    document.getElementById("pizarraEquilibrio").style.display = "none";
}
// ====================================================
// HISTORIAL DE NOTAS
//=====================================================
function actualizarResultados(){

    let tabla =
        document.getElementById(
            "tablaResultados"
        );

    tabla.innerHTML = "";

    historialNotas.forEach(function(estudiante){

        let fila =
            document.createElement("tr");

        fila.innerHTML = `

            <td>${estudiante.nombre}</td>

            <td>${estudiante.apellido}</td>

            <td>${estudiante.nota}/10</td>

        `;

        tabla.appendChild(fila);

    });

}
// ====================================================
// BORRAR RESULTADOS
//=====================================================
function borrarResultados(){

    if(
        confirm(
            "¿Desea eliminar todos los resultados?"
        )
    ){

        historialNotas = [];

        localStorage.removeItem(
            "historialNotas"
        );

        actualizarResultados();

    }

}
//==========================
// SLIDER DE VALORACION
//==========================
document.addEventListener(
    "input",
    function(){

        let slider =
            document.getElementById(
                "valoracionUsuario"
            );

        let texto =
            document.getElementById(
                "valorActual"
            );

        if(slider && texto){

            texto.textContent =
                slider.value;
            actualizarSlider();

        }

});
function actualizarSlider() {

    const slider =
        document.getElementById(
            "valoracionUsuario"
        );

    const porcentaje =
        ((slider.value - slider.min) /
        (slider.max - slider.min)) * 100;

    slider.style.background =
        `linear-gradient(
            to right,
            #007bff 0%,
            #007bff ${porcentaje}%,
            #ddd ${porcentaje}%,
            #ddd 100%
        )`;
}
//===============================================
// GUARDAR VALORACION DEL USUARIO EN LOCAL STORAGE
//===============================================
function guardarValoracion(){

    let nota =
        parseInt(
            document.getElementById(
                "valoracionUsuario"
            ).value
        );

    valoraciones.push(nota);

    localStorage.setItem(
        "valoraciones",
        JSON.stringify(
            valoraciones
        )
    );

    actualizarValoraciones();

    alert(
        "Gracias por calificar la página."
    );

}
//===============================================
// ACTUALIZAR PROMEDIO DE VALORACIONES EN LA INTERFAZ
//===============================================
function actualizarValoraciones(){

    let suma = 0;

    valoraciones.forEach(function(valor){

        suma += valor;

    });

    let promedio = 0;

    if(valoraciones.length > 0){

        promedio =
            suma /
            valoraciones.length;

    }

    document.getElementById(
        "promedioValoracion"
    ).textContent =
        promedio.toFixed(2);

    document.getElementById(
        "cantidadVotos"
    ).textContent =
        valoraciones.length;

}