//VARIABLES
const btnInst = document.querySelector('.btnInstalaciones');
const btnCor = document.querySelector('.btnCorrectivos');
const btnGenerar = document.querySelector('.btnGenerar');
const btnCopiar = document.querySelector('.btnCopiar');
const btnLimpiar = document.querySelector('.btnLimpiar');
const salidaPlantilla = document.querySelector('.salida-plantilla');
const formAction = document.querySelector('#form-action');
const btnLayout = document.querySelector('.btnLayout');
const btnSalvar = document.querySelector('.btnSalvar');
const forms = document.querySelector('#formulario');
const formInst = document.querySelector('#formulario');

const agregarVobo = document.querySelector('#agregar-vobo');

// Referencia al botón de cambio de tema
const themeToggleBtn = document.querySelector('#theme-toggle');


let nombreIDC = localStorage.getItem('nombreIDC');
let infoJson;


let infoJson2;
let historialLayouts = JSON.parse(localStorage.getItem('historialLayouts')) || [];

//Objeto instalaciones, datos a almacenar
let infoInst = {
    nombre: '',
    fecha: '10-10-2022',
    banco: '',
    sucursal: '',
    id: '',
    llamada: 'N/A',
    tiket: '',
    tarea: '',
    serieEquipo: '',
    modelo: '',
    horaInicioViaje: '',
    horaLlegada: '',
    horaInicioRep: '',
    horaTerminoRep: '',
    horaValidacionBco: '',
    fallaReportada: 'PUESTA EN SERVICIO',
    comentarios: '',
    causa: '457',
    solucion: '723',
    codigoIntervencion: 'PUESTA EN SERVICIO',
    validaLinea: '',
    validaSitio: '',
    aireAcondicionado: 'SI',
    regulador: 'SI',
    condiciones: 'OK',
    fallaEncontrada: 'SIN FALLAS',
    fti: '120.0',
    fni: '120.1',
    tni: '0.1',
    fto: '130.0',
    fno: '130.1',
    tno: '0.1',
    numParte: '',
    descripcionParte: '',
    cantidad: '',
    NSInstalada: '',
    NSRetirada: '',
    kilometros: ''
};

//Datos de falla
let corrInfo = {
    proveedor: '',
    tarea: '',
    tiket: '',
    id: '',
    nombreSitio: '',
    marcaModelo: '',
    serie: '',
    sitio: '',
    nombre: '',
    encontroCajero: '',
    fallaReportada: '',
    codigoError: '',
    modulo: '',
    causa: '',
    solucion: '',
    pruebas: '',
    comoDejaCajero: '',
    fti: '130.0',
    fni: '130.1',
    tni: '0.1',
    fto: '120.0',
    fno: '120.1',
    tno: '0.1',
    datosEntorno: '',
    cargo: '',
    cargoValor: '',
    otroCargo: '',
    partes: '',
    trakingSitio: '',
    software: '',
    version: '',
    fecha: '',
    regrabado: '',
    llegada: '',
    inicio: '',
    notas: '',
    validacion: '',
    retiro: '',
    voboBanco: '',
    voboSitio: '',
    comentarios: ''
};

//infoInst.banco;
let seleccionado = 0;

//EVENTOS
document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // LÓGICA DE MODO OSCURO (Dark Mode) - PRIORIDAD ALTA
    // =========================================
    // 1. Revisar preferencia guardada
    try {
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
            if (currentTheme === 'dark') {
                if (themeToggleBtn) themeToggleBtn.textContent = '☀️';
            }
        }
    } catch (e) {
        console.error("Error accediendo a localStorage para el tema:", e);
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    } else {
        console.error("Botón de cambio de tema no encontrado");
    }

    //Recupera la info de local
    try {
        retornarInfo();
    } catch (error) {
        console.error("Error al recuperar información:", error);
    }

    if (!nombreIDC) {
        preguntaNombre();
    }

    try {
        addEventListeners();
    } catch (error) {
        console.error("Error al agregar listeners:", error);
    }

    // Registro de Service Worker para modo offline
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('Service Worker registrado correctamente', reg))
                .catch(err => console.log('Error al registrar Service Worker', err));
        });
    }
})

function addEventListeners() {
    btnInst.addEventListener('click', () => {
        seleccionado = 1;
        mostrarPlantilla();
    });

    btnCor.addEventListener('click', () => {
        seleccionado = 2;
        mostrarPlantilla();
    });
    btnGenerar.addEventListener('click', generarLayout);
    btnCopiar.addEventListener('click', copiarLayout);
    btnLayout.addEventListener('click', mostrarLayouts);
    btnSalvar.addEventListener('click', salvarInformacion);
}


btnLimpiar.addEventListener('click', () => {
    localStorage.removeItem('infoInstalaciones');
    localStorage.removeItem('infoCorrectivos');
    location.reload();
});

// =========================================
// FUNCIÓN TOGGLE THEME
// =========================================
function toggleTheme() {
    // Verificar si tiene el atributo actualmente
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let targetTheme = 'light';

    if (currentTheme === 'dark') {
        targetTheme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleBtn.textContent = '🌙'; // Icono Luna
        localStorage.setItem('theme', 'light');
    } else {
        targetTheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️'; // Icono Sol
        localStorage.setItem('theme', 'dark');
    }
}


//FUNCIONES
//MUestra los datos a llenar-modificar por generar el formulario en lugar de solo ocultarlo.
function mostrarPlantilla() {
    if (seleccionado == 1) {
        borrarform();
        crearFormInst();

        // const formulario = document.querySelector('.formularios');
        // formulario.removeAttribute('hidden');
    } else if (seleccionado == 2) {
        borrarform();
        crearFormCorr();
        // const formulario = document.querySelector('.formularios2');
        // formulario.removeAttribute('hidden');
    }
    btnGenerar.classList.remove('deshabilitar');
    btnSalvar.classList.remove('deshabilitar');
}

