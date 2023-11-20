const sql = require('mssql')
const {consultar, config} = require ('../Promise')


/**********************************Obtener Cavas***************************************** */ 


const obtenerCavas = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`Select Placa , Format (Fechacreacion , 'dd/MM/yyyy') as Fechacreacion ,  tipovehiculo.Tipo , estatusvehiculo.Estatusvehiculo , (SELECT Sede FROM Sedes where Codigo=Vehiculos.Destino) AS Destino , marca.Marca , modelo.Modelo , estadocontrol.Estadocontrol , Observacion  
  From Vehiculos, marca, modelo, tipovehiculo, estatusvehiculo, estadocontrol
  Where Vehiculos.marca = marca.Id And Vehiculos.modelo = modelo.Id And Vehiculos.tipovehiculo = tipovehiculo.Id
  AND (Vehiculos.tipovehiculo=2 OR Vehiculos.tipovehiculo=3) and Vehiculos.ubicacion=Estatusvehiculo.Id AND Vehiculos.Estadocontrol = estadocontrol.Id and Vehiculos.Estadocontrol = 1 and Vehiculos.Ubicacion = 1`).then((result) => {
    const Cavas = result.recordset.map((row) => ({

      Placa_c: row.Placa,
      Fechacreacion_c: row.Fechacreacion,
      Tipo_c: row.Tipo,
      Estatusvehiculo_c: row.Estatusvehiculo,
      Destino_c: row.Destino,
      Marca_c: row.Marca,
      Modelo_c: row.Modelo,
      Estadocontrol_c: row.Estadocontrol,
      Observacion_c: row.Observacion,

    }))
    return Cavas

  })
}

module.exports = obtenerCavas

//Codigo para usar si la consulta esta en un archivo diferente
// const obtenerSedes = require('./')

