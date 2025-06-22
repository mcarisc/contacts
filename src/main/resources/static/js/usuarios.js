// Call the dataTables jQuery plugin
$(document).ready(function() {
   cargarUsuarios();
  $('#usuarios').DataTable();
  actualizarEmailUsuario();
});

function actualizarEmailUsuario(){
    document.getElementById("emailUser").outerHTML = localStorage.email;
}

async function cargarUsuarios() {
    const request = await fetch('api/usuarios', {
      method: 'GET',
      headers: getHeaders(),
    });
    const usuarios = await request.json();
    iterarUsuarios(usuarios);
    console.log(usuarios);
}

function getHeaders(){
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.token
    };
}

async function eliminarUsuario(id){
    if(!confirm("¿Desea eliminar este usuario?"))
        return;

    const request = await fetch('api/usuarios/' + id, {
        method: 'DELETE',
        headers: getHeaders(),
    });
    location.reload();
}

function iterarUsuarios(usuarios){
  let usuario = "";
  for(let usr of usuarios) {
    let nombreCompleto = usr.nombre + ' '+ usr.apellido;
    let telefono = usr.telefono == null ? '-': usr.telefono;
    usuario +=
        '<tr><td>'+usr.id+'</td>' +
        '<td>'+nombreCompleto+'</td>' +
        '<td>'+usr.email+'</td>' +
        '<td>'+telefono+'</td>' +
        '<td>' +
        '<a href="#" onclick="eliminarUsuario('+ usr.id +')" class="btn btn-danger btn-circle" >' +
        '<i class="fas fa-trash"></i>' +
        '</a>' +
        '</td></tr></br>';
  }

  document.querySelector("#usuarios tbody").outerHTML = usuario;
}
