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
----------------------------------------------------------------------
 Lo nuevo
// let sql = require('mssql');
let express = require('express');
let app = express();

app.get('/', function (req, res) {
   
  var sql = require("mssql");

  // config for your database
  var config = {
      user: 'sa',
      password: '',
      server: 'localhost', 
      database: 'Pasantia',
      options: {
          encrypt: true,
          enableArithAbort:true,
          trustedConnection: true, 
          trustServerCertificate: true ,
          useUTC: true
      },
  };
 
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('select * from usuarios', function (err, recordset) {
          
          if (err) console.log(err)

          // send records as a response
          res.send(recordset);
          
      });
  });
});

var server = app.listen(5000, function () {
  console.log('Server is running..');
});


// http://localhost:5000






// const config = {

//     user: 'jleon', // sa
//     password: 'Traki$2023',
//     server: 'localhost', // JLEON
//     database: 'Pasantia',
    
//     // user: 'jleon',
//     // password: 'Traki$2023',
//     //  server: 'JLEON',
//     // driver: 'msnodesqlv8',
//     // database: 'Pasantia',

//     port: 1433,
//     options: {
//         encrypt: true,
//          trustedConnection: true, 
//          trustServerCertificate: true ,
//          useUTC: true
       
//     },
// };



// async function connectToDatabase() {
//     try {
//         await sql.connect(config);
//         console.log('Conexión a la base de datos establecida correctamente.');
//     } catch (error) {
//         console.error('Error al conectarse a la base de datos:', error);
//     }
// }

// connectToDatabase();



/*const sql = require('mssql');

const config = {

   driver: 'msnodesqlv8',
    server: 'JLEON',
    port: 1433,
  database: 'Pasantia',
  options: {
      encrypt: true,
      trustedConnection: true,
   trustServerCertificate: true 
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

      BotonLogin.addEventListener('click', async function () {
      const username = userField.value;
      const password = passwordField.value;

      const resultado = await sql.query(`SELECT COUNT(*) AS total FROM usuarios WHERE usuario='${username}' AND contraseña='${password}'`);

      if (resultado.recordset[0].total > 0) {
        console.log(`Ingresando con usuario ${username} y contraseña ${password}`);
        window.location.href = 'prueba.html';
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

  conectar();*/
 
