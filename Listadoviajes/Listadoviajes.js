const sql = require('mssql')
const {consultar, config} = require ('../Promise')
const agregarEventosFilas = require('./EmergenteListados.js');
const generarPDF = require('./Imprimirviajes');



const obtenerListados = (conexion) => {
    const request = new sql.Request(conexion)
    return request.query(`SELECT Id_viaje , Format (Fecha , 'dd/MM/yyyy') as Fecha ,sede1.Sede ,sede2.Sede as Sede2 ,estatusviaje.Nombre as Estatus ,(SELECT sum(Monto) Monto FROM Comprobante_viajes Where Codigo_viaje=Viajes.Id_viaje and Tipocomprobante in (1)) Monto ,vehiculo1.Placa ,Placa_cava   ,Placa_remolque ,Empleados.Cedula ,Viatico_Usd,Empleados.Nombre ,Empleados.Apellido , Observaciones ,Viatico_chofer, Nombre_ayudante, Bultos,Contenedor,  (SELECT sum(Monto) Monto FROM Comprobante_viajes Where Codigo_viaje=Viajes.Id_viaje and Comprobante_viajes.Tipocomprobante = 3 ) Pago_peaje , 
    (SELECT sum(Monto_Usd) Monto_usd FROM Comprobante_viajes Where Codigo_viaje=Viajes.Id_viaje and Tipocomprobante in (1) ) Monto_usd,  (SELECT sum(Monto) Monto FROM Comprobante_viajes Where Codigo_viaje=Viajes.Id_viaje and Tipocomprobante in (2) ) GastosBs,  (SELECT sum(Monto_Usd) Monto_Usd FROM Comprobante_viajes Where Codigo_viaje=Viajes.Id_viaje and Tipocomprobante in (2) ) GastosUsd
        From Viajes,Vehiculos as vehiculo1,Sedes as sede1, Sedes as sede2,Empleados,estatusviaje Where Viajes.cod_origen=sede1.Codigo and Viajes.cod_destino=sede2.Codigo and Viajes.placa_veh=vehiculo1.placa  and Viajes.cedula_chofer=Empleados.cedula and Viajes.estatus=estatusviaje.id_estatus
        ORDER BY Viajes.fecha,Viajes.id_viaje
     `).then((result) => {
      const Listado = result.recordset.map((row) => ({
    
        Id_v: row.Id_viaje,
        Fecha_v: row.Fecha,
        Sede1_v: row.Sede,
        Sede2_v: row.Sede2,
        Estatus_v: row.Estatus,
        Monto_v: row.Monto,
        MontoUSD_v: row.Monto_usd,
        GastosUsd: row.GastosUsd,
        GastosBs: row.GastosBs,
        Peaje: row.Pago_peaje,
        Placa_v: row.Placa,
        Placa2_v: row.Placa_cava,
        Placa3_v: row.Placa_remolque,
        Cedula_v: row.Cedula,
        Nombre_v: row.Nombre,
        Apellido_v: row.Apellido,
        Observaciones_v: row.Observaciones,
        Nombreayu_v: row.Nombre_ayudante,
        Contenedor_v: row.Contenedor,
        Bultos_v: row.Bultos,

      }))
      return Listado
    })
  }
  
  module.exports = obtenerListados
  
  let currentPage = 0;
  const rowsPerPage = 15;
  
  
  const renderListadosTable = (listados) => {
    const tableBody = document.querySelector('#listadoviajes tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    const currentListados = listados.slice(start, end);
  
    currentListados.forEach((listado) => {
      const rowElement = document.createElement('tr');
      const id_viajeCell = document.createElement('td');
      const FechaCell = document.createElement('td');
      const SedeCell = document.createElement('td');
      const Sede2Cell = document.createElement('td');
      const EstatusCell = document.createElement('td');
      const MontoCell = document.createElement('td');
      const PlacaCell = document.createElement('td');
      const Placa_cavaCell = document.createElement('td');
      const Placa_remolqueCell = document.createElement('td');
      const CedulaCell = document.createElement('td');
      const NombreCell = document.createElement('td');
      const ApellidoCell = document.createElement('td');
      const ObservacionesCell = document.createElement('td');
      const Nombre_ayudanteCell = document.createElement('td');
      const ContenedorCell = document.createElement('td');
      const BultosCell = document.createElement('td');
  
      id_viajeCell.textContent = listado.Id_v;
      FechaCell.textContent = listado.Fecha_v;
      SedeCell.textContent = listado.Sede1_v;
      Sede2Cell.textContent = listado.Sede2_v;
      EstatusCell.textContent = listado.Estatus_v;
      MontoCell.textContent = listado.Monto_v;
      PlacaCell.textContent = listado.Placa_v;
      Placa_cavaCell.textContent = listado.Placa2_v;
      Placa_remolqueCell.textContent = listado.Placa3_v;
      CedulaCell.textContent = listado.Cedula_v;
      NombreCell.textContent = listado.Nombre_v;
      ApellidoCell.textContent = listado.Apellido_v;
      ObservacionesCell.textContent = listado.Observaciones_v;
      Nombre_ayudanteCell.textContent = listado.Nombreayu_v;
      ContenedorCell.textContent = listado.Contenedor_v;
      BultosCell.textContent = listado.Bultos_v;
  
      rowElement.appendChild(id_viajeCell);
      rowElement.appendChild(FechaCell);
      rowElement.appendChild(SedeCell);
      rowElement.appendChild(Sede2Cell);
      rowElement.appendChild(EstatusCell);
      rowElement.appendChild(MontoCell);
      rowElement.appendChild(PlacaCell);
      rowElement.appendChild(Placa_cavaCell);
      rowElement.appendChild(Placa_remolqueCell);
      rowElement.appendChild(CedulaCell);
      rowElement.appendChild(NombreCell);
      rowElement.appendChild(ApellidoCell);
      rowElement.appendChild(ObservacionesCell);
      rowElement.appendChild(Nombre_ayudanteCell);
      rowElement.appendChild(ContenedorCell);
      rowElement.appendChild(BultosCell);
  
      
     tableBody.appendChild(rowElement);
    });
    const maxPages = Math.ceil(listados.length / rowsPerPage);
    const paginationInfoDiv = document.querySelector('#pagina-listado');
    paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;

    const filasTabla = document.querySelectorAll('#listadoviajes tbody tr');
    const ventanaEmergente = document.getElementById('ventana-emergente');
    agregarEventosFilas(filasTabla, ventanaEmergente);
};
  
  consultar.connect().then(() => {
    obtenerListados(consultar).then((listados) => {
      renderListadosTable(listados);
      
   
    
       // Agregar controladores de eventos al botón de siguiente página
     const nextPageButton1 = document.querySelector('#nextPage');
     nextPageButton1.addEventListener('click', () => {
       const maxPages1= Math.ceil(listados.length / rowsPerPage);
       if (currentPage < maxPages1 - 1) {
         currentPage++;
         renderListadosTable(filteredListados);
       }
     });
  
     // Agregar controladores de eventos al botón de página anterior
     const previousPageButton1= document.querySelector('#previousPage');
     previousPageButton1.addEventListener('click', () => {
       if (currentPage > 0) {
         currentPage--;
         renderListadosTable(filteredListados);
       }
     });
  
     // Agregar controladores de eventos al botón de primera página
     const firstPageButton1= document.querySelector('#firstPage');
     firstPageButton1.addEventListener('click', () => {
       currentPage= 0;
       renderListadosTable(filteredListados);
     });
  
     // Agregar controladores de eventos al botón de última página
     const lastPageButton1= document.querySelector('#lastPage');
     lastPageButton1.addEventListener('click', () => {
       currentPage= Math.floor(listados.length / rowsPerPage) ;
       renderListadosTable(filteredListados);
     });


     
     let filteredListados = listados;
     let cedulaFilterValue = '';
     let placaFilterValue = '';
     let placa2FilterValue = '';
     let placa3FilterValue = '';
     let nombreayuFilterValue = '';
     let estatusFilterValue = 'Viajes no terminados';
     let sedeFilterValue = 'Todas';

          const fechaPosteriorInput = document.querySelector('#fechaPosterior');
      const fechaAnteriorInput = document.querySelector('#fechaAnterior');
      let fechaPosteriorValue = new Date(fechaPosteriorInput.value);
      let fechaAnteriorValue = new Date(fechaAnteriorInput.value)

const updateFilteredListados = () => {

  filteredListados = listados.filter((listado) => {

    // Convertir la fecha en formato 'dd/MM/yyyy' a un objeto Date
    const [day, month, year] = listado.Fecha_v.split('/');
    const fechaListado = new Date(year, month - 1, day);
    // Verificar si la fecha está dentro del rango especificado
    return fechaListado >= fechaPosteriorValue && fechaListado <= fechaAnteriorValue;
  }).filter((listado) => {
    return String(listado.Placa_v).toLowerCase().startsWith(placaFilterValue);
  }).filter((listado) => {
    return String(listado.Placa2_v).toLowerCase().startsWith(placa2FilterValue);
  }).filter((listado) => {
    return String(listado.Placa3_v).toLowerCase().startsWith(placa3FilterValue);
  }).filter((listado) => {
    return String(listado.Nombreayu_v).toLowerCase().startsWith(nombreayuFilterValue);
  }).filter((listado) => {
    return String(listado.Cedula_v).startsWith(cedulaFilterValue);
  }).filter((listado) => {
    if (estatusFilterValue === 'Todos') {
      // Si el valor del filtro es 'Todos', incluir todos los listados
      return true;
    } else if (estatusFilterValue === 'Viajes no terminados') {
      
      // Si el valor del filtro es 'Viajes no terminados', incluir solo los listados cuyo estado no es 'Terminado'
      return listado.Estatus_v.trim() !== 'Viaje finalizado';
    } else {
      // De lo contrario, incluir solo los listados cuyo estado coincide con el valor del filtro
      return listado.Estatus_v.trim() === estatusFilterValue.trim();
    }
  }).filter((listado) => {
    if (sedeFilterValue === 'Todas') {
      // Si el valor del filtro es 'Todas', incluir todos los listados
      return true;
    } else {
      // De lo contrario, incluir solo los listados cuya sede coincide con el valor del filtro
      return listado.Sede2_v === sedeFilterValue;
    }
  });
  renderListadosTable(filteredListados);
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

     
     const placaFilterInput = document.querySelector('#placaVehiculo');
     placaFilterInput.addEventListener('input', (event) => {
       placaFilterValue = event.target.value.toLowerCase();
       updateFilteredListados();
     });
     
     const placa2FilterInput = document.querySelector('#placaCava');
     placa2FilterInput.addEventListener('input', (event) => {
       placa2FilterValue = event.target.value.toLowerCase();
       updateFilteredListados();
     });
     
     const placa3FilterInput = document.querySelector('#placaRemolque');
     placa3FilterInput.addEventListener('input', (event) => {
       placa3FilterValue = event.target.value.toLowerCase();
       updateFilteredListados();
     });
     
     const nombreayuFilterInput = document.querySelector('#inp_ayudante');
     nombreayuFilterInput.addEventListener('input', (event) => {
       nombreayuFilterValue = event.target.value.toLowerCase();
       updateFilteredListados();
     });
     
     const cedulaFilterInput = document.querySelector('#cedula');
     cedulaFilterInput.addEventListener('input', (event) => {
       cedulaFilterValue = event.target.value;
       updateFilteredListados();
     });

     const estatusFilterInput = document.querySelector('#selectEstados');
     estatusFilterInput.addEventListener('change', (event) => {
       estatusFilterValue = event.target.value;
       updateFilteredListados();
     });

        const sedeFilterInput = document.querySelector('#Sedes');
    sedeFilterInput.addEventListener('change', (event) => {
      sedeFilterValue = event.target.value;
      updateFilteredListados();
    });

     
     
     const printButton = document.querySelector('#Imprimir');
     printButton.addEventListener('click', () => {
       // Llamar a la función generarPDF con la matriz de viajes filtrados
       generarPDF(filteredListados);
     });


     async function obtenerEstado() {
      try {
    
        await sql.connect(config);
    
        const result = await sql.query('SELECT Id_estatus, Nombre FROM Estatusviaje');
    
    
        return result.recordset;
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
      }
    }
    
    
    // async function GenerarEstado() {
    //   try {
    //     const destino = await obtenerEstado();
    
    //     let selectOptions = '<option value="Todos">Todos</option>';
    
    
    
    //     destino.forEach((row) => {
    //       // Establecer el valor de las opciones como el id del estatus
    //       selectOptions += `<option value="${row.Nombre}">${row.Nombre}</option>`
            
    //     });
        
    //     const selectHtml = `<select id="selectEstados">${selectOptions}</select>`;
    //     document.getElementById('selectEstados').innerHTML = selectHtml;
    
    //     // Agregar evento change al select
    
    //     return selectHtml;
    //   } catch (error) {
    //     console.error('Error al generar el select:', error);
    //     throw error;
    //   }
    // }


    async function GenerarEstado() {
      try {
        const destino = await obtenerEstado();
    
        let selectOptions = '<option value="Todos">Todos</option>';
    
        // Crear una variable con el valor de la opción seleccionada por defecto
        let opcionSeleccionada = "Viajes no terminados";
    
        // Crear una variable para almacenar el índice de la opción seleccionada
        let indiceSeleccionado = -1;
    
        // Recorrer el array de destino con un bucle for
        for (let i = 0; i < destino.length; i++) {
          // Establecer el valor de las opciones como el id del estatus
          selectOptions += `<option value="${destino[i].Nombre}">${destino[i].Nombre}</option>`;
    
          // Si el valor de la opción es igual al valor de la opción seleccionada
          // Guardar el índice de la opción en la variable indiceSeleccionado
          if (destino[i].Nombre == opcionSeleccionada) {
            indiceSeleccionado = i;
          }
        }
    
        const selectHtml = `<select id="selectEstados">${selectOptions}</select>`;
        document.getElementById("selectEstados").innerHTML = selectHtml;
    
        // Si se encontró el índice de la opción seleccionada
        if (indiceSeleccionado != -1) {
          // Obtener el elemento option correspondiente al índice
          // Usando la propiedad options del select y el índice
          let optionSeleccionada = document
            .getElementById("selectEstados")
            .options[indiceSeleccionado + 1]; // Sumar 1 porque la primera opción es "Todos"
    
          // Agregar el atributo selected al elemento option
          optionSeleccionada.setAttribute("selected", "selected");
        }
    
        // Agregar evento change al select
    
        return selectHtml;
      } catch (error) {
        console.error("Error al generar el select:", error);
        throw error;
      }
    }
    
    GenerarEstado()
      .then((selectHtml) => {
        console.log('Select HTML generado:', selectHtml);
      })
      .catch((error) => {
        console.error('Error en la generación del select:', error);
      });
    
    
    
    

      async function obtenersede() {
        try {
      
          await sql.connect(config);
      
          const result = await sql.query(`SELECT  Sede  FROM Sedes, Tiposede where Tiposede.Id = Sedes.Tiposede and Tiposede.Tiposede not in ('Distribuidora', 'Anulada') order by Sede`);
      
      
          return result.recordset;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          throw error;
        }
      }
      
      
      async function Generarsede() {
        try {
          const destino = await obtenersede();
      
          let selectOptions = '<option value="Todas">Todas</option>';
          
      
          destino.forEach((row) => {
            selectOptions += `<option value="${row.Sede}">${row.Sede}</option>`;
          });
      
          const selectHtml = `<select>${selectOptions}</select>`;
          document.getElementById('Sedes').innerHTML = selectHtml;
          return selectHtml;
        } catch (error) {
          console.error('Error al generar el select:', error);
          throw error;
        }
      }
      
      Generarsede()
        .then((selectHtml) => {
          console.log('Select HTML generado:', selectHtml);
        })
        .catch((error) => {
          console.error('Error en la generación del select:', error);
        });
      
  

    })

 })
//  ipcRenderer.invoke('filtro2', (event) => {


//   console.log('hola', userData)

// })
// async function prueba()  {
//   const userData = await ipcRenderer.invoke('filtrando', datosUsuario)
// console.log(userData)
// }prueba()