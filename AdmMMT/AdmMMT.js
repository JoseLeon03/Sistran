const sql = require('mssql')
const {consultar, config} = require ('../Promise')


/* Consulta para mostrar las marcas*/
const obtenerMarcas = (conexion) => {
    const request = new sql.Request(conexion)
    return request.query(`SELECT Id , Marca  FROM Marca  order by Id`).then((result) => {
      const marca = result.recordset.map((row) => ({
    
        Id_m: row.Id,
        Marca_m: row.Marca,
  
      }))
      return marca
    })
  }
  
  module.exports = obtenerMarcas
  
  let currentPage = 0;
const rowsPerPage = 15;

const renderMarcasTable = (marcas) => {
  const tableBody = document.querySelector('#tabla-marcas tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentMarcas = marcas.slice(start, end);

  currentMarcas.forEach((marca) => {
    const rowElement = document.createElement('tr');
    const IdCell = document.createElement('td');
    const MarcaCell = document.createElement('td');

    IdCell.textContent = marca.Id_m;
    MarcaCell.textContent = marca.Marca_m;

    rowElement.appendChild(IdCell);
    rowElement.appendChild(MarcaCell);
    
    tableBody.appendChild(rowElement);
  });

  const maxPages = Math.ceil(marcas.length / rowsPerPage);
  const paginationInfoDiv = document.querySelector('#pagina-marca');
  paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
};

consultar.connect().then(() => {
  obtenerMarcas(consultar).then((marcas) => {
    renderMarcasTable(marcas);

    // Agregar controladores de eventos al botón de siguiente página
    const nextPageButton1 = document.querySelector('#nextPage');
    nextPageButton1.addEventListener('click', () => {
      const maxPages = Math.ceil(marcas.length / rowsPerPage);
      if (currentPage < maxPages - 1) {
        currentPage++;
        renderMarcasTable(marcas);
      }
    });

    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton1 = document.querySelector('#previousPage');
    previousPageButton1.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderMarcasTable(marcas);
      }
    });

    // Agregar controladores de eventos al botón de primera página
    const firstPageButton1 = document.querySelector('#firstPage');
    firstPageButton1.addEventListener('click', () => {
      currentPage = 0;
      renderMarcasTable(marcas);
    });

    // Agregar controladores de eventos al botón de última página
    const lastPageButton1 = document.querySelector('#lastPage');
    lastPageButton1.addEventListener('click', () => {
      currentPage = Math.floor(marcas.length / rowsPerPage) ;
      renderMarcasTable(marcas);
    });
  }).catch((err) => {
      console.error(err);
  });
});
  /*Fin de consulta */


  /*Consulta para obtener los modelos */

  const obtenerModelos = (conexion) => {
    const request = new sql.Request(conexion)
    // return request.query(`SELECT Id , Nombre , Marca FROM Modelo  order by Id`).then((result) => {
        return request.query(` select m.Id , m.Modelo , k.marca  from modelo as m, marca as k where m.marca = k.id`).then((result) => {
       
      const marca = result.recordset.map((row) => ({
    
        Id_mo: row.Id,
        Modelo_mo: row.Modelo,
        Marca_mo: row.marca,
        
      }))
      return marca
    })
  }
  
  module.exports = obtenerModelos
  
  
