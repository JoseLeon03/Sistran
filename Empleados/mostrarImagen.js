

function mostrarImagenn(event) {
    const fileTypes = ['cedulaimg', 'licenciaimg', 'certificadoimg'];
    const fs = require('fs');
  
    let cedulaValue = document.getElementById('Cedula').value;
  
    fileTypes.forEach(fileType => {
        let div;
        if (fileType === 'cedulaimg') {
            div = document.querySelector('.cuadrocedula');
        } else if (fileType === 'licenciaimg') {
            div = document.querySelector('.cuadrolic');
        } else if (fileType === 'certificadoimg') {
            div = document.querySelector('.cuadrocertificado');
        }
  
        let existingImg = div.querySelector('img');
        if (existingImg) {
            div.removeChild(existingImg);
        }
  
        if (event && event.target.id === fileType) {
            let file = event.target.files[0];
            let reader = new FileReader();
            reader.onloadend = function() {
                let img = document.createElement('img');
                img.src = reader.result;
                img.style.width = '100%';
                img.style.height = '100%';
                div.appendChild(img);
            }
            reader.readAsDataURL(file);
        } else {
            // Ruta donde se encuentra el archivo
            let filePath = `\\\\10.50.1.36\\sistran\\fotos\\${fileType}\\${cedulaValue}_${fileType}.jpg`;
  
            if (fs.existsSync(filePath) && !document.getElementById(fileType).files.length) {
                fs.readFile(filePath, (err, data) => {
                    if (err) throw err;
  
                    let img = document.createElement('img');
                    img.src = `data:image/jpeg;base64,${data.toString('base64')}`;
                    img.style.width = '100%';
                    img.style.height = '100%';
  
                    div.appendChild(img);
                });
            }
        }
    });
}

document.getElementById('cedulaimg').addEventListener('change', mostrarImagenn);
document.getElementById('licenciaimg').addEventListener('change', mostrarImagenn);
document.getElementById('certificadoimg').addEventListener('change', mostrarImagenn);
document.getElementById('Cedula').addEventListener('input', mostrarImagenn);

module.exports = mostrarImagenn
