const track = require('../Utility/Track')

function Tasa (){


    const Guardar_tasa = document.getElementById("Guardar_tasa");
const formulario2 = document.querySelector('#formulario');


  Guardar_tasa.addEventListener('click', async (evento) => {
      evento.preventDefault();
       // Evita que el formulario se envíe automáticamente
       Guardar_tasa.disabled = true
     
        // Solo envía el formulario si el nombre de marca es válido
         const Tasa = document.querySelector('input[name="Tasa"]').value;
         const Fecha_tasa = document.querySelector('input[name="Fecha_tasa"]').value;

         let nombresMostrados = {
          'Tasa': 'Por favor, ingrese un monto para la nueva tasa de cambio ',
          'Fecha_tasa': 'Por favor, ingrese la fecha de hoy',
     
     
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
                setTimeout(() =>{
                  Guardar_tasa.disabled = false
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
                Guardar_tasa.disabled = false
              }

              else{
                
                Guardar_tasa.disabled = false
          // Utiliza los valores en tus consultas SQL await
           agregarTasa({Tasa, Fecha_tasa});
            actualizarViaticosBolivar(Tasa);
           // Limpia los campos del formulario

           ipcRenderer.send('dato')
           // console.log('golita') 
           const arg = await new Promise((resolve) => {
             ipcRenderer.on('user-data', (event, arg) => {               
               resolve(arg)
             });
           })
           
           const usuario = arg.usuario
           const descripcion =` Se ha creado una tasa de cambio de ${Tasa} Bs`       
 
           track(descripcion , usuario)
         
        
          setTimeout(() =>{
             location.reload()
                }, 1000)
        }}
      });
  
  async function agregarTasa(datos) {
      try {
          const pool = await consultar.connect();
          const sqlQuery = `INSERT INTO Historial_tasa (Fecha, Tasa) VALUES ('${datos.Fecha_tasa}', '${datos.Tasa}')`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
          ipcRenderer.send('registroExitoso') 
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  }


    async function actualizarViaticosBolivar(Tasa) {
        try {
            const pool = await consultar.connect();
            const sqlQuery = `UPDATE Tabladeviaticos SET Viatico_Bs = viatico_usd * ${Tasa}`;
            const result = await pool.request().query(sqlQuery);
            console.log('Viáticos en bolívares actualizados:', result);
        } catch (error) {
            console.log('Error al actualizar los viáticos:', error);
        }
    }   
}

module.exports = Tasa