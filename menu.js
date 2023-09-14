const { app, Menu } = require("electron");

const isMac = process.platform === "darwin";

const template = [
  {
    label: "File",
    submenu: [isMac ? { role: "close" } : { role: "quit" }],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

module.exports = {
  menu,
};




// Si quieres utilizar la sintaxis que has mostrado en tu archivo JavaScript,
//  es posible que debas modificar el archivo `conexion.js` para que exporte una función que
//   devuelva una instancia de `pool`. Por ejemplo, puedes escribir el siguiente código en `conexion.js`:

javascript
const sql = require('mssql')

const config = {
  user: 'usuario',
  password: 'contraseña',
  server: 'servidor',
  database: 'basededatos',
  options: {
    encrypt: true
  }
}

function conectar() {
  return new sql.ConnectionPool(config).connect()
}

module.exports = conectar


// En este ejemplo, exportamos una función llamada `conectar()` que devuelve una promesa
//  que resuelve con una instancia de `pool`. Para conectarse a la base de datos, utilizamos 
//  el objeto `config` que contiene los detalles de la conexión.

// En tu archivo JavaScript principal, puedes
//  utilizar la sintaxis que has mostrado para hacer una solicitud AJAX a la ruta
//   `/usuarios` y mostrar los datos en una tabla. Por ejemplo, puedes escribir el siguiente código:

javascript
const conectar = require('./conexion')

conectar().then(pool => {
  appExpress.get('/usuarios', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM usuarios')
      res.json(result.recordset)
    } catch (err) {
      console.error(err)
      res.status(500).send('Error del servidor')
    }
  })
}).catch(err => {
  console.error(err)
})


// En este ejemplo, exportamos la función `conectar()` desde `conexion.js` y la utilizamos para obtener una instancia
//  de `pool`. Luego, definimos la ruta `/usuarios` en nuestro servidor Express y ejecutamos una consulta
//   para obtener los datos de la tabla `usuarios`. Si la consulta se ejecuta correctamente, enviamos
//    los resultados como una respuesta JSON a la solicitud GET. Si ocurre algún error, enviamos una 
//    respuesta de error 500.

// En tu archivo HTML, puedes utilizar la sintaxis que has mostrado para hacer una solicitud AJAX a la ruta 
// `/usuarios` y mostrar los datos en una tabla. Por ejemplo, puedes escribir el siguiente código:

// html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Usuarios</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $(document).ready(() => {
      $.get('/usuarios', (data) => {
        const tabla = document.getElementById('tabla-usuarios');
        const tbody = tabla.querySelector('tbody');

        data.forEach(registro => {
          const tr = document.createElement('tr');
          const tdusuario2 = document.createElement('td',name="lista");
          const tdnivel = document.createElement('td',name="lista");
          const tdnombre = document.createElement('td',name="lista" );
          const tdapellido = document.createElement('td',name="lista");
          const tdfecharegistro = document.createElement('td',name="lista");
          const tdultimasesion = document.createElement('td',name="lista");


          tdusuario2.textContent = registro.usuario;
          tdnivel.textContent = registro.nivel;
          tdnombre.textContent = registro.nombre;
          tdapellido.textContent = registro.apellido;
          tdfecharegistro.textContent = registro.fecharegistro;
          tdultimasesion.textContent = registro.ultimo_inicio;

          tr.appendChild(tdusuario2);
          tr.appendChild(tdnivel);
          tr.appendChild(tdnombre);
          tr.appendChild(tdapellido);
          tr.appendChild(tdfecharegistro);
          tr.appendChild(tdultimasesion);


          tbody.appendChild(tr);
        });
      })
    })
  </script>
</head>
<body>
  <table id="tabla-usuarios">
    <thead>
      <tr>
        <th class="usuario2" id="fila1" name="lista">Usuario</th>
        <th class="nivel" id='fila2' name="lista">Nivel</th>
        <th class ="nombre" id="fila3" name="lista">Nombre</th>
        <th class ="apellido" id="fila4" name="lista">Apellido</th>
        <th class ="fecharegistro" id="fila5" name="lista">Registro</th>
        <th class ="ultimasesion" id="fila6" name="lista">Ultima sesion</th>
      </tr>
    </thead>
    <tbody name="lista">
    </tbody>
  </table>
</body>
</html>

{/* /* // En este ejemplo, utilizamos jQuery para hacer una solicitud AJAX a la ruta `/usuarios`
//  y obtener los datos de la tabla `usuarios`. Luego, utilizamos un bucle `forEach()`
//   para agregar cada fila de datos a una tabla en el archivo HTML.

// En cuanto a cómo cambiar ElectronJS para que funcione con esta nueva sintaxis,
//  no es necesario hacer ningún cambio en ElectronJS en sí mismo. Lo que debes hacer es asegurarte de que 
//  el servidor Express se esté ejecutando en tu aplicación de ElectronJS y que la ruta `/usuarios`
//   esté disponible en el servidor.

// Para ejecutar el servidor Express en tu aplicación de ElectronJS, puedes utilizar el siguiente código 
// en el archivo principal de tu aplicación:

// javascript */ }
const { app, BrowserWindow } = require('electron')
const express = require('express')
const conectar = require('./conexion')

const appExpress = express()

appExpress.use(express.static('public'))

conectar().then(pool => {
  appExpress.get('/usuarios', async (req, res) => {
    try {
      const result = await pool.request().query('SELECT * FROM usuarios')
      res.json(result.recordset)
    } catch (err) {
      console.error(err)
      res.status(500).send('Error del servidor')
    }
  })
}).catch(err => {
  console.error(err)
})

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

appExpress.listen(3000, () => {
  console.log('Servidor Express iniciado en el puerto 3000')
})





