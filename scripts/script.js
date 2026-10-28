document.addEventListener('DOMContentLoaded', () => {

    // 1. Audio sintetizado nativo
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioCtx = null;

    function playSound(type) {
        if (!audioCtx) audioCtx = new AudioContext();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        const now = audioCtx.currentTime;

        if (type === 'zoom') {
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.exponentialRampToValueAtTime(800, now + 0.3);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
        } else if (type === 'open') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(1200, now + 0.2);
            gain.gain.setValueAtTime(0.3, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
            osc.start(now); osc.stop(now + 0.25);
        } else if (type === 'close') {
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
            gain.gain.setValueAtTime(0.2, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
            osc.start(now); osc.stop(now + 0.2);
        }
    }

    // 2. Inicializar Mapa Real Leaflet
    const map = L.map('map', { zoomControl: false }).setView([12.8654, -85.2072], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    // 3. Base de Datos de Departamentos
    const departamentosData = [
        {
            id: "managua",
            nombre: "Managua",
            coords: [12.1364, -86.2514],
            eje: "Comercio, Servicios e Infraestructura",
            proyecto: "Paso a Desnivel Las Piedrecitas y Complejo Hospitalario",
            desc: "Polo económico principal de Nicaragua. Modernización vial masiva con pasos a desnivel, hospitales de alta tecnología y parques industriales.",
            icono: "🏢", 
            imagenes: [
            {
                src: "images/departamentos/managua/paso_desnivel.png",
                texto: "Infraestructura - Paso a desnivel las piedrecitas.",
            },
            {
                src: "images/departamentos/managua/comercio1.png",
                texto: "Comercio - Mercado Oriental",
            },
            {
                src: "images/departamentos/managua/comercio2.png",
                texto: "Comercio - China Mall",
            },
            {
                src: "images/departamentos/managua/servicio1.png",
                texto: "Servicio - Hospital Vélez Paiz",
            },
            {
                src: "images/departamentos/managua/servicio2.png",
                texto: "Servivio - Hospital Militar",
            },
            {
                src: "images/departamentos/managua/infraestructura1.png",
                texto: "Infraestructura - Pista heroes de la insurrección",
            },
            {
                src: "images/departamentos/managua/industria.png",
                texto: "Industria - Zona franca",
            }
            ],
        },
    
    
    
        {
            id: "chinandega",
            nombre: "Chinandega",
            coords: [12.6294, -87.1311],
            eje: "Agroindustria y Operación Portuaria",
            proyecto: "Modernización de Puerto Corinto y Tecnificación Camaronera",
            desc: "Clave para las exportaciones del país. Concentra el puerto Corinto, la producción de azúcar y granjas camaroneras tecnificadas.",
            icono: "⚓",
            imagenes: [
            {
                src: "images/departamentos/chinandega/agroi1.png",
                texto: "Agroindustría - Centro Tecnológico Carlos Manuel Venegas",
            },
            {
                src: "images/departamentos/chinandega/act_portuaria1.png",
                texto: "Actividad Portuaria - Puerto Corinto",
            },
            {
                src: "images/departamentos/chinandega/camaron.png",
                texto: "Tecnificación Camaronera",
            },
            {
                src: "images/departamentos/chinandega/azucar.png",
                texto: "Producción de caña de azucar",
            },
            {
                src: "images/departamentos/chinandega/agroi2.png",
                texto: "Agroindustría - UNA",
            }
            ],
        },
    
    
    
        {
            id: "leon",
            nombre: "León",
            coords: [12.4379, -86.8780],
            eje: "Turismo, Salud y Agroindustria",
            proyecto: "Nuevo Hospital Oscar Danilo Rosales (HEODRA)",
            desc: "Destacado centro universitario, turismo colonial y el centro hospitalario más moderno del occidente del país.",
            icono: "🎓",
            imagenes: [
            {
                src: "images/departamentos/leon/com_U1.png",
                texto: "Centro universitario - Carlos Fonseca UNAN León.",
            },
            {
                src: "images/departamentos/leon/turismo1.png",
                texto: "Turismo - Arquitectura colonial.",
            },
            {
                src: "images/departamentos/leon/turismo2.png",
                texto: "Turismo - Catedral de León.",
            },
            {
                src: "images/departamentos/leon/salud1.png",
                texto: "Salud - HEODRA",
            },
            {
                src: "images/departamentos/leon/salud2.png",
                texto: "Salud - Hospital Escuela Óscar Danilo Rosales Argüello.",
            },
            {
                src: "images/departamentos/leon/agroi1.png",
                texto: "Agroindustría",
            }
            ],
        },
    
    
    
        {
            id: "esteli",
            nombre: "Estelí",
            coords: [13.0918, -86.3538],
            eje: "Manufactura de Tabaco e Industria Norte",
            proyecto: "Expansión de Zonas Francas de Puros Premiums",
            desc: "Motor industrial del norte nicaragüense, líder mundial en la exportación de puros artesanales de alta calidad.",
            icono: "🏭",
            imagenes: [
            {
                src: "images/departamentos/esteli/manut1.png",
                texto: "Manufactura del tabaco.",
            },
            {
                src: "images/departamentos/esteli/export.png",
                texto: "Exportación de puros de alta calidad.",
            },
            {
                src: "images/departamentos/esteli/export2.png",
                texto: "Exportacion de puros.",
            },
            {
                src: "images/departamentos/esteli/tabacof1.png",
                texto: "Industria - Kaitai.",
            },
            {
                src: "images/departamentos/esteli/tabacof2.png",
                texto: "Industria - Zona franca de puros",
            }
            ],
        },
    
    
    
        {
            id: "matagalpa",
            nombre: "Matagalpa",
            coords: [12.9252, -85.9178],
            eje: "Producción Cafetalera y Ganadería",
            proyecto: "Plan Nacional de Apoyo a la Caficultura y Electrificación",
            desc: "Polo agrícola enfocado en el café de exportación y lácteos con proyectos de electrificación rural que transforman la productividad.",
            icono: "☕",
            imagenes: [
            {
                src: "images/departamentos/matagalpa/cafe1.png",
                texto: "Producción cafetelera.",
            },
            {
                src: "images/departamentos/matagalpa/cafe2.png",
                texto: "Prodicción cafetelera.",
            },
            {
                src: "images/departamentos/matagalpa/elec1.png",
                texto: "Plan nacional de electrificación.",
            },
            {
                src: "images/departamentos/matagalpa/ganado.png",
                texto: "Ganadería.",
            },
            {
                src: "images/departamentos/matagalpa/cafe3.png",
                texto: "Producción cafetelera",
            }
            ],
        },
    
    
    
        {
            id: "rivas",
            nombre: "Rivas",
            coords: [11.4372, -85.8263],
            eje: "Energía Limpia y Desarrollo Costero",
            proyecto: "Parques Eólicos de Amayo y Carretera Costanera",
            desc: "Pionero nacional en la transformación energética mediante aerogeneradores eólicos e impulsor del turismo de playa.",
            icono: "💨",
            imagenes: [
            {
                src: "images/departamentos/rivas/e_eol1.png",
                texto: "Energía limpia - aeorogeneradores eolicos,",
            },
            {
                src: "images/departamentos/rivas/carretera.png",
                texto: "Desarrollo Costero - Carretera Costanera.",
            },
            {
                src: "images/departamentos/rivas/t_playa1.png",
                texto: "Desarrollo costero - Impulso al turismo de playa.",
            },
            {
                src: "images/departamentos/rivas/e_eol2.png",
                texto: "energía limpia - Parque Eólico de Amayo",
            }
            ],
        },
    
    
    
        {
            id: "raccs",
            nombre: "RACCS (Costa Caribe Sur)",
            coords: [12.0137, -83.7635],
            eje: "Conectividad Interoceánica y Puertos",
            proyecto: "Carretera Nueva Guinea - Bluefields",
            desc: "Obra histórica de infraestructura vial con concreto hidráulico que unió permanentemente el Pacífico con el Caribe Sur.",
            icono: "🚢",
            imagenes: [
            {
                src: "images/departamentos/raas/conect1.png",
                texto: "Carretera Nueva Guinea - Bluefields.",
            },
            {
                src: "images/departamentos/raas/inter_o.png",
                texto: "Conectividad Interoceanica.",
            },
            {
                src: "images/departamentos/raas/puerto.png",
                texto: "Puertos - Bluefields",
            },
            {
                src: "images/departamentos/raas/conect2.png",
                texto: "Carretera Nueva Guinea - Bluefields.",
            }
            ],
        }
    ];
    
    
let imagenActual = 0;
let imagenesDepartamento = [];

const modalImg = document.getElementById('modal-img');
const galleryPrev = document.getElementById('gallery-prev');
const galleryNext = document.getElementById('gallery-next');
const galleryCounter = document.getElementById('gallery-counter');

function actualizarGaleria() {
    if (imagenesDepartamento.length === 0) {
        modalImg.removeAttribute('src');
        modalImg.alt = 'No hay imágenes disponibles';
        galleryCounter.textContent = 'Sin imágenes';
        galleryPrev.hidden = true;
        galleryNext.hidden = true;
        return;
    }

 const imagen = imagenesDepartamento[imagenActual];

modalImg.src = imagen.src;
modalImg.alt = imagen.texto || "Imagen del departamento";

const caption = document.getElementById('gallery-caption');

if (caption) {
    caption.textContent = imagen.texto || "";
}
    galleryCounter.textContent =
        `${imagenActual + 1} / ${imagenesDepartamento.length}`;

    const mostrarFlechas = imagenesDepartamento.length > 1;
    galleryPrev.hidden = !mostrarFlechas;
    galleryNext.hidden = !mostrarFlechas;
}

galleryPrev.addEventListener('click', () => {
    imagenActual =
        (imagenActual - 1 + imagenesDepartamento.length)
        % imagenesDepartamento.length;

    actualizarGaleria();
});

galleryNext.addEventListener('click', () => {
    imagenActual =
        (imagenActual + 1) % imagenesDepartamento.length;

    actualizarGaleria();
});


    const modal = document.getElementById('modal-info');
    const modalClose = document.getElementById('modal-close');
    const btnCerrarFooter = document.getElementById('btn-cerrar-footer');

    function abrirModal(dept) {
        document.getElementById('modal-title').innerText = dept.nombre;
        document.getElementById('modal-desc').innerText = dept.desc;
        document.getElementById('modal-eje').innerText = dept.eje;
        document.getElementById('modal-proyecto').innerText = dept.proyecto;
        document.getElementById('modal-icon').innerText = dept.icono;
        imagenesDepartamento = dept.imagenes || [];
imagenActual = 0;
actualizarGaleria();
        
        playSound('open');
        modal.classList.add('active');
    }

    function cerrarModal() {
        map.setView([12.8654, -85.2072], 7, { animate: true, duration: 1 });
        modal.classList.remove('active');
        playSound('close');
    }

    // 4. Agregar Marcadores donde las ondas se insertan directamente dentro del nodo marcador
    departamentosData.forEach(dept => {
        const customIcon = L.divIcon({
            className: 'custom-map-marker',
            html: `
                <div class="marker-wrapper" style="position: relative; width: 16px; height: 16px;">
                    <div style="width: 16px; height: 16px; background: #f43f5e; border: 2px solid #fff; border-radius: 50%; box-shadow: 0 0 10px #f43f5e; position: absolute; top:0; left:0; z-index:2;"></div>
                    <div class="ripple-wave-1"></div>
                    <div class="ripple-wave-2"></div>
                </div>
            `,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
        });

        const marker = L.marker(dept.coords, { icon: customIcon }).addTo(map);

        marker.on('click', () => {
            playSound('zoom');

            // Activar la clase de animación de ondas en el elemento del DOM del marcador específico
            const markerElement = marker.getElement();
            if (markerElement) {
                const waves = markerElement.querySelectorAll('.ripple-wave-1, .ripple-wave-2');
                waves.forEach(wave => {
                    wave.style.animation = 'none';
                    wave.offsetHeight; // Forzar reflow para reiniciar la animación
                    wave.style.animation = 'waterRippleMarker 1.2s cubic-bezier(0, 0.2, 0.8, 1) forwards';
                });
            }

            // Zoom fluido hacia el punto exacto
            map.flyTo(dept.coords, 10, {
                duration: 1.2
            });

            setTimeout(() => {
                abrirModal(dept);
            }, 1000);
        });
    });

    modalClose.addEventListener('click', cerrarModal);
    btnCerrarFooter.addEventListener('click', cerrarModal);
});


// Cerrar al tocar el fondo del modal
modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        cerrarModal();
    }
    modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        cerrarModal();
    }
});
});
});

