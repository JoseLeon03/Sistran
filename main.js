//Importando datos necesarios para el funcionamiento
const path = require('path');
const { app, BrowserWindow, ipcMain, dialog, ipcRenderer, webContents, } = require('electron');





// function adjustWindowSize(){

// const subWindow = remote.BrowserWindow.getFocusedWindow();
//   const height= document.body.scrollHeight;
//   const width =document.body.scrollWidth;

//   subWindow.setSize(width,height);
// }
let mainWindow;
let loginWindow;
//Creación automática de la pantalla, será la principal
function createWindow () {
  loginWindow = new BrowserWindow({
    width: 450,
    height: 435,
    resizable:false,
    transparent:true,
    titleBarStyle:'hidden',
    // titleBarOverlay:{
    //   color: '#929292',
    //   height: 30,
    // },
    title: 'Consorcio Trasporte Los Pinos C.A (Versión 3.0)',
    icon:  '2-gray.png' ,
      webPreferences: {
        // enableRemoteModule: true,
        // nodeIntegration: true,
        contextIsolation: false,
      nodeIntegration: true,
     preload: path.join(__dirname, "preload.js"),
    }
  })

  // loginWindow.webContents.openDevTools()

  loginWindow.loadFile('Login/Login.html'); 
}
  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
  });
  
  
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  

  ipcMain.on('login', (event, arg) => {
    // Cuando recibes el evento 'login', cierra la ventana de inicio de sesión
    // mainWindow.close();
    userData = arg
    // Y abre la ventana principal
    mainWindow = new BrowserWindow({
      
      width: 800, // Ancho de la ventana principal
      height: 550 ,// Altura de la ventana principal
      resizable:false,
      titleBarStyle:'hidden',
      titleBarOverlay:{
        color: '#929292',
        height: 30,
      },
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    
    });
    // mainWindow.webContents.openDevTools()

    mainWindow.loadFile('Menuprincipal/Menuprincipal.html');
    

    mainWindow.webContents.send('filtro', (event, arg)); 

    loginWindow.close();

  });


/*Inicio AdmVehiculos*/
ipcMain.on('AdmVehiculos', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 1155,
    height: 700,
    frame: false,
    transparent:true,
    resizable: false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  // childWindow.webContents.openDevTools()

  childWindow.loadFile(path.join(__dirname, 'Admvehiculos/Admvehiculos.html'))

  

})/*Fin AdmVehiculos*/

/*Inicio Asignacion de vehiculos*/
ipcMain.on('Asignacion', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 720,
    height: 668,
    resizable: false,
    transparent:true,
    frame: false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  childWindow.webContents.openDevTools()
  childWindow.loadFile(path.join(__dirname, 'Asignacion/Asignacion.html'))

  
})/*Fin Asignacion*/ 





/*Inicio AdmMMT*/
ipcMain.on('AdmMMT', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 862,
    height: 680,
    transparent:true,
    frame: false,
    resizable: false,
      

    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  // childWindow.webContents.openDevTools()
  
  childWindow.loadFile(path.join(__dirname, 'AdmMMT/AdmMMT.html'))
//   childWindow.loadURL(url.format({
//    pathname:
//    path.join(__dirname,'AdmMMT/AdmMMT.html'),
//    protocol:'file:',
//    slashes:true,
//    Hash: 'tab1'


// }))

   
})/*Fin AdmMMT*/



/*Inicio Administración de empleados*/
ipcMain.on('Empleados', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 1060,
    height: 695,
    frame: false,
    transparent:true,
    resizable:false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  childWindow.webContents.openDevTools()

  childWindow.loadFile(path.join(__dirname, 'Empleados/empleados.html'))

} )/*Fin Administracion de empleados*/


/*Inicio Administración de empleados*/
ipcMain.on('Autorizacion', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 740,
    height: 580,
    transparent: true,
    frame: false,
    resizable:false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  childWindow.loadFile(path.join(__dirname, 'CrearAutorizacion/CrearAutorizacion.html'))
})/*Fin Administracion de empleados*/

/*Inicio Administración de contenedores*/
ipcMain.on('AdmContenedores', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 1080,
    height: 690,
    transparent: true,
    frame: false,
    resizable:false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  childWindow.loadFile(path.join(__dirname, 'AdmContenedores/AdmContenedores.html'))
})/*Fin Administracion de contenedores*/

