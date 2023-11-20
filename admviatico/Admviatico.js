const sql = require('mssql')
const {consultar, config} = require ('../Promise')



const obtenerViaticos = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`SELECT sede1.Sede as Origen , sede2.Sede as Destino , Viatico_Bs ,Viatico_Usd, Format (Fecha , 'dd/MM/yyyy') as Fecha, Dias from Tabladeviaticos , Sedes as sede1, Sedes as sede2
  where Tabladeviaticos.Origen = sede1.Codigo and Tabladeviaticos.Destino = Sede2.Codigo order by Destino`).then((result) => {
    const Viaticos = result.recordset.map((row) => ({
      Origen_v: row.Origen,
      Destino_v: row.Destino,
      Viatico_v: row.Viatico_Bs,
      Viatico2_v: row.Viatico_Usd,
      Dias_v: row.Dias,
      Fecha_v: row.Fecha,
    }))
    return Viaticos
  })
}




//Codigo para usar si la consulta esta en un archivo diferente
// const obtenerSedes = require('./')
let currentPage = 0;
const rowsPerPage = 15;

const renderViaticosTable = (viaticos) => {
  const tableBody = document.querySelector('#tabla-viaticos tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentViaticos = viaticos.slice(start, end);

  currentViaticos.forEach((viatico) => {
    const rowElement = document.createElement('tr');
    const OrigenCell = document.createElement('td');
    const DestinoCell = document.createElement('td');
    const ViaticoCell = document.createElement('td');
    const Viatico2Cell = document.createElement('td');
    const DiasCell = document.createElement('td');
    const FechaCell = document.createElement('td');

    OrigenCell.textContent = viatico.Origen_v;
    DestinoCell.textContent = viatico.Destino_v;
    ViaticoCell.textContent = viatico.Viatico_v;
    Viatico2Cell.textContent = viatico.Viatico2_v;
    DiasCell.textContent = viatico.Dias_v;
    FechaCell.textContent = viatico.Fecha_v;

    rowElement.appendChild(OrigenCell);
    rowElement.appendChild(DestinoCell);
    rowElement.appendChild(ViaticoCell);
    rowElement.appendChild(Viatico2Cell);
    rowElement.appendChild(DiasCell);
    rowElement.appendChild(FechaCell);
    
    tableBody.appendChild(rowElement);
  });
  const maxPages = Math.ceil(viaticos.length / rowsPerPage);
  const paginationInfoDiv = document.querySelector('#pagina-viatico');
  paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
};

consultar.connect().then(() => {
  obtenerViaticos(consultar).then((viaticos) => {
    renderViaticosTable(viaticos);

    // Agregar controladores de eventos al botón de siguiente página
    const nextPageButton = document.querySelector('#nextPage');
    nextPageButton.addEventListener('click', () => {
      const maxPages = Math.ceil(viaticos.length / rowsPerPage);
      if (currentPage < maxPages - 1) {
        currentPage++;
        renderViaticosTable(filteredListados);
      }
    });

    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton = document.querySelector('#previousPage');
    previousPageButton.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderViaticosTable(filteredListados);
      }
    });

    // Agregar controladores de eventos al botón de primera página
    const firstPageButton = document.querySelector('#firstPage');
    firstPageButton.addEventListener('click', () => {
      currentPage = 0;
      renderViaticosTable(filteredListados);
    });

    // Agregar controladores de eventos al botón de última página
    const lastPageButton = document.querySelector('#lastPage');
    lastPageButton.addEventListener('click', () => {
      currentPage = Math.floor(viaticos.length / rowsPerPage) ;
      renderViaticosTable(filteredListados);
    });



  
    let filteredListados = viaticos;
    let viaticoMenorValue = '50000';
    let viaticoMayorValue = '1';

  

         const fechaPosteriorInput = document.querySelector('#fechaDesde');
     const fechaAnteriorInput = document.querySelector('#fechaHasta');
     let fechaPosteriorValue = new Date(fechaPosteriorInput.value);
     let fechaAnteriorValue = new Date(fechaAnteriorInput.value)

    const updateFilteredListados = () => {

    filteredListados = viaticos.filter((listado) => {

      // Convertir la fecha en formato 'dd/MM/yyyy' a un objeto Date
      const [day, month, year] = listado.Fecha_v.split('/');
      const fechaListado = new Date(year, month - 1, day);
      // Verificar si la fecha está dentro del rango especificado
      return fechaListado >= fechaPosteriorValue && fechaListado <= fechaAnteriorValue;
    }).filter((listado) => {
      return (listado.Viatico2_v) >= viaticoMayorValue  && (listado.Viatico2_v) <= viaticoMenorValue;
    })
    renderViaticosTable(filteredListados);
    };

        updateFilteredListados();

      

      // Agregar controladores de eventos a los inputs de fecha para actualizar el filtro cuando cambien
      fechaPosteriorInput.addEventListener('input', (event) => {
        fechaPosteriorValue = new Date(event.target.value);
        updateFilteredListados();
      });

      fechaAnteriorInput.addEventListener('input', (event) => {
        fechaAnteriorValue = new Date(event.target.value);
        updateFilteredListados();
      });

      const viaticoMenorInput = document.querySelector('#viatico1');
      viaticoMenorInput.addEventListener('input', (event) => {
        viaticoMenorValue = event.target.value;
        updateFilteredListados();
      });
      
      const viaticoMayorInput = document.querySelector('#viatico2');
      viaticoMayorInput.addEventListener('input', (event) => {
        viaticoMayorValue = event.target.value;
        updateFilteredListados();
      });


      const printButton = document.querySelector('#imprimir_viatico');
        printButton.addEventListener('click', () => {

          const generarViaticosPDF = require('./Imprimirviaticos')

          generarViaticosPDF(filteredListados);
        });


  })
});



