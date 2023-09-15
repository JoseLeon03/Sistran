
const puppeteer = require('puppeteer');

const { shell } = require('electron');

const generarAutorizacion = async ({ Fecha, Cedula, Nombre, Apellido, Placa, Marca, Modelo, Tipo, Año, Propietario  }) => {
  const { readFileSync } = require('fs');

  // Crea tu plantilla HTML
  let html = ` <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="AutorizacionParaconducir.css">
  
  </head>
  <body>
    <div class="centrar">
    <div class="container">
    <img src="data:image/jpeg;base64,${
        readFileSync('//10.50.1.36/Sistran/camionhdhd.jpg').toString('base64')
      }" alt="alt text" / id="camion">
  <div class="centrado"><H1 id="h1">TRANSPORTE 00-04 C.A</H1></div>
  </div>
  
  
  <h2 class="titulo">Autorización para conducir</h2>
  
  <label for="" class="fecha">Fecha: </label>
  <span class="fecha">${Fecha}</span>
  <hr>
  
  <h3>Por medio de la presente se autoriza al ciudadano</h3>
  
    <label for="">Nombre: </label><br>
    <span class="datos">${Nombre} ${Apellido}</span>
  <br><br>
    <label for="">Cédula</label><br>
    <span class="datos">${Cedula}</span>
  
    <h3>A conducir un vehículo de mi propiedad con las siguientes características:</h3>
  </div>
  
  
    <div class="tablas">
     
        <table>
          <tr>
            <td class="caja">Placa</td>
            <td class="caja2"><Span>${Placa}</Span></td>
          </tr>
          <tr>
            <td class="caja">Marca</td>
            <td class="caja2"><Span>${Marca}</Span></td>
          </tr>
          <tr>
            <td class="caja">Modelo</td>
            <td class="caja2"><Span>${Modelo}</Span></td>
          </tr>
          <tr>
            <td class="caja">Tipo</td>
            <td class="caja2"><Span>${Tipo}</Span></td>
          </tr>
          <tr>
            <td class="caja">Año</td>
            <td class="caja2"><Span>${Año}</Span></td>
          </tr>
  
        </table>
     
    </div>
    <div class="centrar">
  
      <h3>Por todo el territorio de la República Bolivariana de Venezuela</h3>
      <hr>
      <p style="font-weight: bold;">Se le agradece a las Autoridades Civiles y Militares prestar la mayor colaboración posible
        al chofer y su ayudante para que puedan lograr el cumplimiento de su objetivo.
      </p>
      <hr>
   <h2>Atentamente: </h2>
  
    <div class="span"><span id="propietario">${Propietario}</span></div>
  
    <div class="cuadrado">Calle 6, Manzana 29, Zona Industrial los Pinos, Puerto Ordaz, Estado Bolivar, Venezuela. Telefono: (0414) 876-67-97 </div>
    <div class="cuadrado"> Carretera Nacional Guacara - Los Guayos, Zona Industrial El Neti Mall Traki. Telefono: (0416) 841-91-76</div>
  
  
    </div>
  
  
  </body>
  </html>
  
  
  
      `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Carga tu plantilla HTML
  await page.setContent(html);  

  await page.addStyleTag({path: '//10.50.1.36/Sistran/css/AutorizacionParaconducir.css'});  

  // Genera el PDF
  const pdfPath = 'Salida.pdf';
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true });

  await browser.close();

  // Abre el PDF con el lector de PDF predeterminado del sistema
  shell.openPath(pdfPath);
};

module.exports = generarAutorizacion;