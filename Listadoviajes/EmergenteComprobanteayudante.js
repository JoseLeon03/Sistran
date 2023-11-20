
function emergenteComprobanteayudante(comprobanteAyudante, comprobanteAyudanteDiv, idViaje, origen){

    comprobanteAyudante.addEventListener('click', async () => {
      
      const pool =  await consultar;

  const result = await  pool.request().query(`SELECT Codigo from Sedes where sede = '${origen}'`);

  const Informacion = result.recordset[0];

  const sede = Informacion.Codigo;



    console.log(idViaje)
      const contenidoComprobante = `
    
      <div class ="Menu">
               
      <button type="button"  class="menubar-btn2" id="botonCerrar2"><i class="fas fa-times"></i></button>
    
      </div>
    
    <h2>Nuevo comprobante</h2>
      <fieldset>
          <table id="tabladeAyudantes-comprobante">
          <tr>
          <td>Seleccionar Ayudante</td>
          <td><Select id="selectAyudante" class="requerido5" name="ayudante"></Select></td>
      </tr>
                  <td>Descripcion</td>
                  <td><textarea name="descripcion" id="descripcion" cols="30" rows="10" class="requerido5"></textarea></td>
              </tr>
             
              <tr>
                  <td>Tipo de comprobante</td>
                  <td><select name="tipoComprobante" id="selectComprobante" class="requerido5"><option value=""></option></select></td>
              </tr>
              
              <tr>
                  <td>Monto</td>
                  <td><input type="number" id="monto" class="requerido5" name="monto"></td>
              </tr>
    
          </table>
          
    
      </fieldset>
      <div class="emergente_btn">
          <button type="button" id="comprobanteAyudantebtn" class="boton" >Guardar</button>
          </div> `;
    
          comprobanteAyudanteDiv.innerHTML = contenidoComprobante;
    
          comprobanteAyudanteDiv.style.display = 'block';
    
    
        document.getElementById('botonCerrar2').addEventListener('click', function() {
          document.getElementById('generar-comprobanteAyudante').style.display = 'none';
      });
       
    
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
          document.getElementById('selectComprobante').innerHTML = selectHtml ;
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
    
    
        async function obtenerAyudante() {
          try {
            await sql.connect(config);
            // Agrega la columna Apellido a la consulta SQL
            const result = await sql.query('SELECT Cedula, Nombre, Apellido FROM Empleados Where Estatus = 1 and Activo = 1');
            await sql.close();
            return result.recordset;
          } catch (error) {
            console.error('Error al obtener los datos:', error);
            throw error;
          }
        }
        
        async function GenerarAyudante() {
          try {
            const destino = await obtenerAyudante();
            let selectOptions = '<option value="" disabled selected>Seleccione</option>';
            destino.forEach((row) => {
              // Agrega el Apellido al lado del Nombre en las opciones del select
              selectOptions += `<option value="${row.Cedula}">${row.Nombre} ${row.Apellido}</option>`;
            });
            const selectHtml = `<select>${selectOptions}</select>`;
            document.getElementById('selectAyudante').innerHTML = selectHtml ;
            return selectHtml;
          } catch (error) {
            console.error('Error al generar el select:', error);
            throw error;
          }
        }
        
        GenerarAyudante()
          .then((selectHtml) => {
            console.log('Select HTML generado:', selectHtml);
          })
          .catch((error) => {
            console.error('Error en la generación del select:', error);
          });
    
       
          const modificarComprobante = document.getElementById('comprobanteAyudantebtn');
    
          modificarComprobante.addEventListener('click', async () => {
            const descripcion     = document.getElementById('descripcion').value;
            const monto           = document.getElementById('monto').value;
            const tipoComprobante = document.getElementById('selectComprobante').value;
            const cedula          = document.getElementById('selectAyudante').value;
          
    
            let nombresMostrados = {
              'descripcion'    : 'Por favor, ingrese la descripción del comprobante ',
              'monto'          : 'Por favor, ingrese el monto del comprobante',
              'tipoComprobante': 'Por favor, seleccione un tipo de comprobante',
              'ayudante'       : 'Por favor, seleccione un ayudante',
    
              // Agrega más mapeos según sea necesario
            };
            let inputs = document.querySelectorAll('.requerido5');
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
                
            } 
            
            else{
    
              ipcRenderer.send('show-confirm-dialog')
              const index = await new Promise((resolve) => {
                ipcRenderer.once('confirm-dialog-result', (event, index) => {
                  resolve(index)
                })
              })
            
              if (index === 1) {
                // El usuario hizo clic en "no"
              }
               else {
    
    
            try {
              await sql.connect(config);
              // Obtener el Nombre y Apellido del beneficiario a partir de la Cedula
              const result = await sql.query(`SELECT Nombre, Apellido FROM Empleados WHERE Cedula = '${cedula}'`);
              const beneficiario = `${result.recordset[0].Nombre} ${result.recordset[0].Apellido}`;
              // Obtener la fecha actual del sistema
              const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
              const sqlQuery = `
                INSERT INTO Comprobante_viajes (Codigo_viaje, Monto, Origen, Descripcion, Tipocomprobante, Beneficiario, Cedula, Fecha) Values (${idViaje}, ${monto}, ${sede}, '${descripcion}', ${tipoComprobante}, '${beneficiario}', ${cedula}, '${fecha}')
                SELECT TOP 1 Codigo_viaje, ${monto}, Origen, '${descripcion}', '${tipoComprobante}', '${beneficiario}', '${cedula}', '${fecha}' FROM Comprobante_viajes WHERE Codigo_viaje = ${idViaje};
              `;
              await sql.query(sqlQuery);
              console.log('Insert realizado con éxito');
            } catch (err) {
              console.error(err);
            }} location.reload()
               ipcRenderer.send('registroExitoso')
          }});

          
    
    
        });
      }
module.exports = emergenteComprobanteayudante;

