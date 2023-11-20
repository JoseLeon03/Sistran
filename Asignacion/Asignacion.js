const sql = require('mssql')
const {consultar, config} = require ('../Promise')

const obtenerAsignaciones = (conexion) => {
   const request = new sql.Request(conexion)
   // return request.query(`SELECT Format (Fecha_asignacion , 'dd/MM/yyyy') as Fecha_asignacion, Cedula, Placa , Id  FROM Asignacion_vehiculos order by Cedula`).then((result) => {
       return request.query(`select a.Id ,Año , format (Fecha_asignacion , 'dd/MM/yyyy') as Fecha_asignacion , a.Cedula  , Nombre ,Propietario,Apellido , a.Placa, k.Marca as Marca, m.Modelo as Modelo, t.Tipo from Asignacion_vehiculos as a, Empleados as e, Vehiculos as v, Marca as k, Modelo as m, Tipovehiculo as t where a.Cedula = e.Cedula and a.Placa = v.Placa and v.Marca = k.Id and v.Modelo = m.Id and v.Tipovehiculo = t.Id and a.Estatus = 1 order by a.Id desc`).then((result) => {
     const asignados = result.recordset.map((row) => ({

       Id_a: row.Id,
       Cedula_a: row.Cedula,
       Nombre_a: row.Nombre,
       Apellido_a: row.Apellido,
       Placa_a: row.Placa,
       Marca_a: row.Marca,
       Modelo_a: row.Modelo,
       Tipo_a: row.Tipo,
       Fecha_a: row.Fecha_asignacion,
       Año_a: row.Año,
       Propietario_a: row.Propietario,



     }))
     return asignados
   })
 }
 
 module.exports = obtenerAsignaciones;
 
 
 
 //Codigo para usar si la consulta esta en un archivo diferente
 // const obtenerSedes = require('./')

 let currentPage = 0;
 const rowsPerPage = 15;
 
   const renderAsignacionesTable = (asignados) => {
   const tableBody = document.querySelector('#tabla-asignados  tbody');
   tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
   const start = currentPage * rowsPerPage;
   const end = start + rowsPerPage;
   const currentAsignados = asignados.slice(start, end);
 
 

     currentAsignados.forEach((column) => {
 
     const rowElement = document.createElement('tr')
     const IdCell = document.createElement('td')
     const CedulaCell = document.createElement('td')
     const NombreCell = document.createElement('td')
     const ApellidoCell = document.createElement('td')
     const PlacaCell = document.createElement('td')
     const MarcaCell = document.createElement('td')
     const ModeloCell = document.createElement('td')
     const TipoCell = document.createElement('td')
     const Fecha_asignacionCell = document.createElement('td')
     const AñoCell = document.createElement('td')
     const PropietarioCell = document.createElement('td')


 
     IdCell.textContent = column.Id_a
     CedulaCell.textContent = column.Cedula_a
     NombreCell.textContent = column.Nombre_a
     ApellidoCell.textContent = column.Apellido_a
     PlacaCell.textContent = column.Placa_a
     MarcaCell.textContent = column.Marca_a
     ModeloCell.textContent = column.Modelo_a
     TipoCell.textContent = column.Tipo_a
     Fecha_asignacionCell.textContent = column.Fecha_a
     AñoCell.textContent = column.Año_a
     PropietarioCell.textContent = column.Propietario_a


      rowElement.appendChild(IdCell)
      rowElement.appendChild(CedulaCell)
      rowElement.appendChild(NombreCell)
      rowElement.appendChild(ApellidoCell)
      rowElement.appendChild(PlacaCell)
      rowElement.appendChild(MarcaCell)
      rowElement.appendChild(ModeloCell)
      rowElement.appendChild(TipoCell)
      rowElement.appendChild(Fecha_asignacionCell)
      rowElement.appendChild(AñoCell)
      rowElement.appendChild(PropietarioCell)
       tableBody.appendChild(rowElement)



     });
     const maxPages = Math.ceil(asignados.length / rowsPerPage);
     const paginationInfoDiv = document.querySelector('#pagina-asignacion');
     paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
    
    };  
    consultar.connect().then(() => {
   obtenerAsignaciones(consultar).then((asignados) => {
      renderAsignacionesTable(asignados)


      
        // Agregar controladores de eventos al botón de siguiente página
        const nextPageButton1 = document.querySelector('#nextPage');
        nextPageButton1.addEventListener('click', () => {
          const maxPages = Math.ceil(asignados.length / rowsPerPage);
          if (currentPage < maxPages - 1) {
            currentPage++;
            renderAsignacionesTable(asignados);
          }
        });
    
        // Agregar controladores de eventos al botón de página anterior
        const previousPageButton1 = document.querySelector('#previousPage');
        previousPageButton1.addEventListener('click', () => {
          if (currentPage > 0) {
            currentPage--;
            renderAsignacionesTable(asignados);
          }
        });
    
        // Agregar controladores de eventos al botón de primera página
        const firstPageButton1 = document.querySelector('#firstPage');
        firstPageButton1.addEventListener('click', () => {
          currentPage = 0;
          renderAsignacionesTable(asignados);
        });
    
        // Agregar controladores de eventos al botón de última página
        const lastPageButton1 = document.querySelector('#lastPage');
        lastPageButton1.addEventListener('click', () => {
          currentPage = Math.floor(asignados.length / rowsPerPage) ;
          renderAsignacionesTable(filteredListados);
        });

        let filteredListados = asignados;
        let cedula2FilterValue = '';
   
        
        const updateFilteredListados = () => {
   
         filteredListados = asignados.filter((listado) => {
   
               return String(listado.Cedula_a).toLowerCase().startsWith(cedula2FilterValue);
         })
         renderAsignacionesTable(filteredListados);
       };
   
         updateFilteredListados();
   
         const cedulaFiltro2 = document.querySelector('#inpCedula');
         cedulaFiltro2.addEventListener('input', (event) => {
           cedula2FilterValue = event.target.value;
           updateFilteredListados();
         });
   
   


     const filasTabla = document.querySelectorAll('#tabla-asignados tbody tr');


filasTabla.forEach(fila => {
  
    const id_asignacion = fila.querySelector('td:nth-child(1)').textContent;
    const Cedula = fila.querySelector('td:nth-child(2)').textContent;
    const Nombre = fila.querySelector('td:nth-child(3)').textContent;
    const Apellido = fila.querySelector('td:nth-child(4)').textContent;
    const Placa = fila.querySelector('td:nth-child(5)').textContent;
    const Marca = fila.querySelector('td:nth-child(6)').textContent;
    const Modelo = fila.querySelector('td:nth-child(7)').textContent;
    const Tipo = fila.querySelector('td:nth-child(8)').textContent;
    const Fecha = fila.querySelector('td:nth-child(9)').textContent;
    const Año = fila.querySelector('td:nth-child(10)').textContent;
    const Propietario = fila.querySelector('td:nth-child(11)').textContent;



  
  })

    const element = document.getElementById("asignar");

       element.addEventListener('click', async (evento) => {
 
       evento.preventDefault(); // Evita que el formulario se envíe automáticamente

       element.disabled = true

        const Cedula = document.querySelector('input[name="Cedula"]').value;
        const Vehiculo = document.querySelector('input[name="Vehiculo"]').value;
        const Fecha = document.querySelector('input[name="Fecha"]').value;

        const ConsultaEmpleado = `SELECT count(*) as count FROM Asignacion_vehiculos where Cedula= '${Cedula}' and Estatus = 1`;
        const ConsultaVehiculo = `SELECT count(*) as counts FROM Asignacion_vehiculos where Placa= '${Vehiculo}' and Estatus =1`;
        const consultaAsignacion = `Select count(*) as count3 From asignacion_vehiculos where Placa = '${Vehiculo}' and Cedula ='${Cedula}' and Estatus = 1`
          const pool = await consultar;
       
          const result = await pool.request().query(ConsultaEmpleado);
          const result2 = await pool.request().query(ConsultaVehiculo);
          const result3 = await pool.request().query(consultaAsignacion);


          const count = result.recordset[0].count;
          const count2 = result2.recordset[0].counts;
          const count3 = result3.recordset[0].count3;


        let nombresMostrados = {
        'Fecha': 'Por favor, ingrese la fecha de hoy ',
        'Vehiculo': 'Por favor, seleccione un vehículo',
        'Cedula': 'Por favor, seleccione un empleado',


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
            setTimeout(() =>{
              element.disabled = false
                 }, 2500)
        } 


        const result5 = await pool.request().query(`SELECT  Modelo.Modelo, Tipovehiculo.Tipo, Marca.Marca, Propietario, Año FROM Vehiculos, Modelo, Tipovehiculo, Marca  where Vehiculos.Marca = Marca.id and Vehiculos.Modelo = Modelo.id and Vehiculos.Tipovehiculo = Tipovehiculo.id and placa = '${Vehiculo}'`);
        const result6 = await pool.request().query(`SELECT Nombre, Apellido from Empleados where cedula = '${Cedula}'`);

        const vehiculo = result5.recordset[0];
        const empleado = result6.recordset[0];

        const Nombre = empleado.Nombre;
        const Apellido = empleado.Apellido;

        const Placa = Vehiculo;
        const Modelo = vehiculo.Modelo;
        const Tipo = vehiculo.Tipo;
        const Propietario = vehiculo.Propietario;
        const Año = vehiculo.Año;
        const Marca = vehiculo.Marca;


        if (count3 > 0) {
          ipcRenderer.send('asignacionExistente', Cedula, Vehiculo);
          element.disabled = false
        } else if (count > 0) {
          ipcRenderer.send('empleadoAsignado', Cedula);
          const index = await new Promise((resolve) => {
            ipcRenderer.once('empleadoResultado', (event, index) => {
              resolve(index);
            });
          });
          if (index === 0) {
            element.disabled = false
            // El usuario hizo clic en "sí"
          if (count2 > 0) {
            element.disabled = false
              ipcRenderer.send('vehiculoAsignado', Vehiculo);
              const index2 = await new Promise((resolve) => {
                ipcRenderer.once('vehiculoResultado', (event, index2) => {
                  resolve(index2);
                });
              });
              if (index2 === 0) { // El usuario hizo clic en "sí"
                element.disabled = false
                await paraAsignar(Cedula, Vehiculo, Fecha , Nombre, Apellido, Placa, Marca, Modelo, Tipo, Año, Propietario);
              }
            } else {
              element.disabled = false
              await paraAsignar(Cedula, Vehiculo, Fecha , Nombre, Apellido, Placa, Marca, Modelo, Tipo, Año, Propietario )  
            }
          }
        } else if (count2 > 0) {
          element.disabled = false
          ipcRenderer.send('vehiculoAsignado', Vehiculo);

          const index2 = await new Promise((resolve) => {
            ipcRenderer.once('vehiculoResultado', (event, index2) => {
              resolve(index2);
            });
          });

          if (index2 === 0) { // El usuario hizo clic en "sí"
            element.disabled = false
            await paraAsignar(Cedula, Vehiculo, Fecha , Nombre, Apellido, Placa, Marca, Modelo, Tipo, Año, Propietario);
          }
          
        } else {
          element.disabled = false
          await paraAsignar(Cedula, Vehiculo, Fecha , Nombre, Apellido, Placa, Marca, Modelo, Tipo, Año, Propietario )  
        }

        // setTimeout(() =>{
        //   location.reload()
        //      }, 1000)
      }) 
  
  async function Asignarvehiculos(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `Update Asignacion_vehiculos set Estatus = 0 where Cedula = ${datos.Cedula} or Placa = '${datos.Vehiculo}';
          INSERT INTO Asignacion_vehiculos (Cedula, Placa, Fecha_asignacion, Estatus ) VALUES ( ${datos.Cedula}, '${datos.Vehiculo}', '${datos.Fecha}', 1)`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }

 }

 
 async function paraAsignar(Cedula, Vehiculo, Fecha , Nombre, Apellido, Placa, Marca, Modelo, Tipo, Año, Propietario) {
    // Utiliza los valores en tus consultas SQL
    await Asignarvehiculos({ Vehiculo, Cedula,  Fecha,});
    ipcRenderer.send('registroExitoso');
  
    ipcRenderer.send('autorizacion-confirm-dialog')
    const index3 = await new Promise((resolve) => {
        ipcRenderer.once('autorizacion-dialog-result', (event, index3) => {
            resolve(index3)
        })
    })
  
    if (index3 === 1) {
        location.reload(); // El usuario hizo clic en "no"
    }
    else{
        const generarAutorizacion = require('./GenerarAutorizacion.js');
  
        await generarAutorizacion({Fecha, Cedula, Nombre, Apellido, Placa, Marca, Modelo, Tipo, Año, Propietario });
        console.log(Fecha, Cedula, Nombre, Apellido, Placa, Marca, Modelo, Tipo, Año, Propietario)
        location.reload();
    }
    // Limpia los campos del formulario
  }
 
 // consulta de la tabla para los superempleados

 const obtenerempleados= (conexion) => {
    const request = new sql.Request(conexion)
    return request.query(`select Cedula Cedula, Nombre Nombres, Apellido Apellidos, telefono Telefono  from Empleados where tipoempleado in (1,7) and activo=1 `).then((result) => {
      const chofer = result.recordset.map((row) => ({
    
        Cedula: row.Cedula,
        Nombre: row.Nombres,
        Apellido: row.Apellidos,
        Telefono: row.Telefono
  
  
      }))
      return chofer
    })
  }
  // fin consulta de la tabla para los superempleados

  //traer tablas de la consulta a la tabla de la ventana emergente

  const renderEmpleadosTable = (chofer) => {
    const tableBody = document.querySelector('#choferes tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    const currentListados = chofer.slice(start, end);
  
      currentListados.forEach((chofer) => {
  
      const rowElement = document.createElement('tr')
      const cedulaCell = document.createElement('td')
      const nombreCell = document.createElement('td')
      const apellidoCell = document.createElement('td') 
      const telefonoCell= document.createElement('td')
      
      cedulaCell.textContent = chofer.Cedula
      nombreCell.textContent = chofer.Nombre
      apellidoCell.textContent = chofer.Apellido
      telefonoCell.textContent = chofer.Telefono
  
        rowElement.appendChild(cedulaCell)
        rowElement.appendChild(nombreCell)
        rowElement.appendChild(apellidoCell)
        rowElement.appendChild(telefonoCell)
        tableBody.appendChild(rowElement)
      })
      const maxPages = Math.ceil(chofer.length / rowsPerPage);
      const paginationInfoDiv = document.querySelector('#pagina-empleados');
      paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
    }

    
     consultar.connect().then(() => {
    obtenerempleados(consultar).then((chofer) => {
      renderEmpleadosTable(chofer)



      
       // Agregar controladores de eventos al botón de siguiente página
     const nextPageButton1 = document.querySelector('#nextPage2');
     nextPageButton1.addEventListener('click', () => {
       const maxPages1= Math.ceil(chofer.length / rowsPerPage);
       if (currentPage < maxPages1 - 1) {
         currentPage++;
         renderEmpleadosTable(filteredListados);
       }
     });
  
     // Agregar controladores de eventos al botón de página anterior
     const previousPageButton1= document.querySelector('#previousPage2');
     previousPageButton1.addEventListener('click', () => {
       if (currentPage > 0) {
         currentPage--;
         renderEmpleadosTable(filteredListados);
       }
     });
  
     // Agregar controladores de eventos al botón de primera página
     const firstPageButton1= document.querySelector('#firstPage2');
     firstPageButton1.addEventListener('click', () => {
       currentPage= 0;
       renderEmpleadosTable(filteredListados);
     });
  
     // Agregar controladores de eventos al botón de última página
     const lastPageButton1= document.querySelector('#lastPage2');
     lastPageButton1.addEventListener('click', () => {
       currentPage= Math.floor(chofer.length / rowsPerPage) ;
       renderEmpleadosTable(filteredListados);
     });

     let filteredListados = chofer;
     let cedulaFilterValue = '';

     
     const updateFilteredListados = () => {

      filteredListados = chofer.filter((listado) => {

            return String(listado.Cedula).toLowerCase().startsWith(cedulaFilterValue);
      })
      renderEmpleadosTable(filteredListados);
    };

      updateFilteredListados();

      const cedulaFiltro = document.querySelector('#cedula');
      cedulaFiltro.addEventListener('input', (event) => {
        cedulaFilterValue = event.target.value;
        updateFilteredListados();
      });



  })
})
//fin de la tabla de los super empleados


//codigo para ingresar datos en los inputs

const tablachoferes = document.getElementById("choferes");
const NombreInput = document.getElementById("NombreInput");
const CedulaInput = document.getElementById("CedulaInput");


tablachoferes.addEventListener("dblclick", function(event) {

  if (event.target.tagName === "TD"){

    const filaSeleccionada = event.target.parentElement;
    const Nombre= filaSeleccionada.children[1].textContent;
    const Cedula = filaSeleccionada.children[0].textContent;

    NombreInput.value = Nombre;
    CedulaInput.value = Cedula;

    const ventanaEmergente = document.getElementById("ventana-choferes");
    ventanaEmergente.style.display = "none";
  
  }
});
//fin de el codigo de los inputs

//consulta para los vehiculos
const obtenerplaca = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`Select Placa,  m.Modelo, k.Marca, t.Tipo, Año ,Poliza ,e.Estadocontrol, Propietario ,Format (Fechacreacion , 'dd/MM/yyyy') as   Fechacreacion , Observacion from Vehiculos as v ,  marca as k, modelo as m, Estadocontrol as e ,tipovehiculo as t where v.marca=k.id and v.modelo=m.id and v.tipovehiculo=t.id  and v.Estadocontrol=e.Id AND v.Estadocontrol = 1`).then((result) => {
    const placa = result.recordset.map((row) => ({
  
      placa_p: row.Placa,
      Marca_p: row.Marca,
      Modelo_p: row.Modelo,
      tipo_t: row.Tipo

    }))
    return placa
  })
}
//fin de la consulta

//Treae tabla de vehiculos a la ventana emergente


const renderVehiculosTable = (marca) => {
  const tableBody = document.querySelector('#placas tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentListados = marca.slice(start, end);

    currentListados.forEach((marca) => {

    const rowElement = document.createElement('tr')
    const placaCell = document.createElement('td')
    const MarcaCell = document.createElement('td')
    const ModeloCell = document.createElement('td')
    const TipoCell = document.createElement('td')
    

    placaCell.textContent = marca.placa_p
    MarcaCell.textContent = marca.Marca_p
    ModeloCell.textContent = marca.Modelo_p
    TipoCell.textContent = marca.tipo_t

      rowElement.appendChild(placaCell)
      rowElement.appendChild(MarcaCell)
      rowElement.appendChild(ModeloCell)
      rowElement.appendChild(TipoCell)
      tableBody.appendChild(rowElement)
    });

    const maxPages = Math.ceil(marca.length / rowsPerPage);
    const paginationInfoDiv = document.querySelector('#pagina-vehiculo');
    paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
    }
    
    
        consultar.connect().then(() => {
        obtenerplaca(consultar).then((marca) => {

          renderVehiculosTable(marca)



      
       // Agregar controladores de eventos al botón de siguiente página
     const nextPageButton1 = document.querySelector('#nextPage2');
     nextPageButton1.addEventListener('click', () => {
       const maxPages1= Math.ceil(marca.length / rowsPerPage);
       if (currentPage < maxPages1 - 1) {
         currentPage++;
         renderVehiculosTable(filteredListados);
       }
     });
  
     // Agregar controladores de eventos al botón de página anterior
     const previousPageButton1= document.querySelector('#previousPage2');
     previousPageButton1.addEventListener('click', () => {
       if (currentPage > 0) {
         currentPage--;
         renderVehiculosTable(filteredListados);
       }
     });
  
     // Agregar controladores de eventos al botón de primera página
     const firstPageButton1= document.querySelector('#firstPage2');
     firstPageButton1.addEventListener('click', () => {
       currentPage= 0;
       renderVehiculosTable(filteredListados);
     });
  
     // Agregar controladores de eventos al botón de última página
     const lastPageButton1= document.querySelector('#lastPage2');
     lastPageButton1.addEventListener('click', () => {
       currentPage= Math.floor(marca.length / rowsPerPage) ;
       renderVehiculosTable(filteredListados);
     });


     let filteredListados = marca;
     let placaFilterValue = '';

     
     const updateFilteredListados = () => {

      filteredListados = marca.filter((listado) => {

            return String(listado.placa_p).toLowerCase().startsWith(placaFilterValue);
      })
      renderVehiculosTable(filteredListados);
    };

      updateFilteredListados();

      const placaFiltro = document.querySelector('#placa');
      placaFiltro.addEventListener('input', (event) => {
        placaFilterValue = event.target.value.toLowerCase();
        updateFilteredListados();
      });






      })
})
//Fin

//ingresar datos en los inputs

const tabla = document.getElementById("placas");

const placaInput = document.getElementById("placaInput");
const modeloInput = document.getElementById("modeloInput");


tabla.addEventListener("dblclick", function(event) {

  if (event.target.tagName === "TD"){

    const filaSeleccionada = event.target.parentElement;
    const placa = filaSeleccionada.children[0].textContent;
    const modelo = filaSeleccionada.children[2].textContent;

    placaInput.value = placa;
    modeloInput.value = modelo;

    const ventanaEmergente = document.getElementById("ventana-vehiculos");
    ventanaEmergente.style.display = "none";
  
  }
});


const ventanaEmergente = document.getElementById('ventana-emergente');

filasTabla.forEach(fila => {
fila.addEventListener('click', () => {    

  const id_asignacion = fila.querySelector('td:nth-child(1)').textContent;
  const Cedula = fila.querySelector('td:nth-child(2)').textContent;
  const Nombre = fila.querySelector('td:nth-child(3)').textContent;
  const Apellido = fila.querySelector('td:nth-child(4)').textContent;
  const Placa = fila.querySelector('td:nth-child(5)').textContent;
  const Marca = fila.querySelector('td:nth-child(6)').textContent;
  const Modelo = fila.querySelector('td:nth-child(7)').textContent;
  const Tipo = fila.querySelector('td:nth-child(8)').textContent;
  const Fecha = fila.querySelector('td:nth-child(9)').textContent;
  const Año = fila.querySelector('td:nth-child(10)').textContent;
  const Propietario = fila.querySelector('td:nth-child(11)').textContent;


  


 
  // Variable para almacenar el ID del viaje seleccionado

// Agregar evento doble clic a las filas de la tabla
  const contenidoVentana = `
  <div id ="menu-bar">
       
            <button type="button" class="menubar-btn" id="botonCerrar"><i class="fas fa-times"></i></button>
         
            </div>
        <h2 class="Titulo">Detalles Asignacion</h2>
        <fieldset id="fieldsetEmergente">
        <div class="Tablas">

            <Div class="Izquierda">
        <label>Fecha:</label>
        <span >${Fecha}</span>
        <br>
        <label >Cedula:</label>
        <span>${Cedula}</span>
        <br>
        <label >Nombre:</label>
        <span>${Nombre} ${Apellido}</span>
        <br>
   
        </Div>
        <div class="Derecha">
        <label >Placa:</label>

        <span>${Placa}</span>
    
        <br>
        <label >Marca:</label>
        <span>${Marca}</span>
        <br>
        <label >Modelo:</label>
        <span>${Modelo}</span>
            <br>
        <label >Tipo:</label>
        <span>${Tipo}</span>
        <br>
        <label >Año:</label>
        <span>${Año}</span>
        </div>

        </div>
        <div class="emergente_btn">
        <button type="button"  class="" id="Imprimir" >Generar Autorizacion para conducir</button>
        </div>
    </fieldset>


  ` 
;
              ventanaEmergente.innerHTML = contenidoVentana;
              ventanaEmergente.style.display = 'block';
            
        const botonCerrar = document.getElementById('botonCerrar');
        botonCerrar.addEventListener('click', () => {
          ventanaEmergente.style.display = 'none';


        });

        const generarAutorizacion = require('./GenerarAutorizacion.js');

        const botonImprimir = document.querySelector('#Imprimir');
        
        botonImprimir.addEventListener('click', async () => {
        
          await generarAutorizacion({Fecha, Cedula, Nombre, Apellido, Placa, Marca, Modelo, Tipo, Año, Propietario });
        
        });
    });
  });
})
})


//funciones para que aparezcan las ventanas emergentes referentes a los listdos
function mostrarVentanachoferes() {
  var ventanaEmergente = document.getElementById("ventana-choferes");
  ventanaEmergente.style.display = "block";
}

function cerrarVentanachoferes() {
  var ventanaEmergente = document.getElementById("ventana-choferes");
  ventanaEmergente.style.display = "none";
}

function mostrarVentanavehiculos() {
  var ventanaEmergente = document.getElementById("ventana-vehiculos");
  ventanaEmergente.style.display = "block";
}

function cerrarVentanavehiculos() {
  var ventanaEmergente = document.getElementById("ventana-vehiculos");
  ventanaEmergente.style.display = "none";
}

//Fin de las funciones