const sql = require('mssql')
const {consultar, config} = require ('../Promise');

// const Guardar_viajes = document.getElementById("Guardar");
const formulario = document.querySelector('#formulario');

// CREATE SEQUENCE miPuntero AS INT START WITH 1 NO CACHE; CREATE TABLE miTable ( Id INT PRIMARY KEY DEFAULT NEXT VALUE FOR miPuntero, ...<resto_de_campos>... );
// ALTER SEQUENCE miPuntero RESTART WITH 1
document.getElementById('Guardar').addEventListener('click', async function(evento) {

    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

    const Fecha_req = document.querySelector('input[name="Fecha_req"]').value;
    const Origen = document.querySelector('#Origen').value;
    const Destino = document.querySelector('#Destino').value;
    const Sede = document.querySelector('#Sedes').value;
    const Placa_veh = document.querySelector('input[name="Placa"]').value;
    const Placa_cava = document.querySelector('input[name="Placacava"]').value;
    const Precinto= document.querySelector('input[name="Precinto"]').value;
    const Precinto2= document.querySelector('input[name="Precinto2"]').value;
    const Cedula_chofer = document.querySelector('input[name="Cedula_chofer"]').value;
    const Viatico = document.querySelector('input[name="Viatico"]').value;
    const modelo = document.querySelector('input[name="Modelo"]').value;
    // const Peaje = document.querySelector('input[name="Peaje"]').value;
    // const Viatico_total = document.querySelector('input[name="Total"]').value;
    const Ayudante = document.querySelector('input[name="Nombre_ayudante"]').value;
    const Cedula_ayu = document.querySelector('input[name="Cedula_ayudante"]').value;
    const Viatico_ayu = document.querySelector('input[name="Viatico_ayudante"]').value;
    const Observaciones = document.querySelector('textarea[name="Observaciones"]').value;
    const Bultos = document.querySelector('input[name="Bultos"]').value;
    const Contenedor = document.querySelector('input[name="Contenedor"]').value;
    const Placa_remolque = document.querySelector('input[name="Placa_remolque"]').value;
    const Nombre = document.querySelector('input[name="Nombre_chofer"]').value;
    const Viatico_usd2 = document.querySelector('input[name="Viatico_usd"]').value

    let selectElement = document.querySelector('#Sedes'); // Reemplaza '#tuSelect' con el selector de tu elemento select
let selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;

// let selectTiposede = document.querySelector('#Destino'); // Reemplaza '#tuSelect' con el selector de tu elemento select
// let selectedTiposedeTexto= selectElement.options[selectTiposede.selectedIndex].textContent;



// Itera sobre los elementos de entrada
let nombresMostrados = {
  'Cedula_chofer': 'Por favor, seleccione un chofer',
  'Placa': 'Por favor, seleccione un vehiculo',
  'Viatico': 'Por favor, ingrese un viatico',
  'Fecha_req':  'Por favor, ingrese una fecha de requerimiento',
  'Bultos':  'Por favor, ingrese una cantidad de bultos',
  'origen': 'Por favor, seleccione un origen',
  'destino': 'Por favor, seleccione un destino',

  // Agrega más mapeos según sea necesario
};

// Selecciona todos los elementos de entrada con la clase "requerido"

// Selecciona todos los elementos de entrada con la clase "requerido"
let inputs = document.querySelectorAll('input.requerido'+',select');

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
}
  // setTimeout(function(){document.getElementById("Guardar").disabled = false;},5000);

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
      

    // Utiliza los valores en tus consultas SQL
    const [numeroComprobante, id_viaje] = await agregarViaje({Fecha_req, Origen, Sede, Placa_veh, Placa_cava,  Precinto,  Cedula_chofer, Viatico , Ayudante, Cedula_ayu, Viatico_ayu, Observaciones, Bultos, Destino, Contenedor, Placa_remolque, Viatico_usd2, Precinto2, Nombre});
    formulario.reset();

    const generarComprobante = require('./GenerarComprobante');
    await generarComprobante({numeroComprobante});

        const generarSalida = require ('./GenerarAutorizacionsalida')

    

    // await generarSalida({Fecha_req, Placa_veh, Nombre, Cedula_chofer, selectedOptionText, modelo, Placa_remolque, Contenedor, Observaciones, Precinto, Placa_cava, Precinto2  })
    await generarSalida({id_viaje})

    ipcRenderer.send('viaje');
    location.reload();
}}
});



