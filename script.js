
document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("form-buscador");
    const buscador = document.getElementById("busqueda-productos");
    const mensaje = document.getElementById("mensaje-buscador");

    function normalizar(texto) {
        return (texto || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ")
            .trim();
    }

    const servicios = [
        {
            id: "galeria-cremalleras-electricas",
            nombres: [
                "cremalleras electricas",
                "cremallera electrica",
                "direccion electrica",
                "direcciones electricas",
                "rack electrico",
                "rack electrica",
                "eps"
            ]
        },
        {
            id: "galeria-cremalleras-hidraulicas",
            nombres: [
                "cremalleras hidraulicas",
                "cremallera hidraulica",
                "direccion hidraulica",
                "direcciones hidraulicas",
                "rack hidraulico"
            ]
        },
        {
            id: "galeria-cajas",
            nombres: [
                "cajas de direccion",
                "caja de direccion",
                "cajas direccion",
                "caja direccion"
            ]
        },
        {
            id: "galeria-bombas",
            nombres: [
                "bombas hidraulicas",
                "bomba hidraulica",
                "bomba de direccion",
                "bombas de direccion",
                "bombas",
                "bomba"
            ]
        },
        {
            id: "galeria-cilindros",
            nombres: [
                "cilindros hidraulicos",
                "cilindro hidraulico",
                "cilindros",
                "cilindro"
            ]
        },
        {
            id: "galeria-cabinas",
            nombres: [
                "sistemas levanta cabinas",
                "sistema levanta cabina",
                "levanta cabinas",
                "levanta cabina",
                "cabinas",
                "cabina"
            ]
        },
        {
            id: "galeria-elevadores",
            nombres: [
                "elevadores hidraulicos",
                "elevador hidraulico",
                "elevadores",
                "elevador"
            ]
        },
        {
            id: "galeria-tren",
            nombres: [
                "tren delantero",
                "tren"
            ]
        }
    ];

    // GALERÍAS GENERALES
    const galerias = servicios
        .map(servicio => document.getElementById(servicio.id))
        .filter(galeria => galeria !== null);

    // GALERÍAS INDIVIDUALES DE PRODUCTOS
    const galeriasProductos = [
        "galeria-producto-reacondicionada",
        "galeria-producto-nueva",
        "galeria-producto-modulo"
    ]
        .map(id => document.getElementById(id))
        .filter(galeria => galeria !== null);

    // TODAS LAS GALERÍAS
    const todasLasGalerias = [
        ...galerias,
        ...galeriasProductos
    ];

    function encontrarServicio(texto) {
        for (const servicio of servicios) {
            for (const nombre of servicio.nombres) {
                if (texto === nombre || texto.includes(nombre)) {
                    return servicio;
                }
            }
        }

        return null;
    }

    function ocultarGaleriasProductos() {
        galeriasProductos.forEach(galeria => {
            galeria.style.display = "none";
        });
    }

    function mostrarGaleria(galeriaElegida) {

        todasLasGalerias.forEach(galeria => {
            galeria.style.display =
                galeria.id === galeriaElegida.id ? "block" : "none";
        });

        if (mensaje) {
            mensaje.textContent = "";
        }

        requestAnimationFrame(() => {
            galeriaElegida.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    function mostrarTodasLasGalerias() {

        galerias.forEach(galeria => {
            galeria.style.display = "block";
        });

        ocultarGaleriasProductos();

        if (mensaje) {
            mensaje.textContent = "";
        }
    }

    // BUSCADOR
    if (formulario && buscador && mensaje) {

        formulario.addEventListener("submit", function(evento) {

            evento.preventDefault();

            const texto = normalizar(buscador.value);

            if (texto === "") {
                mostrarTodasLasGalerias();
                return;
            }

            const servicioEncontrado = encontrarServicio(texto);

            if (!servicioEncontrado) {
                mensaje.textContent =
                    "No encontramos ese servicio. Probá con otro nombre.";
                return;
            }

            const galeriaElegida =
                document.getElementById(servicioEncontrado.id);

            if (!galeriaElegida) {
                mensaje.textContent =
                    "No se pudo encontrar la galería de ese servicio.";
                return;
            }

            mostrarGaleria(galeriaElegida);

        });
    }

    // CLIC DIRECTO EN LOS ENLACES DE LAS GALERÍAS
    // EXCLUYE LOS BOTONES X DE CIERRE DE LAS IMÁGENES
    document.querySelectorAll(
        'a[href^="#galeria-"]:not(.lightbox-close)'
    ).forEach(enlace => {

        enlace.addEventListener("click", function(evento) {

            const idGaleria = this.getAttribute("href").substring(1);
            const galeriaElegida = document.getElementById(idGaleria);

            if (!galeriaElegida) {
                return;
            }

            evento.preventDefault();

            mostrarGaleria(galeriaElegida);

        });

    });

});
