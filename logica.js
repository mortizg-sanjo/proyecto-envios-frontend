export function calcularPrecioEnvio(ciudadOrigen, ciudadDestino, peso) {
    const origen = ciudadOrigen.trim().toLowerCase();
    const destino = ciudadDestino.trim().toLowerCase();
    
    const precioBase = calcularPrecioBaseCiudades(origen, destino);
    const precioFinal = aplicarMultiplicadorPeso(precioBase, peso);
    
    return precioFinal;
}

export function calcularPrecioEnvioDetallado(ciudadOrigen, ciudadDestino, peso) {
    const origen = ciudadOrigen.trim().toLowerCase();
    const destino = ciudadDestino.trim().toLowerCase();
    
    const precioBase = calcularPrecioBaseCiudades(origen, destino);
    const multiplicador = obtenerMultiplicadorPeso(peso);
    const precioFinal = precioBase * multiplicador;
    const costoAdicionalPeso = precioFinal - precioBase;
    
    return {
        precioBase: precioBase,
        multiplicadorPeso: multiplicador,
        costoAdicionalPeso: costoAdicionalPeso,
        precioTotal: precioFinal,
        desglose: {
            ciudades: `${ciudadOrigen} → ${ciudadDestino}`,
            peso: `${peso} kg`,
            rangoPeso: obtenerRangoPeso(peso)
        }
    };
}

function obtenerMultiplicadorPeso(peso) {
    if (peso < 10) return 1;
    if (peso >= 10 && peso <= 20) return 1.5;
    return 2;
}

function obtenerRangoPeso(peso) {
    if (peso < 10) return "Menos de 10kg";
    if (peso >= 10 && peso <= 20) return "Entre 10-20kg";
    return "Más de 20kg";
}

export function calcularPrecioBaseCiudades(origen, destino) {
    if (origen === destino) {
        return 5;
    }
    
    if (origen === "palma" || destino === "palma") {
        return 9;
    }
    
    return 7;
}

export function aplicarMultiplicadorPeso(precioBase, peso) {
    if (peso < 10) {
        return precioBase;
    }
    
    if (peso >= 10 && peso <= 20) {
        return precioBase * 1.5;
    }
    
    return precioBase * 2;
}

export function mostrarPrecio(precio, elementId = "resultado-precio") {
    const elemento = document.getElementById(elementId);
    
    if (elemento) {
        elemento.textContent = `Precio del envío: ${precio.toFixed(2)} €`;
        elemento.style.display = "block";
    } else {
        console.error(`No se encontró el elemento con ID: ${elementId}`);
    }
}

export function mostrarPrecioDetallado(detalles, elementId = "resultado-precio") {
    const elemento = document.getElementById(elementId);
    
    if (elemento) {
        elemento.innerHTML = `
            <div style="margin-bottom: 10px;">
                <strong>📦 Desglose del envío:</strong><br>
                ${detalles.desglose.ciudades}<br>
                Peso: ${detalles.desglose.peso} (${detalles.desglose.rangoPeso})
            </div>
            <div style="border-top: 1px solid #ccc; padding-top: 10px;">
                <div>Envío base: ${detalles.precioBase.toFixed(2)} €</div>
                <div>Coste adicional por peso (x${detalles.multiplicadorPeso}): ${detalles.costoAdicionalPeso.toFixed(2)} €</div>
                <div style="margin-top: 10px; font-size: 20px; font-weight: bold;">
                    Total: ${detalles.precioTotal.toFixed(2)} €
                </div>
            </div>
        `;
        elemento.style.display = "block";
    } else {
        console.error(`No se encontró el elemento con ID: ${elementId}`);
    }
}

export function procesarEnvio() {
    const ciudadOrigen = document.getElementById("origin")?.value;
    const ciudadDestino = document.getElementById("destination")?.value;
    const peso = parseFloat(document.getElementById("weight")?.value);
    
    if (!ciudadOrigen || !ciudadDestino || !peso || peso <= 0) {
        console.error("Datos incompletos o inválidos");
        return;
    }
    
    const detalles = calcularPrecioEnvioDetallado(ciudadOrigen, ciudadDestino, peso);
    
    mostrarResultadoEnFormulario(detalles);
    
    return detalles.precioTotal;
}

export function mostrarResultadoEnFormulario(detalles) {
    const resultContainer = document.getElementById('result-container');
    const finalPrice = document.getElementById('final-price');
    const shippingDetails = document.getElementById('shipping-details');
    
    if (resultContainer && finalPrice && shippingDetails) {
        finalPrice.textContent = detalles.precioTotal.toFixed(2);
        
        shippingDetails.innerHTML = `
            ${detalles.desglose.ciudades} | ${detalles.desglose.peso} (${detalles.desglose.rangoPeso})<br>
            Base: ${detalles.precioBase.toFixed(2)}€ | Peso (×${detalles.multiplicadorPeso}): +${detalles.costoAdicionalPeso.toFixed(2)}€
        `;
        
        resultContainer.classList.remove('hidden');
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

export function inicializarFormulario() {
    const form = document.getElementById('shippingForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            procesarEnvio();
        });
    }
}