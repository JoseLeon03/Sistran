
    // ipcRenderer.on('filtro', (event, arg) => {

    //   // console.log('este es el filtro')
    //   datosUsuario = arg.nivel
    //  console.log(datosUsuario)

    //   if (arg.nivel === 2) {
    //     document.getElementById('Sedes').style.display = 'none';
    //     document.getElementById('viaticos').style.display = 'none';
    //     document.getElementById('Usuarios').style.display = 'none';
    //     document.getElementById('admMMT').style.display = 'none';
    //     document.getElementById('AdmVehiculos').style.display = 'none';


    //   } 

    // });
   
    ipcRenderer.send('dato')
    async function menu() {
    // console.log('golita') 
    
    const arg = await new Promise((resolve) => {
      ipcRenderer.on('user-data', (event, arg) => {  
        if (arg.nivel === 2) {
          document.getElementById('Sedes').style.display = 'none';
          document.getElementById('viaticos').style.display = 'none';
          document.getElementById('Usuarios').style.display = 'none';
          document.getElementById('admMMT').style.display = 'none';
          document.getElementById('AdmVehiculos').style.display = 'none';
  
  
        }        
        resolve(arg)
      });
    })
  } menu()