/*Inicio Cuentas de usuarios*/
ipcMain.on('Usuarios', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 1000,
    height:580,  
    frame:false,   
    resizable: false,
   transparent:true,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  // childWindow.webContents.openDevTools()

  childWindow.loadFile(path.join(__dirname, 'Usuarios/usuarios.html'))

  

})/*Fin Adm

/*Inicio Administracion de gasoil*/
ipcMain.on('Gasoil', (event, data) => {
  const childWindow = new BrowserWindow({
    width:  852,
    height: 583,
    frame:false,
    resizable: false,
    modal: true,
    transparent:true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  childWindow.loadFile(path.join(__dirname, 'gasoil/Gasoil.html'))
})/*Fin Administracion de gasoil*/


/*Inicio Surtido de gasoil*/
ipcMain.on('Surtido', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 858,
    height: 644,
  frame:false,
      
    transparent:true,
    resizable:false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  childWindow.loadFile(path.join(__dirname, 'Surtido/surtlaido.html'))

})/*Fin Surtido de gasoil*/

/*Inicio Registro de contenedores*/
ipcMain.on('Contenedores', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 790,
    height: 655,
    frame:false,
    transparent:true,
    resizable:false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  // childWindow.webContents.openDevTools()

  childWindow.loadFile(path.join(__dirname, 'Contenedores/Contenedores.html'))

})/*Fin Registro de contenedores*/ 


/*Inicio Requerimiento de contenedor a almacen*/
ipcMain.on('ReqContAlmacen', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 740,
    height: 570,
      frame:false,
      transparent:true,
      resizable:false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  childWindow.loadFile(path.join(__dirname, 'ReqContAlmacen/ReqContAlmacen.html'))
})/*Fin Requerimiento de contenedor a almacen*/


/*Inicio Requerimiento de cava a almacen*/
ipcMain.on('ReqCavaAlmacen', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 740,
    height: 575,
    resizable:false,
     frame:false,
     transparent:true,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  childWindow.webContents.openDevTools()

  childWindow.loadFile(path.join(__dirname, 'ReqCavaAlmacen/ReqCavaAlmacen.html'))

})/*Fin Requerimiento de cava a almacen*/

/*Inicio Requerimiento de transporte*/
ipcMain.on('Reqtransporte', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 970,
    height: 642,
      frame:false,
    modal: true,
    transparent:true,
    resizable:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  // childWindow.webContents.openDevTools()

  childWindow.loadFile(path.join(__dirname, 'Reqtransporte/Reqtransporte.html'))
})


ipcMain.on('ReqtransporteConstruccion', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 970,
    height: 642,
      frame:false,
    modal: true,
    transparent:true,
    resizable:false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  // childWindow.webContents.openDevTools()

  childWindow.loadFile(path.join(__dirname, 'ReqtransporteConstruccion/ReqtransporteConstruccion.html'))
})
/*Inicio Listado de viajes*/
ipcMain.on('ListadoViajes', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 965,
    height: 638,
    transparent:true,
    frame:false,
    resizable:false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
   childWindow.webContents.openDevTools()

  childWindow.loadFile(path.join(__dirname, 'Listadoviajes/Listadoviajes.html'))
})/*Fin Listado de viajes*/

/*Inicio Pago por kilometraje*/
ipcMain.on('PagoKm', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 730,
    height: 630,
     frame:false,
     transparent:true,
     resizable:false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  childWindow.loadFile(path.join(__dirname, 'PagoKm/PagoKm.html'))
 
})/*Fin Pago por kilometraje*/ 






