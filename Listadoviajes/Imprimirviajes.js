const puppeteer = require('puppeteer');
const { shell } = require('electron');


const obtenerListados = require('./Listadoviajes.js');

// var input1 = document.getElementById("cedula");
// var input2 = document.querySelector('#placaVehiculo');
// var input3 = document.querySelector('#placaCava');
// var input4 = document.querySelector('#placaRemolque');
// var input5 = document.querySelector('#inp_ayudante');
// var inputFechaAnterior = document.querySelector('#fechaAnterior');
// var inputFechaPosterior = document.querySelector('#fechaPosterior');

const generarPDF = async (listadoFiltrado) => {
    // Aplica el filtro a la lista de viajes
    const { readFileSync } = require('fs');



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
        `;


let totalViaticosUsd = 0;
let totalViaticosBs = 0;
let totalViajes = 0;
let viaticosPorChofer = {};

for (let viaje of listadoFiltrado) {
    if (!viaticosPorChofer[viaje.Cedula_v]) {
        viaticosPorChofer[viaje.Cedula_v] = {
            nombre: `${viaje.Nombre_v} ${viaje.Apellido_v}`,
            viaticosUsd: 0,
            viaticosBs: 0,
            viajes: [],
            contadorViajes: 0
        };
    }

    viaticosPorChofer[viaje.Cedula_v].viajes.push({origen: viaje.Sede1_v, destino: viaje.Sede2_v, viaticosUsd: viaje.ViaticoUsd, viaticosBs: viaje.ViaticoBs});
    viaticosPorChofer[viaje.Cedula_v].viaticosUsd += viaje.ViaticoUsd;
    viaticosPorChofer[viaje.Cedula_v].viaticosBs += viaje.ViaticoBs;
    viaticosPorChofer[viaje.Cedula_v].contadorViajes++;
    totalViaticosUsd += viaje.ViaticoUsd;
    totalViaticosBs += viaje.ViaticoBs;
    totalViajes++;
}

for (let cedula in viaticosPorChofer) {
    let chofer = viaticosPorChofer[cedula];
    htmlContent += `<h2>${chofer.nombre} (${cedula}) - Total de viajes: ${chofer.contadorViajes}</h2>`;
    htmlContent += `
        <table>
            <tr>
                <th>Origen</th>
                <th>Destino</th>
                <th>Viáticos USD</th>
                <th>Viáticos BS</th>
            </tr>`;
    for (let viaje of chofer.viajes) {
        htmlContent += `
            <tr>
                <td>${viaje.origen}</td>
                <td>${viaje.destino}</td>
                <td>${viaje.viaticosUsd}</td>
                <td>${viaje.viaticosBs}</td>
            </tr>`;
    }
    htmlContent += `</table>`;
    htmlContent += `<p>Total de viáticos en USD para ${chofer.nombre}: ${chofer.viaticosUsd}</p>`;
    htmlContent += `<p>Total de viáticos en BS para ${chofer.nombre}: ${chofer.viaticosBs}</p>`;
    htmlContent += `<hr>`;

}

htmlContent += `<h2>Total general de viáticos en USD: ${totalViaticosUsd}</h2>`;
htmlContent += `<h2>Total general de viáticos en BS: ${totalViaticosBs}</h2>`;
htmlContent += `<h2>Total general de viajes: ${totalViajes}</h2>`;

htmlContent += `</body>
</html>`;

    const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Carga tu plantilla HTML
  await page.setContent(htmlContent);  

//   await page.addStyleTag({path: './.css'});  

  // Genera el PDF
  const pdfPath = 'Viajes.pdf';
  await page.pdf({ path: pdfPath, format: 'A4', 
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: ` <div class="centrado" style="display: flex; background-color: blue; ">

  <img src="data:image/jpeg;base64,${readFileSync('ConsorcioLogo.png').toString('base64')   }" alt="alt text" / id="camion" style="margin: 0px 10px"">
  <div style="display:block">
  <h1  style=" font-size: 26px; margin-bottom: 20px" >Consorcio Transporte Los Pinos</h1>

  <h2 style="text-align: center; font-size: 22px; color:blue">Listado de viajes</h2>
  </div>
  </div>
  `,
  footerTemplate: '<div style="font-size:10px; margin-left:1cm;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>',
  margin: {
    top: '200px',
    bottom: '2cm'
  } });

  await browser.close();

  // Abre el PDF con el lector de PDF predeterminado del sistema
  shell.openPath(pdfPath);
}

module.exports = generarPDF;