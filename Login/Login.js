
const sql = require('mssql')
const {consultar, config} = require ('../Promise');



async function login(usuario, clave) {
    try {
      // Conectar a la base de datos y buscar al usuario
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('input_usuario', sql.VarChar, usuario)
        .query('SELECT * FROM usuarios WHERE usuario = @input_usuario');
  
      if (result.recordset.length > 0) {
        let user = result.recordset[0];
        let nivel = user.Nivel
  
        // Verificar la contraseña
        if (clave === user.Clave) {
            ipcRenderer.send('login', { usuario, clave, nivel: user.Nivel });   
           
            console.log(user.Nivel)       // Aquí puedes redirigir al usuario a otra página o hacer algo más
        } else {
          ipcRenderer.send('Contraseñaincorrecta');
        }
      } else {
        ipcRenderer.send('Usuarionoencontrado');
      }
    } catch (err) {
      console.error(err);
    }
  }

  document.getElementById('Acceder').addEventListener('click', function() {
    let usuario = document.getElementById('username').value;
    let clave = document.getElementById('password').value;
    console.log(clave)
    login(usuario, clave);
  });



function mostrarContrasena() {
    let inputPassword = document.getElementById('password');
    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
    } else {
      inputPassword.type = 'password';
    }
  }