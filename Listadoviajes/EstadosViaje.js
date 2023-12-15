const track = require('../Utility/Track')

function estadosViaje(id_viaje){

    
/***************************************Codigo para modificar la fecha de llegada******************************************************* */
const modificarFechallegada = document.getElementById("modificarFechallegada");

modificarFechallegada.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

      const nuevaFechallegada = document.querySelector('#fechaLlegadanueva').value;
      if( nuevaFechallegada == ""){ /*Envia un mensaje que indica  que el campo esta vacio */
      
          ipcRenderer.send('validarCampo')
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

    // Utiliza los valores en tus consultas SQL
    ipcRenderer.send('dato')
      // console.log('golita') 
      const arg = await new Promise((resolve) => {
        ipcRenderer.on('user-data', (event, arg) => {               
          resolve(arg)
        });
      })
      
      const usuario = arg.usuario
      const descripcion =` Se ha modificado la fecha de llegada del viaje con el id ${id_viaje}`       

      track(descripcion , usuario)
      await modificarFechallegadafunction({nuevaFechallegada});
          

    // Limpia los campos del formulario
  }
});


async function modificarFechallegadafunction(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `Update  Viajes set Fecha_llegada = '${datos.nuevaFechallegada}' where Id_viaje = ${id_viaje}`;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
       ipcRenderer.send('datosModificados');
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}
/******************Fin de codigo para modificar la fecha de llegada ************************/


/***************************************Codigo para modificar la fecha de Salida******************************************************* */
const modificarFechasalida = document.getElementById("modificarFechasalida");

modificarFechasalida.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

      const nuevaFechaSalida = document.querySelector('#fechaSalidanueva').value;

      if( nuevaFechaSalida == ""){ /*Envia un mensaje que indica  que el campo esta vacio */
      
          ipcRenderer.send('validarCampo')
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
    // Utiliza los valores en tus consultas SQL
    ipcRenderer.send('dato')
      // console.log('golita') 
      const arg = await new Promise((resolve) => {
        ipcRenderer.on('user-data', (event, arg) => {               
          resolve(arg)
        });
      })
      
      const usuario = arg.usuario
      const descripcion =` Se ha modificado la fecha de salida del viaje con el id ${id_viaje}`       

      track(descripcion , usuario)
      await modificarFechasalidafunction({ nuevaFechaSalida});
      document.getElementById('fechaSpan').innerHTML = `${nuevaFechaSalida}`
    // Limpia los campos del formulario
}});


async function modificarFechasalidafunction(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `Update  Viajes  set Fecha = '${datos.nuevaFechaSalida}' where Id_viaje = ${id_viaje}`;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
       ipcRenderer.send('datosModificados');
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}

/******************Fin de codigo para modificar la fecha de llegada ************************/


}


 function llenarTablaEstados(idViaje) {
        
    consultar.connect().then(() => {
      const request = new sql.Request(consultar);
      request.query(`
      SELECT ce.Cod_estatus,
      ev.Nombre AS Nombre_Estatus,
      (SELECT Sede FROM Sedes s WHERE s.Codigo = ce.Sede) AS Nombre_Sede,
      Format(ce.Fecha, 'dd/MM/yyyy') AS Fecha,
      ce.Bultos
      FROM Cambio_estatusviaje ce
      JOIN EStatusviaje ev ON ce.Codigo_estado = ev.Id_estatus
      WHERE ce.Codigo_viaje = ${idViaje}
      ORDER BY ce.Fecha DESC, ce.Cod_estatus DESC;
      `).then((result) => {
        const tabla = document.querySelector('#listadoEstadosviajes tbody');
        tabla.innerHTML = ''; // Limpiar la tabla antes de agregar datos

        result.recordset.forEach((fila) => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${fila.Cod_estatus}</td>
            <td>${fila.Nombre_Estatus}</td>
            <td>${fila.Nombre_Sede}</td>
            <td>${fila.Fecha}</td>
            <td>${fila.Bultos}</td>
          `;
          tabla.appendChild(tr);
        });

        const fechas = result.recordset.map(fila => {
          const [dia, mes, anio] = fila.Fecha.split('/');
          return new Date(anio, mes - 1, dia);
        });
        const fechaMasReciente = fechas.reduce((a, b) => (a > b) ? a : b);
        
        // Formatear la fecha como una cadena en el formato 'dd/MM/yyyy'
        const dia = fechaMasReciente.getDate().toString().padStart(2, '0');
        const mes = (fechaMasReciente.getMonth() + 1).toString().padStart(2, '0');
        const anio = fechaMasReciente.getFullYear();
        const fechaFormateada = `${dia}/${mes}/${anio}`;
        
        document.querySelector('h4').textContent = fechaFormateada;
        
      }).catch((error) => {
        console.error('Error al obtener datos desde la base de datos:', error);
      })
    }).catch((error) => {
      console.error('Error al conectar a la base de datos:', error);
    });

  }

 module.exports= {estadosViaje, llenarTablaEstados}