const sql = require('mssql')
const {consultar, config} = require ('../Promise')


const obtenerUsuarios = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`SELECT Format (Fecharegistro , 'dd/MM/yyyy') as Fecharegistro, Usuario, Nombre, Apellido, Nivel , Format (Ultimo_inicio , 'dd/MM/yyyy HH:mm:ss') as Ultimo_inicio  FROM Usuarios`).then((result) => {
    const usuarios = result.recordset.map((row) => ({
      usuario_u: row.Usuario,
      nivel_u: row.Nivel,
      nombre_u: row.Nombre,
      apellido_u: row.Apellido,
      fecharegistro_u: row.Fecharegistro,
      UltimoInicio_u: row.Ultimo_inicio,
    }))
    return usuarios
  })
}

module.exports = obtenerUsuarios




//Codigo para usar si la consulta esta en un archivo diferente
// const obtenerSedes = require('./')

consultar.connect().then(() => {
  obtenerUsuarios(consultar).then((usuarios) => {
    const tableBody = document.querySelector('#tabla-usuarios tbody')
    usuarios.forEach((usuario) => {
      const rowElement = document.createElement('tr')
      const UsuarioCell = document.createElement('td')
     const NivelCell = document.createElement('td')
     const NombreCell = document.createElement('td')
     const ApellidoCell = document.createElement('td')
     const FecharegistroCell = document.createElement('td')
     const Ultimo_inicioCell = document.createElement('td')

      UsuarioCell.textContent = usuario.usuario_u
      NivelCell.textContent = usuario.nivel_u
      NombreCell.textContent = usuario.nombre_u
     ApellidoCell.textContent = usuario.apellido_u
      FecharegistroCell.textContent = usuario.fecharegistro_u
     Ultimo_inicioCell.textContent = usuario.UltimoInicio_u
     
      rowElement.appendChild(UsuarioCell)
     rowElement.appendChild(NivelCell)
     rowElement.appendChild(NombreCell)
     rowElement.appendChild(ApellidoCell)
     rowElement.appendChild(FecharegistroCell)
     rowElement.appendChild(Ultimo_inicioCell)
      tableBody.appendChild(rowElement)
    })
  }).catch((err) => {
    console.error(err)
  })
})




const Guardar = document.getElementById("Guardar")

Guardar.addEventListener('click', async (evento) => { 
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

    const usuario = document.querySelector('input[name="usuario2"]').value;
    const clave = document.querySelector('input[name="clave"]').value;
     const nivel = document.querySelector('#niveles').value;
     const confirmar= document.querySelector('input[name="confirmarcontraseña"]').value
     const nombre = document.querySelector('input[name="nombre"]').value;
     const apellido = document.querySelector('input[name="apellido"]').value;
     const fecha = document.querySelector('input[name="fechaRegistro"]').value;

     const ConsultaUsuario = `SELECT count(*) as count FROM Usuarios where usuario = '${usuario}'`;
     const pool = await consultar;
     const result = await pool.request().query(ConsultaUsuario);
     let inputs = document.querySelectorAll('.requerido');

     const count = result.recordset[0].count;

     let nombresMostrados = {
      'usuario2': 'Por favor, ingrese un nombre de usuario ',
      'clave': 'Por favor, ingrese una clave',
      'niveles': 'Por favor, seleccione un nivel para el usuario',
      'nombre': 'Por favor, ingrese el nombre',
      'apellido': 'Por favor, ingrese el apellido',
      'fechaRegistro': 'Por favor, ingrese la fecha en la que se está haciendo el registro',

      // Agrega más mapeos según sea necesario
    };

    
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
          
      } 

       else if(count > 0){
        ipcRenderer.send('usuarioExistente', usuario)

      }

        else if( clave!= confirmar){
          console.log(clave,'' ,confirmar)
        ipcRenderer.send('contraseñaNocoincide')
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
       else {

    // Utiliza los valores en tus consultas SQL
    await agregarUsuario({ usuario, clave, nivel , nombre, apellido, fecha });
        ipcRenderer.send('registroExitoso')
    // Limpia los campos del formulario
      location.reload();
    }}
  });

async function agregarUsuario(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `INSERT INTO usuarios (Usuario, Clave, Nombre, Apellido, Fecharegistro, Nivel, Estatus) VALUES ('${datos.usuario}','${datos.clave}','${datos.nombre}','${datos.apellido}', '${datos.fecha}',${datos.nivel}, 'Activo' )`;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}




async function obtenerUsuario(usuario) {
  try {
    await sql.connect(config);
    const query = `SELECT Usuario, Clave, Nombre, Apellido, Nivel, Format (Fecharegistro , 'dd/MM/yyyy') as Fecharegistro FROM Usuarios WHERE Usuario = '${usuario}'`;
    const result = await sql.query(query);
    await sql.close();
    return result.recordset[0] || {Usuarios: usuario, Clave: '', Nombre: 'Usuario no registrado', Apellido: 'Usuario no registrado', Nivel: '', Fecharegistro: ''};
  } catch (error) {
    console.error('Error al consultar la base de datos:', error);
    throw error;
  }
}

