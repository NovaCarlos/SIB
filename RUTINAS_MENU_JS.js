
function carga_Pagina(button, opc){
  // Remover clase 'active' de todos los botones
  var buttons = document.querySelectorAll('.Botones_De_Menu');
  buttons.forEach(function(btn) {
    btn.classList.remove('active');
    btn.style.color = 'white';
  });
  // Agregar clase 'active' al botón clickeado
  button.classList.add('active');
  button.style.color = 'black';

  if (opc === 1){
    request_Google('RUTINAS_ALTA');
  }else if (opc === 2){

  }

}

function request_Google(pageName){
  google.script.run.withSuccessHandler(loadGooglePage).getPage(pageName);
}

function loadGooglePage(contentPage){
    document.getElementById("Entorno_De_Visualizacion").innerHTML = contentPage;
}

