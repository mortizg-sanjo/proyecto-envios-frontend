/**
 * Tarea 10% de la Nota: Función de Validación de DNI
 * Verifica el formato (8 dígitos + 1 letra) y que la letra sea correcta.
 * @param {string} dni El DNI a validar.
 * @returns {object} Un objeto con { valido: boolean, mensaje: string }.
 */
function validarDNI(dni) {
    // 1. Limpieza y estandarización del DNI
    const dniLimpio = dni.toUpperCase().trim();

    // 2. Expresión Regular (Regex) para formato: 8 dígitos, 1 letra mayúscula
    const formatoValido = /^\d{8}[A-Z]$/;

    // Verificar formato
    if (!formatoValido.test(dniLimpio)) {
        return { valido: false, mensaje: "Formato incorrecto (debe ser 8 números y 1 letra)." };
    }

    // 3. Obtener el número y la letra
    const numeroDNI = dniLimpio.substring(0, 8);
    const letraDNI = dniLimpio.substring(8, 9);
    const numeroEntero = parseInt(numeroDNI, 10);

    // 4. Cálculo de la Letra de Control (Algoritmo oficial del DNI)
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const indice = numeroEntero % 23;
    const letraCorrecta = letras.charAt(indice);

    // 5. Comparación
    if (letraDNI === letraCorrecta) {
        return { valido: true, mensaje: "DNI válido." };
    } else {
        return { valido: false, mensaje: `Letra incorrecta. La letra correcta es ${letraCorrecta}.` };
    }
}


/**
 * Función que agrupa todas las validaciones del formulario.
 * @param {string} origen - Ciudad origen.
 * @param {string} destino - Ciudad destino.
 * @param {string} peso - El peso introducido (string).
 * @param {string} dni - El DNI introducido.
 * @returns {Array<string>} Un array con los mensajes de error. Vacío si es válido.
 */
function validarFormulario(origen, destino, peso, dni) {
    let errores = [];

    // --- 1. Validación de Campos Vacíos (general) ---
    if (!origen || !destino || !peso || !dni) {
        errores.push("Todos los campos (Origen, Destino, Peso y DNI) son obligatorios.");
    }
    
    // Si faltan campos obligatorios, es mejor detener la validación avanzada.
    if (errores.length > 0) return errores;


    // --- 2. Validación de Peso ---
    const pesoNum = parseFloat(peso);
    if (isNaN(pesoNum) || pesoNum <= 0) {
        errores.push("El peso debe ser un número positivo (mínimo 0.1 kg).");
    }

    // --- 3. Validación de DNI (usa la función especial) ---
    const resultadoDNI = validarDNI(dni);
    if (!resultadoDNI.valido) {
        // Añadimos un prefijo para poder identificar este error en la integración
        errores.push(`DNI_ERROR: ${resultadoDNI.mensaje}`);
    }

    return errores; // Devuelve la lista de errores.
}