async function agregarViaje(datos) {
  try {
      const pool = await consultar.connect();
      const sqlQuery = `
    

      BEGIN TRANSACTION;

      DECLARE @MyTableVar table(
          Id_viaje int,
          Viatico_chofer decimal,
          Sede int,
          Fecha date,
          Cedula_chofer int,
          Viatico_usd int
      );
      
      INSERT INTO Viajes
          (Cod_origen, Cod_destino, Fecha, Placa_veh, Placa_cava, Precinto, Nombre_ayudante, Cedula_ayudante, Observaciones, Viatico_chofer, Viatico_ayudante, Estatus, Tipoviaje, Bultos, Cedula_chofer, Contenedor, Placa_remolque, Viatico_usd, Precinto2)
      OUTPUT INSERTED.Id_viaje, INSERTED.Viatico_chofer, INSERTED.Cod_destino, INSERTED.Fecha, INSERTED.Cedula_chofer, INSERTED.Viatico_usd INTO @MyTableVar
      VALUES ( ${datos.Origen} , ${datos.Sede}, '${datos.Fecha_req}', '${datos.Placa_veh}', '${datos.Placa_cava || '' }', '${datos.Precinto}', '${datos.Ayudante || ''}', ${datos.Cedula_ayu || 'NULL'}, '${datos.Observaciones}', ${datos.Viatico},${datos.Viatico_ayu || 'NULL'}, 1, ${datos.Destino}, ${datos.Bultos}, ${datos.Cedula_chofer} , '${datos.Contenedor || ''}' , '${datos.Placa_remolque || ''}', ${datos.Viatico_usd2}, '${datos.Precinto2 || ''}');
      -- Ahora puedes usar los valores en @MyTableVar para tu segunda consulta
      INSERT INTO Comprobante_viajes (Codigo_viaje, Monto, Origen, Fecha, Cedula,Monto_usd)
      SELECT Id_viaje, Viatico_chofer, Sede, Fecha, Cedula_chofer, Viatico_usd FROM @MyTableVar;



COMMIT;

Update Empleados set estatus =2 where Cedula = ${datos.Cedula_chofer} or Cedula = '${datos.Cedula_ayu}';
Update Vehiculos set Ubicacion =2 where Placa ='${datos.Placa_veh}' or Placa ='${datos.Placa_cava}' or Placa ='${datos.Placa_remolque}';
      `;
      const sqlQuery2 = `SELECT MAX(Num_comprobante) AS UltimoComprobante FROM Comprobante_viajes`;
      const result2 = await pool.request().query(sqlQuery2)
      const result = await pool.request().query(sqlQuery);

      const sqlQuery3 = `SELECT MAX(Id_viaje) AS id_viaje FROM viajes where Cedula_chofer = ${datos.Cedula_chofer}`;
      const result3 = await pool.request().query(sqlQuery3)
      console.log('Registro agregado a la base de datos:', result);
      // Aquí tienes el número de comprobante
      const id_viaje = result3.recordset[0].id_viaje;
      const numeroComprobante = result2.recordset[0].UltimoComprobante + 1;

      const sqlQuery5 = `Select Sedes.Sede as Destino from Viajes, Sedes  where id_viaje = '${id_viaje}' and Viajes.Cod_destino = Sedes.Codigo`;
      const result5 = await pool.request().query(sqlQuery5)
      const Destino2 = result5.recordset[0].Destino


      const sqlQuery4 = `Update comprobante_viajes set Beneficiario = '${datos.Nombre}', descripcion = '50% Gastos reembolsables a ${Destino2}' where num_comprobante = '${numeroComprobante}'`;
      const result4 = await pool.request().query(sqlQuery4);
      console.log('Registro agregado a la base de datos:', result4);

      const sqlQuery6 = `Insert into Cambio_estatusviaje (Codigo_viaje, Codigo_estado, Sede, Fecha, Bultos ) Values (${id_viaje}, 1, ${datos.Destino}, '${datos.Fecha_req}', ${datos.Bultos})`;
      const result6 = await pool.request().query(sqlQuery6);

      return [numeroComprobante, id_viaje];
      
  } catch (error) {
      console.log('Error al agregar el registro:', error);
  }
}
module.exports = agregarViaje;
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

/* tabla de listado de vehiculos */
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
let currentPage = 0;
const rowsPerPage = 10;

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
    placafilterValue = event.target.value.toLowerCase();
    updateFilteredListados();
  });






}


  /*Fin de tablas */
  
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

