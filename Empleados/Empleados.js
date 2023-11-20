const sql = require('mssql')
const {consultar, config} = require ('../Promise')

const obtenerEmpleados = (conexion) => {
    const request = new sql.Request(conexion)
    return request.query(`SELECT Format (Fechanacimiento , 'dd/MM/yyyy') as Fechanacimiento, Cedula, Nombre, Apellido, Edad, Tipoempleado.Tipoempleado ,Format (Fechaingreso , 'dd/MM/yyyy') as Fechaingreso,  Direccion, Case when Activo =1 then 'Activo' Else 'Anulado'  end Estatus FROM Empleados, Tipoempleado where Empleados.Tipoempleado = Tipoempleado.Id  order by Cedula`).then((result) => {
      const empleado = result.recordset.map((row) => ({
    
        Cedula_e: row.Cedula,
        Nombre_e: row.Nombre,
        Apellido_e: row.Apellido,
        Fechanacimiento_e: row.Fechanacimiento,
        Edad_e: row.Edad,
        Fechaingreso_e: row.Fechaingreso,
        Tipoempleado_e: row.Tipoempleado,
        Direccion_e: row.Direccion,
        Estatus_e:row.Estatus
  
      }))
      return empleado
    })
  }
  
  
  module.exports = obtenerEmpleados
  
  let currentPage = 0;
  const rowsPerPage = 15;
  
  //Codigo para usar si la consulta esta en un archivo diferente
  // const obtenerSedes = require('./')
  const renderEmpleadosTable = (empleado) => {
    const tableBody = document.querySelector('#tabla-empleados tbody');
    tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizarla
    const start = currentPage * rowsPerPage;
    const end = start + rowsPerPage;
    const currentListados = empleado.slice(start, end);

  
    currentListados.forEach((column) => {
  
      const rowElement = document.createElement('tr')
      const CedulaCell = document.createElement('td')
      const NombreCell = document.createElement('td')
      const ApellidoCell = document.createElement('td')
      const FechanacimientoCell = document.createElement('td')
      const EdadCell = document.createElement('td')
      const FechaingresoCell = document.createElement('td')
      const TipoempleadoCell = document.createElement('td')
      const DireccionCell = document.createElement('td')
      const EstatusCell = document.createElement('td')
  
  
       
      CedulaCell.textContent = column.Cedula_e
      NombreCell.textContent = column.Nombre_e
      ApellidoCell.textContent = column.Apellido_e
      FechanacimientoCell.textContent = column.Fechanacimiento_e
      EdadCell.textContent = column.Edad_e
      FechaingresoCell.textContent = column.Fechaingreso_e
      TipoempleadoCell.textContent = column.Tipoempleado_e
      DireccionCell.textContent = column.Direccion_e
      EstatusCell.textContent = column.Estatus_e
   
  
     
       rowElement.appendChild(CedulaCell)
       rowElement.appendChild(NombreCell)
       rowElement.appendChild(ApellidoCell)
       rowElement.appendChild(FechanacimientoCell)
       rowElement.appendChild(EdadCell)
       rowElement.appendChild(FechaingresoCell)
       rowElement.appendChild(TipoempleadoCell)
       rowElement.appendChild(DireccionCell)
       rowElement.appendChild(EstatusCell)
        tableBody.appendChild(rowElement)
      }) 
      const maxPages = Math.ceil(empleado.length / rowsPerPage);
      const paginationInfoDiv = document.querySelector('#pagina-empleados');
      paginationInfoDiv.textContent = `Página: ${currentPage + 1} de  ${maxPages}`;
      
    }   
      
      consultar.connect().then(() => {
    obtenerEmpleados(consultar).then((empleado) => {

      renderEmpleadosTable(empleado);
      
   
    
       // Agregar controladores de eventos al botón de siguiente página
     const nextPageButton1 = document.querySelector('#nextPage2');
     nextPageButton1.addEventListener('click', () => {
       const maxPages1= Math.ceil(empleado.length / rowsPerPage);
       if (currentPage < maxPages1 - 1) {
         currentPage++;
         renderEmpleadosTable(filteredListados);
       }
     });
  
     // Agregar controladores de eventos al botón de página anterior
     const previousPageButton1= document.querySelector('#previousPage2');
     previousPageButton1.addEventListener('click', () => {
       if (currentPage > 0) {
         currentPage--;
         renderEmpleadosTable(filteredListados);
       }
     });
  
     // Agregar controladores de eventos al botón de primera página
     const firstPageButton1= document.querySelector('#firstPage2');
     firstPageButton1.addEventListener('click', () => {
       currentPage= 0;
       renderEmpleadosTable(filteredListados);
     });
  
     // Agregar controladores de eventos al botón de última página
     const lastPageButton1= document.querySelector('#lastPage2');
     lastPageButton1.addEventListener('click', () => {
       currentPage= Math.floor(empleado.length / rowsPerPage) ;
       renderEmpleadosTable(filteredListados);
     });


     
     let filteredListados = empleado;
     let cedulaFilterValue = '';
     let nombreFilterValue = '';
     let apellidoFilterValue = '';
    //  let fingresFilterValue = '';
     let edadFilterValue = '';
     let templeadoFilterValue = 'Todos';
     let  estatusEmpleadoFilterValue = 'Activo';

          const fechaPosteriorInput = document.querySelector('#fechaPosterior');
      const fechaAnteriorInput = document.querySelector('#fechaAnterior');
      let fechaPosteriorValue = new Date(fechaPosteriorInput.value);
      let fechaAnteriorValue = new Date(fechaAnteriorInput.value)

const updateFilteredListados = () => {

  filteredListados = empleado.filter((listado) => {

    // Convertir la fecha en formato 'dd/MM/yyyy' a un objeto Date
    const [day, month, year] = listado.Fechaingreso_e.split('/');
    const fechaListado = new Date(year, month - 1, day);
    // Verificar si la fecha está dentro del rango especificado
    return fechaListado >= fechaPosteriorValue && fechaListado <= fechaAnteriorValue;
  }).filter((listado) => {
    return String(listado.Edad_e).toLowerCase().startsWith(edadFilterValue);
  }).filter((listado) => {
    return String(listado.Apellido_e).toLowerCase().startsWith(apellidoFilterValue);
  }).filter((listado) => {
    return String(listado.Nombre_e).toLowerCase().startsWith(nombreFilterValue);
  }).filter((listado) => {
    return String(listado.Cedula_e).startsWith(cedulaFilterValue);
  }).filter((listado) => {
    if (estatusEmpleadoFilterValue === 'Todos') {
      // Si el valor del filtro es 'Todos', incluir todos los listados
      return true;
    } else {
      // De lo contrario, incluir solo los listados cuyo estado coincide con el valor del filtro
      return listado.Estatus_e.trim() === estatusEmpleadoFilterValue.trim();
    }
  }).filter((listado) => {
    if (templeadoFilterValue === 'Todos') {
      // Si el valor del filtro es 'Todos', incluir todos los listados
      return true;
    } else {
      // De lo contrario, incluir solo los listados cuyo estado coincide con el valor del filtro
      return listado.Tipoempleado_e.trim() === templeadoFilterValue.trim();
    }
  })
  renderEmpleadosTable(filteredListados);
};

      updateFilteredListados();

   

    // Agregar controladores de eventos a los inputs de fecha para actualizar el filtro cuando cambien
    fechaPosteriorInput.addEventListener('input', (event) => {
      fechaPosteriorValue = new Date(event.target.value);
      updateFilteredListados();
    });

    fechaAnteriorInput.addEventListener('input', (event) => {
      fechaAnteriorValue = new Date(event.target.value);
      updateFilteredListados();
    });

    //  const placaFilterInput = document.querySelector('#Fnacimientofilter');
    //  placaFilterInput.addEventListener('input', (event) => {
    //    placaFilterValue = event.target.value.toLowerCase();
    //    updateFilteredListados();
    //  });
     
     const edadilterInput = document.querySelector('#edadfilter');
     edadilterInput.addEventListener('input', (event) => {
       edadFilterValue = event.target.value.toLowerCase();
       updateFilteredListados();
     });
     
     const apellidoFilterInput = document.querySelector('#apellidofilter');
     apellidoFilterInput.addEventListener('input', (event) => {
       apellidoFilterValue = event.target.value.toLowerCase();
       updateFilteredListados();
     });
     
     const nombreFilterInput = document.querySelector('#nombrefilter');
     nombreFilterInput.addEventListener('input', (event) => {
       nombreFilterValue = event.target.value.toLowerCase();
       updateFilteredListados();
     });
     
     const cedulaFilterInput = document.querySelector('#cedulafilter');
     cedulaFilterInput.addEventListener('input', (event) => {
       cedulaFilterValue = event.target.value;
       updateFilteredListados();
     });

     const templeadoFilterInput = document.querySelector('#templeadofilter');
     templeadoFilterInput.addEventListener('change', (event) => {
       templeadoFilterValue = event.target.value;
       updateFilteredListados();
     });

     const estatusEmpleadoFilterInput = document.querySelector('#estatusEmpleado');
     estatusEmpleadoFilterInput.addEventListener('change', (event) => {
       estatusEmpleadoFilterValue = event.target.value;
       updateFilteredListados();
     });




     async function obtenerEstado() {
      try {
    
        await sql.connect(config);
    
        const result = await sql.query('SELECT Tipoempleado FROM Tipoempleado');
    

        
        return result.recordset;
      } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
      }
    }
    
    
    async function GenerarEstado() {
      try {
        const destino = await obtenerEstado();
    
        let selectOptions = '<option value="Todos" selected>Todos</option>';
    
    
    
        destino.forEach((row) => {
          // Establecer el valor de las opciones como el id del estatus
          selectOptions += `<option value="${row.Tipoempleado}">${row.Tipoempleado}</option>`;
        });
        const selectHtml = `<select id="templeadofilter">${selectOptions}</select>`;

        // const selectHtml = `<select id="selectEstados">${selectOptions}</select>`;
        document.getElementById('templeadofilter').innerHTML = selectHtml;
    
        // Agregar evento change al select
    
        return selectHtml;
      } catch (error) {
        console.error('Error al generar el select:', error);
        throw error;
      }
    }
    
    GenerarEstado()
      .then((selectHtml) => {
        console.log('Select HTML generado:', selectHtml);
      })
      .catch((error) => {
        console.error('Error en la generación del select:', error);
      });



      const printButton = document.querySelector('#imprimir');
      printButton.addEventListener('click', () => {
      
        const generarEmpleadosPDF = require('./ImprimirEmpleados')
      
        generarEmpleadosPDF(filteredListados);
       
      });
      





    })
  })
  

    const element = document.getElementById("Guardar");
    const formulario = document.querySelector('#formulario');

    element.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente
    
    element.disabled = true
    // const { readFileSync } = require('fs');
    const Cedula = document.querySelector('input[name="Cedula"]').value;
    const nombre = document.querySelector('input[name="Nombre"]').value;
    const apellido = document.querySelector('input[name="Apellido"]').value;
    const f_nacimiento = document.querySelector('input[name="Fnacimiento"]').value;
    const edad = document.querySelector('input[name="Edad"]').value;
    const telefono = document.querySelector('input[name="Telefono"]').value;
    const Celular = document.querySelector('input[name="Celular"]').value;
    const f_ingreso = document.querySelector('input[name="Fingreso"]').value;
    const templeado = document.querySelector('#Templeados').value;
    const direccion = document.querySelector('textarea[name="Direccion"]').value;


 
    // const imagen =  readFileSync('ConsorcioLogo.png').toString('base64')
    // console.log(imagen)
    // const option = templeado.value;
    //  const nivelSeleccionado = nivel.options[nivel.selectedIndex].value;

    let nombresMostrados = {
      'Cedula': 'Por favor, ingrese la cedula',
      'Nombre': 'Por favor, ingrese el nombre',
      'Apellido': 'Por favor, ingrese el apellido',
      'Fnacimiento': 'Por favor, ingrese la fecha de nacimiento',
      'Edad':  'Por favor, seleccione la edad',
      'Telefono':  'Por favor, seleccione el numero de telefono del empleado',
      'Fingreso': 'Por favor, ingrese la fecha de ingreso del empleado',
      'templeado': 'Por favor, seleccione un tipo de empleado',
    
 
      // Agrega más mapeos según sea necesario
    };


    const ConsultaCedula = `SELECT count(*) as count FROM Empleados where Cedula = '${Cedula}'`;
    const pool = await consultar;
    const result = await pool.request().query(ConsultaCedula);

    const count = result.recordset[0].count;

    let inputs = document.querySelectorAll('.requerido');

    let camposVacios = []; // Lista para almacenar los nombres de los campos vacíos

      // Itera sobre los elementos de entrada
      for (let i = 0; i < inputs.length; i++) {
          // Si el elemento de entrada está vacío...
          if (inputs[i].value === '') {
              // Obtiene el nombre mostrado del objeto, si existe, o usa el nombre del campo de entrada
              let nombreMostrado = nombresMostrados[inputs[i].name] || inputs[i].name;
              // Añade el nombre del campo vacío a la lista
              camposVacios.push(nombreMostrado);
          }
      }

        // Si hay campos vacíos...
        if (camposVacios.length > 0) {
            // Envía un mensaje al proceso principal con la lista de campos vacíos
            ipcRenderer.send('campos-vacios', camposVacios);

            setTimeout(() =>{
              element.disabled = false
                 }, 2500)
            
        }
        else if (count > 0) {
          
          await  ipcRenderer.send('empleadoexistente', Cedula)
          setTimeout(() =>{
            element.disabled = false
               }, 2500)
        } 

          else if ( edad >99 ) {

            ipcRenderer.send('edad')
            setTimeout(() =>{
              element.disabled = false
                 }, 2500)
          }

        

        else{

          ipcRenderer.send('show-confirm-dialog')
          const index = await new Promise((resolve) => {
            ipcRenderer.once('confirm-dialog-result', (event, index) => {
              resolve(index)
            })
          })
      
          if (index === 1) {
            // El usuario hizo clic en "no"
            element.disabled = false
          }
          else{

            element.disabled = false
        // Utiliza los valores en tus consultas SQL
        await agregarEmpleado({ nombre, Cedula,  apellido, f_nacimiento, edad, f_ingreso, direccion, telefono, Celular, templeado});
        // Limpia los campos del formulario
        setTimeout(() =>{
          location.reload()
             }, 1000)
}}
});

