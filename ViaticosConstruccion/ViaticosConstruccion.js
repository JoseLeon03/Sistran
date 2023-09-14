const sql = require('mssql')
const {consultar, config} = require ('../Promise')


const obtenerViaticos = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`SELECT sede1.Sede as Origen , sede2.Sede as Destino , Viatico ,Kilometros, Format (Fecha , 'dd/MM/yyyy') as Fecha from Tabladeviaticos , Sedes as sede1, Sedes as sede2
  where Tabladeviaticos.Origen = sede1.Codigo and Tabladeviaticos.Destino = Sede2.Codigo order by sede2.Codigo`).then((result) => {
    const Viaticos = result.recordset.map((row) => ({
      Origen_v: row.Origen,
      Destino_v: row.Destino,
      Viatico_v: row.Viatico,
      Kilometros_v: row.Kilometros,
      Fecha_v: row.Fecha,
    }))
    return Viaticos
  })
}

module.exports = obtenerViaticos



//Codigo para usar si la consulta esta en un archivo diferente
// const obtenerSedes = require('./')
let currentPage = 0;
const rowsPerPage = 12;

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
    const KilometrosCell = document.createElement('td');
    const FechaCell = document.createElement('td');

    OrigenCell.textContent = viatico.Origen_v;
    DestinoCell.textContent = viatico.Destino_v;
    ViaticoCell.textContent = viatico.Viatico_v;
    KilometrosCell.textContent = viatico.Kilometros_v;
    FechaCell.textContent = viatico.Fecha_v;

    rowElement.appendChild(OrigenCell);
    rowElement.appendChild(DestinoCell);
    rowElement.appendChild(KilometrosCell);
    rowElement.appendChild(ViaticoCell);
    rowElement.appendChild(FechaCell);
    
    tableBody.appendChild(rowElement);
  });
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
        renderViaticosTable(viaticos);
      }
    });

    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton = document.querySelector('#previousPage');
    previousPageButton.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderViaticosTable(viaticos);
      }
    });

    // Agregar controladores de eventos al botón de primera página
    const firstPageButton = document.querySelector('#firstPage');
    firstPageButton.addEventListener('click', () => {
      currentPage = 0;
      renderViaticosTable(viaticos);
    });

    // Agregar controladores de eventos al botón de última página
    const lastPageButton = document.querySelector('#lastPage');
    lastPageButton.addEventListener('click', () => {
      currentPage = Math.floor(viaticos.length / rowsPerPage) ;
      renderViaticosTable(viaticos);
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
    return (listado.Viatico_v) >= viaticoMayorValue  && (listado.Viatico_v) <= viaticoMenorValue;
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
  return request.query(`SELECT  Format (Fecha , 'dd/MM/yyyy') as Fecha , Pago, Usuario from Kilometraje_historial order by id desc `).then((result) => {
    const Tasa = result.recordset.map((row) => ({

      Fecha_t: row.Fecha,
      Pago_t: row.Pago,
      Usuario_T: row.Usuario,
      
    }))
    return Tasa
  })
}

module.exports = obtenerTasa


//Codigo para usar si la consulta esta en un archivo diferente
// const obtenerSedes = require('./')

const renderTasaTable = (tasas) => {
  const tableBody = document.querySelector('#tabla-pago tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentTasas = tasas.slice(start, end);

  currentTasas.forEach((tasa) => {
    const rowElement = document.createElement('tr');
    const FechaCell = document.createElement('td');
    const PagoCell = document.createElement('td');
    const UsuarioCell = document.createElement('td');

    FechaCell.textContent = tasa.Fecha_t;
    PagoCell.textContent = tasa.Pago_t;
    UsuarioCell.textContent = tasa.Usuario_T;

    rowElement.appendChild(FechaCell);
    rowElement.appendChild(PagoCell);
    // rowElement.appendChild(UsuarioCell);
    
    tableBody.appendChild(rowElement);
  });
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
        renderTasaTable(tasas);
      }
    });

    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton2 = document.querySelector('#previousPage2');
    previousPageButton2.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderTasaTable(tasas);
      }
    });

    // Agregar controladores de eventos al botón de primera página
    const firstPageButton2 = document.querySelector('#firstPage2');
    firstPageButton2.addEventListener('click', () => {
      currentPage = 0;
      renderTasaTable(tasas);
    });

    // Agregar controladores de eventos al botón de última página
    const lastPageButton2 = document.querySelector('#lastPage2');
    lastPageButton2.addEventListener('click', () => {
      currentPage = Math.floor(tasas.length / rowsPerPage);
      renderTasaTable(tasas);
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

Guardar_viatico.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        // Solo envía el formulario si el nombre de marca es válido
         const Kilometros = document.querySelector('input[name="Viatico"]').value;
         const Sede = document.querySelector('#Sedes').value;
         const Origen = document.querySelector('#Origen').value;
         const Fecha = document.querySelector('input[name="Fecha_req"]').value;

          console.log(Kilometros, Sede, Origen, Fecha)

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
                
            }
           else if(count >0){

              ipcRenderer.send('viaticoExistente')
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



              else{

             const Tasa =   await obtenerUltimatasa({});  
            const Viatico = Kilometros * Tasa;
          
          // Utiliza los valores en tus consultas SQL await
          await agregarViatico({Viatico, Sede, Origen, Fecha, Kilometros});
          
           // Limpia los campos del formulario
            location.reload();
           }}
          });

           async function obtenerUltimatasa(){
          const pool = await consultar.connect();
          const sqlQuery2 = `SELECT Top 1(Pago) AS Pago FROM Kilometraje_historial order by id desc`;
          const result2 = await pool.request().query(sqlQuery2)
          const Tasa = result2.recordset[0].Pago;
          console.log ('Ultima tasa ', Tasa)
          return Tasa;
           }
  
  async function agregarViatico(datos) {
      try {
          const pool = await consultar.connect();
          const sqlQuery = `Update Tabladeviaticos set INTO Tabladeviaticos (Origen, Destino, Viatico, Fecha, Kilometros) VALUES (${datos.Origen}, ${datos.Sede}, ${datos.Viatico}, '${datos.Fecha}', ${datos.Kilometros})`;
          const result = await pool.request().query(sqlQuery);
          
          console.log('Registro agregado a la base de datos:', result);
         return Tasa;
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }
/*Fin guardar viaticos */

    const modificarViaticobtn = document.getElementById("modificar");

    modificarViaticobtn.addEventListener('click', async (evento) => {

      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
        console.log('Hola')
        // Solo envía el formulario si el nombre de marca es válido
         const Kilometros = document.querySelector('input[name="Viatico"]').value;
         const Sede = document.querySelector('#Sedes').value;
         const Origen = document.querySelector('#Origen').value;
         const Fecha = document.querySelector('input[name="Fecha_req"]').value;

          console.log(Kilometros, Sede, Origen, Fecha)

 

         let nombresMostrados = {
          'viatico': 'Por favor, ingrese un monto de viático ',
          'Fecha_req': 'Por favor, ingrese la fecha de hoy',
          'Origen': 'Por favor, seleccione la distribuidora',
          'Sedes': 'Por favor, seleccione la sede',

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

             const Tasa =   await obtenerUltimatasa({});  
            const Viatico = Kilometros * Tasa;
          
          // Utiliza los valores en tus consultas SQL await
          await modificarViatico({Viatico, Sede, Fecha, Kilometros});
                ipcRenderer.send('datosModificados')
           // Limpia los campos del formulario
            // location.reload();
           }}
    });
  
          async function modificarViatico(datos) {
            try {
                const pool = await consultar.connect();
                const sqlQuery = `Update Tabladeviaticos set Viatico = ${datos.Viatico} , Kilometros = ${datos.Kilometros} , Fecha = '${datos.Fecha}'  where Destino = ${datos.Sede} `;
                const result = await pool.request().query(sqlQuery);
                
                console.log('Registro agregado a la base de datos:', result);
            } catch (error) {
                console.log('Error al agregar el registro:', error);
            }
        
        }

       




