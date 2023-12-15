const sql = require('mssql')
const {consultar, config} = require ('../Promise')
const Emergentes = require ('./EmergenteContenedores')
const refrescarTab = require('../Utility/refrescarTab')
const track = require('../Utility/Track')

const obtenerContenedores = (conexion) => {
    const request = new sql.Request(conexion)
    // return request.query(`SELECT Format (Fecha_asignacion , 'dd/MM/yyyy') as Fecha_asignacion, Cedula, Placa , Id  FROM Asignacion_vehiculos order by Cedula`).then((result) => {
        return request.query(`SELECT contenedores.Id , Expediente ,Bultos, Contenedor , Contenedores.Mercancia , Chofer , sedes.Sede,format (Fecharequerimiento , 'dd/MM/yyyy') as Fecharequerimiento ,format (Fecharecepcion , 'dd/MM/yyyy') as Fecharecepcion, estatusvehiculo.Estatusvehiculo, Capacidad, Observaciones, format (Fechafin , 'dd/MM/yyyy') as Fechafin, Importadora, Choferalquilado,format (Fechadesc , 'dd/MM/yyyy') as Fechadesc, Tienda, Destino   FROM Contenedores,Sedes,estatusvehiculo WHERE sedes.Codigo=contenedores.Puertoorigen AND estatusvehiculo.id=contenedores.estatus
        Order by id desc`).then((result) => {
      const Contenedores = result.recordset.map((row) => ({

        Id_c: row.Id,
        Expediente_c: row.Expediente,
        Contenedor_c: row.Contenedor,
        Mercancia_c: row.Mercancia,
        Chofer_c: row.Choferalquilado,
        Chofer2_c: row.Chofer,
        Sede_c: row.Sede,
        Fecha_c: row.Fecharequerimiento,
        Importadora_c : row.Importadora,
        Fecharecepcion_c: row.Fecharecepcion,
        Estatus_c: row.Estatusvehiculo,
        Capacidad_c: row.Capacidad,
        Bultos_c: row.Bultos,
        Observacion_c : row.Observaciones,
        Fechafin_c: row.Fechafin,
        Fechadesc_c:row.Fechadesc,
        Destino_c:row.Destino,
        Agente_c:row.Tienda,

        

      }))
      return Contenedores
    })
  }



  //Codigo para usar si la consulta esta en un archivo diferente
  // const obtenerSedes = require('./')
  let currentPage = 0;
const rowsPerPage = 15;

const renderContenedoresTable = (contenedor) => {
  const tableBody = document.querySelector('#tabla-contenedores tbody');
  tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
  const start = currentPage * rowsPerPage;
  const end = start + rowsPerPage;
  const currentContenedor = contenedor.slice(start, end);

  currentContenedor.forEach((column) => {
    const rowElement = document.createElement('tr');
    const IdCell = document.createElement('td');
    const ExpedienteCell = document.createElement('td');
    const ContenedorCell = document.createElement('td');
    const MercanciaCell = document.createElement('td');
    const ChoferCell = document.createElement('td');
    const SedeCell = document.createElement('td');
    const FecharequerimientoCell = document.createElement('td');
    const FecharecepcionCell = document.createElement('td');
    const FecharellenoCell = document.createElement('td');
    const FechafinCell = document.createElement('td');
    const EstatusvehiculoCell = document.createElement('td');
    const CapacidadCell = document.createElement('td');
    const BultosCell = document.createElement('td');
    const ObservacionesCell = document.createElement('td');

    IdCell.textContent = column.Id_c;
    ExpedienteCell.textContent = column.Expediente_c;
    ContenedorCell.textContent = column.Contenedor_c;
    MercanciaCell.textContent = column.Mercancia_c;
    ChoferCell.textContent = column.Chofer_c;
    SedeCell.textContent = column.Sede_c;
    FecharequerimientoCell.textContent = column.Fecha_c;
    FecharecepcionCell.textContent = column.Fecharecepcion_c
    FecharellenoCell.textContent = column.Fechadesc_c
    FechafinCell.textContent = column.Fechafin_c
    EstatusvehiculoCell.textContent = column.Estatus_c;
    CapacidadCell.textContent = column.Capacidad_c;
    BultosCell.textContent = column.Bultos_c
    ObservacionesCell.textContent = column.Observacion_c;

    rowElement.appendChild(IdCell);
    rowElement.appendChild(ExpedienteCell);
    rowElement.appendChild(ContenedorCell);
    rowElement.appendChild(MercanciaCell);
    rowElement.appendChild(ChoferCell);
    rowElement.appendChild(SedeCell);
    rowElement.appendChild(FecharequerimientoCell);
    rowElement.appendChild(FecharecepcionCell);
    rowElement.appendChild(FecharellenoCell);
    rowElement.appendChild(FechafinCell);
    rowElement.appendChild(EstatusvehiculoCell);
    rowElement.appendChild(CapacidadCell);
    rowElement.appendChild(BultosCell);
    rowElement.appendChild(ObservacionesCell);

    tableBody.appendChild(rowElement);
  });

  const maxPages = Math.ceil(contenedor.length / rowsPerPage);
  const paginationInfoDiv = document.querySelector('#pagina-contenedores');
  paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;

//*Ventana emergente */
const filasTabla = document.querySelectorAll('#tabla-contenedores tbody tr');
const ventanaEmergente = document.getElementById('ventana-emergente');
Emergentes(filasTabla, ventanaEmergente);


};

