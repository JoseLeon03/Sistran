
const refrescar = require ('./Listadoviajes.js')
const obtenerTasa = require('../Utility/obtenerTasa.js');
const nuevoComprobantefunc = require('./crearComprobante.js');
const modificarContfunc = require('./emergenteCont.js');
const track = require('../Utility/Track.js');
const ocultar = require('../Utility/ocultar.js');
const modificarViaje = require('./modificarViaje.js');
const {estadosViaje, llenarTablaEstados} = require('./EstadosViaje.js');
const emergenteComprobanteayudante = require('./EmergenteComprobanteayudante.js');
const tablasComprobante = require('./TablaComprobantes.js');


function agregarEventosFilas(filasTabla, ventanaEmergente) {
    filasTabla.forEach(fila => {
      fila.addEventListener('click', () => {
        // Aquí va el código para obtener los datos de la fila
        const id_viaje = fila.querySelector('td:nth-child(1)').textContent;
        const Fecha_req = fila.querySelector('td:nth-child(2)').textContent;
        const origen = fila.querySelector('td:nth-child(3)').textContent;
        const destino = fila.querySelector('td:nth-child(4)').textContent;
        const estatus = fila.querySelector('td:nth-child(5)').textContent;
        const monto = fila.querySelector('td:nth-child(6)').textContent;
        const placa = fila.querySelector('td:nth-child(7)').textContent;
        const placacava = fila.querySelector('td:nth-child(8)').textContent;
        const placaremolque = fila.querySelector('td:nth-child(9)').textContent;
        const Cedula_chofer = fila.querySelector('td:nth-child(10)').textContent;
        const Nombredelchofer = fila.querySelector('td:nth-child(11)').textContent;
        const Apellido = fila.querySelector('td:nth-child(12)').textContent;
        const Observacion = fila.querySelector('td:nth-child(13)').textContent;
        const Ayudante = fila.querySelector('td:nth-child(14)').textContent;
        const Contenedor2 = fila.querySelector('td:nth-child(15)').textContent;
        const precinto = fila.querySelector('td:nth-child(16)').textContent;
        const precinto2 = fila.querySelector('td:nth-child(17)').textContent;
        const Bultos = fila.querySelector('td:nth-child(18)').textContent;
 
        // filaseleccionada = id_viaje
  // Variable para almacenar el ID del viaje seleccionado

// Agregar evento doble clic a las filas de la tabla
  const contenidoVentana = `

<div class ="Menu" id="Menu2">
       
<button type="button" class="menubar-btn2" id="botonCerrar"><i class="fas fa-times"></i></button>

</div>
<h2 class="Titulo">Datos del viaje</h2>
<div class="tab-menu" id="tab-menu">
<div class="tab active" data-tab="tab1">Detalles del viaje</div>
<div class="tab" data-tab="tab2">Estados del viaje</div>
<div class="tab" data-tab="tab3">Comprobantes del viaje</div>
<div class="tab" data-tab="tab4">Modificar viaje</div>
</div>


<div class="tab-content active" id="tab1">
<div id="separar">
<fieldset style="width: max-content;" >
<label >Fecha de requerimiento: </label> <span class="Fecha" id="fechaSpan">${Fecha_req}</span>
</fieldset>
<fieldset>
<label>ID: ${id_viaje} </label>
</fieldset>
</div>


<fieldset class="fieldEmergente1"> 
<div class="Tablas">

<Div class="Izquierda">
<label >Origen:</label>
<span >${origen}</span>
<br>
<label >Cedula chofer:</label>
<span>${Cedula_chofer}</span>
<br>
<label >Placa del vehículo:</label>
<span id="vehiculoSpan">${placa}</span>
<br>
<label >Placa cava:</label>
<span id="cavaSpan">${placacava}</span>
<br>
<label >Contenedor:</label>
<span class="Ubicacion" id="cont">${Contenedor2}</span>




</Div>
<div class="Derecha">
<label >Destino:</label>
<span>${destino}  </span>
<br>
<label >Nombre del chofer:</label>
<span>${Nombredelchofer} ${Apellido}</span>
<br>
<label >Bultos:</label>
<span id="bultosSpan">${Bultos}</span>
<br>
<label >Observacion:</label>
<div class="Observacion">
<p id="obsP">${Observacion}</p>
</div>
<label >Precinto:</label>
<span class="Ubicacion" style ="margin-left: 17px" id="preci">${precinto}</span>
<br>
<label >Precinto 2:</label>
<span class="Ubicacion" id="preci2">${precinto2}</span>



</div>
</div>
<div class="textarea">
<textarea name="" id="observacion" cols="30" rows="10"></textarea>
<button type="button" class="normalButton" id="añadirObservacion">Añadir observación</button>
</div>
</fieldset>
<fieldset>
<label >Estado actual: </label>
<span class="estadoViaje">${estatus} </span>

<label style="margin-left: 50px;">Fecha de estado: </label>
<span>${Fecha_req}</span></fieldset>

<div class="emergente_btn"> 
<button type="button" class="actualizarEstatus" id="modificarEstatus">Modificar estatus</button>
<button type="button" id="reImprimir" class="normalButton"> Re imprimir</button>
<button type="button" id="Anular" class="redButton">Eliminar viaje</button> 




</div>
</div>
<div id="estatus-emergente"></div>


<!-- Segunda pestaña -->

<div class="tab-content" id="tab2">

<fieldset>

<h2>${estatus} </h2>
<h4></h4>
</fieldset>

<div class="ref">
<button type="button" id="reloadEstatus" class="normalButton2"> Refrescar </button>
</div>

<fieldset class="listadoEstadosviaje"><legend>Estados anteriores del viaje</legend>
<table id="listadoEstadosviajes">
<thead>
<tr>

    <th>ID</th>
    <th>Estado</th>
    <th>Sede</th>
    <th>Fecha</th>
    <th>Bultos</th>
    </tr> 

</thead>
<tbody></tbody>
</table>
</fieldset>

<div class="divEstadosfecha">

<fieldset><legend>Cambio de fecha de salida de viaje</legend>
<button type="button" class="Modificar" id="modificarFechasalida">Modificar</button>
<div class="divNuevafecha">
<label class="fechaEstado" >Fecha de salida nueva</label>
<br>
<input type="date" name="" id="fechaSalidanueva">
</div>

</fieldset>

<fieldset><legend>Cambio de fecha de llegada de viaje</legend>

<button type="button" class="Modificar" id="modificarFechallegada">Modificar</button>
<div class="divNuevafecha">
<label class="fechaEstado" >Fecha de llegada nueva</label>
<br>
<input type="date" name="" id="fechaLlegadanueva">
</div>   
</fieldset>
</div>

</div>


<!-- Inicio de Tercera pestaña -->

<div class="tab-content" id="tab3">

<fieldset style="width: max-content; margin-bottom: 5px"><label>Comprobante inicial del viaje</label></fieldset>

<fieldset>
    <label>Numero: </label>
    <span></span>

    <span class="derechaComprobante"></span>
    <label class="derechaComprobante" >Fecha: </label>

    <br>
    <label>Descripción: </label>
    <span></span>


    <span  class="derechaComprobante"></span>
    <label class="derechaComprobante">Monto:</label>
  

</fieldset>
<div class="ref">
<button type="button" id="reloadComprobante" class="normalButton2"> Refrescar </button>
</div>

<fieldset class="listadoComprobantesviaje">
<table id="listadoComprobantesviaje">
    <thead>
        <th>Numero</th>
        <th>Descripción</th>
        <th>Fecha</th>
        <th>Monto(Bs)</th>
        <th>Beneficiario</th>
        <tbody></tbody> 
    </thead>
 

</table>
</fieldset>


    <div class="imprimirButton">
    </div>
    <div id="ventana-modificarComprobante"></div>
</div>



<!-- Inicio de la cuarta pestaña -->
<div class="tab-content" id="tab4">

    <fieldset class="fieldModificarviajes">
        <label for="">Cedula del nuevo chofer</label>
        <input type="number" name="" id="cedulaNueva" style="margin-left: 10px">
        <button class="modificarViajes" type="button" id="modificarCedula">Modificar</button>
    </fieldset>

    <fieldset class="fieldModificarviajes">
        <label for="">Placa del nuevo vehículo</label>
        <input type="text" name="" id="placaNueva" style="margin-left: 7px">
        <button class="modificarViajes" type="button" id="modificarPlaca">Modificar</button>
    </fieldset>

    <fieldset class="fieldModificarviajes">
        <label for="">Placa de la nueva cava</label>
        <input type="text" name="" id="cavaNueva" style="margin-left: 23px">
        <button class="modificarViajes" type="button" id="modificarCava">Modificar</button>
    </fieldset>

    <fieldset class="fieldModificarviajes">
        <label for="">Placa del nuevo remolque</label>
        <input type="text" name="" id="remolqueNuevo">
        <button class="modificarViajes" type="button" id="modificarRemolque">Modificar</button>
    </fieldset>
    
    <fieldset class="fieldModificarviajes">
        <label for="">Modificar bultos de viaje</label>
        <input type="number" name="" id="bultosNuevos" style="margin-left: 10px">
        <button class="modificarViajes" type="button" id="modificarBultos">Modificar</button>
    </fieldset class="fieldModificarviajes">

   
    <div class="emergente_btn3">
    <button type="button" class="modificarViajes" id="modificarAyudante">Modificar Ayudante</button>
    <br>
    <button type="button" class="normalButton" id="nuevoComprobante"> Nuevo comprobante adicional</button>
    <br>
    <button type="button" class="normalButton" id="comprobanteAyudante"> Nuevo comprobante al ayudante</button>
    <br>
    <button type="button" class="modificarViajes" id="emergenteCont"> Modificar contenedor y precintos</button>
    </div>
</fieldset>
    
<div id="nuevoComprobanteDiv"></div>
<div id="generar-ayudante"></div>
<div id="generar-comprobanteAyudante"></div>
<div id="modificarContenedor"></div>


</div>

  `   
;
{/* <button type="button" id="Anular" class="redButton">Eliminar viaje</button>   */}
ventanaEmergente.innerHTML = contenidoVentana;
const nuevoComprobante = document.getElementById('nuevoComprobante');
const contenedor = document.getElementById('nuevoComprobanteDiv');
const contenedor2 = document.getElementById('ventana-modificarComprobante');

const modificarCont= document.getElementById('emergenteCont')

modificarContfunc(modificarCont, id_viaje,contenidoVentana, Contenedor2, precinto,precinto2)

// nuevoComprobantefunc(nuevoComprobante,contenedor,origen, id_viaje, Cedula_chofer,Nombredelchofer, Apellido, contenedor2)
nuevoComprobante.addEventListener('click', () => {
  const contenidoHTML = `
  <div id="contenedor-emergente">
    <div id="comprobantes-adicionales">
      <div class ="Menu">
          <button type="button" class="menubar-btn2" id="botonCerrar5"><i class="fas fa-times"></i></button>
      </div>
      <h2>Comprobante adicional</h2>
      <fieldset>
        <div id="Concepto">
            <label for="" style="margin-top: 20px;">Concepto:</label><br>
            <textarea name="concepto" id="concepto" cols="30" rows="10" class="comprobante"></textarea></div>
            <br><br>
            <label for="">Tipo de comprobante</label>
            <select name="tipoComprobante" id="tipoComprobante" class="requerido2 "><option value="" ></option></select>
            <br><br>
            <label for="">Monto Bs.</label>
            <input type="number" id="monto" class="requerido2 " name="monto">
                <br><br>
            <div class="emergente_btn">
                <button type="button" id="crear_comprobante" class="boton" >Guardar</button>
                </div>
    </fieldset>
        </div>
    </div>`;

  // Agrega el contenido HTML al elemento
  contenedor.innerHTML = contenidoHTML;

  // Muestra el elemento con display: block
  contenedor.style.display = 'block';

  document.getElementById('botonCerrar5').addEventListener('click', function() {
    document.getElementById('nuevoComprobanteDiv').style.display = 'none';
  });

    /*Select de Tipo de comprobante*/
async function obtenerTipoComprobante() {
  try {

    await sql.connect(config);

    const result = await sql.query('SELECT Id, Descripcion FROM TipoComprobante');

    await sql.close();

    return result.recordset;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}


async function GenerarTipoComprobante() {
  try {

    const destino = await obtenerTipoComprobante();

    let selectOptions = '<option value="" disabled selected>Seleccione</option>';

    destino.forEach((row) => {
      selectOptions += `<option value="${row.Id}">${row.Descripcion}</option>`;
    });

  
    const selectHtml = `<select>${selectOptions}</select>`;
    document.getElementById('tipoComprobante').innerHTML = selectHtml ;
    return selectHtml;
  } catch (error) {
    console.error('Error al generar el select:', error);
    throw error;
  }
}

GenerarTipoComprobante()
  .then((selectHtml) => {
    console.log('Select HTML generado:', selectHtml);
  
  })
  .catch((error) => {
    console.error('Error en la generación del select:', error);

  });
/*Fin select de destino*/


  const crearComprobante = document.getElementById('crear_comprobante');
   
  crearComprobante.addEventListener('click', async () => {
  // Obtener los valores de los elementos del formulario

      crearComprobante.disabled = true

      const concepto        = document.getElementById('concepto').value;
      const monto           = document.getElementById('monto').value;
      const tipoComprobante = document.getElementById('tipoComprobante').value;
      const fecha           = new Date().toISOString().slice(0, 19).replace('T', ' ');


      const pool =  await consultar;

      const result = await  pool.request().query(`SELECT Codigo from Sedes where sede = '${origen}'`);

      const Informacion = result.recordset[0];

      const sede = Informacion.Codigo;



      let nombresMostrados = {
        'concepto'       : 'Por favor, ingrese un concepto para el comprobante ',
        'monto'          : 'Por favor, ingrese el monto del comprobante',
        'tipoComprobante': 'Por favor, seleccione un tipo de comprobante'
      

        // Agrega más mapeos según sea necesario
      };

      let inputs = document.querySelectorAll('.requerido2 ,.comprobante');

      let camposVacios = []; 

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
            crearComprobante.disabled = false
               }, 2500)
          
      } 

    else{
      ipcRenderer.send('modification-confirm-dialog')
      const index = await new Promise((resolve) => {
        ipcRenderer.once('modification-dialog-result', (event, index) => {
          resolve(index)
        })
      })

      if (index === 1) {
        // El usuario hizo clic en "no"
        crearComprobante.disabled = false
      }
      else {

    // Generar el nuevo comprobante utilizando los valores obtenidos
    crearComprobante.disabled = false
        try {
          obtenerTasa();
          
           const Tasa =   await obtenerTasa({}); 
          
         
          const montoUsd = monto / Tasa;

          const pool = await consultar.connect();
          const sqlQuery = `
            INSERT INTO Comprobante_viajes (Codigo_viaje, Monto, Origen, Descripcion, Tipocomprobante, Fecha,
              Beneficiario, Cedula, Monto_usd) Values (${id_viaje}, ${monto}, ${sede} , '${concepto}', 
              '${tipoComprobante}', '${fecha}', '${Nombredelchofer} ${Apellido}', ${Cedula_chofer} , ${montoUsd})
              ;
          `;
          await pool.request().query(sqlQuery);
          ipcRenderer.send('registroExitoso');
        
          const sqlQuery2 = `SELECT MAX(Num_comprobante) AS UltimoComprobante FROM Comprobante_viajes`;
          const result= await pool.request().query(sqlQuery2)

          const numeroComprobante = result.recordset[0].UltimoComprobante 
          ipcRenderer.send('dato')
                // console.log('golita') 
                const arg = await new Promise((resolve) => {
                  ipcRenderer.on('user-data', (event, arg) => {               
                    resolve(arg)
                  });
                })
                
                const usuario = arg.usuario
                const descripcion =` Se ha creado un comprobante adicional con el numero ${numeroComprobante} para el viaje con el ID ${id_viaje}`       

                track(descripcion , usuario)
                const tablasComprobante = require('./TablaComprobantes.js'); 
                tablasComprobante(contenedor2, numeroComprobante, idViaje,Fecha_req)
                document.getElementById('botonCerrar5').click()
        } catch (err) {
          console.error(err);
        }  

      }
    }   
   
  });
});



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
   
      ventanaEmergente.style.display = 'block';

      const botonCerrar = document.getElementById('botonCerrar');
      botonCerrar.addEventListener('click', () => {
        ventanaEmergente.style.display = 'none';

      });


 



  const botonImprimir = document.querySelector('#reImprimir');

// Añade un escuchador de eventos para el evento de clic.
botonImprimir.addEventListener('click', async () => {
  // Usa la función consultar para obtener el listado de viajes.
  // Cuando el botón sea clickeado, genera el PDF.
  const generarSalida = require ('../Reqtransporte/GenerarAutorizacionsalida')
  await generarSalida({id_viaje})

  const generarBitacora = require('../Reqtransporte/GenerarBitacora');
  await generarBitacora({id_viaje, Cedula_chofer})

  // const generarDespacho = require ('../Reqtransporte/GenerarAutorizaciondespacho')
  // await generarDespacho({id_viaje})

  // Aquí puedes guardar el PDF en un archivo, enviarlo a través de una respuesta HTTP, etc.
});

/****************************Codigo para cambiar el ayudante***********************/
const nuevoAyudante = document.getElementById('modificarAyudante');
const nuevoAyudanteDiv = document.getElementById('generar-ayudante');
  
const emergenteNuevoayudante = require('./EmergenteNuevoayudante.js')

  emergenteNuevoayudante(nuevoAyudante, nuevoAyudanteDiv,id_viaje)


/*****************************Fin de el codigo para cambiar el ayudante*************************************************** */


  
/*******************Codigo para anular viajes************************* */
const anularViaje = document.getElementById("Anular");

ocultar(anularViaje)

anularViaje.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente
 
      ipcRenderer.send('elimination-confirm-dialog',id_viaje)
     
      const index = await new Promise((resolve) => {
        ipcRenderer.once('elimination-dialog-result', (event, index) => {
          resolve(index)
        })
      })
      
     
      if (index === 1) {
        // El usuario hizo clic en "no"
      }
      else{

      // Utiliza los valores en tus consultas SQL

      ipcRenderer.send('dato')
      // console.log('golita') 
      const arg = await new Promise((resolve) => {
        ipcRenderer.on('user-data', (event, arg) => {               
          resolve(arg)
        });
      })
      
      const usuario = arg.usuario
      const descripcion =` Se ha eliminado el viaje con el id ${id_viaje}`       

      track(descripcion , usuario)
      await eliminarViajesfunction({id_viaje});
      ipcRenderer.send('datosEliminados');
      // Limpia los campos del formulario
      location.reload();

      }
    
});


async function eliminarViajesfunction() {
    try {
        const pool = await consultar;
        const sqlQuery = `delete  Viajes  where Id_viaje = ${id_viaje};
     `;
        const result = await pool.request().query(sqlQuery);
        const sqlQuery2 = `Update Empleados set estatus = 1 where Cedula = ${Cedula_chofer} or Nombre = '${Ayudante}'; Update Vehiculos set Ubicacion =1 where Placa ='${placa}' or Placa ='${placacava}' or Placa ='${placaremolque}'`;
        const result2 = await pool.request().query(sqlQuery2);

        const sqlQuery3 = `Delete comprobante_viajes where codigo_viaje = ${id_viaje}`;
        const result3 = await pool.request().query(sqlQuery3);

        console.log('Registro agregado a la base de datos:', result);
       
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}
/*******************Fin Codigo para anular viajes************************* */

  //  Delete comprobante_viajes where Codigo_viaje = ${id_viaje}

/*******************Codigo para añadir observaciones************************* */
const añadirObservacion = document.getElementById("añadirObservacion");

añadirObservacion.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

    const nuevaObservacion = document.querySelector('#observacion').value;

    // Utiliza los valores en tus consultas SQL
    ipcRenderer.send('dato')
      // console.log('golita') 
      const arg = await new Promise((resolve) => {
        ipcRenderer.on('user-data', (event, arg) => {               
          resolve(arg)
        });
      })
      
      const usuario = arg.usuario
      const descripcion =` Se ha añadido una observacion al viaje con el id ${id_viaje}`       

      track(descripcion , usuario)
      await añadirObservacionfunction({nuevaObservacion});

      document.getElementById('obsP').innerHTML =`${Observacion} / ${nuevaObservacion}`
    // Limpia los campos del formulario
});


