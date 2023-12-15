function emergenteVehiculo (currentPage, rowsPerPage){
    const obtenerplaca = (conexion, realizarconsultasdiferentes) => {
      let consultaSQL = `select Placa , k.Marca, m.Modelo , t.Tipo  from Vehiculos as v ,  marca as k, modelo as m,tipovehiculo as t where v.marca=k.id and v.modelo=m.id and v.tipovehiculo=t.id and ubicacion =1 and Estadocontrol =1`;
  
      if (realizarconsultasdiferentes) {
        consultaSQL += " AND Tipovehiculo = 1   order by placa"; /* Este es para el segundo tab */
      } else {
        consultaSQL += " AND Tipovehiculo not in (2 , 5 , 6)   order by placa";  /*Este es para el primer tab */
      }
  
      const request = new sql.Request(conexion);
      return request.query(consultaSQL).then((result) => {
        const placa = result.recordset.map((row) => ({
          placa_p: row.Placa,
          Marca_p: row.Marca,
          Modelo_p: row.Modelo,
          tipo_t: row.Tipo
        }));
        return placa;
      });
    };
  
  
  const inputTab2 = document.querySelector('#tab2'); 
  const tab1 = document.querySelector('#tab1');
  
  inputTab2.addEventListener('change', () => {
    const realizarconsultasdiferentes = inputTab2.checked; 
    consultar.connect().then(() => {
      obtenerplaca(consultar, realizarconsultasdiferentes).then((marca) => {
  
        mostrarResultadosEnTabla(marca);
      }).catch((err) => {
        console.error(err);
      });
    });
  });
  
  
  tab1.addEventListener('click', () => {
    consultar.connect().then(() => {
      obtenerplaca(consultar, false).then((marca) => {
  
        mostrarResultadosEnTabla(marca);
      }).catch((err) => {
        console.error(err);
      });
    });
  });
  
  
  inputTab2.dispatchEvent(new Event('change'));

  
  function mostrarResultadosEnTabla(marca) {
    const renderPlacasTable = (marca) => {
      const tableBody = document.querySelector('#placas tbody');
      tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
      const start = currentPage * rowsPerPage;
      const end = start + rowsPerPage;
      const currentMarca = marca.slice(start, end);
  
      currentMarca.forEach((marca) => {
      const rowElement = document.createElement('tr');
      const placaCell = document.createElement('td');
      const MarcaCell = document.createElement('td');
      const ModeloCell = document.createElement('td');
      const TipoCell = document.createElement('td');
  
      placaCell.textContent = marca.placa_p;
      MarcaCell.textContent = marca.Marca_p;
      ModeloCell.textContent = marca.Modelo_p;
      TipoCell.textContent = marca.tipo_t;
  
      rowElement.appendChild(placaCell);
      rowElement.appendChild(MarcaCell);
      rowElement.appendChild(ModeloCell);
      rowElement.appendChild(TipoCell);
      tableBody.appendChild(rowElement);
    });
    const maxPages = Math.ceil(marca.length / rowsPerPage);
    const paginationInfoDiv = document.querySelector('#pagina-vehiculos');
    paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
    }
  
  
    renderPlacasTable(marca);
  
    const nextPageButton1 = document.querySelector('#nextPage');
    nextPageButton1.addEventListener('click', () => {
      const maxPages1= Math.ceil(marca.length / rowsPerPage);
      if (currentPage < maxPages1 - 1) {
        currentPage++;
        renderPlacasTable(filteredListados);
      }
    });
  
    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton1= document.querySelector('#previousPage');
    previousPageButton1.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderPlacasTable(filteredListados);
      }
    });
  
    // Agregar controladores de eventos al botón de primera página
    const firstPageButton1= document.querySelector('#firstPage');
    firstPageButton1.addEventListener('click', () => {
      currentPage= 0;
      renderPlacasTable(filteredListados);
    });
  
    // Agregar controladores de eventos al botón de última página
    const lastPageButton1= document.querySelector('#lastPage');
    lastPageButton1.addEventListener('click', () => {
      currentPage= Math.floor(marca.length / rowsPerPage) ;
      renderPlacasTable(filteredListados);
    });
  
  
  
    let filteredListados = marca;
    let placafilterValue = '';
  
  
  const updateFilteredListados = () => {
  
    filteredListados = marca.filter((listado) => {
  
          return String(listado.placa_p).toLowerCase().startsWith(placafilterValue);
    })
    renderPlacasTable(filteredListados);
  };
  
    updateFilteredListados();
  
    const placaFiltro = document.querySelector('#placa');
    placaFiltro.addEventListener('input', (event) => {
      document.getElementById("firstPage").click()
      placafilterValue = event.target.value.toLowerCase();
      updateFilteredListados();
    });
  
  
  }
  }
  
    /*Fin de tablas */
    
 
  module.exports = emergenteVehiculo