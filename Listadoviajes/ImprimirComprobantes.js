const puppeteer = require('puppeteer');
const { shell } = require('electron');

const llenarTablaComprobantes = require('./TablaComprobantes.js');

async function generarListadoComprobantes() {

  const { readFileSync } = require('fs');

  

  // Obtén las sedes de tu base de datos
  const Comprobantes = await llenarTablaComprobantes();

  console.log(Comprobantes)

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
            <th>Código</th>
            <th>Sede</th>
            <th>Tipo de Sede</th>
          </tr>`;

  // Añade cada sede a la tabla
  for (let sede of Comprobantes) {
    htmlContent += `
      <tr>
        <td>${sede.Num_comprobante}</td>
        <td>${sede.Descripcion}</td>
        <td>${sede.Fecha}</td>
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
  await page.pdf({ path: 'sedes.pdf', format: 'Letter', 
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: ` <div class="centrado" style="display: flex; background-color: blue; ">

  <img src="data:image/jpeg;base64,${readFileSync('C:/Users/JLEON/Desktop/Sistran/ConsorcioLogo.jpg').toString('base64')   }" alt="alt text" / id="camion" style="margin: 0px 10px"">
  <div style="display:block">
  <h1  style=" font-size: 26px; margin-bottom: 20px" >Consorcio Transporte Los Pinos</h1>

  <h2 style="text-align: center; font-size: 22px; color:blue">Listado de sedes</h2>
  </div>
  </div>
  `,
  footerTemplate: '<div style="font-size:10px; margin-left:1cm;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>',
  margin: {
    top: '200px',
    bottom: '2cm'
  } });

  await browser.close();
  shell.openPath('sedes.pdf');
}

module.exports= generarListadoComprobantes