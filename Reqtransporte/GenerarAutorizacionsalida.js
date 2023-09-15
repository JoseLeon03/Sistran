const {consultar, config} = require ('../Promise')

const puppeteer = require('puppeteer');

const { shell } = require('electron');

const generarSalida = async ({id_viaje}) => {
  const { readFileSync } = require('fs');

  const pool = await consultar;

  const result = await pool.request().query(`SELECT *, Sedes.Sede as Destino, Format (Fecha , 'dd/MM/yyyy') as Fecha_  from Viajes, Sedes  where id_viaje = '${id_viaje}'  and Viajes.Cod_destino = Sedes.Codigo `);

  const viaje = result.recordset[0];

  const Fecha_req = viaje.Fecha_;


  const Cedula_chofer = viaje.Cedula_chofer;
  const Placa_veh = viaje.Placa_veh;
  const Placa_cava = viaje.Placa_cava;
  const Placa_remolque = viaje.Placa_remolque;
  const Contenedor = viaje.Contenedor;
  const Observaciones = viaje.Observaciones;
  const Precinto = viaje.Precinto;
  const Precinto2 = viaje.Precinto2;
  const Destino = viaje.Destino;

  const result2 = await pool.request().query(` Select Modelo.Modelo from Vehiculos, Modelo where Placa ='${Placa_veh}' and Vehiculos.Modelo = Modelo.id `);

  const result3 = await pool.request().query(` Select Nombre+ ' '  + Apellido as Nombre from Empleados where cedula = ${Cedula_chofer}`);
  const empleado = result3.recordset[0];

  Nombre = empleado.Nombre


  const Vehiculo = result2.recordset[0];


  const modelo = Vehiculo.Modelo;


  // Crea tu plantilla HTML
  let html = ` <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" type="text/css" href="PlantillaAutorizacionsalida.css">
      <script src="https://kit.fontawesome.com/1c9144b004.js" crossorigin="anonymous"></script>  
      <title>Administracion de sedes</title>
  </head>
  <body>
    <div class="centrado">
    <img src="data:image/jpeg;base64,${
        readFileSync('//10.50.1.36/Sistran/ConsorcioLogo.png').toString('base64')
      }" alt="alt text" / id="camion">
  
  <h1>Consorcio Transporte Los Pinos</h1>
  
  
  </div>
  
  <h3 class="titulo">AUTORIZACION DE SALIDA DE VEHICULO</h3>
  
  <div class="numeroFecha">
      <div>
  <h2>Datos de Salida de viaje</h2>
  </div>
  <div>
 
  <br>
  <label for="">Fecha</label>
  <span>${Fecha_req}</span>
  </div>
  </div>
  
  <fieldset>
      <div class="datosConductor">
          <div>
  <h3>Datos del Conductor</h3>
  </div>
  <div class="destino">
  
  <h3 >Destino:</h3>
  <span>${Destino}</span>
  </div>
  </div>
  <table>
      <tr>
          <td><label for="">Nombre y apellido:</label></td>
          <td><span>${Nombre}</span></td>
      </tr>
      <tr>
         <td> <label for="">Cedula:</label></td>
         <td> <span>${Cedula_chofer}</span></td>
      </tr>
  </table>
  </fieldset>
  
  <fieldset>
      
          
  <h3>Datos de Vehículos</h3>
  </div>
  <div class="tablas">
  <div>
  <table>
      <tr>
          <td><label for="">Placa Chuto:</label></td>
          <td><span>${Placa_veh}</span></td>
      </tr>
      <tr>
         <td> <label for="">Modelo:</label></td>
         <td> <span>${modelo}</span></td>
      </tr>
      <tr>
          <td> <label for="">Placa Cava:</label></td>
          <td> <span>${Placa_cava}</span></td>
       </tr>
  </table>
  </div>
  <div>
      <table>
          <tr>
              <td><label for="">Placa de Tara o Batea:</label></td>
              <td><span>${Placa_remolque}</span></td>
          </tr>
          <tr>
             <td> <label for="">Contenedor:</label></td>
             <td> <span>${Contenedor}</span></td>
          </tr>
          <tr>
              <td> <label for="">Fecha de viaje:</label></td>
              <td> <span>${Fecha_req}</span></td>
           </tr>
      </table>
  </div>
  </div>
  </fieldset>
  <div class="datosAbajo" >
          <div>
          <label for="">Observaciones</label>
          <div class="observacionTexto">
          <p>${Observaciones}</p>
          </div>
          </div>
  
          <div class="precinto">
          <label for="">Precinto:</label>
          <span>${Precinto}</span>
      <br><br>
     
          <label for="">Precinto 2:</label>
          <span>${Precinto2}</span>
       </div>
  </div>
  
  
  <div class="datosAbajo">
      <div>
          <label for="">Nombre y apellido:</label>
          <span></span> 
          <br><br>
          <label for="">Cedula:</label>
          <span></span>
      </div>
  
      <div class="firma">
         <hr>
         <div class="labelFirma">
         <label for="">Firma autorizada</label>
         </div>
      </div>
  
    
  </div>
  
  <div class="datosAbajo">
      <div>
      <label for="">Nota: </label>
      <span>En caso de emergencia comunicarse con los siguientes telefonos</span>
      </div>
  
      <div>
          <span>Maiden Guerra: 0414-185-72-90</span>
          <br><br>
          <span>Hector Chacón: 0414-898-57-90</span>
      </div>
  </div>
  
  
  </body>
  </html>
  
  
      `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Carga tu plantilla HTML
  await page.setContent(html);  

  await page.addStyleTag({path: '//10.50.1.36/Sistran/css/PlantillaAutorizacionsalida.css'});  

  // Genera el PDF
  const pdfPath = 'Salida.pdf';
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

  await browser.close();

  // Abre el PDF con el lector de PDF predeterminado del sistema
  shell.openPath(pdfPath);
};

module.exports = generarSalida;