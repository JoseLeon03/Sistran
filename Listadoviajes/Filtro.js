

const obtenerListados = require('./Listadoviajes.js');

var input1 = document.getElementById("cedula");
var input2 = document.querySelector('#placaVehiculo');
var input3 = document.querySelector('#placaCava');
var input4 = document.querySelector('#placaRemolque');
var input5 = document.querySelector('#inp_ayudante');
var inputFechaAnterior = document.querySelector('#fechaAnterior');
var inputFechaPosterior = document.querySelector('#fechaPosterior');

// Definir la función filtrarViajes
const filtrarViajes = (listado, filterValues) => {
    // Aplica el filtro a la lista de viajes
    return listado.filter((viaje) => {
       
                 // Aplica el filtro a la lista de viajes
    return listado.filter((viaje) => {
        // Aquí va la lógica de tu filtro
      

        // Actualizar la tabla para mostrar solo las filas que coinciden con los valores del filtro
        renderListadosTable(listado.filter((listado) => {
          const filterValues = {
            Cedula_v: input1.value,
            Placa_v: input2.value,
            Placa2_v: input3.value,
            Placa3_v: input4.value,
            Nombreayu_v: input5.value,
            Estatus_v: selectEstados.value,
            FechaAnterior_v: inputFechaAnterior.value,
            FechaPosterior_v: inputFechaPosterior.value,
            Sede2_v: Sedes.value,
        };
          // Verificar si todos los valores del filtro coinciden con los valores de la fila
          const allFiltersMatch = Object.keys(filterValues).every((columnName) => {
            // Si el valor del filtro está vacío o es 'Todos', considerar que coincide con cualquier valor
            if (filterValues[columnName] === '' || filterValues[columnName] === 'Todos') {
              return true;
            }
      
            if (columnName === 'FechaAnterior_v') {
              // Convertir la fecha en los datos de la tabla a un objeto Date
              const partes = listado.Fecha_v.split('/');
              const listadoDate = new Date(partes[2], partes[1] - 1, partes[0]);
            
              // Convertir la fecha en el campo de entrada a un objeto Date
              const filterDate = new Date(filterValues[columnName]);
            
              // Crear nuevos objetos Date a partir de las partes de fecha para ignorar las partes de tiempo
              const listadoDateOnly = new Date(listadoDate.getFullYear(), listadoDate.getMonth(), listadoDate.getDate());
              const filterDateOnly = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
            
              // Verificar si la fecha en los datos de la tabla es posterior o igual a la fecha anterior especificada
              return listadoDateOnly <= filterDateOnly;
            }
            
            if (columnName === 'FechaPosterior_v') {
              // Convertir la fecha en los datos de la tabla a un objeto Date
              const partes = listado.Fecha_v.split('/');
              const listadoDate = new Date(partes[2], partes[1] - 1, partes[0]);
            
              // Convertir la fecha en el campo de entrada a un objeto Date
              const filterDate = new Date(filterValues[columnName]);
            
              // Crear nuevos objetos Date a partir de las partes de fecha para ignorar las partes de tiempo
              const listadoDateOnly = new Date(listadoDate.getFullYear(), listadoDate.getMonth(), listadoDate.getDate());
              const filterDateOnly = new Date(filterDate.getFullYear(), filterDate.getMonth(), filterDate.getDate());
            
              // Verificar si la fecha en los datos de la tabla es anterior o igual a la fecha posterior especificada
              return listadoDateOnly >=filterDateOnly;
            }
      
            // Verificar si el valor en los datos de la tabla comienza con el valor del campo de entrada (indistinto a mayúsculas y minúsculas)
            return listado[columnName].toString().toLowerCase().startsWith(filterValues[columnName].toLowerCase());
          });
      
          // Verificar si el valor seleccionado en el elemento select es "Viajes no terminados"
          if (filterValues.Estatus_v === 'Viajes no terminados') {

            console.log(filterValues.Estatus_v)
            // Mostrar solo las filas cuyo estatus no sea "Viaje finalizado" y que coincidan con todos los valores del filtro
            return allFiltersMatch && listado.Estatus_v !== 'Viaje finalizado';
          }
          
          // Verificar si el valor seleccionado en el elemento select es "Todas"
          if (filterValues.Estatus_v === 'Todos' || filterValues.Estatus_v === null) {
            console.log(filterValues);
            // Desactivar el elemento select correspondiente
            document.querySelector('#Estatus_v').disabled = true;
            // Verificar si todos los valores del filtro, excepto Estatus_v, coinciden con los valores de la fila
            const allOtherFiltersMatch = Object.keys(filterValues).every((columnName) => {
              // Ignorar el valor de Estatus_v
              if (columnName === 'Estatus_v') {
                return true;
              }
         

              // Verificar si el valor en los datos de la tabla comienza con el valor del campo de entrada (indistinto a mayúsculas y minúsculas)
              return listado[columnName].toString().toLowerCase().startsWith(filterValues[columnName].toLowerCase());
            });
          
            // Mostrar todas las filas que coincidan con todos los valores del filtro, excepto Estatus_v
            return allOtherFiltersMatch;
          }
          
          return allFiltersMatch;
        })
        );
      }) 

    });
};