document.getElementById('buscar').addEventListener('click', async function() {
  const usuario = document.getElementById('usuario2').value;
  document.getElementById('usuarioAnterior').value = usuario;
  try {
    const {Usuario, Clave, Nombre, Apellido, Nivel, Fecharegistro} = await obtenerUsuario(usuario);
    var fecha_array = Fecharegistro.split("/"); // Devuelve ["30", "08", "2023"]
      const fecha_iso = fecha_array.reverse().join("-");
    document.getElementById('usuario2').value = Usuario;
    document.getElementById('clave').value = Clave;
    document.getElementById('nombre').value = Nombre;
    document.getElementById('apellido').value = Apellido;
    document.getElementById('niveles').value = Nivel;
    document.getElementById('fechaRegistro').value = fecha_iso;
    console.log(fecha_iso, Clave);
  } catch (error) {
    document.getElementById('usuario2').value = '';
    document.getElementById('clave').value = 'Error al obtener el usuario';
    document.getElementById('nombre').value = 'Error al obtener el usuario';
    document.getElementById('apellido').value = 'Error al obtener el usuario';
    document.getElementById('niveles').value = '';
    document.getElementById('fechaRegistro').value = '';
  }
});

async function actualizarUsuario(usuarioAnterior, usuarioNuevo, clave, nombre, apellido, nivel, fechaRegistro) {


      try {
        await sql.connect(config);
        const query = `UPDATE Usuarios SET Usuario = '${usuarioNuevo}', Clave = '${clave}', Nombre = '${nombre}', Apellido = '${apellido}', Nivel = '${nivel}', FechaRegistro = '${fechaRegistro}' WHERE Usuario = '${usuarioAnterior}'`;
        await sql.query(query);
        await sql.close();
      } catch (error) {
        console.error('Error al actualizar la base de datos:', error);
        throw error;
      }
      
    }

document.getElementById('modificar').addEventListener('click', async function() {
  const usuarioAnterior = document.getElementById('usuarioAnterior').value;
  const usuarioNuevo = document.getElementById('usuario2').value;
  const clave = document.getElementById('clave').value;
  const confirmar = document.getElementById('confirmarcontraseña').value;
  const nombre = document.getElementById('nombre').value;
  const apellido = document.getElementById('apellido').value;
  const nivel = document.getElementById('niveles').value;
  const fechaRegistro = document.getElementById('fechaRegistro').value;


  const ConsultaUsuario = `SELECT count(*) as count FROM Usuarios where usuario = '${usuarioNuevo}'`;
  const pool = await consultar;
  const result = await pool.request().query(ConsultaUsuario);
  let inputs = document.querySelectorAll('.requerido');

  const count = result.recordset[0].count;

  let nombresMostrados = {
   'usuario2': 'Por favor, ingrese un nombre de usuario ',
   'clave': 'Por favor, ingrese una clave',
   'niveles': 'Por favor, seleccione un nivel para el usuario',
   'nombre': 'Por favor, ingrese el nombre',
   'apellido': 'Por favor, ingrese el apellido',
   'fechaRegistro': 'Por favor, ingrese la fecha en la que se está haciendo el registro',

   // Agrega más mapeos según sea necesario
 };

 
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
       
   } 

    else if(count > 0){
     ipcRenderer.send('usuarioExistente', usuarioNuevo)

   }

     else if( clave!= confirmar){
       console.log(clave,'' ,confirmar)
     ipcRenderer.send('contraseñaNocoincide')
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
    else {
 
  

  try {
    await actualizarUsuario(usuarioAnterior, usuarioNuevo, clave, nombre, apellido, nivel, fechaRegistro);
    console.log('Usuario actualizado con éxito');
  } catch (error) {
    console.log('Error al actualizar el usuario');
  }   ipcRenderer.send('datosModificados') 
       location.reload();
  }}
 });




const anular = document.getElementById("Anular")

anular.addEventListener('click', async (evento) => { 
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

    const usuario = document.querySelector('input[name="usuario2"]').value;


     const ConsultaUsuario = `SELECT count(*) as count FROM Usuarios where usuario = '${usuario}'`;
     const pool = await consultar;
     const result = await pool.request().query(ConsultaUsuario);

     const count = result.recordset[0].count;


      if(count === 0){
        ipcRenderer.send('usuarioNoexistente', usuario)

      }


    else{

        
      ipcRenderer.send('elimination-confirm-dialog')
      const index = await new Promise((resolve) => {
        ipcRenderer.once('elimination-dialog-result', (event, index) => {
          resolve(index)
        })
      })
    
      if (index === 1) {
        // El usuario hizo clic en "no"
      }
       else {

    // Utiliza los valores en tus consultas SQL
    await eliminarUsuario({ usuario });
        ipcRenderer.send('datosEliminados')
    // Limpia los campos del formulario
      location.reload();
    }}
  });

async function eliminarUsuario(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `delete usuarios where usuario ='${datos.usuario}'`;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
    } catch (error) {
        console.log('Error al agregar el registro:', error);
    }

}