async function agregarEmpleado(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `INSERT INTO Empleados (Cedula, Nombre, Apellido, Fechanacimiento, Edad, Fechaingreso, Direccion, Telefono, Celular, Tipoempleado, Activo, Estatus ) VALUES ( ${datos.Cedula}, '${datos.nombre}', '${datos.apellido}', '${datos.f_nacimiento}' , ${datos.edad}, '${datos.f_ingreso}' ,'${datos.direccion}' ,'${datos.telefono}' ,'${datos.Celular || '' }','${datos.templeado}' ,1,1)`;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
        ipcRenderer.send('registroExitoso');
    } catch (error) {
      ipcRenderer.send('error', error);
      console.log(error)
    }

}


async function obtenerEstatus() {
  try {

    await sql.connect(config);

    const result = await sql.query('SELECT Id, Tipoempleado FROM Tipoempleado');


    return result.recordset;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}

async function GenerarEstatus() {
  try {
      const destino = await obtenerEstatus();

      let selectOptions = '<option value="" disabled selected>Seleccione</option>';

      destino.forEach((row) => {
          if (row.Id_estatus !== 7) {
              selectOptions += `<option value="${row.Id}">${row.Tipoempleado}</option>`;
          }
      });

      const selectHtml = `<select>${selectOptions}</select>`;
      document.getElementById('Templeados').innerHTML = selectHtml ;
      return selectHtml;
  } catch (error) {
      console.error('Error al generar el select:', error);
      throw error;
  }
}


GenerarEstatus()
  .then((selectHtml) => {
    console.log('Select HTML generado:', selectHtml);
  
  })
  .catch((error) => {
    console.error('Error en la generación del select:', error);

  });








const Anular = document.getElementById("Anular");

Anular.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

    const Cedula = document.querySelector('input[name="Cedula"]').value;
 
    // const option = templeado.value;
    //  const nivelSeleccionado = nivel.options[nivel.selectedIndex].value;

    const ConsultaCedula = `SELECT count(*) as count FROM Empleados where Cedula = '${Cedula}'`;
    const ConsultaAnulado = `SELECT count(*) as counts FROM Empleados where Cedula = '${Cedula}' and Activo = 0`;

    const pool = await consultar;
    const result = await pool.request().query(ConsultaCedula);
    const result2 = await pool.request().query(ConsultaAnulado);


    const count = result.recordset[0].count;
    const count2 = result2.recordset[0].counts;



    
       if (count === 0) {
          
          await  ipcRenderer.send('empleadoNoexistente', Cedula)

        } 

        if(count2 > 0){
          await ipcRenderer.send('empleadoAnulado', Cedula)
        }
        

          else{

            ipcRenderer.send('show-confirm-dialog')
            const index = await new Promise((resolve) => {
              ipcRenderer.once('modification-dialog-result', (event, index) => {
                resolve(index)
              })
            })
        
            if (index === 1) {
              // El usuario hizo clic en "no"
            }
            else{


              ipcRenderer.send('anular-confirm-dialog')
              const index = await new Promise((resolve) => {
                ipcRenderer.once('anular-dialog-result', (event, index) => {
                  resolve(index)
                })
              })
          
              if (index === 1) {
                // El usuario hizo clic en "no"
              }
              else{   

          // Utiliza los valores en tus consultas SQL
            await anularEmpleado({ Cedula});
            ipcRenderer.send('datosModificados');
          // Limpia los campos del formulario

    location.reload()
  }}
}});

