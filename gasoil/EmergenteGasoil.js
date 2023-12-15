const selectData = require("./functionSelectdata");


  function emergenteGasoil(filasTabla, ventanaEmergente,tabla){
 
  filasTabla.forEach(fila => {
    fila.addEventListener('dblclick', () => {    

    const fecha = fila.querySelector('td:nth-child(8)').textContent;

    var fecha_array = fecha.split("/"); // Devuelve ["30", "08", "2023"]
    var fecha_iso = fecha_array.reverse().join("-"); 
      
      const contenidoVentana = `

  
        <div class="ventana-emergente-contenido">
        
    
        
        <div id="menu-bar">
              <div class="left" role="menu">          
              </div>
              <div class="right">
                <button type="button" class="menubar-btn" id="minimizar" onclick="min"><i class="fas fa-window-minimize"></i></button>
                <button type="button" class="menubar-btn" id="max-unmax-btn"><i class="far fa-square"></i></button>
                <button type="button" class="menubar-btn" id="cerrar" onclick="close"><i class="fas fa-times"></i></button>
              </div>
            </div>
          <h2>Detalles de la compra</h2>
          <fieldset>
          <div class ="ordenado">
          
          <div class ="izquierda">

          <table>
            <tr>
            <td><span>Proveedor:</span> </td>
            <td><input type="text" name="proveedorName" id="proveedorInp" class="requerido2" > </td>
            </tr>

            <tr>
            <td><span>Cédula:</span></td>
            <td><input type="text" name="cedulaName" id="cedulaInp" class="requerido2" > </td>
            </tr>

            <tr>
            <td><span>Cantidad:</span></td>
            <td><input type="text" name="cantidadName" id="cantidadInp" class="requerido2" > </td>
            </tr>

            <tr>
            <td><span>Sitio de entrega:</span></td>
            <td><input type="text" name="sitioEntrega" id="sitioEntrega" class="requerido2" > </td>
            </tr>
              
            <tr>
            <td><span>Tipo de compra:</span></td>
            <td> 
              <select name="tipoCompra" id="tipoCompra">
                <option value="" disable selected>Seleccione</option>
                <option value="1">Compra en estación</option>
                <option value="2">Compra al mayor</option>
              </select>
            </td>
            </tr>
        

          </table>

        </div>

        <div class="derecha">
        <table>

        <tr>
        <td><span>Chofer:</span></td> 
        <td><input type="text" name="choferName" id="choferInp" class="requerido2" ></td>
        </tr>

        <tr>
        <td> <span>Placa:</span></td> 
        <td> <input type="text" name="placaName" id="placaInp" class="requerido2" ></td>
        </tr>

        <tr>
        <td><span>Monto:</span></td> 
        <td> <input type="text" name="montoName" id="montoInp" class="requerido2" ></td>
        </tr>

        <tr>
        <td><span>Fecha:</span></td> 
        <td><input type="date" value="${fecha_iso}" name="fechaName" id="fechaInp" class="requerido2" ></td>
        </tr>
        <tr>
        <td></td>
        <td><button id="botonCompra" type="button">Billete de la compra</button> </td>
        </tr>
        </table>
        
        </div>
        
      </div>

      </fieldset>


      <div class="emergente_btn">
      
        <button id="Modificar" type="button">Modificar</button>
      
      </div>

    </div>

      <script> 
    
      </script>

      `;
    

      ventanaEmergente.innerHTML = contenidoVentana;
      ventanaEmergente.style.display = 'block';

   

      const modificarBtn = document.getElementById("Modificar")
      selectData(contenidoVentana,  tabla)

      function modificarData (){

        modificarBtn.addEventListener('click', async function(evento) {

          modificarBtn.disabled = true

          const proveedorData = document.querySelector('input[name="proveedorName"]').value;
          const cedulaData    = document.querySelector('input[name="cedulaName"]').value;
          const cantidadData  = document.querySelector('input[name="cantidadName"]').value;
          const sitioEntrega  = document.querySelector('#sitioEntrega').value;
          const tipoCompra    = document.querySelector('#tipoCompra').value;
          const choferData    = document.querySelector('input[name="choferName"]').value;
          const placaData     = document.querySelector('input[name="placaName"]').value;
          const monotoData    = document.querySelector('input[name="montoName"]').value;
          const fechaData     = document.querySelector('input[name="fechaName"]').value;

           // Itera sobre los elementos de entrada
          let nombresMostrados = {
            'proveedorName': 'Por favor, ingrese un proveedor',
            'cedulaName'   : 'Por favor, ingrese la cedula del chofer',
            'cantidadName' : 'Por favor, ingrese la cantidad de combustieble',
            'sitioEntrega' : 'Por favor, seleccione el sitio de entrega',
            'tipoCompra'   : 'Por favor, seleccione el tipo de compra',
            'choferName'   : 'Por favor, ingrese el nombre del chofer',
            'placaName'    : 'Por favor, seleccione un destino',
            'montoName'    : 'Por favor, Ingrese la mercancia',
            'fechaName'    : 'Por favor, ingrese un monto de peaje',
            // Agrega más mapeos según sea necesario
          };

          // Selecciona todos los elementos de entrada con la clase "requerido"
          let inputs = document.querySelectorAll('input.requerido'+',select');

          let camposVacios = []; // Lista para almacenar los nombres de los campos vacíos

          // Itera sobre los elementos de entrada
          for (let i = 0; i < inputs.length; i++) {
            // Si el elemento de entrada está vacío...
              if (inputs[i].value === '') {
              // Obtiene el nombre mostrado del objeto, si existe, o usa el nombre del campo de entrada
              let nombreMostrado = nombresMostrados[inputs[i].name] || inputs[i].name;
              // Añade el nombre del campo vacío a la lista
              camposVacios.push(nombreMostrado);
            }
          }

          if (camposVacios.length > 0) {
            // Envía un mensaje al proceso principal con la lista de campos vacíos
            ipcRenderer.send('campos-vacios', camposVacios);
            setTimeout(() =>{ modificarBtn.disabled = false }, 2500)      
        } 

        else{
          modificarBtn.disabled = false






        }

        })

      }
      modificarData
    });
  })
}

module.exports = emergenteGasoil