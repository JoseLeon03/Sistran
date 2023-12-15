const track = require('../Utility/Track');


function Modelos(){

    const Guardar_modelos = document.getElementById("Guardar_modelos");
    const formulario2 = document.querySelector('#formulario');

    Guardar_modelos.addEventListener('click', async (evento) => {
      evento.preventDefault(); // Evita que el formulario se envíe automáticamente
  
        Guardar_modelos.disabled = true

        const modelo = document.querySelector('input[name="nombre-modelo"]').value;
        const marca = document.querySelector('#selectMarca').value;
   
        const ConsultaModelo = `SELECT count(*) as count FROM Modelo where Modelo = '${modelo}'`;
        const pool = await consultar;
        const result = await pool.request().query(ConsultaModelo);
        const count = result.recordset[0].count;


      if( modelo == ""){
      
          ipcRenderer.send('Dialogomodelo')
          setTimeout(() =>{
            Guardar_modelos.disabled = false
               }, 2500)
       
        }  

       else if (marca == "")
       {  
        await
          ipcRenderer.send('Dialogo') 
          setTimeout(() =>{
            Guardar_modelos.disabled = false
               }, 2500)
        
          }

          else if( count >0){

            ipcRenderer.send('modeloExistente', modelo)
            setTimeout(() =>{
              Guardar_modelos.disabled = false
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
              Guardar_modelos.disabled = false
              // El usuario hizo clic en "no"
            }
            else{
              Guardar_modelos.disabled = false
        // Utiliza los valores en tus consultas SQL
        await agregarModelos({ modelo, marca});

        ipcRenderer.send('dato')
        // console.log('golita') 
        const arg = await new Promise((resolve) => {
          ipcRenderer.on('user-data', (event, arg) => {               
            resolve(arg)
          });
        })
        
        const usuario = arg.usuario
        const descripcion =` Se ha creado el Modelo ${modelo}`       

        track(descripcion , usuario)

        // Limpia los campos del formulario
     

        setTimeout(() =>{
          location.reload();
             }, 1000)
    }}
  });

  
  async function agregarModelos(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `INSERT INTO Modelo (Modelo, Marca) VALUES ('${datos.modelo}', ${datos.marca})`;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
          ipcRenderer.send('registroExitoso')
      } catch (error) {
        ipcRenderer.send('error', error);
      }
  
  }


  /**************************************************************************************** */

  //!Inicio de codigo para traer y modificar modelos
 async function obtenerNombremodelo(codigo) {
    try {
      await sql.connect(config);
      const query = `SELECT Marca, Modelo FROM Modelo WHERE Id= '${codigo}'`;
      const result = await sql.query(query);
      return result.recordset[0] || {Marca: 'Codigo no existente', Modelo: 'Codigo no existente'};
    } catch (error) {
      console.error('Error al consultar la base de datos:', error);
      throw error;
    }
  }
  
  document.getElementById('modelo').addEventListener('input', async function() {
    const codigo = this.value;
    try {
      const {Marca, Modelo} = await obtenerNombremodelo(codigo);
      document.getElementById('nombre-modelo').value = Modelo;
      document.getElementById('selectMarca').value = Marca;
    } catch (error) {
      document.getElementById('nombre-modelo').value = 'Error al obtener el modelo';
      document.getElementById('selectMarca').value = ':(';
    }
  });
  
  
  async function actualizarmodelo(codigo, nuevoModelo) {
    try {
      await sql.connect(config);
      const query = `UPDATE Modelo SET Modelo = '${nuevoModelo}' WHERE Id = '${codigo}'`;
      await sql.query(query);
    } catch (error) {
      console.error('Error al actualizar la base de datos:', error);
      throw error;
    }
  }
  
  async function actualizarmarcamodelo(codigo, nuevaMarca) {
    try {
      await sql.connect(config);
      const query = `UPDATE Modelo SET Marca = '${nuevaMarca}' WHERE Id = '${codigo}'`;
      await sql.query(query);
    } catch (error) {
      console.error('Error al actualizar la base de datos:', error);
      throw error;
    }
  }
  
  document.getElementById('modificar2').addEventListener('click', async function() {
    const codigo = document.getElementById('modelo').value;
    const nuevoModelo = document.getElementById('nombre-modelo').value;
    const nuevaMarca = document.getElementById('selectMarca').value;
  
  
    const ConsultaMarcas = `SELECT count(*) as count FROM Modelo where modelo = '${nuevoModelo}'`;
    const pool = await consultar;
    const result = await pool.request().query(ConsultaMarcas);
    const count = result.recordset[0].count;
  
    if( tipo ==""){
      await
      ipcRenderer.send('Dialogomodelo')
    }
    else if (marca == "")
    {  
     await
       ipcRenderer.send('Dialogo') 
       }
    else if( count >0){
  
      ipcRenderer.send('modeloExistente', nuevoModelo)
    }
  
    else{
  
      ipcRenderer.send('modification-confirm-dialog')
      const index = await new Promise((resolve) => {
        ipcRenderer.once('modification-dialog-result', (event, index) => {
          resolve(index)
        })
      })
      console.log(index)
      if (index === 1) {
        // El usuario hizo clic en "no"
      }
  
      else {
  
   
  
      try {


        await actualizarmodelo(codigo, nuevoModelo);
        await actualizarmarcamodelo(codigo, nuevaMarca);
        console.log('Modelo y marca actualizados con éxito');
      } catch (error) {
        console.log('Error al actualizar el modelo y la marca');
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
      const descripcion =` Se ha modificado el modelo con el ID ${codigo}`       

      track(descripcion , usuario)
      location.reload();
    }
  }
      
  });

  /************************************************************************************** */

  //!fin de codigo para traer modelos y modificarlos

  const Eliminar_modelo = document.getElementById("eliminarModelo");

  Eliminar_modelo.addEventListener('click', async (evento) => {
    evento.preventDefault()


    const modelo = document.querySelector('input[name="nombre-modelo"]').value;


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
    const descripcion =` Se ha eliminado el modelo  ${modelo}`       

    track(descripcion , usuario)
        
    await eliminarModelo({modelo});

    location.reload()

    }

  })


    async function eliminarModelo(datos) {
        try {
            const pool = await consultar;
            const sqlQuery = `Delete from Modelo where Modelo = '${datos.modelo}' `;
            const result = await pool.request().query(sqlQuery);
            console.log('Registro agregado a la base de datos:', result);
            ipcRenderer.send('datosEliminados')
        } catch (error) {
            ipcRenderer.send('error', error);
        }

    }

    async function obtenerMarcass() {
        try {
    
        await sql.connect(config);
    
    
        const result = await sql.query('SELECT Id,Marca FROM Marca order by Marca')
    
        return result.recordset;
        } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
        }
    }
  
  
  async function generarSelectMarcass() {
    try {
  
      const marcas = await obtenerMarcass();
  
      let selectOptions = '<option value="" disabled selected>Seleccione</option>';
  
      marcas.forEach((row) => {
        selectOptions += `<option value="${row.Id}">${row.Marca}</option>`;
      });
  
      const selectHtml = `<select>${selectOptions}</select>`;
      document.getElementById('selectMarca').innerHTML = selectHtml;
      return selectHtml;
    } catch (error) {
      console.error('Error al generar el select:', error);
      throw error;
    }
  }
  generarSelectMarcass()


}
module.exports = Modelos