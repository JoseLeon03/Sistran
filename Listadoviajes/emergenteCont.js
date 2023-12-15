
function modificarContfunc(modificarCont, id_viaje,contenidoVentana,Contenedor2, precinto,precinto2){
    const contenedor = document.getElementById('modificarContenedor');
    modificarCont.addEventListener('click', () => {
    const contenidoCONT = `
    <div id="ventana-actualizarcont">
    <div class ="Menu">
   
        <button type="button" class="menubar-btn2" id="botonCerrar6"><i class="fas fa-times"></i></button>
     
        </div>
    <h2 class="Titulo">Modificar Contenedor y precintos</h2>
    

     <fieldset>  
       <label for="">Contenedor: </label>
       <input type="text" id="contenedor"  style="margin-left: 8px;"> 
     </fieldset>


    <fieldset>  
        <label for="">Precinto: </label>
        <input type="text" id="precinto" style="margin-left: 32px;"> 
    </fieldset>

    <fieldset>  
        <label for="">Precinto 2:</label>
        <input type="text" id="precinto2" style="margin-left: 20px;"> 
    </fieldset>


    
    <div class="emergente_btn"> 
        <button type="button" class="normalButton" id="guardarCont" style="float: right; margin-top: 10px;">Guardar</button>
    </div>`;
  
    // Agrega el contenido HTML al elemento
    contenedor.innerHTML = contenidoCONT;
    // Muestra el elemento con display: block
    contenedor.style.display = 'block';

    const contInp = document.getElementById('contenedor')
    const precInp = document.getElementById('precinto')
    const pre2Inp = document.getElementById('precinto2')

      
    contInp.value = Contenedor2;
    precInp.value = precinto;
    pre2Inp.value = precinto2;
  
  
    document.getElementById('botonCerrar6').addEventListener('click', function() {
      document.getElementById('modificarContenedor').style.display = 'none';
    });
    
    const guardarCont = document.getElementById('guardarCont')
     
    guardarCont.addEventListener('click', async () => {
    // Obtener los valores de los elementos del formulario
  
        guardarCont.disabled = true

        if(navigator.onLine){}
        else{guardarCont.disabled = false
            guardarCont.disabled = true}
  
        const contenedor = document.getElementById('contenedor').value;
        const precinto   = document.getElementById('precinto').value;
        const precinto2  = document.getElementById('precinto2').value;

  

        ipcRenderer.send('modification-confirm-dialog')
        const index = await new Promise((resolve) => {
          ipcRenderer.once('modification-dialog-result', (event, index) => {
            resolve(index)
          })
        })
  
        if (index === 1) {
          // El usuario hizo clic en "no"
          guardarCont.disabled = false
        }
        else {
  
      // Generar el nuevo comprobante utilizando los valores obtenidos
      guardarCont.disabled = false
          try {
          
            const pool = await consultar.connect();
            const sqlQuery = `
            update viajes set Contenedor = '${contenedor}', precinto = '${precinto}', 
            precinto2 = '${precinto2}'  where id_viaje = ${id_viaje}
            `;
            await pool.request().query(sqlQuery);
            ipcRenderer.send('registroExitoso');

            document.querySelector('span[id="cont"]').innerHTML = `${contenedor}`;
            document.querySelector('span[id="preci"]').innerHTML = `${precinto}`;
            document.querySelector('span[id="preci2"]').innerHTML = `${precinto2}`;

  
          } catch (err) {
            console.error(err);
          }  
  
        }
    });
  });
}
module.exports = modificarContfunc