const obtenerTasa = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`SELECT  Format (Fecha , 'dd/MM/yyyy') as Fecha , Tasa, Usuario from Historial_tasa order by id desc `).then((result) => {
    const Tasa = result.recordset.map((row) => ({

      Fecha_t: row.Fecha,
      Tasa_t: row.Tasa,
      Usuario_T: row.Usuario,
      
    }))
    return Tasa
  })
}



//Codigo para usar si la consulta esta en un archivo diferente
// const obtenerSedes = require('./')

const renderTasaTable = (tasas) => {
  const tableBody = document.querySelector('#tabla-tasa tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentTasas = tasas.slice(start, end);

  currentTasas.forEach((tasa) => {
    const rowElement = document.createElement('tr');
    const FechaCell = document.createElement('td');
    const TasaCell = document.createElement('td');
    const UsuarioCell = document.createElement('td');

    FechaCell.textContent = tasa.Fecha_t;
    TasaCell.textContent = tasa.Tasa_t;
    UsuarioCell.textContent = tasa.Usuario_T;

    rowElement.appendChild(FechaCell);
    rowElement.appendChild(TasaCell);
    // rowElement.appendChild(UsuarioCell);
    
    tableBody.appendChild(rowElement);
  });

  const maxPages = Math.ceil(tasas.length / rowsPerPage);
  const paginationInfoDiv = document.querySelector('#pagina-tasa');
  paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
};

consultar.connect().then(() => {
  obtenerTasa(consultar).then((tasas) => {
    renderTasaTable(tasas);

    // Agregar controladores de eventos al botón de siguiente página
    const nextPageButton2 = document.querySelector('#nextPage2');
    nextPageButton2.addEventListener('click', () => {
      const maxPages = Math.ceil(tasas.length / rowsPerPage);
      if (currentPage < maxPages - 1) {
        currentPage++;
        renderTasaTable(filteredListados);
      }
    });

    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton2 = document.querySelector('#previousPage2');
    previousPageButton2.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderTasaTable(filteredListados);
      }
    });

    // Agregar controladores de eventos al botón de primera página
    const firstPageButton2 = document.querySelector('#firstPage2');
    firstPageButton2.addEventListener('click', () => {
      currentPage = 0;
      renderTasaTable(filteredListados);
    });

    // Agregar controladores de eventos al botón de última página
    const lastPageButton2 = document.querySelector('#lastPage2');
    lastPageButton2.addEventListener('click', () => {
      currentPage = Math.floor(tasas.length / rowsPerPage);
      renderTasaTable(filteredListados);
    });
 
  
  
  let filteredListados = tasas;


       const fechaPosteriorInput = document.querySelector('#fechaDesde2');
   const fechaAnteriorInput = document.querySelector('#fechaHasta2');
   let fechaPosteriorValue = new Date(fechaPosteriorInput.value);
   let fechaAnteriorValue = new Date(fechaAnteriorInput.value)

  const updateFilteredListados = () => {

  filteredListados = tasas.filter((listado) => {

    // Convertir la fecha en formato 'dd/MM/yyyy' a un objeto Date
    const [day, month, year] = listado.Fecha_t.split('/');
    const fechaListado = new Date(year, month - 1, day);
    // Verificar si la fecha está dentro del rango especificado
    return fechaListado >= fechaPosteriorValue && fechaListado <= fechaAnteriorValue;
  })
  renderTasaTable(filteredListados);
  };

      updateFilteredListados();

    

    // Agregar controladores de eventos a los inputs de fecha para actualizar el filtro cuando cambien
    fechaPosteriorInput.addEventListener('input', (event) => {
      fechaPosteriorValue = new Date(event.target.value);
      updateFilteredListados();
    });

    fechaAnteriorInput.addEventListener('input', (event) => {
      fechaAnteriorValue = new Date(event.target.value);
      updateFilteredListados();
    });

 


    const printTasaButton = document.querySelector('#imprimirTasa');
    printTasaButton.addEventListener('click', () => {

      const generarTasaPDF = require('./ImprimirTasa')

      generarTasaPDF(filteredListados);
     
    });



  })

});