async function añadirObservacionfunction(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `Update  Viajes set Observaciones = '${Observacion} / ${datos.nuevaObservacion}' where Id_viaje = ${id_viaje} `;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
        await ipcRenderer.send('datosModificados');

    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}
/*******************Fin Codigo para aañadir a************************* */

      const estatusEmergente = document.getElementById('estatus-emergente');
      const modificarEstatus = document.getElementById('modificarEstatus')

        const modificarEstatusfunc = require ('./EmergenteEstatus.js')
        modificarEstatusfunc(estatusEmergente,modificarEstatus, estatus, id_viaje, fila, Cedula_chofer)

        const idViaje = id_viaje; 

        

        const reload = document.getElementById("reloadComprobante");

        reload.addEventListener('click', async (evento) => {

          const tablasComprobante = require('./TablaComprobantes.js');
          tablasComprobante(contenedor2, numeroComprobante, idViaje,Fecha_req)

      });

      const reload2 = document.getElementById("reloadEstatus");
     
        reload2.addEventListener('click',  (evento) => {
       
          // const tablasComprobante = require('./TablaComprobantes.js');
          // tablasComprobante(contenedor2, numeroComprobante, idViaje)
          llenarTablaEstados(idViaje)

      });


      
      let numeroComprobante;

  

    



    

      const comprobanteAyudante = document.getElementById("comprobanteAyudante")
      const comprobanteAyudanteDiv = document.getElementById("generar-comprobanteAyudante")

      emergenteComprobanteayudante(comprobanteAyudante, comprobanteAyudanteDiv, id_viaje, origen)
      estadosViaje(id_viaje) 
      llenarTablaEstados(idViaje);   

      tablasComprobante(contenedor2, numeroComprobante, idViaje,Fecha_req)
      modificarViaje(id_viaje, placa, Cedula_chofer, placaremolque , placacava)

   
  });


   }
 
 )}
module.exports = agregarEventosFilas;