function mostrarLayouts() {
    borrarform();
    borrarResultado();

    const titulo = document.createElement('h2');
    titulo.textContent = 'Historial de Layouts Guardados (Modo Offline)';
    titulo.style.textAlign = 'center';
    titulo.style.fontSize = '2rem';
    titulo.style.color = 'var(--primary)';
    forms.appendChild(titulo);

    if (historialLayouts.length === 0) {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay layouts guardados en este dispositivo.';
        mensaje.style.textAlign = 'center';
        forms.appendChild(mensaje);
        return;
    }

    const lista = document.createElement('div');
    lista.classList.add('historial-lista');

    historialLayouts.forEach(layout => {
        const item = document.createElement('div');
        item.style.border = '1px solid var(--border-color)';
        item.style.padding = '1.5rem';
        item.style.marginBottom = '1.5rem';
        item.style.borderRadius = '8px';
        item.style.backgroundColor = 'var(--white)';
        item.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';

        item.innerHTML = `
            <p><strong>Tipo:</strong> ${layout.tipo}</p>
            <p><strong>ID:</strong> ${layout.identificador}</p>
            <p><strong>Fecha Guardado:</strong> ${layout.fechaH}</p>
            <div class="botones-historial" style="display:flex; gap:10px; margin-top:10px;">
                <button class="btnNormal" onclick="verLayoutHistorial(${layout.id})" style="background:var(--primary); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Ver</button>
                <button class="btnEditarH" onclick="editarLayoutHistorial(${layout.id})" style="background:var(--success); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Editar</button>
                <button class="btnBorrarH" onclick="borrarLayoutHistorial(${layout.id})" style="background:var(--danger); color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer;">Borrar</button>
            </div>
        `;
        lista.appendChild(item);
    });

    forms.appendChild(lista);
}

// Globales para acceso desde HTML inyectado
window.verLayoutHistorial = (id) => {
    const layout = historialLayouts.find(l => l.id === id);
    if (layout) {
        borrarResultado();
        const div = document.createElement('div');
        div.innerHTML = layout.html;
        salidaPlantilla.appendChild(div);
        btnCopiar.classList.remove('deshabilitar');
        window.scrollTo(0, document.body.scrollHeight);
    }
};

window.editarLayoutHistorial = (id) => {
    const layout = historialLayouts.find(l => l.id === id);
    if (layout) {
        if (!layout.datos) {
            alert('Esta plantilla fue guardada en una versión anterior y no contiene los datos editables. Solo puedes "Verla".');
            return;
        }

        if (confirm('¿Deseas cargar esta plantilla en el formulario para editarla? Se sobrescribirán los datos actuales en el formulario.')) {
            // Establecer el tipo de formulario
            seleccionado = layout.seleccionado;

            // Cargar los datos en el objeto correspondiente y persistir en localStorage
            if (seleccionado === 1) {
                infoInst = { ...layout.datos };
                localStorage.setItem('infoInstalaciones', JSON.stringify(infoInst));
            } else if (seleccionado === 2) {
                corrInfo = { ...layout.datos };
                localStorage.setItem('infoCorrectivos', JSON.stringify(corrInfo));
            }

            // Mostrar la plantilla (esto genera el formulario con los datos cargados)
            mostrarPlantilla();

            // Hacer scroll al formulario
            window.scrollTo(0, 0);
            alert('Plantilla cargada correctamente. Ahora puedes realizar tus ediciones.');
        }
    }
};

window.borrarLayoutHistorial = (id) => {
    if (confirm('¿Estás seguro de borrar este registro del historial?')) {
        historialLayouts = historialLayouts.filter(l => l.id !== id);
        localStorage.setItem('historialLayouts', JSON.stringify(historialLayouts));
        mostrarLayouts();
    }
};

function generarLayout(e) {
    e.preventDefault();


    //Borrar layout anterior
    borrarResultado();
    if (seleccionado == 1) {
        layoutInstalaciones();
    } else if (seleccionado == 2) {
        layoutCorrectivos();
    }

    // Obtenemos el valor actual del input para asegurar que sea lo que el usuario ve
    if (seleccionado == 2) {
        const codigoErrorActual = document.querySelector('#cargoValor2').value;
        if (!alert(`PRECAUCIÓN: Asegurate que el codigo ${codigoErrorActual} sea el correcto.`)) {
            return;
        }
    }

}

//Función que copia el resultado a el portapapeles.
function copiarLayout(e) {
    e.preventDefault();
    const elemento = document.querySelector('.salida-plantilla').textContent;

    navigator.clipboard.writeText(elemento)
        .then(() => {
            alert('Precaución: Antes de cerrar servicio revisa detenidamente toda la infornación.');
        })
        .catch(() => {
            console.log('Algo salio mal...', err)
        })
}

function limpiarForm() {
    formAction.reset();
}

//Borra en contenido de resultado
function borrarResultado() {
    while (salidaPlantilla.firstChild) {
        salidaPlantilla.removeChild(salidaPlantilla.firstChild);
    }
}
function borrarform() {
    while (formulario.firstChild) {
        formulario.removeChild(formulario.firstChild);
    }
}

function salvarInformacion(e) {
    e.preventDefault();

    // Verificamos si hay algo en la salida de plantilla
    if (!salidaPlantilla.firstChild) {
        alert('Primero debes "Generar Layout" para poder guardarlo.');
        return;
    }

    const idATM = seleccionado === 1 ? (document.querySelector('#id') ? document.querySelector('#id').value : 'N/A') : (document.querySelector('#id2') ? document.querySelector('#id2').value : 'N/A');

    const nuevoRegistro = {
        id: Date.now(),
        fechaH: new Date().toLocaleString(),
        tipo: seleccionado === 1 ? 'Instalación' : 'Servicio',
        identificador: idATM,
        html: salidaPlantilla.innerHTML,
        seleccionado: seleccionado,
        datos: seleccionado === 1 ? { ...infoInst } : { ...corrInfo }
    };

    historialLayouts.unshift(nuevoRegistro); // Agregar al inicio
    localStorage.setItem('historialLayouts', JSON.stringify(historialLayouts));

    alert('¡Layout guardado exitosamente en el historial del dispositivo!');
}

