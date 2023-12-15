const sql = require('mssql')
const {consultar, config} = require ('../Promise')
const emergenteGasoil = require('./EmergenteGasoil')


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
      const tableBody = document.querySelector('#tablalistado tbody')
      gasoil.forEach((compra) => {
  
        const rowElement       = document.createElement('tr')
        const ProveedorCell    = document.createElement('td')
        const ChoferCell       = document.createElement('td')
        const CedulaCell       = document.createElement('td')
        const PlacaCell        = document.createElement('td')
        const CantidadCell     = document.createElement('td')
        const MontoCell        = document.createElement('td')
        const SitioentregaCell = document.createElement('td')
        const FechaCell        = document.createElement('td')
        const TipocompraCell   = document.createElement('td')


        ProveedorCell.textContent    = compra.Proveedor_l
        ChoferCell.textContent       = compra.Chofer_l
        CedulaCell.textContent       = compra.Cedula_l
        PlacaCell.textContent        = compra.Placa_l
        CantidadCell.textContent     = compra.Cantidad_l
        MontoCell.textContent        = compra.Monto_l
        SitioentregaCell.textContent = compra.Sitioentrega_l
        FechaCell.textContent        = compra.Fecha_l
        TipocompraCell.textContent   = compra.Tipocompra_l
  
    
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

      const filasTabla = document.querySelectorAll('#tablalistado tbody tr');
      const tabla = document.getElementById("tablalistado")
      const ventanaEmergente = document.getElementById('ventana-emergente');

      emergenteGasoil(filasTabla,ventanaEmergente, tabla )



    }).catch((err) => {
      console.error(err)
    })
  })
  