const renderModelosTable = (modelos) => {
  const tableBody = document.querySelector('#tabla-modelos tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentModelos = modelos.slice(start, end);

  currentModelos.forEach((modelo) => {
    const rowElement = document.createElement('tr');
    const IdCell = document.createElement('td');
    const ModeloCell = document.createElement('td');
    const MarcaCell = document.createElement('td');

    IdCell.textContent = modelo.Id_mo;
    ModeloCell.textContent = modelo.Modelo_mo;
    MarcaCell.textContent = modelo.Marca_mo;

    rowElement.appendChild(IdCell);
    rowElement.appendChild(ModeloCell);
    rowElement.appendChild(MarcaCell);
    
    tableBody.appendChild(rowElement);
  });

  const maxPages = Math.ceil(modelos.length / rowsPerPage);
  const paginationInfoDiv = document.querySelector('#pagina-modelo');
  paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
};

consultar.connect().then(() => {
  obtenerModelos(consultar).then((modelos) => {
    renderModelosTable(modelos);

    // Agregar controladores de eventos al botón de siguiente página
    const nextPageButton2 = document.querySelector('#nextPage2');
    nextPageButton2.addEventListener('click', () => {
      const maxPages = Math.ceil(modelos.length / rowsPerPage);
      if (currentPage < maxPages - 1) {
        currentPage++;
        renderModelosTable(modelos);
      }
    });

    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton2 = document.querySelector('#previousPage2');
    previousPageButton2.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderModelosTable(modelos);
      }
    });

    // Agregar controladores de eventos al botón de primera página
    const firstPageButton2 = document.querySelector('#firstPage2');
    firstPageButton2.addEventListener('click', () => {
      currentPage = 0;
      renderModelosTable(modelos);
    });

    // Agregar controladores de eventos al botón de última página
    const lastPageButton2 = document.querySelector('#lastPage2');
    lastPageButton2.addEventListener('click', () => {
      currentPage = Math.floor(modelos.length / rowsPerPage) ;
      renderModelosTable(modelos);
    });
  }).catch((err) => {
      console.error(err);
  });
});

/* Fin de consulta */

/*Consulta para obtener los tipos de vehiculos */

  const obtenerTipos = (conexion) => {
    const request = new sql.Request(conexion)
    return request.query(`SELECT Id , Tipo FROM Tipovehiculo  order by Id`).then((result) => {
      const tipos = result.recordset.map((row) => ({
    
        Id_t: row.Id,
        Tipo_t: row.Tipo,
  
      }))
      return tipos
    })
  }
  
  module.exports = obtenerTipos
  
  
const renderTiposTable = (tipos) => {
  const tableBody = document.querySelector('#tabla-tipos tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentTipos = tipos.slice(start, end);

  currentTipos.forEach((tipo) => {
    const rowElement = document.createElement('tr');
    const IdCell = document.createElement('td');
    const TipoCell = document.createElement('td');

    IdCell.textContent = tipo.Id_t;
    TipoCell.textContent = tipo.Tipo_t;

    rowElement.appendChild(IdCell);
    rowElement.appendChild(TipoCell);
    
    tableBody.appendChild(rowElement);
  });
  const maxPages = Math.ceil(tipos.length / rowsPerPage);
  const paginationInfoDiv = document.querySelector('#pagina-tipo');
  paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
};

consultar.connect().then(() => {
  obtenerTipos(consultar).then((tipos) => {
    renderTiposTable(tipos);

    // Agregar controladores de eventos al botón de siguiente página
    const nextPageButton3 = document.querySelector('#nextPage3');
    nextPageButton3.addEventListener('click', () => {
      const maxPages = Math.ceil(tipos.length / rowsPerPage);
      if (currentPage < maxPages - 1) {
        currentPage++;
        renderTiposTable(tipos);
      }
    });

    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton3 = document.querySelector('#previousPage3');
    previousPageButton3.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderTiposTable(tipos);
      }
    });

    // Agregar controladores de eventos al botón de primera página
    const firstPageButton = document.querySelector('#firstPage3');
    firstPageButton.addEventListener('click', () => {
      currentPage = 0;
      renderTiposTable(tipos);
    });

    // Agregar controladores de eventos al botón de última página
    const lastPageButton = document.querySelector('#lastPage3');
    lastPageButton.addEventListener('click', () => {
      currentPage = Math.floor(tipos.length / rowsPerPage) ;
      renderTiposTable(tipos);
    });
  }).catch((err) => {
      console.error(err);
  });
});

  /*Fin de consulta */

/*Crear modelos */
const Guardar_modelos = document.getElementById("Guardar_modelos");
const formulario2 = document.querySelector('#formulario');

