const {consultar, config} = require ('../Promise')

const puppeteer = require('puppeteer');

const { shell } = require('electron');

const generarBitacora= async ({id_viaje, Cedula_chofer}) => {
  const { readFileSync } = require('fs');

  const pool = await consultar;

  const result = await pool.request().query(`select cedula_chofer, Empleados.Nombre +' '+ Empleados.Apellido as nombre , placa_veh, placa_cava, placa_remolque from Viajes, Empleados where id_viaje = ${id_viaje}  and cedula = ${Cedula_chofer}`);

  const datos = result.recordset[0];

  const cedula = datos.cedula_chofer;
  const Empleado = datos.nombre;
  const Placa_vehiculo = datos.placa_veh;
  const Placa_Cava = datos.placa_cava;
  const Placa_Remolque = datos.placa_remolque


  // Crea tu plantilla HTML
  let html = ` <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" type="text/css" href="PlantillaBitacora.css">
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
  <h2 class="titulo">Bitacora de Vehiculo</h2>
  
  <fieldset>
  <div id="tablas">
      <table>
          <tr>
              <td><label for="" class="datos">Datos Personales</label></td>
          </tr>
          <tr>
              <td><label for="">Nombre y Apellido: </label></td>
              <td><span>${Empleado}</span></td>
          </tr>
          <tr>
             <td><label for="">Cedula: </label></td>
             <td><span>${cedula}</span></td> 
          </tr>
      </table>
  
      <table>
          <tr>
              <td><label for="" class="datos">Datos Vehiculo</label></td>
          </tr>
          <tr>
              <td><label for="">Placa Chuto: </label></td>
              <td><span>${Placa_vehiculo}</span></td>
          </tr>
          <tr>
             <td><label for="">Placa Cava: </label></td>
             <td><span>${Placa_Cava}</span></td> 
          </tr>
          <tr>
              <td><label for="">Placa Remolque: </label></td>
              <td><span>${Placa_Remolque}</span></td> 
           </tr>
      </table>
  
  </div>
  
  </fieldset>
  
  <fieldset>
      <Label>REPORTE DE FALLAS POR CONDUCTOR:</Label>
      <hr class="lineas">
      <hr class="lineas">
      <hr class="lineas">
      <hr class="lineas">
  
      <div id=" firmaConductor" class="divFirmas">
          <hr class="Firma">
          <label for="" style="margin-left: 25px;">Fecha/Firma Conductor</label>
      </div>
  </fieldset>
  
  <fieldset>
      <Label>DIAGNOSTICO DE FALLAS REPORTADO POR AUXILIAR SUPERVISOR:</Label>
      <hr class="lineas">
      <hr class="lineas">
      <hr class="lineas">
      <hr class="lineas">
  
      <div id=" firmaConductor" class="divFirmas">
          <hr class="Firma">
          <label for="">Fecha/Firma Auxiliar Supervisor</label>
      </div>
  </fieldset>
  <fieldset id="materiales">
      <table id="tablaMateriales">
          <label id="materialesTitulo" for="" >MATERIALES EMPLEADOS EN REPARACIÓN</label>
          <thead>
              <th id="fila1">CANTIDAD</th>
              <th id="fila2">CODIGO</th>
              <th id="fila3">DESCRIPCIÓN</th>
              <th id="fila4">FIRMA</th>
  
          </thead>
          <tbody>
            

              
              <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              </tr>
  
              <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              </tr>
  
                  
              <tr>
  
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
  
                  </tr>
  
                      
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  </tr>
  
                      
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  </tr>
  
                      
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  </tr>
  
                      
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  </tr>
  
                      
              <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
              </tr>
  
          </tbody>
      </table>
      
  </fieldset>
  <div id=" firmaConductor" class="divFirmas">
      <hr class="Firma">
      <label for="" style="margin-left: 22px;">Fecha/Firma  Supervisor</label>
  </div>
  
  
  </body>
  </html>
  
  
      `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Carga tu plantilla HTML
  await page.setContent(html);  

  await page.addStyleTag({path: '//10.50.1.36/Sistran/css/PlantillaBitacora.css'});  

  // Genera el PDF
  const pdfPath = 'Bitacora.pdf';
  await page.pdf({ path: pdfPath, format: 'Letter', printBackground: true });

  await browser.close();

  // Abre el PDF con el lector de PDF predeterminado del sistema
  shell.openPath(pdfPath);
};

module.exports = generarBitacora;