consultar.connect().then(() => {
  obtenerContenedores(consultar).then((contenedor) => {
    renderContenedoresTable(contenedor);

    // Agregar controladores de eventos al botón de siguiente página
    const nextPageButton = document.querySelector('#nextPage');
    nextPageButton.addEventListener('click', () => {
      const maxPages = Math.ceil(contenedor.length / rowsPerPage);
      if (currentPage < maxPages - 1) {
        currentPage++;
        renderContenedoresTable(contenedor);
      }
    });

    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton = document.querySelector('#previousPage');
    previousPageButton.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderContenedoresTable(contenedor);
      }
    });

    // Agregar controladores de eventos al botón de primera página
    const firstPageButton = document.querySelector('#firstPage');
    firstPageButton.addEventListener('click', () => {
      currentPage = 0;
      renderContenedoresTable(contenedor);
    });

    // Agregar controladores de eventos al botón de última página
    const lastPageButton = document.querySelector('#lastPage');
    lastPageButton.addEventListener('click', () => {
      currentPage = Math.floor(contenedor.length / rowsPerPage);
      renderContenedoresTable(contenedor);
    });





  /*Crear Contenedores */
  const Guardar_cont = document.getElementById("Guardar_cont");
  const formulario3 = document.querySelector('#Registro_Cont');

  Guardar_cont.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

    Guardar_cont.disabled = true

    if(navigator.onLine){}
    else{Guardar_cont.disabled = false
      Guardar_cont.disabled = true}


    const Fecha = document.querySelector('input[name="registro"]').value;
    const Expediente = document.querySelector('input[name="expediente"]').value;
    const Mercancia = document.querySelector('input[name="mercancia"]').value;
    const Puerto = document.querySelector('#Puertos').value;
    const Naviera = document.querySelector('#navieras').value;
    const Embarque = document.querySelector('#embarques').value;
    const Tienda = document.querySelector('#tienda').value;
    const Chofer = document.querySelector('#chofer').value;
    const ChoferEntrega = document.querySelector('#choferEntrega').value;
    const Recepcion = document.querySelector('input[name="Recepcion"]').value;
    const Contenedor = document.querySelector('input[name="Contenedor"]').value;
    const Capacidad = document.querySelector('input[name="Capacidad"]').value;
    const Bultos = document.querySelector('input[name="Bultos"]').value;
    const Destino = document.querySelector('#destinos').value;
    const Importadora = document.querySelector('#importadoras').value;
    const Observacion = document.querySelector('textarea[name="Observacion"]').value;
    const Sidunea = document.querySelector('input[name="Sidunea"]').value;



    let nombresMostrados = {
      'expediente': 'Por favor, ingrese el número de expediente ',
      'Contenedor': 'Por favor, ingrese el identificador del contenedor',
      'puerto': 'Por favor, seleccione un puerto',
      'naviera': 'Por favor, seleccione una naviera',
      'embarque': 'Por favor, seleccione el embarque',
      'destino': 'Por favor, ingrese un destino',
      // 'Sidunea': 'Por favor, introduzca sidunea',
      'registro': 'Por favor, introduzca la fecha de registro',
      'Recepcion': 'Por favor, introduzca la fecha de recepción',
      'Bultos': 'Por favor, ingrese la cantidad de bultos',
      'importadora': 'Por favor, ingrese la importadora',


      // Agrega más mapeos según sea necesario
    };


    const ConsultaContenedor= `SELECT count(*) as count FROM Contenedores where Contenedor = '${Contenedor}'`;
    const pool = await consultar;
    const result = await pool.request().query(ConsultaContenedor);

    const count = result.recordset[0].count;

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
        Guardar_cont.disabled = false
      }, 2500)
    }
  else if( count >0){

      ipcRenderer.send('contenedorExistente', Contenedor)
      setTimeout(() =>{
        Guardar_cont.disabled = false
      }, 2500)
    }

    else{

    ipcRenderer.send('show-confirm-dialog')
    const index = await new Promise((resolve) => {
    ipcRenderer.once('confirm-dialog-result', (event, index) => {
      resolve(index)
    })
  })

    if (index === 1) {
      // El usuario hizo clic en "no"
      Guardar_cont.disabled = false
    }
    else{
      Guardar_cont.disabled = false

      ipcRenderer.send('dato')
      // console.log('golita') 
      const arg = await new Promise((resolve) => {
        ipcRenderer.on('user-data', (event, arg) => {               
          resolve(arg)
        });
      })
      
      const usuario = arg.usuario
      const descripcion =` Se ha creado el contenedor  ${Contenedor}`       

      track(descripcion , usuario)
      // Utiliza los valores en tus consultas SQL
      await agregarContenedores({Fecha, Expediente, Mercancia, Contenedor, Recepcion, Capacidad, Bultos, Sidunea, Puerto, Naviera, Embarque, Tienda, Chofer, Destino, Importadora, Observacion, ChoferEntrega});
      ipcRenderer.send('registroExitoso')
      // Limpia los campos del formulario

      setTimeout(() =>{
        location.reload();
      }, 1000)

    }}
  });

  async function agregarContenedores(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `INSERT INTO Contenedores (Expediente, Contenedor, Mercancia, Estatus, Fecharequerimiento, Fecharecepcion, Capacidad, Bultos, Sidunea, Puertoorigen, Naviera, Embarque, Tienda, Choferalquilado, Destino, Importadora, Observaciones, Chofer)
          VALUES ('${datos.Expediente}', '${datos.Contenedor}', '${datos.Mercancia}', 7, '${datos.Fecha}', '${datos.Recepcion}', ${datos.Capacidad}, ${datos.Bultos}, '${datos.Sidunea}', ${datos.Puerto}, '${datos.Naviera}', '${datos.Embarque}', '${datos.Tienda}', '${datos.Chofer}', '${datos.Destino}', '${datos.Importadora}', '${datos.Observacion}', '${datos.ChoferEntrega}')`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
          ipcRenderer.send('registroExitoso')
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }

   }


   /*Select de Puertos*/
