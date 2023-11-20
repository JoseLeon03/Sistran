const puppeteer = require('puppeteer');
const { shell } = require('electron');

const obtenerEmpleados= require('./Empleados.js');

async function generarEmpleadosPDF(empleado) {
  const { readFileSync } = require('fs');

  

  // Obtén las sedes de tu base de datos
  // const empleado = await obtenerEmpleados();

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
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de nacimiento</th>
            <th>Edad</th>
            <th>Fecha de ingreso</th>
            <th>Tipo de empleado</th>
  
          </tr>`;

  // Añade cada sede a la tabla
  for (let Empleados of empleado) {
    htmlContent += `
      <tr>
        <td>${Empleados.Cedula_e}</td>
        <td>${Empleados.Nombre_e}</td>
        <td>${Empleados.Apellido_e}</td>
        <td>${Empleados.Fechanacimiento_e}</td>
        <td>${Empleados.Edad_e}</td>
        <td>${Empleados.Fechaingreso_e}</td>
        <td>${Empleados.Tipoempleado_e}</td>

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
  await page.pdf({ path: 'Empleados.pdf', format: 'Letter', 
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: ` <div class="centrado" style="display: flex; background-color: blue; ">

  <img src="data:image/jpeg;base64,${readFileSync('//10.50.1.36/Sistran/ConsorcioLogo.png').toString('base64')   }" alt="alt text" / id="camion" style="margin: 0px 10px"">
  <div style="display:block">
  <h1  style=" font-size: 32px; margin-bottom: 20px" >Consorcio Transporte Los Pinos</h1>

  <h2 style="text-align: center; font-size: 28px; color:blue">Listado de Empleados</h2>
  </div>
  </div>
  `,
  footerTemplate: '<div style="font-size:10px; margin-left:1cm;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></div>',
  margin: {
    top: '200px',
    bottom: '2cm'
  } });

  await browser.close();
  shell.openPath('Empleados.pdf');
}

module.exports = generarEmpleadosPDF