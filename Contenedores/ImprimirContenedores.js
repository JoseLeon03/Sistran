const puppeteer = require('puppeteer');
const { shell } = require('electron');

const obtenerContenedores = require('./Contenedores.js');

async function generarContenedoresPDF(Contenedores) {

  const { readFileSync } = require('fs');

  

  // Obtén las sedes de tu base de datos
  // const Contenedores = await obtenerContenedores();

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
            <th>Chofer</th>
            <th>Exp</th>
            <th>Contenedor</th>
            <th>F.Req</th>
            <th>F.Recepción</th>
            <th>F.Entrega Lleno</th>
            <th>F.Entrega Vacio</th>
            <th>Importadora</th>
            <th>Destino</th>
            <th>Agente Aduanal</th>
            <th>Puerto origen</th>


          </tr>`;

  // Añade cada sede a la tabla
  for (let Contenedor of Contenedores) {
    htmlContent += `
      <tr>
        <td>${Contenedor.Chofer_c} / ${Contenedor.Chofer2_c}</td>
        <td>${Contenedor.Expediente_c}</td>
        <td>${Contenedor.Contenedor_c}</td>
        <td>${Contenedor.Fecha_c}</td>
        <td>${Contenedor.Fecharecepcion_c}</td>
        <td>${Contenedor.Fechadesc_c}</td>
        <td>${Contenedor.Fechafin_c}</td>
        <td>${Contenedor.Importadora_c}</td>
        <td>${Contenedor.Destino_c}</td>
        <td>${Contenedor.Agente_c}</td>
        <td>${Contenedor.Sede_c}</td>


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
  await page.pdf({ path: 'contenedores.pdf', format: 'Letter', landscape: true,
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: ` <div class="centrado" style="display: flex; background-color: blue; ">

  <img src="data:image/jpeg;base64,${readFileSync('//10.50.1.36/Sistran/ConsorcioLogo.png').toString('base64')   }" alt="alt text" / id="camion" style="margin: 0px 10px"">
  <div style="display:block">
  <h1  style=" font-size: 28px; margin-bottom: 20px" >Consorcio Transporte Los Pinos</h1>

  <h2 style="text-align: center; font-size: 32px; color:blue">Listado de contenedores</h2>
  </div>
  </div>
  `,
  footerTemplate: '<div style="font-size:10px; margin-left:1cm;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>',
  margin: {
    top: '200px',
    bottom: '2cm'
  } });

  await browser.close();
  shell.openPath('contenedores.pdf');
}

module.exports= generarContenedoresPDF