async function anularEmpleado(datos) {
    try {
        const pool = await consultar;
        const sqlQuery = `Update Empleados set Activo = 0 where Cedula = ${datos.Cedula} `;
        const result = await pool.request().query(sqlQuery);
        console.log('Registro agregado a la base de datos:', result);
    } catch (error) {
      ipcRenderer.send('error', error);
      console.log(error)
    }

}
//Codigo para que al refrescar se quede en la misma pestaña
var tabMenu = document.querySelector("#tab-menu");

// Agregar un controlador de eventos para el evento "click" en el menú de pestañas
tabMenu.addEventListener("click", function(event) {
  // Obtener el índice de la pestaña seleccionada
  var selectedIndex = Array.prototype.indexOf.call(tabMenu.children, event.target);

  // Guardar el índice de la pestaña seleccionada en localStorage
  localStorage.setItem("selectedTabIndex", selectedIndex);
});

// Cuando se carga la página, recuperar el índice de la pestaña seleccionada de localStorage
var selectedTabIndex = localStorage.getItem("selectedTabIndex");

// Si se encontró un índice de pestaña seleccionado en localStorage, seleccionar esa pestaña
if (selectedTabIndex !== null) {
  tabMenu.children[selectedTabIndex].click();
}

//!Al pulsar doble click en la tabla traer datos
const tabla = document.getElementById("tabla-empleados");
const cedulaInput = document.getElementById("Cedula");
const nombreInput = document.getElementById("Nombre");
const apellidoInput = document.getElementById("Apellido");
const fechaInput = document.getElementById("fecha");
const edadInput = document.getElementById("Edad");
const telefonoInput = document.getElementById("Telefono");
const celularInput = document.getElementById("Celular");
const fechaIngreso = document.getElementById("fIngreso")
const tipoEmpleadoSelect = document.getElementById("Templeados");
const direcciontext = document.getElementById("Direccion")

