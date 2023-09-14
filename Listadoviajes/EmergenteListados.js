
function agregarEventosFilas(filasTabla, ventanaEmergente) {
    filasTabla.forEach(fila => {
      fila.addEventListener('dblclick', () => {
        // Aquí va el código para obtener los datos de la fila
        const id_viaje = fila.querySelector('td:nth-child(1)').textContent;
        const fecharequerimiento = fila.querySelector('td:nth-child(2)').textContent;
        const origen = fila.querySelector('td:nth-child(3)').textContent;
        const destino = fila.querySelector('td:nth-child(4)').textContent;
        const estatus = fila.querySelector('td:nth-child(5)').textContent;
        const monto = fila.querySelector('td:nth-child(6)').textContent;
        const placa = fila.querySelector('td:nth-child(7)').textContent;
        const placacava = fila.querySelector('td:nth-child(8)').textContent;
        const placaremolque = fila.querySelector('td:nth-child(9)').textContent;
        const cedulachofer = fila.querySelector('td:nth-child(10)').textContent;
        const Nombredelchofer = fila.querySelector('td:nth-child(11)').textContent;
        const Apellido = fila.querySelector('td:nth-child(12)').textContent;
        const Observacion = fila.querySelector('td:nth-child(13)').textContent;
        const Ayudante = fila.querySelector('td:nth-child(14)').textContent;
        const Bultos = fila.querySelector('td:nth-child(15)').textContent;
 
  // Variable para almacenar el ID del viaje seleccionado

// Agregar evento doble clic a las filas de la tabla
  const contenidoVentana = `

<div class ="Menu">
       
<button type="button" class="menubar-btn2" id="botonCerrar"><i class="fas fa-times"></i></button>

</div>
<h2 class="Titulo">Datos del viaje</h2>
<div class="tab-menu">
<div class="tab active" data-tab="tab1">Detalles del viaje</div>
<div class="tab" data-tab="tab2">Estados del viaje</div>
<div class="tab" data-tab="tab3">Comprobantes del viaje</div>
<div class="tab" data-tab="tab4">Modificar viaje</div>
</div>


<div class="tab-content active" id="tab1">

<fieldset style="width: max-content;" >
<label >Fecha de requerimiento: </label> <span class="Fecha">${fecharequerimiento}</span></fieldset>
<fieldset class="fieldEmergente1"> 
<div class="Tablas">

<Div class="Izquierda">
<label >Origen:</label>
<span >${origen}</span>
<br>
<label >Cedula chofer:</label>
<span>${cedulachofer}</span>
<br>
<label >Placa del vehículo:</label>
<span>${placa}</span>
<br>
<label >Placa cava</label>
<span>${placacava}</span>
<br>
<label >Contenedor:</label>
<span class="Ubicacion">En patio guacara</span>

</Select></Label>

</Div>
<div class="Derecha">
<label >Destino:</label>
<span>${destino}  </span>
<br>
<label >Nombre del chofer:</label>
<span>${Nombredelchofer} ${Apellido}</span>
<br>
<label >Bultos:</label>
<span>${Bultos}</span>
<br>
<label >Observacion:</label>
<div class="Observacion">
<p>${Observacion}</p>
</div>
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
<span>15/08/2023</span></fieldset>

<div class="emergente_btn"> 
<button type="button" class="actualizarEstatus" id="modificarEstatus">Modificar estatus</button>
<button type="button" id="Anular" class="redButton"> Anular viaje</button> 
<button type="button" id="reImprimir" class="normalButton"> Re imprimir</button> 

</div>
</div>
<div id="estatus-emergente"></div>


<!-- Segunda pestaña -->

<div class="tab-content" id="tab2">

<fieldset><legend>Estados del viaje</legend>
<h2>${estatus} </h2>
<h4>15/08/2023</h4>
</fieldset>

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

<fieldset><legend>Comprobante inicial del viaje</legend>
    <label>Numero: </label>
    <span>123456</span>

    <span class="derechaComprobante">16/08/2023</span>
    <label class="derechaComprobante" >Fecha: </label>

    <br>
    <label>Descripción: </label>
    <span>50% Gastos reembolsables viaje a Acarigua</span>


    <span  class="derechaComprobante"> 600bs</span>
    <label class="derechaComprobante">Monto:</label>
  

</fieldset>

<fieldset class="listadoComprobantesviaje"><legend>Comprobantes de viaje</legend>
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
    </div>
</fieldset>
    
<div id="nuevoComprobanteDiv"></div>
<div id="generar-ayudante"></div>
<div id="generar-comprobanteAyudante"></div>

</div>

  `   
;
ventanaEmergente.innerHTML = contenidoVentana;
const nuevoComprobante = document.getElementById('nuevoComprobante');
const contenedor = document.getElementById('nuevoComprobanteDiv');

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
            <label for="">Monto</label>
            <input type="number" id="monto" class="requerido2 " name="monto">
                <br><br>
            <div class="emergente_btn">
                <button type="button" id="modificar_comprobante" class="boton" >Guardar</button>
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

    /*Select de Tipo de viaje*/
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


const modificarComprobante = document.getElementById('modificar_comprobante');

modificarComprobante.addEventListener('click', async () => {
  // Obtener los valores de los elementos del formulario

  const concepto = document.getElementById('concepto').value;
  const monto = document.getElementById('monto').value;
  const tipoComprobante = document.getElementById('tipoComprobante').value;
  const fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');


  const pool =  await consultar;

  const result = await  pool.request().query(`SELECT Codigo from Sedes where sede = '${origen}'`);

  const Informacion = result.recordset[0];

  const sede = Informacion.Codigo;



  let nombresMostrados = {
    'concepto': 'Por favor, ingrese un concepto para el comprobante ',
    'monto': 'Por favor, ingrese el monto del comprobante',
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
      }
      else {



      // Generar el nuevo comprobante utilizando los valores obtenidos
      try {
        const pool = await consultar.connect();
        const sqlQuery = `
          INSERT INTO Comprobante_viajes (Codigo_viaje, Monto, Origen, Descripcion, Tipocomprobante, Fecha, Beneficiario, Cedula) Values (${id_viaje}, ${monto}, ${sede} , '${concepto}',  '${tipoComprobante}', '${fecha}', '${Nombredelchofer} ${Apellido}', ${cedulachofer})
            ;
        `;
        await pool.request().query(sqlQuery);
      } catch (err) {
        console.error(err);
      }  ipcRenderer.send('registroExitoso');
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


  /*************************COdigo para modificar la cedula del chofer **************************************/
      const modificarCedula = document.getElementById("modificarCedula");

      modificarCedula.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        const nuevaCedula = document.querySelector('#cedulaNueva').value;
   
        const ConsultaCedula = `SELECT count(*) as count FROM empleados where cedula = '${nuevaCedula}'`;
        const consultaCeduladisp =`SELECT count(*) as count FROM empleados where cedula = '${nuevaCedula}' and Estatus =1`;
        // Ejecutar la consulta y obtener el resultado
        const pool = await consultar;
        const result = await pool.request().query(ConsultaCedula);
        const result2 = await pool.request().query(consultaCeduladisp);
        // Obtener el valor de count del objeto result
        const count2 =result2.recordset[0].count;
        const count = result.recordset[0].count;

        if( nuevaCedula == ""){ /*Envia un mensaje que indica  que el campo esta vacio */
      
          ipcRenderer.send('validarCampo')
        }  
       
        else if (count == 0) {/*Envia un mensaje que indicar que la cedula no esta registrada*/
          
          await  ipcRenderer.send('choferNoregistrado')
        } 
        else if (count2 == 0){

          await ipcRenderer.send('choferNodisponible');

        }

   
        else{
      // Utiliza los valores en tus consultas SQL 
      ipcRenderer.send('modification-confirm-dialog')
      const index = await new Promise((resolve) => {
        ipcRenderer.once('modification-dialog-result', (event, index) => {
          resolve(index)
        })
      })
    
      if (index === 1) {
        // El usuario hizo clic en "no"
      }

        await  ipcRenderer.send('datosModificados');
        location.reload();
        await modificarCedulafunction({ nuevaCedula});

        
       
            
      // Limpia los campos del formulario
  }});

  
  async function modificarCedulafunction(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `Update  Viajes  set Cedula_chofer = ${datos.nuevaCedula} where Id_viaje = ${id_viaje};
          Update empleados set Estatus = 1 where Cedula =${cedulachofer};
          Update empleados set Estatus = 2 where Cedula =${datos.nuevaCedula} `;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
         
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }
  /***************************Fin de codigo para modificar la cedula del chofer **********************/

  /****************************Codigo para modificar la placa del vehículo *************************/
  
  const modificarPlaca = document.getElementById("modificarPlaca");

  modificarPlaca.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        const nuevaPlaca = document.querySelector('#placaNueva').value;
   
        const ConsultaPlaca = `SELECT count(*) as count FROM Vehiculos where Placa = '${nuevaPlaca}' and tipovehiculo not in (2,5,6)`
        const consultaPlacadisp =`SELECT count(*) as count FROM Vehiculos where Placa = '${nuevaPlaca}' and Ubicacion =1`;

        // Ejecutar la consulta y obtener el resultado
        const pool = await consultar;
        const result = await pool.request().query(ConsultaPlaca);
        const result2 = await pool.request().query(consultaPlacadisp)
        // Obtener el valor de count del objeto result
        const count = result.recordset[0].count;
        const count2 = result2.recordset[0].count;
        if( nuevaPlaca == ""){ /*Envia un mensaje que indica  que el campo esta vacio */
      
          ipcRenderer.send('validarCampo')
        }  
        // Si count es igual que cero, la placa no existe
        else if (count == 0) {
          
          await  ipcRenderer.send('vehiculoNoregistrado')
        } 

        else if (count2 == 0){

          await ipcRenderer.send('vehículoNodisponible')

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
          }
      // Utiliza los valores en tus consultas SQL
        await  ipcRenderer.send('datosModificados');
        location.reload();
        await modificarPlacafunction({nuevaPlaca});
    

  }});

  
  async function modificarPlacafunction(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `Update  Viajes  set Placa_veh = '${datos.nuevaPlaca}' where Id_viaje = ${id_viaje};
          Update Vehiculos set Ubicacion = 1 where Placa ='${placa}';
          Update Vehiculos set Ubicacion = 2 where Placa ='${datos.nuevaPlaca}' `;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
         
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }

  /*******************************Fin de codigo para modificar la placa del vehiculo *********************************/

/***************************************Codigo para modificar la cava******************************************************* */
  const modificarCava = document.getElementById("modificarCava");

  modificarCava.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        const nuevaCava = document.querySelector('#cavaNueva').value;
   
        const ConsultaCava = `SELECT count(*) as count FROM Vehiculos where Placa = '${nuevaCava}' and tipovehiculo in (2,4)`
        const consultaCavadisp =`SELECT count(*) as count FROM Vehiculos where Placa = '${nuevaCava}' and Ubicacion =1 and tipovehiculo in (2,4)`;

        // Ejecutar la consulta y obtener el resultado
        const pool = await consultar;
        const result = await pool.request().query(ConsultaCava);
        const result2 = await pool.request().query(consultaCavadisp)


        // Obtener el valor de count del objeto result
        const count = result.recordset[0].count;  
        const count2 = result2.recordset[0].count;
        if( nuevaCava == ""){ /*Envia un mensaje que indica  que el campo esta vacio */
      
          ipcRenderer.send('validarCampo')
        }  

        // Si count es igual que cero, la placa no existe
        else if (count == 0) {
          
          await  ipcRenderer.send('vehiculoNoregistrado')
        } 

        else if (count2 == 0){

          await ipcRenderer.send('vehículoNodisponible')

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
          }
      // Utiliza los valores en tus consultas SQL
        await  ipcRenderer.send('datosModificados');
        location.reload();
        await modificarCavafunction({ nuevaCava});

      // Limpia los campos del formulario
  }});

  
  async function modificarCavafunction(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `Update  Viajes  set Placa_Cava = '${datos.nuevaCava}' where Id_viaje = ${id_viaje};
          Update Vehiculos set Ubicacion = 1 where Placa ='${placacava}';
          Update Vehiculos set Ubicacion = 2 where Placa ='${datos.nuevaCava}'  `;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
         
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }
  /******************Fin de codigo para modificar la cava ************************/


    /***************************************Codigo para modificar el remolque******************************************************* */
  const modificarRemolque = document.getElementById("modificarRemolque");

  modificarRemolque.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        const nuevoRemolque= document.querySelector('#remolqueNuevo').value;
   
        const consultaRemolque = `SELECT count(*) as count FROM Vehiculos where Placa = '${nuevoRemolque}' and tipovehiculo  in (5,6)`
        const consultaRemolquedisp =`SELECT count(*) as count FROM Vehiculos where Placa = '${nuevoRemolque}' and Ubicacion =1 and tipovehiculo in (5,6)`;

        // Ejecutar la consulta y obtener el resultado
        const pool = await consultar;
        const result = await pool.request().query(consultaRemolque);
        const result2 = await pool.request().query(consultaRemolquedisp)

        // Obtener el valor de count del objeto result
        const count = result.recordset[0].count;
        const count2 = result2.recordset[0].count;

        if( nuevoRemolque == ""){ /*Envia un mensaje que indica  que el campo esta vacio */
      
          ipcRenderer.send('validarCampo')
        }  
        // Si count es igual que cero, la placa no existe
        else if (count == 0) {
          
          await  ipcRenderer.send('vehiculoNoregistrado')
          // console.log(`La placa ${placa} ya existe en la base de datos`);
        } 

        else if (count2 == 0){

          await ipcRenderer.send('vehículoNodisponible')

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
          }
      // Utiliza los valores en tus consultas SQL
        await  ipcRenderer.send('datosModificados');
        location.reload();
        await modificarRemolquefunction({ nuevoRemolque});

      // Limpia los campos del formulario
  }});

  
  async function modificarRemolquefunction(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `Update  Viajes  set Placa_Remolque = '${datos.nuevoRemolque}' where Id_viaje = ${id_viaje};
          Update Vehiculos set Ubicacion = 1 where Placa ='${placaremolque}';
          Update Vehiculos set Ubicacion = 2 where Placa ='${datos.nuevoRemolque}'  `;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
         
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }
  /******************Fin de codigo para modificar el remolque ************************/



  const botonImprimir = document.querySelector('#reImprimir');

