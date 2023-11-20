const sql = require('mssql')
const {consultar, config} = require ('../Promise')


/**********************************Obtener sedes***************************************** */ 


const obtenerSedes = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`select Codigo , Sede , t.Tiposede  from Sedes as s, Tiposede as t where s.TipoSede = t.Id and t.Tiposede !='Anulada'`).then((result) => {
    const sedes = result.recordset.map((row) => ({

      codigo: row.Codigo,
      nombre_sede: row.Sede,
      tiposede_s: row.Tiposede,
      
    }))
    return sedes
  })
}





let currentPage = 0;
  const rowsPerPage = 15;

  const rendersedes = (sedes) => {
    const tableBody = document.querySelector('#tabla-sedes tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    const currentSedes = sedes.slice(start, end);

    currentSedes.forEach((sede) => {
      const rowElement = document.createElement('tr');
      const CodigoCell = document.createElement('td');
      const SedeCell = document.createElement('td');
      const TiposedeCell = document.createElement('td');

      CodigoCell.textContent = sede.codigo;
      SedeCell.textContent = sede.nombre_sede;
      TiposedeCell.textContent = sede.tiposede_s;

      rowElement.appendChild(CodigoCell);
      rowElement.appendChild(SedeCell);
      rowElement.appendChild(TiposedeCell);
      tableBody.appendChild(rowElement);
    });

    const maxPages = Math.ceil(sedes.length / rowsPerPage);
    const paginationInfoDiv = document.querySelector('#pagination-info');
    paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
  };

  consultar.connect().then(() => {
    obtenerSedes(consultar).then((sedes) => {
      rendersedes(sedes);

      // Agregar controlador de eventos al botón de siguiente página
      const nextPageButton = document.querySelector('#nextPage');
      nextPageButton.addEventListener('click', () => {
        const maxPages = Math.ceil(sedes.length / rowsPerPage);
        if (currentPage < maxPages - 1) {
          currentPage++;
          rendersedes(sedes);
        }
      });

      // Agregar controlador de eventos al botón de página anterior
      const previousPageButton = document.querySelector('#previousPage');
      previousPageButton.addEventListener('click', () => {
        if (currentPage > 0) {
          currentPage--;
          rendersedes(sedes);
        }
      });

      const firstPageButton = document.querySelector('#firstPage');
      firstPageButton.addEventListener('click', () => {
        currentPage = 0;
        rendersedes(sedes);
      });

      // Agregar controlador de eventos al botón de última página
      const lastPageButton = document.querySelector('#lastPage');
      lastPageButton.addEventListener('click', () => {
        currentPage = Math.floor(sedes.length / rowsPerPage) ;
        rendersedes(sedes);
      });

    }).catch((err) => {
      console.error(err);
    });
  });



/**********************************Obtener tipos de sedes***************************************** */ 

const obtenertipos = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query('select Id, Tiposede from Tiposede').then((result) => {
    const tipos = result.recordset.map((row) => ({

      Id_t: row.Id,
      Tiposede_t: row.Tiposede,
      
    }))
    return tipos
  })
}




const renderTiposedes = (tipos) => {
  const tableBody = document.querySelector('#tabla-tipos tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentTipos = tipos.slice(start, end);

  currentTipos.forEach((tipo) => {
    const rowElement = document.createElement('tr');
    const IdCell = document.createElement('td');
    const TiposedeCell = document.createElement('td');

    IdCell.textContent = tipo.Id_t;
    TiposedeCell.textContent = tipo.Tiposede_t;

    rowElement.appendChild(IdCell);
    rowElement.appendChild(TiposedeCell);
    tableBody.appendChild(rowElement);
  });
  const maxPages = Math.ceil(tipos.length / rowsPerPage);
  const paginationInfoDiv = document.querySelector('#pagination-tipos');
  paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
};

consultar.connect().then(() => {
  obtenertipos(consultar).then((tipos) => {
    renderTiposedes(tipos);

    // Agregar controlador de eventos al botón de siguiente página
    const firstPageButton2 = document.querySelector('#firstPage2');
    const previousPageButton2 = document.querySelector('#previousPage2');
    const nextPageButton2 = document.querySelector('#nextPage2');
    const lastPageButton2 = document.querySelector('#lastPage2');

    firstPageButton2.addEventListener('click', () => {
      currentPage = 0;
      renderTiposedes(tipos);
    });

    previousPageButton2.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderTiposedes(tipos);
      }
    });

    nextPageButton2.addEventListener('click', () => {
      const maxPages = Math.ceil(tipos.length / rowsPerPage);
      if (currentPage < maxPages - 1) {
        currentPage++;
        renderTiposedes(tipos);
      }
    });

    lastPageButton2.addEventListener('click', () => {
      currentPage = Math.floor(tipos.length / rowsPerPage);
      renderTiposedes(tipos);
    });


  }).catch((err) => {
    console.error(err);
  });
});