function layoutInstalaciones() {
    //Generar layout
    const nombre = document.querySelector('#nombre').value;
    const fecha = document.querySelector('#fecha').value;
    const banco = document.querySelector('#banco').value;
    const sucursal = document.querySelector('#sucursal').value;
    const id = document.querySelector('#id').value;
    const llamada = document.querySelector('#llamada').value;
    const tiket = document.querySelector('#tiket').value;
    const tarea = document.querySelector('#tarea').value;
    const serieEquipo = document.querySelector('#serieEquipo').value;
    const modelo = document.querySelector('#modelo').value;
    const horaInicioViaje = document.querySelector('#horaInicioViaje').value;
    const horaLlegada = document.querySelector('#horaLlegada').value;
    const horaInicioRep = document.querySelector('#horaInicioRep').value;
    const horaTerminoRep = document.querySelector('#horaTerminoRep').value;
    const horaValidacionBco = document.querySelector('#horaValidacionBco').value;
    const fallaReportada = document.querySelector('#fallaReportada').value;
    const comentarios = document.querySelector('#comentarios').value;
    const fallaEncontrada = document.querySelector('#fallaEncontrada').value;
    const causa = document.querySelector('#causa').value;
    const solucion = document.querySelector('#solucion').value;
    const codigoIntervencion = document.querySelector('#codigoIntervencion').value;
    const validaLinea = document.querySelector('#validaLinea').value;
    const validaSitio = document.querySelector('#validaSitio').value;
    const aireAcondicionado = document.querySelector('#aireAcondicionado').value;
    const regulador = document.querySelector('#regulador').value;
    const condiciones = document.querySelector('#condiciones').value;
    //Voltajes
    const fti = document.querySelector('#FTI').value;
    const fni = document.querySelector('#FNI').value;
    const tni = document.querySelector('#TNI').value;
    const fto = document.querySelector('#FTO').value;
    const fno = document.querySelector('#FNO').value;
    const tno = document.querySelector('#TNO').value;

    const numParte = document.querySelector('#numParte').value;
    const descripcionParte = document.querySelector('#descripcionParte').value;
    const cantidad = document.querySelector('#cantidad').value;
    const NSInstalada = document.querySelector('#NSInstalada').value;
    const NSRetirada = document.querySelector('#NSRetirada').value;
    const kilometros = document.querySelector('#kilometros').value;

    const elemento = document.createElement('div');

    // elemento.classList.add('resultado');
    elemento.innerHTML = `
    <p>INGENIERO: ${nombre.toUpperCase()}</p>
    <p>FECHA: ${fecha.toUpperCase()}</p>
    <p>BANCO: ${banco.toUpperCase()}</p>
    <p>SUCURSAL: ${sucursal.toUpperCase()}</p>
    <p>ID: ${id.toUpperCase()}</p>
    <p>LLAMADA: ${llamada.toUpperCase()}</p>
    <p>TIKET: ${tiket.toUpperCase()}</p>
    <p>TAREA: ${tarea.toUpperCase()}</p>
    <p>SERIE DEL EQUIPO: ${serieEquipo.toUpperCase()}</p>
    <p>MODELO: ${modelo.toUpperCase()}</p>
    <p>HORA DE INICIO VIAJE: ${horaInicioViaje.toUpperCase()}</p>
    <p>HORA DE LLEGADA: ${horaLlegada.toUpperCase()}</p>
    <p>HORA DE INICIO DE REPARACIÓN: ${horaInicioRep.toUpperCase()}</p>
    <p>HORA DE TERMINO DE REPARACIÓN: ${horaTerminoRep.toUpperCase()}</p>
    <p>HORA DE VALIDACIÓN DE BANCO: ${horaValidacionBco.toUpperCase()}</p>
    <p>FALLA REPORTADA: ${fallaReportada.toUpperCase()}</p>
    <p>COMENTARIOS: ${comentarios.toUpperCase()}</p>
    <p>FALLA ENCONTRADA: ${fallaEncontrada.toUpperCase()}</p>
    <p>CAUSA: ${causa.toUpperCase()}</p>
    <p>SOLUCIÓN: ${solucion.toUpperCase()}</p>
    <p>CODIGO DE INTERVENCIÓN: ${codigoIntervencion.toUpperCase()}</p>
    <p>VALIDA EN LINEA: ${validaLinea.toUpperCase()}</p>
    <p>VALIDA EN SITIO: ${validaSitio.toUpperCase()}</p>
    
    <p>AIRE ACONDICIONADO: ${aireAcondicionado.toUpperCase()}</p>
    <p>REGULADOR: ${regulador.toUpperCase()}</p>
    <p>CONDICIONES FISICAS: ${condiciones.toUpperCase()}</p>
    <p>VOLTAJES:
    <p>F-T IN:${fti.toUpperCase()} F-N IN:${fni.toUpperCase()} T-N IN:${tni.toUpperCase()}</p>
    <p>F-T IN:${fto.toUpperCase()} F-N IN:${fno.toUpperCase()} T-N IN:${tno.toUpperCase()}</p>
    <p>N. DE PARTE: ${numParte.toUpperCase()}</p>
    <p>DESCRIPCIÓN DE LA PARTE: ${descripcionParte.toUpperCase()}</p>
    <p>CANTIDAD: ${cantidad.toUpperCase()}</p>
    <p>N/S INSTALADA: ${NSInstalada.toUpperCase()}</p>
    <p>N/S RETIRADA: ${NSRetirada.toUpperCase()}</p>
    <p>KM: ${kilometros.toUpperCase()}</p>
    `;

    salidaPlantilla.appendChild(elemento);
    btnCopiar.classList.remove('deshabilitar');
}

