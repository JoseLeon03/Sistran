


function emergenteNuevoayudante(nuevoAyudante, nuevoAyudanteDiv, id_viaje){



    nuevoAyudante.addEventListener('click',  () => {
    const modificarAyudante = `
      <div class ="Menu">
        <button type="button" class="menubar-btn2" id="botonCerrar4"><i class="fas fa-times"></i></button>
      </div>
      <h2>Nuevo Ayudante</h2>
      <fieldset>
        <table id="tabladeAyudantes">
        <tr>
            <td>Cedula</td>
            <td><input type="number" name="cedula" id="cedulaAyudante" class="requerido"></td>
          </tr>
          <tr>
            <td>Nombre y apellido</td>
            <td><input type="text" name="nombre" id="nombresInput"  readonly></td>
          </tr>
          <tr>
            <td>Viatico</td>
            <td><input type="number" name="viatico" id="viaticoAyudante" class="requerido"></td>
          </tr>
        </table>
      </fieldset>
      <div class="emergente_btn">
        <button type="button" id="modificar_ayudante" class="boton">Guardar</button>
      </div>`;
    nuevoAyudanteDiv.innerHTML = modificarAyudante;
    nuevoAyudanteDiv.style.display = 'block';
  
    document.getElementById('botonCerrar4').addEventListener('click', function() {
      document.getElementById('generar-ayudante').style.display = 'none';
  });
  
    // Eliminar cualquier controlador de eventos click existente del botón guardar
    const guardar = document.getElementById('modificar_ayudante');
    guardar.replaceWith(guardar.cloneNode(true));
  
    // Agregar un nuevo controlador de eventos click al botón guardar
    document.getElementById('modificar_ayudante').addEventListener('click', async () => {
      // Obtener los valores de los elementos input
      const viaticoAyudante = document.getElementById('viaticoAyudante').value;
      const cedulaAyudante = document.getElementById('cedulaAyudante').value;
      const nombresInput = document.getElementById('nombresInput').value;
      const nombreAyudante = nombresInput.split(' ')[0];
  
      console.log(id_viaje)

      let nombresMostrados = {
        'viatico': 'Por favor, ingrese la cantidad de viatico',
        'cedula': 'Por favor, introduza una cedula'
        // Agrega más mapeos según sea necesario
      };
  
          const ConsultaEmpleado = `SELECT count(*) as count FROM empleados  where cedula  = '${cedulaAyudante}' and Estatus = 1 and Activo = 1`;
          const pool = await consultar;
          const result = await pool.request().query(ConsultaEmpleado);
      
          const count = result.recordset[0].count;
  
      let inputs = document.querySelectorAll('.requerido');
  
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
       else if(count === 0){
  
          console.log(count)
          ipcRenderer.send('choferNodisponible')
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
        
  
        // Ejecutar la consulta SQL para actualizar la tabla Viajes
        try {
          const pool = await consultar.connect();
          const sqlQuery = `
            UPDATE Viajes   SET Viatico_ayudante = ${viaticoAyudante}, Cedula_ayudante = ${cedulaAyudante}, Nombre_Ayudante = '${nombreAyudante}'
            WHERE Id_viaje = ${id_viaje};
            
          `;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro actualizado en la base de datos:', result);
        } catch (error) {
          console.log('Error al actualizar el registro:', error);
      }  let cedulaAyudanteAntiguo;

      try {
        const pool = await consultar.connect();
        const sqlQuery = `
          SELECT Cedula_ayudante
          FROM Viajes
          WHERE Id_viaje = ${id_viaje}
        `;
        const result = await pool.request().query(sqlQuery);
        if (result.recordset.length > 0) {
          cedulaAyudanteAntiguo = result.recordset[0].Cedula_ayudante;
        }
      } catch (error) {
        console.log('Error al obtener la cédula del ayudante antiguo:', error);
      }
  
      // Ejecutar la consulta SQL para actualizar la columna Estatus en la tabla Empleados
      try {
        const pool = await consultar.connect();
        const sqlQuery1 = `
          UPDATE Empleados
          SET Estatus = 1
          WHERE Cedula = ${cedulaAyudanteAntiguo}
        `;
        const result1 = await pool.request().query(sqlQuery1);
        console.log('Registro actualizado en la base de datos:', result1);
  
        const sqlQuery2 = `
          UPDATE Empleados
          SET Estatus = 2
          WHERE Cedula = ${cedulaAyudante}
        `;
        const result2 = await pool.request().query(sqlQuery2);
        console.log('Registro actualizado en la base de datos:', result2);
      } catch (error) {
        console.log('Error al actualizar el registro:', error);
      }
      
      ipcRenderer.send('registroExitoso')
     } location.reload();
     } 
    });
  
    document.getElementById('cedulaAyudante').addEventListener('input', async () => {
      // Obtener el valor del elemento input
      const cedulaAyudante = document.getElementById('cedulaAyudante').value;
  
      // Verificar si el valor del elemento input está vacío
      if (cedulaAyudante === '') {
        // Borrar el contenido del elemento input con id nombresInput
        document.getElementById('nombresInput').value = '';
        return;
      }
  
      // Ejecutar la consulta SQL para buscar el registro en la tabla Empleados
      try {
        const pool = await consultar.connect();
        const sqlQuery = `
          SELECT Nombre, Apellido
          FROM Empleados
          WHERE Cedula = ${cedulaAyudante}
        `;
        const result = await pool.request().query(sqlQuery);
        if (result.recordset.length > 0) {
          // Asignar el valor de las columnas Nombre y Apellido al elemento input correspondiente
          document.getElementById('nombresInput').value =
            `${result.recordset[0].Nombre} ${result.recordset[0].Apellido}`;
        } else {
          // Mostrar un mensaje si no se encuentra un registro con la cédula ingresada
          document.getElementById('nombresInput').value = 'Cédula no encontrada';
        }
      } catch (error) {
        console.log('Error al buscar el registro:', error);
      }
  
    
    });
  });
        }

        module.exports = emergenteNuevoayudante