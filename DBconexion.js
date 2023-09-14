const sql = require('mssql');

var config = {
    user: 'sa',
    password: '',
    server: 'localhost',
    database: 'Pasantia',
    options: {
        encrypt: true,
        enableArithAbort:true,
        trustedConnection: true,
        trustServerCertificate: true ,
    },

};
sql.connect(config, err =>{

    if(err){
        console.error(err)
        return
    }
    else{
        console.log("conexion exitosa");
    }
})

module.exports = sql;