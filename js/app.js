//VARIABLES
const btnInst = document.querySelector('.btnInstalaciones');
const btnCor = document.querySelector('.btnCorrectivos');
const btnGuardar = document.querySelector('.btnGuardar');
const btnCopiar = document.querySelector('.btnCopiar');
const salidaPlantilla = document.querySelector('.salida-plantilla');
const formAction = document.querySelector('#form-action');
const btnLayout = document.querySelector('.btnLayout');
const btnSalvar = document.querySelector('.btnSalvar');

let seleccionado = 0;

//EVENTOS
document.addEventListener('DOMContentLoaded',()=>{
    addEventListeners();
})

function addEventListeners(){
    btnInst.addEventListener('click',()=>{
        seleccionado = 1;
        mostrarPlantilla();
    });

    btnCor.addEventListener('click',()=>{
        seleccionado = 2;
        mostrarPlantilla();
    });
    btnGuardar.addEventListener('click',generarLayout);
    btnCopiar.addEventListener('click',copiarLayout);
    btnLayout.addEventListener('click',mostrarLayouts);
    btnSalvar.addEventListener('click',salvarInformacion);
}


//FUNCIONES
//MUestra los datos a llenar-modificar por generar el formulario en lugar de solo ocultarlo.
function mostrarPlantilla(){
    if(seleccionado == 1){
        const formulario = document.querySelector('.formularios');
        formulario.removeAttribute('hidden');
    } else if(seleccionado == 2){
        const formulario = document.querySelector('.formularios2');
        formulario.removeAttribute('hidden');
    }
    btnGuardar.classList.remove('deshabilitar');
    // btnCor.remove()
}

function mostrarLayouts(){
    // formAction.remove();    
    console.log('Guardando layouts...');
}

function generarLayout(e){
    e.preventDefault();
    //Borrar layout anterior
    borrarResultado();
    if(seleccionado == 1){
        layoutInstalaciones();
    }else if(seleccionado == 2){
        layoutCorrectivos();
    }
    //layoutCorrectivos();
}

//Función que copia el resultado a el portapapeles.
function copiarLayout(e){
    e.preventDefault();
    const elemento = document.querySelector('.salida-plantilla').textContent;
    
    navigator.clipboard.writeText(elemento)
        .then(()=>{
            alert('Texto copiado');
        })
        .catch(()=>{
            console.log('Algo salio mal...',err)
        })
    }

//Borra en contenido de resultado
function borrarResultado(){
    while(salidaPlantilla.firstChild){
        salidaPlantilla.removeChild(salidaPlantilla.firstChild);
    }
}

function salvarInformacion(e){
   e.preventDefault()
    console.log('Salvando información...')
}

function layoutInstalaciones(){
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
    const horaInicioViaje =document.querySelector('#horaInicioViaje').value;
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
    formAction.reset();
}

