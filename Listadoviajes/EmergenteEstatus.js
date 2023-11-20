const { ipcRenderer } = require('electron');





function modificarEstatusfunc(estatusEmergente,modificarEstatus, estatus, id_viaje, fila, Cedula_chofer){
    modificarEstatus.addEventListener('click', () => {  



      const contenidoEmergente = ` 
      
      <div id="ventana-actualizarestatus">
      <div class ="Menu">
     
          <button type="button" class="menubar-btn2" id="cerrarventanaModificar" name="Salir" ><i class="fas fa-times"></i></button>
       
          </div>
      <h2 class="Titulo">Modificar Estatus</h2>

      <label for="" style="margin-left: 7px;">Estado actual:</label>
      <span>${estatus}</span>
     
          <table id="reprogramarCondicion">
      <tbody>
  
    
        
      <tr>
          <td><label for="">Cambiar a estado: </label></td>
          <td> <select name="selectEstatus" class="requerido3"  id="selectEstatusViaje"><option disabled selected>Seleccione</option></select></td>
      </tr>

      <tr>
          <td></td>

       
          <td><select name="selectResultados"  id="selectResultados"><option disabled selected>Seleccione</option></select></td>
     </tr>
     <tr>
      <td><label for="">Fecha inicio de estado:</label></td>
      <td><input type="date" name="fecha" class="requerido3" id="inputFechaInicio"></td>
      </tr>
       
      <tr>
         <td> <label for="">Bultos</label></td>
         <td> <input type="number" name="" id="inputBultos"></td>
      </tr>
       </tbody>
       </table>

      <div class="emergente_btn"> 
          <button type="button" class="normalButton" id="saveButton" style="float: right;">Guardar</button>
      </div>


       </div>
       <div id="nuevoComprobanteDiv"></div>`;

      

      estatusEmergente.innerHTML = contenidoEmergente;

      
      document.getElementById('cerrarventanaModificar').addEventListener('click', function() {
        document.getElementById('ventana-actualizarestatus').style.display = 'none';
    });

   
   
    
    async function obtenerEstatus() {
        try {
      
          await sql.connect(config);
      
          const result = await sql.query('SELECT Id_estatus, Nombre FROM Estatusviaje where Id_estatus != 5');
      
          await sql.close();
      
          return result.recordset;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          throw error;
        }
      }
    
      async function GenerarEstatus() {
        try {
            const destino = await obtenerEstatus();
    
            let selectOptions = '<option value="" disabled selected>Seleccione</option>';
    
            destino.forEach((row) => {
                if (row.Id_estatus !== 7) {
                    selectOptions += `<option value="${row.Id_estatus}">${row.Nombre}</option>`;
                }
            });
    
            const selectHtml = `<select>${selectOptions}</select>`;
            document.getElementById('selectEstatusViaje').innerHTML = selectHtml ;
            return selectHtml;
        } catch (error) {
            console.error('Error al generar el select:', error);
            throw error;
        }
    }
    
      
      GenerarEstatus()
        .then((selectHtml) => {
          console.log('Select HTML generado:', selectHtml);
        
        })
        .catch((error) => {
          console.error('Error en la generación del select:', error);
      
        });
    
      //fin generar estatus

// Función para obtener las sedes según el tipo de sede
async function obtenerSedesTipo(tiposSede, excluirTipo) {
  try {
      const pool = await sql.connect(config); // Establecer la conexión

      // Convertir tiposSede a una cadena de números separados por comas
      const tiposSedeStr = tiposSede.join(',');

      // Realizar la consulta a la base de datos aquí y retornar el resultado
      let resultadoConsulta;
      if (excluirTipo) {
          resultadoConsulta = await pool.request()
              .input('tipos', sql.NVarChar, tiposSedeStr)
              .input('excluirTipo', sql.Int, excluirTipo)
              .query(`SELECT Codigo, Sede FROM Sedes WHERE Tiposede IN (${tiposSedeStr}) AND Tiposede != @excluirTipo`);
      } else {
          resultadoConsulta = await pool.request()
              .input('tipos', sql.NVarChar, tiposSedeStr)
              .query(`SELECT Codigo, Sede FROM Sedes WHERE Tiposede IN (${tiposSedeStr})`);
      }

      await pool.close(); // Cerrar la conexión
      return resultadoConsulta.recordset;
  } catch (error) {
      console.error('Error al obtener las sedes del tipo', tiposSede, ':', error);
      throw error;
  }
}

// Función para cargar las sedes según el tipo de estado seleccionado
async function cargarSedesPorTipoEstado(tiposSede, excluirTipo) {
  try {
      let sedes = [];
      const sedesTipo = await obtenerSedesTipo(tiposSede, excluirTipo);
      sedes = [...sedes, ...sedesTipo];

      let optionsHtml = '<option value="" disabled selected>Seleccione</option>';
      sedes.forEach((sede) => {
          optionsHtml += `<option value="${sede.Codigo}">${sede.Sede}</option>`;
      });

      document.getElementById('selectResultados').innerHTML = optionsHtml;
  } catch (error) {
      console.error('Error al cargar las sedes:', error);
  }
}

function generarRango(inicio, fin) {
  return Array.from({length: fin - inicio + 1}, (_, i) => inicio + i);
}

document.getElementById('selectEstatusViaje').addEventListener('change', async (event) => {
  const idEstadoSeleccionado = event.target.value;

  if (idEstadoSeleccionado === '6') {
      selectResultados.disabled = true;
      selectResultados.innerHTML = ''; 
  } else {
      selectResultados.disabled = false;

      if (idEstadoSeleccionado === '1') {
          const tiposSede = generarRango(1, 200); 
          await cargarSedesPorTipoEstado(tiposSede, 4);
      } else if (idEstadoSeleccionado === '2') {
          await cargarSedesPorTipoEstado([1]); 
      } else if (idEstadoSeleccionado === '3') {
          await cargarSedesPorTipoEstado([2]); 
      } else if (idEstadoSeleccionado === '4') {
          await cargarSedesPorTipoEstado([4]); 
      }

      if (idEstadoSeleccionado === '1') {
        const tiposSede = generarRango(1, 200); 
        await cargarSedesPorTipoEstado(tiposSede, 3);
    } else if (idEstadoSeleccionado === '2') {
        await cargarSedesPorTipoEstado([1]); 
    } else if (idEstadoSeleccionado === '3') {
        await cargarSedesPorTipoEstado([2]); 
    } else if (idEstadoSeleccionado === '4') {
        await cargarSedesPorTipoEstado([4]); 
    }
  }
});


// Agregar evento click al botón "Guardar" dentro de la ventana emergente

   const statusButton = document.getElementById('saveButton')

    statusButton.addEventListener('click', async (event) => {
      
     

    // if (event.target.classList.contains('normalButton')) {
  
      statusButton.disabled = true

    const idViaje = id_viaje;
    const nuevoEstatus = document.getElementById('selectEstatusViaje').value;
    const nuevaSede = document.getElementById('selectResultados').value;
    const nuevoBulto = document.getElementById('inputBultos').value;
    const registroFecha = document.getElementById('inputFechaInicio').value;
     
    let nombresMostrados = {
      'selectEstatus': 'Por favor, seleccion un estatus ',
      'fecha': 'Por favor, seleccione la fecha de inicio de estado',
    
 
      // Agrega más mapeos según sea necesario
    };
    let inputs = document.querySelectorAll('.requerido3');
    
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

        // Si hay campos vacíos...
        if (camposVacios.length > 0) {
            // Envía un mensaje al proceso principal con la lista de campos vacíos
            ipcRenderer.send('campos-vacios', camposVacios);

            setTimeout(() =>{
              statusButton.disabled = false
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
            statusButton.disabled = false
          }
        else{
          statusButton.disabled = false

    try {
      
    const pool = await sql.connect(config);
    
    
    const result = await pool.request()

    .input('idViaje', sql.Int, idViaje)
    .query(`SELECT 
    FORMAT(Fecha, 'yyyy-MM-dd') as FechaFormateada,
    Cod_Destino 
    FROM Viajes 
    WHERE Id_viaje = @idViaje`);

  let fechaInicio = result.recordset[0].FechaFormateada;
  const codDestino = result.recordset[0].Cod_Destino;

    const fecharequerimiento = new Date (fechaInicio);
    const fechacambioestatus = new Date (registroFecha);

  console.log('Fecha de requerimiento ' + fechaInicio); // Verifica la fecha de inicio
  
    // Obtén la duración esperada del viaje
    const result2 = await pool.request()
      .input('codDestino', sql.Int, codDestino)
      .query(`SELECT Dias FROM Tabladeviaticos WHERE Destino = @codDestino`);
  
    let diasEsperados = result2.recordset[0].Dias;
  
    console.log(diasEsperados); // Verifica diasEsperados
  
    // Si diasEsperados es un string, conviértelo a un número
    if (typeof diasEsperados === 'string') {
      diasEsperados = parseInt(diasEsperados);
    }
    
    console.log( registroFecha); // Verifica registroFecha
  
    // Calcula la diferencia de días
        

  // Ahora puedes restar las fechas
  const diffDias = fechacambioestatus.getTime() - fecharequerimiento.getTime();

  let diasTotal = Math.ceil(diffDias / (1000 * 3600 * 24)) + 1;

    console.log('dias restantes ' + diasTotal)
    

    const diasExtra = diasTotal - diasEsperados;
  
    console.log('los dias extras son' + diasExtra)


const result3 = await pool.request()
  .input('idViaje', sql.Int, idViaje)
  .query(`SELECT TOP 1 * FROM Comprobante_viajes WHERE Codigo_viaje = @idViaje ORDER BY Num_comprobante`);

let primerComprobante = result3.recordset[0];
const comprobante123 = primerComprobante.Num_comprobante;
const Fecha123 = primerComprobante.Fecha
const cedula = primerComprobante.Cedula
const cod_Destino123 = primerComprobante.Origen
const codigoViaje = primerComprobante.Codigo_viaje
const montoNormal= primerComprobante.Monto
console.log(montoNormal)


const result4 = await pool.request()
.input('idViaje', sql.Int, idViaje)
.query(`SELECT Cedula_chofer FROM Viajes WHERE id_viaje = @idViaje`);

let viajeData = result4.recordset[0];
const cedulaChofer = viajeData.Cedula_chofer;
console.log(cedulaChofer)

const result5 = await pool.request()
.input('cedulaChofer', sql.Int, cedulaChofer)
.query(`SELECT Nombre, Apellido FROM Empleados WHERE Cedula = @cedulaChofer`);

let empleadoData = result5.recordset[0];
const nombreEmpleado = empleadoData.Nombre;
const apellidoEmpleado = empleadoData.Apellido;
console.log(nombreEmpleado, apellidoEmpleado);

async function obtenerUltimatasa(){
  const pool = await consultar.connect();
 const sqlQuery2 = `SELECT Top 1(Tasa) AS Tasa FROM Historial_tasa order by id desc`;
const result2 = await pool.request().query(sqlQuery2)
const Tasa = result2.recordset[0].Tasa;


console.log ('Ultima tasa ', Tasa)
return Tasa;
 }obtenerUltimatasa()

 const Tasa =   await obtenerUltimatasa({});  
 const resultado = 15 * Tasa;



const montoComprobanteAdicionales = montoNormal * 0.3 + resultado
const montoUsd = montoComprobanteAdicionales / Tasa

if (nuevoEstatus == 6 && diasExtra > 0 && Number.isInteger(diasExtra)) {
  ipcRenderer.send('comprobanteAdicional', diasExtra)
// if (nuevoEstatus == 6) {


  for(let i = 0; i < diasExtra ; i++) {

    console.log('el valor de i es ' + i)
    await pool.request()
      .input('Codigo_viaje', sql.Int, codigoViaje)
      .input('Fecha', sql.DateTime, Fecha123)
      .input('Origen', sql.Int, cod_Destino123)
      .input('Cedula', sql.Int, cedula)
      .input('Monto', sql.Float, montoComprobanteAdicionales) 
      .input('Beneficiario', sql.NVarChar, `${nombreEmpleado} ${apellidoEmpleado}`)
      .input('Monto_Usd', sql.Float, montoUsd)
      .query(`INSERT INTO Comprobante_viajes (Codigo_viaje, Fecha, Origen, Descripcion, Monto, Beneficiario, Cedula, Tipocomprobante, Monto_Usd) VALUES (@Codigo_viaje, @Fecha, @Origen, CONCAT('Pago por complemento de gasto por adicional a', (SELECT Sede FROM Sedes WHERE Codigo = @Origen)), @Monto, @Beneficiario, @Cedula, '1', @Monto_Usd)`);
    console.log('insert');
    }
  } 
    
  
  
  
      // Realizar el update en la tabla Viajes
      await pool.request()
      .input('idViaje', sql.Int, idViaje)
      .input('nuevoEstatus', sql.Int, nuevoEstatus)
      .input('nuevaSede', sql.Int, nuevaSede)
      .input('nuevoBulto', sql.Int, nuevoBulto)
      .input('registroFecha', sql.DateTime, registroFecha)
      .query(`UPDATE Viajes SET Estatus = @nuevoEstatus,  Bultos = @nuevoBulto, Fecha_llegada = (CASE WHEN @nuevoEstatus = 6 THEN @registroFecha ELSE Fecha_llegada END) WHERE Id_viaje = ${idViaje}`);
      console.log('1')
      // Insertar en la tabla de historial
      await pool.request()
      .input('codigoViaje', sql.Int, idViaje)
      .input('codigoEstado', sql.Int, nuevoEstatus)
      .input('sede', sql.Int, nuevaSede)
      .input('fecha', sql.DateTime, registroFecha)
      .input('bultos', sql.Int, nuevoBulto)
      .query(`INSERT INTO Cambio_estatusviaje (Codigo_viaje, Codigo_estado, Sede, Fecha, Bultos) VALUES (${idViaje}, @codigoEstado, (CASE WHEN @codigoEstado = 6  THEN (SELECT Cod_Destino FROM Viajes WHERE Id_viaje = ${idViaje}) ELSE @sede END), @fecha, @bultos)`);
      console.log('2')


      // Verificar si el valor d  e nuevoEstatus es igual a 6

      const placa = fila.querySelector('td:nth-child(7)').textContent;
      const placacava = fila.querySelector('td:nth-child(8)').textContent;
      const placaremolque = fila.querySelector('td:nth-child(9)').textContent;
      const Ayudante = fila.querySelector('td:nth-child(14)').textContent;





      if (nuevoEstatus === '6') {
        await pool.request()
        .query(`Update Empleados set estatus = 1 where Cedula = ${Cedula_chofer} or Nombre = '${Ayudante}'; Update Vehiculos set Ubicacion =1 where Placa ='${placa}' or Placa ='${placacava}' or Placa ='${placaremolque}'`);
        console.log('3')


      }


      console.log('Update y registro en historial realizados correctamente');
    } catch (error) {
      console.log('error', error);
    } 
    ipcRenderer.send('datosModificados')


    setTimeout(() =>{
      location.reload()
    }, 1000)

  }
  }
// }
});

    });
  }

  module.exports = modificarEstatusfunc