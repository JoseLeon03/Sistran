function limpiarImagenes() {
    const fileTypes = ['cedulaimg', 'licenciaimg', 'certificadoimg'];

    fileTypes.forEach(fileType => {
        let div;
        if (fileType === 'cedulaimg') {
            div = document.querySelector('.cuadrocedula');
        } else if (fileType === 'licenciaimg') {
            div = document.querySelector('.cuadrolic');
        } else if (fileType === 'certificadoimg') {
            div = document.querySelector('.cuadrocertificado');
        }

        // Limpiar el div
        div.innerHTML = '';

        // Limpiar el fondo del div
        div.style.backgroundImage = 'none';

        // Limpiar el input file
        let inputFile = document.getElementById(fileType);
        inputFile.value = '';
        inputFile.type = '';
        inputFile.type = 'file';
    });
}

module.exports = limpiarImagenes;
