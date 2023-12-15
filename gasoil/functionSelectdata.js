function selectData(contenidoVentana, tabla,){


    const proveedorInp = document.getElementById("proveedorInp");
    const cedulaInp    = document.getElementById("cedulaInp");
    const cantidadInp  = document.getElementById("cantidadInp");
    const choferInp    = document.getElementById("choferInp");
    const placaInp     = document.getElementById("placaInp");
    const montoInp     = document.getElementById("montoInp");

    tabla2.addEventListener("dblclick", function(event) {

        if (event.target.tagName === "TD"){

        event.preventDefault();

        const filaSeleccionada = event.target.parentElement;
        const proveedor        = filaSeleccionada.children[1].textContent;
        const chofer           = filaSeleccionada.children[2].textContent;
        const cedula           = filaSeleccionada.children[3].textContent;
        const placa            = filaSeleccionada.children[4].textContent;
        const cantidad         = filaSeleccionada.children[5].textContent
        const monto            = filaSeleccionada.children[6].textContent;
                    
        proveedorInp.value = proveedor;
        choferInp.value    = chofer;
        cedulaInp.value    = cedula;
        placaInp.value     = placa;
        cantidadInp.value  = cantidad;
        montoInp.value     = monto;

        }
    });
}

module.exports = selectData