let currentPage = 0;
const rowsPerPage = 15;

  const renderCavasTable = (Cavas) => {
    const tableBody = document.querySelector('#Listadocavas tbody')


    tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    const currentListados = Cavas.slice(start, end);

    currentListados.forEach((column) => {

      const rowElement = document.createElement('tr')
      const PlacaCell = document.createElement('td')
       const FechacreacionCell = document.createElement('td')
      const TipoCell = document.createElement('td')
      const EstatusvehiculoCell = document.createElement('td')
      const DestinoCell = document.createElement('td')
      const MarcaCell = document.createElement('td')
      const ModeloCell = document.createElement('td')
      const EstadocontrolCell = document.createElement('td')
      const ObservacionCell = document.createElement('td')


      PlacaCell.textContent = column.Placa_c
      FechacreacionCell.textContent = column.Fechacreacion_c
      TipoCell.textContent = column.Tipo_c
      EstatusvehiculoCell.textContent = column.Estatusvehiculo_c
      DestinoCell.textContent = column.Destino_c
      MarcaCell.textContent = column.Marca_c
      ModeloCell.textContent = column.Modelo_c
      EstadocontrolCell.textContent = column.Estadocontrol_c
      ObservacionCell.textContent = column.Observacion_c


      rowElement.appendChild(PlacaCell)
      // rowElement.appendChild(FechacreacionCell)
      rowElement.appendChild(TipoCell)

      rowElement.appendChild(EstatusvehiculoCell)

      rowElement.appendChild(DestinoCell)

      rowElement.appendChild(MarcaCell)

      rowElement.appendChild(ModeloCell)

      rowElement.appendChild(EstadocontrolCell)

      rowElement.appendChild(ObservacionCell)

      tableBody.appendChild(rowElement)
    })
    const maxPages = Math.ceil(Cavas.length / rowsPerPage);
    const paginationInfoDiv = document.querySelector('#pagina-cava');
    paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;

  }
          consultar.connect().then(() => {
        obtenerCavas(consultar).then((Cavas) => {
          renderCavasTable(Cavas)
    
       // Agregar controladores de eventos al botón de siguiente página
       const nextPageButton1 = document.querySelector('#nextPage');
       nextPageButton1.addEventListener('click', () => {
         const maxPages1= Math.ceil(Cavas.length / rowsPerPage);
         if (currentPage < maxPages1 - 1) {
           currentPage++;
           renderCavasTable(Cavas);
         }
       });
    
       // Agregar controladores de eventos al botón de página anterior
       const previousPageButton1= document.querySelector('#previousPage');
       previousPageButton1.addEventListener('click', () => {
         if (currentPage > 0) {
           currentPage--;
           renderCavasTable(Cavas);
         }
       });
    
       // Agregar controladores de eventos al botón de primera página
       const firstPageButton1= document.querySelector('#firstPage');
       firstPageButton1.addEventListener('click', () => {
         currentPage= 0;
         renderCavasTable(Cavas);
       });
    
       // Agregar controladores de eventos al botón de última página
       const lastPageButton1= document.querySelector('#lastPage');
       lastPageButton1.addEventListener('click', () => {
         currentPage= Math.floor(Cavas.length / rowsPerPage) ;
         renderCavasTable(Cavas);
       });


 
       let filteredListados = Cavas;
       let ubicacionFilterValue = 'Todas';
       let placaFilterValue = '';
      
  
  
  const updateFilteredListados = () => {
  
    filteredListados = Cavas.filter((listados) => {
  
    return String(listados.Placa_c).toLowerCase().startsWith(placaFilterValue);
    }).filter((listados) =>
     {if (ubicacionFilterValue === 'Todas') {
      // Si el valor del filtro es 'Todos', incluir todos los listados
      return true;
    } 
      return String(listados.Estatusvehiculo_c).toLowerCase().startsWith(ubicacionFilterValue);
    })
    renderCavasTable(filteredListados);
  };
  
        updateFilteredListados();
  
     
  
      // Agregar controladores de eventos a los inputs de fecha para actualizar el filtro cuando cambien
 
       const placaFilterInput = document.querySelector('#placa_cava');
       placaFilterInput.addEventListener('input', (event) => {
         placaFilterValue = event.target.value.toLowerCase();
         updateFilteredListados();
       });
       
       const ubicacionFilterSelect = document.querySelector('#Ubicacion');
       ubicacionFilterSelect.addEventListener('change', (event) => {
         ubicacionFilterValue = event.target.value.toLowerCase();
         updateFilteredListados();
       });
       

       async function obtenersede() {
        try {
      
          await sql.connect(config);
      
          const result = await sql.query(`SELECT  Estatusvehiculo  FROM Estatusvehiculo where Estatusvehiculo in ('En patio Guacara', 'Viajando', 'En taller', 'Cargada en Guacara')`);
      
          await sql.close();
      
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
            selectOptions += `<option value="${row.Estatusvehiculo}">${row.Estatusvehiculo}</option>`;
          });
      
          const selectHtml = `<select>${selectOptions}</select>`;
          document.getElementById('Ubicacion').innerHTML = selectHtml;
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
      


  

/*Ventana emergente */
const filasTabla = document.querySelectorAll('#Listadocavas tbody tr');
const ventanaEmergente = document.getElementById('ventana-emergente');

filasTabla.forEach(fila => {
fila.addEventListener('click', () => {    

const Placa = fila.querySelector('td:nth-child(1)').textContent;
// const Fecharequerimiento = fila.querySelector('td:nth-child(2)').textContent;
const Tipo = fila.querySelector('td:nth-child(2)').textContent;
const Ubicacion = fila.querySelector('td:nth-child(3)').textContent;
const Destino = fila.querySelector('td:nth-child(4)').textContent;
const Marca = fila.querySelector('td:nth-child(5)').textContent;
const Modelo = fila.querySelector('td:nth-child(6)').textContent;
const Estatus = fila.querySelector('td:nth-child(7)').textContent;
const Observaciones = fila.querySelector('td:nth-child(8)').textContent;

const contenidoVentana = `


    <div id="ventana-emergente-contenido">
    <div class ="Menu">
       
    <button type="button" class="menubar-btn2" id="botonCerrar"><i class="fas fa-times"></i></button>
          
              </div>
          <h2 class="Titulo">Detalles cava</h2>
          <fieldset>
          <div class="Tablas">

            <Div class="Izquierda">
          <label >Placa:</label>
          <span  >${Placa}</span>
          <br>
          <label >Tipo:</label>
          <span>${Tipo}</span>
          <br>
          <label >Modelo:</label>
          <span>${Modelo}</span>
          <br>
          <label >Marca:</label>
          <span>${Marca}</span>
          <br>
          <label >Ubicacion:</label>
          <span class="Ubicacion">${Ubicacion}</span>
          <br>
          <Label>Seleccione Destino: <Select id="Destino" name="destino" class="requerido">   


          </Select></Label>

          </Div>
          <div class="Derecha">
          <label >Estatus:</label>
          <span>${Estatus}</span>
          <br>
          <label >Observación:</label>
          <p>${Observaciones}</p>
          <label >Destino:</label>
          <p>${Destino}</p>
          </div>

          </div>
          <div class="emergente_btn">
              <button type="button" id="Autorizacion" class="emergente_btn" style="display: none;">Generar Autorización</button>
              <button type="button" id="Guardar_destino" class="emergente_btn"  >Enviar a cargar</button>
          </div>
          </fieldset>

  
</div>
`;
ventanaEmergente.innerHTML = contenidoVentana;
    ventanaEmergente.style.display = 'block';

    const botonCerrar = document.getElementById('botonCerrar');
botonCerrar.addEventListener('click', () => {
  ventanaEmergente.style.display = 'none';


});
/*Generar select para destino */
async function obtenerDestino() {
  try {

    await sql.connect(config);

    const result = await sql.query('SELECT Codigo, Sede FROM Sedes WHERE Tiposede != 4');

    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}


async function generarSelectdestino() {
  try {

    const destino = await obtenerDestino();

    let selectOptions = '<option value="" disabled selected>Seleccione</option>';

    destino.forEach((row) => {
      selectOptions += `<option value="${row.Codigo}">${row.Sede}</option>`;
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

/*Fin de select para destino */


    
/*Insercion de destino en la base de datos */


/*Crear modelos */
const Guardar_modelos = document.getElementById("Guardar_destino");
const formulario2 = document.querySelector('#ventana-emergente-contenido');
const generarAutorizacioncargar = document.getElementById('Autorizacion');

Guardar_modelos.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        const Destino = document.querySelector('#Destino').value;
        // generarAutorizacioncargar.innerHTML = contenidoVentana;

        let nombresMostrados = {
          'destino': 'Por favor, seleccione un destino',
  
        
          // Agrega más mapeos según sea necesario
        };
        

        let inputs = document.querySelectorAll('select.requerido');
        
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
      else{

        

        ipcRenderer.send('genereAutorizacion');
      // Utiliza los valores en tus consultas SQL
        await agregarModelos({ Destino, Placa});

        generarAutorizacioncargar.style.display = 'block';
        ipcRenderer.send('registroExitoso');

        // location.reload();
       
     }});

  
  async function agregarModelos(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `Update Vehiculos Set Destino = ${datos.Destino} where Placa ='${Placa}'`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }

/*Fin de insercion de destino de base de datos */
        // const generarCavaalmacen = require('./generarCavaalmacen.js');

        // const botonImprimir = document.querySelector('#Autorizacion');
        
        // botonImprimir.addEventListener('click', async () => {
        //   const Cavas = await obtenerCavas(consultar);

        //    console.log(Cavas.Placa_c)
          
        
        //   await generarCavaalmacen({ Placa, Tipo, Ubicacion, Destino, Marca, Modelo, Estatus, Observaciones  });
        
        //   // Aquí puedes guardar el PDF en un archivo, enviarlo a través de una respuesta HTTP, etc.
        // });

        const generarCavaalmacen = require('./generarCavaalmacen.js');


       const botonImprimir = document.querySelector('#Autorizacion');

        // Añade un escuchador de eventos para el evento de clic.
        botonImprimir.addEventListener('click', async () => {
          
          // Usa la función consultar para obtener el listado de viajes.
          const Cavas = await obtenerCavas(consultar);
          // console.log(Object.is(Cavas, obtenerCavas))
          // Cuando el botón sea clickeado, genera el PDF.
          await generarCavaalmacen(Placa);

        
          // Aquí puedes guardar el PDF en un archivo, enviarlo a través de una respuesta HTTP, etc.

        });

});
});
});





}).catch((err) => {
console.error(err)
});


