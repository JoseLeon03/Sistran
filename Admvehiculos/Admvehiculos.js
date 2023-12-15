const sql = require('mssql')
const {consultar, config} = require ('../Promise')
const refrescarTab = require('../Utility/refrescarTab')
const select = require('./select')
const valores = require('./traervalores')
const track = require ('../Utility/Track')

const obtenerVechiculos = (conexion) => {
  const request = new sql.Request(conexion)
  // return request.query(`SELECT Format (Fechacreacion , 'dd/MM/yyyy') as Fechacreacion, CodigoSap, Placa, Marca,Año,Poliza, Modelo, Tipovehiculo, Propietario,  Observacion, Activo  FROM Vehiculos  order by Placa`).then((result) => {
    return request.query(` select Placa , k.Marca, m.Modelo , t.Tipo, Año ,Poliza ,e.Estadocontrol, Propietario ,Format (Fechacreacion , 'dd/MM/yyyy') as   Fechacreacion , Observacion from Vehiculos as v ,  marca as k, modelo as m, Estadocontrol as e ,tipovehiculo as t where v.marca=k.id and v.modelo=m.id and v.tipovehiculo=t.id  and v.Estadocontrol=e.id`).then((result) => {
    const vehiculo = result.recordset.map((row) => ({
      
      Placa_v: row.Placa,
      Marca_v: row.Marca,
      Modelo_v:row.Modelo,
      Tipo_v: row.Tipo,
      Año_v: row.Año,
      Poliza_v: row.Poliza,
      Propietario_v: row.Propietario,
      Fecha_v: row.Fechacreacion,
      Observacion_v: row.Observacion,
      Estatus_v: row.Estadocontrol,

    }))
    return vehiculo
  })
}
    
  module.exports = obtenerVechiculos
  
  
  
  //Codigo para usar si la consulta esta en un archivo diferente
  // const obtenerSedes = require('./')
  
  let currentPage = 0;
  const rowsPerPage = 15;
  
  const renderVehiculosTable = (vehiculos) => {
    const tableBody = document.querySelector('#tabla-vehiculos tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    const currentVehiculos = vehiculos.slice(start, end);
  
    currentVehiculos.forEach((vehiculo) => {
      const rowElement = document.createElement('tr');
      const PlacaCell = document.createElement('td');
      const MarcaCell = document.createElement('td');
      const ModeloCell = document.createElement('td');
      const TipoCell = document.createElement('td');
      const AñoCell = document.createElement('td');
      const PolizaCell = document.createElement('td');
      const PropietarioCell = document.createElement('td');
      const FechaCell = document.createElement('td');
      const ObservacionCell = document.createElement('td');
      const EstadocontrolCell = document.createElement('td');
  
      PlacaCell.textContent = vehiculo.Placa_v;
      MarcaCell.textContent = vehiculo.Marca_v;
      ModeloCell.textContent = vehiculo.Modelo_v;
      TipoCell.textContent = vehiculo.Tipo_v;
      AñoCell.textContent = vehiculo.Año_v;
      PolizaCell.textContent = vehiculo.Poliza_v;
      PropietarioCell.textContent = vehiculo.Propietario_v;
      FechaCell.textContent = vehiculo.Fecha_v;
      ObservacionCell.textContent = vehiculo.Observacion_v;
      EstadocontrolCell.textContent = vehiculo.Estatus_v;
  
      rowElement.appendChild(PlacaCell);
      rowElement.appendChild(MarcaCell);
      rowElement.appendChild(ModeloCell);
      rowElement.appendChild(TipoCell);
      rowElement.appendChild(AñoCell);
      rowElement.appendChild(PolizaCell);
      rowElement.appendChild(PropietarioCell);
      rowElement.appendChild(FechaCell);
      rowElement.appendChild(ObservacionCell);
      rowElement.appendChild(EstadocontrolCell);
      
      tableBody.appendChild(rowElement);
    });

    const maxPages = Math.ceil(vehiculos.length / rowsPerPage);
    const paginationInfoDiv = document.querySelector('#pagination-info');
    paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
  };
  
  consultar.connect().then(() => {
    obtenerVechiculos(consultar).then((vehiculos) => {
    renderVehiculosTable(vehiculos);

    // Agregar controladores de eventos al botón de siguiente página
    const nextPageButton1 = document.querySelector('#nextPage');
    nextPageButton1.addEventListener('click', () => {
      const maxPages = Math.ceil(vehiculos.length / rowsPerPage);
      if (currentPage < maxPages - 1) {
        currentPage++;
        renderVehiculosTable(filteredListados);
      }
    });

    // Agregar controladores de eventos al botón de página anterior
    const previousPageButton1 = document.querySelector('#previousPage');
    previousPageButton1.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderVehiculosTable(filteredListados);
      }
    });

    // Agregar controladores de eventos al botón de primera página
    const firstPageButton1 = document.querySelector('#firstPage');
    firstPageButton1.addEventListener('click', () => {
      currentPage = 0;
      renderVehiculosTable(filteredListados);
    });

    // Agregar controladores de eventos al botón de última página
    const lastPageButton1 = document.querySelector('#lastPage');
    lastPageButton1.addEventListener('click', () => {
      currentPage = Math.floor(vehiculos.length / rowsPerPage) ;
      renderVehiculosTable(filteredListados);
    });



    let filteredListados = vehiculos;
    let propietarioFilterValue = '';
    let polizaFilterValue = '';
    let añoFilterValue = '';
    //  let fingresFilterValue = '';
    let placaFilterValue = '';
    let estatusFilterValue = 'Todos';
    let marcaFilterValue ='Todas';
    let modeloFilterValue ='Todos';
    let tipoFilterValue ='Todos';
    
        
  
  const updateFilteredListados = () => {
  
    filteredListados = vehiculos.filter((listado) => {
  
    return String(listado.Placa_v).toLowerCase().startsWith(placaFilterValue);
    }).filter((listado) => {
      return String(listado.Año_v).toLowerCase().startsWith(añoFilterValue);
    }).filter((listado) => {
      return String(listado.Poliza_v).toLowerCase().startsWith(polizaFilterValue);
    }).filter((listado) => {
      return String(listado.Propietario_v).toLowerCase().startsWith(propietarioFilterValue);
    }).filter((listado) => {
      if (estatusFilterValue === 'Todos') {
        // Si el valor del filtro es 'Todos', incluir todos los listados
        return true;
      } else {
        // De lo contrario, incluir solo los listados cuyo estado coincide con el valor del filtro
        return listado.Estatus_v.trim() === estatusFilterValue.trim();
      }
    }).filter((listado) => {
    if (marcaFilterValue === 'Todas') {
      // Si el valor del filtro es 'Todos', incluir todos los listados
      return true;
    } else {
      // De lo contrario, incluir solo los listados cuyo estado coincide con el valor del filtro
      return listado.Marca_v.trim() === marcaFilterValue.trim();
    }
  }).filter((listado) => {
    if (modeloFilterValue === 'Todos') {
      // Si el valor del filtro es 'Todos', incluir todos los listados
      return true;
    } else {
      // De lo contrario, incluir solo los listados cuyo estado coincide con el valor del filtro
      return listado.Modelo_v.trim() === modeloFilterValue.trim();
    }
  }).filter((listado) => {
    if (tipoFilterValue === 'Todos') {
      // Si el valor del filtro es 'Todos', incluir todos los listados
      return true;
    } else {
      // De lo contrario, incluir solo los listados cuyo estado coincide con el valor del filtro
      return listado.Tipo_v.trim() === tipoFilterValue.trim();
    }
  })
    
    renderVehiculosTable(filteredListados);
  };
   
    updateFilteredListados();

    
      //  const placaFilterInput = document.querySelector('#Fnacimientofilter');
    //  placaFilterInput.addEventListener('input', (event) => {
    //    placaFilterValue = event.target.value.toLowerCase();
    //    updateFilteredListados();
    //  });
    
    const placaInput = document.querySelector('#placafilter');
    placaInput.addEventListener('input', (event) => {
      document.getElementById("firstPage").click()
      placaFilterValue = event.target.value.toLowerCase();
      updateFilteredListados();
    });
    
    const añoFilterInput = document.querySelector('#añofilter');
    añoFilterInput.addEventListener('input', (event) => {
      document.getElementById("firstPage").click()
      añoFilterValue = event.target.value.toLowerCase();
      updateFilteredListados();
    });
    
    const polizaFilterInput = document.querySelector('#polizafilter');
    polizaFilterInput.addEventListener('input', (event) => {
      document.getElementById("firstPage").click()
      polizaFilterValue = event.target.value.toLowerCase();
      updateFilteredListados();
    });
    
    const propietarioFilterInput = document.querySelector('#propietario_filter');
    propietarioFilterInput.addEventListener('input', (event) => {
      document.getElementById("firstPage").click()
      propietarioFilterValue = event.target.value.toLowerCase();
      updateFilteredListados();
    });

    const estatusFilterInput = document.querySelector('#Estatus_filter');
    estatusFilterInput.addEventListener('change', (event) => {
      document.getElementById("firstPage").click()
      estatusFilterValue = event.target.value;
      updateFilteredListados();
    });

    const marcaFilterInput = document.querySelector('#marcafilter');
    marcaFilterInput.addEventListener('change', (event) => {
      document.getElementById("firstPage").click()
      marcaFilterValue = event.target.value;
      updateFilteredListados();
    });

    const modeloFilterInput = document.querySelector('#modelofilter');
    modeloFilterInput.addEventListener('change', (event) => {
      document.getElementById("firstPage").click()
      modeloFilterValue = event.target.value;
      updateFilteredListados();
    });

    const tipoFilterInput = document.querySelector('#tipofilter');
    tipoFilterInput.addEventListener('change', (event) => {
      document.getElementById("firstPage").click()
      tipoFilterValue = event.target.value;
      updateFilteredListados();
    });

    // const ubicacionFilterInput = document.querySelector('#estatusfilter');
    // ubicacionFilterInput.addEventListener('change', (event) => {
    //   ubicacionFilterValue = event.target.value;
    //   updateFilteredListados();
    // });
      
    select()
    async function obtenerEstatus() {
      try {
  
        await sql.connect(config);
  
      console.log("obtenerEstatus")
        const result = await sql.query('SELECT Id,Estadocontrol FROM Estadocontrol');
  
  
  
        return result.recordset;
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
      }
    }
    
    
    async function generarSelectEstatus() {
      try {
          console.log("obtenerEstatus2")
        const estatus = await obtenerEstatus();
  
        let selectOptions = '<option value="Todos"  selected>Todos</option>';
  
        estatus.forEach((row) => {
          selectOptions += `<option value="${row.Estadocontrol}">${row.Estadocontrol}</option>`;
        });
  
        const selectHtml = `<select>${selectOptions}</select>`;
        document.getElementById('Estatus_filter').innerHTML = selectHtml;
        return selectHtml;
      } catch (error) {
        console.error('Error al generar el select:', error);
        throw error;
      }
    }
    
  generarSelectEstatus()
      

    const printButton = document.querySelector('#imprimir');
    printButton.addEventListener('click', () => {
    
      const generarVehiculosPDF = require('./ImprimirVehiculos')
    
      generarVehiculosPDF(filteredListados);
      
    });

  })

});

   


  // Crear Vehiculos

  const Guardar_vehiculos = document.getElementById("Guardar");

  Guardar_vehiculos.addEventListener('click', async (evento) => {
  evento.preventDefault(); // Evita que el formulario se envíe automáticamente

  Guardar_vehiculos.disabled = true

  const f_registro = document.querySelector('input[name="fecharegistro"]').value;
  const sap = document.querySelector('input[name="Codigosap"]').value;
  const placa = document.querySelector('input[name="Placa"]').value;
  const marca = document.querySelector('#selectMarca').value;
  const modelo = document.querySelector('#selectModelo').value;
  const año = document.querySelector('input[name="Año"]').value;
  const poliza = document.querySelector('input[name="poliza"]').value;
  const C_desde = document.querySelector('input[name="coberturadesde"]').value;
  const C_hasta= document.querySelector('input[name="coberturahasta"]').value;
  const tipo = document.querySelector('#selectTipo').value;
  const ejes = document.querySelector('#Ejes').value;
  const ubicacion = document.querySelector('#selectUbicacion').value;
  const Propietario = document.querySelector('input[name="Propietario"]').value;
  const econtrol = document.querySelector('#selectEcontrol').value;
  const observaciones = document.querySelector('textarea[name="Observaciones"]').value;


  let nombresMostrados = {
    'fecharegistro': 'Por favor, ingrese una fecha de requerimiento',
    'Codigosap': 'Por favor, ingrese el codigo sap del vehículo',
    'Placa': 'Por favor, ingrese la placa del vehículo',
    'poliza': 'Por favor, ingrese el número de poliza',
    'marca':  'Por favor, seleccione la marca del vehículo',
    'modelo':  'Por favor, seleccione el modelo del vehículo',
    'Año': 'Por favor, ingrese el año del vehículo',
    'coberturadesde': 'Por favor, seleccione el inicio de fecha de cobertura de poliza',
    'coberturahasta': 'Por favor, seleccione el fin de fecha de cobertura de poliza',
    'tipovehiculo':  'Por favor, seleccione el tipo de vehiculo',
    'ejes': 'Por favor, ingrese la cantidad de ejes del vehículo', 
    'ubicacion':  'Por favor, seleccione la ubicación del vehículo',
    'Propietario': 'Por favor, ingrese el propietario del vehículo',
    'estadoControl':  'Por favor, seleccione un estado de control',

    // Agrega más mapeos según sea necesario
  };

  // Consulta para verificar si la placa existe
  const ConsultaPlaca = `SELECT count(*) as count FROM Vehiculos where placa = '${placa}'`
  const Consultasap = `SELECT count(*) as count FROM Vehiculos where Codigosap = '${sap}'`


  // Ejecutar la consulta y obtener el resultado
  const pool = await consultar;
  const result = await pool.request().query(ConsultaPlaca);
  const result2 = await pool.request().query(Consultasap);


  // Obtener el valor de count del objeto result
  const count = result.recordset[0].count;
  const count2 = result2.recordset[0].count;
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
        Guardar_vehiculos.disabled = false
      }, 2500)
        
    }

  // Si count es mayor que cero, la placa existe
    else if (count > 0) {
    
    await  ipcRenderer.send('vehiculoexistente', placa)
    setTimeout(() =>{
     Guardar_vehiculos.disabled = false
    }, 2500)
    // console.log(`La placa ${placa} ya existe en la base de datos`);
  } 
    else if( count2 >0 ){
      await ipcRenderer.send('sap' , sap);
      setTimeout(() =>{
        Guardar_vehiculos.disabled = false
      }, 2500)
    }
    else {
      // Si count es cero, la placa no existe
      ipcRenderer.send('dato')
      // console.log('golita') 
      const arg = await new Promise((resolve) => {
        ipcRenderer.on('user-data', (event, arg) => {               
          resolve(arg)
        });
      })
      
      const usuario = arg.usuario
      const descripcion =` Se ha creado el vehiculo con la placa ${placa}`       

      track(descripcion , usuario)
      // Utiliza los valores en tus consultas SQL
      await agregarVehiculos({sap, placa, marca, modelo,tipo , año, poliza, Propietario,  observaciones, f_registro, C_desde, C_hasta, ejes, ubicacion,econtrol});
      
      // Limpia los campos del formulario
      setTimeout(() =>{
        location.reload();
      }, 1000)
    }
  });

  async function agregarVehiculos(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `INSERT INTO Vehiculos (Codigosap , Placa, Marca, Modelo, Tipovehiculo, Año, Poliza, Propietario, Observacion, Fechacreacion, Coberturadesde, Coberturahasta, Ejes, Ubicacion, Estadocontrol) VALUES ( ${datos.sap} , '${datos.placa}', ${datos.marca}, ${datos.modelo} , ${datos.tipo}, ${datos.año} ,${datos.poliza}, '${datos.Propietario}','${datos.observaciones}', '${datos.f_registro}', '${datos.C_desde}', '${datos.C_hasta}', ${datos.ejes}, ${datos.ubicacion}, ${datos.econtrol})`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
          ipcRenderer.send('registroExitoso');
      } catch (error) {
        ipcRenderer.send('error', error)
      }

  }


  const anularVehiculosbtn = document.getElementById("Anular");

  anularVehiculosbtn.addEventListener('click', async (evento) => {
  evento.preventDefault(); // Evita que el formulario se envíe automáticamente

  const placa = document.querySelector('input[name="Placa"]').value;
  
  // Consulta para verificar si la placa existe
  const ConsultaPlaca = `SELECT count(*) as count FROM Vehiculos where placa = '${placa}'`
  const ConsultaPlacaActivo = `SELECT count(*) as counts FROM Vehiculos where placa = '${placa}' and Estadocontrol = 2`


  // Ejecutar la consulta y obtener el resultado
  const pool = await consultar;
  const result = await pool.request().query(ConsultaPlaca);
  const result2 = await pool.request().query(ConsultaPlacaActivo);

  // Obtener el valor de count del objeto result
  const count = result.recordset[0].count;
  const count2 = result2.recordset[0].counts;

  // Itera sobre los elementos de entrada
  

  // Si count es mayor que cero, la placa existe
    if (count === 0) {
    
    await  ipcRenderer.send('vehiculoNoexistente', placa)

  } 
    else if( count2 >0 ){
      await ipcRenderer.send('vehiculoAnulado' , placa);
    }

  else{

      ipcRenderer.send('anular-confirm-dialog')
      const index = await new Promise((resolve) => {
        ipcRenderer.once('anular-dialog-result', (event, index) => {
          resolve(index)
        })
      })
  
      if (index === 1) {
        // El usuario hizo clic en "no"
      }
    else{

      // Utiliza los valores en tus consultas SQL
      await anularVehiculos({placa});
      ipcRenderer.send('dato')
      // console.log('golita') 
      const arg = await new Promise((resolve) => {
        ipcRenderer.on('user-data', (event, arg) => {               
          resolve(arg)
        });
      })
    
    const usuario = arg.usuario
    const descripcion =` Se ha anulado el vehiculo con la placa ${placa}`       

      track(descripcion , usuario)
      ipcRenderer.send('datosAnulados');
      // Limpia los campos del formulario
      location.reload();
    }
  } 
});

  async function anularVehiculos(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `Update vehiculos set Estadocontrol = 2 where Placa = '${datos.placa}'`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
      } catch (error) {
        ipcRenderer.send('error', error)
      }

  }


  //! Fin de las pruebas para obtener marcas

  //! Pruebas para generar modelos según marca

  
  //! Fin de los select de los estatus
  const selectMarca = document.getElementById('selectMarca');
  const selectModelo = document.getElementById('selectModelo'); 

  // Cargar modelos por marca
  selectMarca.addEventListener('change', async function () {
    const marcaSeleccionada = selectMarca.value;
    await cargarModelosPorMarca(marcaSeleccionada);
  });

  async function cargarModelosPorMarca(marca) {
    try {
      await sql.connect(config);

      const query = `SELECT Id, Modelo FROM Modelo WHERE Marca = '${marca}' order by Modelo`;
      const result = await sql.query(query);


      generarSelectModelo(result.recordset); //! Llamamos a generarSelectModelo con los datos filtrados
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }

  //  Generar el selector de modelos
  function generarSelectModelo(modelos) {
    let selectOptions = '<option value="" disabled selected>Seleccione</option>';

    modelos.forEach((row) => {
      selectOptions += `<option value="${row.Id}">${row.Modelo}</option>`;
    });

    selectModelo.innerHTML = selectOptions; //! Actualizamos el selector de modelos con las opciones filtradas
  }

  // Generar el selector de marcas inicial
  async function generarSelectMarcas() {
    try {
      await sql.connect(config);

      const result = await sql.query('SELECT Id, Marca FROM Marca order by Marca');


      let selectOptions = '<option value="" disabled selected>Seleccione</option>';
      result.recordset.forEach((row) => {
        selectOptions += `<option value="${row.Id}">${row.Marca}</option>`;
      });

      selectMarca.innerHTML = selectOptions; 
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }

  // Cargar las marcas iniciales
  generarSelectMarcas()

  //!Codigo para traer con un click los datos a los inputs, select, etc

  const placaInput = document.getElementById("placaInput");
  const fecha_creacion = document.getElementById("fechahd")
  const marcaselect = document.getElementById("selectMarca");
  const modeloselect = document.getElementById("selectModelo");
  const añoInput = document.getElementById("añoInput");
  const polizaInput = document.getElementById("polizaInput");
  const coberturaDesdeInput = document.getElementById("coberturaDesdeInput");
  const coberturaHastaInput = document.getElementById("coberturaHastaInput");
  const tiposelect = document.getElementById("selectTipo");
  const ejesSelect = document.getElementById("Ejes");
  const propietarioInput = document.getElementById("propietarioInput");
  const estatusSelect = document.getElementById("selectEcontrol");
  const observacionInput = document.getElementById("Observacion");
  const codigoSap = document.getElementById("codigoSap");



  marcaselect.addEventListener("change", async function() {
    const marca = marcaselect.value;
    const modelos = await cargarModelosPorMarca(marca);
    let selectOptions = '<option value="" disabled selected>Seleccione</option>';
    modelos.forEach((modelo) => {
      selectOptions += `<option value="${modelo}">${modelo}</option>`;
    });
    modeloselect.innerHTML = selectOptions;
    
  });

  
  const tabla = document.getElementById("tabla-vehiculos");
  let originalPlaca;
  tabla.addEventListener("click", async function(event) {
    if (event.target.tagName === "TD"){
      const tab1 = document.querySelector('.tab[data-tab="tab1"]');
      tab1.click();
      event.preventDefault();
      const filaSeleccionada = event.target.parentElement;
      const placa = filaSeleccionada.children[0].textContent;
      originalPlaca = placa;
      const marca = filaSeleccionada.children[1].textContent;
      const modelo = filaSeleccionada.children[2].textContent; 
      const año = filaSeleccionada.children[4].textContent; 
      const poliza = filaSeleccionada.children[5].textContent; 
      const tipo = filaSeleccionada.children[3].textContent; 
      const estatus = filaSeleccionada.children[9].textContent;
      const observacion = filaSeleccionada.children[8].textContent;
      const ubicacionSelect = document.getElementById("selectUbicacion");

      
      for (var i = 0; i < marcaselect.options.length; i++) {
        if (marca == marcaselect.options[i].text) {
          marcaselect.options[i].selected = true;
          marcaselect.dispatchEvent(new Event('change'));
          break;
        }
      }
      setTimeout(() => {
        for (var i = 0; i < modeloselect.options.length; i++) {
          if (modelo == modeloselect.options[i].text) {
            modeloselect.options[i].selected = true;
            break;
          }
        }
      }, 200);
      for (var i = 0; i < estatusSelect.options.length; i++) {
        if (estatus == estatusSelect.options[i].text) {
          estatusSelect.options[i].selected = true;
          break;
        }
      }
    

        for (var i = 0; i < tiposelect.options.length; i++) {
          if (tipo == tiposelect.options[i].text) {
            tiposelect.options[i].selected = true;
            break;
          }
        }
    

      observacionInput.value = observacion;

      placaInput.value = placa;
      
      añoInput.value = año; 
      polizaInput.value = poliza;
      const ejes = await obtenerEjes(placa);
      ejesSelect.value = ejes;
      const ubicacion = await obtenerUbicacion2(placa);
      ubicacionSelect.value = ubicacion;
      // Obtener el valor de la columna Coberturadesde de la tabla Vehiculos
      const coberturaDesde = await obtenerCoberturaDesde(placa);
      coberturaDesdeInput.valueAsDate = new Date(coberturaDesde);

      // Obtener el valor de la columna Coberturahasta de la tabla Vehiculos
      const coberturaHasta = await obtenerCoberturaHasta(placa);
      coberturaHastaInput.valueAsDate = new Date(coberturaHasta);

      const propietario = await obtenerPropietario(placa);
      propietarioInput.value = propietario;

      const codigo = await obtenerCodigo(placa);
      codigoSap.value = codigo;


      const fechac = await ObtenerFecha(placa);
      fecha_creacion.valueAsDate = new Date(fechac);

      console.log('el valor de orignal placa es: ' + originalPlaca);
    }
  });

  async function ObtenerFecha(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Fechacreacion FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Fechacreacion; // Corrige el nombre del campo devuelto
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
  async function obtenerCoberturaDesde(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Coberturadesde FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Coberturadesde;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }

  async function obtenerCodigo(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT CodigoSap FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].CodigoSap; // Aquí está la corrección
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }






  async function obtenerCoberturaHasta(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Coberturahasta FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Coberturahasta;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }

  async function obtenerEjes(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Ejes FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Ejes;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }

  async function obtenerUbicacion2(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Ubicacion FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Ubicacion;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }



  async function obtenerPropietario(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Propietario FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Propietario;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;ado
    }
  }


  //! fin de el codigo para traer datos a inputs, select, etc

  const modificar = document.getElementById('Modificar');

  let placanuevecita; 

  modificar.addEventListener('click', async (evento) => {
    
    evento.preventDefault();

   
    const f_registro = document.querySelector('input[name="fecharegistro"]').value;
    const sap = document.querySelector('input[name="Codigosap"]').value;
    const marca = document.querySelector('#selectMarca').value;
    const modelo = document.querySelector('#selectModelo').value;
    const año = document.querySelector('input[name="Año"]').value;
    const poliza = document.querySelector('input[name="poliza"]').value;
    const C_desde = document.querySelector('input[name="coberturadesde"]').value;
    const C_hasta= document.querySelector('input[name="coberturahasta"]').value;
    const tipo = document.querySelector('#selectTipo').value;
    const ejes = document.querySelector('#Ejes').value;
    const ubicacion = document.querySelector('#selectUbicacion').value;
    const Propietario = document.querySelector('input[name="Propietario"]').value;
    const econtrol = document.querySelector('#selectEcontrol').value;
    const observaciones = document.querySelector('textarea[name="Observaciones"]').value;
    placanuevecita = document.querySelector('input[name="Placa"]').value;
 
    console.log(' el valor de la placa nueva dentro de modificar es ' + placanuevecita)

    //consultaq
    const ConsultaPlaca = `SELECT count(*) as count FROM Vehiculos where Placa= '${placanuevecita}' and Placa != '${originalPlaca}'`;
    const pool = await sql.connect(config);

    const result = await pool.request().query(ConsultaPlaca);

    const count = result.recordset[0].count;

    console.log(count)

    if (count > 0) {
      console.log('La placa existe en la base de datos.');
      ipcRenderer.send('vehiculoexistente', placanuevecita);

    } else {
      console.log('La placa no existe en la base de datos.');
      ipcRenderer.send('show-confirm-dialog');
      const index = await new Promise((resolve) => {
      
        ipcRenderer.once('confirm-dialog-result', (event, index) => {
          resolve(index)
        })
      })
      console.log(index)

      if (index === 1) {
    
      }  else {
      
        try {
          await sql.connect(config);
          const query = `UPDATE Vehiculos SET Codigosap = '${sap}', placa = '${placanuevecita}', Marca = '${marca}', Modelo = '${modelo}', Tipovehiculo = '${tipo}', Año = '${año}', Ejes = '${ejes}', Poliza = '${poliza}', Coberturadesde = '${C_desde}', Coberturahasta= '${C_hasta}', Propietario = '${Propietario}', Fechacreacion = '${f_registro}', Observacion = '${observaciones}', Estadocontrol = '${econtrol}', Ubicacion = '${ubicacion}' WHERE Placa = '${originalPlaca}'`;
          await sql.query(query);
          if (originalPlaca !== placanuevecita) {
            console.log('placa nueva tiene el valor de ' + placanuevecita)
            ipcRenderer.send('datosModificados');
          }
        } catch (error) {
          console.error('Error al actualizar los datos:', error);
          throw error;
        }

        ipcRenderer.send('dato')
      // console.log('golita') 
      const arg = await new Promise((resolve) => {
        ipcRenderer.on('user-data', (event, arg) => {               
          resolve(arg)
        });
      })
      
      const usuario = arg.usuario
      const descripcion =` Se ha modificado el vehiculo con la placa ${originalPlaca} a ${placanuevecita}`       

      track(descripcion , usuario)
        ipcRenderer.send('datosModificados')
        location.reload();
  }
  }

  });


refrescarTab()