
const puppeteer = require('puppeteer');

const { shell } = require('electron');

const generarComprobante = async (numeroComprobante , Fecha_req) => {
  const { readFileSync } = require('fs');


  const pool = await consultar;

  const result = await pool.request().query(`SELECT * , Format (Fecha , 'dd/MM/yyyy') as Fecha_ FROM comprobante_viajes where num_comprobante = ${numeroComprobante}`);

    console.log(numeroComprobante);
  const comprobante   = result.recordset[0];
  const Fecha         = comprobante.Fecha_;
  const Descripcion   = comprobante.Descripcion
  const Nombre        = comprobante.Beneficiario;
  const Cedula_chofer = comprobante.Cedula;
  const Viatico       = comprobante.Monto;

//   var fecha_array = Fecha_req.split("-"); // Devuelve ["30", "08", "2023"]
//   var fecha_iso = fecha_array.reverse().join("/"); 
// const result1 = Fecha_req.toLocaleDateString('en-GB');







  // Crea tu plantilla HTML
  let html = ` <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <link rel="stylesheet" type="text/css" href="Plantillacomprobante.css">
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
  <h3>ORIGINAL COMPROBANTE DE PAGO</h3>
  
  <div class="numeroFecha">
      <div>
  <label for="">Numero</label>
  <span>${numeroComprobante}</span>
  </div>
  <div>
  <label for="">Fecha</label>
  <span>${Fecha}</span>
  </div>
  </div>
  
  <div class="cuadro">
  <table>
  
      <thead>
      <tr>
          <th id="nombreBeneficiario">Nombre del beneficiario</th>
          <th id="cedula">Cedula</th>
          <th id="monto">Monto. Bs</th>
      </tr>
  </thead>
      <tr>
          <td class="borde">${Nombre}</td>
          <td class="borde">${Cedula_chofer}</td>
          <td>${Viatico}</td>
      </tr>
  
  </table>
  <table>
  <tr><td id="concepto">Concepto</td></tr></table>
  <div id="textoConcepto">
  <p>${Descripcion}</p>
  <div id="fechaViaje">
  <label for="">Fecha de viaje  </label> <span>${Fecha_req}</span>
  </div>
  </div>
  
  <table>
      <thead>
      <tr><th class="autorizado" id="recibiConforme">Recibí conforme</th>
     <th class="autorizado">Autorizado por</th></tr>
  </thead>
  </table>
  <div class="autorizadoFoot">
      <div id="recibi">
          <hr>
  <label for="">Firma beneficiario</label>
  </div>
  <div id="autorizadoPor">
      <hr>
      <label for="">Firma y sello de la empresa</label>
  </div>
  
  </div>
  
  </div>
  
  <hr class="division">
  
  <div class="centrado">
  <img src="data:image/jpeg;base64,${
      readFileSync('//10.50.1.36/Sistran/ConsorcioLogo.png').toString('base64')
    }" alt="alt text" / id="camion">
      
      <h1>Consorcio Transporte Los Pinos</h1>
      
      
      </div>
      <h3>COPIA COMPROBANTE DE PAGO</h3>
      <div class="numeroFecha">
          <div>
      <label for="">Numero</label>
      <span>${numeroComprobante}</span>
      </div>
      <div>
      <label for="">Fecha</label>
      <span>${Fecha}</span>
      </div>
      </div>
  <div class="cuadro">
      <table>
      
          <thead>
          <tr>
              <th id="nombreBeneficiario">Nombre del beneficiario</th>
              <th id="cedula">Cedula</th>
              <th id="monto">Monto. Bs</th>
          </tr>
      </thead>
          <tr>
              <td class="borde">${Nombre}</td>
              <td class="borde">${Cedula_chofer}</td>
              <td>${Viatico}</td>
          </tr>
      
      </table>
      <table>
      <tr><td id="concepto">Concepto</td></tr></table>
      <div id="textoConcepto">
      <p>${Descripcion}</p>
      <div id="fechaViaje">
      <label for="">Fecha de viaje  </label> <span>${Fecha_req}</span>
      </div>
      </div>
      
      <table>
          <thead>
          <tr><th class="autorizado" id="recibiConforme">Recibí conforme</th>
         <th class="autorizado">Autorizado por</th></tr>
      </thead>
      </table>
      <div class="autorizadoFoot">
          <div id="recibi">
              <hr>
      <label for="">Firma beneficiario</label>
      </div>
      <div id="autorizadoPor">
          <hr>
          <label for="">Firma y sello de la empresa</label>
      </div>
      
      </div>
      
      </div>
  
  
  </body>
  </html>
  
      `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Carga tu plantilla HTML
  await page.setContent(html);  

  await page.addStyleTag({path: '//10.50.1.36/Sistran/css/Plantillacomprobante.css'});  

  const fecha = '28/08/2023'
  // Genera el PDF
  const pdfPath = 'Comprobantes.pdf';
  await page.pdf({ path: pdfPath, format: 'Letter', printBackground: true });

  await browser.close();

  // Abre el PDF con el lector de PDF predeterminado del sistema
  shell.openPath(pdfPath);
};

module.exports = generarComprobante;