function layoutCorrectivos() {
    //Generar layout

    const id = document.querySelector('#id2').value;
    const nombreSitio = document.querySelector("#nombreSitio2").value;
    const serieEquipo = document.querySelector('#serieEquipo2').value;
    const nombreIDC = document.querySelector('#nombre2').value;
    const encontroCajero = document.querySelector('#encontroCajero2').value;
    const codigoError = document.querySelector('#codigoError2').value;
    const causa = document.querySelector('#causa2').value;
    const solucion = document.querySelector('#solucion2').value;

    //Voltajes
    const fti = document.querySelector('#FTI2').value;
    const fni = document.querySelector('#FNI2').value;
    const tni = document.querySelector('#TNI2').value;
    const fto = document.querySelector('#FTO2').value;
    const fno = document.querySelector('#FNO2').value;
    const tno = document.querySelector('#TNO2').value;

    //const datosEntorno = document.querySelector('#datosEntorno2').value;
    const cargoValor = document.querySelector('#cargoValor2').value;
    const otroCargo = document.querySelector('#otroCargo').value;

    const parte = document.querySelector('#partes2').value;
    const trakingSitio = document.querySelector('#trakingSitio2').value;
    const software = document.querySelector('#software2').value;

    const version = document.querySelector('#version').value;
    const fecha = document.querySelector('#fecha').value;
    const regrabado = document.querySelector('#regrabado').value;

    const voboBanco = document.querySelector('#voboBanco2').value;

    const voboSitio = document.querySelector('#voboSitio2').value;

    const vobo = document.querySelector('.vobo').textContent;

    let voboResultado;

    //validacion de resultado para el vobo de sitio o etv

    if (vobo.textContent) {
        voboResultado = ""
        console.log("if 1")
    } else {
        voboResultado = vobo + " " + voboSitio
        console.log("if 2")
    }


    //TRABAJANDO EN ESTO ACTUALMENTE

    const elemento = document.createElement('div');
    // elemento.classList.add('resultado');
    elemento.innerHTML = `
    <p><b>ID ATM:</b> ${id}</strong></p>
    <p><strong>Nombre del Sitio:</strong> ${nombreSitio}</p>
    <p><strong>Serie:</strong> ${serieEquipo.toUpperCase()}</p>
    <p><strong>Nombre del IDC:</strong> ${nombreIDC}</p>
    <p><strong>Como encontró el equipo:</strong> ${encontroCajero}</p>
    <p><strong>Código de error:</strong> ${codigoError.toUpperCase()}</p>
    <p><strong>Causa:</strong> ${causa} <p>${cargos(cargoValor, otroCargo)} </p></p>
    <p><strong>Solución y pruebas: </strong>${solucion} ${voboResultado}</p>
    <p><strong>Voltajes:</strong>
    <p><strong>Voltajes de pared:</strong> F-N:(${fni}) F-T:(${fti}) T-N:(${tni})</p>
    <p><strong>Voltajes salida del regulador:</strong> F-N:(${fno}) F-T:(${fto}) T-N:(${tno})</p>
    <p><strong>Partes:</strong> ${parte.toUpperCase()}</p>
    <p><strong>Traking en caso de no tenerla en sitio:</strong> ${trakingSitio.toUpperCase()}</p>
    <p><strong>Software:</strong> ${software}</p>
    <p><strong>Versión:</strong> ${version}</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <p><strong>Vobo de regrabado:</strong> ${regrabado}</p>
    <p><strong>VoBo DEL BANCO (SE):</strong> ${voboBanco}</p>
    `;

    salidaPlantilla.appendChild(elemento);
    btnCopiar.classList.remove('deshabilitar');

}

//Crea formulario de instalaciones
function crearFormInst() {
    const formulario = document.createElement('div');
    formulario.innerHTML = `
    <div class="form-instalaciones">
    <form action="post" id="form-action">
        <p>Ingeniero: </p>
        <!-- Se envuelve el input y el botón en un contenedor (.input-container) para posicionarlos juntos -->
        <div class="input-container"><input id="nombre" type="text" name="" value="${nombreIDC}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Fecha:</p><div class="input-container"><input id="fecha" type="date" name="" class="guardar" value="${infoInst.fecha}"><button type="button" class="btn-borrar">X</button></div>
        <p>Banco:</p><div class="input-container"><input id="banco" type="text" name="" value="${infoInst.banco}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Sucursal:</p><div class="input-container"><input id="sucursal" type="text" name="" value="${infoInst.sucursal}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Id:</p><div class="input-container"><input id="id" type="text" name="" value="${infoInst.id}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>LLamada:</p><div class="input-container"><input id="llamada" type="text" name="" value="${infoInst.llamada}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Tiket/servicio:</p><div class="input-container"><input id="tiket" type="text" name="" value="${infoInst.tiket}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Tarea:</p><div class="input-container"><input id="tarea" type="text" name="" value="${infoInst.tarea}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Serie del equipo:</p><div class="input-container"><input id="serieEquipo" type="text" name="" value="${infoInst.serieEquipo}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Modelo:</p><div class="input-container"><input id="modelo" type="text" name="" value="${infoInst.modelo}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Hora inicio viaje:</p><div class="input-container"><input id="horaInicioViaje" type="time" name="" class="guardar" value="${infoInst.horaInicioViaje}"><button type="button" class="btn-borrar">X</button></div>
        <p>Hora de llegada:</p><div class="input-container"><input id="horaLlegada" type="time" name="" class="guardar"value="${infoInst.horaLlegada}"><button type="button" class="btn-borrar">X</button></div>
        <p>Hora de inicio rep:</p><div class="input-container"><input id="horaInicioRep" type="time" name="" class="guardar"value="${infoInst.horaInicioRep}"><button type="button" class="btn-borrar">X</button></div>
        <p>Hora termino rep:</p><div class="input-container"><input id="horaTerminoRep" type="time" name="" class="guardar"value="${infoInst.horaTerminoRep}"><button type="button" class="btn-borrar">X</button></div>
        <p>Hora de validación Bco:</p><div class="input-container"><input id="horaValidacionBco" type="time" name="" class="guardar"value="${infoInst.horaValidacionBco}"><button type="button" class="btn-borrar">X</button></div>
        <p>Falla Reportada:</p><div class="input-container"><input id="fallaReportada" type="text" name="" value="${infoInst.fallaReportada}" class="guardar"}"><button type="button" class="btn-borrar">X</button></div>
        <p>Comentarios:</p><div class="input-container"><TExtarea id="comentarios" class="guardar">${infoInst.comentarios}</TExtarea><button type="button" class="btn-borrar">X</button></div>
        <p>Falla encontrada:</p><div class="input-container"><input id="fallaEncontrada" type="text" name="" value="${infoInst.fallaEncontrada}" class="guardar"}"><button type="button" class="btn-borrar">X</button></div>
        <p>Causa:</p><div class="input-container"><input id="causa" type="text" name="" class="guardar"value="${infoInst.causa}"><button type="button" class="btn-borrar">X</button></div>
        <p>Solución:</p><div class="input-container"><input id="solucion" type="text" name="" class="guardar"value="${infoInst.solucion}"><button type="button" class="btn-borrar">X</button></div>
        <p>Codigo de intervencion:</p><div class="input-container"><input id="codigoIntervencion" type="text" name="" value="${infoInst.codigoIntervencion}" class="guardar""><button type="button" class="btn-borrar">X</button></div>
        <p>Valida en linea:</p><div class="input-container"><input id="validaLinea" type="text" name="" class="guardar"value="${infoInst.validaLinea}"><button type="button" class="btn-borrar">X</button></div>
        <p>Valida en sitio:</p><div class="input-container"><input id="validaSitio" type="text" name="" class="guardar"value="${infoInst.validaSitio}"><button type="button" class="btn-borrar">X</button></div>
        <p>Aire acondicionado:</p><div class="input-container"><input id="aireAcondicionado" type="text" name="" value="${infoInst.aireAcondicionado}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Regulador (Solo remoto):</p><div class="input-container"><input id="regulador" type="text" name="" value="${infoInst.regulador}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Condiciones fisicas:</p><div class="input-container"><input id="condiciones" type="text" name="" value="${infoInst.condiciones}" class="guardar"><button type="button" class="btn-borrar">X</button></div>

        <div class="voltajes">
            <p>Voltajes:</p>
            <div class="votajesIn">
                <p>Voltajes IN</p>
                <p>F-N:</p><div class="input-container"><input id="FNI" type="text" name="" value="${infoInst.fni}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
                <p>F-T:</p><div class="input-container"><input id="FTI" type="text" name="" value="${infoInst.fti}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
                <p>T-N:</p><div class="input-container"><input id="TNI" type="text" name="" value="${infoInst.tni}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
            </div>
            <div class="votajesOut">
                <p>Voltajes OUT</p>
                <p>F-N:</p><div class="input-container"><input id="FNO" type="text" name="" value="${infoInst.fno}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
                <p>F-T:</p><div class="input-container"><input id="FTO" type="text" name="" value="${infoInst.fto}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
                <p>T-N:</p><div class="input-container"><input id="TNO" type="text" name="" value="${infoInst.tno}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
            </div>
        </div>


        <p>N. de parte:</p><div class="input-container"><input id="numParte" type="text" name="" value="${infoInst.numParte}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Descripción de la parte:</p><div class="input-container"><input id="descripcionParte" type="text" name="" value="${infoInst.descripcionParte}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Cantidad:</p><div class="input-container"><input id="cantidad" type="text" name="" value="${infoInst.cantidad}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>N/S instalada:</p><div class="input-container"><input id="NSInstalada" type="text" name="" value="${infoInst.NSInstalada}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>N/S retirada:</p><div class="input-container"><input id="NSRetirada" type="text" name="" value="${infoInst.NSRetirada}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
        <p>Km:</p><div class="input-container"><input id="kilometros" type="text" name="" class="guardar" value="${infoInst.kilometros}"><button type="button" class="btn-borrar">X</button></div>
    </form>
</div>
    `;

    forms.appendChild(formulario);
    guardarEstado();
    activarBotonesBorrado();
}