Guardar_modelos.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        Guardar_modelos.disabled = true

        const modelo = document.querySelector('input[name="nombre-modelo"]').value;
        const marca = document.querySelector('#selectMarca').value;
   
        const ConsultaModelo = `SELECT count(*) as count FROM Modelo where Modelo = '${modelo}'`;
        const pool = await consultar;
        const result = await pool.request().query(ConsultaModelo);
        const count = result.recordset[0].count;


      if( modelo == ""){
      
          ipcRenderer.send('Dialogomodelo')
          setTimeout(() =>{
            Guardar_modelos.disabled = false
               }, 2500)
       
        }  

       else if (marca == "")
       {  
        await
          ipcRenderer.send('Dialogo') 
          setTimeout(() =>{
            Guardar_modelos.disabled = false
               }, 2500)
        
          }
          else if( count >0){

            ipcRenderer.send('modeloExistente', modelo)
            setTimeout(() =>{
              Guardar_modelos.disabled = false
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
              Guardar_modelos.disabled = false
              // El usuario hizo clic en "no"
            }
            else{
              Guardar_modelos.disabled = false
        // Utiliza los valores en tus consultas SQL
        await agregarModelos({ modelo, marca});

        // Limpia los campos del formulario
        formulario2.reset();

        setTimeout(() =>{
          location.reload();
             }, 1000)
    }}
    });

  
  async function agregarModelos(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `INSERT INTO Modelo (Modelo, Marca) VALUES ('${datos.modelo}', ${datos.marca})`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
          ipcRenderer.send('registroExitoso')
      } catch (error) {
        ipcRenderer.send('error', error);
      }
  
  }


/*//////////////////////////////////////////////////////////////*/




// /*Crear marcas */
const Guardar_marcas = document.getElementById("Guardar_marcas");
const formulario = document.querySelector('#formulario');


     
Guardar_marcas.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente

      Guardar_marcas.disabled = true

        // Solo envía el formulario si el nombre de marca es válido
         const marca = document.querySelector('input[name="nombre_marca"]').value;

         const ConsultaMarcas = `SELECT count(*) as count FROM Marca where Marca = '${marca}'`;
         const pool = await consultar;
         const result = await pool.request().query(ConsultaMarcas);
         const count = result.recordset[0].count;

    
         if (marca == "")
       {   
        await
          ipcRenderer.send('Dialogo') 
          setTimeout(() =>{
            Guardar_marcas.disabled = false
               }, 2500)
          } 

          else if( count >0){

            ipcRenderer.send('marcaExistente', marca)

            setTimeout(() =>{
              Guardar_marcas.disabled = false
                 }, 2500)
          }
          else {
      
            ipcRenderer.send('show-confirm-dialog')
            const index = await new Promise((resolve) => {
              ipcRenderer.once('confirm-dialog-result', (event, index) => {
                resolve(index)
              })
            })
        
            if (index === 1) {
              Guardar_marcas.disabled = false
              // El usuario hizo clic en "no"
            }
            
            else{
              Guardar_marcas.disabled = false
          
          // Utiliza los valores en tus consultas SQL await
           agregarMarcas({marca});
     
            setTimeout(() =>{
             location.reload();
                 }, 1000)

          }}
        });
  
  async function agregarMarcas(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `INSERT INTO Marca (Marca) VALUES ('${datos.marca}')`;
          const result = await pool.request().query(sqlQuery);
          ipcRenderer.send('registroExitoso')

          console.log('Registro agregado a la base de datos:', result);
      } catch (error) {
        ipcRenderer.send('error', error);
      }
  
  }


/*Fin Crear marcas */

/*////////////////////////////////////////////////////////////////////////////*/


/*Crear Tipos de vehiculos */
const Guardar_tipos = document.getElementById("Guardar_tipos");
const formulario3 = document.querySelector('#formulario');