// Añade un escuchador de eventos para el evento de clic.
botonImprimir.addEventListener('click', async () => {
  // Usa la función consultar para obtener el listado de viajes.
  // Cuando el botón sea clickeado, genera el PDF.
  const generarSalida = require ('../Reqtransporte/GenerarAutorizacionsalida')

  await generarSalida({id_viaje})

  // Aquí puedes guardar el PDF en un archivo, enviarlo a través de una respuesta HTTP, etc.
});

/****************************Codigo para cambiar el ayudante***********************/
const nuevoAyudante = document.getElementById('modificarAyudante');
const nuevoAyudanteDiv = document.getElementById('generar-ayudante');
  
const emergenteNuevoayudante = require('./EmergenteNuevoayudante.js')

  emergenteNuevoayudante(nuevoAyudante, nuevoAyudanteDiv,id_viaje)


/*****************************Fin de el codigo para cambiar el ayudante*************************************************** */


  /***************************************Codigo para modificar bultos******************************************************* */
  const modificarBultos = document.getElementById("modificarBultos");

  modificarBultos.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        const nuevosBultos= document.querySelector('#bultosNuevos').value;

        if( nuevosBultos == ""){ /*Envia un mensaje que indica  que el campo esta vacio */
      
        ipcRenderer.send('validarCampo')
      }  else{
   
        ipcRenderer.send('modification-confirm-dialog')
        const index = await new Promise((resolve) => {
          ipcRenderer.once('modification-dialog-result', (event, index) => {
            resolve(index)
          })
        })
      
        if (index === 1) {
          // El usuario hizo clic en "no"
        }
      // Utiliza los valores en tus consultas SQL
        await  ipcRenderer.send('datosModificados');
        location.reload();
        await modificarBultosfunction({ nuevosBultos});

      // Limpia los campos del formulario
  }});

  
  async function modificarBultosfunction(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `Update  Viajes  set Bultos = '${datos.nuevosBultos}' where Id_viaje = ${id_viaje} `;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
         
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }
  /******************Fin de codigo para modificar bultos ************************/

  