//Crea el formulario de servicios
function crearFormCorr() {
    const formulario = document.createElement('div');
    formulario.innerHTML = `
    <div class="form-instalaciones">
                <form action="post" id="form-action">
                    
                    <p>Id ATM:</p>
                    <!-- Estructura del input con botón de borrado: 
                         .input-container > (input + button.btn-borrar) -->
                    <div class="input-container"><input id="id2" type="text" name="" class="guardar" value="${corrInfo.id}"><button type="button" class="btn-borrar">X</button></div>
                    <p>Nombre del sitio:</p><div class="input-container"><input id="nombreSitio2" type="text" class="guardar" value="${corrInfo.nombreSitio}"><button type="button" class="btn-borrar">X</button></div>
                    <p>Serie:</p><div class="input-container"><input id="serieEquipo2" type="text" name="" class="guardar" value="${corrInfo.serie}"><button type="button" class="btn-borrar">X</button></div>
                   
                    <p>Nombre IDC: </p><div class="input-container"><input id="nombre2" type="text" name="" value="${nombreIDC}" class="guardar"><button type="button" class="btn-borrar">X</button></div>
                    <p>Como encontró el cajero:</p><div class="input-container"><input class="guardar" value="${corrInfo.encontroCajero}" id="encontroCajero2" type="text" name=""><button type="button" class="btn-borrar">X</button></div>
                    
                    <p>Código de error:</p><div class="input-container"><input type="text" name="" id="codigoError2" class="guardar" value="${corrInfo.codigoError}"><button type="button" class="btn-borrar">X</button></div>
                    
                    <p>Tipo de falla:</p>
                   
                    ${resultadoCargoValor()}
                    <p>Otros: </p><div class="input-container"><input id="otroCargo" type="text" name="" class="guardar" value="${corrInfo.otroCargo}"><button type="button" class="btn-borrar">X</button></div>
                    <p>Causa:</p><div class="input-container"><textarea name="" id="causa2" cols="30"class="guardar"  rows="5">${corrInfo.causa}</textarea><button type="button" class="btn-borrar">X</button></div>
                    <p>Solución y Pruebas:</p><div class="input-container"><textarea name="" id="solucion2" cols="30" class="guardar" rows="5">${corrInfo.solucion}</textarea><button type="button" class="btn-borrar">X</button></div>
                
                    <div class="voltajes">
                        <div class="votajesIn">
                            <p>VOLTAJES DE PARED/MAMPARA:</p>
                            <p>F-N:</p><div class="input-container"><input id="FNI2" type="text" name="" class="guardar" value="${corrInfo.fni}"><button type="button" class="btn-borrar">X</button></div>
                            <p>F-T:</p><div class="input-container"><input id="FTI2" type="text" name="" class="guardar" value="${corrInfo.fti}"><button type="button" class="btn-borrar">X</button></div>
                            <p>T-N:</p><div class="input-container"><input id="TNI2" type="text" name="" class="guardar" value="${corrInfo.tni}"><button type="button" class="btn-borrar">X</button></div>
                        </div>
                        <div class="votajesOut">
                            <p>VOLTAJES SALIDA DEL REGULADOR:</p>
                            <p>F-N:</p><div class="input-container"><input id="FNO2" type="text" name="" class="guardar" value="${corrInfo.fno}"><button type="button" class="btn-borrar">X</button></div>
                            <p>F-T:</p><div class="input-container"><input id="FTO2" type="text" name="" class="guardar" value="${corrInfo.fto}"><button type="button" class="btn-borrar">X</button></div>
                            <p>T-N:</p><div class="input-container"><input id="TNO2" type="text" name="" class="guardar" value="${corrInfo.tno}"><button type="button" class="btn-borrar">X</button></div>
                        </div>
                    </div>
                    
                    <p>Partes:</p><div class="input-container"><input id="partes2" type="text" name="" class="guardar" value="${corrInfo.partes}"><button type="button" class="btn-borrar">X</button></div>
                    <p>Traking en caso de no tenerla en sitio:</p><div class="input-container"><input id="trakingSitio2" class="guardar" type="text" name="" value="${corrInfo.trakingSitio}"><button type="button" class="btn-borrar">X</button></div>
                    <p>Software:</p><div class="input-container"><input id="software2" type="text" name="" class="guardar" value="${corrInfo.software}"><button type="button" class="btn-borrar">X</button></div>
                    <p>Versión:</p><div class="input-container"><input id="version" type="text" name="" class="guardar" value="${corrInfo.version}"><button type="button" class="btn-borrar">X</button></div>
                    <p>Fecha:</p><div class="input-container"><input id="fecha" type="text" name="" class="guardar" value="${corrInfo.fecha}"><button type="button" class="btn-borrar">X</button></div>
                    <p>VoBo de regrabado:</p><div class="input-container"><input id="regrabado" type="text" name="" class="guardar" value="${corrInfo.regrabado}"><button type="button" class="btn-borrar">X</button></div>
                    <p>VoBo DEL BANCO  (SE):</p><div class="input-container"><input id="voboBanco2" type="text" name="" class="guardar" value="${corrInfo.voboBanco}"><button type="button" class="btn-borrar">X</button></div>
                    <p>Agregar VoBo<input type="checkbox" id="agregar-vobo" name="agregar-vobo" value=""/></p>
                    
                    <div id="content-vobo">
                    <label for="id="vobo-sucursal"><p>Sucursal</p></label>
                    <input type="radio" id="vobo-sucursal" name="vobo" value="sucursal" disabled/>
                    
                    <label for="id="vobo-etv"><p>ETV</p></label>
                    <input type="radio" id="vobo-etv" name="vobo" value="ETV" disabled/>
                    </div>

                    <p class="vobo"></p><div class="input-container"><input id="voboSitio2" type="text" name="" class="guardar" value="${corrInfo.voboSitio}" disabled><button type="button" class="btn-borrar">X</button></div>
                </form>
            </div>
    `;
    forms.appendChild(formulario);
    guardarEstado();
    activarBotonesBorrado();


    //TRABAJANDO EN ESTO ACTUALMENTE

    //Constantes para la función de agregar vobo
    const agregarVobo = document.querySelector('#agregar-vobo');
    const voboSucursal = document.querySelector('#vobo-sucursal');
    const voboEtv = document.querySelector('#vobo-etv');
    const vobo = document.querySelector('.vobo');
    const voboSitio2 = document.querySelector('#voboSitio2')

    //Listener interno de agregar vobo, permite habilitar o deshabilitar los radio button
    agregarVobo.addEventListener('change', () => {
        if (agregarVobo.checked == true) {
            voboSucursal.disabled = false;
            voboEtv.disabled = false;
            voboSitio2.disabled = false;
        } else {
            voboSucursal.disabled = true;
            voboEtv.disabled = true;
            voboSitio2.value = "";
            voboSitio2.disabled = true;
            vobo.textContent = "";
        }
    })

    voboSucursal.addEventListener('change', () => {
        console.log("Hola desde voboSucursal")
        vobo.textContent = " VoBo de Sucursal"

    })

    voboEtv.addEventListener('change', () => {

        vobo.textContent = " VoBo de ETV"
    })

}

