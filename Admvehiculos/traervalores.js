function valores(){

    const tabla = document.getElementById("tabla-vehiculos");
  let originalPlaca;
  tabla.addEventListener("click", async function(event) {
    if (event.target.tagName === "TD"){
      const tab1 = document.querySelector('.tab[data-tab="tab1"]');
      tab1.click();
      event.preventDefault();
      const filaSeleccionada = event.target.parentElement;
      const placa = filaSeleccionada.children[0].textContent;
      originalPlaca = placa;
      const marca = filaSeleccionada.children[1].textContent;
      const modelo = filaSeleccionada.children[2].textContent; 
      const año = filaSeleccionada.children[4].textContent; 
      const poliza = filaSeleccionada.children[5].textContent; 
      const tipo = filaSeleccionada.children[3].textContent; 
      const estatus = filaSeleccionada.children[9].textContent;
      const observacion = filaSeleccionada.children[8].textContent;
      const ubicacionSelect = document.getElementById("selectUbicacion");

      
      for (var i = 0; i < marcaselect.options.length; i++) {
        if (marca == marcaselect.options[i].text) {
          marcaselect.options[i].selected = true;
          marcaselect.dispatchEvent(new Event('change'));
          break;
        }
      }
      setTimeout(() => {
        for (var i = 0; i < modeloselect.options.length; i++) {
          if (modelo == modeloselect.options[i].text) {
            modeloselect.options[i].selected = true;
            break;
          }
        }
      }, 200);
      for (var i = 0; i < estatusSelect.options.length; i++) {
        if (estatus == estatusSelect.options[i].text) {
          estatusSelect.options[i].selected = true;
          break;
        }
      }
    

        for (var i = 0; i < tiposelect.options.length; i++) {
          if (tipo == tiposelect.options[i].text) {
            tiposelect.options[i].selected = true;
            break;
          }
        }
    

      observacionInput.value = observacion;

      placaInput.value = placa;
      
      añoInput.value = año; 
      polizaInput.value = poliza;
      const ejes = await obtenerEjes(placa);
      ejesSelect.value = ejes;
      const ubicacion = await obtenerUbicacion2(placa);
      ubicacionSelect.value = ubicacion;
      // Obtener el valor de la columna Coberturadesde de la tabla Vehiculos
      const coberturaDesde = await obtenerCoberturaDesde(placa);
      coberturaDesdeInput.valueAsDate = new Date(coberturaDesde);

      // Obtener el valor de la columna Coberturahasta de la tabla Vehiculos
      const coberturaHasta = await obtenerCoberturaHasta(placa);
      coberturaHastaInput.valueAsDate = new Date(coberturaHasta);

      const propietario = await obtenerPropietario(placa);
      propietarioInput.value = propietario;

      const codigo = await obtenerCodigo(placa);
      codigoSap.value = codigo;


      const fechac = await ObtenerFecha(placa);
      fecha_creacion.valueAsDate = new Date(fechac);

      console.log('el valor de orignal placa es: ' + originalPlaca);
    }
  });

  async function ObtenerFecha(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Fechacreacion FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Fechacreacion; // Corrige el nombre del campo devuelto
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
  async function obtenerCoberturaDesde(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Coberturadesde FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Coberturadesde;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }

  async function obtenerCodigo(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT CodigoSap FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].CodigoSap; // Aquí está la corrección
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }






  async function obtenerCoberturaHasta(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Coberturahasta FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Coberturahasta;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }

  async function obtenerEjes(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Ejes FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Ejes;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }

  async function obtenerUbicacion2(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Ubicacion FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Ubicacion;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }



  async function obtenerPropietario(placa) {
    try {
      await sql.connect(config);
      const result = await sql.query(`SELECT Propietario FROM Vehiculos WHERE Placa = '${placa}'`);
      return result.recordset[0].Propietario;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;ado
    }
  }
}

module.exports = valores