Guardar_tipos.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
      Guardar_marcas.disabled = true

        const tipo = document.querySelector('input[name="nombre-tipo"]').value;

        const ConsultaMarcas = `SELECT count(*) as count FROM tipovehiculo where tipo = '${tipo}'`;
        const pool = await consultar;
        const result = await pool.request().query(ConsultaMarcas);
        const count = result.recordset[0].count;

        if( tipo ==""){
          await
          ipcRenderer.send('Dialogotipo')
          setTimeout(() =>{
            Guardar_marcas.disabled = false
                }, 1000)
        }
        else if( count >0){

          ipcRenderer.send('tipovehiculoExistente', tipo)
          setTimeout(() =>{
          Guardar_marcas.disabled = false
                }, 1000)
        }

        else{

          ipcRenderer.send('modification-confirm-dialog')
          const index = await new Promise((resolve) => {
            ipcRenderer.once('modification-dialog-result', (event, index) => {
              resolve(index)
            })
          })
      
          if (index === 1) {
            Guardar_marcas.disabled = false  // El usuario hizo clic en "no"
          }
          else{

            Guardar_marcas.disabled = false
            // Utiliza los valores en tus consultas SQL
            await agregarTipos({tipo});
            // Limpia los campos del formulario
              setTimeout(() =>{
              location.reload();
                }, 1000)
            }}
  });
  
  async function agregarTipos(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `INSERT INTO Tipovehiculo (Tipo) VALUES ('${datos.tipo}')`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
          ipcRenderer.send('registroExitoso')
      } catch (error) {
        ipcRenderer.send('error', error);
      }
  
  }


/*Fin Crear Tipos de vehiculos */



/*Select para las marcas */
async function obtenerMarcass() {
  try {

    await sql.connect(config);


    const result = await sql.query('SELECT Id,Marca FROM Marca order by Marca');

    



    return result.recordset;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}


async function generarSelectMarcass() {
  try {

    const marcas = await obtenerMarcass();

    let selectOptions = '<option value="" disabled selected>Seleccione</option>';

    marcas.forEach((row) => {
      selectOptions += `<option value="${row.Id}">${row.Marca}</option>`;
    });

    const selectHtml = `<select>${selectOptions}</select>`;
    document.getElementById('selectMarca').innerHTML = selectHtml;
    return selectHtml;
  } catch (error) {
    console.error('Error al generar el select:', error);
    throw error;
  }
}

generarSelectMarcass()
  .then((selectHtml) => {
    console.log('Select HTML generado:', selectHtml);
  
  })
  .catch((error) => {
    console.error('Error en la generación del select:', error);

  });

/*Fin de select para marcas */


//Codigo para buscar y modificar las marcas

async function obtenerNombresedeMarca(codigo) {
  try {
    await sql.connect(config);
    const query = `SELECT  Marca FROM Marca WHERE Id= '${codigo}' `;
    const result = await sql.query(query);
    return result.recordset[0] || {Marca: 'Codigo no existente',};
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    throw error;
  }
}

document.getElementById('marca').addEventListener('input', async function() {
  const codigo = this.value;
  try {
    const {Marca} = await obtenerNombresedeMarca(codigo);
    document.getElementById('nombre_marca').value = Marca;
   
  } catch (error) {
    document.getElementById('nombre_marca').value = 'Error al obtener la marca';
   
  }
});

async function actualizarSede(codigo, nuevaMarca) {
  try {
    await sql.connect(config);
    const query = `UPDATE Marca SET Marca = '${nuevaMarca}' WHERE Id = '${codigo}'`;
    await sql.query(query);
  } catch (error) {
    console.error('Error al actualizar la base de datos:', error);
    throw error;
  }
}



document.getElementById('modificar').addEventListener('click', async function() {
  const codigo = document.getElementById('marca').value;
  const nuevaMarca = document.getElementById('nombre_marca').value;

  const ConsultaMarcas = `SELECT count(*) as count FROM Marca where Marca = '${nuevaMarca}'`;
  const pool = await consultar;
  const result = await pool.request().query(ConsultaMarcas);
  const count = result.recordset[0].count;


  if (marca == "")
{   
 await
   ipcRenderer.send('Dialogo') 
   } 

   else if( count >0){

     ipcRenderer.send('marcaExistente', nuevaMarca)
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

 
  try {
    await actualizarSede(codigo, nuevaMarca);

    console.log('Marca actualiza con éxito');
  } catch (error) {
    console.log('Error al actualizar la sede y el tipo de sede');
  }
  ipcRenderer.send('datosModificados')
  location.reload();
  }
}
});


//!FiN de codigo para traer y modificar marcas



