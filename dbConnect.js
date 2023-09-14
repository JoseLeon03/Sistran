

    // Definir una consulta SQL para verificar si el usuario y la contraseña son válidos
    /*const query = `SELECT count(*) as count from usuarios WHERE usuario = '${username}' AND contraseña = '${password}'`;

    // Ejecutar la consulta SQL en la conexión a la base de datos
    const request = new sql.Request();
    request.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error de consulta');
        return;
      }

      // Verificar si se encontró el usuario y la contraseña en la base de datos
      const count = result.recordset[0].count;
      if (count === 1) {
        // Redirigir al usuario a la página de inicio si el inicio de sesión es válido
        res.sendFile(__dirname + '/prueba.html');
      } /*else {
        // Mostrar un mensaje de error si el usuario y la contraseña son inválidos
        res.status(401).send('Nombre de usuario o contraseña inválidos '+ username +"  "+ password);
      }*/

      /*else {
        // Mostrar un mensaje de error si el usuario y la contraseña son inválidos
       const query = `SELECT count(*) as count form usuarios where usuario = '${username}'`;
       const request = new sql.Request();
       request.query(query, (result)=>{
        
        const count_usuario = result.recordset[0].count;
       if(count_usuario === 0){
        alert('Usuario invalido');
      }
      }); 
      }*/
      /*const query_usuario = `SELECT count(*) as count form usuarios where usuario = '${username}'`;
      request.query(query_usuario, (result)=>{
        const count = result.recordset[0].count;
       if(count(0) === 0){
        alert('Usuario invalido');
      } 
      });*/   
  /*  });
    
      
      
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
}); */

const express = require('express');
const bodyParser = require('body-parser');
const sql = require('mssql');
const app = express();

// Configurar el analizador de cuerpos de solicitud
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la conexión a la base de datos MSSQL
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
    },
};

app.use(express.static('Login'));

// Servir el archivo HTML en la ruta raíz del sitio
app.get('/', (req, res) => {

  res.sendFile(__dirname + '/Login/Login.html');
});

// Definición de la ruta para procesar la solicitud POST del formulario de inicio de sesión
app.post('/login', (req, res) => {
  // Obtener los datos de usuario y contraseña del formulario
  const username = req.body.username;
  const password = req.body.password;
  console.log('Usuario: ', username)
  console.log('Contraseña: ', password)


  // Crear una nueva conexión a la base de datos MSSQL
  sql.connect(config, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error del servidor');
      return;
    }

    // Definir una consulta SQL para verificar si el usuario y la contraseña son válidos
    const query = `SELECT count(*) as count from usuarios WHERE usuario = '${username}' AND clave = '${password}'`;

    // Ejecutar la consulta SQL en la conexión a la base de datos
    const request = new sql.Request();
    request.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error de consulta');
        return;
      }

      // Verificar si se encontró el usuario y la contraseña en la base de datos
      const count = result.recordset[0].count;
      if (count === 1) {
        // Redirigir al usuario a la página de inicio si el inicio de sesión es válido
        res.sendFile(__dirname + '/Admviatico/Admviatico.html');
      } else {
        // Verificar si el usuario es incorrecto
        const query_usuario = `SELECT count(*) as count FROM usuarios WHERE usuario = '${username}'`;
        request.query(query_usuario, (err, result_usuario) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error de consulta');
            return;
          }
          const count_usuario = result_usuario.recordset[0].count;
          if (count_usuario === 0) {
            // Mostrar un mensaje de error si el usuario es incorrecto
            res.status(401).send('Nombre de usuario inválido');
            return;
          } else {
            // Verificar si la contraseña es incorrecta
            const query_contrasena = `SELECT count(*) as count FROM usuarios where clave = '${password}'`;
            request.query(query_contrasena, (err, result_contrasena) => {
              if (err) {
                console.error(err);
                res.status(500).send('Error de consulta');
                return;
              }
              const count_contrasena = result_contrasena.recordset[0].count;
              if (count_contrasena === 0) {
                // Mostrar un mensaje de error si la contraseña es incorrecta
                res.status(401).send('Contraseña inválida');
                return;
              } else {
                // Mostrar un mensaje de error genérico si la cuenta es incorrecta
                res.status(401).send('Nombre de usuario o contraseña inválidos');
                return;
              }
            });
          }
        });
      }
    });
  });
});
// app.use(express.static('usuarios'));
// app.get('/usuarios', (req, res) => {
//   const query =  `SELECT Format (fecharegistro , 'dd/MM/yyyy') as fecharegistro, usuario, nombre, apellido, nivel, estatus,  Format (ultimo_inicio , 'dd/MM/yyyy HH:mm:ss') as ultimo_inicio  FROM usuarios`;

//   const request = new sql.Request();
//   request.query(query, (err, result) => {
//     if (err) {
//       console.error('Error al ejecutar la consulta:', err);
//       res.status(500).json({ error: 'Error al ejecutar la consulta' });
//       return;
//     }

//     const registros = result.recordset;
//     res.json(registros);

//     sql.close();
//   });
// });

// //SQL para crear nuevos usuarios
  app.use(express.static('Usuarios'));
app.post('/usuarios', (req, res) => {

  // Obtener los datos del nuevo usuario del cuerpo de la solicitud
  const usuario = req.body.usuario;
  const password = req.body.password;
  const nivel = req.body.niveles;
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const fechaRegistro = req.body.fechaRegistro;
  const confirmarcontraseña = req.body.confirmarcontraseña;

  console.log(alert === window.alert);

    // Crear una nueva conexión a la base de datos MSSQL
    sql.connect(config, (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error del servidor');
        return;
      }

      // Definir una consulta SQL para insertar el nuevo usuario en la base de datos
      const query = `INSERT INTO usuarios (usuario, contraseña, nivel, nombre, apellido, fecharegistro) VALUES ('${usuario}', '${password}', ${nivel}, '${nombre}', '${apellido}','${fechaRegistro}')`;

      // Ejecutar la consulta SQL en la conexión a la base de datos
      const request = new sql.Request();
      request.query(query, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Error de consulta');
          return;
        }

        // Mostrar un mensaje indicando que el usuario ha sido creado exitosamente
        res.status(200).send('Usuario creado exitosamente');
        return;
      });
      
  });
  
});




// SQL para reflejar la tabla de viaticos
app.use(express.static('Viáticos'));
app.get('/viaticos', (req, res) => {
  const query =  `SELECT Format (fecha , 'dd/MM/yyyy') as fecha, id, origen, destino, viatico  FROM viaticos`;

  const request = new sql.Request();
  request.query(query, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
      return;
    }

    const registros = result.recordset;
    res.json(registros);

    sql.close();
  });
});

// SQL para reflejar el historial de cambios de tasa
app.use(express.static('Admviatico'));
app.get('/Tasa', (req, res) => {
  const query = `SELECT Format (fecha , 'dd/MM/yyyy') as fecha, tasa, usuario  FROM Historial_tasa order by fecha`;

  const request = new sql.Request();
  request.query(query, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
      return;
    }

    const registros = result.recordset;
    res.json(registros);

    sql.close();
  });
});

//Consulta para sedes 
app.use(express.static('sedes'));
app.get('/sedes', (req, res) => {

  const query = 'SELECT codigo, sede FROM sedes order by codigo';

  const request = new sql.Request();
  request.query(query, (err, result) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al ejecutar la consulta' });
      return;
    }

    const registros = result.recordset;
    res.json(registros);

    sql.close();
  });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});