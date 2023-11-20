
const puppeteer = require('puppeteer');

const { shell } = require('electron');
const obtenerCavas = require('./ReqCavaAlmacen.js');



// Placa_c, Tipo, Ubicacion, Destino, Marca, Modelo, Estatus, Observaciones
const generarCavaalmacen = async (Placa) => {


    const pool = await consultar;

    const result = await pool.request().query(`SELECT  Sedes.Sede as Destino, Tipovehiculo.Tipo, Marca.Marca, Modelo.Modelo, Estatusvehiculo.Estatusvehiculo as Ubicacion, Estadocontrol.Estadocontrol as Estatus, Observacion from Vehiculos, Sedes, Tipovehiculo, Marca, Modelo, Estadocontrol, Estatusvehiculo where placa  = '${Placa}'  and Vehiculos.destino = Sedes.Codigo AND Vehiculos.Tipovehiculo = Tipovehiculo.Id and Vehiculos.Modelo = Modelo.Id  AND Vehiculos.Marca = Marca.Id and Vehiculos.Ubicacion = Estatusvehiculo.Id and Vehiculos.Estadocontrol = Estadocontrol.Id `);
  
    const Vehiculo = result.recordset[0];
  
  
  
    const Observaciones = Vehiculo.Observacion;
    const Tipo = Vehiculo.Tipo
    const Marca = Vehiculo.Marca;
    const Modelo = Vehiculo.Modelo;
    const Ubicacion = Vehiculo.Ubicacion;
    const Estatus = Vehiculo.Estatus;
    const Destino = Vehiculo.Destino;
  
  
    var today = new Date();
 
    // obtener la fecha de hoy en formato `MM/DD/YYYY`
    var now = today.toLocaleDateString('es-ES');
    console.log(now);
     
   



    // console.log(Cavas.Placa)
    // const generarCavaalmacen =   async (Cavas)  => {
  const { readFileSync } = require('fs');

  // Crea tu plantilla HTML
  let html = ` <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" type="text/css" href="PlantillaAutorizacioncava.css">
      <title>Document</title>
  </head>
  <body>
  
      <div class="centrado">
      <img src="data:image/jpeg;base64,${
        readFileSync('//10.50.1.36/Sistran/ConsorcioLogo.png').toString('base64')
      }" alt="alt text" / id="camion">          
          <h1>Consorcio Transporte Los Pinos</h1>
          
          
          </div>
          
          <h3 class="titulo">ORIGINAL AUTORIZACION PARA CARGAR CAVA</h3>
           
         
   
          <br>
          <br>
          <label for="">Fecha</label>
          <span>${now}</span>
          
          <div class="descripcion">
          <p >Por medio de la presente se Autoriza cargar cava con la siguiente descripción:</p>
          </div>
  
          <div class="tablas">
              <div>
              <table>
                  <tr>
                      <td class="caja">Placa:</td>
                      <td><span id="placaCava">${Placa}</span></td>
                  </tr>
                  <tr>
                      <td class="caja">Tipo:</td>
                      <td><span id="tipoCava">${Tipo}</span></td>
  
                  </tr>
                  <tr>
                      <td class="caja">Modelo:</td>
                      <td><span id="modeloCava">${Modelo}</span></td>
                  </tr>
                  <tr>
                      <td class="caja">Marca:</td>
                      <td><span id="marcaCava">${Marca}</span></td>
  
                  </tr>
                  <tr>
                      <td class="caja">Destino:</td>
                      <td><span id="destinoCava">${Destino}</span></td>
  
                  </tr>
              </table>
              </div>  
  
              <div>
              <table>
                  <tr>
                      <td class="caja">Ubicación:</td>
                      <td><span id="placaCava">${Ubicacion}</span></td>
                  </tr>
                  <tr>
                      <td class="caja">Estatus:</td>
                      <td><span id="tipoCava">${Estatus}</span></td>
  
                  </tr>
                  <tr>
                      <td class="caja2">Observación:</td>
                      <td><div class="observacion"><p>${Observaciones}</p></div></td>
                      
                  </tr>
                  <tr class="firma">
                      <td >Autorizado por:</td>
                      <td><hr></td>
  
                  </tr>
                 
              </table>
              </div>
             
  
          </div>
           <hr class="division">
           
      <div class="centrado">
      <img src="data:image/jpeg;base64,${
        readFileSync('//10.50.1.36/Sistran/ConsorcioLogo.png').toString('base64')
      }" alt="alt text" / id="camion">          
          <h1>Consorcio Transporte Los Pinos</h1>
          
          
          </div>
          
          <h3 class="titulo">COPIA AUTORIZACION PARA CARGAR CAVA</h3>
          
        
              
         
  
          <br>
          <br>
          <label for="">Fecha</label>
          <span>${now}</span>
          
          <div class="descripcion">
          <p >Por medio de la presente se Autoriza cargar cava con la siguiente descripción:</p>
          </div>
  
          <div class="tablas">
              <div>
              <table>
                  <tr>
                      <td class="caja">Placa:</td>
                      <td><span id="placaCava">${Placa}</span></td>
                  </tr>
                  <tr>
                      <td class="caja">Tipo:</td>
                      <td><span id="tipoCava">${Tipo}</span></td>
  
                  </tr>
                  <tr>
                      <td class="caja">Modelo:</td>
                      <td><span id="modeloCava">${Modelo}</span></td>
                  </tr>
                  <tr>
                      <td class="caja">Marca:</td>
                      <td><span id="marcaCava">${Marca}</span></td>
  
                  </tr>
                  <tr>
                      <td class="caja">Destino:</td>
                      <td><span id="destinoCava">${Destino}</span></td>
  
                  </tr>
              </table>
              </div>  
  
              <div>
              <table>
                  <tr>
                      <td class="caja">Ubicación:</td>
                      <td><span id="placaCava">${Ubicacion}</span></td>
                  </tr>
                  <tr>
                      <td class="caja">Estatus:</td>
                      <td><span id="tipoCava">${Estatus}</span></td>
  
                  </tr>
                  <tr>
                      <td class="caja2">Observación:</td>
                      <td><div class="observacion"><p>${Observaciones}</p></div></td>
                      
                  </tr>
                  <tr class="firma">
                      <td >Autorizado por:</td>
                      <td><hr></td>
  
                  </tr>
                 
              </table>
              </div>
             
  
          </div>
  </body>
  </html>
  
      `;

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Carga tu plantilla HTML
  await page.setContent(html);  

  await page.addStyleTag({path: '//10.50.1.36/Sistran/css/PlantillaAutorizacioncava.css'});  

  // Genera el PDF
  const pdfPath = 'Salida.pdf';
  await page.pdf({ path: pdfPath, format: 'Letter', printBackground: true });

  await browser.close();

  // Abre el PDF con el lector de PDF predeterminado del sistema
  shell.openPath(pdfPath);
};

module.exports = generarCavaalmacen;