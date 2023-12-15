function select(){



    async function obtenerUbicacion2() {
        try {
    
          await sql.connect(config);
    
    
          const result = await sql.query('SELECT Id,Estatusvehiculo FROM Estatusvehiculo');
    
    
          return result.recordset;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          throw error;
        }
      }
    
    
      async function generarSelectUbicacion2() {
        try {
    
          const ubicacion = await obtenerUbicacion2();
    
          let selectOptions = '<option value="Todos"  selected>Todos</option>';
    
          ubicacion.forEach((row) => {
            selectOptions += `<option value="${row.Estatusvehiculo}">${row.Estatusvehiculo}</option>`;
          });
    
          const selectHtml = `<select>${selectOptions}</select>`;
          return selectHtml;
        } catch (error) {
          console.error('Error al generar el select:', error);
          throw error;
        }
      }
    
      generarSelectUbicacion2()
       
    
       
    /******************************************************************************** */

    /******************************************************************************** */
    
            async function obtenerTipo2() {
              try {
          
                await sql.connect(config);
          
          
                const result = await sql.query('SELECT Id,Tipo FROM Tipovehiculo order by Tipo');
          
          
          
                return result.recordset;
              } catch (error) {
                console.error('Error al obtener los datos:', error);
                throw error;
              }
            }
          
          
            async function generarSelectTipo2() {
              try {
          
                const tipo = await obtenerTipo2();
          
                let selectOptions = '<option value="Todos"  selected>Todos</option>';
          
                tipo.forEach((row) => {
                  selectOptions += `<option value="${row.Tipo}">${row.Tipo}</option>`;
                });
          
                const selectHtml = `<select>${selectOptions}</select>`;
                document.getElementById('tipofilter').innerHTML = selectHtml;
                return selectHtml;
              } catch (error) {
                console.error('Error al generar el select:', error);
                throw error;
              }
            }
          
            generarSelectTipo2()
              
    /******************************************************************************** */

    /******************************************************************************** */
    
    
            
      async function obtenerModelo() {
        try {
    
          await sql.connect(config);
    
          const result = await sql.query('SELECT Modelo FROM Modelo order by Modelo');
    
    
    
          return result.recordset;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          throw error;
        }
      }
    
    
      async function generarSelectmodelo() {
        try {
    
          const marcas = await obtenerModelo();
    
          let selectOptions = '<option value="Todos" selected>Todos</option>';
    
          marcas.forEach((row) => {
            selectOptions += `<option value="${row.Modelo}">${row.Modelo}</option>`;
          });
    
          const selectHtml = `<select>${selectOptions}</select>`;
          document.getElementById('modelofilter').innerHTML = selectHtml;
          return selectHtml;
        } catch (error) {
          console.error('Error al generar el select:', error);
          throw error;
        }
      }
    
      generarSelectmodelo()
       
    
    
    /******************************************************************************** */

    /******************************************************************************** */
            
      async function obtenerMarcasss() {
        try {
    
          await sql.connect(config);
    
          const result = await sql.query('SELECT Id,Marca FROM Marca order by Marca');
    
    
    
          return result.recordset;
        } catch (error) {
          console.error('Error al obtener los datos:', error);
          throw error;
        }
      }
    
    
      async function generarSelectMarcasss() {
        try {
    
          const marcas = await obtenerMarcasss();
    
          let selectOptions = '<option value="Todas" selected>Todas</option>';
    
          marcas.forEach((row) => {
            selectOptions += `<option value="${row.Marca}">${row.Marca}</option>`;
          });
    
          const selectHtml = `<select>${selectOptions}</select>`;
          document.getElementById('marcafilter').innerHTML = selectHtml;
          return selectHtml;
        } catch (error) {
          console.error('Error al generar el select:', error);
          throw error;
        }
      }
    
      generarSelectMarcasss()
        
    /******************************************************************************** */

    /******************************************************************************** */
    
          




  /******************************************************************************** */

  /******************************************************************************** */
    
            
    async function obtenerMarcass() {
        try {

        await sql.connect(config);

        const result = await sql.query('SELECT Id,Marca FROM Marca order by Marca');



        return result.recordset;
        } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
        }
    }


    async function generarSelectMarcass() {
        try {

        const marcas = await obtenerMarcass();

        let selectOptions = '<option value="" disabled selected>Seleccione</option>';

        marcas.forEach((row) => {
            selectOptions += `<option value="${row.Id}">${row.Marca}</option>`;
        });

        const selectHtml = `<select>${selectOptions}</select>`;
        document.getElementById('selectMarca').innerHTML = selectHtml;
        return selectHtml;
        } catch (error) {
        console.error('Error al generar el select:', error);
        throw error;
        }
    }

    generarSelectMarcass()
 
  /******************************************************************************** */

  /******************************************************************************** */

  
   
  /******************************************************************************** */

  /******************************************************************************** */
    
  //!Fin de generar select  según marcas

  //! Select de ubicaciones

  

  async function obtenerUbicacion() {
    try {

      await sql.connect(config);


      const result = await sql.query('SELECT Id,Estatusvehiculo FROM Estatusvehiculo');


      return result.recordset;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }


  async function generarSelectUbicacion() {
    try {

      const ubicacion = await obtenerUbicacion();

      let selectOptions = '<option value="" disabled selected>Seleccione</option>';

      ubicacion.forEach((row) => {
        selectOptions += `<option value="${row.Id}">${row.Estatusvehiculo}</option>`;
      });

      const selectHtml = `<select>${selectOptions}</select>`;
      document.getElementById('selectUbicacion').innerHTML = selectHtml;
      return selectHtml;
    } catch (error) {
      console.error('Error al generar el select:', error);
      throw error;
    }
  }

  generarSelectUbicacion()
   
  
  //! Fin del select de ubicaciones
  /******************************************************************************** */

  /******************************************************************************** */

  //! Select para obtener  tipos

  async function obtenerTipo() {
    try {

      await sql.connect(config);


      const result = await sql.query('SELECT Id,Tipo FROM Tipovehiculo order by Tipo');



      return result.recordset;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }


  async function generarSelectTipo() {
    try {

      const tipo = await obtenerTipo();

      let selectOptions = '<option value="" disabled selected>Seleccione</option>';

      tipo.forEach((row) => {
        selectOptions += `<option value="${row.Id}">${row.Tipo}</option>`;
      });

      const selectHtml = `<select>${selectOptions}</select>`;
      document.getElementById('selectTipo').innerHTML = selectHtml;
      return selectHtml;
    } catch (error) {
      console.error('Error al generar el select:', error);
      throw error;
    }
  }

  generarSelectTipo()
   
  /******************************************************************************** */

  /******************************************************************************** */
  //! Fin de el select de tipos

  //! select de los estatus

  async function obtenerEstatus() {
    try {

      await sql.connect(config);


      const result = await sql.query('SELECT Id,Estadocontrol FROM Estadocontrol');



      return result.recordset;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }


  async function generarSelectEstatus() {
    try {

      const estatus = await obtenerEstatus();

      let selectOptions = '<option value="" disabled selected>Seleccione</option>';

      estatus.forEach((row) => {
        selectOptions += `<option value="${row.Id}">${row.Estadocontrol}</option>`;
      });

      const selectHtml = `<select>${selectOptions}</select>`;
      document.getElementById('selectEcontrol').innerHTML = selectHtml;
      return selectHtml;
    } catch (error) {
      console.error('Error al generar el select:', error);
      throw error;
    }
  }

  generarSelectEstatus()
    
             
}

module.exports = select