//!Inicio de codigo para traer y modificar modelos
async function obtenerNombremodelo(codigo) {
  try {
    await sql.connect(config);
    const query = `SELECT Marca, Modelo FROM Modelo WHERE Id= '${codigo}'`;
    const result = await sql.query(query);
    return result.recordset[0] || {Marca: 'Codigo no existente', Modelo: 'Codigo no existente'};
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    throw error;
  }
}

document.getElementById('modelo').addEventListener('input', async function() {
  const codigo = this.value;
  try {
    const {Marca, Modelo} = await obtenerNombremodelo(codigo);
    document.getElementById('nombre-modelo').value = Modelo;
    document.getElementById('selectMarca').value = Marca;
  } catch (error) {
    document.getElementById('nombre-modelo').value = 'Error al obtener el modelo';
    document.getElementById('selectMarca').value = ':(';
  }
});


async function actualizarmodelo(codigo, nuevoModelo) {
  try {
    await sql.connect(config);
    const query = `UPDATE Modelo SET Modelo = '${nuevoModelo}' WHERE Id = '${codigo}'`;
    await sql.query(query);
  } catch (error) {
    console.error('Error al actualizar la base de datos:', error);
    throw error;
  }
}

async function actualizarmarcamodelo(codigo, nuevaMarca) {
  try {
    await sql.connect(config);
    const query = `UPDATE Modelo SET Marca = '${nuevaMarca}' WHERE Id = '${codigo}'`;
    await sql.query(query);
  } catch (error) {
    console.error('Error al actualizar la base de datos:', error);
    throw error;
  }
}

document.getElementById('modificar2').addEventListener('click', async function() {
  const codigo = document.getElementById('modelo').value;
  const nuevoModelo = document.getElementById('nombre-modelo').value;
  const nuevaMarca = document.getElementById('selectMarca').value;


  const ConsultaMarcas = `SELECT count(*) as count FROM Modelo where modelo = '${nuevoModelo}'`;
  const pool = await consultar;
  const result = await pool.request().query(ConsultaMarcas);
  const count = result.recordset[0].count;

  if( tipo ==""){
    await
    ipcRenderer.send('Dialogomodelo')
  }
  else if (marca == "")
  {  
   await
     ipcRenderer.send('Dialogo') 
     }
  else if( count >0){

    ipcRenderer.send('modeloExistente', nuevoModelo)
  }

  else{

    ipcRenderer.send('modification-confirm-dialog')
    const index = await new Promise((resolve) => {
      ipcRenderer.once('modification-dialog-result', (event, index) => {
        resolve(index)
      })
    })
    console.log(index)
    if (index === 1) {
      // El usuario hizo clic en "no"
    }

    else {

 

    try {
      await actualizarmodelo(codigo, nuevoModelo);
      await actualizarmarcamodelo(codigo, nuevaMarca);
      console.log('Modelo y marca actualizados con éxito');
    } catch (error) {
      console.log('Error al actualizar el modelo y la marca');
    }
    ipcRenderer.send('datosModificados')
    location.reload();
  }
}
    
});
//!fin de codigo para traer modelos y modificarlos

//? Codigo para traer y modificar tipos de vehiculos

async function obtenerNombresTipo(codigo) {
  try {
    await sql.connect(config);
    const query = `SELECT  Tipo FROM Tipovehiculo WHERE Id= '${codigo}'`;
    const result = await sql.query(query);
    return result.recordset[0] || {Tipo: 'Codigo no existente'};
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    throw error;
  }
}

document.getElementById('tipo').addEventListener('input', async function() {
  const codigo = this.value;
  try {
    const {Tipo} = await obtenerNombresTipo(codigo);
    document.getElementById('nombre_tipo').value = Tipo;
   
  } catch (error) {
    document.getElementById('nombre_tipo').value = 'Error al obtener el tipo de vehículo';
   
  }
});

async function actualizarTipo(codigo, nuevoTipo) {
  try {
    await sql.connect(config);
    const query = `UPDATE Tipovehiculo SET Tipo = '${nuevoTipo}' WHERE Id = '${codigo}'`;
    await sql.query(query);
  } catch (error) {
    console.error('Error al actualizar la base de datos:', error);
    throw error;
  }
}