async function obtenerPuertos() {
  try {

    await sql.connect(config);

    const result = await sql.query('SELECT Codigo, Sede FROM Sedes WHERE Tiposede = 2');


    return result.recordset;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}


async function generarSelectpuertos() {
  try {

    const destino = await obtenerPuertos();

    let selectOptions = '<option value="" disabled selected>Seleccione</option>';

    destino.forEach((row) => {
      selectOptions += `<option value="${row.Codigo}">${row.Sede}</option>`;
    });


    const selectHtml = `<select>${selectOptions}</select>`;
    document.getElementById('Puertos').innerHTML = selectHtml ;
    return selectHtml;
  } catch (error) {
    console.error('Error al generar el select:', error);
    throw error;
  }
}

generarSelectpuertos()
  .then((selectHtml) => {
    console.log('Select HTML generado:', selectHtml);

  })
  .catch((error) => {
    console.error('Error en la generación del select:', error);

  });


  async function obtenerImportadora() {
    try {
  
      await sql.connect(config);
  
      const result = await sql.query('SELECT Id, Nombre from Importadora');
  
  
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
  
  
  async function generarImportadora() {
    try {
  
      const destino = await obtenerImportadora();
  
      let selectOptions = '<option value="" disabled selected>Seleccione</option>';
  
      destino.forEach((row) => {
        selectOptions += `<option value="${row.Nombre}">${row.Nombre}</option>`;
      });
  
  
      const selectHtml = `<select>${selectOptions}</select>`;
      document.getElementById('importadoras').innerHTML = selectHtml ;
      return selectHtml;
    } catch (error) {
      console.error('Error al generar el select:', error);
      throw error;
    }
  }
  
  generarImportadora()
    .then((selectHtml) => {
      console.log('Select HTML generado:', selectHtml);
  
    })
    .catch((error) => {
      console.error('Error en la generación del select:', error);
    })



   let filteredListados = contenedor;
   let expedienteFilterValue = '';
   let contenedorFilterValue = '';
   let estadosFilterValue = 'Pendiente';




 const updateFilteredListados = () => {

   filteredListados = contenedor.filter((listado) => {

         return String(listado.Expediente_c).toLowerCase().startsWith(expedienteFilterValue);
   }).filter((listado) => {
     return String(listado.Contenedor_c).toLowerCase().startsWith(contenedorFilterValue);
   }).filter((listado) => {
     if (estadosFilterValue === 'Todos') {
       // Si el valor del filtro es 'Todos', incluir todos los listados
       return true;
     } else {
       // De lo contrario, incluir solo los listados cuyo estado coincide con el valor del filtro
       return listado.Estatus_c.trim() === estadosFilterValue.trim();
     }
   })
   renderContenedoresTable(filteredListados);
 };

  updateFilteredListados();

  const expedienteFiltro = document.querySelector('#expediente');
  expedienteFiltro.addEventListener('input', (event) => {
    document.getElementById("firstPage").click()
  expedienteFilterValue = event.target.value.toLowerCase();
    updateFilteredListados();
  });

  const contenedorFiltro = document.querySelector('#contenedor');
  contenedorFiltro.addEventListener('input', (event) => {
  document.getElementById("firstPage").click()
    contenedorFilterValue = event.target.value.toLowerCase();
    updateFilteredListados();
  });
  
  const estadosFiltro = document.querySelector('#selectEstatus');
  estadosFiltro.addEventListener('change', (event) => {
  document.getElementById("firstPage").click()
  estadosFilterValue = event.target.value;
  console.log(estadosFilterValue)
    updateFilteredListados();
  });

  async function obtenerEstado() {
    try {
  
      await sql.connect(config);
  
      const result = await sql.query('SELECT  Estatusvehiculo from Estatusvehiculo where Id in (5,7)');
  
  
      return result.recordset;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
   
   
   async function GenerarEstado() {
      try {
        const destino = await obtenerEstado();
    
        let selectOptions = '<option value="Todos">Todos</option>';
    
        // Crear una variable con el valor de la opción seleccionada por defecto
        let opcionSeleccionada = "Pendiente";
    
        // Crear una variable para almacenar el índice de la opción seleccionada
        let indiceSeleccionado = -1;
    
        // Recorrer el array de destino con un bucle for
        for (let i = 0; i < destino.length; i++) {
          // Establecer el valor de las opciones como el id del estatus
          selectOptions += `<option value="${destino[i].Estatusvehiculo}">${destino[i].Estatusvehiculo}</option>`;
    
          // Si el valor de la opción es igual al valor de la opción seleccionada
          // Guardar el índice de la opción en la variable indiceSeleccionado
          if (destino[i].Estatusvehiculo == opcionSeleccionada) {
            indiceSeleccionado = i;
          }
        }
    
        const selectHtml = `<select id="selectEstatus">${selectOptions}</select>`;
        document.getElementById("selectEstatus").innerHTML = selectHtml;
    
        // Si se encontró el índice de la opción seleccionada
        if (indiceSeleccionado != -1) {
          // Obtener el elemento option correspondiente al índice
          // Usando la propiedad options del select y el índice
          let optionSeleccionada = document
          .getElementById("selectEstatus")
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
      
    })
    .catch((error) => {
      console.error('Error en la generación del select:', error);
    });


    const printButton = document.querySelector('#Imprimir');
    
    printButton.addEventListener('click',async () => {
    const generarContenedoresPDF = require ('./ImprimirContenedores')

      // Llamar a la función generarPDF con la matriz de viajes filtrados
      generarContenedoresPDF(filteredListados);
    
      if (estadosFilterValue === 'Pendiente') { 

        const pool = await consultar;
        const sqlQuery = `Update Contenedores set Estatus  = 5 where Estatus = 7`;
        const result = await pool.request().query(sqlQuery);
      }
    });
  });

});

refrescarTab()


module.exports = obtenerContenedores

/*Fin select de puertos*/