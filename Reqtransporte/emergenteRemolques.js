function emergenteRemolque(currentPage, rowsPerPage){
    const obtenerRemolque= (conexion) => {
      const request = new sql.Request(conexion)
      return request.query(` Select Vehiculos.placa 'Placa', marca.marca'Marca', modelo.Modelo 'Modelo', tipovehiculo.Tipo 'Tipo' 
      From Vehiculos, marca, modelo, tipovehiculo
       Where Vehiculos.marca = marca.Id And Vehiculos.modelo = modelo.Id And Vehiculos.tipovehiculo = tipovehiculo.Id and (vehiculos.Ubicacion=1 or vehiculos.Ubicacion=8) and Vehiculos.Estadocontrol = 1
       And (tipovehiculo.Id=5 or tipovehiculo.Id=6) 
       order by vehiculos.placa`).then((result) => {
        const remolque = result.recordset.map((row) => ({
      
          Placaremolques: row.Placa,
          Marcaremolques: row.Marca,
          Modeloremolques: row.Modelo,
          Tiporemolques: row.Tipo
    
    
        }))
        return remolque
      })
    }
    
      const renderRemolquesTable = (remolque) => {
    
        const tableBody = document.querySelector('#remolque tbody')
    
        tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
        const start = currentPage * rowsPerPage;
        const end = start + rowsPerPage;
        const currentRemolques = remolque.slice(start, end);
    
        currentRemolques.forEach((remolques) => {
    
        const rowElement = document.createElement('tr')
        const PlacaremolquesCell = document.createElement('td')
        const MarcaremolquesCell = document.createElement('td')
        const ModeloremolquesCell = document.createElement('td') 
        const destinoremolquesCell= document.createElement('td')
        
        PlacaremolquesCell.textContent = remolques.Placaremolques
        MarcaremolquesCell.textContent = remolques.Marcaremolques
        ModeloremolquesCell.textContent = remolques.Modeloremolques
        destinoremolquesCell.textContent = remolques.Tiporemolques
    
          rowElement.appendChild(PlacaremolquesCell)
          rowElement.appendChild(MarcaremolquesCell)
          rowElement.appendChild(ModeloremolquesCell)
          rowElement.appendChild(destinoremolquesCell)
          tableBody.appendChild(rowElement)
        })
    
        const maxPages = Math.ceil(remolque.length / rowsPerPage);
        const paginationInfoDiv = document.querySelector('#pagina-remolque');
        paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
        
      }
    
                
    consultar.connect().then(() => {
      obtenerRemolque(consultar).then((remolque) => {
        renderRemolquesTable(remolque);
    
         // Agregar controladores de eventos al botón de siguiente página
         const nextPageButton = document.querySelector('#nextPage4');
         nextPageButton.addEventListener('click', () => {
           const maxPages = Math.ceil(remolque.length / rowsPerPage);
           if (currentPage < maxPages - 1) {
             currentPage++;
             renderRemolquesTable(filteredListados2);
           }
         });
    
         // Agregar controladores de eventos al botón de página anterior
         const previousPageButton = document.querySelector('#previousPage4');
         previousPageButton.addEventListener('click', () => {
           if (currentPage > 0) {
             currentPage--;
             renderRemolquesTable(filteredListados2);
           }
         });
    
         // Agregar controladores de eventos al botón de primera página
         const firstPageButton = document.querySelector('#firstPage4');
         firstPageButton.addEventListener('click', () => {
           currentPage = 0;
           renderRemolquesTable(filteredListados2);
         });
    
         // Agregar controladores de eventos al botón de última página
         const lastPageButton = document.querySelector('#lastPage4');
         lastPageButton.addEventListener('click', () => {
           currentPage = Math.floor(remolque.length / rowsPerPage);
           renderRemolquesTable(filteredListados2);
         });
    
    
         
            let filteredListados2 = remolque;
            let remolqueFilterValue = '';
           
    
    
            const updateFilteredListados2 = () => {
    
              filteredListados2 = remolque.filter((listado) => {
    
                return String(listado.Placaremolques).toLowerCase().startsWith(remolqueFilterValue);
              })
              renderRemolquesTable(filteredListados2);
            };
    
              updateFilteredListados2();
    
              const remolqueFiltro = document.querySelector('#Placa_remolque2');
              remolqueFiltro.addEventListener('input', (event) => {
                document.getElementById("firstPage4").click()
                remolqueFilterValue = event.target.value.toLowerCase();
                updateFilteredListados2();
              });
    
    
    
        })
      })
    }

    module.exports = emergenteRemolque