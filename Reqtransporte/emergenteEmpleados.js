function getEmpleados (currentPage, rowsPerPage){
    const obtenerempleados = (conexion) => {
      const request = new sql.Request(conexion)
      return request.query(`select Cedula , Nombre , Apellido , Telefono  ,Tipoempleado.Tipoempleado  from Empleados, Tipoempleado where  Empleados.Tipoempleado=Tipoempleado.Id and Empleados.Estatus in (1) and activo=1  order by Nombre `).then((result) => {
        const chofer = result.recordset.map((row) => ({
    
          Cedula_e: row.Cedula,
          Nombre_e: row.Nombre,
          Tipoempleado_e: row.Tipoempleado,
          Apellido_e: row.Apellido,
          Telefono_e: row.Telefono
        }))
    
        return chofer
      })
    }
   
   
       const renderChoferesTable = (listados) => {
   
         const tableBody = document.querySelector('#choferes tbody')
         tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
         const start = currentPage * rowsPerPage;
         const end = start + rowsPerPage;
         const currentListados = listados.slice(start, end);
       
         currentListados.forEach((chofer) => {
     
         const rowElement = document.createElement('tr')
         const cedulaCell = document.createElement('td')
         const nombreCell = document.createElement('td')
         const TipoempleadoCell = document.createElement('td')
         const apellidoCell = document.createElement('td') 
         const telefonoCell= document.createElement('td')
         
         cedulaCell.textContent = chofer.Cedula_e
         nombreCell.textContent = chofer.Nombre_e
         TipoempleadoCell.textContent = chofer.Tipoempleado_e
         apellidoCell.textContent = chofer.Apellido_e
         telefonoCell.textContent = chofer.Telefono_e
     
           rowElement.appendChild(cedulaCell)
           rowElement.appendChild(nombreCell)
           rowElement.appendChild(apellidoCell)
           rowElement.appendChild(telefonoCell)
           rowElement.appendChild(TipoempleadoCell)
           tableBody.appendChild(rowElement)
         })
         const maxPages = Math.ceil(listados.length / rowsPerPage);
         const paginationInfoDiv = document.querySelector('#pagina-empleado');
         paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
      }
     
         consultar.connect().then(() => {
           obtenerempleados(consultar).then((listados) => {
             renderChoferesTable(listados);
     
           
              // Agregar controladores de eventos al botón de siguiente página
            const nextPageButton1 = document.querySelector('#nextPage2');
            nextPageButton1.addEventListener('click', () => {
              const maxPages1= Math.ceil(listados.length / rowsPerPage);
              if (currentPage < maxPages1 - 1) {
                currentPage++;
                renderChoferesTable(filteredListados);
              }
            });
         
            // Agregar controladores de eventos al botón de página anterior
            const previousPageButton1= document.querySelector('#previousPage2');
            previousPageButton1.addEventListener('click', () => {
              if (currentPage > 0) {
                currentPage--;
                renderChoferesTable(filteredListados);
              }
            });
         
            // Agregar controladores de eventos al botón de primera página
            const firstPageButton1= document.querySelector('#firstPage2');
            firstPageButton1.addEventListener('click', () => {
              currentPage= 0;
              renderChoferesTable(filteredListados);
            });
         
            // Agregar controladores de eventos al botón de última página
            const lastPageButton1= document.querySelector('#lastPage2');
            lastPageButton1.addEventListener('click', () => {
              currentPage= Math.floor(listados.length / rowsPerPage) ;
              renderChoferesTable(filteredListados);
            });
   
   
                     
               let filteredListados = listados;
               let cedulaFilterValue = '';
       
   
             const updateFilteredListados = () => {
   
               filteredListados = listados.filter((listado) => {
   
                     return String(listado.Cedula_e).toLowerCase().startsWith(cedulaFilterValue);
               })
               renderChoferesTable(filteredListados);
             };
   
               updateFilteredListados();
   
               const cedulaFiltro = document.querySelector('#cedula');
               cedulaFiltro.addEventListener('input', (event) => {
                 document.getElementById("firstPage2").click()
                 cedulaFilterValue = event.target.value.toLowerCase();
                 updateFilteredListados();
               });
   
            
   
       })
     });
  } 

  module.exports = getEmpleados