const obtenerempleados = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`select Cedula , Nombre , Apellido , Telefono  ,Tipoempleado.Tipoempleado  from Empleados, Tipoempleado where  Empleados.Tipoempleado=Tipoempleado.Id and Empleados.Estatus in (1) and activo=1  order by cedula `).then((result) => {
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
              cedulaFilterValue = event.target.value.toLowerCase();
              updateFilteredListados();
            });

         

    })
  });
  
  /*Fin tabla empleados */

  

  //Inputs para empleados


  const tablachoferes = document.getElementById("choferes");
  const NombreInput = document.getElementById("NombreInput");
  const CedulaInput = document.getElementById("CedulaInput");
  
  
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
document.getElementById("Sedes").addEventListener("change", function () {
  generarCavas(this.value); 
});

let cava = [];
let placafilterValue = '';
 // Ajusta esto al número de filas que quieres por página

async function generarCavas(Sede) {
  try {
    await consultar.connect();
    cava = await obtenercava(consultar, Sede);
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
      placafilterValue = event.target.value.toLowerCase();
      updateFilteredCavas();
    });

  } catch (error) {
    console.error(error);
  }
}

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
        Destinocell.textContent = cava.Destino;

        rowElement.appendChild(placaCell);
        rowElement.appendChild(MarcaCell);
        rowElement.appendChild(ModeloCell);
        rowElement.appendChild(TipoCell);
        rowElement.appendChild(Destinocell);
        tableBody.appendChild(rowElement);
      // Aquí va el código para crear y agregar las filas a la tabla
    });
};

const updateFilteredCavas = () => {
  let filteredCavas = cava.filter((cava) => {
    return String(cava.placa_p).toLowerCase().startsWith(placafilterValue);
  })
  renderCavasTable(filteredCavas);
};


            const obtenercava = (conexion, Sede) => {
              const request = new sql.Request(conexion);
              return request.query(`
              SELECT
              Placa, k.Marca, m.Modelo, s.Sede AS Destino, t.Tipo
            FROM
              Vehiculos AS v
              INNER JOIN marca AS k ON v.marca = k.id
              INNER JOIN modelo AS m ON v.modelo = m.id
              INNER JOIN Sedes AS s ON v.Destino = s.Codigo
              INNER JOIN tipovehiculo AS t ON v.tipovehiculo = t.id
            WHERE
              v.Tipovehiculo IN (2, 4) AND
              v.Estadocontrol = 1 AND
            v.Ubicacion = 1 and 
              v.Destino = ${Sede}
              `).then((result) => {
                const cava = result.recordset.map((row) => ({
                  placa_p: row.Placa,
                  Marca_p: row.Marca,
                  Modelo_p: row.Modelo,
                  tipo_t: row.Tipo,
                  Destino: row.Destino
                }));
                return cava;
              });
            };

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
    placaInput.value='';
    modeloInput.value="";
    modeloRemolqueinput.value = '';

  });

  const radioTab1= document.getElementById('tab1');

  radioTab1.addEventListener('click', () => {
    cavaInput.value = '';
    modeloInputcava.value = '';
    placaInput.value='';
    modeloInput.value="";
    modeloRemolqueinput.value = '';
  });
/*Fin de limpiar inputs */


//tablas remolque

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
            remolqueFilterValue = event.target.value.toLowerCase();
            updateFilteredListados2();
          });



    })
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
  async function obtenerOrigen() {
    try {
  
      await sql.connect(config);
  
      const result = await sql.query(`SELECT Codigo, Sede FROM Sedes, Tiposede WHERE Sedes.Tiposede = Tiposede.id  and Tiposede.Tiposede in ('Distribuidora')`);
  
      await sql.close();
  
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
  
  
  async function generarSelectOrigen() {
    try {
  
      const sedes = await obtenerOrigen();
  
      let selectOptions = '<option value="" disabled selected>Seleccione</option>';
  
      sedes.forEach((row) => {
        selectOptions += `<option value="${row.Codigo}">${row.Sede}</option>`;
      });
  
      const selectHtml = `<select>${selectOptions}</select>`;
      document.getElementById('Origen').innerHTML = selectHtml;
      return selectHtml;
    } catch (error) {
      console.error('Error al generar el select:', error);
      throw error;
    }
  }
  
  generarSelectOrigen()
    .then((selectHtml) => {

      console.log('Select HTML generado:', selectHtml);
    
    })
    .catch((error) => {
        
      console.error('Error en la generación del select:', error);
  
    });
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
  WHERE Sedes.Tiposede = ${valor}` );

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


