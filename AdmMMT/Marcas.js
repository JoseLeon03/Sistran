const track = require('../Utility/Track');
const obtenerEmpleado = require('../Utility/obtenerEmpleado');
function Marcas(){


    const Guardar_marcas = document.getElementById("Guardar_marcas");
    const formulario = document.querySelector('#formulario');
    
    Guardar_marcas.addEventListener('click', async (evento) => {
          evento.preventDefault(); // Evita que el formulario se envíe automáticamente
    
          Guardar_marcas.disabled = true
    
          if(navigator.onLine){}
          else{Guardar_marcas.disabled = false}
            // Solo envía el formulario si el nombre de marca es válido
             const marca = document.querySelector('input[name="nombre_marca"]').value;
    
             const ConsultaMarcas = `SELECT count(*) as count FROM Marca where Marca = '${marca}'`;
             const pool = await consultar;
             const result = await pool.request().query(ConsultaMarcas);
             const count = result.recordset[0].count;
    
        
             if (marca == "")
           {   
            await
              ipcRenderer.send('Dialogo') 
              setTimeout(() =>{
                Guardar_marcas.disabled = false
                   }, 2500)
              } 
    
              else if( count >0){
    
                ipcRenderer.send('marcaExistente', marca)
    
                setTimeout(() =>{
                  Guardar_marcas.disabled = false
                     }, 2500)
              }
              else {
          
                ipcRenderer.send('show-confirm-dialog')
                const index = await new Promise((resolve) => {
                  ipcRenderer.once('confirm-dialog-result', (event, index) => {
                    resolve(index)
                  })
                })
            
                if (index === 1) {
                  Guardar_marcas.disabled = false
                  // El usuario hizo clic en "no"
                }
                
                else{
                  Guardar_marcas.disabled = false
                  ipcRenderer.send('dato')
                  // console.log('golita') 
                  const arg = await new Promise((resolve) => {
                    ipcRenderer.on('user-data', (event, arg) => {               
                      resolve(arg)
                    });
                  })
                  
                  const usuario = arg.usuario
                  const descripcion =` Se ha creado la marca de vehiculo ${marca}`       
  
                  track(descripcion , usuario)
              // Utiliza los valores en tus consultas SQL await
               agregarMarcas({marca});
         
                setTimeout(() =>{
                 location.reload();
                     }, 1000)
    
              }}
            });
      
      async function agregarMarcas(datos) {
          try {
              const pool = await consultar;
              const sqlQuery = `INSERT INTO Marca (Marca) VALUES ('${datos.marca}')`;
              const result = await pool.request().query(sqlQuery);
              ipcRenderer.send('registroExitoso')
    
              console.log('Registro agregado a la base de datos:', result);
          } catch (error) {
            ipcRenderer.send('error', error);
          }
      
      }
    
//Codigo para buscar y modificar las marcas


        async function obtenerNombresedeMarca(codigo) {
            try {
            await sql.connect(config);
            const query = `SELECT  Marca FROM Marca WHERE Id= '${codigo}' `;
            const result = await sql.query(query);
            return result.recordset[0] || {Marca: 'Codigo no existente',};
            } catch (error) {
            console.error('Error al consultar la base de datos:', error);
            throw error;
            }
        }
        
        document.getElementById('marca').addEventListener('input', async function() {
            const codigo = this.value;
            try {
            const {Marca} = await obtenerNombresedeMarca(codigo);
            document.getElementById('nombre_marca').value = Marca;
            
            } catch (error) {
            document.getElementById('nombre_marca').value = 'Error al obtener la marca';
            
            }
        });
        
        async function modificarMarca(codigo, nuevaMarca) {
            try {
            await sql.connect(config);
            const query = `UPDATE Marca SET Marca = '${nuevaMarca}' WHERE Id = '${codigo}'`;
            await sql.query(query);
            } catch (error) {
            console.error('Error al actualizar la base de datos:', error);
            throw error;
            }
        }
        
        
    
    document.getElementById('modificar').addEventListener('click', async function() {
    const codigo = document.getElementById('marca').value;
    const nuevaMarca = document.getElementById('nombre_marca').value;
  
    const ConsultaMarcas = `SELECT count(*) as count FROM Marca where Marca = '${nuevaMarca}'`;
    const pool = await consultar;
    const result = await pool.request().query(ConsultaMarcas);
    const count = result.recordset[0].count;
  
  
    if (marca == "")
  {   
   await
     ipcRenderer.send('Dialogo') 
     } 
  
     else if( count >0){
  
       ipcRenderer.send('marcaExistente', nuevaMarca)
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
  
   
        try {

            await modificarMarca(codigo, nuevaMarca);
        
        } catch (error) {
            console.log('Error al actualizar la sede y el tipo de sede');
        }
            ipcRenderer.send('datosModificados')
            ipcRenderer.send('dato')
            // console.log('golita') 
            const arg = await new Promise((resolve) => {
            ipcRenderer.on('user-data', (event, arg) => {               
                resolve(arg)
        });
        })
    
    const usuario = arg.usuario
    const descripcion =` Se ha modificado la marca ID ${codigo}`       

    track(descripcion , usuario)
    location.reload();
    }
  }
  });
  
  
  //!FiN de codigo para traer y modificar marcas


  //Eliminar Marcas
  
  const Eliminar_marcas = document.getElementById("eliminarMarcas");

    Eliminar_marcas.addEventListener('click', async (evento) => {
    evento.preventDefault()

    const marca = document.querySelector('input[name="nombre_marca"]').value;


    ipcRenderer.send('elimination-confirm-dialog')
    const index = await new Promise((resolve) => {
    ipcRenderer.once('elimination-dialog-result', (event, index) => {
        resolve(index)
    })
    })

    if (index === 1) {
    // El usuario hizo clic en "no"
    }
    else{
        ipcRenderer.send('dato')
        // console.log('golita') 
    const arg = await new Promise((resolve) => {
        ipcRenderer.on('user-data', (event, arg) => {               
            resolve(arg)
        });
    })
    
    const usuario = arg.usuario
    const descripcion =` Se ha eliminado la marca ${marca}`       

    track(descripcion , usuario)
        await eliminarMarcas({marca});
        ipcRenderer.send('datosEliminados')
        location.reload()

 }

})


    async function eliminarMarcas(datos) {
        try {
            const pool = await consultar;
            const sqlQuery = `Delete from Marca where Marca = '${datos.marca}' `;
            const result = await pool.request().query(sqlQuery);
            console.log('Registro agregado a la base de datos:', result);
        } catch (error) {
            ipcRenderer.send('error', error);
        }

    }

//Fin eliminar Marcas
}
module.exports = Marcas