/***************************************Guardar viaticos ******************************************************/
const Guardar_viatico = document.getElementById("Guardar_Viatico");
const formulario = document.querySelector('#formulario');



      Guardar_viatico.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
      Guardar_viatico.disabled = true

        // Solo envía el formulario si el nombre de marca es válido
         const Viatico = document.querySelector('input[name="Viatico"]').value;
         const Sede = document.querySelector('#Sedes').value;
         const Origen = document.querySelector('#Origen').value;
         const Fecha = document.querySelector('input[name="Fecha_req"]').value;
         const Dias = document.querySelector('input[name="Dias"]').value;

          console.log(Viatico, Sede, Origen, Fecha, Dias)

         const Consultaviatico = `SELECT count(*) as count FROM tabladeviaticos where Destino= '${Sede}'`;
         const pool = await consultar;
         const result = await pool.request().query(Consultaviatico);
         const count = result.recordset[0].count;


         let nombresMostrados = {
          'viatico': 'Por favor, ingrese un monto de viático ',
          'Fecha_req': 'Por favor, ingrese la fecha de hoy',
          'Origen': 'Por favor, seleccione la  distribuidora',
          'Sedes': 'Por favor, seleccione la sede',
          'Dias': 'Por favor, Ingrese los dias de viaje desde el origen al destino',

     
     
          // Agrega más mapeos según sea necesario
        };
    
    
        let inputs = document.querySelectorAll('.requerido');
    

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
                  Guardar_viatico.disabled = false
                     }, 1000)
                
            }
           else if(count >0){

              ipcRenderer.send('viaticoExistente')
              setTimeout(() =>{
                Guardar_viatico.disabled = false
                   }, 1000)
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
                Guardar_viatico.disabled = false
              }



              else{
                Guardar_viatico.disabled = false
                const viaticoReal = Viatico / 2
             const Tasa =   await obtenerUltimatasa({});  
            const Viatico_Bs = viaticoReal  * Tasa;
          
          // Utiliza los valores en tus consultas SQL await
          await agregarViatico({Viatico_Bs, Sede, Origen, Fecha, viaticoReal, Dias});
          
           // Limpia los campos del formulario
           setTimeout(() =>{
            location.reload();
               }, 1000)
  
           }}
          });

          async function obtenerUltimatasa(){
            const pool = await consultar.connect();
          const sqlQuery2 = `SELECT Top 1(Tasa) AS Tasa FROM Historial_tasa order by id desc`;
          const result2 = await pool.request().query(sqlQuery2)
          const Tasa = result2.recordset[0].Tasa;

          document.querySelector('label[class="monto"]').innerHTML = `Tasa Actual : ` + Tasa+ ' Bs';
          document.querySelector('label[class="monto2"]').innerHTML = `Tasa Actual : ` + Tasa +' Bs';

          return Tasa;
          }obtenerUltimatasa()
           
  
  async function agregarViatico(datos) {
      try {
          const pool = await consultar.connect();
          const sqlQuery = `Insert INTO Tabladeviaticos (Origen, Destino, Viatico_Bs, Fecha, Viatico_Usd, Dias) VALUES (${datos.Origen}, ${datos.Sede}, ${datos.Viatico_Bs}, '${datos.Fecha}', ${datos.viaticoReal}, ${datos.Dias})`;
          const result = await pool.request().query(sqlQuery);

          ipcRenderer.send('registroExitoso')  
          console.log('Registro agregado a la base de datos:', result);
         return Tasa;
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }
/*Fin guardar viaticos */

const modificar_viatico = document.getElementById("modificar");



      modificar_viatico.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        // Solo envía el formulario si el nombre de marca es válido
         const Viatico = document.querySelector('input[name="Viatico"]').value;
         const Sede    = document.querySelector('#Sedes').value;
         const Origen  = document.querySelector('#Origen').value;
         const Fecha   = document.querySelector('input[name="Fecha_req"]').value;
         const Dias    = document.querySelector('input[name="Dias"]').value;

          console.log(Viatico, Sede, Origen, Fecha, Dias)

 

         let nombresMostrados = {
          'viatico': 'Por favor, ingrese un monto de viático ',
          'Fecha_req': 'Por favor, ingrese la fecha de hoy',
          'Origen': 'Por favor, seleccione la  distribuidora',
          'Sedes': 'Por favor, seleccione la sede',
          'Dias': 'Por favor, Ingrese los dias de viaje desde el origen al destino',

     
     
          // Agrega más mapeos según sea necesario
        };
    
    
        let inputs = document.querySelectorAll('.requerido');
    

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
            

              else{
                const viaticoReal = Viatico / 2
                const Tasa =   await obtenerUltimatasa({});  
                const Viatico_Bs =  viaticoReal * Tasa;
          
                // Utiliza los valores en tus consultas SQL await
                await modificarViatico({Viatico_Bs, Sede, Fecha, viaticoReal, Dias});
                 // Limpia los campos del formulario
                 location.reload();
           }}
          });
  
          async function modificarViatico(datos) {
            try {
                const pool = await consultar.connect();
                const sqlQuery = `Update Tabladeviaticos set Viatico_usd = ${datos.viaticoReal} , Viatico_Bs = ${datos.Viatico_Bs} , Fecha = '${datos.Fecha}' , Dias = ${datos.Dias} where Destino = ${datos.Sede} `;
                const result = await pool.request().query(sqlQuery);
                
                console.log('Registro agregado a la base de datos:', result);
                ipcRenderer.send('datosModificados')
            } catch (error) {
                console.log('Error al agregar el registro:', error);
            }
        
        }