/***************************************Codigo para modificar la fecha de llegada******************************************************* */
const modificarFechallegada = document.getElementById("modificarFechallegada");

modificarFechallegada.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

      const nuevaFechallegada = document.querySelector('#fechaLlegadanueva').value;
      if( nuevaFechallegada == ""){ /*Envia un mensaje que indica  que el campo esta vacio */
      
          ipcRenderer.send('validarCampo')
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
          }

    // Utiliza los valores en tus consultas SQL
      await modificarFechallegadafunction({nuevaFechallegada});
      await  ipcRenderer.send('datosModificados');


    // Limpia los campos del formulario
}
  });


async function modificarFechallegadafunction(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `Update  Viajes set Fecha_llegada = '${datos.nuevaFechallegada}' where Id_viaje = ${id_viaje}`;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
       
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}
/******************Fin de codigo para modificar la fecha de llegada ************************/


/***************************************Codigo para modificar la fecha de Salida******************************************************* */
const modificarFechasalida = document.getElementById("modificarFechasalida");

modificarFechasalida.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

      const nuevaFechaSalida = document.querySelector('#fechaSalidanueva').value;

      if( nuevaFechaSalida == ""){ /*Envia un mensaje que indica  que el campo esta vacio */
      
          ipcRenderer.send('validarCampo')
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
          }
    // Utiliza los valores en tus consultas SQL
      await modificarFechasalidafunction({ nuevaFechaSalida});
      await  ipcRenderer.send('datosModificados');

    // Limpia los campos del formulario
}});