/**********************************Crear sedes***************************************** */ 
      const Guardar = document.getElementById("Guardar");
      const formulario = document.querySelector('#formulario');

      Guardar.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        const Nombre = document.querySelector('input[name="nombre_sede"]').value;
        const Tiposede = document.querySelector('#tiposede').value;


        let nombresMostrados = {
          'nombre_sede': 'Por favor, ingrese un nombre para la sede ',
          'tiposede': 'Por favor, seleccione un tipo de sede',
        
     
          // Agrega más mapeos según sea necesario
        };
    
    
        const ConsultaSede = `SELECT count(*) as count FROM Sedes where sede = '${Nombre}'`;
        const pool = await consultar;
        const result = await pool.request().query(ConsultaSede);
    
        const count = result.recordset[0].count;
    
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
             else if( count >0){

                ipcRenderer.send('sedeExistente', Nombre)
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
                    // El us
          
              // Utiliza los valores en tus consultas SQL
                await agregarSedes({ Nombre, Tiposede});
                      ipcRenderer.send('registroExitoso');
              // Limpia los campos del formulario
              formulario.reset();
              location.reload();
        }}
      });

  
  async function agregarSedes(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `INSERT INTO Sedes (Sede, Tiposede) VALUES ('${datos.Nombre}', ${datos.Tiposede})`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }



/**********************************Crear tipos de sedes***************************************** */ 
const Guardar2 = document.getElementById("Guardar-tipos");
const formulario2 = document.querySelector('#formulario');

Guardar2.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
      Guardar2.disabled = true 

        const Nombre_Tipo = document.querySelector('input[name="nombre_tipo"]').value;

        let nombresMostrados = {
          'nombre_Tipo': 'Por favor, ingrese un nombre para el tipo sede ',

          // Agrega más mapeos según sea necesario
        };
    
    
        const ConsultaCedula = `SELECT count(*) as count FROM Tiposede where Tiposede= '${Nombre_Tipo}'`;
        const pool = await consultar;
        const result = await pool.request().query(ConsultaCedula);
    
        const count = result.recordset[0].count;
    
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
                setTimeout(() =>{ Guardar2.disabled = false }, 2500)

                
            } 
             else if( count >0){

                ipcRenderer.send('tiposedeExistente', Nombre_Tipo)
                setTimeout(() =>{ Guardar2.disabled = false }, 2500)

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
                Guardar2.disabled = false
              }
               else {
                // El usuario hizo clic en "si"
                Guardar2.disabled = false
              
      // Utiliza los valores en tus consultas SQL
            await agregarTipos({ Nombre_Tipo});

            // Limpia los campos del formulario
            location.reload();
         }}
        });

  
  async function agregarTipos(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `INSERT INTO Tiposede (Tiposede) VALUES ('${datos.Nombre_Tipo}')`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
          ipcRenderer.send('registroExitoso');
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }


  /*********************Select para escoger un tipo de sede***************************/

  /*Select de Tipo de viaje*/
  async function obtenerTiposede() {
  try {

    await sql.connect(config);

    const result = await sql.query('SELECT Id, Tiposede FROM Tiposede');


    return result.recordset;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}


async function GenerarTiposede() {
  try {

    const destino = await obtenerTiposede();

    let selectOptions = '<option value="" disabled selected>Seleccione</option>';

    destino.forEach((row) => {
      selectOptions += `<option value="${row.Id}">${row.Tiposede}</option>`;
    });

  
    const selectHtml = `<select>${selectOptions}</select>`;
    document.getElementById('tiposede').innerHTML = selectHtml ;
    return selectHtml;
  } catch (error) {
    console.error('Error al generar el select:', error);
    throw error;
  }
}

GenerarTiposede()
  .then((selectHtml) => {
    console.log('Select HTML generado:', selectHtml);
  
  })
  .catch((error) => {
    console.error('Error en la generación del select:', error);

  });
/*Fin select de destino*/


// Codigo para traer y modificar las sedes

async function obtenerNombresede(codigo) {
  try {
    await sql.connect(config);
    const query = `SELECT Tiposede, Sede FROM Sedes WHERE Codigo = '${codigo}'`;
    const result = await sql.query(query);
    return result.recordset[0] || {Sede: 'Codigo no existente', Tiposede: 'Codigo no existente'};
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    throw error;
  }
}

document.getElementById('codigodesede').addEventListener('input', async function() {
  const codigo = this.value;

  try {
    const {Sede, Tiposede} = await obtenerNombresede(codigo);
    document.getElementById('nombre_sede').value = Sede;
    document.getElementById('tiposede').value = Tiposede;
  } catch (error) {
    document.getElementById('nombre_sede').value = 'Error al obtener la sede';
    document.getElementById('tiposede').value = ':(';
  }
});


async function actualizarSede(codigo, nuevaSede) {
  try {
    await sql.connect(config);
    const query = `UPDATE Sedes SET Sede = '${nuevaSede}' WHERE Codigo = '${codigo}'`;
    await sql.query(query);
  } catch (error) {
    console.error('Error al actualizar la base de datos:', error);
    throw error;
  }
}


async function actualizarTipoSede(codigo, nuevoTipo) {
  try {
    await sql.connect(config);
    const query = `UPDATE Sedes SET Tiposede = '${nuevoTipo}' WHERE Codigo = '${codigo}'`;
    await sql.query(query);
  } catch (error) {
    console.error('Error al actualizar la base de datos:', error);
    throw error;
  }
}

const modificar = document.getElementById('modificar')
modificar.addEventListener('click', async function() {

    modificar.disabled = true

  const formulario = document.querySelector('#formulario');
  const codigo = document.getElementById('codigodesede').value;
  const nuevaSede = document.getElementById('nombre_sede').value;
  const nuevoTipo = document.getElementById('tiposede').value;  



  let nombresMostrados = {
    'nombre_sede': 'Por favor, ingrese un nombre para la sede ',
    'tiposede': 'Por favor, seleccione un tipo de sede',
  

    // Agrega más mapeos según sea necesario
  };


  // const ConsultaSede = `SELECT count(*) as count FROM Sedes where sede = '${nuevaSede}'`;
  // const pool = await consultar;
  // const result = await pool.request().query(ConsultaSede);

  // const count = result.recordset[0].count;

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
        
          setTimeout(() =>{ modificar.disabled = false }, 2500)
      } 
 
     

         else{

            ipcRenderer.send('modification-confirm-dialog')
            const index = await new Promise((resolve) => {
              ipcRenderer.once('modification-dialog-result', (event, index) => {
                resolve(index)
              })
            })
          
            if (index === 1) {
              modificar.disabled = false
              // El usuario hizo clic en "no"
            }
             else {
              // El usuario hizo clic en "si"

              modificar.disabled = false
    try {
      await actualizarSede(codigo, nuevaSede);
      await actualizarTipoSede(codigo, nuevoTipo);
      console.log('Datos actualizados con éxito');

    } catch (error) {
      console.log('Error al actualizar la sede y el tipo de sede');
    }
    ipcRenderer.send('datosModificados')
    location.reload();
}}
});


