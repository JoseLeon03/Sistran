const obtenerTasa = require ('../Utility/obtenerTasa');
const track = require('../Utility/Track')

function generarViaje (guardarViaje){
    guardarViaje.addEventListener('click', async function(evento) {
      guardarViaje.disabled = true
    
        evento.preventDefault(); // Evita que el formulario se envíe automáticamente
        if(navigator.onLine){}
        else{guardarViaje.disabled = false
          guardarViaje.disabled = true}
        const Fecha_req = document.querySelector('input[name="Fecha_req"]').value;
        const Origen = document.querySelector('#Origen').value;
        const Destino = document.querySelector('#Destino').value;
        const Sede = document.querySelector('#Sedes').value;
        const Placa_veh = document.querySelector('input[name="Placa"]').value;
        const Placa_cava = document.querySelector('input[name="Placacava"]').value;
        const Precinto = document.querySelector('input[name="Precinto"]').value;
        const Precinto2 = document.querySelector('input[name="Precinto2"]').value;
        const Cedula_chofer = document.querySelector('input[name="Cedula_chofer"]').value;
        const Viatico = document.querySelector('input[name="Viatico"]').value;
        const modelo = document.querySelector('input[name="Modelo"]').value;
        const Peaje = document.querySelector('input[name="Peaje"]').value;
        // const Viatico_total = document.querySelector('input[name="Total"]').value;
        const Ayudante = document.querySelector('input[name="Nombre_ayudante"]').value;
        const Cedula_ayu = document.querySelector('input[name="Cedula_ayudante"]').value;
        const Viatico_ayu = document.querySelector('input[name="Viatico_ayudante"]').value;
        const Observaciones = document.querySelector('textarea[name="Observaciones"]').value;
        const Bultos = document.querySelector('input[name="Bultos"]').value;
        const Contenedor = document.querySelector('input[name="Contenedor"]').value;
        const Placa_remolque = document.querySelector('input[name="Placa_remolque"]').value;
        const Nombre = document.querySelector('input[name="Nombre_chofer"]').value;
        // const Viatico_usd2 = document.querySelector('input[name="Viatico_usd"]').value
        // const Mercancia = document.querySelector('input[name="Mercancia"]').value
    
        real = parseInt(Peaje) + parseInt(Viatico)  
    
        obtenerTasa();
          
           const Tasa =   await obtenerTasa({}); 
           
           
    
           const Viatico_usd2 = Viatico / Tasa
    
    
        let selectElement = document.querySelector('#Sedes'); // Reemplaza '#tuSelect' con el selector de tu elemento select
        let selectedOptionText = selectElement.options[selectElement.selectedIndex].textContent;
    
    
    
    
        // Itera sobre los elementos de entrada
        let nombresMostrados = {
          'Cedula_chofer': 'Por favor, seleccione un chofer',
          'Placa': 'Por favor, seleccione un vehiculo',
          'Viatico': 'Por favor, ingrese un viatico',
          'Fecha_req':  'Por favor, ingrese una fecha de requerimiento',
          'Bultos':  'Por favor, ingrese una cantidad de bultos',
          'origen': 'Por favor, seleccione un origen',
          'destino': 'Por favor, seleccione un destino',
          'Peaje': 'Por favor, ingrese un monto de peaje',
          // Agrega más mapeos según sea necesario
        };
    
    
        // Selecciona todos los elementos de entrada con la clase "requerido"
        let inputs = document.querySelectorAll('input.requerido'+',select');
    
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
            setTimeout(() =>{ guardarViaje.disabled = false }, 2500)
        }
      // setTimeout(function(){document.getElementById("Guardar").disabled = false;},5000);
    
      else{
    
        ipcRenderer.send('show-confirm-dialog')
        const index = await new Promise((resolve) => {
          ipcRenderer.once('confirm-dialog-result', (event, index) => {
            resolve(index)
          })
        })
    
        if (index === 1) {
          // El usuario hizo clic en "no"
          guardarViaje.disabled = false 
        }
        else{
          
         
        // Utiliza los valores en tus consultas SQL
        const [numeroComprobante, id_viaje] = await agregarViaje({Fecha_req, Origen, Sede, Placa_veh, Placa_cava,  Precinto,  Cedula_chofer, Viatico , Ayudante, Cedula_ayu, Viatico_ayu, Observaciones, Bultos, Destino, Contenedor, Placa_remolque, Viatico_usd2, Precinto2, Nombre, Peaje, real,Tasa});
        // formulario.reset();
            ipcRenderer.send('dato')
                // console.log('golita') 
                const arg = await new Promise((resolve) => {
                  ipcRenderer.on('user-data', (event, arg) => {               
                    resolve(arg)
                  });
                })
                
                const usuario = arg.usuario
                const descripcion =` Se ha creado el viaje con el id ${id_viaje}`       

                track(descripcion , usuario)
    
    
            ipcRenderer.send('impresion-confirm-dialog')
         const index = await new Promise((resolve) => {
             ipcRenderer.once('impresion-dialog-result', (event, index) => {
                 resolve(index)
             })
         })
       
         if (index === 1) {
             location.reload(); // El usuario hizo clic en "no"
         }
         else{

          var fecha_array = Fecha_req.split("-"); // Devuelve ["30", "08", "2023"]
          var fecha_iso = fecha_array.reverse().join("/");
          const generarComprobante = require('./GenerarComprobante');
          await generarComprobante(numeroComprobante, fecha_iso);
      
          const generarBitacora = require('./GenerarBitacora');
          await generarBitacora({id_viaje, Cedula_chofer})
      
          const generarSalida = require ('./GenerarAutorizacionsalida') 
          await generarSalida({id_viaje})
      
        //   const generarDespacho = require ('./GenerarAutorizaciondespacho')
        //   await generarDespacho({id_viaje})
          guardarViaje.disabled = false 
        
        }
        
    
        // await generarSalida({Fecha_req, Placa_veh, Nombre, Cedula_chofer, selectedOptionText, modelo, Placa_remolque, Contenedor, Observaciones, Precinto, Placa_cava, Precinto2  })
       
    
        
        location.reload();
    }}
    });
    
    
    
    
    async function agregarViaje(datos) {
      try {
    
    
       
        
          const pool = await consultar.connect();
          const sqlQuery = `
        
    
          BEGIN TRANSACTION;
    
          DECLARE @MyTableVar table(
              Id_viaje int,
              Viatico_chofer decimal,
              Sede int,
              Fecha date,
              Cedula_chofer int,
              Viatico_usd int
          );
          
          INSERT INTO Viajes
              (Cod_origen, Cod_destino, Fecha, Placa_veh, Placa_cava, Precinto, Nombre_ayudante, Cedula_ayudante, Observaciones, Viatico_chofer, Viatico_ayudante, Estatus, Tipoviaje, Bultos, Cedula_chofer, Contenedor, Placa_remolque, Viatico_usd, Precinto2,  Pago_peaje)
          OUTPUT INSERTED.Id_viaje, INSERTED.Viatico_chofer, INSERTED.Cod_destino, INSERTED.Fecha, INSERTED.Cedula_chofer, INSERTED.Viatico_usd INTO @MyTableVar
          VALUES ( ${datos.Origen} , ${datos.Sede}, '${datos.Fecha_req}', '${datos.Placa_veh}', '${datos.Placa_cava || '' }', '${datos.Precinto}', '${datos.Ayudante || ''}', ${datos.Cedula_ayu || 'NULL'}, '${datos.Observaciones}', ${datos.Viatico},${datos.Viatico_ayu || 'NULL'}, 1, ${datos.Destino}, ${datos.Bultos || 0}, ${datos.Cedula_chofer} , '${datos.Contenedor || ''}' , '${datos.Placa_remolque || ''}', ${datos.Viatico_usd2}, '${datos.Precinto2 || ''}',  ${datos.Peaje});
          -- Ahora puedes usar los valores en @MyTableVar para tu segunda consulta
          INSERT INTO Comprobante_viajes (Codigo_viaje, Origen, Fecha, Cedula)
          SELECT Id_viaje, Sede, Fecha, Cedula_chofer FROM @MyTableVar;
    
    
    
    COMMIT;
        
    
    Update Empleados set estatus =2 where Cedula = ${datos.Cedula_chofer} or Cedula = '${datos.Cedula_ayu}';
    Update Vehiculos set Ubicacion =2 where Placa ='${datos.Placa_veh}' or Placa ='${datos.Placa_cava}' or Placa ='${datos.Placa_remolque}';
          `;
    
          const result20 = await pool.request()
          .query(`SELECT Dias FROM Tabladeviaticos WHERE Destino = ${datos.Sede}`);
          
          let diasEsperados = result20.recordset[0].Dias;
    
      
          const sqlQuery2 = `SELECT MAX(Num_comprobante) AS UltimoComprobante FROM Comprobante_viajes`;
          const result2 = await pool.request().query(sqlQuery2)
          const result = await pool.request().query(sqlQuery);
    
          const sqlQuery3 = `SELECT MAX(Id_viaje) AS id_viaje FROM viajes where Cedula_chofer = ${datos.Cedula_chofer}`;
          const result3 = await pool.request().query(sqlQuery3)
    
    
          // Aquí tienes el número de comprobante
          const id_viaje = result3.recordset[0].id_viaje;
          const numeroComprobante2 = result2.recordset[0].UltimoComprobante + 1 ;
    
    
    
          const sqlQuery5 = `Select Sedes.Sede as Destino , Tiposede.Tiposede as Tipo from Viajes, Sedes, Tiposede  where id_viaje = '${id_viaje}' and Viajes.Cod_destino = Sedes.Codigo and Sedes.Tiposede = Tiposede.Id`;
          const result5 = await pool.request().query(sqlQuery5)
          const Destino2 = result5.recordset[0].Destino
          const tipo2 = result5.recordset[0].Tipo;
    
          const montoComprobanteAdicionales = 15 * datos.Tasa;
          const montoUsd = 15;
    
    
    
          let totalMonto = 0;
       
      
        if(diasEsperados > 1){
          totalMonto = montoComprobanteAdicionales * (diasEsperados - 1);
          totalMontoUsd = montoUsd * (diasEsperados - 1);
          console.log('insert2')
          await pool.request()
              .input('Codigo_viaje', sql.Int, id_viaje)
              .input('Fecha', sql.DateTime, datos.Fecha_req)
              .input('Origen', sql.Int, datos.Sede)
              .input('Cedula', sql.Int, datos.Cedula_chofer)
              .input('Monto', sql.Float, totalMonto) 
              .input('Beneficiario', sql.NVarChar,  datos.Nombre)
              .input('Monto_Usd', sql.Float, totalMontoUsd)
              .query(`INSERT INTO Comprobante_viajes (Codigo_viaje, Fecha, Origen, Descripcion, Monto, Beneficiario, Cedula, Tipocomprobante, Monto_Usd) VALUES (@Codigo_viaje, @Fecha, @Origen, CONCAT('Pago de comida por viaje a ${tipo2} ', (SELECT Sede FROM Sedes WHERE Codigo = @Origen)), @Monto, @Beneficiario, @Cedula, '2', @Monto_Usd)`);
          console.log('insert');
        }
    
    
          let real2 = parseInt(datos.real) + parseInt(totalMonto)
    
    
          console.log(numeroComprobante2)
    
    
          const sqlQuery4 = `Update comprobante_viajes set Beneficiario = '${datos.Nombre}', descripcion = 'Pago de medio viatico a   ${Destino2}', Tipocomprobante = 1, Monto = ${datos.Viatico}, Monto_Usd = ${datos.Viatico_usd2} where num_comprobante = '${numeroComprobante2}'`;
          const result4 = await pool.request().query(sqlQuery4);
          console.log('Registro agregado a la base de datos:', result4);
    
          const sqlQuery6 = `Insert into Cambio_estatusviaje (Codigo_viaje, Codigo_estado, Sede, Fecha, Bultos ) Values (${id_viaje}, 1, ${datos.Sede}, '${datos.Fecha_req}', ${datos.Bultos || 0})`;
          const result6 = await pool.request().query(sqlQuery6);
          console.log('insert1');
          const sqlQuery7 = `Insert into Comprobante_viajes (Codigo_viaje, Descripcion, Fecha, Monto, Beneficiario, Cedula, Tipocomprobante ) Values (${id_viaje}, 'Pago de peaje' ,  '${datos.Fecha_req}', ${datos.Peaje},'${datos.Nombre}', ${datos.Cedula_chofer}, 3 )`;
          const result7 = await pool.request().query(sqlQuery7);
          console.log('insert2');
          const sqlQuery8 = `Insert into Comprobante_viajes (Codigo_viaje, Descripcion, Fecha, Monto, Beneficiario, Cedula, Tipocomprobante ) Values (${id_viaje}, 'Pago total por viaje a ${tipo2}  ${Destino2}' ,  '${datos.Fecha_req}', ${real2} ,'${datos.Nombre}', ${datos.Cedula_chofer}, 10 )`;
          const result8= await pool.request().query(sqlQuery8);
          console.log('insert3');
          const sqlQuery9 = `SELECT MAX(Num_comprobante) AS UltimoComprobante FROM Comprobante_viajes`;
          const result9= await pool.request().query(sqlQuery9)
          console.log('insert4');
          const numeroComprobante = result9.recordset[0].UltimoComprobante 
    
          ipcRenderer.send('viaje');
          return [numeroComprobante, id_viaje];
          
         
      } catch (error) {
    ipcRenderer.send('error', error)  
    console.log(error)
    }
    }
    }

module.exports = generarViaje