/*Guardar Tasa */
const Guardar_pago = document.getElementById("guardar");


Guardar_pago.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        // Solo envía el formulario si el nombre de marca es válido
         const Pago = document.querySelector('input[name="pagoKilometraje"]').value;
         const Fecha_tasa = document.querySelector('input[name="fechaPago"]').value;

         let nombresMostrados = {
          'pagoKilometraje': 'Por favor, ingrese un monto de pago por kilometraje ',
          'fechaPago': 'Por favor, ingrese la fecha de hoy',
    
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
  
  
  
                else{



          // Utiliza los valores en tus consultas SQL await
          agregarPago({Pago, Fecha_tasa});
          actualizarViaticos(Pago)
           // Limpia los campos del formulario
            ipcRenderer.send('registroExitoso')
            location.reload

           }}
        });
  
  async function agregarPago(datos) {
      try {
          const pool = await consultar.connect();
          const sqlQuery = `INSERT INTO Kilometraje_historial (Fecha, Pago) VALUES ('${datos.Fecha_tasa}', ${datos.Pago})`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
          pool.close();
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }

  async function actualizarViaticos(Pago) {
    try {
        const pool = await consultar.connect();
        const sqlQuery = `UPDATE Tabladeviaticos SET Viatico = Kilometros * ${Pago}`;
        const result = await pool.request().query(sqlQuery);
        console.log('Viáticos en bolívares actualizados:', result);
        pool.close();
    } catch (error) {
        console.log('Error al actualizar los viáticos:', error);
    }
}



async function obtenerUltimoPago(){
  const pool = await consultar.connect();
 const sqlQuery2 = `SELECT Top 1(Pago) AS Pago FROM Kilometraje_historial order by id desc`;
const result2 = await pool.request().query(sqlQuery2)
const pago = result2.recordset[0].Pago;
document.querySelector('label[class="monto"]').innerHTML = `Monto Actual : ` + pago;
document.querySelector('label[class="monto2"]').innerHTML = `Monto Actual : ` + pago;


return pago;
 }obtenerUltimoPago()

/*Fin guardar Tasa */



/*Select Origen sede*/
async function obtenerOrigen() {
  try {

    await sql.connect(config);

    const result = await sql.query(`SELECT Codigo, Sede FROM Sedes, Tiposede WHERE Sedes.Tiposede = Tiposede.id  and Tiposede.Tiposede in ('Distribuidora')`);

    await sql.close();

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

    const result = await sql.query(`SELECT Codigo, Sede  FROM Sedes, Tiposede where Tiposede.Id = Sedes.Tiposede and Tiposede.Tiposede not in ('Distribuidora', 'Anulada')`);

    await sql.close();

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