// Función para activar la funcionalidad de borrado en los botones "X"
function activarBotonesBorrado() {
    // Selecciona todos los botones con la clase .btn-borrar
    const botonesBorrar = document.querySelectorAll('.btn-borrar');

    botonesBorrar.forEach(boton => {
        // Encuentra el contenedor padre (.input-container)
        const container = boton.parentElement;
        // Busca el input o textarea dentro del mismo contenedor
        const input = container.querySelector('input, textarea');

        if (input) {
            // Inicialmente ocultar el botón si el input está vacío
            if (input.value.trim() === '') {
                boton.style.display = 'none';
            } else {
                boton.style.display = 'block'; // O 'inline-block' según tu CSS, pero block suele funcionar bien en flex/grid
            }

            // Escuchar cambios en el input para mostrar/ocultar el botón
            input.addEventListener('input', () => {
                if (input.value.trim() === '') {
                    boton.style.display = 'none';
                } else {
                    boton.style.display = 'block';
                }
            });

            boton.addEventListener('click', (e) => {
                // Borra el contenido del input
                input.value = '';

                // Ocultar el botón después de borrar
                boton.style.display = 'none';

                // Dispara manualmente el evento 'blur'.
                // Esto es necesario porque la función guardarEstado() escucha el evento 'blur'
                // para actualizar el objeto infoInst/corrInfo y guardarlo en localStorage.
                // Sin esto, el borrado visual no se guardaría en los datos.
                const event = new Event('blur');
                input.dispatchEvent(event);
            });
        }
    });
}

function cargos(cargoValor, otroCargo) {
    if (cargoValor != 'OTROS') {
        return `${cargoValor.toUpperCase()}`;
    } else {
        return `**${otroCargo.toUpperCase()}**`;
    }

}


//Función para habilitar o deshabilitar la sección de vobo de sitio o ETV
function habilitarDeshabilitarVoBo() {
    console.log("Habilitado")
}


//Avisa al usuario en caso de no tener su nombre, ingresar su nombre.
function preguntaNombre() {
    alert('Bienvenido a generador layout 4. \n Para mayor información de los cambios de la versión revise README de github ');
    nombreIDC = prompt('Ingresa nombre IDC:');
    localStorage.setItem('nombreIDC', nombreIDC);
}

//Permite guardar estado al salir de cada formulario
function guardarEstado() {
    const guardar = document.querySelectorAll('.guardar');


    for (let index = 0; index < guardar.length; index++) {
        guardar[index].addEventListener('blur', () => {

            //Ejecuta la acción que guarda el estado
            if (seleccionado === 1) {
                guardandoInstalaciones();
                return;
            }

            if (seleccionado === 2) {
                guardandoCorrectivos();
                return;
            }

        });
    }
    estadoSalvado = true;
}

function resultadoSitio() {
    let resultado;
    if (corrInfo.sitio === 'SUCURSAL') {
        resultado = '<p>Sitio:</p><select id="sitio2" name="select"><option class="guardar" selected value="SUCURSAL">SUCURSAL</option><option  class="guardar" value="REMOTO">REMOTO</option></select>';
    } else if (corrInfo.sitio == 'REMOTO') {
        resultado = '<p>Sitio:</p><select id="sitio2" name="select"><option class="guardar" value="SUCURSAL">SUCURSAL</option><option selected class="guardar" value="REMOTO">REMOTO</option></select>';
    } else {
        resultado = '<p>Sitio:</p><select id="sitio2" name="select"><option class="guardar" value="SUCURSAL">SUCURSAL</option><option class="guardar" value="REMOTO">REMOTO</option></select>';
    }
    return resultado;
}

