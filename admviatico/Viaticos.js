const track = require('../Utility/Track')

function Viaticos(){

    const Guardar_viatico = document.getElementById("Guardar_Viatico");
    const formulario = document.querySelector('#formulario');

    
    Guardar_viatico.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

    Guardar_viatico.disabled = true

    // Solo envía el formulario si el nombre de marca es válido
        const Viatico = document.querySelector('input[name="Viatico"]').value;
        const Sede = document.querySelector('#Sedes').value;
        const Origen = document.querySelector('#Origen').value;
        const Fecha = document.querySelector('input[name="Fecha_req"]').value;
        const Dias = document.querySelector('input[name="Dias"]').value;

        console.log(Viatico, Sede, Origen, Fecha, Dias)

        const Consultaviatico = `SELECT count(*) as count FROM tabladeviaticos where Destino= '${Sede}'`;
        const pool = await consultar;
        const result = await pool.request().query(Consultaviatico);
        const count = result.recordset[0].count;


        let nombresMostrados = {
        'viatico': 'Por favor, ingrese un monto de viático ',
        'Fecha_req': 'Por favor, ingrese la fecha de hoy',
        'Origen': 'Por favor, seleccione la  distribuidora',
        'Sedes': 'Por favor, seleccione la sede',
        'Dias': 'Por favor, Ingrese los dias de viaje desde el origen al destino',

    
    
        // Agrega más mapeos según sea necesario
    };


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
             Guardar_viatico.disabled = false
            }, 1000)
            
        }
        else if(count >0){

            ipcRenderer.send('viaticoExistente')
            setTimeout(() =>{
            Guardar_viatico.disabled = false
            }, 1000)
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
            Guardar_viatico.disabled = false
            }



             else{
            Guardar_viatico.disabled = false
            const viaticoReal = Viatico / 2
            const Tasa =   await obtenerTasa({});  
            const Viatico_Bs = viaticoReal  * Tasa;
            
            ipcRenderer.send('dato')
            // console.log('golita') 
            const arg = await new Promise((resolve) => {
            ipcRenderer.on('user-data', (event, arg) => {               
                resolve(arg)
            });
            })
            
            const usuario = arg.usuario
            const descripcion =` Se ha creado un viatico de ${viaticoReal}$ y ${Dias} dias para la sede con el ID ${Sede}`       

            track(descripcion , usuario)
            // Utiliza los valores en tus consultas SQL await
            await agregarViatico({Viatico_Bs, Sede, Origen, Fecha, viaticoReal, Dias});
            
            // Limpia los campos del formulario
            setTimeout(() =>{
            location.reload();
            }, 1000)

        }}
    });

 
  
  async function agregarViatico(datos) {
    try {
        const pool = await consultar.connect();
        const sqlQuery = `Insert INTO Tabladeviaticos (Origen, Destino, Viatico_Bs, Fecha, Viatico_Usd, Dias) VALUES (${datos.Origen}, ${datos.Sede}, ${datos.Viatico_Bs}, '${datos.Fecha}', ${datos.viaticoReal}, ${datos.Dias})`;
        const result = await pool.request().query(sqlQuery);

        ipcRenderer.send('registroExitoso')  
        console.log('Registro agregado a la base de datos:', result);
        return Tasa;
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }
  
  }


/*Fin guardar viaticos */

const modificar_viatico = document.getElementById("modificar");



    modificar_viatico.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        // Solo envía el formulario si el nombre de marca es válido
        const Viatico = document.querySelector('input[name="Viatico"]').value;
        const Sede    = document.querySelector('#Sedes').value;
        const Origen  = document.querySelector('#Origen').value;
        const Fecha   = document.querySelector('input[name="Fecha_req"]').value;
        const Dias    = document.querySelector('input[name="Dias"]').value;

        console.log(Viatico, Sede, Origen, Fecha, Dias)

 

         let nombresMostrados = {
          'viatico': 'Por favor, ingrese un monto de viático ',
          'Fecha_req': 'Por favor, ingrese la fecha de hoy',
          'Origen': 'Por favor, seleccione la  distribuidora',
          'Sedes': 'Por favor, seleccione la sede',
          'Dias': 'Por favor, Ingrese los dias de viaje desde el origen al destino',

     
     
          // Agrega más mapeos según sea necesario
        };
    
    
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
            const viaticoReal = Viatico / 2
            const Tasa =   await obtenerTasa({});  
            const Viatico_Bs =  viaticoReal * Tasa;


            ipcRenderer.send('dato')
            // console.log('golita') 
            const arg = await new Promise((resolve) => {
                ipcRenderer.on('user-data', (event, arg) => {               
                resolve(arg)
                });
            })
            
            const usuario = arg.usuario
            const descripcion =` Se ha modificado un viatico de ${viaticoReal}$ y ${Dias} dias para la sede con el ID ${Sede}`       
    
            track(descripcion , usuario)
        
            // Utiliza los valores en tus consultas SQL await
            await modificarViatico({Viatico_Bs, Sede, Fecha, viaticoReal, Dias});
            // Limpia los campos del formulario
            location.reload();
        }}
    });

    async function modificarViatico(datos) {
        try {
            const pool = await consultar.connect();
            const sqlQuery = `Update Tabladeviaticos set Viatico_usd = ${datos.viaticoReal} , Viatico_Bs = ${datos.Viatico_Bs} , Fecha = '${datos.Fecha}' , Dias = ${datos.Dias} where Destino = ${datos.Sede} `;
            const result = await pool.request().query(sqlQuery);
            
            console.log('Registro agregado a la base de datos:', result);
            ipcRenderer.send('datosModificados')
        } catch (error) {
            console.log('Error al agregar el registro:', error);
        }
    
    }

}
module.exports = Viaticos