document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar datos del juego (con mejoras de compatibilidad)
    async function cargarDatosDelJuego() {
        try {
            // Usar fetch con mayor compatibilidad
            const respuesta = await Promise.race([
                fetch('/api/detalles-juego'),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 10000))
            ]);

            if (!respuesta.ok) {
                throw new Error(`HTTP error! status: ${respuesta.status}`);
            }

            const datosJuego = await respuesta.json();

            // Usar querySelector con mayor tolerancia
            const tituloJuego = document.querySelector('#titulo-juego') || document.getElementById('titulo-juego');
            const imagenJuego = document.querySelector('.imagen-principal-juego') || document.getElementsByClassName('imagen-principal-juego')[0];
            const descripcionJuego = document.querySelector('.descripcion-juego p') || document.getElementsByClassName('descripcion-juego')[0]?.querySelector('p');

            // Verificaciones de existencia antes de asignar
            if (tituloJuego) tituloJuego.textContent = datosJuego.nombre;
            if (imagenJuego) imagenJuego.src = datosJuego.imagenPrincipal;
            if (descripcionJuego) descripcionJuego.textContent = datosJuego.descripcion;
            
            // Actualiza estadísticas con verificaciones
            const contadorJugadores = document.getElementById('contador-jugadores');
            const puntuacionMedia = document.getElementById('puntuacion-media');
            const dificultadJuego = document.getElementById('dificultad-juego');

            if (contadorJugadores) contadorJugadores.textContent = datosJuego.contadorJugadores;
            if (puntuacionMedia) puntuacionMedia.textContent = datosJuego.puntuacionMedia;
            if (dificultadJuego) dificultadJuego.textContent = datosJuego.dificultad;

        } catch (error) {
            console.error('Error al cargar datos del juego:', error);
            mostrarMensajeError('No se pudieron cargar los datos del juego');
        }
    }

    // Función para manejar el botón de jugar (con compatibilidad de eventos)
    function configurarBotonJugar() {
        const botonJugar = document.getElementById('boton-jugar');
        
        if (botonJugar) {
            // Usar addEventListener con fallback para IE
            if (botonJugar.addEventListener) {
                botonJugar.addEventListener('click', manejarClicJugar);
            } else if (botonJugar.attachEvent) {
                botonJugar.attachEvent('onclick', manejarClicJugar);
            }
        }
    }

    function manejarClicJugar() {
        const usuarioRegistrado = verificarInicioSesion();
        
        if (usuarioRegistrado) {
            // Usa window.location con mayor compatibilidad
            window.location.assign(`/juego/${idJuego}`);
        } else {
            // Usar alert o modal cross-browser
            if (window.confirm) {
                window.confirm('Por favor, inicia sesión para jugar');
            } else {
                alert('Por favor, inicia sesión para jugar');
            }
            window.location.assign('/iniciar-sesion');
        }
    }

    // Función para verificar inicio de sesión (con soporte amplio)
    function verificarInicioSesion() {
        try {
            return !!(window.localStorage && localStorage.getItem('tokenUsuario'));
        } catch(e) {
            // Fallback para navegadores con localStorage restringido
            return false;
        }
    }

    // Cargar comentarios con mejor manejo de errores
    async function cargarComentarios() {
        try {
            const respuesta = await fetch('/api/comentarios-juego');
            
            if (!respuesta.ok) {
                throw new Error(`HTTP error! status: ${respuesta.status}`);
            }

            const comentarios = await respuesta.json();
            
            const contenedorComentarios = document.getElementById('contenedor-comentarios');
            if (contenedorComentarios) {
                contenedorComentarios.innerHTML = ''; // Limpiar comentarios anteriores

                comentarios.forEach(comentario => {
                    const elementoComentario = document.createElement('div');
                    elementoComentario.className = 'comentario';
                    elementoComentario.innerHTML = `
                        <strong>${comentario.nombreUsuario || 'Usuario'}</strong>
                        <p>${comentario.texto || 'Sin contenido'}</p>
                        <small>${comentario.fecha || new Date().toLocaleDateString()}</small>
                    `;
                    contenedorComentarios.appendChild(elementoComentario);
                });
            }
        } catch (error) {
            console.error('Error al cargar comentarios:', error);
            mostrarMensajeError('No se pudieron cargar los comentarios');
        }
    }

    // Configuración de formulario de comentarios con mejoras
    function configurarFormularioComentarios() {
        const formularioComentarios = document.getElementById('formulario-comentarios');
        
        if (formularioComentarios) {
            // Usar addEventListener con fallback para IE
            if (formularioComentarios.addEventListener) {
                formularioComentarios.addEventListener('submit', manejarEnvioComentario);
            } else if (formularioComentarios.attachEvent) {
                formularioComentarios.attachEvent('onsubmit', manejarEnvioComentario);
            }
        }
    }

    async function manejarEnvioComentario(e) {
        // Prevenir comportamiento por defecto de manera compatible
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

        const formularioComentarios = document.getElementById('formulario-comentarios');
        const areaTexto = formularioComentarios?.querySelector('textarea');
        
        if (!areaTexto) return;

        try {
            const respuesta = await fetch('/api/enviar-comentario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    texto: areaTexto.value,
                    idUsuario: obtenerIdUsuario()
                })
            });

            if (!respuesta.ok) {
                throw new Error(`HTTP error! status: ${respuesta.status}`);
            }
            
            areaTexto.value = ''; // Limpiar el formulario
            await cargarComentarios(); // Recargar los comentarios
            mostrarMensajeExito('Comentario enviado correctamente');
        } catch (error) {
            console.error('Error al enviar comentario:', error);
            mostrarMensajeError('No se pudo enviar el comentario');
        }
    }

    // Obtener ID de usuario con mayor robustez
    function obtenerIdUsuario() {
        try {
            return localStorage.getItem('idUsuario') || null;
        } catch(e) {
            return null;
        }
    }

    // Funciones de mensajes con mayor flexibilidad
    function mostrarMensajeError(mensaje) {
        const contenedorMensajes = document.getElementById('contenedor-mensajes');
        if (contenedorMensajes) {
            contenedorMensajes.innerHTML = `
                <div class="mensaje-error">
                    <p>${mensaje}</p>
                </div>
            `;
        }
    }

    function mostrarMensajeExito(mensaje) {
        const contenedorMensajes = document.getElementById('contenedor-mensajes');
        if (contenedorMensajes) {
            contenedorMensajes.innerHTML = `
                <div class="mensaje-exito">
                    <p>${mensaje}</p>
                </div>
            `;
        }
    }

    // Función de inicialización con verificaciones
    function inicializar() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', realizarInicializacion);
        } else {
            realizarInicializacion();
        }
    }

    function realizarInicializacion() {
        cargarDatosDelJuego();
        configurarBotonJugar();
        cargarComentarios();
        configurarFormularioComentarios();
    }

    // Llamar a la inicialización
    inicializar();
});