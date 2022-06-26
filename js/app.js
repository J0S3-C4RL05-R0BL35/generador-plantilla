//VARIABLES
const btnInst = document.querySelector('.btnInstalaciones');
const btnCor = document.querySelector('.btnCorrectivos');
const btnGuardar = document.querySelector('.btnGuardar');
const btnCopiar = document.querySelector('.btnCopiar');
const salidaPlantilla = document.querySelector('.salida-plantilla');
const formAction = document.querySelector('#form-action');
const btnLayout = document.querySelector('.btnLayout');

//EVENTOS
document.addEventListener('DOMContentLoaded',()=>{
    
})
btnInst.addEventListener('click',mostrarPlantilla);
btnGuardar.addEventListener('click',generarLayout);
btnCopiar.addEventListener('click',copiarLayout);
btnLayout.addEventListener('click',mostrarLayouts);


//FUNCIONES
//MUestra los datos a llenar-modificar por generar el formulario en lugar de solo ocultarlo.
function mostrarPlantilla(){
    const formulario = document.querySelector('.formularios');
    formulario.removeAttribute('hidden');

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
    const aireAcondicionado = document.querySelector('#aireAcondicionado').value;
    const regulador = document.querySelector('#regulador').value;
    const condiciones = document.querySelector('#condiciones').value;
    const voltajes = document.querySelector('#voltajes').value;
    const numParte = document.querySelector('#numParte').value;
    const descripcionParte = document.querySelector('#descripcionParte').value;
    const cantidad = document.querySelector('#cantidad').value;
    const NSInstalada = document.querySelector('#NSInstalada').value;
    const NSRetirada = document.querySelector('#NSRetirada').value;
    const kilometros = document.querySelector('#kilometros').value;
    
    const elemento = document.createElement('div');
    // elemento.classList.add('resultado');
    elemento.innerHTML = `
    <p>INGENIERO: ${nombre}</p>
    <p>FECHA: ${fecha}</p>
    <p>BANCO: ${banco}</p>
    <p>SUCURSAL: ${sucursal}</p>
    <p>ID: ${id}</p>
    <p>LLAMADA: ${llamada}</p>
    <p>TIKET: ${tiket}</p>
    <p>TAREA: ${tarea}</p>
    <p>SERIE DEL EQUIPO: ${serieEquipo}</p>
    <p>MODELO: ${modelo}</p>
    <p>HORA DE INICIO VIAJE: ${horaInicioViaje}</p>
    <p>HORA DE LLEGADA: ${horaLlegada}</p>
    <p>HORA DE INICIO DE REPARACIÓN: ${horaInicioRep}</p>
    <p>HORA DE TERMINO DE REPARACIÓN: ${horaTerminoRep}</p>
    <p>HORA DE VALIDACIÓN DE BANCO: ${horaValidacionBco}</p>
    <p>FALLA REPORTADA: ${fallaReportada}</p>
    <p>COMENTARIOS: ${comentarios}</p>
    <p>FALLA ENCONTRADA: ${fallaEncontrada}</p>
    <p>CAUSA: ${causa}</p>
    <p>SOLUCIÓN: ${solucion}</p>
    <p>CODIGO DE INTERVENCIÓN: ${codigoIntervencion}</p>
    <p>AIRE ACONDICIONADO: ${aireAcondicionado}</p>
    <p>REGULADOR: ${regulador}</p>
    <p>CONDICIONES FISICAS: ${condiciones}</p>
    <p>VOLTAJES: ${voltajes}</p>
    <p>N. DE PARTE: ${numParte}</p>
    <p>DESCRIPCIÓN DE LA PARTE: ${descripcionParte}</p>
    <p>CANTIDAD: ${cantidad}</p>
    <p>N/S INSTALADA: ${NSInstalada}</p>
    <p>N/S RETIRADA: ${NSRetirada}</p>
    <p>KM: ${kilometros}</p>
    `
;
    salidaPlantilla.appendChild(elemento);
    btnCopiar.classList.remove('deshabilitar');
    formAction.reset();
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