let cedulaOriginal;
tabla.addEventListener("click", async function(event) {
  if (event.target.tagName === "TD") {
    const tab1 = document.querySelector('.tab[data-tab="tab1"]');
    tab1.click();
    event.preventDefault();
    const filaSeleccionada = event.target.parentElement;
    const cedula = filaSeleccionada.children[0].textContent;
    cedulaOriginal = cedula;
    const nombre = filaSeleccionada.children[1].textContent;
    const apellido = filaSeleccionada.children[2].textContent;
    const fecha = filaSeleccionada.children[3].textContent;
    const edad = filaSeleccionada.children[4].textContent;
    const fechai = filaSeleccionada.children[5].textContent;
    const tipoEmpleado = filaSeleccionada.children[6].textContent;
    const direccion = filaSeleccionada.children[7].textContent

    cedulaInput.value = cedula;
    nombreInput.value = nombre;
    apellidoInput.value = apellido;

    const fechaDividida = fecha.split('/');
    const fechaFormateada = `${fechaDividida[1]}/${fechaDividida[0]}/${fechaDividida[2]}`;
    fechaInput.valueAsDate = new Date(fechaFormateada);
    
    const fechaIngresoDividida = fechai.split('/');
    const fechaIngresoFormateada = `${fechaIngresoDividida[1]}/${fechaIngresoDividida[0]}/${fechaIngresoDividida[2]}`;
    fechaIngreso.valueAsDate = new Date (fechaIngresoFormateada);
    
    console.log(fechaInput.value)
    console.log(fecha)
    edadInput.value = edad;

    // Obtener el valor de la columna "Telefono" para la cédula seleccionada
    const telefonoEmpleado = await obtenerTelefonoDesde(cedula);
    telefonoInput.value = telefonoEmpleado;

    // Obtener el valor de la columna "Celular" para la cédula seleccionada
    const celularEmpleado = await obtenerCelularDesde(cedula);
    celularInput.value = celularEmpleado;



    for (var i = 0; i < tipoEmpleadoSelect.options.length; i++) {
      if (tipoEmpleado == tipoEmpleadoSelect.options[i].text) {
        tipoEmpleadoSelect.options[i].selected = true;
        tipoEmpleadoSelect.dispatchEvent(new Event('change'));
        break;
      }
    }

    direcciontext.value = direccion
  }
});

