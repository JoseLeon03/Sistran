 const track = require ('../Utility/Track')

 function Tipos(){

/*Crear Tipos de vehiculos */
    const Guardar_tipos = document.getElementById("Guardar_tipos");
    const formulario3 = document.querySelector('#formulario');

  Guardar_tipos.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    Guardar_marcas.disabled = true

    const tipo = document.querySelector('input[name="nombre-tipo"]').value;

    const ConsultaMarcas = `SELECT count(*) as count FROM tipovehiculo where tipo = '${tipo}'`;
    const pool = await consultar;
    const result = await pool.request().query(ConsultaMarcas);
    const count = result.recordset[0].count;

    if( tipo ==""){
        await
        ipcRenderer.send('Dialogotipo')
        setTimeout(() =>{
        Guardar_marcas.disabled = false
            }, 1000)
    }
    else if( count >0){

        ipcRenderer.send('tipovehiculoExistente', tipo)
        setTimeout(() =>{
        Guardar_marcas.disabled = false
            }, 1000)
    }

    else{

        ipcRenderer.send('modification-confirm-dialog')
        const index = await new Promise((resolve) => {
        ipcRenderer.once('modification-dialog-result', (event, index) => {
            resolve(index)
           })
        })
    
        if (index === 1) {
          Guardar_marcas.disabled = false  // El usuario hizo clic en "no"
        }
        else{

            Guardar_marcas.disabled = false
            // Utiliza los valores en tus consultas SQL
            ipcRenderer.send('dato')
            // console.log('golita') 
            const arg = await new Promise((resolve) => {
              ipcRenderer.on('user-data', (event, arg) => {               
                resolve(arg)
              });
            })
            
            const usuario = arg.usuario
            const descripcion =` Se ha creado el Tipo de vehiculo ${tipo}`       

            track(descripcion , usuario)
            await agregarTipos({tipo});
            // Limpia los campos del formulario
            setTimeout(() =>{
            location.reload();
            }, 1000)
        }}
  });
  
  async function agregarTipos(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `INSERT INTO Tipovehiculo (Tipo) VALUES ('${datos.tipo}')`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
          ipcRenderer.send('registroExitoso')
      } catch (error) {
        ipcRenderer.send('error', error);
      }
  
  }


/*Fin Crear Tipos de vehiculos */


//? Codigo para traer y modificar tipos de vehiculos

async function obtenerNombresTipo(codigo) {
  try {
    await sql.connect(config);
    const query = `SELECT  Tipo FROM Tipovehiculo WHERE Id= '${codigo}'`;
    const result = await sql.query(query);
    return result.recordset[0] || {Tipo: 'Codigo no existente'};
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    throw error;
  }
}

document.getElementById('tipo').addEventListener('input', async function() {
  const codigo = this.value;
  try {
    const {Tipo} = await obtenerNombresTipo(codigo);
    document.getElementById('nombre_tipo').value = Tipo;
   
  } catch (error) {
    document.getElementById('nombre_tipo').value = 'Error al obtener el tipo de vehículo';
   
  }
});

async function actualizarTipo(codigo, nuevoTipo) {
  try {
    await sql.connect(config);
    const query = `UPDATE Tipovehiculo SET Tipo = '${nuevoTipo}' WHERE Id = '${codigo}'`;
    await sql.query(query);
  } catch (error) {
    console.error('Error al actualizar la base de datos:', error);
    throw error;
  }
}

document.getElementById('modificar3').addEventListener('click', async function() {
  const codigo = document.getElementById('tipo').value;
  const nuevoTipo = document.getElementById('nombre_tipo').value;


  const ConsultaMarcas = `SELECT count(*) as count FROM tipovehiculo where tipo = '${nuevoTipo}'`;
  const pool = await consultar;
  const result = await pool.request().query(ConsultaMarcas);
  const count = result.recordset[0].count;

  if( nuevoTipo ==""){
    await
    ipcRenderer.send('Dialogotipo')
  }
  else if( count >0){

    ipcRenderer.send('tipovehiculoExistente', nuevoTipo)
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
    }
    else{

    
    try {
        await actualizarTipo(codigo, nuevoTipo);

        console.log('Tipo de vehículo actualizado con éxito');
    } catch (error) {
        console.log('Error al actualizar el tipo de vehículo');
    } 
        ipcRenderer.send('dato')
        // console.log('golita') 
        const arg = await new Promise((resolve) => {
            ipcRenderer.on('user-data', (event, arg) => {               
            resolve(arg)
            });
    })
    
    const usuario = arg.usuario
    const descripcion =` Se ha modificado el Tipo de vehiculo con el ID ${codigo}`       

    track(descripcion , usuario)
    
    ipcRenderer.send('datosModificados')
    location.reload();
    } 
 }
});

/******************************************************************************************* */

/******************************************************************************************* */

const Eliminar_tipo = document.getElementById("eliminarTipo");

  Eliminar_tipo.addEventListener('click', async (evento) => {
    evento.preventDefault()

    const tipo = document.querySelector('input[name="nombre-tipo"]').value;


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
        const descripcion =` Se ha eliminado el Tipo de vehiculo  ${tipo}`       

        track(descripcion , usuario)

        await eliminarTipo({tipo});
        ipcRenderer.send('datosEliminados')
        location.reload()

    }

  })


    async function eliminarTipo(datos) {
    try {
            const pool = await consultar;
            const sqlQuery = `Delete from Tipovehiculo where Tipo = '${datos.tipo}' `;
            const result = await pool.request().query(sqlQuery);
            console.log('Registro agregado a la base de datos:', result);
        } catch (error) {
            ipcRenderer.send('error', error);
        }

    }



 }
 module.exports = Tipos