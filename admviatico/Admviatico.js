const sql = require('mssql')
const {consultar, config} = require ('../Promise')
const obtenerTasa = require('../Utility/obtenerTasa')
const refrescarTab = require('../Utility/refrescarTab')
const selectSedesValue = require('../Utility/obtenerSedeValue')
const Tasa = require('./Tasa')
const Viaticos = require('./Viaticos')
const selectSedesDisabled = require('../Utility/obtenerSededisabled')


const obtenerViaticos = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`SELECT sede1.Sede as Origen , sede2.Sede as Destino , Viatico_Bs ,Viatico_Usd, Format (Fecha , 'dd/MM/yyyy') as Fecha, Dias 
  from Tabladeviaticos , Sedes as sede1, Sedes as sede2
  where Tabladeviaticos.Origen = sede1.Codigo and Tabladeviaticos.Destino = Sede2.Codigo  and Sede2.Tiposede not in (3)
  order by Destino`).then((result) => {
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



const obtenerlistadoTasa = (conexion) => {
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
  obtenerlistadoTasa(consultar).then((tasas) => {
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
Viaticos()

 obtenerTasa();
       
  async function labelTasa(){
  const Tasa =   await obtenerTasa({}); 
  document.querySelector('label[class="monto"]').innerHTML = `Tasa Actual : ` + Tasa+ ' Bs';
  document.querySelector('label[class="monto2"]').innerHTML = `Tasa Actual : ` + Tasa +' Bs';
    }labelTasa()

/*Guardar Tasa */
Tasa()
/*Fin guardar Tasa */

/* select de origen*/


const consulta2 = `SELECT Codigo, Sede FROM Sedes, Tiposede WHERE Sedes.Tiposede = Tiposede.id  and Tiposede.Tiposede in ('Distribuidora')`
const sedeSelect2 = 'Origen'

selectSedesDisabled(sedeSelect2, consulta2)

/*Fin select de origen*/

 /*Select de Tipo de destino*/
const consulta =  `SELECT Codigo, Sede  FROM Sedes, Tiposede where Tiposede.Id = Sedes.Tiposede and Tiposede.Tiposede not in ('Distribuidora', 'Anulada') order by Sede`
const sedeSelect ='Sedes'

 selectSedesDisabled(sedeSelect, consulta)
 /*Fin select de Tipo de destino*/

  refrescarTab() // refrescar y mantener el tab


module.exports = {obtenerViaticos, obtenerTasa}


        