/*Inicio Administracion de viaticos */
  ipcMain.on('Viaticos', (event, data) => {
    const childWindow = new BrowserWindow({
      width: 731,
      height: 677,
      resizable: false,
      frame:false,
      modal: true,
      transparent:true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    })
  
childWindow.webContents.openDevTools()
      
        childWindow.loadFile(path.join(__dirname, 'admviatico/Admviatico.html'))
        
    //   ipcMain.on('login', (event, arg) => {
    //   childWindow.webContents.send('filtro', (event, arg));
    //  })

   
  })/*Fin AdmViaticos*/ 




  /*Viaticos para construccion */
  ipcMain.on('ViaticosConstruccion', (event, data) => {
    const childWindow = new BrowserWindow({
      width: 731,
      height: 677,
      resizable: false,
      frame:false,
      modal: true,
      transparent:true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    })
  
// childWindow.webContents.openDevTools()
 childWindow.loadFile(path.join(__dirname, 'ViaticosConstruccion/ViaticosConstruccion.html'))

 ipcMain.on('print-to-pdf', function (event) {
  const pdfPath = path.join(__dirname, '/print.pdf')
  const childWindow = BrowserWindow.fromWebContents(event.sender)
  childWindow.webContents.printToPDF({printBackground: true, landscape: true}, function (error, data) {
    if (error) throw error
    fs.writeFile(pdfPath, data, function (error) {
      if (error) {
        throw error
      }
      shell.openExternal('file://' + pdfPath)
      event.sender.send('wrote-pdf', pdfPath)
    })
  })
})
   
  })

  /*Fin de viaticos para construccion */


/*Menu Rutas*/
  ipcMain.on('Rutas', (event, data) => {
    const childWindow = new BrowserWindow({
      width: 830,
      height: 660,
      frame:false,
      transparent:true,
      resizable:false,
      modal: true,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true
      }
    })
  
    childWindow.loadFile(path.join(__dirname, 'Rutas/Rutas.html'))

  })/*Fin menu rutas*/ 

/*Menu Administración de sedes*/
ipcMain.on('Sedes', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 860,
    height: 635,
    frame:false,
    modal: true,
    resizable: false,
    transparent:true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })
  // childWindow.webContents.openDevTools()

  childWindow.loadFile(path.join(__dirname, 'sedes/sedes.html'))

})/*Fin menu rutas*/ 

/*Menu Rutas*/
ipcMain.on('Peajes', (event, data) => {
  const childWindow = new BrowserWindow({
    width: 920,
    height: 630,
    frame:false,
   transparent:true,
   resizable:false,
    modal: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  childWindow.loadFile(path.join(__dirname, 'peajes/peajes.html'))
 
})/*Fin menu rutas*/ 








//Main principal




//Final del menú Principal de la aplicación


//Minimizar

ipcMain.on('minimizar', () => {

  const Minimizar_Enfocada = BrowserWindow.getFocusedWindow()

  if (Minimizar_Enfocada) {
    console.log('minimizando')

    Minimizar_Enfocada.minimize()
  }
})


//cerrar

ipcMain.on('cerrar', () => {

  const Cerrar_Enfocada = BrowserWindow.getFocusedWindow()

  if (Cerrar_Enfocada) {
    console.log('Cerrando')

    Cerrar_Enfocada.close()
  }
})

//maximizar

// ipcMain.on('maxi', () => {

//   const maxi = BrowserWindow.getFocusedWindow()

//   if (maxi) {
//     console.log('Maximizando')

//     maxi.maximize()
//   }
// })

ipcMain.on('Dialogomodelo', async () => { await
  dialog.showMessageBox({ 
    type:'error',
    title: "Error",
    message: 'Por favor introduzca un modelo',

})
 })

ipcMain.on('Dialogo', async() => { await
  dialog.showMessageBox({  
    type:'error',

    title: "Error",
    message: 'Por favor introduzca una marca ',

})
 })
 
 ipcMain.on('Dialogotipo', async() => { await
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'Por favor introduzca un nombre',

})
 })


 ipcMain.on('validarCampo', async() => { await
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'Por favor, ingrese los datos',

})
 })


 ipcMain.on('choferNodisponible', async() => { await
  dialog.showMessageBox({  
    type:'warning',
    title: "Error",
    message: 'El chofer no se encuentra disponible',

})
 })

 ipcMain.on('choferNoregistrado', async() => { await
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El número de cédula no existe en la base de datos',

})
 })

 ipcMain.on('vehículoNodisponible', async() => { await
  dialog.showMessageBox({  
    type:'warning',
    title: "Error",
    message: 'El vehículo no se encuentra disponible',

})
 })

 ipcMain.on('vehiculoNoregistrado', async() => { await
  dialog.showMessageBox({  
  
    type:'error',
    title: "Error",
    message: 'El vehículo no existe en la base de datos',

})
 })

  ipcMain.on('datosModificados', async() => { await
  dialog.showMessageBox({  
    type: 'info',
    title: "Exito",
    message: 'Los datos fueron modificados con exito',

})
 })

 ipcMain.on('registroExitoso', async() => { await
  dialog.showMessageBox({  
    type:'info',
    title: "Exito",
    message: 'El registro fue agregado con éxito',

})
 })


 ipcMain.on('empleadoNoexistente', async(event, Cedula) => { await
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El empleado con la cedula ' + Cedula + ' no existe en el sistema',

})
 })

 ipcMain.on('usuarioNoexistente', async(event, usuario) => { await
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El usuario "' + usuario + '" no existe en el sistema',

})
 })

 ipcMain.on('usuarioExistente', async(event, usuario) => { await
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El usuario "' + usuario + '" ya existe en el sistema',

})
 })


 ipcMain.on('contraseñaNocoincide', async(event) => { await
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'Las contraseñas no coinciden',

})
 })

 ipcMain.on('empleadoAnulado', async(event, Cedula) => { await
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El empleado con la cedula ' + Cedula + ' está anulado',

})
 })
 ipcMain.on('campos-vacios', (event, camposVacios) => {
  let message =  camposVacios.join('\n');
  dialog.showMessageBox({
    type: 'warning',
    title: 'Faltan datos',
    message: message,
  });
});

