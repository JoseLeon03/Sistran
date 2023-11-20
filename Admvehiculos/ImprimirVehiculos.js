const puppeteer = require('puppeteer');
const { shell } = require('electron');

const obtenerVechiculos= require('./Admvehiculos.js');

async function generarVehiculosPDF(vehiculos) {
  const { readFileSync } = require('fs');

  

  // Obtén las sedes de tu base de datos
  // const vehiculo = await obtenerVechiculos();

  // Crea el contenido HTML de tu PDF
  let htmlContent = `



    <html>
      <body>
      <style>
      body{
          width: 700px;
          padding: 0px 50px;
      }
      
          table {
              width: 100%;
              border-collapse: collapse;
          }
          th, td {
           
              padding: 8px;
              text-align: left;
          }
          hr{
              border: 1px solid black;
          }
          th {
              background-color: #f2f2f2;
          }
        
    
      </style>
        <table>
          <tr>
            <th>Placa</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Tipo</th>
            <th>Año</th>
            <th>Propietario</th>
            <th>Observacion</th>
  
          </tr>`;

  // Añade cada sede a la tabla
  for (let Vehiculoss of vehiculos) {
    htmlContent += `
      <tr>
        <td>${Vehiculoss.Placa_v}</td>
        <td>${Vehiculoss.Marca_v}</td>
        <td>${Vehiculoss.Modelo_v}</td>
        <td>${Vehiculoss.Tipo_v}</td>
        <td>${Vehiculoss.Año_v}</td>
        <td>${Vehiculoss.Propietario_v}</td>
        <td>${Vehiculoss.Observacion_v}</td>

      </tr>`;
  }

  htmlContent += `
        </table>
      </body>
    </html>`;

    const browser = await puppeteer.launch();
  const page = await browser.newPage();
  // Carga tu contenido HTML en la página
  await page.setContent(htmlContent);

  // Genera el PDF
  await page.pdf({ path: 'Vehiculos.pdf', format: 'Letter', 
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: ` <div class="centrado" style="display: flex; background-color: blue; ">

  <img src="data:image/jpeg;base64,${readFileSync('//10.50.1.36/Sistran/ConsorcioLogo.png').toString('base64')   }" alt="alt text" / id="camion" style="margin: 0px 10px"">
  <div style="display:block">
  <h1  style=" font-size: 32px; margin-bottom: 20px" >Consorcio Transporte Los Pinos</h1>

  <h2 style="text-align: center; font-size: 28px; color:blue">Listado de Vehiculos</h2>
  </div>
  </div>
  `,
  footerTemplate: '<div style="font-size:10px; margin-left:1cm;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>',
  margin: {
    top: '200px',
    bottom: '2cm'
  } });

  await browser.close();
  shell.openPath('Vehiculos.pdf');
}

module.exports = generarVehiculosPDF