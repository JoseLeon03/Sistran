const sql = require('mssql')
const {consultar, config} = require ('../Promise')
const refrescarTab = require('../Utility/refrescarTab');
const Marcas = require('./Marcas');
const Modelos = require('./Modelos');
const Tipos = require('./Tipos');


function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

function formatDate(date = new Date()) {
 
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}
console.log('hola ', formatDate());




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
Modelos()
/*//////////////////////////////////////////////////////////////*/




// /*Crear marcas */
Marcas()
/*Fin Crear marcas */

/*////////////////////////////////////////////////////////////////////////////*/


Tipos()

//?fin de codigo para traer tipos y modificarlos



//Codigo para refrescar en la misma pestaña
refrescarTab()
//fin del codigo para refrescar en la misma pestaña