//Fin de codigo para traer y modificar las sedes



//Codigo para buscar y modificar los tipos de sedes

async function obtenertiposede(codigo) {
  try {
    await sql.connect(config);
    const query = `SELECT Tiposede FROM Tiposede WHERE Id= '${codigo}'`;
    const result = await sql.query(query);
    return result.recordset[0] || {Tiposede: 'Codigo no existente',};
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    throw error;
  }
}

document.getElementById('inputTiposede').addEventListener('input', async function() {
  const codigo = this.value;
  try {
    const {Tiposede} = await obtenertiposede(codigo);
    document.getElementById('nombre_tipo').value = Tiposede;
   console.log(Tiposede)
  } catch (error) {
    document.getElementById('nombre_tipo').value = 'Error al obtener el tipo de sede';
   
  }
});

async function actualizarTipo(codigo, nuevoTipo) {
  try {
    await sql.connect(config);
    const query = `UPDATE Tiposede SET Tiposede = '${nuevoTipo}' WHERE Id = '${codigo}'`;
    await sql.query(query);
  } catch (error) {
    console.error('Error al actualizar la base de datos:', error);
    throw error;
  }
}

document.getElementById('modificar2').addEventListener('click', async function() {
  const codigo = document.getElementById('inputTiposede').value;
  const nuevoTipo = document.getElementById('nombre_tipo').value;


  let nombresMostrados = {
    'nombre_tipo': 'Por favor, ingrese un nombre para el tipo sede ',

    // Agrega más mapeos según sea necesario
  };


  const ConsultaCedula = `SELECT count(*) as count FROM Tiposede where Tiposede= '${nuevoTipo}'`;
  const pool = await consultar;
  const result = await pool.request().query(ConsultaCedula);

  const count = result.recordset[0].count;

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
       else if( count >0){

          ipcRenderer.send('tiposedeExistente', nuevoTipo)
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
  
  try {
    await actualizarTipo(codigo, nuevoTipo);

    console.log('Tipo de vehículo actualizado con éxito');
  } catch (error) {
    console.log('Error al actualizar el tipo de vehículo');
  }
    formulario2.reset()
    location.reload();
}}
});

      const eliminar = document.getElementById("eliminar");

      eliminar.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
      const Nombre_Tipo = document.querySelector('input[name="nombre_tipo"]').value;
      // const Tiposede = document.querySelector('#tiposede').value;


        let nombresMostrados = {
          'nombre_tipo': 'Por favor, ingrese un tipo de sede ',
          // Agrega más mapeos según sea necesario
        };
     
        // const ConsultaSede = `SELECT count(*) as count FROM Sedes where sede = '${Nombre}'`;
     

      // const result2 = await pool.request().query(ConsultaSede);
      // const result2 = await pool.request().query(consulta)
      // const count2 = result2.recordset.map()
    
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

                  ipcRenderer.send('modification-confirm-dialog')
                  const index = await new Promise((resolve) => {
                    ipcRenderer.once('modification-dialog-result', (event, index) => {
                      resolve(index)
                    })
                  })
                
               if(index === 1) {
                    // El usuario hizo clic en "no"
                  }

                   else {
                    // El us
          
              // Utiliza los valores en tus consultas SQL
              await eliminarTiposede({ Nombre_Tipo});
              ipcRenderer.send('datosModificados');
              // Limpia los campos del formulario
              // formulario3.reset();
              location.reload();
          } }
      });

  
      async function eliminarTiposede(datos) {
          try {
              const pool = await consultar;
              const sqlQuery = `Delete Tiposede where Tiposede ='${datos.Nombre_Tipo}'`;
              const result = await pool.request().query(sqlQuery);
              console.log(datos.count)
              console.log('Registro agregado a la base de datos:', result);
          } catch (error) {
            console.log(datos.count)
              console.log('Error al agregar el registro:', error);
          }
      
      }

      const Anular = document.getElementById("anular");
      const formulario3 = document.querySelector('#formulario');
  
        Anular.addEventListener('click', async (evento) => {
        evento.preventDefault(); // Evita que el formulario se envíe automáticamente
    
          const Nombre = document.querySelector('input[name="nombre_sede"]').value;
          // const Tiposede = document.querySelector('#tiposede').value;
  
  
          let nombresMostrados = {
            'nombre_sede': 'Por favor, ingrese una Sede ',
       
            // Agrega más mapeos según sea necesario
          };
  
          const consulta = `select Id  from Tiposede where Tiposede = 'Anulada'`
          const pool = await consultar;
          const result = await pool.request().query(consulta);
          // const ConsultaSede = `SELECT count(*) as count FROM Sedes where sede = '${Nombre}'`;
       
        
        const count = result.recordset[0].Id;
  
        // const result2 = await pool.request().query(ConsultaSede);
        // const result2 = await pool.request().query(consulta)
        // const count2 = result2.recordset.map()
        console.log(count)
      
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
  
                    ipcRenderer.send('anular-confirm-dialog')
                    const index = await new Promise((resolve) => {
                      ipcRenderer.once('anular-dialog-result', (event, index) => {
                        resolve(index)
                      })
                    })
                  
                 if(index === 1) {
                      // El usuario hizo clic en "no"
                    }
  
                     else {
                      // El us
            
                // Utiliza los valores en tus consultas SQL
                await eliminarTipos({ Nombre, count});
                ipcRenderer.send('datoEliminado');
                // Limpia los campos del formulario
                // formulario3.reset();
                location.reload();
            } }
        });
  
    
        async function eliminarTipos(datos) {
            try {
                const pool = await consultar;
                const sqlQuery = `update Sedes set Tiposede =${datos.count} where Sede = '${datos.Nombre}'`;
                const result = await pool.request().query(sqlQuery);
                console.log(datos.count)
                console.log('Registro agregado a la base de datos:', result);
            } catch (error) {
              console.log(datos.count)
                console.log('Error al agregar el registro:', error);
            }
        
        }

     

        const printButton = document.querySelector('#Imprimir');
        printButton.addEventListener('click', () => {


          const generarSedesPDF = require('./ImprimirSedes')

          generarSedesPDF();

          // ipcRenderer.send('imprimir-sedes')
          //
        });


        const printTipoButton = document.querySelector('#imprimirTipo');
        printTipoButton.addEventListener('click', () => {

          const generarTiposPDF = require('./ImprimirTiposedes')

          generarTiposPDF();
        });



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

module.exports = {obtenerSedes, obtenertipos}