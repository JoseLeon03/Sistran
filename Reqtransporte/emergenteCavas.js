function emergenteCavas (currentPage, rowsPerPage){
document.getElementById("Sedes").addEventListener("change", function () {
  generarCavas(this.value); 
});

let cava = [];
let placafilterValue = '';
 // Ajusta esto al número de filas que quieres por página

 async function generarCavas() {
  try {
    await consultar.connect();
    cava = await obtenercava(consultar);
    updateFilteredCavas();

    // Agregar controladores de eventos al botón de siguiente página
    const nextPageButton = document.querySelector('#nextPage3');
    nextPageButton.addEventListener('click', () => {
      const maxPages = Math.ceil(cava.length / rowsPerPage);
      if (currentPage < maxPages - 1) {
        currentPage++;
        updateFilteredCavas();
      }
    });

    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton = document.querySelector('#previousPage3');
    previousPageButton.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        updateFilteredCavas();
      }
    });

    // Agregar controladores de eventos al botón de primera página
    const firstPageButton= document.querySelector('#firstPage3');
    firstPageButton.addEventListener('click', () => {
      currentPage= 0;
      updateFilteredCavas();
    });

    // Agregar controladores de eventos al botón de última página
    const lastPageButton= document.querySelector('#lastPage3');
    lastPageButton.addEventListener('click', () => {
      currentPage= Math.floor(cava.length / rowsPerPage) ;
      updateFilteredCavas();
    });

    // Agregar controladores de eventos al campo de filtro
    const placaFiltro = document.querySelector('#placa_cava');
    placaFiltro.addEventListener('input', (event) => {
      document.getElementById("firstPage3").click()
      placafilterValue = event.target.value.toLowerCase();
      updateFilteredCavas();
    });

  } catch (error) {
    console.error(error);
  }
}generarCavas()

const renderCavasTable = (cava) => {
  const tableBody = document.querySelector('#cavas tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentCavas = cava.slice(start, end);

    currentCavas.forEach((cava) => { 
      const rowElement = document.createElement('tr');
        const placaCell = document.createElement('td');
        const MarcaCell = document.createElement('td');
        const ModeloCell = document.createElement('td');
        const TipoCell = document.createElement('td');
        const Destinocell = document.createElement('td');

        placaCell.textContent = cava.placa_p;
        MarcaCell.textContent = cava.Marca_p;
        ModeloCell.textContent = cava.Modelo_p;
        TipoCell.textContent = cava.tipo_t;
    

        rowElement.appendChild(placaCell);
        rowElement.appendChild(MarcaCell);
        rowElement.appendChild(ModeloCell);
        rowElement.appendChild(TipoCell);

        tableBody.appendChild(rowElement);
      // Aquí va el código para crear y agregar las filas a la tabla
    });
    const maxPages = Math.ceil(cava.length / rowsPerPage);
    const paginationInfoDiv = document.querySelector('#pagina-cava');
    paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
};

const updateFilteredCavas = () => {
  let filteredCavas = cava.filter((cava) => {
    return String(cava.placa_p).toLowerCase().startsWith(placafilterValue);
  })
  renderCavasTable(filteredCavas);
};


            const obtenercava = (conexion) => {
              const request = new sql.Request(conexion);
              return request.query(`
              SELECT
              Placa, k.Marca, m.Modelo, t.Tipo
            FROM
              Vehiculos AS v
              INNER JOIN marca  AS k ON v.marca   = k.id
              INNER JOIN modelo AS m ON v.modelo  = m.id
              INNER JOIN tipovehiculo AS t ON v.tipovehiculo = t.id
            WHERE
              v.Tipovehiculo IN (2, 3) AND
              v.Estadocontrol = 1 AND
              v.Ubicacion = 1 
              `).then((result) => {
                const cava = result.recordset.map((row) => ({
                  placa_p: row.Placa,
                  Marca_p: row.Marca,
                  Modelo_p: row.Modelo,
                  tipo_t: row.Tipo,
                }));
                return cava;
              });
            };
          }

          module.exports = emergenteCavas