async function obtenerTelefonoDesde(cedula) {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT Telefono FROM Empleados WHERE Cedula = '${cedula}'`);
    return result.recordset[0].Telefono;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}

async function obtenerCelularDesde(cedula) {
  try {
    await sql.connect(config);
    const result = await sql.query(`SELECT Celular FROM Empleados WHERE Cedula = '${cedula}'`);
    return result.recordset[0].Celular;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}



//!Fin de al pulsar dobl click en la tabla traer datos

console.log('Hola')

const modificar = document.getElementById('Modificar');

let cedulaNuevecita; 

modificar.addEventListener('click', async (evento) => {
  
  evento.preventDefault();

 
  const nombre = document.querySelector('input[name="Nombre"]').value;
  const apellido = document.querySelector('input[name="Apellido"]').value;
  const f_nacimiento = document.querySelector('input[name="Fnacimiento"]').value;
  const edad = document.querySelector('input[name="Edad"]').value;
  const telefono = document.querySelector('input[name="Telefono"]').value;
  const Celular = document.querySelector('input[name="Celular"]').value;
  const f_ingreso = document.querySelector('input[name="Fingreso"]').value;
  const templeado = document.querySelector('#Templeados').value;
  const direccion = document.querySelector('textarea[name="Direccion"]').value;
  cedulaNuevecita = document.querySelector('input[name="Cedula"]').value;

  console.log(cedulaNuevecita)
  console.log(cedulaOriginal)

  //consultaq
  const ConsultaCedula = `SELECT count(*) as count FROM Empleados where Cedula= ${cedulaNuevecita} and Cedula != ${cedulaOriginal}`;
  const pool = await sql.connect(config);

  const result = await pool.request().query(ConsultaCedula);

  const count = result.recordset[0].count;

  console.log(count)

  if (count > 0) {
    console.log('La cédula existe en la base de datos.');
    ipcRenderer.send('empleadoexistente', cedulaNuevecita);

  } else {
    console.log('La cédula no existe en la base de datos.');
    ipcRenderer.send('show-confirm-dialog');
    const index = await new Promise((resolve) => {
    
      ipcRenderer.once('confirm-dialog-result', (event, index) => {
        resolve(index)
      })
    })

    if (index === 1) {
  
    } else {

      try {
        await sql.connect(config);
        const query = `UPDATE Empleados SET Cedula = ${cedulaNuevecita}, Nombre = '${nombre}', Apellido = '${apellido}', Fechanacimiento = '${f_nacimiento}', Edad = ${edad}, Telefono = ${telefono}, Celular = ${Celular}, Fechaingreso = '${f_ingreso}', Tipoempleado = ${templeado}, Direccion = '${direccion}' WHERE Cedula = '${cedulaOriginal}'`;
        await sql.query(query);
        if (cedulaOriginal !== cedulaNuevecita) {
          console.log('Cédula nueva tiene el valor de ' + cedulaNuevecita)
          ipcRenderer.send('datosModificados');
        }
      } catch (error) {
        console.error('Error al actualizar los datos:', error);
        throw error;
      }
      ipcRenderer.send('datosModificados')
      location.reload();
    }
}

});

//!Edad :3



const inputFechaNacimiento = document.querySelector('#fecha');
const inputEdad = document.querySelector('#Edad');


inputFechaNacimiento.addEventListener('change', () => {

  const fechaNacimiento = new Date(inputFechaNacimiento.value);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();


  if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }

  inputEdad.value = edad;
});

