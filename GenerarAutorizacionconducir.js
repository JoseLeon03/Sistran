const puppeteer = require('puppeteer');
// const open = require('open');


// document.getElementById('prueba').addEventListener('click', async (e) => {
    const generarPDF = async () => {

  const { readFileSync } = require('fs');

    // Define tus variables

    // Crea tu plantilla HTML
    let html = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="AutorizacionParaconducir.css">
    
    </head>
    <body>
      <div class="centrar">
      <div class="container">
      <img src="data:image/jpeg;base64,${
        readFileSync('camionhdhd.png').toString('base64')
      }" alt="alt text" / id="camion">
  
    <div class="centrado"><H1 id="h1">TRANSPORTE 00-04 C.A</H1></div>
    </div>
    
    
    <h2 class="titulo">Autorización para conducir</h2>
    
    <label for="" class="fecha">Fecha: </label>
    <span class="fecha">23/08/2023</span>
    <hr>
    
    <h3>Por medio de la presente se autoriza al ciudadano</h3>
    
      <label for="">Nombre: </label><br>
      <span class="datos">Jose Leon</span>
    <br><br>
      <label for="">Cédula</label><br>
      <span class="datos">30357750</span>
    
      <h3>A conducir un vehículo de mi propiedad con las siguientes características:</h3>
    </div>
    
    
      <div class="tablas">
       
          <table>
            <tr>
              <td class="caja">Placa</td>
              <td class="caja2"><Span>1234567</Span></td>
            </tr>
            <tr>
              <td class="caja">Marca</td>
              <td class="caja2"><Span>Mack</Span></td>
            </tr>
            <tr>
              <td class="caja">Modelo</td>
              <td class="caja2"><Span>Vision</Span></td>
            </tr>
            <tr>
              <td class="caja">Tipo</td>
              <td class="caja2"><Span>Chuto</Span></td>
            </tr>
            <tr>
              <td class="caja">Año</td>
              <td class="caja2"><Span>2015</Span></td>
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
    
      <div class="span"><span id="propietario">IMPORTADORA EL NUEVO DORADO, C.A</span></div>
    
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
    
   

     await page.addStyleTag({path: './AutorizacionParaconducir.css'});  

    // Genera el PDF
    await page.pdf({ path: 'plantilla.pdf', format: 'A4', printBackground: true, });
    

    await browser.close();
};
module.exports = generarPDF;