ipcMain.on('vehiculoexistente', (event, placa) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El vehículo con la placa '+ placa + ' ya existe en el sistema.',

})
 })

 ipcMain.on('vehiculoNoexistente', (event, placa) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El vehículo con la placa '+ placa + ' no existe en el sistema.',

})
 })


 ipcMain.on('vehiculoAnulado', (event, placa) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El vehículo con la placa '+ placa + ' ya está inactivo.',

})
 })

 ipcMain.on('sap', (event, sap) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El vehículo con el codigo sap '+ sap + ' ya existe en el sistema.',

})
 })

 


 ipcMain.on('empleadoNodisponible', (event, Cedula) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El empleado con la cedula  '+ Cedula + ' no se encuentra disponible.',

})
 })
  
  
ipcMain.on('sedeExistente', (event, Nombre) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'La sede '+ Nombre + ' ya existe en el sistema.',

})
})

ipcMain.on('contenedorExistente', (event, Contenedor) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El contenedor '+ Contenedor + ' ya existe en el sistema.',

})
})
 ipcMain.on('tiposedeExistente', (event, Nombre_Tipo) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'El tipo de sede '+ Nombre_Tipo + ' ya existe en el sistema.',

})
 })


 ipcMain.on('error', (event, error) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'Algo salio mal ',
    detail: ''+ error, 

})
 })

 ipcMain.on('edad', () => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Error",
    message: 'La edad no puede ser mayor a 99',

})
 })

 ipcMain.on('viaje', () => { 
  dialog.showMessageBox({  
    type:'info',
    title: "Registro exitoso",
    message: 'Viaje generado con éxito',

})
 })




 ipcMain.on('show-confirm-dialog', (event) => {
  const options = {
    'type': 'question',
      'title': 'Confirmacion',
      'message': '¿Desea confirmar el registro?' ,
      'buttons': [
          'Si',
          'No'
      ],
     
  }

  // Mostrar la messagebox de confirmación
  dialog.showMessageBox(null, options).then((result) => {
    // Enviar el resultado de la confirmación al proceso de renderizado
    event.sender.send('confirm-dialog-result', result.response)
  })
})


ipcMain.on('anular-confirm-dialog', (event) => {
  const options = {
    'type': 'question',
      'title': 'Confirmacion',
      'message': '¿Seguro que desea anular los datos?' ,
      'buttons': [
          'Si',
          'No'
      ],
     
  }

  // Mostrar la messagebox de confirmación
  dialog.showMessageBox(null, options).then((result) => {
    // Enviar el resultado de la confirmación al proceso de renderizado
    event.sender.send('anular-dialog-result', result.response)
  })
})