function resultadoCargo() {
    let resultado;
    if (corrInfo.cargo === 'CON CARGO') {
        resultado = '<select id="cargo2" name="select"><option selected class="guardar" value="CON CARGO">CON CARGO</option><option  class="guardar" value="SIN CARGO">SIN CARGO</option></select>';
    } else if (corrInfo.cargo === 'SIN CARGO') {
        resultado = '<select id="cargo2" name="select"><option class="guardar" value="CON CARGO">CON CARGO</option><option  class="guardar" selected value="SIN CARGO">SIN CARGO</option></select>';
    } else {
        resultado = '<select id="cargo2" name="select"><option class="guardar" value="CON CARGO">CON CARGO</option><option  class="guardar" value="SIN CARGO">SIN CARGO</option></select>';
    }
    return resultado;
}

function resultadoCargoValor() {
    let resultado;
    if (corrInfo.cargoValor === '**FALLA OPERATIVA**') {
        resultado = '<select id="cargoValor2" name="select"><option selected class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option  class="guardar" value="**VANDALISMO**">VANDALISMO</option><option  class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option  class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option  class="guardar" value="SOFTWARE**">SOFTWARE</option><option  class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    } else if (corrInfo.cargoValor === '**VANDALISMO**') {
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option selected class="guardar" value="**VANDALISMO**">VANDALISMO</option><option  class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option  class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option  class="guardar" value="**SOFTWARE**">SOFTWARE</option><option  class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    } else if (corrInfo.cargoValor === '**ADECUACIONES**') {
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option  selected class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option  class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option  class="guardar" value="**SOFTWARE**">SOFTWARE</option><option  class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    } else if (corrInfo.cargoValor === '**COMUNICACIONES**') {
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option selected class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option  class="guardar" value="**SOFTWARE**">SOFTWARE</option><option  class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    } else if (corrInfo.cargoValor === '**SOFTWARE**') {
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option selected class="guardar" value="**SOFTWARE**">SOFTWARE</option><option  class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    } else if (corrInfo.cargoValor === '**FALLA MECÁNICA**') {
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option class="guardar" value="**SOFTWARE**">SOFTWARE</option><option selected class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    } else if (corrInfo.cargoValor === '**FALLA POR USUARIO**') {
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option class="guardar" value="**SOFTWARE**">SOFTWARE</option><option class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option selected class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    } else if (corrInfo.cargoValor === '**EQUIPO SIN FALLA**') {
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option class="guardar" value="**SOFTWARE**">SOFTWARE</option><option class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option selected class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    } else if (corrInfo.cargoValor === 'OTROS') {
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option class="guardar" value="**SOFTWARE**">SOFTWARE</option><option class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option selected class="guardar" value="OTROS">OTROS</option></select>'
    } else {
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option class="guardar" value="**SOFTWARE**">SOFTWARE</option><option class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    }
    return resultado;

}

//Guarda la información en un objeto al ser invocado por el blur
function guardandoInstalaciones() {
    infoInst.nombre = document.querySelector('#nombre').value;
    infoInst.fecha = document.querySelector('#fecha').value;
    infoInst.banco = document.querySelector('#banco').value;
    infoInst.sucursal = document.querySelector('#sucursal').value;
    infoInst.id = document.querySelector('#id').value;
    infoInst.llamada = document.querySelector('#llamada').value;
    infoInst.tiket = document.querySelector('#tiket').value;
    infoInst.tarea = document.querySelector('#tarea').value;
    infoInst.serieEquipo = document.querySelector('#serieEquipo').value;
    infoInst.modelo = document.querySelector('#modelo').value;
    infoInst.horaInicioViaje = document.querySelector('#horaInicioViaje').value;
    infoInst.horaLlegada = document.querySelector('#horaLlegada').value;
    infoInst.horaInicioRep = document.querySelector('#horaInicioRep').value;
    infoInst.horaTerminoRep = document.querySelector('#horaTerminoRep').value;
    infoInst.horaValidacionBco = document.querySelector('#horaValidacionBco').value;
    infoInst.fallaReportada = document.querySelector('#fallaReportada').value;
    infoInst.comentarios = document.querySelector('#comentarios').value;
    infoInst.fallaEncontrada = document.querySelector('#fallaEncontrada').value;
    infoInst.causa = document.querySelector('#causa').value;
    infoInst.solucion = document.querySelector('#solucion').value;
    infoInst.codigoIntervencion = document.querySelector('#codigoIntervencion').value;
    infoInst.validaLinea = document.querySelector('#validaLinea').value;
    infoInst.validaSitio = document.querySelector('#validaSitio').value;
    infoInst.aireAcondicionado = document.querySelector('#aireAcondicionado').value;
    infoInst.regulador = document.querySelector('#regulador').value;
    infoInst.condiciones = document.querySelector('#condiciones').value;
    //Voltajes
    infoInst.fti = document.querySelector('#FTI').value;
    infoInst.fni = document.querySelector('#FNI').value;
    infoInst.tni = document.querySelector('#TNI').value;
    infoInst.fto = document.querySelector('#FTO').value;
    infoInst.fno = document.querySelector('#FNO').value;
    infoInst.tno = document.querySelector('#TNO').value;


    infoInst.numParte = document.querySelector('#numParte').value;
    infoInst.descripcionParte = document.querySelector('#descripcionParte').value;
    infoInst.cantidad = document.querySelector('#cantidad').value;
    infoInst.NSInstalada = document.querySelector('#NSInstalada').value;
    infoInst.NSRetirada = document.querySelector('#NSRetirada').value;
    infoInst.kilometros = document.querySelector('#kilometros').value;



    //transformar en texto para guardarlo en local
    infoString = JSON.stringify(infoInst);



    //guardar en local
    localStorage.setItem('infoInstalaciones', infoString);
}



