const sql = require('mssql')
const {consultar, config} = require ('../Promise');
const generarViaje = require('./generarViaje');
const emergenteVehiculo = require('./emergenteVehiculo');
const getEmpleados = require ('./emergenteEmpleados');
const emergenteCavas = require('./emergenteCavas');
const emergenteRemolque = require('./emergenteRemolques');
const selectSedesValue = require('../Utility/obtenerSedeValue');
const selectSedesDisabled = require('../Utility/obtenerSededisabled');

// const Guardar_viajes = document.getElementById("Guardar");
const formulario = document.querySelector('#formulario');

// CREATE SEQUENCE miPuntero AS INT START WITH 1 NO CACHE; CREATE TABLE miTable ( Id INT PRIMARY KEY DEFAULT NEXT VALUE FOR miPuntero, ...<resto_de_campos>... );
// ALTER SEQUENCE miPuntero RESTART WITH 1
const guardarViaje = document.getElementById('Guardar');
  generarViaje(guardarViaje)
//funciones para abrir y cerrar emergergentes

function mostrarVentanaEmergente() {
    var ventanaEmergente = document.getElementById("ventanaEmergente");
    ventanaEmergente.style.display = "block";
  }
  
  function cerrarVentanaEmergente() {
    var ventanaEmergente = document.getElementById("ventanaEmergente");
    ventanaEmergente.style.display = "none";
  }
  
  
  function mostrarVentanaEmergente2() {
    var ventanaEmergente= document.getElementById("ventanaEmergente2");
    ventanaEmergente.style.display = "block";
  }
  
  function cerrarVentanaEmergente2() {
    var ventanaEmergente = document.getElementById("ventanaEmergente2");
    ventanaEmergente.style.display = "none";
  }
  
  
  function mostrarVentanaEmergente3() {
    var ventanaEmergente= document.getElementById("ventanaEmergente3");
    ventanaEmergente.style.display = "block";
  }
  
  function cerrarVentanaEmergente3() {
    var ventanaEmergente = document.getElementById("ventanaEmergente3");
    ventanaEmergente.style.display = "none";
  }
    
  function mostrarVentanaEmergente4() {
    var ventanaEmergente= document.getElementById("ventanaEmergente4");
    ventanaEmergente.style.display = "block";
  }
  
  function cerrarVentanaEmergente4() {
    var ventanaEmergente = document.getElementById("ventanaEmergente4");
    ventanaEmergente.style.display = "none";
  }  
  // function mostrarVentanaEmergente5() {
  //   var ventanaEmergente= document.getElementById("ventanaEmergente5");
  //   ventanaEmergente.style.display = "block";
  // }
  
  // function cerrarVentanaEmergente5() {
  //   var ventanaEmergente = document.getElementById("ventanaEmergente5");
  //   ventanaEmergente.style.display = "none";
  // }
  

//llenar inputs

//input placa
let currentPage = 0;
const rowsPerPage = 15;
/* tabla de listado de vehiculos */
emergenteVehiculo(currentPage, rowsPerPage)

const refrescarVehiculos = document.getElementById('refrescarVehiculos')

