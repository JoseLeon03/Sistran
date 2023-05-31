const sql = require('mssql');

const config = {
 
  server: 'DESKTOP-8VVN798',
  database: 'Sistran',
  options: {
    trustedConnection: true
  }
};

async function conectar() {
  try {
    await sql.connect(config);
    console.log('Conexión exitosa a la base de datos');

    const BotonLogin = document.getElementById('Login');
    const BotonLimpiar = document.getElementById('Limpiar');
    const BotonSalir = document.getElementById('Salir');
    const userField = document.getElementById('username');
    const passwordField = document.getElementById('password');

    BotonLogin.addEventListener('click', async function() {
      const username = userField.value;
      const password = passwordField.value;

      const resultado = await sql.query(`SELECT COUNT(*) AS total FROM usuarios WHERE usuario='${username}' AND contraseña='${password}'`);

      if (resultado.recordset[0].total > 0) {
        console.log(`Ingresando con usuario ${username} y contraseña ${password}`);
        window.location.href = 'FormularioContacto - copia.html';
      }   else {
        console.log('Nombre de usuario o contraseña incorrectos');
        alert('Nombre de usuario o contraseña incorrectos');
      }
    });

    BotonLimpiar.addEventListener('click', function() {
      userField.value = '';
      passwordField.value = '';
    });

   BotonSalir.addEventListener('click', function() {
      window.close();
    });
  } catch (error) {
    console.log('Error al conectar a la base de datos', error);
  }
}

conectar();