function layoutCorrectivos(){
    //Generar layout
    const proveedor = document.querySelector('#proveedor2').value;
    const tarea = document.querySelector('#tarea2').value;
    const tiket = document.querySelector('#tiket2').value;
    const id = document.querySelector('#id2').value;
    const nombreSitio = document.querySelector("#nombreSitio2").value;
    const marcaModelo = document.querySelector("#marcaModelo2").value;
    const serieEquipo = document.querySelector('#serieEquipo2').value;
    const sitio = document.querySelector('#sitio2').value;
    const nombre = document.querySelector('#nombre2').value;
    
    const encontroCajero = document.querySelector('#encontroCajero2').value;
    const fallaReportada = document.querySelector('#fallaReportada2').value;
    const codigoError = document.querySelector('#codigoError2').value;
    const modulo = document.querySelector('#modulo2').value;
    const causa = document.querySelector('#causa2').value;
    const solucion = document.querySelector('#solucion2').value;
    const pruebas = document.querySelector('#pruebas2').value;
    const dejaCajero = document.querySelector('#dejaCajero2').value;
    
    //Voltajes
    const fti = document.querySelector('#FTI2').value;
    const fni = document.querySelector('#FNI2').value;
    const tni = document.querySelector('#TNI2').value;
    const fto = document.querySelector('#FTO2').value;
    const fno = document.querySelector('#FNO2').value;
    const tno = document.querySelector('#TNO2').value;
    
    const datosEntorno = document.querySelector('#datosEntorno2').value;
    const cargo = document.querySelector('#cargo2').value;
    const cargoValor = document.querySelector('#cargoValor2').value;
    
    const parte = document.querySelector('#partes2').value;
    const trakingSitio = document.querySelector('#trakingSitio2').value;
    const software = document.querySelector('#software2').value;
    const fechaAtencion = document.querySelector('#fechaAtencion2').value;
    const llegada = document.querySelector('#llegada2').value;
    const inicio = document.querySelector('#inicio2').value;
    const notas = document.querySelector('#notas2').value;
    const validacion = document.querySelector('#validacion2').value;
    const retiro = document.querySelector('#retiro2').value;
    const voboBanco = document.querySelector('#voboBanco2').value;
    const voboSitio = document.querySelector('#voboSitio2').value;
    const comentarios = document.querySelector('#comentarios2').value;
    
    const elemento = document.createElement('div');
    // elemento.classList.add('resultado');
    elemento.innerHTML = `
    <p>PROVEEDOR: ${proveedor.toUpperCase()}</p>
    <p>TK: ${tarea.toUpperCase()}</p>
    <p>SR: ${tiket.toUpperCase()}</p>
    <p>ID ATM: ${id.toUpperCase()}</p>
    <p>NOMBRE DEL SITIO: ${nombreSitio.toUpperCase()}</p>
    <p>MARCA Y MODELO DE ATM: ${marcaModelo.toUpperCase()}</p>
    <p>SERIE: ${serieEquipo.toUpperCase()}</p>
    <p>SITIO: ${sitio.toUpperCase()}</p>
    <p>NOMBRE DEL IDC: ${nombre.toUpperCase()}</p>
    <p>COMO ENCONTRÓ EL CAJERO: ${encontroCajero.toUpperCase()}</p>
    <p>FALLA REPORTADA: ${fallaReportada.toUpperCase()}</p>
    <p>CÓDIGO DE ERROR: ${codigoError.toUpperCase()}</p>
    <p>MÓDULO: ${modulo.toUpperCase()}</p>
    <p>CAUSA: ${causa.toUpperCase()}</p>
    <p>SOLUCIÓN: ${solucion.toUpperCase()}</p>
    <p>PRUEBAS: ${pruebas.toUpperCase()}</p>
    <p>COMO DEJA EL ATM: ${dejaCajero.toUpperCase()}</p>
    <p>VOLTAJES:
    <p>F-T IN:${fti.toUpperCase()} F-N IN:${fni.toUpperCase()} T-N IN:${tni.toUpperCase()}</p>
    <p>F-T IN:${fto.toUpperCase()} F-N IN:${fno.toUpperCase()} T-N IN:${tno.toUpperCase()}</p>
    <p>DATOS ESPECÍFICOS DEL ENTORNO AJENO AL ATM: ${datosEntorno.toUpperCase()}</p>
    <p>CON CARGO O SIN CARGO: ${cargo.toUpperCase()}${cargoValor.toUpperCase()}</p>
    <p>PARTES: ${parte.toUpperCase()}</p>
    <p>TRAKING EN CASO DE NO TENERLO EN SITIO: ${trakingSitio.toUpperCase()}</p>
    <p>FECHA DE ATENCIÓN: ${fechaAtencion.toUpperCase()}</p>
    <p>ARRIBO: ${llegada.toUpperCase()}</p>
    <p>INICIO: ${inicio.toUpperCase()}</p>
    <p>NOTAS: ${notas.toUpperCase()}</p>
    <p>VALIDACIÓN: ${validacion.toUpperCase()}</p>
    <p>RETIRO: ${retiro.toUpperCase()}</p>
    <p>VoBo DEL BANCO (SE): ${voboBanco.toUpperCase()}</p>
    <p>VoBo DEL SITIO SUCURSAL/ETV: ${software.toUpperCase()}</p>
    <p>SOFTWARE versión de aplicativo: ${voboSitio.toUpperCase()}</p>
    <p>COMENTARIOS ADICIONALES DEL IDC: ${comentarios.toUpperCase()}</p>
    `;

    salidaPlantilla.appendChild(elemento);
    btnCopiar.classList.remove('deshabilitar');
    formAction.reset();
}