ipcMain.on('datosEliminados', () => { 
  dialog.showMessageBox({  
    type:'info',
    title: "Datos eliminados",
    message: 'Datos eliminados con éxito',

})
 })

 ipcMain.on('viaticoExistente', () => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Viatico existente",
    message: 'La sede seleccionada ya tiene un viático existente. Por favor, use el botón "Modificar"',

})
 })


 ipcMain.on('tipovehiculoExistente', (event, nuevoTipo) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Tipo de vehiculo existente",
    message: 'El tipo de vehículo ' +nuevoTipo+ ' ya existe en el sistema.',

})
 })

 ipcMain.on('modeloExistente', (event, nuevoModelo) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Tipo de vehiculo existente",
    message: 'El modelo de vehículo ' +nuevoModelo+ ' ya existe en el sistema.',

})
 })

 ipcMain.on('marcaExistente', (event, nuevaMarca) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Tipo de vehiculo existente",
    message: 'La marca de vehículo ' +nuevaMarca+ ' ya existe en el sistema.',

})
 })


 ipcMain.on('elimination-confirm-dialog', (event) => {
  const options = {
    'type': 'question',
      'title': 'Confirmacion',
      'message': '¿Seguro que desea eliminar el registro?' ,
      'buttons': [
          'Si',
          'No'
      ],
     
  }

  // Mostrar la messagebox de confirmación
  dialog.showMessageBox(null, options).then((result) => {
    // Enviar el resultado de la confirmación al proceso de renderizado
    event.sender.send('elimination-dialog-result', result.response)
  })
})


ipcMain.on('modification-confirm-dialog', (event) => {
  const options = {
    'type': 'question',
      'title': 'Confirmacion',
      'message': '¿Desea modificar el registro?' ,
      'buttons': [
          'Si',
          'No'
      ],
     
  }

  // Mostrar la messagebox de confirmación
  dialog.showMessageBox(null, options).then((result) => {
    // Enviar el resultado de la confirmación al proceso de renderizado
    event.sender.send('modification-dialog-result', result.response)
  })
})


ipcMain.on('empleadoAsignado', (event, Cedula) => {
  const options = {
    'type': 'question',
      'title': 'Confirmacion',
      'message': 'El empleado con la cédula ' + Cedula + ' ya tiene en vehículo asignado. ¿Desea cambiar la asignación?' ,
      'buttons': [
          'Si',
          'No'
      ],
     
  }

  // Mostrar la messagebox de confirmación
  dialog.showMessageBox(null, options).then((result) => {
    // Enviar el resultado de la confirmación al proceso de renderizado
    event.sender.send('empleadoResultado', result.response)
  })
})

ipcMain.on('vehículoAsignado', (event, Placa) => {
  const options = {
    'type': 'question',
      'title': 'Confirmacion',
      'message': 'El vehículo con la placa  ' + Placa + ' ya está asignado a un chofer. ¿Desea cambiar la asignación?' ,
      'buttons': [
          'Si',
          'No'
      ],
     
  }

  // Mostrar la messagebox de confirmación
  dialog.showMessageBox(null, options).then((result) => {
    // Enviar el resultado de la confirmación al proceso de renderizado
    event.sender.send('vehiculoResultado', result.response)
  })
})


ipcMain.on('autorizacion-confirm-dialog', (event) => {
  const options = {
    'type': 'question',
      'title': 'Autorización para conducir',
      'message': '¿Desea generar una Autorización para conducir?' ,
      'buttons': [
          'Si',
          'No'
      ],
     
  }

  // Mostrar la messagebox de confirmación
  dialog.showMessageBox(null, options).then((result) => {
    // Enviar el resultado de la confirmación al proceso de renderizado
    event.sender.send('autorizacion-dialog-result', result.response)
  })
})


ipcMain.on('asignacionExistente', (event, Cedula, Vehiculo) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Asignación existente",
    message: 'El empleado con la cedula '+ Cedula +' ya tiene asignado el vehículo ' + Vehiculo,

})
 })


 
ipcMain.on('Contraseñaincorrecta', (event) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Contraseña incorrecta",
    message: 'La contraseña es incorrecta '

})
 })

 
ipcMain.on('Usuarionoencontrado', (event) => { 
  dialog.showMessageBox({  
    type:'error',
    title: "Usuario no  existente",
    message: 'El usuario no existe en el sistema',

})
 })