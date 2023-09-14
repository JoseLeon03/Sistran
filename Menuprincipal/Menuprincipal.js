function userData(datosUsuario){
    ipcRenderer.on('filtro', (event, arg) => {
      datosUsuario = arg.usuario
     
      if (arg.nivel === 2) {
        document.getElementById('Sedes').style.display = 'none';
        document.getElementById('viaticos').style.display = 'none';
        document.getElementById('Usuarios').style.display = 'none';
        document.getElementById('admMMT').style.display = 'none';
        document.getElementById('AdmVehiculos').style.display = 'none';

      } 
    });
    // return datosUsuario
 }userData() 

//  module.exports = userData