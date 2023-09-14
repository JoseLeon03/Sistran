const sql = require('mssql')
const consultar = require('../Promise')


const obtenerGasoil = (conexion) => {
  const request = new sql.Request(conexion)
  return request.query(`SELECT Format (Fecha , 'dd/MM/yyyy') as Fecha,  Proveedor, Cantidad, Monto, Sitioentrega,  Tipocompra   FROM CompraGasoil where Tipocompra ='Al mayor' order by Fecha`).then((result) => {
    const gasoil = result.recordset.map((row) => ({
  
      Proveedor_g: row.Proveedor,
      Cantidad_g: row.Cantidad,
      Monto_g: row.Monto,
      Sitioentrega_g: row.Sitioentrega,
      Fecha_g: row.Fecha,
    //   Tipocompra_g: row.Tipocompra,

    }))
    return gasoil
  })
}

module.exports = obtenerGasoil



//Codigo para usar si la consulta esta en un archivo diferente
// const obtenerSedes = require('./')

consultar.connect().then(() => {
  obtenerGasoil(consultar).then((gasoil) => {
    const tableBody = document.querySelector('.tablagasoil tbody')
    gasoil.forEach((compra) => {

    const rowElement = document.createElement('tr')
    const ProveedorCell = document.createElement('td')
    const CantidadCell = document.createElement('td')
    const MontoCell = document.createElement('td')
    const SitioentregaCell = document.createElement('td')
    const FechaCell = document.createElement('td')


     
    ProveedorCell.textContent = compra.Proveedor_g
    CantidadCell.textContent = compra.Cantidad_g
    MontoCell.textContent = compra.Monto_g
    SitioentregaCell.textContent = compra.Sitioentrega_g
    FechaCell.textContent = compra.Fecha_g
 

   
     rowElement.appendChild(ProveedorCell)
     rowElement.appendChild(CantidadCell)
     rowElement.appendChild(MontoCell)
     rowElement.appendChild(SitioentregaCell)
     rowElement.appendChild(FechaCell)
      tableBody.appendChild(rowElement)
    })
  }).catch((err) => {
    console.error(err)
  })
})