/*Guardar Tasa */
const Guardar_tasa = document.getElementById("Guardar_tasa");
const formulario2 = document.querySelector('#formulario');


  Guardar_tasa.addEventListener('click', async (evento) => {
      evento.preventDefault();
       // Evita que el formulario se envíe automáticamente
       Guardar_tasa.disabled = true
     
        // Solo envía el formulario si el nombre de marca es válido
         const Tasa = document.querySelector('input[name="Tasa"]').value;
         const Fecha_tasa = document.querySelector('input[name="Fecha_tasa"]').value;

         let nombresMostrados = {
          'Tasa': 'Por favor, ingrese un monto para la nueva tasa de cambio ',
          'Fecha_tasa': 'Por favor, ingrese la fecha de hoy',
     
     
          // Agrega más mapeos según sea necesario
        };
    
    
        let inputs = document.querySelectorAll('.requerido2');
    
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
                  Guardar_tasa.disabled = false
                     }, 2500)
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
                Guardar_tasa.disabled = false
              }

              else{
                
                Guardar_tasa.disabled = false
          // Utiliza los valores en tus consultas SQL await
           agregarTasa({Tasa, Fecha_tasa});
            actualizarViaticosBolivar(Tasa);
           // Limpia los campos del formulario
         
        
          setTimeout(() =>{
             location.reload()
                }, 1000)
        }}
      });
  
  async function agregarTasa(datos) {
      try {
          const pool = await consultar.connect();
          const sqlQuery = `INSERT INTO Historial_tasa (Fecha, Tasa) VALUES ('${datos.Fecha_tasa}', '${datos.Tasa}')`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
          ipcRenderer.send('registroExitoso') 
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  }
  async function actualizarViaticosBolivar(Tasa) {
    try {
        const pool = await consultar.connect();
        const sqlQuery = `UPDATE Tabladeviaticos SET Viatico_Bs = viatico_usd * ${Tasa}`;
        const result = await pool.request().query(sqlQuery);
        console.log('Viáticos en bolívares actualizados:', result);
    } catch (error) {
        console.log('Error al actualizar los viáticos:', error);
    }
}
/*Fin guardar Tasa */



/*Select Origen sede*/
async function obtenerOrigen() {
  try {

    await sql.connect(config);

    const result = await sql.query(`SELECT Codigo, Sede FROM Sedes, Tiposede WHERE Sedes.Tiposede = Tiposede.id  and Tiposede.Tiposede in ('Distribuidora')`);


    return result.recordset;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}


async function generarSelectOrigen() {
  try {

    const sedes = await obtenerOrigen();

    let selectOptions = '<option value="" disabled selected>Seleccione</option>';

    sedes.forEach((row) => {
      selectOptions += `<option value="${row.Codigo}">${row.Sede}</option>`;
    });

    const selectHtml = `<select>${selectOptions}</select>`;
    document.getElementById('Origen').innerHTML = selectHtml;
    return selectHtml;
  } catch (error) {
    console.error('Error al generar el select:', error);
    throw error;
  }
}

generarSelectOrigen()
  .then((selectHtml) => {

    console.log('Select HTML generado:', selectHtml);
  
  })
  .catch((error) => {
      
    console.error('Error en la generación del select:', error);

  });
/*Fin select de origen*/



 /*Select de Tipo de viaje*/
 async function obtenerSede() {
  try {

    await sql.connect(config);

    const result = await sql.query(`SELECT Codigo, Sede  FROM Sedes, Tiposede where Tiposede.Id = Sedes.Tiposede and Tiposede.Tiposede not in ('Distribuidora', 'Anulada') order by Sede`);


    return result.recordset;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}


async function generarSede() {
  try {

    const destino = await obtenerSede();

    let selectOptions = '<option value="" disabled selected>Seleccione</option>';

    destino.forEach((row) => {
      selectOptions += `<option value="${row.Codigo}">${row.Sede}</option>`;
    });

  
    const selectHtml = `<select>${selectOptions}</select>`;
    document.getElementById('Sedes').innerHTML = selectHtml ;
    return selectHtml;
  } catch (error) {
    console.error('Error al generar el select:', error);
    throw error;
  }
}

generarSede()
  .then((selectHtml) => {
    console.log('Select HTML generado:', selectHtml);
  
  })
  .catch((error) => {
    console.error('Error en la generación del select:', error);

  });

  //Codigo para que al refrescar se quede en la misma pestaña
var tabMenu = document.querySelector("#tab-menu");

// Agregar un controlador de eventos para el evento "click" en el menú de pestañas
tabMenu.addEventListener("click", function(event) {
  // Obtener el índice de la pestaña seleccionada
  var selectedIndex = Array.prototype.indexOf.call(tabMenu.children, event.target);

  // Guardar el índice de la pestaña seleccionada en localStorage
  localStorage.setItem("selectedTabIndex", selectedIndex);
});

// Cuando se carga la página, recuperar el índice de la pestaña seleccionada de localStorage
var selectedTabIndex = localStorage.getItem("selectedTabIndex");

// Si se encontró un índice de pestaña seleccionado en localStorage, seleccionar esa pestaña
if (selectedTabIndex !== null) {
  tabMenu.children[selectedTabIndex].click();
}
/*Fin select de destino*/

module.exports = {obtenerViaticos, obtenerTasa, obtenerUltimatasa}



     
        
  //!Filtroooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo


// document.getElementById('viatico1').addEventListener('keyup', filterTable);
// document.getElementById('viatico2').addEventListener('keyup', filterTable);



// function filterTable() {
//   var input1 = parseFloat(document.getElementById('viatico2').value);
//   var input2 = parseFloat(document.getElementById('viatico1').value);

//   var table = document.getElementById("tabla-viaticos");
//   var tr = table.getElementsByTagName("tr");

//   for (var i = 0; i < tr.length; i++) {
//     var td = tr[i].getElementsByTagName("td")[3]; // Cambia el índice según la columna que quieras filtrar

//     if (td) {
//       var columnValue = parseFloat(td.textContent);

//       var showRow = true;

//       if (!isNaN(input1) && columnValue <= input1) {
//         showRow = false;
//       }
//       if (!isNaN(input2) && columnValue >= input2) {
//         showRow = false;
//       }

//       if (showRow) {
//         tr[i].style.display = "";
//       } else {
//         tr[i].style.display = "none";
//       }
//     }
//   }
// }


//!Fin de el filtroooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo