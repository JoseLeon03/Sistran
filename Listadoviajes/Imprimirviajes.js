const puppeteer = require('puppeteer');
const { shell } = require('electron');


const obtenerListados = require('./Listadoviajes.js');


const generarPDF = async (listadoFiltrado) => {
    // Aplica el filtro a la lista de viajes
    const { readFileSync } = require('fs');



    let htmlContent = `
    <html>
        <body>
        <style>
        body{
            width: 840px;
            padding: 0px 25px;
            font-size: 12px
        }
        
            table {
           
                width: 100%;
                border-collapse: collapse;
               
            }
            th, td {
             
                padding: 6px;
                text-align: left;
                font-size:14px
            }
            hr{
  
                border: 1px solid black;
            }
            th {
                background-color: #f2f2f2;
                white-space: nowrap;
            }
          
    
        </style>
        `;


let totalViaticosUsd = 0;
let totalViaticosBs  = 0;
let totalGastosBs    = 0;
let totalGastosUsd   = 0;
let totalpeaje       = 0;
let totalViajes      = 0;
let viaticosPorChofer = {};

for (let viaje of listadoFiltrado) {
    if (!viaticosPorChofer[viaje.Cedula_v]) {
        viaticosPorChofer[viaje.Cedula_v] = {
            nombre: `${viaje.Nombre_v} ${viaje.Apellido_v}`,
            viaticosUsd: 0,
            viaticosBs: 0,
            gastosUsd: 0,
            gastosBs: 0,
            peaje: 0,
            viajes: [],
            contadorViajes: 0
        };
    }

    viaticosPorChofer[viaje.Cedula_v].viajes.push({origen: viaje.Sede1_v, destino: viaje.Sede2_v, viaticosUsd: viaje.MontoUSD_v, viaticosBs: viaje.Monto_v, peaje: viaje.Peaje, gastosUsd: viaje.GastosUsd, gastosBs: viaje.GastosBs, fecha: viaje.Fecha_v, fecha2: viaje.Fecha_v2 });
    viaticosPorChofer[viaje.Cedula_v].viaticosUsd += viaje.MontoUSD_v;
    viaticosPorChofer[viaje.Cedula_v].viaticosBs += viaje.Monto_v;
    viaticosPorChofer[viaje.Cedula_v].gastosUsd += viaje.GastosUsd;
    viaticosPorChofer[viaje.Cedula_v].gastosBs += viaje.GastosBs;
    viaticosPorChofer[viaje.Cedula_v].peaje += viaje.Peaje;
    viaticosPorChofer[viaje.Cedula_v].contadorViajes++;
    totalViaticosUsd += viaje.MontoUSD_v;
    totalViaticosBs += viaje.Monto_v;
    totalGastosUsd  += viaje.GastosUsd;
    totalGastosBs  += viaje.GastosBs;
    totalpeaje += viaje.Peaje;
    totalViajes++;
}

for (let cedula in viaticosPorChofer) {
    let chofer = viaticosPorChofer[cedula];
    htmlContent += `<h3>${chofer.nombre} (${cedula}) - Total de viajes: ${chofer.contadorViajes}</h3>`;
    htmlContent += `
        <table>
            <tr>
                <th>Salida</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Viáticos USD</th>
                <th>Viáticos BS</th>
                <th>Otros gastos Usd</th>
                <th>Otros gastos Bs</th>
                <th>Gastos por peaje</th>
                <th>Llegada</th>

            </tr>`;
    for (let viaje of chofer.viajes) {
        htmlContent += `
            <tr>
                <td>${viaje.fecha}</td>
                <td>${viaje.origen}</td>
                <td>${viaje.destino}</td>
                <td>${viaje.viaticosUsd}</td>
                <td>${viaje.viaticosBs}</td>
                <td>${viaje.gastosUsd}</td>
                <td>${viaje.gastosBs}</td>
                <td>${viaje.peaje}</td>
                <td>${viaje.fecha2}</td>

            </tr>`;
    }
  
    // for (let chofer of chofer.viajes) {
        htmlContent += `
                <tr>
                    <td></td>
                    <td></td>
                    <td>SUBTOTAL</td>
                    <td>${chofer.viaticosUsd} $</td>
                    <td>${chofer.viaticosBs} Bs</td>
                    <td>${chofer.gastosUsd} $</td>
                    <td>${chofer.gastosBs} Bs</td>
                    <td>${chofer.peaje} Bs</td>
        
                </tr>
           `;
    // }
        

    htmlContent += `</table>`;
    // htmlContent += `<p>Total de viáticos en USD para ${chofer.nombre}: ${chofer.viaticosUsd} $</p>`;
    // htmlContent += `<p>Total de viáticos en BS para ${chofer.nombre}: ${chofer.viaticosBs}${chofer.viaticosBs} Bs </p>`;
    // htmlContent += `<p>Total de otros gastos en USD para ${chofer.nombre}: ${chofer.gastosUsd} $</p>`;
    // htmlContent += `<p>Total de otros gastos en BS para ${chofer.nombre}: ${chofer.gastosBs} Bs</p>`;
    // htmlContent += `<p>Total de gastos por peaje para ${chofer.nombre}: ${chofer.peaje} Bs</p>`;
    htmlContent += `<hr>`;

}
htmlContent += `<div style="page-break-before: always;"></div>`;
htmlContent += `<h2 style="text-align: center;">TOTAL GENERAL</h2>`;
htmlContent += `<hr>`;
htmlContent += `<h3 >Total general de viáticos en USD: ${totalViaticosUsd} $</h3>`;
htmlContent += `<h3>Total general de viáticos en BS: ${totalViaticosBs} Bs</h3>`;
htmlContent += `<h3>Total general de otros gastos en USD: ${totalGastosUsd} $</h3>`;
htmlContent += `<h3>Total general de otros gastos en BS: ${totalGastosBs} Bs</h3>`;
htmlContent += `<h3>Total general de gastos por peaje : ${totalpeaje} Bs</h3>`;
htmlContent += `<h3>Total general de viajes: ${totalViajes}</h3>`;

htmlContent += `</body>
</html>`;

    const browser = await puppeteer.launch();
  const page = await browser.newPage();
    page.setCacheEnabled(false);
  // Carga tu plantilla HTML
  await page.setContent(htmlContent);  

//   await page.addStyleTag({path: './.css'});  

  // Genera el PDF
  const pdfPath = 'Viajes.pdf';
  await page.pdf({ path: pdfPath, format: 'Letter', 
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: ` <div class="centrado" style="display: flex;  ">

  <img src="data:image/jpeg;base64,${readFileSync('//10.50.1.36/Sistran/ConsorcioLogo.png').toString('base64')   }" alt="alt text" / id="camion" style="margin: 0px 50px"">
  <div style="display:block">
  <h1  style=" font-size: 24px; margin-bottom: 15px" >Consorcio Transporte Los Pinos</h1>

  <h2 style="text-align: center; font-size: 16px; color:blue">Listado de viajes</h2>
  </div>
  </div>
  `,
  footerTemplate: '<div style="font-size:10px; margin-left:1cm;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>',
  margin: {
    top: '120px',
    bottom: '2cm'
  } });

  await browser.close();

  // Abre el PDF con el lector de PDF predeterminado del sistema
  shell.openPath(pdfPath);
}

module.exports = generarPDF;