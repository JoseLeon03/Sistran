
function Emergentes (filasTabla,ventanaEmergente){
  filasTabla.forEach(fila => {
    fila.addEventListener('dblclick', () => {
    
    const id = fila.querySelector('td:nth-child(1)').textContent;
    const contenedorViejo = fila.querySelector('td:nth-child(3)').textContent;
    
    
    const Estado = fila.querySelector('td:nth-child(11)').textContent;
    const Fecha_req = fila.querySelector('td:nth-child(7)').textContent;
    const Fecha_reC = fila.querySelector('td:nth-child(8)').textContent;
    const Fecha_lleno = fila.querySelector('td:nth-child(9)').textContent;
    const Fecha_vacio = fila.querySelector('td:nth-child(10)').textContent;


    
    // var fecha_iso = Fecha_req.toString(); // Devuelve "2023-08-30T00:00:00.000Z"
    // document.getElementById("input-fecha").value = fecha_iso; // Asigna el valor al input
    
    var fecha_array = Fecha_req.split("/"); // Devuelve ["30", "08", "2023"]
    var fecha_iso = fecha_array.reverse().join("-"); 
    
    var fecha_array2 = Fecha_reC.split("/"); // Devuelve ["30", "08", "2023"]
    var fecha_iso2 = fecha_array2.reverse().join("-");// Devuelve "2023-08-30"

    var fecha_array3 = Fecha_lleno.split("/"); // Devuelve ["30", "08", "2023"]
    var fecha_iso3 = fecha_array3.reverse().join("-");
    
    var fecha_array4 = Fecha_vacio.split("/"); // Devuelve ["30", "08", "2023"]
    var fecha_iso4 = fecha_array4.reverse().join("-");// Devuelve "2023-08-30"
    // document.getElementById("input-fecha").value = fecha_iso; // Asigna el valor al input
    // var output = Fecha_req.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
    // console.log(fecha_iso)
    
    
    
    const contenidoVentana = `
    
    
    <div class ="Menu">
    
        <button  class="menubar-btn2" id="botonCerrar"><i class="fas fa-times"></i></button>
    
        </div>
    <h2 class="Titulo">Datos contenedor</h2>
    <fieldset>
    <div class="Tablas-emergente">
    
        <Div class="Izquierda">
            <table>
                <tr>
                <td><label >Fecha de requerimiento:</label></td>
                <td><input type="date" id="fecha" value="${fecha_iso}" name="fechaEditar" class="requerido2"></td>
                </tr>
      <tr>
    <td><label >Expediente:</label></td>
    <td><input type="text" name="expedienteEditar" id="expedienteInput" class="requerido2" ></td>
    </tr>
    
    <tr>
    <td><label >Mercancia:</label></td>
    <td><input type="text" name="mercanciaEditar" id="mercanciaInput" class="requerido2"></td>
    </tr>
    
    <tr>
    <td><label >Puerto:</label></td>
    <td><select name="puertoEditar" id="puerto" class="requerido2"></Select></select></td>
    </tr>
    
    <tr>
    <td><label >Fecha Recepción:</label></td>
    <td><input type="date" id="fechaInput" name="recepcionEditar" value="${fecha_iso2}" class="requerido2"></td>
    </tr>
    
    
    
    </table>
    </Div>
    
    <div class="Derecha">
        <table>
            <tr>
            <td><label >Contenedor:</label></td>
            <td><input type="text" id="contenedorInput" name="contenedorEditar" class="requerido2"></td>
            </tr>
    
            <tr>
            <td><label >Capacidad:</label></td>
            <td><input type="number" id="capacidadInput" name="capacidadEditar" class="requerido2"></td>
            </tr>
    
            <tr>
                <td><label >Bultos:</label></td>
                <td><input type="number" id="bultosInput" name="bultosEditar" class="requerido2"></td>
            </tr>
    
            <tr>
            <td><label >Estado:</label></td>
          <td> <span>${Estado}</span></td>
            </tr>
    
            <tr>
            <td><label >Chofer:</label></td>
            <td><input type="text"  id="choferInput" name="choferEditar" ></td>
            </tr>
    
            <tr>
            <td><label >Fecha entrega lleno:</label></td>
            <td><input type="date" id="fechaLLeno" name="llenoEditar" value="${fecha_iso3}"></td>
            </tr>    
            <tr>
            <td><label >Fecha entrega Vacio:</label></td>
            <td><input type="date" id="fechaVacio" name="vacioEditar" value="${fecha_iso4}"></td>
            </tr>     
    </table>
    
    </div>
    
    </div>
    </fieldset>
    
    
    
    
    <div class="emergente_btn">
    <button type="button"   id="modificarContenedor" class="" >Modificar</button>
    </div>
    
    `;


    // <div class="radio">
    // <input type="radio" name="Estatus" id="radio1"  ><label for="">Establecer contenedor en patio</label>
    // <input type="radio" name="Estatus" id="radio2" ><label for="">Establecer contenedor como entregado</label>
    // </div>
    
    // <fieldset id="fieldRadio" style="display: none;" >
    // <!-- <div class="radio">
    //     <input type="radio" name="Estatus" id="radio1" checked ><label for="">Establecer contenedor en patio</label>
    //     <input type="radio" name="Estatus" id="radio2" ><label for="">Establecer contenedor como entregado</label>
    // </div> -->
    
    // <div id="contenedorPatio" style="display: none;">
    //     <label for="">ID del viaje</label>
    //     <input type="number" name="viajeReceptor" id="">
    //     <button type="button" id="modificarPatio">Modificar datos</button>
    //     <p>Nota: Esta acción cambiará el estado del contenedor a "En patio" debe especificar el Id del viaje que lo trajo. Revise el listado de viajes</p>
    // </div>
    
    
    // <div id="contenedorEntregado" style="display: none;">
    //     <label for="">ID del viaje</label>
    //     <input type="number" name="viajeEntregar" id="">
    //     <button type="button" id="modificarEntregado">Modificar datos</button>
    //     <p>Nota: Esta acción cambiará el estado del contenedor a "Entregado" debe especificar el Id del viaje que lo envió Revise el listado de viajes</p>
    // </div>
    // </fieldset>
      ventanaEmergente.innerHTML = contenidoVentana;
          ventanaEmergente.style.display = 'block';

          const botonCerrar = document.getElementById('botonCerrar');
      botonCerrar.addEventListener('click', () => {
        ventanaEmergente.style.display = 'none';


      });

      let contenedorPatio = document.getElementById("contenedorPatio");
      let contenedorEntregado = document.getElementById("contenedorEntregado");
      let fieldRadio = document.getElementById("fieldRadio");


      //     document.getElementById("radio1").addEventListener("click", function() {
      //     contenedorPatio.style.display = "block";
      //     fieldRadio.style.display = "block";
      //     contenedorEntregado.style.display = "none";
      // });

      //     document.getElementById("radio2").addEventListener("click", function() {
      //     contenedorPatio.style.display = "none";
      //     fieldRadio.style.display = "block";
      //     contenedorEntregado.style.display = "block";
      // });

      async function obtenerTiposede() {
        try {

          await sql.connect(config);

          const result = await sql.query('SELECT Codigo, Sede from Sedes where Tiposede = 2 ');


          return result.recordset;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          throw error;
        }
      }


      async function GenerarTiposede() {
        try {

          const destino = await obtenerTiposede();

          let selectOptions = '<option value="" disabled selected>Seleccione</option>';

          destino.forEach((row) => {
            selectOptions += `<option value="${row.Codigo}">${row.Sede}</option>`;
          });


          const selectHtml = `<select>${selectOptions}</select>`;
          document.getElementById('puerto').innerHTML = selectHtml ;
          return selectHtml;
        } catch (error) {
          console.error('Error al generar el select:', error);
          throw error;
        }
      }

      GenerarTiposede()
      .then((selectHtml) => {
        console.log('Select HTML generado:', selectHtml);

      })
      .catch((error) => {
        console.error('Error en la generación del select:', error);

      });


      const tabla = document.getElementById("tabla-contenedores");
      const expedienteInput = document.getElementById("expedienteInput");
      const mercanciaInput = document.getElementById("mercanciaInput");
      const bultosInput = document.getElementById("bultosInput");
      const capacidadInput = document.getElementById("capacidadInput");
      const choferInput = document.getElementById("choferInput");
      const contenedorInput = document.getElementById("contenedorInput");
      const puertoSelect = document.getElementById("puerto");


        tabla.addEventListener("dblclick", function(event) {

        if (event.target.tagName === "TD"){

          event.preventDefault();

          const filaSeleccionada = event.target.parentElement;
          const expediente = filaSeleccionada.children[1].textContent;
          const contenedor = filaSeleccionada.children[2].textContent;
          const mercancia = filaSeleccionada.children[3].textContent;
          const chofer = filaSeleccionada.children[4].textContent;
          const puerto  = filaSeleccionada.children[5].textContent
        const bultos = filaSeleccionada.children[12].textContent;
          const capacidad = filaSeleccionada.children[11].textContent

          for (var i = 0; i < puertoSelect.options.length; i++) {
            // Si el texto de la celda coincide con el texto de una opción
            if (puerto == puertoSelect.options[i].text) {
              // Seleccionar esa opción
            puertoSelect.options[i].selected = true;

              break;
            }
          }
          
          expedienteInput.value = expediente;
          contenedorInput.value = contenedor;
          mercanciaInput.value = mercancia;
          choferInput.value = chofer;
          capacidadInput.value = capacidad;
          bultosInput.value = bultos;

        }
      });

      const modificarContenedor = document.getElementById("modificarContenedor")

      modificarContenedor.addEventListener('click', async (evento) => {
      evento.preventDefault();

      const Fecha = document.querySelector('input[name="fechaEditar"]').value;
      const Expediente = document.querySelector('input[name="expedienteEditar"]').value;
      const Mercancia = document.querySelector('input[name="mercanciaEditar"]').value;
      const Puerto = document.querySelector('#puerto').value;
      const Chofer = document.querySelector('input[name="choferEditar"]').value;
      const Recepcion = document.querySelector('input[name="recepcionEditar"]').value;
      const Contenedor = document.querySelector('input[name="contenedorEditar"]').value;
      const Capacidad = document.querySelector('input[name="capacidadEditar"]').value;
      const Bultos = document.querySelector('input[name="bultosEditar"]').value;
      const Lleno = document.querySelector('input[name="llenoEditar"]').value
      const Vacio = document.querySelector('input[name="vacioEditar"]').value

        const ConsultaContenedor= `SELECT count(*) as count FROM Contenedores where Contenedor = '${Contenedor}' and Contenedor != '${contenedorViejo}' `;

      const pool = await consultar;
      const result = await pool.request().query(ConsultaContenedor);

      const count = result.recordset[0].count;

      let nombresMostrados = {
        'expedienteEditar': 'Por favor, ingrese el número de expediente ',
        'contenedorEditar': 'Por favor, ingrese el identificador del contenedor',
        'puertoEditar': 'Por favor, seleccione un puerto',
        'mercanciaEditar': 'Por favor, Ingrese la mercancia del contenedor',
        'recepcionEditar': 'Por favor, seleccione la fecha de recepción',
        'bultosEditar': 'Por favor, ingrese los bultos del contenedor ',
        'fechaEditar': 'Por favor, introduzca la fecha de registro del contenedor',
        'capacidadEditar': 'Por favor, introduzca la capacidad del contenedor',

        // Agrega más mapeos según sea necesario
      };

      let inputs = document.querySelectorAll('.requerido2');


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
      else if(count > 0){

          ipcRenderer.send('contenedorExistente', Contenedor)
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
                  
        else{
          // Utiliza los valores en tus consultas SQL
          await modificarContenedores({Expediente, Contenedor, Mercancia, Capacidad, Fecha, Recepcion, Puerto, Bultos, Chofer, id, Lleno,Vacio});
          ipcRenderer.send('dato')
          // console.log('golita') 
          const arg = await new Promise((resolve) => {
            ipcRenderer.on('user-data', (event, arg) => {               
              resolve(arg)
            });
          })
          
          const usuario = arg.usuario
          const descripcion =` Se ha modificado el contenedor ${Contenedor}`       

          track(descripcion , usuario)
          ipcRenderer.send('datosModificados')
          // Limpia los campos del formulario
          location.reload();

        }
      }
    })
    
    async function modificarContenedores(datos) {
      try {
        console.log(id)
    
          const pool = await consultar;
          const sqlQuery = `Update contenedores set Expediente ='${datos.Expediente}', Contenedor = '${datos.Contenedor}', Mercancia = '${datos.Mercancia}', Capacidad = ${datos.Capacidad}, Fecharequerimiento = '${datos.Fecha}', Fecharecepcion = '${datos.Recepcion}', Puertoorigen = ${datos.Puerto}, Bultos = ${datos.Bultos}, Chofer ='${datos.Chofer || ''}', Fechadesc= '${datos.Lleno}' , Fechafin = '${datos.Vacio}' where id = ${id} `;
          const result = await pool.request().query(sqlQuery);
    
          console.log('Registro agregado a la base de datos:', result);
      } catch (error) {
          ipcRenderer.send('error', error);
      }
    
    }

      const Recibir = document.getElementById('modificarPatio')
      Recibir.addEventListener('click', async (evento) => {

        const id_viaje = document.querySelector('input[name="viajeReceptor"]').value;
        const contenedor = document.querySelector('input[name="contenedorEditar"]').value;


        await recibirContenedor({id_viaje,contenedor});
        ipcRenderer.send('datosModificados')
        // location.reload();

      
      })

      async function recibirContenedor(datos) {
        try {
    
          const pool = await consultar;
          const result = await pool.request().query(`SELECT  Format (Fecha_llegada , 'yyyy-MM-dd') as Fecha_llegada from Viajes where id_viaje = ${datos.id_viaje}`);
          const viaje = result.recordset[0];

          const FechaLLegada = viaje.Fecha_llegada

          const sqlQuery = `Update contenedores set Fecharecepcion ='${FechaLLegada}', estatus = 1, cod_viaje1 = ${datos.id_viaje} where Contenedor = '${datos.contenedor}'  `;
          const result2 = await pool.request().query(sqlQuery);

          console.log(FechaLLegada)
          console.log('Registro agregado a la base de datos:', result);
          
        } catch (error) {
          ipcRenderer.send('error', error);
        }
      
      }





      const Entregar = document.getElementById('modificarEntregado')
      Entregar.addEventListener('click', async (evento) => {

        const id_viaje = document.querySelector('input[name="viajeEntregar"]').value;
        const contenedor = document.querySelector('input[name="contenedorEditar"]').value;


        await entregarContenedor({id_viaje,contenedor});
        ipcRenderer.send('datosModificados')
        // location.reload();

      
      })

    async function entregarContenedor(datos) {
        try {
      
          const pool = await consultar;
          const result = await pool.request().query(`SELECT  Format (Fecha , 'yyyy-MM-dd') as Fecha, Cedula_chofer from Viajes where id_viaje = ${datos.id_viaje}`);
          const viaje = result.recordset[0];

          const FechaEntrega = viaje.Fecha
          const cedulaEntrega= viaje.Cedula_chofer


          const result3 = await pool.request().query(`SELECT  Nombre + Apellido as nombre from empleados where cedula = ${cedulaEntrega}`);
          const empleado = result3.recordset[0];

          const chofer = empleado.nombre


          const sqlQuery = `Update contenedores set Fechafin ='${FechaEntrega}', estatus = 5, cod_viaje2 = ${datos.id_viaje}, Chofer = '${chofer}' where Contenedor = '${datos.contenedor}'  `;
          const result2 = await pool.request().query(sqlQuery);

          console.log(FechaEntrega)
          console.log('Registro agregado a la base de datos:', result);
        } catch (error) {
          ipcRenderer.send('error', error);
        }
      
      }


    })
  });
}

  module.exports = Emergentes