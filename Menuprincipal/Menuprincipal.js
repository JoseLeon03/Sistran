
// const {variable} = require('../Login/Login')

// console.log('hola', variable)


    ipcRenderer.on('filtro', (event, arg) => {

      // console.log('este es el filtro')
      datosUsuario = arg.nivel
     console.log(datosUsuario)

      if (arg.nivel === 2) {
        document.getElementById('Sedes').style.display = 'none';
        document.getElementById('viaticos').style.display = 'none';
        document.getElementById('Usuarios').style.display = 'none';
        document.getElementById('admMMT').style.display = 'none';
        document.getElementById('AdmVehiculos').style.display = 'none';

        // ipcRenderer.send('login2', (event, datosUsuario) ); 

      } 

    });
   

    // ipcRenderer.on('041', (event, arg) => {


    //   console.log(' renderer 041')

    // })

//     async function filtrar(jivel){
// //  const {jivel} = require ('../Login/Login')
//       console.log('filtrando', jivel)
//       if(jivel === 1){

//         document.getElementById('Sedes').style.display = 'none';
//         document.getElementById('viaticos').style.display = 'none';
//         document.getElementById('Usuarios').style.display = 'none';
//         document.getElementById('admMMT').style.display = 'none';
//         document.getElementById('AdmVehiculos').style.display = 'none';

//       }


//     }
// filtrar()
    

    // return datosUsuario