function guardandoCorrectivos() {
    corrInfo.id = document.querySelector('#id2').value;
    corrInfo.nombreSitio = document.querySelector("#nombreSitio2").value;
    corrInfo.serieEquipo = document.querySelector('#serieEquipo2').value;
    corrInfo.encontroCajero = document.querySelector('#encontroCajero2').value;
    corrInfo.codigoError = document.querySelector('#codigoError2').value;
    corrInfo.causa = document.querySelector('#causa2').value;
    corrInfo.solucion = document.querySelector('#solucion2').value;


    //Voltajes
    corrInfo.fti = document.querySelector('#FTI2').value;
    corrInfo.fni = document.querySelector('#FNI2').value;
    corrInfo.tni = document.querySelector('#TNI2').value;
    corrInfo.fto = document.querySelector('#FTO2').value;
    corrInfo.fno = document.querySelector('#FNO2').value;
    corrInfo.tno = document.querySelector('#TNO2').value;

    //corrInfo.datosEntorno = document.querySelector('#datosEntorno2').value;

    corrInfo.cargoValor = document.querySelector('#cargoValor2').value;
    corrInfo.otroCargo = document.querySelector('#otroCargo').value;

    corrInfo.partes = document.querySelector('#partes2').value;
    corrInfo.trakingSitio = document.querySelector('#trakingSitio2').value;
    corrInfo.software = document.querySelector('#software2').value;
    corrInfo.version = document.querySelector('#version').value;
    corrInfo.fecha = document.querySelector('#fecha').value;
    corrInfo.regrabado = document.querySelector('#regrabado').value;

    corrInfo.voboBanco = document.querySelector('#voboBanco2').value;
    corrInfo.voboSitio = document.querySelector('#voboSitio2').value;




    //transformar en texto para guardarlo en local
    infoString = JSON.stringify(corrInfo);



    //guardar en local
    localStorage.setItem('infoCorrectivos', infoString);
}


//Recuper la info de local
function retornarInfo() {
    const infoRetorno = localStorage.getItem('infoInstalaciones');

    const infoRetorno2 = localStorage.getItem('infoCorrectivos');

    infoJson = JSON.parse(infoRetorno);
    infoJson2 = JSON.parse(infoRetorno2);

    if (infoJson) {
        infoInst.nombre = infoJson.nombre;
        infoInst.fecha = infoJson.fecha;
        infoInst.banco = infoJson.banco;
        infoInst.sucursal = infoJson.sucursal;
        infoInst.id = infoJson.id;
        infoInst.llamada = infoJson.llamada;
        infoInst.tiket = infoJson.tiket;
        infoInst.tarea = infoJson.tarea;
        infoInst.serieEquipo = infoJson.serieEquipo;
        infoInst.modelo = infoJson.modelo;
        infoInst.horaInicioViaje = infoJson.horaInicioViaje
        infoInst.horaLlegada = infoJson.horaLlegada;
        infoInst.horaInicioRep = infoJson.horaInicioRep;
        infoInst.horaTerminoRep = infoJson.horaInicioRep;
        infoInst.horaValidacionBco = infoJson.horaValidacionBco;
        infoInst.fallaReportada = infoJson.fallaReportada;
        infoInst.comentarios = infoJson.comentarios;
        infoInst.causa = infoJson.causa;
        infoInst.solucion = infoJson.solucion
        infoInst.codigoIntervencion = infoJson.codigoIntervencion;
        infoInst.validaLinea = infoJson.validaLinea;
        infoInst.validaSitio = infoJson.validaSitio;
        infoInst.aireAcondicionado = infoJson.aireAcondicionado;
        infoInst.regulador = infoJson.regulador;
        infoInst.condiciones = infoJson.condiciones;
        infoInst.fallaEncontrada = infoJson.fallaEncontrada;
        infoInst.fti = infoJson.fti;
        infoInst.fni = infoJson.fni;
        infoInst.tni = infoJson.tni;
        infoInst.fto = infoJson.fto;
        infoInst.fno = infoJson.fno;
        infoInst.tno = infoJson.tno;
        infoInst.numParte = infoJson.numParte;
        infoInst.descripcionParte = infoJson.descripcionParte;
        infoInst.cantidad = infoJson.cantidad;
        infoInst.NSInstalada = infoJson.NSInstalada;
        infoInst.NSRetirada = infoJson.NSRetirada;
        infoInst.kilometros = infoJson.kilometros;
    }
    //Correctivos
    if (infoJson2) {
        corrInfo.proveedor = infoJson2.proveedor;
        corrInfo.tarea = infoJson2.tarea;
        corrInfo.tiket = infoJson2.tiket;
        corrInfo.id = infoJson2.id;
        corrInfo.nombreSitio = infoJson2.nombreSitio;
        corrInfo.marcaModelo = infoJson2.marcaModelo;
        corrInfo.serie = infoJson2.serieEquipo;
        corrInfo.sitio = infoJson2.sitio;
        corrInfo.nombre = infoJson2.nombre;

        corrInfo.encontroCajero = infoJson2.encontroCajero;
        corrInfo.fallaReportada = infoJson2.fallaReportada;
        corrInfo.codigoError = infoJson2.codigoError;
        corrInfo.modulo = infoJson2.modulo;
        corrInfo.causa = infoJson2.causa;
        corrInfo.solucion = infoJson2.solucion;
        corrInfo.pruebas = infoJson2.pruebas;
        corrInfo.comoDejaCajero = infoJson2.comoDejaCajero;

        //Voltajes
        corrInfo.fti = infoJson2.fti;
        corrInfo.fni = infoJson2.fni;
        corrInfo.tni = infoJson2.tni;
        corrInfo.fto = infoJson2.fto;
        corrInfo.fno = infoJson2.fno;
        corrInfo.tno = infoJson2.tno;

        //corrInfo.datosEntorno = infoJson2.datosEntorno;
        corrInfo.cargo = infoJson2.cargo;
        corrInfo.cargoValor = infoJson2.cargoValor;
        corrInfo.otroCargo = infoJson2.otroCargo;

        corrInfo.partes = infoJson2.partes;
        corrInfo.trakingSitio = infoJson2.trakingSitio;
        corrInfo.software = infoJson2.software;
        corrInfo.version = infoJson2.version;
        corrInfo.fecha = infoJson2.fecha;
        corrInfo.regrabado = infoJson2.regrabado;
        corrInfo.fechaAtencion = infoJson2.fechaAtencion;
        corrInfo.llegada = infoJson2.llegada;
        corrInfo.inicio = infoJson2.inicio;
        corrInfo.notas = infoJson2.notas;
        corrInfo.validacion = infoJson2.validacion;
        corrInfo.retiro = infoJson2.retiro;
        corrInfo.voboBanco = infoJson2.voboBanco;
        corrInfo.voboSitio = infoJson2.voboSitio;
        corrInfo.comentarios = infoJson2.comentarios;
    }
}