// Función para actualizar la tabla
const updateTable = async () => {
    // Obtener los valores actuales de los campos de entrada y menús desplegables
    const filterValues = {
        Cedula_v: input1.value,
        Placa_v: input2.value,
        Placa2_v: input3.value,
        Placa3_v: input4.value,
        Nombreayu_v: input5.value,
        Estatus_v: selectEstados.value,
        FechaAnterior_v: inputFechaAnterior.value,
        FechaPosterior_v: inputFechaPosterior.value,
        Sede2_v: Sedes.value,
    };

    // Obtener la lista de viajes
    const listado = await obtenerListados(consultar);

    // Filtrar la lista de viajes utilizando los valores del filtro
    const listadoFiltrado = filtrarViajes(listado, filterValues);

    // Actualizar la tabla con el listado filtrado
    renderListadosTable(listadoFiltrado);
    [input1, input2, input3, input4, input5, selectEstados, inputFechaAnterior, inputFechaPosterior, Sedes].forEach((element) => {
    element.addEventListener('input', updateTable);
});
   
};

// Agregar controladores de eventos a los campos de entrada y menús desplegables para actualizar la tabla cuando cambien los valores


    
     module.exports = filtrarViajes;

     async function obtenerEstado() {
        try {
      
          await sql.connect(config);
      
          const result = await sql.query('SELECT Id_estatus, Nombre FROM Estatusviaje');
      
          await sql.close();
      
          return result.recordset;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          throw error;
        }
      }
      
      
      async function GenerarEstado() {
        try {
          const destino = await obtenerEstado();
      
          let selectOptions = '<option value="Viajes no terminados" >Viajes no terminados</option>';
           selectOptions += '<option value="Todos" selected>Todos</option>';
      
      
      
          destino.forEach((row) => {
            // Establecer el valor de las opciones como el id del estatus
            selectOptions += `<option value="${row.Nombre}">${row.Nombre}</option>`;
          });
      
          const selectHtml = `<select id="selectEstados">${selectOptions}</select>`;
          document.getElementById('selectEstados').innerHTML = selectHtml;
      
          // Agregar evento change al select
      
          return selectHtml;
        } catch (error) {
          console.error('Error al generar el select:', error);
          throw error;
        }
      }
      
      GenerarEstado()
        .then((selectHtml) => {
          console.log('Select HTML generado:', selectHtml);
        })
        .catch((error) => {
          console.error('Error en la generación del select:', error);
        });
      
      
      
      
  
      async function obtenersede() {
        try {
      
          await sql.connect(config);
      
          const result = await sql.query(`SELECT  Sede  FROM Sedes, Tiposede where Tiposede.Id = Sedes.Tiposede and Tiposede.Tiposede not in ('Distribuidora', 'Anulada')`);
      
          await sql.close();
      
          return result.recordset;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          throw error;
        }
      }
      
      
      async function Generarsede() {
        try {
          const destino = await obtenersede();
      
          let selectOptions = '<option value="Todas">Todas</option>';
          
      
          destino.forEach((row) => {
            selectOptions += `<option value="${row.Sede}">${row.Sede}</option>`;
          });
      
          const selectHtml = `<select>${selectOptions}</select>`;
          document.getElementById('Sedes').innerHTML = selectHtml;
          return selectHtml;
        } catch (error) {
          console.error('Error al generar el select:', error);
          throw error;
        }
      }
      
      Generarsede()
        .then((selectHtml) => {
          console.log('Select HTML generado:', selectHtml);
        })
        .catch((error) => {
          console.error('Error en la generación del select:', error);
        });
      
  

         document.getElementById("cedula").addEventListener("keyup", filtrarViajes);
        document.getElementById("placaVehiculo").addEventListener("keyup", filtrarViajes);
        document.getElementById("placaCava").addEventListener("keyup", filtrarViajes);
        document.getElementById("placaRemolque").addEventListener("keyup", filtrarViajes);
        document.getElementById("inp_ayudante").addEventListener("keyup", filtrarViajes);
        document.querySelector("#Sedes").addEventListener("change", filtrarViajes);
        document.getElementById("fechaPosterior").addEventListener("change", filtrarViajes);
        document.getElementById("fechaAnterior").addEventListener("change", filtrarViajes);
        document.getElementById("selectEstados").addEventListener("change", filtrarViajes);