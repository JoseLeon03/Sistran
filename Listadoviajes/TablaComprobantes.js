
   
function tablasComprobante(contenedor2,numeroComprobante , id_viaje){



  function llenarTablaComprobantes(idViaje) {  

   
    consultar.connect().then(() => {
      const request = new sql.Request(consultar);
      request.query(`
        SELECT Num_comprobante, Descripcion, format ( Fecha, 'dd/MM/yyyy') as Fecha, Monto, Beneficiario from Comprobante_viajes WHERE Codigo_viaje= ${idViaje} order by Num_comprobante asc; 
      `).then((result) => {
        const tabla = document.querySelector('#listadoComprobantesviaje tbody');
        tabla.innerHTML = ''; // Limpiar la tabla antes de agregar datos
       const Comprobantes = result.recordset.forEach((fila) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${fila.Num_comprobante}</td>
            <td>${fila.Descripcion}</td>
            <td>${fila.Fecha}</td>
            <td>${fila.Monto}</td>
            <td>${fila.Beneficiario}</td>
          `;
      
          tabla.appendChild(tr);
      
          // Agregar controlador de eventos a cada elemento td
          tr.querySelectorAll('td').forEach((td) => {
            td.addEventListener('click', () => {
              numeroComprobante = fila.Num_comprobante;
  
              var fecha_array = fila.Fecha.split("/"); // Devuelve ["30", "08", "2023"]
              var fecha_iso = fecha_array.reverse().join("-"); 
      
              // Mostrar la ventana emergente al hacer clic en el elemento td
              const modificarComprobantes = `
                  <div class ="Menu">
                    <button type="button" class="menubar-btn2" id="botonCerrar3"><i class="fas fa-times"></i></button>
                  </div>
                  <h2 class="Titulo">Modificar Comprobante</h2>
                  <fieldset>
                    <label for="">Beneficiario: </label>
                    <span>${fila.Beneficiario}</span>
  
                    <label for="" style="margin-left: 120px;">Número</label>
                    <span >${fila.Num_comprobante}</span>
                  </fieldset>
  
                  <fieldset class="divComprobantes">
                    <div class="descripcionComprobantes">
                      <label for="">Descripción</label>
                      <br>
                      <textarea name="descripcion" id="descripcion" cols="30" rows="10" class="requerido4">${fila.Descripcion}</textarea>
                    </div>
                    <br>
  
                    <label for="">Fecha</label>
                    <input type="date" id="fecha" name="fecha" class="requerido4" value="${fecha_iso}">
                    <label for="" style="margin-left: 10px;">Monto</label>
                    <input type="number" name="monto" id="monto" class="requerido4"value="${fila.Monto}">
                  </fieldset>
  
                  <button type="button" class="normalButton" id="reImprimir2" style="margin-top: 20px;">Re-imprimir</button>
        
                  <div class="emergente_btn"> 
                  
                    <button type="button" class="normalButton" id="guardar" >Guardar</button>
                  </div>
  
                `;
                // <button type="button" id="Anular2" class="redButton"> Anular comprobante</button>  
              contenedor2.innerHTML = modificarComprobantes;
  
              document.getElementById('ventana-modificarComprobante').style.display = 'block';
  
              document.getElementById('botonCerrar3').addEventListener('click', function() {
                document.getElementById('ventana-modificarComprobante').style.display = 'none';
            });

            const botonImprimir = document.querySelector('#reImprimir2');

            // Añade un escuchador de eventos para el evento de clic.
            botonImprimir.addEventListener('click', async () => {
              // Usa la función consultar para obtener el listado de viajes.
              // Cuando el botón sea clickeado, genera el PDF.
              const generarComprobante = require ('../Reqtransporte/GenerarComprobante')
            
              await generarComprobante({numeroComprobante})
            
              // Aquí puedes guardar el PDF en un archivo, enviarlo a través de una respuesta HTTP, etc.
            });

            // const anularComprobante = document.getElementById("Anular2");

            // anularComprobante.addEventListener('click', async (evento) => {
            //     evento.preventDefault(); 
             
            //     ipcRenderer.send('elimination-confirm-dialog', numeroComprobante)
                 
            //     const index = await new Promise((resolve) => {
            //       ipcRenderer.once('elimination-dialog-result', (event, index) => {
            //         resolve(index)
            //       })
            //     })
                
            //     if (index === 1) {
               
            //     }
            //     else{


            //         try {
            //             const pool = await consultar.connect();
            //             const sqlQuery = `Delete comprobante_viajes where Num_comprobante = ${numeroComprobante}`;
            //             const result = await pool.request().query(sqlQuery);
            //             console.log('Registro eliminado de la base de datos:', result);
            //         } catch (error) {
            //             console.log('Error al eliminar el registro:', error);
            //         }
                    
            //         ipcRenderer.send('datosEliminados');
            //         llenarTablaComprobantes(idViaje)

            //     }
            // });



              const guardar = document.getElementById('guardar');
              guardar.replaceWith(guardar.cloneNode(true));
          
              // Agregar un nuevo controlador de eventos click al elemento guardar
              document.getElementById('guardar').addEventListener('click', async () => {
                // Obtener los valores de los elementos textarea e input
                const descripcion = document.getElementById('descripcion').value;
                const fecha = document.getElementById('fecha').value;
                const monto = document.getElementById('monto').value;

                async function obtenerUltimatasa(){
                  const pool = await consultar.connect();
                 const sqlQuery2 = `SELECT Top 1(Tasa) AS Tasa FROM Historial_tasa order by id desc`;
                const result2 = await pool.request().query(sqlQuery2)
                const Tasa = result2.recordset[0].Tasa;
                
                console.log ('Ultima tasa ', Tasa)
                return Tasa;
                 }obtenerUltimatasa()
                
                 const Tasa =   await obtenerUltimatasa({});  
                 const montoUsd = monto / Tasa;
  
                let nombresMostrados = {
                  'descripcion': 'Por favor, ingrese un nombre para la sede ',
                  'monto': 'Por favor, seleccione un tipo de sede',
                  'fecha': 'Por favor ingrese la fecha de hoy'       
                  // Agrega más mapeos según sea necesario
                };
  
                let inputs = document.querySelectorAll('.requerido4');
                let camposVacios = [];
  
  
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
    
            // Si hay campos vacíos...
            if (camposVacios.length > 0) {
                // Envía un mensaje al proceso principal con la lista de campos vacíos
                ipcRenderer.send('campos-vacios', camposVacios);
                
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
              }
               else {
  
              
                    // Ejecutar la consulta SQL para actualizar la tabla Comprobante_viajes
                    try {
                      const pool = await consultar.connect();
                      const sqlQuery = `
                        UPDATE Comprobante_viajes
                        SET Descripcion = '${descripcion}', Fecha = '${fecha}', Monto = ${monto}, Monto_Usd = ${montoUsd}
                        WHERE Num_comprobante = ${numeroComprobante}
                      `;
                      const result = await pool.request().query(sqlQuery);
                      console.log('Registro actualizado en la base de datos:', result);
                    } catch (error) {
                      console.log('Error al actualizar el registro:', error);
                  } ipcRenderer.send('datosModificados')
                  llenarTablaComprobantes(idViaje)
                 } 
                }
                
              });
              return Comprobantes

            });




            
          });
     

        });
  
        if (result.recordset.length > 0) {
          const firstRow = result.recordset[0];
          document.querySelector('#tab3 fieldset span:nth-of-type(1)').textContent = firstRow.Num_comprobante;
          document.querySelector('#tab3 fieldset span:nth-of-type(2)').textContent = firstRow.Fecha;
          document.querySelector('#tab3 fieldset span:nth-of-type(3)').textContent = firstRow.Descripcion;
          document.querySelector('#tab3 fieldset span:nth-of-type(4)').textContent = firstRow.Monto;
        }
      }).catch((error) => {
        console.error('Error al obtener datos desde la base de datos:', error);
      })
    }).catch((error) => {
      console.error('Error al conectar a la base de datos:', error);
    });

  }
  
  const idViaje = id_viaje; 
  llenarTablaComprobantes(idViaje);

        }

        module.exports = tablasComprobante