refrescarVehiculos.addEventListener('click', async function(evento) {

  emergenteVehiculo(currentPage, rowsPerPage)

})

   /*Input para traer los vehiculos */
   const tabla = document.getElementById("placas");
   const placaInput = document.getElementById("placaInput");
   const modeloInput = document.getElementById("modeloInput");
   
   
   tabla.addEventListener("dblclick", function(event) {
   
     if (event.target.tagName === "TD"){
 
       placaInput.style.color = "black";
       modeloInput.style.color = "black";
   
       const filaSeleccionada = event.target.parentElement;
       const placa = filaSeleccionada.children[0].textContent;
       const modelo = filaSeleccionada.children[2].textContent;
   
       placaInput.value = placa;
       modeloInput.value = modelo;
   
       const ventanaEmergente = document.getElementById("ventanaEmergente");
       ventanaEmergente.style.display = "none";
     
     }
 });
 
 /* Fin traer datos de vehiculo al input */
 
 /*Tabla empleados*/
 getEmpleados(currentPage, rowsPerPage)
  /*Fin tabla empleados */
  const refrescarEmpleados = document.getElementById('refrescarEmpleados')

  refrescarEmpleados.addEventListener('click', async function(evento) {
  
    getEmpleados(currentPage, rowsPerPage)
  
  })
  

  //Inputs para empleados


  const tablachoferes = document.getElementById("choferes");
  const NombreInput   = document.getElementById("NombreInput");
  const CedulaInput   = document.getElementById("CedulaInput");
  
  
  tablachoferes.addEventListener("dblclick", async function(event) {
    if (event.target.tagName === "TD") {
      
      const filaSeleccionada = event.target.parentElement;
      const Nombre = filaSeleccionada.children[1].textContent + ' ' + filaSeleccionada.children[2].textContent;
      const Cedula = filaSeleccionada.children[0].textContent;
  
      NombreInput.value = Nombre;
      CedulaInput.value = Cedula;

  
      try {
        // Realiza la consulta para obtener la información del vehículo
        const pool = await sql.connect(config);
        const query = `SELECT v.Placa, m.Modelo FROM Asignacion_vehiculos a
                       INNER JOIN Vehiculos v ON a.Placa = v.Placa
                       INNER JOIN Modelo m ON v.Modelo = m.Id
                       WHERE a.Cedula = '${Cedula}' AND a.Estatus = '1'`;
  
        const result = await pool.request().query(query);
  
     
        if (result.recordset.length > 0) {

          placaInput.style.color = "black";
           modeloInput.style.color = "black";

            placaInput.value = result.recordset[0].Placa;
            modeloInput.value = result.recordset[0].Modelo;

        } else {
          
           const  NohayVehiculo= "No tiene un vehículo asignado";  

            const nuevaPlaca =  placaInput
            const  nuevoModelo =  modeloInput 
  
            nuevaPlaca.style.color = "red";
            nuevoModelo.style.color = "red";

            nuevaPlaca.value = NohayVehiculo;
            nuevoModelo.value = NohayVehiculo;

          
      
        }
      } catch (error) {
        console.error('Error al obtener la información del vehículo:', error);
      }
  
      const ventanaEmergente = document.getElementById("ventanaEmergente2");
      ventanaEmergente.style.display = "none";

    }
  });  
//Fin inputs empleados

/*Tabla de cavas*/
emergenteCavas(currentPage, rowsPerPage)

const refrescarCavas = document.getElementById('refrescarCavas')

refrescarCavas.addEventListener('click', async function(evento) {
  
  emergenteCavas(currentPage, rowsPerPage)
  
  })
  /*Fin tabla cava*/

  //inputs cavas
  const tablacavas = document.getElementById("cavas");
  const cavaInput = document.getElementById("cavaInput");
  const modeloInputcava = document.getElementById("modeloInputcava");
  const contenedorInput = document.getElementById("ContenedorInput");
  
  tablacavas.addEventListener("dblclick", function(event) {
  
    if (event.target.tagName === "TD"){
  
      const filaSeleccionada = event.target.parentElement;
      const placacava = filaSeleccionada.children[0].textContent;
      const modelocava = filaSeleccionada.children[2].textContent;
  
      cavaInput.value = placacava;
      modeloInputcava.value = modelocava;
  
      const ventanaEmergente = document.getElementById("ventanaEmergente3");
      ventanaEmergente.style.display = "none";
    
    }
  });


  //Fin inputs cava


/*Limpiar inputs al seleccionar el tab */
const radioTab2 = document.getElementById('tab2');

  radioTab2.addEventListener('click', () => {
    cavaInput.value = '';
    modeloInputcava.value = '';
    // placaInput.value='';
    // modeloInput.value="";
    modeloRemolqueinput.value = '';

  });

  const radioTab1= document.getElementById('tab1');

  radioTab1.addEventListener('click', () => {
    cavaInput.value = '';
    modeloInputcava.value = '';
    // placaInput.value='';
    // modeloInput.value="";
    modeloRemolqueinput.value = '';
  });
/*Fin de limpiar inputs */


//tablas remolque
emergenteRemolque(currentPage, rowsPerPage)
const refrescarRemolque = document.getElementById('refrescarRemolque')

  refrescarRemolque.addEventListener('click', async function(evento) {
  
  emergenteRemolque(currentPage, rowsPerPage)
  
  })
//fin tabla remolque

//Input remolque

const tablaRemolque = document.getElementById("remolque");
const remolqueInput = document.getElementById("Placa_remolque");
const modeloRemolqueinput = document.getElementById("Modelo_remolque");




