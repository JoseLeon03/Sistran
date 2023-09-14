
const { ipcRenderer } = require('electron')

 function AdmMMT() {
    ipcRenderer.send('AdmMMT')
  
  }

function AdmVehiculos() {
  ipcRenderer.send('AdmVehiculos')

}
function admviatico() {
    ipcRenderer.send('admviatico')
  
  }
 
  function Asignacion() {
    ipcRenderer.send('Asignacion')
  
  }
  function AdmContenedores() {
    ipcRenderer.send('AdmContenedores')
  
  }
  function Contenedores() {
    ipcRenderer.send('Contenedores')
  
  }
  function Empleados() {
    ipcRenderer.send('Empleados')
  
  }
  function Gasoil() {
    ipcRenderer.send('Gasoil')
  
  }
  function ListadoViajes() {
    ipcRenderer.send('ListadoViajes')
  
  }
  function PagoKm() {
    ipcRenderer.send('PagoKm')
  
  }
  function Peajes() {
    ipcRenderer.send('Peajes')
  
  }
  function ReqCavaAlmacen() {
    ipcRenderer.send('ReqCavaAlmacen')
  
  }
  function ReqContAlmacen() {
    ipcRenderer.send('ReqContAlmacen')
  
  }
  function Reqtransporte() {
    ipcRenderer.send('Reqtransporte')
  
  }

  function ReqtransporteConstruccion() {
    ipcRenderer.send('ReqtransporteConstruccion')
  
  }
  function Rutas() {
    ipcRenderer.send('Rutas')
  
  }
  function Sedes() {
    ipcRenderer.send('Sedes')
  
  }
  function Surtido() {
    ipcRenderer.send('Surtido')
  
  }
  function Autorizacion() {
    ipcRenderer.send('Autorizacion')
  
  }
  function Usuarios() {
    ipcRenderer.send('Usuarios')
  
  }
  function Viaticos() {
    ipcRenderer.send('Viaticos')
  
  }

  function ViaticosConstruccion() {
    ipcRenderer.send('ViaticosConstruccion')
  
  }

  


  
  // ipcMain.on('minimizar', () => {
  //   const nuevaVentana = BrowserWindow.getFocusedWindow()
  //   if (nuevaVentana) {
  //     nuevaVentana.minimize()
  //   }
  // })
  
  


