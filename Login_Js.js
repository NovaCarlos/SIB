<!-- ===== IONICONS ===== -->
    <script  src="https://code.jquery.com/jquery-3.1.1.min.js"  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="  crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" ></script>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>


    <script>
      $(document).ready(function(){
        $(".veen .rgstr-btn button").click(function(){
          $('.veen .wrapper').addClass('move');
          $('.body').css('background','#e0b722');
          $(".veen .login-btn button").removeClass('active');
          $(this).addClass('active');
        });

        $(".veen .login-btn button").click(function(){
          $('.veen .wrapper').removeClass('move');
          $('.body').css('background','#ff4931');
          $(".veen .rgstr-btn button").removeClass('active');
          $(this).addClass('active');
        });
      });
    </script>

    <script>
      function llama_Funcion_Login(){
        google.script.run.withSuccessHandler(returnVerificadorDeUsuarioLogin).getDataFromSheet();
      }

      function returnVerificadorDeUsuarioLogin(data){
        const xUsuario = document.getElementById("username").value;
        const xPass = document.getElementById("password").value;

        // Recorrer los datos para verificar si el usuario y contraseña existen
        var usuarioEncontrado = false;

        for (var i = 1; i < data.length; i++) {
          if (data[i][1].toString() === xUsuario && data[i][2].toString() === xPass) {
            // El usuario y contraseña existen
            usuarioEncontrado = true;

            localStorage.setItem("xUserStorage",data[i][3].toString());
            localStorage.setItem("xUserFef",data[i][4].toString());
            localStorage.setItem("xUserArea",data[i][5].toString());
            localStorage.setItem("lvlUserStorage", data[i][6].toString());

            login_DE_Usuario(localStorage.getItem("xUserStorage"));
            break;
          }
        }

        // Si el usuario y contraseña no se encuentran
        if (usuarioEncontrado === false) {
          alerta_funcion_Login(2,"");
        }
      }
        
      function login_DE_Usuario(xNombreUsuario){
        alerta_funcion_Login(1,xNombreUsuario);
        toggleDivs();
        carga_Menu_Principal();
      }

      function logout_De_Usuario(){
        carga_Menu_Principal();

        if (localStorage.getItem('xUserStorage')) {
          localStorage.removeItem('xUserStorage');
        }
        if (localStorage.getItem('xUserFef')) {
          localStorage.removeItem('xUserFef');
        }
        if (localStorage.getItem('xUserArea')) {
          localStorage.removeItem('xUserArea');
        }
        if (localStorage.getItem('lvlUserStorage')) {
          localStorage.removeItem('lvlUserStorage');
        }
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";

        toggleDivs();
      }

      function toggleDivs() {
        const div1 = document.getElementById('div1');
        const div2 = document.getElementById('div2');

        if (div1.classList.contains('visible')) {
          div1.classList.remove('visible');
          div1.classList.add('hidden');
          div2.classList.remove('hidden');
          div2.classList.add('visible');
        } else {
          div1.classList.remove('hidden');
          div1.classList.add('visible');
          div2.classList.remove('visible');
          div2.classList.add('hidden');
        }
      }
      
      function solicita_accesso(){
          alerta_funcion_Login(3,"");
      }
      
    </script>
    
    <script> //CUSTOM ALERT
        function alerta_funcion_Login(xStatus, xTexttoShow){
            switch(xStatus) {
                case 1:
                    Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "BIENVENIDO DE VUELTA " + xTexttoShow,
                    showConfirmButton: false,
                    timer: 1500
                  });
                break;
            
                case 2:
                    Swal.fire({
                        title: "ERROR DE USUARIO",
                        text: "Verifica tu usuario y/o contraseña",
                        icon: "error"
                    });
                break;
                
                case 3:
                    Swal.fire({
                        title: "EN PRODUCCION",
                        text: "Esta opcion aun esta en desarrollo!",
                        icon: "warning"
                    });
                    break;

                default:console.log("El valor no está entre 1 y 4");
            }
        }
    </script>
    
    <script>
        function carga_Menu_Principal(){
            document.getElementById("LB_User_Active").innerText = localStorage.getItem("xUserStorage");
            loadPage(0);
        }
        
        function loadPage(xID) {
            if (xID === 1){
                crearImagenAleatoria();
                request_Code_HTML('BITACORAS_MENU');
            }else if (xID === 2){
                crearImagenAleatoria();
                request_Code_HTML('RUTINAS_MENU');
            }else if (xID === 3){
                crearImagenAleatoria();
                request_Code_HTML('EMPLEADOS_MENU');
                carga_Lista_Empleados_Menu();
            }else if (xID === 0){
                crearImagenAleatoria();
            }else if(xID === 9){
                request_logout('LOGIN');
            }
        }
        
        function request_Code_HTML(xNamePage){
            google.script.run.withSuccessHandler(load_Code_HTML_to_Object).getPage(xNamePage);
        }
        
        function load_Code_HTML_to_Object(xHTML){
            document.getElementById('View_Page').innerHTML=xHTML;
        }
        
        function obtenerImagenAleatoria() {
            // Repositorio de enlaces de imágenes
            var imagenes = [
            "https://i.ytimg.com/vi/ygmAY2wy5D0/maxresdefault.jpg",
            "https://quierotv.mx/wp-content/uploads/2024/02/LINEA-4-TLAJOMULCO.jpeg",
            "https://linea4.jalisco.gob.mx/images/postlink.png",
            ];
            // Seleccionar aleatoriamente un enlace de imagen
            var indiceAleatorio = Math.floor(Math.random() * imagenes.length);
            return imagenes[indiceAleatorio];
        }
        
        function crearImagenAleatoria() {
            // Obtener una imagen aleatoria del repositorio
            var imagenAleatoria = obtenerImagenAleatoria();
            
            // Crear un nuevo objeto de imagen
            var imagen = new Image();
            
            // Asignar el src (URL) a la imagen
            imagen.src = imagenAleatoria;
            
            // Obtener referencia al div view_Pages
            var divViewPages = document.getElementById("View_Page");
            
            // Asegurarse de que el div view_Pages esté limpio
            divViewPages.innerHTML = '';
            
            // Añadir la imagen al div view_Pages
            divViewPages.appendChild(imagen);
            
            // Ajustar el tamaño de la imagen al tamaño del div
            imagen.style.width = "100%";
            imagen.style.height = "100%";
        }
      
        // -------- toggle sub menus --------
        const navLinks = document.querySelectorAll(".nav__link");
        navLinks.forEach((link) => link.addEventListener("click", drop));
        
        function drop() {
            const subMenu = this.nextElementSibling;
            if (subMenu) {
                // if sub menu exists
                if (subMenu.style.height === "0px" || subMenu.style.height === "") {
                    subMenu.style.height = subMenu.scrollHeight + "px";
                    // open side nav
                    sideNav.style.width = "20rem";
                } else {
                    subMenu.style.height = "0px";
                }
            }
        }
  
        // --------- Toggle Side Nav --------
        const menuBtn = document.querySelector("#nav-toggle");
        const sideNav = document.querySelector("#side-nav");
        const main = document.querySelector("#Main_Page");
        
        menuBtn.addEventListener("click", toggleSideNav);
        main.addEventListener("click",close_toggleSideNav);
        
        function activa_Botones_Side_MainMenu(){
            menuBtn.addEventListener("click", toggleSideNav);
        }
        
        function close_toggleSideNav(){
            sideNav.style.width = "7rem";
            // close all opened sub menus
            document.querySelectorAll('.nav__drop').forEach(drop => drop.style.height = '0px');
        }
      
        function toggleSideNav() {
            if (sideNav.style.width === "7rem" || sideNav.style.width === "") {
                sideNav.style.width = "20rem";
            } else {
                // close side nav
                sideNav.style.width = "7rem";
                // close all opened sub menus
                document.querySelectorAll('.nav__drop').forEach(drop => drop.style.height = '0px');
            }
        }
    </script>
