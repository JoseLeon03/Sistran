const track = require('../Utility/Track')

function modificarViaje(id_viaje, placa, Cedula_chofer, placaremolque , placacava){

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
      ipcRenderer.send('dato')
    // console.log('golita') 
    const arg = await new Promise((resolve) => {
      ipcRenderer.on('user-data', (event, arg) => {               
        resolve(arg)
      });
    })
    
    const usuario = arg.usuario
    const descripcion =` Se ha modificado el chofer del viaje con el id ${id_viaje}`       

    track(descripcion , usuario)
      location.reload();
      await modificarCedulafunction({ nuevaCedula});

      
     
          
    // Limpia los campos del formulario
}});


async function modificarCedulafunction(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `Update  Viajes  set Cedula_chofer = ${datos.nuevaCedula} where Id_viaje = ${id_viaje};
        Update empleados set Estatus = 1 where Cedula =${Cedula_chofer};
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
 
      const ConsultaPlaca = `SELECT count(*) as count FROM Vehiculos where Placa = '${nuevaPlaca}' 
      and tipovehiculo not in (2,5,6)`

      const consultaPlacadisp =`SELECT count(*) as count FROM Vehiculos where Placa = '${nuevaPlaca}' 
      and Ubicacion =1`;

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
    ipcRenderer.send('dato')
    // console.log('golita') 
    const arg = await new Promise((resolve) => {
      ipcRenderer.on('user-data', (event, arg) => {               
        resolve(arg)
      });
    })
    
    const usuario = arg.usuario
    const descripcion =` Se ha modificado el vehiculo del viaje con el id ${id_viaje}`       

    track(descripcion , usuario)
      await modificarPlacafunction({nuevaPlaca});
      document.getElementById('vehiculoSpan').innerHTML = `${nuevaPlaca}` ;
  

}});


async function modificarPlacafunction(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `Update  Viajes  set Placa_veh = '${datos.nuevaPlaca}' where Id_viaje = ${id_viaje};
        Update Vehiculos set Ubicacion = 1 where Placa ='${placa}';
        Update Vehiculos set Ubicacion = 2 where Placa ='${datos.nuevaPlaca}' `;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
       ipcRenderer.send('datosModificados');
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
 
      const ConsultaCava = `SELECT count(*) as count FROM Vehiculos where Placa = '${nuevaCava}' 
      and tipovehiculo in (2,4)`

      const consultaCavadisp =`SELECT count(*) as count FROM Vehiculos where Placa = '${nuevaCava}'
       and Ubicacion =1 and tipovehiculo in (2,4)`;

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
    ipcRenderer.send('dato')
    // console.log('golita') 
    const arg = await new Promise((resolve) => {
      ipcRenderer.on('user-data', (event, arg) => {               
        resolve(arg)
      });
    })
    
    const usuario = arg.usuario
    const descripcion =` Se ha modificado la cava del viaje con el id ${id_viaje}`       

    track(descripcion , usuario)
      await modificarCavafunction({ nuevaCava});
      document.getElementById('cavaSpan').innerHTML = `${nuevaCava}` ;

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
       ipcRenderer.send('datosModificados');
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}
/******************Fin de codigo para modificar la cava ************************/


/**************************Codigo para modificar el remolque*********************** */
const modificarRemolque = document.getElementById("modificarRemolque");

modificarRemolque.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

      const nuevoRemolque= document.querySelector('#remolqueNuevo').value;
 
      const consultaRemolque = `SELECT count(*) as count FROM Vehiculos where Placa = '${nuevoRemolque}' 
      and tipovehiculo  in (5,6)`

      const consultaRemolquedisp =`SELECT count(*) as count FROM Vehiculos where Placa = '${nuevoRemolque}'
       and Ubicacion =1 and tipovehiculo in (5,6)`;

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
    ipcRenderer.send('dato')
    // console.log('golita') 
    const arg = await new Promise((resolve) => {
      ipcRenderer.on('user-data', (event, arg) => {               
        resolve(arg)
      });
    })
    
    const usuario = arg.usuario
    const descripcion =` Se ha modificado el remolque del viaje con el id ${id_viaje}`       

    track(descripcion , usuario)
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
         ipcRenderer.send('datosModificados');
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}
/******************Fin de codigo para modificar el remolque ************************/



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
      ipcRenderer.send('dato')
      // console.log('golita') 
      const arg = await new Promise((resolve) => {
        ipcRenderer.on('user-data', (event, arg) => {               
          resolve(arg)
        });
      })
      
      const usuario = arg.usuario
      const descripcion =` Se ha modificado los bultos el viaje con el id ${id_viaje}`       

      track(descripcion , usuario)
        await modificarBultosfunction({ nuevosBultos});
         document.getElementById('bultosSpan').innerHTML = `${nuevosBultos}`
      // Limpia los campos del formulario
  }});

  
  async function modificarBultosfunction(datos) {
      try {
          const pool = await consultar;
          const sqlQuery = `Update  Viajes  set Bultos = '${datos.nuevosBultos}' where Id_viaje = ${id_viaje} `;
          const result = await pool.request().query(sqlQuery);
          console.log('Registro agregado a la base de datos:', result);
         ipcRenderer.send('datosModificados');
      } catch (error) {
          console.log('Error al agregar el registro:', error);
      }
  
  }
  /******************Fin de codigo para modificar bultos ************************/


}
module.exports= modificarViaje