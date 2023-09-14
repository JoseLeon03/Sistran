const sql = require('mssql')
const {consultar, config} = require ('../Promise')


/**********************************Obtener Contenedores***************************************** */ 


const obtenerContenedores = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`Select Expediente, Contenedor, Mercancia, Capacidad, Estatusvehiculo.Estatusvehiculo as Ubicacion, Sedes.Sede as Destino  , Format (Fecharequerimiento , 'dd/MM/yyyy') as Fecharequerimiento, Observaciones from Contenedores, Sedes, Estatusvehiculo
  Where  Contenedores.Destino = Sedes.Codigo and Contenedores.Estatus = Estatusvehiculo.Id    `).then((result) => {
    const contenedor = result.recordset.map((row) => ({

      Expediente_c: row.Expediente,
      Contenedor_c: row.Contenedor,
      Mercancia_c: row.Mercancia,
      Capacidad_c: row.Capacidad,
      Ubicacion_c: row.Ubicacion,
      Destino_c: row.Destino,
      Observaciones_c: row.Observaciones,
      Fecharequerimiento_c: row.Fecharequerimiento,
       
    }))
    return contenedor
  })
}

module.exports = obtenerContenedores

//Codigo para usar si la consulta esta en un archivo diferente
// const obtenerSedes = require('./')

consultar.connect().then(() => {
  obtenerContenedores(consultar).then((contenedor) => {
    const tableBody = document.querySelector('#Listadocontenedores tbody')
    contenedor.forEach((column) => {

      const rowElement = document.createElement('tr')
      const ExpedienteCell = document.createElement('td')
      const ContenedorCell = document.createElement('td')
      const MercanciaCell = document.createElement('td')
      const CapacidadCell = document.createElement('td')
      const UbicacionCell = document.createElement('td')
      const DestinoCell = document.createElement('td')
      const ObservacionesCell = document.createElement('td')
      const FecharequerimientoCell = document.createElement('td')


      ExpedienteCell.textContent = column.Expediente_c
      ContenedorCell.textContent = column.Contenedor_c
      MercanciaCell.textContent = column.Mercancia_c
      CapacidadCell.textContent = column.Capacidad_c
      UbicacionCell.textContent = column.Ubicacion_c
      DestinoCell.textContent = column.Destino_c
      ObservacionesCell.textContent = column.Observaciones_c
      FecharequerimientoCell.textContent = column.Fecharequerimiento_c
    


      rowElement.appendChild(ExpedienteCell)
      rowElement.appendChild(ContenedorCell)
      rowElement.appendChild(MercanciaCell)
      rowElement.appendChild(CapacidadCell)
      rowElement.appendChild(UbicacionCell)
      rowElement.appendChild(DestinoCell)
      rowElement.appendChild(ObservacionesCell)
      rowElement.appendChild(FecharequerimientoCell)
   
      tableBody.appendChild(rowElement)
    })

    /*Ventana emergente */
const filasTabla = document.querySelectorAll('#Listadocontenedores tbody tr');
const ventanaEmergente = document.getElementById('ventana-emergente');

filasTabla.forEach(fila => {
fila.addEventListener('click', () => {    

const Expediente = fila.querySelector('td:nth-child(1)').textContent;
// const Fecharequerimiento = fila.querySelector('td:nth-child(2)').textContent;
const Contenedor = fila.querySelector('td:nth-child(2)').textContent;
const Mercancia = fila.querySelector('td:nth-child(3)').textContent;
const Capacidad = fila.querySelector('td:nth-child(4)').textContent;
const Ubicacion = fila.querySelector('td:nth-child(5)').textContent;
const Destino = fila.querySelector('td:nth-child(6)').textContent;
const Fecharequerimiento = fila.querySelector('td:nth-child(7)').textContent;


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
          <span  >${Expediente}</span>
          <br>
          <label >Tipo:</label>
          <span>${Contenedor}</span>
          <br>
          <label >Modelo:</label>
          <span>${Mercancia}</span>
          <br>
          <label >Marca:</label>
          <span>${Capacidad}</span>
          <br>
          <label >Ubicacion:</label>
          <span class="Ubicacion">${Ubicacion}</span>
          <br>
          <Label>Seleccione Destino: <Select id="Destino">   


          </Select></Label>

          </Div>
          <div class="Derecha">
          <label >Estatus:</label>
          <span>${Destino}</span>
          <br>
          <label >Observación:</label>
          <p>${Observaciones}</p>
          <label >Destino:</label>
          <p>${Destino}</p>
          </div>

          </div>
          <div class="emergente_btn">
              <button type="button" id="Guardar_destino" class="emergente_btn"  >Enviar a cargar</button>
              <button type="button" id="Salir" class="emergente_btn" name="Salir" >Salir</button>
          </div>
          </fieldset>

  
</div>
`;
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


    ventanaEmergente.innerHTML = contenidoVentana;
    ventanaEmergente.style.display = 'block';

    const botonCerrar = document.getElementById('botonCerrar');
botonCerrar.addEventListener('click', () => {
  ventanaEmergente.style.display = 'none';

  

  const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content')

tabs.forEach(tab => {
tab.addEventListener('click', () => {
    const tabId = tab.dataset.tab;

    tabContents.forEach(content => {
    content.classList.remove('active');
    });

    tabs.forEach(tab => {
    tab.classList.remove('active');
    });

    const tabContent = document.getElementById(tabId);
    tabContent.classList.add('active');
    tab.classList.add('active');
    
});
});
});
/*Insercion de destino en la base de datos */


/*Crear modelos */
const Guardar_modelos = document.getElementById("Guardar_destino");
const formulario2 = document.querySelector('#ventana-emergente-contenido');

Guardar_modelos.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        const Destino = document.querySelector('#Destino').value;
      

      // Utiliza los valores en tus consultas SQL
  await agregarModelos({ Destino, Placa});
  
  console.log(Destino, Placa)
      // Limpia los campos del formulario
      // location.reload();
  });

  
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



});
});
});



}).catch((err) => {
console.error(err)
});