tablaRemolque.addEventListener("dblclick", function(event) {

  if (event.target.tagName === "TD"){

    const filaSeleccionada = event.target.parentElement;
    const remolque = filaSeleccionada.children[0].textContent;
    const modeloRemolque = filaSeleccionada.children[2].textContent;

    remolqueInput.value = remolque;
    modeloRemolqueinput.value = modeloRemolque;

    const ventanaEmergente = document.getElementById("ventanaEmergente4");
    ventanaEmergente.style.display = "none";
  
  }
});


// /* Ventana emergente de contenedores */

// const obtenerContenedor= (conexion) => {
//   const request = new sql.Request(conexion)
//   return request.query(`SELECT Id, expediente, Contenedor, mercancia, capacidad, chofer, cod_viaje1, cod_viaje2, fecharequerimiento, fecharecepcion, fechaAlmacen, fechafin, estatus,
//   Puertoorigen, alquilado, choferalquilado, importadora, bultos, fechadesc, naviera, fechasalidadesc, Vacio, destino, reporte, tienda, embarque, 
//   sidunea FROM Contenedores Where (estatus=0 or estatus=1 or estatus=8) `).then((result) => {
//     const contenedor = result.recordset.map((row) => ({
  
//       Expediente: row.expediente,
//       Contenedor: row.Contenedor,
//       Mercancia: row.mercancia,
//       capacidad: row.capacidad,
//       bultos: row.bultos,
//       destino: row.destino


//     }))
//     return contenedor
//   })
// }

// consultar.connect().then(() => {
//   obtenerContenedor(consultar).then((contenedor) => {
//     const tableBody = document.querySelector('#contenedor tbody')
//     contenedor.forEach((contenedores) => {

//     const rowElement = document.createElement('tr')
//     const ExpedienteCell = document.createElement('td')
//     const ContenedorCell = document.createElement('td')
//     const MercanciaCell = document.createElement('td') 
//     const capacidadCell= document.createElement('td')
//     const bultosCell= document.createElement('td')
//     const destinoCell= document.createElement('td')
    
//     ExpedienteCell.textContent = contenedores.Expediente
//     ContenedorCell.textContent = contenedores.Contenedor
//     MercanciaCell.textContent = contenedores.Mercancia
//     capacidadCell.textContent = contenedores.capacidad
//     bultosCell.textContent = contenedores.bultos
//     destinoCell.textContent = contenedores.destino

//       rowElement.appendChild(ExpedienteCell)
//       rowElement.appendChild(ContenedorCell)
//       rowElement.appendChild(MercanciaCell)
//       rowElement.appendChild(capacidadCell)
//       rowElement.appendChild(bultosCell)
//       rowElement.appendChild(destinoCell)
//       tableBody.appendChild(rowElement)
//     })
//   }).catch((err) => {
//     console.error(err)
//   })
// })
// /*Fin ventana emergente de contenedores */
// /*Completar input de contenedores */
// const tablacontenedor= document.getElementById("contenedor");
// const contenedorInput = document.getElementById("ContenedorInput");



// tablacontenedor.addEventListener("dblclick", function(event) {

//   if (event.target.tagName === "TD"){

//     const filaSeleccionada = event.target.parentElement;
//     const contenedor= filaSeleccionada.children[1].textContent;


//     contenedorInput.value = contenedor;

//     const ventanaEmergente = document.getElementById("ventanaEmergente5");
//     ventanaEmergente.style.display = "none";
  