document.getElementById('modificar3').addEventListener('click', async function() {
  const codigo = document.getElementById('tipo').value;
  const nuevoTipo = document.getElementById('nombre_tipo').value;


  const ConsultaMarcas = `SELECT count(*) as count FROM tipovehiculo where tipo = '${nuevoTipo}'`;
  const pool = await consultar;
  const result = await pool.request().query(ConsultaMarcas);
  const count = result.recordset[0].count;

  if( nuevoTipo ==""){
    await
    ipcRenderer.send('Dialogotipo')
  }
  else if( count >0){

    ipcRenderer.send('tipovehiculoExistente', nuevoTipo)
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



  
  try {
    await actualizarTipo(codigo, nuevoTipo);

    console.log('Tipo de vehículo actualizado con éxito');
  } catch (error) {
    console.log('Error al actualizar el tipo de vehículo');
  } ipcRenderer.send('datosModificados')
  location.reload();
  } 
}});




//?fin de codigo para traer tipos y modificarlos


//Codigo para refrescar en la misma pestaña

//Pruebas para que al refrescar se quede en la misma pestaña
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

const Eliminar_marcas = document.getElementById("eliminarMarcas");

Eliminar_marcas.addEventListener('click', async (evento) => {
  evento.preventDefault()

 const marca = document.querySelector('input[name="nombre_marca"]').value;


 ipcRenderer.send('elimination-confirm-dialog')
 const index = await new Promise((resolve) => {
   ipcRenderer.once('elimination-dialog-result', (event, index) => {
     resolve(index)
   })
 })

 if (index === 1) {
   // El usuario hizo clic en "no"
 }
 else{

        await eliminarTipos({marca});
        ipcRenderer.send('datosEliminados')
        location.reload()

 }

})


async function eliminarTipos(datos) {
  try {
      const pool = await consultar;
      const sqlQuery = `Delete from Marca where Marca = '${datos.marca}' `;
      const result = await pool.request().query(sqlQuery);
      console.log('Registro agregado a la base de datos:', result);
  } catch (error) {
    ipcRenderer.send('error', error);
  }

}



const Eliminar_modelo = document.getElementById("eliminarModelo");

  Eliminar_modelo.addEventListener('click', async (evento) => {
    evento.preventDefault()

  const modelo = document.querySelector('input[name="nombre-modelo"]').value;


  ipcRenderer.send('elimination-confirm-dialog')
  const index = await new Promise((resolve) => {
    ipcRenderer.once('elimination-dialog-result', (event, index) => {
      resolve(index)
    })
  })

  if (index === 1) {
    // El usuario hizo clic en "no"
  }
  else{

          await eliminarModelo({modelo});
          ipcRenderer.send('datosEliminados')
          location.reload()

  }

  })


async function eliminarModelo(datos) {
  try {
      const pool = await consultar;
      const sqlQuery = `Delete from Modelo where Modelo = '${datos.modelo}' `;
      const result = await pool.request().query(sqlQuery);
      console.log('Registro agregado a la base de datos:', result);
  } catch (error) {
    ipcRenderer.send('error', error);
  }

}


const Eliminar_tipo = document.getElementById("eliminarTipo");

Eliminar_tipo.addEventListener('click', async (evento) => {
    evento.preventDefault()

  const tipo = document.querySelector('input[name="nombre-tipo"]').value;


  ipcRenderer.send('elimination-confirm-dialog')
  const index = await new Promise((resolve) => {
    ipcRenderer.once('elimination-dialog-result', (event, index) => {
      resolve(index)
    })
  })

  if (index === 1) {
    // El usuario hizo clic en "no"
  }
  else{

          await eliminarTipo({tipo});
          ipcRenderer.send('datosEliminados')
          location.reload()

  }

  })


async function eliminarTipo(datos) {
  try {
      const pool = await consultar;
      const sqlQuery = `Delete from Tipovehiculo where Tipo = '${datos.tipo}' `;
      const result = await pool.request().query(sqlQuery);
      console.log('Registro agregado a la base de datos:', result);
  } catch (error) {
    ipcRenderer.send('error', error);
  }

}



//fin del codigo para refrescar en la misma pestaña