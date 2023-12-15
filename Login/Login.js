
const sql = require('mssql')
const {consultar, config} = require ('../Promise');
// const filtrar = require('../Menuprincipal/Menuprincipal');

// const userData = require('../Menuprincipal/Menuprincipal');


 async function login(usuario, clave) {

    try {
      // Conectar a la base de datos y buscar al usuario
      let pool = await sql.connect(config);
      let result = await pool.request()
        .input('input_usuario', sql.VarChar, usuario)
        .query('SELECT * FROM usuarios WHERE usuario = @input_usuario');
  
      if (result.recordset.length > 0) {
        let user = result.recordset[0];
  
        // Verificar la contraseña
        if (clave === user.Clave) {
       
          ipcRenderer.send('login',  { usuario, clave, nivel: user.Nivel }); 
          // ipcRenderer.send('login2', { usuario, clave, nivel: user.Nivel }); 
          // const filtro = user.Nivel
        }   
        
        else {
          ipcRenderer.send('Contraseñaincorrecta');
        }
   
      }   
      else {
        ipcRenderer.send('Usuarionoencontrado');
      }
    //  return nivel
    } catch (err) {
      console.error(err);
    }
  }


  // module.exports = login();

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

  document.getElementById('password').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('Acceder').click();
    }
});


let usernameInput = document.getElementById('username');
let passwordInput = document.getElementById('password');


  function alternateInput(e) {
    if (e.keyCode === 40) { 
        passwordInput.focus();
    } else if (e.keyCode === 38) { 
        usernameInput.focus();
    }
}

usernameInput.addEventListener('keydown', alternateInput);
passwordInput.addEventListener('keydown', alternateInput);