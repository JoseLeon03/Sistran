function limpiarCampos() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
}

function Validar() { 
    var usuario = document.getElementById("username").value;
    var contraseña = document.getElementById("password").value;
    if (usuario == "") {
        alert("Por favor, Ingrese un usuario");
        return false;
    }
    else if (contraseña == "") {
        alert("Por favor, Ingrese una contraseña")
    }
    else {
        return true;
    }
}