async function modificarFechasalidafunction(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `Update  Viajes  set Fecha = '${datos.nuevaFechaSalida}' where Id_viaje = ${id_viaje}`;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
       
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}

/******************Fin de codigo para modificar la fecha de llegada ************************/

/*******************Codigo para anular viajes************************* */
const anularViaje = document.getElementById("Anular");

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
        Delete comprobante_viajes where Codigo_viaje = ${id_viaje}`;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
       
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}
/*******************Fin Codigo para anular viajes************************* */



/*******************Codigo para añadir observaciones************************* */
const añadirObservacion = document.getElementById("añadirObservacion");

añadirObservacion.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

    const nuevaObservacion = document.querySelector('#observacion').value;


        
    // Utiliza los valores en tus consultas SQL
      await añadirObservacionfunction({nuevaObservacion});
      await ipcRenderer.send('datosModificados');

    // Limpia los campos del formulario
});


async function añadirObservacionfunction(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `Update  Viajes set Observaciones = '${Observacion} / ${datos.nuevaObservacion}' where Id_viaje = ${id_viaje} `;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
       
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}
/*******************Fin Codigo para aañadir a************************* */




const estatusEmergente = document.getElementById('estatus-emergente');
const modificarEstatus = document.getElementById('modificarEstatus')

   const modificarEstatusfunc = require ('./EmergenteEstatus.js')
   modificarEstatusfunc(estatusEmergente,modificarEstatus, estatus, id_viaje, fila, cedulachofer)

   const idViaje = id_viaje; 

        function llenarTablaEstados(idViaje) {
        
          consultar.connect().then(() => {
            const request = new sql.Request(consultar);
            request.query(`
            SELECT ce.Cod_estatus,
            ev.Nombre AS Nombre_Estatus,
            (SELECT Sede FROM Sedes s WHERE s.Codigo = ce.Sede) AS Nombre_Sede,
            Format(ce.Fecha, 'dd/MM/yyyy') AS Fecha,
            ce.Bultos
        FROM Cambio_estatusviaje ce
        JOIN EStatusviaje ev ON ce.Codigo_estado = ev.Id_estatus
        WHERE ce.Codigo_viaje = ${idViaje}
        ORDER BY ce.Fecha DESC, ce.Cod_estatus DESC;
            `).then((result) => {
              const tabla = document.querySelector('#listadoEstadosviajes tbody');
              tabla.innerHTML = ''; // Limpiar la tabla antes de agregar datos

              result.recordset.forEach((fila) => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                  <td>${fila.Cod_estatus}</td>
                  <td>${fila.Nombre_Estatus}</td>
                  <td>${fila.Nombre_Sede}</td>
                  <td>${fila.Fecha}</td>
                  <td>${fila.Bultos}</td>
                `;
                tabla.appendChild(tr);
              });

              const fechas = result.recordset.map(fila => {
                const [dia, mes, anio] = fila.Fecha.split('/');
                return new Date(anio, mes - 1, dia);
              });
              const fechaMasReciente = fechas.reduce((a, b) => (a > b) ? a : b);
              
              // Formatear la fecha como una cadena en el formato 'dd/MM/yyyy'
              const dia = fechaMasReciente.getDate().toString().padStart(2, '0');
              const mes = (fechaMasReciente.getMonth() + 1).toString().padStart(2, '0');
              const anio = fechaMasReciente.getFullYear();
              const fechaFormateada = `${dia}/${mes}/${anio}`;
              
              document.querySelector('h4').textContent = fechaFormateada;
              
            }).catch((error) => {
              console.error('Error al obtener datos desde la base de datos:', error);
            })
          }).catch((error) => {
            console.error('Error al conectar a la base de datos:', error);
          });

        }

const tablasComprobante = require('./TablaComprobantes.js');


const contenedor2 = document.getElementById('ventana-modificarComprobante');
let numeroComprobante;

llenarTablaEstados(idViaje);   


    tablasComprobante(contenedor2, numeroComprobante, idViaje)






const emergenteComprobanteayudante = require('./EmergenteComprobanteayudante.js');

const comprobanteAyudante = document.getElementById("comprobanteAyudante")
const comprobanteAyudanteDiv = document.getElementById("generar-comprobanteAyudante")

    emergenteComprobanteayudante(comprobanteAyudante, comprobanteAyudanteDiv, id_viaje, origen)




    const botonComprobantes = document.querySelector('#imprimirComprobantes');

              // Añade un escuchador de eventos para el evento de clic.
              botonComprobantes.addEventListener('click', async () => {
                // Usa la función consultar para obtener el listado de viajes.
                // Cuando el botón sea clickeado, genera el PDF.
                const generarListadoComprobantes = require ('./ImprimirComprobantes')
              
                await generarListadoComprobantes()
              
                // Aquí puedes guardar el PDF en un archivo, enviarlo a través de una respuesta HTTP, etc.
              });

  });

 }
 )}
module.exports = agregarEventosFilas;