//   }
// });
// /*Fin de inputs */

  /*Select Origen sede*/
  // async function obtenerOrigen() {
  //   try {
  
  //     await sql.connect(config);
  
  //     const result = await sql.query(`SELECT Codigo, Sede FROM Sedes, Tiposede WHERE Sedes.Tiposede = Tiposede.id  and Tiposede.Tiposede in ('Distribuidora')`);
  
  //     await sql.close();
  
  //     return result.recordset;
  //   } catch (error) {
  //     console.error('Error al obtener los datos:', error);
  //     throw error;
  //   }
  // }
  const consulta =`SELECT Codigo, Sede FROM Sedes, Tiposede WHERE Sedes.Tiposede = Tiposede.id  and Tiposede.Tiposede in ('Distribuidora')`
  const idRequerido = 'Origen'

  selectSedesDisabled(idRequerido, consulta)
  
  // async function generarSelectOrigen() {
  //   try {
  
  //     const sedes = await obtenerOrigen();
  
  //     let selectOptions = '<option value="" disabled selected>Seleccione</option>';
  
  //     sedes.forEach((row) => {
  //       selectOptions += `<option value="${row.Codigo}">${row.Sede}</option>`;
  //     });
  
  //     const selectHtml = `<select>${selectOptions}</select>`;
  //     document.getElementById('Origen').innerHTML = selectHtml;
  //     return selectHtml;
  //   } catch (error) {
  //     console.error('Error al generar el select:', error);
  //     throw error;
  //   }
  // }
  
  // generarSelectOrigen()
  //   .then((selectHtml) => {

  //     console.log('Select HTML generado:', selectHtml);
    
  //   })
  //   .catch((error) => {
        
  //     console.error('Error en la generación del select:', error);
  
  //   });
  /*Fin select de origen*/


  /*Select de Tipo de viaje*/
async function obtenertipodestino() {
    try {
  
      await sql.connect(config);
  
      const result = await sql.query(`SELECT Id, Tiposede FROM Tiposede WHERE Tiposede not in ('Distribuidora','Anulada') `);
  
      await sql.close();
  
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
  
  
  async function generarSelectdestino() {
    try {
  
      const destino = await obtenertipodestino();
  
      let selectOptions = '<option value="" disabled selected>Seleccione</option>';
  
      destino.forEach((row) => {
        selectOptions += `<option value="${row.Id}">${row.Tiposede}</option>`;

        console.log(row.Id);
      });
  
    
      const selectHtml = `<select>${selectOptions}</select>`;
      document.getElementById('Destino').innerHTML = selectHtml ;
      return selectHtml;
    } catch (error) {
      console.error('Error al generar el select:', error);
      throw error;
    }
  }
  
  generarSelectdestino()
    .then((selectHtml) => {
      console.log('Select HTML generado:', selectHtml);
    
    })
    .catch((error) => {
      console.error('Error en la generación del select:', error);
  
    });
  /*Fin select de destino*/
  


// Función para obtener las opciones del segundo select según el valor del primero async
 async function obtenerOpcionesSegundoSelect(valor) {
   try { await sql.connect(config); // Aquí puedes usar el valor para hacer la consulta que necesites

  const result = await sql.query(` SELECT Sedes.Codigo, Sedes.Sede, Tabladeviaticos.Viatico_Bs, Tabladeviaticos.Viatico_Usd FROM Sedes  
  INNER JOIN Tabladeviaticos ON  Tabladeviaticos.Destino = Sedes.Codigo 
  WHERE Sedes.Tiposede = ${valor} order by Sedes.sede` );

   await sql.close(); return result.recordset; 
  }catch (error) { console.error("Error al obtener los datos:", error); 
    throw error; } }

// Función para generar el segundo select al cambiar el primero
 async function generarSegundoSelect() { 
  try { // Obtener el valor del primer select
   const valor = document.getElementById("Destino").value; // Obtener las opciones del segundo select según el valor

    const opciones = await obtenerOpcionesSegundoSelect(valor); // Generar el HTML del segundo select con las opciones

     let selectOptions = `<option value="" disabled selected>Seleccione</option>`;

      opciones.forEach((row) => 
     { selectOptions += `<option value="${row.Codigo}" data-id="${row.Viatico_Bs}" data-id1="${row.Viatico_Usd}">${row.Sede}</option>;` }); 
     const selectHtml = `<select>${selectOptions}</select>` ;
   
     
     
      document.getElementById("Sedes").innerHTML = selectHtml; return selectHtml;
      

     } catch (error) {
       console.error("Error al generar el segundo select:", error);
        throw error; } }

// Añadir un evento al primer select para que se ejecute la función al cambiar 
document.getElementById("Destino").addEventListener("change", generarSegundoSelect);


const select = document.getElementById("Sedes");
const input = document.getElementById("Viaticos");
const input2 = document.getElementById("viatico2");


// // Añadir un evento change al select
select.addEventListener("change", function() {
//   // Obtener el option seleccionado
  const option = select.options[select.selectedIndex];
//   // Obtener el valor del atributo data-id
  const id = option.getAttribute("data-id");
  const id2 = option.getAttribute("data-id1")
//   // Asignar el valor al input
  input.value = id;
  input2.value = id2;
});


