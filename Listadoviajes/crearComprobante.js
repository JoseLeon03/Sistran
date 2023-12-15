const obtenerTasa = require('../Utility/obtenerTasa.js')
function nuevoComprobantefunc(nuevoComprobante,contenedor,origen, id_viaje, Cedula_chofer,Nombredelchofer, Apellido, contenedor2){

    const idViaje = id_viaje; 
    nuevoComprobante.addEventListener('click', () => {
        const contenidoHTML = `
        <div id="contenedor-emergente">
          <div id="comprobantes-adicionales">
            <div class ="Menu">
                <button type="button" class="menubar-btn2" id="botonCerrar5"><i class="fas fa-times"></i></button>
            </div>
            <h2>Comprobante adicional</h2>
            <fieldset>
              <div id="Concepto">
                  <label for="" style="margin-top: 20px;">Concepto:</label><br>
                  <textarea name="concepto" id="concepto" cols="30" rows="10" class="comprobante"></textarea></div>
                  <br><br>
                  <label for="">Tipo de comprobante</label>
                  <select name="tipoComprobante" id="tipoComprobante" class="requerido2 "><option value="" ></option></select>
                  <br><br>
                  <label for="">Monto Bs.</label>
                  <input type="number" id="monto" class="requerido2 " name="monto">
                      <br><br>
                  <div class="emergente_btn">
                      <button type="button" id="crear_comprobante" class="boton" >Guardar</button>
                      </div>
          </fieldset>
              </div>
          </div>`;
      
        // Agrega el contenido HTML al elemento
        contenedor.innerHTML = contenidoHTML;
        // Muestra el elemento con display: block
        contenedor.style.display = 'block';
      
        document.getElementById('botonCerrar5').addEventListener('click', function() {
          document.getElementById('nuevoComprobanteDiv').style.display = 'none';
        });
      
          /*Select de Tipo de comprobante*/
      async function obtenerTipoComprobante() {
        try {
      
          await sql.connect(config);
      
          const result = await sql.query('SELECT Id, Descripcion FROM TipoComprobante');
      
          await sql.close();
      
          return result.recordset;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          throw error;
        }
      }
      
      
      async function GenerarTipoComprobante() {
        try {
      
          const destino = await obtenerTipoComprobante();
      
          let selectOptions = '<option value="" disabled selected>Seleccione</option>';
      
          destino.forEach((row) => {
            selectOptions += `<option value="${row.Id}">${row.Descripcion}</option>`;
          });
      
        
          const selectHtml = `<select>${selectOptions}</select>`;
          document.getElementById('tipoComprobante').innerHTML = selectHtml ;
          return selectHtml;
        } catch (error) {
          console.error('Error al generar el select:', error);
          throw error;
        }
      }
      
      GenerarTipoComprobante()
        .then((selectHtml) => {
          console.log('Select HTML generado:', selectHtml);
        
        })
        .catch((error) => {
          console.error('Error en la generación del select:', error);
      
        });
      /*Fin select de destino*/
      
      
        const crearComprobante = document.getElementById('crear_comprobante');
         nuevoComprobantefunc(crearComprobante)
        crearComprobante.addEventListener('click', async () => {
        // Obtener los valores de los elementos del formulario
      
            crearComprobante.disabled = true
      
            const concepto        = document.getElementById('concepto').value;
            const monto           = document.getElementById('monto').value;
            const tipoComprobante = document.getElementById('tipoComprobante').value;
            const fecha           = new Date().toISOString().slice(0, 19).replace('T', ' ');
      
      
            const pool =  await consultar;
      
            const result = await  pool.request().query(`SELECT Codigo from Sedes where sede = '${origen}'`);
      
            const Informacion = result.recordset[0];
      
            const sede = Informacion.Codigo;
      
      
      
            let nombresMostrados = {
              'concepto'       : 'Por favor, ingrese un concepto para el comprobante ',
              'monto'          : 'Por favor, ingrese el monto del comprobante',
              'tipoComprobante': 'Por favor, seleccione un tipo de comprobante'
            
      
              // Agrega más mapeos según sea necesario
            };
      
            let inputs = document.querySelectorAll('.requerido2 ,.comprobante');
      
            let camposVacios = []; 
      
            for (let i = 0; i < inputs.length; i++) {
              // Si el elemento de entrada está vacío...
              if (inputs[i].value === '') {
                  // Obtiene el nombre mostrado del objeto, si existe, o usa el nombre del campo de entrada
                  let nombreMostrado = nombresMostrados[inputs[i].name] || inputs[i].name;
                  // Añade el nombre del campo vacío a la lista
                  camposVacios.push(nombreMostrado);
              }
            }
      
            // Si hay campos vacíos...
            if (camposVacios.length > 0) {
                // Envía un mensaje al proceso principal con la lista de campos vacíos
                ipcRenderer.send('campos-vacios', camposVacios);
                setTimeout(() =>{
                  crearComprobante.disabled = false
                     }, 2500)
                
            } 
      
          else{
            ipcRenderer.send('modification-confirm-dialog')
            const index = await new Promise((resolve) => {
              ipcRenderer.once('modification-dialog-result', (event, index) => {
                resolve(index)
              })
            })
      
            if (index === 1) {
              // El usuario hizo clic en "no"
              crearComprobante.disabled = false
            }
            else {
      
          // Generar el nuevo comprobante utilizando los valores obtenidos
          crearComprobante.disabled = false
              try {
                obtenerTasa();
                
                 const Tasa =   await obtenerTasa({}); 
                
               
                const montoUsd = monto / Tasa;
      
                const pool = await consultar.connect();
                const sqlQuery = `
                  INSERT INTO Comprobante_viajes (Codigo_viaje, Monto, Origen, Descripcion, Tipocomprobante, Fecha,
                    Beneficiario, Cedula, Monto_usd) Values (${id_viaje}, ${monto}, ${sede} , '${concepto}', 
                    '${tipoComprobante}', '${fecha}', '${Nombredelchofer} ${Apellido}', ${Cedula_chofer} , ${montoUsd})
                    ;
                `;
                await pool.request().query(sqlQuery);
                ipcRenderer.send('registroExitoso');
                const tablasComprobante = require('./TablaComprobantes.js'); 
                tablasComprobante(contenedor2, numeroComprobante, idViaje)
                document.getElementById('botonCerrar5').click()
      
              } catch (err) {
                console.error(err);
              }  
      
            }
          }   
         
        });
      });
}
module.exports = nuevoComprobantefunc
