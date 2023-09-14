
const sql = require('mssql')

const config= {

  host :'10.50.1.36',
  user: 'sa',
  password: '',
  server: 'SRVSISTRAN',
  database: 'Sistran',
  options: {
    encrypt: true,
    enableArithAbort:true,
    trustedConnection: true,
    trustServerCertificate: true ,
  }


}



 const consultar = new sql.ConnectionPool(config)

 module.exports = {consultar, config};

//  10.50.1.36 SRVSISTRAN