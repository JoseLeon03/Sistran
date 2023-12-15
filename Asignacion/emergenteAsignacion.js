function emergenteAsignacion(ventanaEmergente,filasTabla){

    filasTabla.forEach(fila => {
    fila.addEventListener('click', () => {    
    
      const id_asignacion = fila.querySelector('td:nth-child(1)').textContent;
      const Cedula = fila.querySelector('td:nth-child(2)').textContent;
      const Nombre = fila.querySelector('td:nth-child(3)').textContent;
      const Apellido = fila.querySelector('td:nth-child(4)').textContent;
      const Placa = fila.querySelector('td:nth-child(5)').textContent;
      const Marca = fila.querySelector('td:nth-child(6)').textContent;
      const Modelo = fila.querySelector('td:nth-child(7)').textContent;
      const Tipo = fila.querySelector('td:nth-child(8)').textContent;
      const Fecha = fila.querySelector('td:nth-child(9)').textContent;
      const Año = fila.querySelector('td:nth-child(10)').textContent;
      const Propietario = fila.querySelector('td:nth-child(11)').textContent;
    
    
      
    
    
     
      // Variable para almacenar el ID del viaje seleccionado
    
    // Agregar evento doble clic a las filas de la tabla
      const contenidoVentana = `
      <div id ="menu-bar">
           
                <button type="button" class="menubar-btn" id="botonCerrar"><i class="fas fa-times"></i></button>
             
                </div>
            <h2 class="Titulo">Detalles Asignacion</h2>
            <fieldset id="fieldsetEmergente">
            <div class="Tablas">
    
                <Div class="Izquierda">
            <label>Fecha:</label>
            <span >${Fecha}</span>
            <br>
            <label >Cedula:</label>
            <span>${Cedula}</span>
            <br>
            <label >Nombre:</label>
            <span>${Nombre} ${Apellido}</span>
            <br>
       
            </Div>
            <div class="Derecha">
            <label >Placa:</label>
    
            <span>${Placa}</span>
        
            <br>
            <label >Marca:</label>
            <span>${Marca}</span>
            <br>
            <label >Modelo:</label>
            <span>${Modelo}</span>
                <br>
            <label >Tipo:</label>
            <span>${Tipo}</span>
            <br>
            <label >Año:</label>
            <span>${Año}</span>
            </div>
    
            </div>
            <div class="emergente_btn">
            <button type="button"  class="" id="Imprimir" >Generar Autorizacion para conducir</button>
            </div>
        </fieldset>
    
    
      ` 
    ;
                  ventanaEmergente.innerHTML = contenidoVentana;
                  ventanaEmergente.style.display = 'block';
                
            const botonCerrar = document.getElementById('botonCerrar');
            botonCerrar.addEventListener('click', () => {
              ventanaEmergente.style.display = 'none';
    
    
            });
    
            const generarAutorizacion = require('./GenerarAutorizacion.js');
    
            const botonImprimir = document.querySelector('#Imprimir');
            
            botonImprimir.addEventListener('click', async () => {
            
              await generarAutorizacion({Fecha, Cedula, Nombre, Apellido, Placa, Marca, Modelo, Tipo, Año, Propietario });
              document.getElementById('botonCerrar').click()
            });
        });
      });
    }

    module.exports = emergenteAsignacion