const obtenerGasoilBomba = (conexion) => {
    const request = new sql.Request(conexion)
    return request.query(`SELECT Format (Fecha , 'dd/MM/yyyy') as Fecha,  Chofer, Cedula, Monto, Placa,Cantidad,  Tipocompra   FROM CompraGasoil where Tipocompra ='Estacion' order by Id_compra`).then((result) => {
      const gasoil = result.recordset.map((row) => ({
   
        Chofer_b: row.Chofer,
        Cedula_b: row.Cedula,
        Placa_b: row.Placa,
        Cantidad_b: row.Cantidad,
        Monto_b: row.Monto,
        Fecha_b: row.Fecha,
    
      }))
      return gasoil
    })
  }
  
  module.exports = obtenerGasoilBomba
  
  
  
  //Codigo para usar si la consulta esta en un archivo diferente
  // const obtenerSedes = require('./')
  
  consultar.connect().then(() => {
    obtenerGasoilBomba(consultar).then((gasoil) => {
      const tableBody = document.querySelector('.tablabomba tbody')
      gasoil.forEach((compra) => {
  
        const rowElement = document.createElement('tr')
        const ChoferCell = document.createElement('td')
        const CedulaCell = document.createElement('td')
        const PlacaCell = document.createElement('td')
        const CantidadCell = document.createElement('td')
        const MontoCell = document.createElement('td')
        const FechaCell = document.createElement('td')
  
  
        ChoferCell.textContent = compra.Chofer_b
        CedulaCell.textContent = compra.Cedula_b
        PlacaCell.textContent = compra.Placa_b
        CantidadCell.textContent = compra.Cantidad_b
        MontoCell.textContent = compra.Monto_b   
        FechaCell.textContent = compra.Fecha_b  
   
    
       rowElement.appendChild(ChoferCell)
       rowElement.appendChild(CedulaCell)
       rowElement.appendChild(PlacaCell)
       rowElement.appendChild(CantidadCell)
       rowElement.appendChild(MontoCell)
       rowElement.appendChild(FechaCell)
     
        tableBody.appendChild(rowElement)
      })
 
    }).catch((err) => {
      console.error(err)
    })
  })
  

  const obtenerGasoilGeneral = (conexion) => {
    const request = new sql.Request(conexion)
    return request.query(`SELECT Format (Fecha , 'dd/MM/yyyy') as Fecha, Chofer, Cedula, Monto, Placa,Cantidad,  Tipocompra, Proveedor, Sitioentrega   FROM CompraGasoil  order by Fecha`).then((result) => {
      const gasoil = result.recordset.map((row) => ({

        Proveedor_l: row.Proveedor,
        Chofer_l: row.Chofer,
        Cedula_l: row.Cedula,
        Placa_l: row.Placa,
        Cantidad_l: row.Cantidad,
        Monto_l: row.Monto,
        Sitioentrega_l: row.Sitioentrega,
        Fecha_l: row.Fecha,
     Tipocompra_l: row.Tipocompra,
  
      }))
      return gasoil
    })
  }
  
  module.exports = obtenerGasoilGeneral
  
  
  
  //Codigo para usar si la consulta esta en un archivo diferente
  // const obtenerSedes = require('./')
  
  consultar.connect().then(() => {
    obtenerGasoilGeneral(consultar).then((gasoil) => {
      const tableBody = document.querySelector('.tablalistado tbody')
      gasoil.forEach((compra) => {
  
        const rowElement = document.createElement('tr')
        const ProveedorCell = document.createElement('td')
        const ChoferCell = document.createElement('td')
        const CedulaCell = document.createElement('td')
        const PlacaCell = document.createElement('td')
        const CantidadCell = document.createElement('td')
        const MontoCell = document.createElement('td')
        const SitioentregaCell = document.createElement('td')
        const FechaCell = document.createElement('td')
        const TipocompraCell = document.createElement('td')


        ProveedorCell.textContent = compra.Proveedor_l
        ChoferCell.textContent = compra.Chofer_l
        CedulaCell.textContent = compra.Cedula_l
        PlacaCell.textContent = compra.Placa_l
        CantidadCell.textContent = compra.Cantidad_l
        MontoCell.textContent = compra.Monto_l
        SitioentregaCell.textContent = compra.Sitioentrega_l
        FechaCell.textContent = compra.Fecha_l
        TipocompraCell.textContent = compra.Tipocompra_l
  
    
        rowElement.appendChild(ProveedorCell)
        rowElement.appendChild(ChoferCell)
        rowElement.appendChild(CedulaCell)
        rowElement.appendChild(PlacaCell)
        rowElement.appendChild(CantidadCell)
        rowElement.appendChild(MontoCell)
        rowElement.appendChild(SitioentregaCell)
        rowElement.appendChild(FechaCell)
        rowElement.appendChild(TipocompraCell)
        tableBody.appendChild(rowElement)
      })

      const filasTabla = document.querySelectorAll('.tablalistado tbody tr');
const ventanaEmergente = document.getElementById('ventana-emergente');

filasTabla.forEach(fila => {
  fila.addEventListener('click', () => {    
    const proveedor = fila.querySelector('td:nth-child(1)').textContent;
    const chofer = fila.querySelector('td:nth-child(2)').textContent;
    const cedula = fila.querySelector('td:nth-child(3)').textContent;
    const placa = fila.querySelector('td:nth-child(4)').textContent;
    const cantidad = fila.querySelector('td:nth-child(5)').textContent;
    const monto = fila.querySelector('td:nth-child(6)').textContent;
    const sitioentrega = fila.querySelector('td:nth-child(7)').textContent;
    const fecha = fila.querySelector('td:nth-child(8)').textContent;
    const tipocompra = fila.querySelector('td:nth-child(9)').textContent; 
   // const imagenhd = fila.querySelector('tdnth-child(10').textContent;
    
    const contenidoVentana = `

 
      <div class="ventana-emergente-contenido">
      
      <button id="botonCerrar">Cerrar</button>
      
      <div id="menu-bar">
            <div class="left" role="menu">
              <button class="menubar-btn" id="menu-btn"><i class="fas fa-bars"></i></button>
              
            </div>
            <div class="right">
              <button class="menubar-btn" id="minimizar" onclick="min"><i class="fas fa-window-minimize"></i></button>
              <button class="menubar-btn" id="max-unmax-btn"><i class="far fa-square"></i></button>
              <button class="menubar-btn" id="cerrar" onclick="close"><i class="fas fa-times"></i></button>
            </div>
          </div>
        <h2>Detalles de la compra</h2>
        
        <div class ="ordenado">
        
        <div class ="izquierda">
          <div class="dato"><span>Proveedor:</span> ${proveedor}</div>
          <div class="dato"><span>Cédula:</span> ${cedula}</div>
          <div class="dato"><span>Cantidad:</span> ${cantidad}</div>
          <div class="dato"><span>Sitio de entrega:</span> ${sitioentrega}</div>
          <div class="dato"><span>Tipo de compra:</span> ${tipocompra}</div>
        <button id="botonCompra">Billete de la compra</button>

      </div>

      <div class="derecha">
          <div class='dato'><span>Chofer:</span> ${chofer}</div>
          <div class="dato"><span>Placa:</span> ${placa}</div>
          <div class="dato"><span>Monto:</span> ${monto}</div
          <div class="dato"><span>Fecha:</span> ${fecha}</div>
      </div>
    </div>
   </div>

    <script> 
  
    </script>

    `;
   

    ventanaEmergente.innerHTML = contenidoVentana;
    ventanaEmergente.style.display = 'block';
  });
});

    }).catch((err) => {
      console.error(err)
    })
  })
  