const {consultar, config} = require ('../Promise')

const puppeteer = require('puppeteer');

const { shell } = require('electron');

const generarDespacho = async ({id_viaje}) => {
  const { readFileSync } = require('fs');

  const pool = await consultar;

  const result = await pool.request().query(`SELECT *, Sedes.Sede as Destino, Format (Fecha , 'dd/MM/yyyy') as Fecha_  from Viajes, Sedes  where id_viaje = '${id_viaje}'  and Viajes.Cod_destino = Sedes.Codigo `);

  const viaje = result.recordset[0];

  const Fecha_req = viaje.Fecha_;
  const Mercancia = viaje.Mercancia
  const Contenedor = viaje.Contenedor
  const Cedula_chofer = viaje.Cedula_chofer;
  const Placa_veh = viaje.Placa_veh;
  const Placa_cava = viaje.Placa_cava;
  const Placa_remolque = viaje.Placa_remolque;
  const Precinto = viaje.Precinto;
  const Precinto2 = viaje.Precinto2;
  const Destino = viaje.Destino;






  const result3 = await pool.request().query(` Select Nombre+ ' '  + Apellido as Nombre from Empleados where cedula = ${Cedula_chofer}`);
  const empleado = result3.recordset[0];

 const Nombre = empleado.Nombre






  // Crea tu plantilla HTML
  let html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" type="text/css" href="Despacho.css"> 
  
      <title>Document</title>
  </head>
  <body>
  
      <fieldset>
  
          <div class="space">
  
              <div>
              <img src="data:image/jpeg;base64,${
                readFileSync('//10.50.1.36/Sistran/ConsorcioLogo.png').toString('base64')
              }" alt="alt text" / id="camion">
  
              </div>
  
          <div>
  
          <label for="" style="font-weight: bold;">AUTORIZACION DE DESPACHO</label>
  
          </div>
  
          <div>
              <span>FECHA: ${Fecha_req}</span>
              <br>
              <span>J-30938847-9</span>
          </div>
          
          </div>
          <table>
              <thead>
                  <th>CONDUCTOR</th>
                  <th>N° CEDULA</th>
                  <th>EQUIPO</th>
                  <th>DESTINO</th>
                  <th>MERCANCIA</th>
                  <th>PRECINTOS</th>
                  <th>CONTENEDOR</th>

              </thead>
              
              <tbody>
                  <tr>
                      <td><span>${Nombre}</span></td>
               
                      <td><span>${Cedula_chofer}</span></td>
                
                      <td><span>${Placa_veh}</span><br>
                      <span>${Placa_cava}${Placa_remolque}</span></td>
                  
                      <td><span>${Destino}</span></td>
                 
                      <td><span>${Mercancia}</span></td>
                
                      <td><span>${Precinto}</span><br>
                      <span>${Precinto2}</span></td>

                      <td><span>${Contenedor}</span></td>
                  </tr>
  
              </tbody>
  
          </table>
  
          <div class="space2">
  
              <div>
                  <span>CHEQUEADO POR:</span>
                  <br><br><br><br><br><br>
                  <span>VIGILANCIA</span>
              </div>
  
              <div>
                  <span>AUTORIZADO POR:</span>
                  <br><br><br><br><br><br>
                  <span>TSU. MAIDEN GUERRA</span><br>
                  <span>GERENTE DE TRANSPORTE</span>
              </div>
  
  
          </div>
  
      </fieldset>
  

  </body>
  </html>
  
  
      `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Carga tu plantilla HTML
  await page.setContent(html);  

  await page.addStyleTag({path: '//10.50.1.36/Sistran/css/Despacho.css'});  

  // Genera el PDF
  const pdfPath = 'Despacho.pdf';
  await page.pdf({ path: pdfPath, format: 'Letter', printBackground: true });

  await browser.close();

  // Abre el PDF con el lector de PDF predeterminado del sistema
  shell.openPath(pdfPath);
};

module.exports = generarDespacho;