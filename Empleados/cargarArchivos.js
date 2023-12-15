function uploadFile() {
    const fileTypes = ['cedulaimg', 'licenciaimg', 'certificadoimg'];
    const fs = require('fs');

    fileTypes.forEach(fileType => {
        let input = document.getElementById(fileType);
        let file = input.files[0];
        let reader = new FileReader();

        reader.onload = function(event) {
            let contents = event.target.result;
            let fileContents = Buffer.from(contents.split(',')[1], 'base64');
            
            let cedulaValue = document.getElementById('Cedula').value;

            // Ruta donde quieres guardar el archivo
            let newPath = `\\\\10.50.1.36\\sistran\\fotos\\${fileType}\\${cedulaValue}_${fileType}.jpg`; 

            fs.writeFile(newPath, fileContents, err => {
                if (err) throw err;
                console.log('Archivo guardado exitosamente');
            });
        };

        reader.readAsDataURL(file);
    });
}

module.exports = uploadFile;


