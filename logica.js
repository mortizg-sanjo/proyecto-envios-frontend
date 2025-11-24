/**
 * Función principal para calcular el precio de un envío
 * @param {string} ciudadOrigen - Ciudad de origen del envío
 * @param {string} ciudadDestino - Ciudad de destino del envío
 * @param {number} peso - Peso del paquete en kilogramos
 * @returns {number} - Precio total del envío en euros
 */
function calcularPrecioEnvio(ciudadOrigen, ciudadDestino, peso) {
    // Normalizar las ciudades (quitar espacios y convertir a minúsculas)
    const origen = ciudadOrigen.trim().toLowerCase();
    const destino = ciudadDestino.trim().toLowerCase();
    
    // Calcular precio base según las ciudades
    const precioBase = calcularPrecioBaseCiudades(origen, destino);
    
    // Aplicar multiplicador según el peso
    const precioFinal = aplicarMultiplicadorPeso(precioBase, peso);
    
    return precioFinal;
}

/**
 * Calcula el precio base según las ciudades de origen y destino
 * @param {string} origen - Ciudad de origen (normalizada)
 * @param {string} destino - Ciudad de destino (normalizada)
 * @returns {number} - Precio base en euros
 */
function calcularPrecioBaseCiudades(origen, destino) {
    // Caso 1: Misma ciudad = 5€
    if (origen === destino) {
        return 5;
    }
    
    // Caso 2: Origen o Destino es "Palma" = 9€
    if (origen === "palma" || destino === "palma") {
        return 9;
    }
    
    // Caso 3: Dos ciudades distintas (ninguna Palma) = 7€
    return 7;
}

/**
 * Aplica el multiplicador al precio base según el peso del paquete
 * @param {number} precioBase - Precio base calculado
 * @param {number} peso - Peso del paquete en kilogramos
 * @returns {number} - Precio final con multiplicador aplicado
 */
function aplicarMultiplicadorPeso(precioBase, peso) {
    // < 10kg: Precio base (x1)
    if (peso < 10) {
        return precioBase;
    }
    
    // 10-20kg: Precio x 1.5
    if (peso >= 10 && peso <= 20) {
        return precioBase * 1.5;
    }
    
    // > 20kg: Precio x 2
    return precioBase * 2;
}

/**
 * Función auxiliar para mostrar el resultado en el DOM
 * @param {number} precio - Precio a mostrar
 * @param {string} elementId - ID del elemento HTML donde mostrar el precio
 */
function mostrarPrecio(precio, elementId = "resultado-precio") {
    const elemento = document.getElementById(elementId);
    
    if (elemento) {
        elemento.textContent = `Precio del envío: ${precio.toFixed(2)} €`;
        elemento.style.display = "block";
    } else {
        console.error(`No se encontró el elemento con ID: ${elementId}`);
    }
}

/**
 * Función de ejemplo para probar la lógica (puede ser llamada desde el formulario)
 * Esta función integra todo el proceso: obtener datos, calcular y mostrar resultado
 */
function procesarEnvio() {
    // Obtener valores del formulario (adaptar los IDs según el HTML de Manel)
    const ciudadOrigen = document.getElementById("ciudad-origen")?.value;
    const ciudadDestino = document.getElementById("ciudad-destino")?.value;
    const peso = parseFloat(document.getElementById("peso")?.value);
    
    // Validaciones básicas (Daniela hará las validaciones completas)
    if (!ciudadOrigen || !ciudadDestino || !peso || peso <= 0) {
        console.error("Datos incompletos o inválidos");
        return;
    }
    
    // Calcular el precio
    const precio = calcularPrecioEnvio(ciudadOrigen, ciudadDestino, peso);
    
    // Mostrar el resultado
    mostrarPrecio(precio);
    
    return precio;
}