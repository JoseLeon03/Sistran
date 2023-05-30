function Cerrar() {
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
  }

function validarFormulario() {
    var usuario = document.getElementById("username").value;
    var contraseña = document.getElementById("password").value;
  
    if (usuario == "") {
      alert("Por favor, ingrese el usuario.");
      return false;
    }
    if ( contraseña == "") {   
        alert( "Por favor, ingrese la contraseña,");
        return false;
      }
    else {
      return true;
    }
  }
  