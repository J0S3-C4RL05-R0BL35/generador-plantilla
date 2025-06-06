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





let nombreIDC = localStorage.getItem('nombreIDC');
let infoJson;


let infoJson2;

//Objeto instalaciones, datos a almacenar
let infoInst = {
    nombre:'',
    fecha:'10-10-2022',
    banco:'',
    sucursal:'',
    id:'',
    llamada:'N/A',
    tiket:'',
    tarea:'',
    serieEquipo:'',
    modelo:'',
    horaInicioViaje:'',
    horaLlegada:'',
    horaInicioRep:'',
    horaTerminoRep:'',
    horaValidacionBco:'',
    fallaReportada:'PUESTA EN SERVICIO',
    comentarios:'',
    causa:'457',
    solucion:'723',
    codigoIntervencion:'PUESTA EN SERVICIO',
    validaLinea:'',
    validaSitio:'',
    aireAcondicionado:'SI',
    regulador:'SI',
    condiciones:'OK',
    fallaEncontrada:'SIN FALLAS',
    fti:'120.0',
    fni:'120.1',
    tni:'0.1',
    fto:'130.0',
    fno:'130.1',
    tno:'0.1',
    numParte:'',
    descripcionParte:'',
    cantidad:'',
    NSInstalada:'',
    NSRetirada:'',
    kilometros:''
};

//Datos de falla
let corrInfo = {
    proveedor:'',
    tarea:'',
    tiket:'',
    id:'',
    nombreSitio:'',
    marcaModelo:'',
    serie:'',
    sitio:'',
    nombre:'',
    encontroCajero:'',
    fallaReportada:'',
    codigoError:'',
    modulo:'',
    causa:'',
    solucion:'',
    pruebas:'',
    comoDejaCajero:'',
    fti:'130.0',
    fni:'130.1',
    tni:'0.1',
    fto:'120.0',
    fno:'120.1',
    tno:'0.1',
    datosEntorno:'',
    cargo: '',
    cargoValor:'',
    otroCargo:'',
    partes:'',
    trakingSitio:'',
    software:'',
    version:'',
    fecha:'',
    regrabado:'',
    llegada:'',
    inicio:'',
    notas:'',
    validacion:'',
    retiro:'',
    voboBanco:'',
    voboSitio:'',
    comentarios:''
};

//infoInst.banco;
let seleccionado = 0;

//EVENTOS
document.addEventListener('DOMContentLoaded',()=>{
    //Recupera la info de local
    retornarInfo();
    
    if(!nombreIDC){
        preguntaNombre();
    }
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
    btnGenerar.addEventListener('click',generarLayout);
    btnCopiar.addEventListener('click',copiarLayout);
    btnLayout.addEventListener('click',mostrarLayouts);
    btnSalvar.addEventListener('click',salvarInformacion); 
}


btnLimpiar.addEventListener('click',()=>{
    localStorage.removeItem('infoInstalaciones');
    localStorage.removeItem('infoCorrectivos');
    location.reload();
});


//FUNCIONES
//MUestra los datos a llenar-modificar por generar el formulario en lugar de solo ocultarlo.
function mostrarPlantilla(){
    if(seleccionado == 1){
        borrarform();
        crearFormInst();

        // const formulario = document.querySelector('.formularios');
        // formulario.removeAttribute('hidden');
    } else if(seleccionado == 2){
        borrarform();
        crearFormCorr();
        // const formulario = document.querySelector('.formularios2');
        // formulario.removeAttribute('hidden');
    }
    btnGenerar.classList.remove('deshabilitar');
    //btnGuardar.classList.remove('deshabilitar');
    // btnCor.remove()
}

function mostrarLayouts(){
    // formAction.remove();    
    
    
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

function limpiarForm(){
    formAction.reset();
}

//Borra en contenido de resultado
function borrarResultado(){
    while(salidaPlantilla.firstChild){
        salidaPlantilla.removeChild(salidaPlantilla.firstChild);
    }
}
function borrarform(){
    while(formulario.firstChild){
        formulario.removeChild(formulario.firstChild);
    }
}

function salvarInformacion(e){
   e.preventDefault()
    
   
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
}

function layoutCorrectivos(){
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

    if(vobo.textContent){
        voboResultado = ""
        console.log("if 1")
    }else{
        voboResultado = vobo +" "+ voboSitio
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
function crearFormInst(){
    const formulario = document.createElement('div');
    formulario.innerHTML=`
    <div class="form-instalaciones">
    <form action="post" id="form-action">
        <p>Ingeniero: </p>
        <input id="nombre" type="text" name="" value="${nombreIDC}" class="guardar">
        <p>Fecha:</p><input id="fecha" type="date" name="" class="guardar" value="${infoInst.fecha}">
        <p>Banco:</p><input id="banco" type="text" name="" value="${infoInst.banco}" class="guardar">
        <p>Sucursal:</p><input id="sucursal" type="text" name="" value="${infoInst.sucursal}" class="guardar">
        <p>Id:</p><input id="id" type="text" name="" value="${infoInst.id}" class="guardar">
        <p>LLamada:</p><input id="llamada" type="text" name="" value="${infoInst.llamada}" class="guardar">
        <p>Tiket/servicio:</p><input id="tiket" type="text" name="" value="${infoInst.tiket}" class="guardar">
        <p>Tarea:</p><input id="tarea" type="text" name="" value="${infoInst.tarea}" class="guardar">
        <p>Serie del equipo:</p><input id="serieEquipo" type="text" name="" value="${infoInst.serieEquipo}" class="guardar">
        <p>Modelo:</p><input id="modelo" type="text" name="" value="${infoInst.modelo}" class="guardar">
        <p>Hora inicio viaje:</p><input id="horaInicioViaje" type="time" name="" class="guardar" value="${infoInst.horaInicioViaje}">
        <p>Hora de llegada:</p><input id="horaLlegada" type="time" name="" class="guardar"value="${infoInst.horaLlegada}">
        <p>Hora de inicio rep:</p><input id="horaInicioRep" type="time" name="" class="guardar"value="${infoInst.horaInicioRep}">
        <p>Hora termino rep:</p><input id="horaTerminoRep" type="time" name="" class="guardar"value="${infoInst.horaTerminoRep}">
        <p>Hora de validación Bco:</p><input id="horaValidacionBco" type="time" name="" class="guardar"value="${infoInst.horaValidacionBco}">
        <p>Falla Reportada:</p><input id="fallaReportada" type="text" name="" value="${infoInst.fallaReportada}" class="guardar"}">
        <p>Comentarios:</p><TExtarea id="comentarios" class="guardar">${infoInst.comentarios}</TExtarea>
        <p>Falla encontrada:</p><input id="fallaEncontrada" type="text" name="" value="${infoInst.fallaEncontrada}" class="guardar"}">
        <p>Causa:</p><input id="causa" type="text" name="" class="guardar"value="${infoInst.causa}">
        <p>Solución:</p><input id="solucion" type="text" name="" class="guardar"value="${infoInst.solucion}">
        <p>Codigo de intervencion:</p><input id="codigoIntervencion" type="text" name="" value="${infoInst.codigoIntervencion}" class="guardar"">
        <p>Valida en linea:</p><input id="validaLinea" type="text" name="" class="guardar"value="${infoInst.validaLinea}">
        <p>Valida en sitio:</p><input id="validaSitio" type="text" name="" class="guardar"value="${infoInst.validaSitio}">
        <p>Aire acondicionado:</p><input id="aireAcondicionado" type="text" name="" value="${infoInst.aireAcondicionado}" class="guardar">
        <p>Regulador (Solo remoto):</p><input id="regulador" type="text" name="" value="${infoInst.regulador}" class="guardar">
        <p>Condiciones fisicas:</p><input id="condiciones" type="text" name="" value="${infoInst.condiciones}" class="guardar">

        <div class="voltajes">
            <p>Voltajes:</p>
            <div class="votajesIn">
                <p>Voltajes IN</p>
                <p>F-N:</p><input id="FNI" type="text" name="" value="${infoInst.fni}" class="guardar">
                <p>F-T:</p><input id="FTI" type="text" name="" value="${infoInst.fti}" class="guardar">
                <p>T-N:</p><input id="TNI" type="text" name="" value="${infoInst.tni}" class="guardar">
            </div>
            <div class="votajesOut">
                <p>Voltajes OUT</p>
                <p>F-N:</p><input id="FNO" type="text" name="" value="${infoInst.fno}" class="guardar">
                <p>F-T:</p><input id="FTO" type="text" name="" value="${infoInst.fto}" class="guardar">
                <p>T-N:</p><input id="TNO" type="text" name="" value="${infoInst.tno}" class="guardar">
            </div>
        </div>


        <p>N. de parte:</p><input id="numParte" type="text" name="" value="${infoInst.numParte}" class="guardar">
        <p>Descripción de la parte:</p><input id="descripcionParte" type="text" name="" value="${infoInst.descripcionParte}" class="guardar">
        <p>Cantidad:</p><input id="cantidad" type="text" name="" value="${infoInst.cantidad}" class="guardar">
        <p>N/S instalada:</p><input id="NSInstalada" type="text" name="" value="${infoInst.NSInstalada}" class="guardar">
        <p>N/S retirada:</p><input id="NSRetirada" type="text" name="" value="${infoInst.NSRetirada}" class="guardar">
        <p>Km:</p><input id="kilometros" type="text" name="" class="guardar" value="${infoInst.kilometros}">
    </form>
</div>
    `;

    forms.appendChild(formulario);
    guardarEstado();
}

//Crea el formulario de servicios
function crearFormCorr(){
    const formulario = document.createElement('div');
    formulario.innerHTML=`
    <div class="form-instalaciones">
                <form action="post" id="form-action">
                    
                    <p>Id ATM:</p><input id="id2" type="text" name="" class="guardar" value="${corrInfo.id}">
                    <p>Nombre del sitio:</p><input id="nombreSitio2" type="text" class="guardar" value="${corrInfo.nombreSitio}">
                    <p>Serie:</p><input id="serieEquipo2" type="text" name="" class="guardar" value="${corrInfo.serie}">
                   
                    <p>Nombre IDC: </p><input id="nombre2" type="text" name="" value="${nombreIDC}" class="guardar">
                    <p>Como encontró el cajero:</p><input class="guardar" value="${corrInfo.encontroCajero}" id="encontroCajero2" type="text" name="">
                    
                    <p>Código de error:</p><input type="text" name="" id="codigoError2" class="guardar" value="${corrInfo.codigoError}">
                    
                    
                    <p>Tipo de falla:</p>
                   
                    ${resultadoCargoValor()}
                    <p>Otros: </p><input id="otroCargo" type="text" name="" class="guardar" value="${corrInfo.otroCargo}">
                    <p>Causa:</p><textarea name="" id="causa2" cols="30"class="guardar"  rows="5">${corrInfo.causa}</textarea>
                    <p>Solución y Pruebas:</p><textarea name="" id="solucion2" cols="30" class="guardar" rows="5">${corrInfo.solucion}</textarea>
                
                    <div class="voltajes">
                        <div class="votajesIn">
                            <p>VOLTAJES DE PARED/MAMPARA:</p>
                            <p>F-N:</p><input id="FNI2" type="text" name="" class="guardar" value="${corrInfo.fni}">
                            <p>F-T:</p><input id="FTI2" type="text" name="" class="guardar" value="${corrInfo.fti}">
                            <p>T-N:</p><input id="TNI2" type="text" name="" class="guardar" value="${corrInfo.tni}">
                        </div>
                        <div class="votajesOut">
                            <p>VOLTAJES SALIDA DEL REGULADOR:</p>
                            <p>F-N:</p><input id="FNO2" type="text" name="" class="guardar" value="${corrInfo.fno}">
                            <p>F-T:</p><input id="FTO2" type="text" name="" class="guardar" value="${corrInfo.fto}">
                            <p>T-N:</p><input id="TNO2" type="text" name="" class="guardar" value="${corrInfo.tno}">
                        </div>
                    </div>
                    
                    <p>Partes:</p><input id="partes2" type="text" name="" class="guardar" value="${corrInfo.partes}">
                    <p>Traking en caso de no tenerla en sitio:</p><input id="trakingSitio2" class="guardar" type="text" name="" value="${corrInfo.trakingSitio}">
                    <p>Software:</p><input id="software2" type="text" name="" class="guardar" value="${corrInfo.software}">
                    <p>Versión:</p><input id="version" type="text" name="" class="guardar" value="${corrInfo.version}">
                    <p>Fecha:</p><input id="fecha" type="text" name="" class="guardar" value="${corrInfo.fecha}">
                    <p>VoBo de regrabado:</p><input id="regrabado" type="text" name="" class="guardar" value="${corrInfo.regrabado}">
                    <p>VoBo DEL BANCO  (SE):</p><input id="voboBanco2" type="text" name="" class="guardar" value="${corrInfo.voboBanco}">
                    <p>Agregar VoBo<input type="checkbox" id="agregar-vobo" name="agregar-vobo" value=""/></p>
                    <p>de <input type="radio" id="vobo-sucursal" name="vobo" value="sucursal" disabled/>
                    Sucursal <input type="radio" id="vobo-etv" name="vobo" value="ETV" disabled/>ETV</p>

                    <p class="vobo"></p><input id="voboSitio2" type="text" name="" class="guardar" value="${corrInfo.voboSitio}" disabled>
                </form>
            </div>
    `;
    forms.appendChild(formulario);
    guardarEstado();


    //TRABAJANDO EN ESTO ACTUALMENTE

    //Constantes para la función de agregar vobo
    const agregarVobo = document.querySelector('#agregar-vobo');
    const voboSucursal = document.querySelector('#vobo-sucursal');
    const voboEtv = document.querySelector('#vobo-etv');
    const vobo = document.querySelector('.vobo');
    const voboSitio2 = document.querySelector('#voboSitio2')

//Listener interno de agregar vobo, permite habilitar o deshabilitar los radio button
    agregarVobo.addEventListener('change', ()=>{
       if (agregarVobo.checked == true){
        voboSucursal.disabled = false;
        voboEtv.disabled = false;
        voboSitio2.disabled = false;
       }else{
        voboSucursal.disabled = true;
        voboEtv.disabled = true;
        voboSitio2.value = "";
        voboSitio2.disabled = true;
        vobo.textContent = "";
       }
    })

    voboSucursal.addEventListener('change', ()=>{
        console.log("Hola desde voboSucursal")
        vobo.textContent = " VoBo de Sucursal"

    })

    voboEtv.addEventListener('change', ()=>{
        console.log("Hola desde voboEtv")
        vobo.textContent = " VoBo de ETV"
    })

console.log("Hola fuera")

}

function cargos(cargoValor,otroCargo){
    if (cargoValor != 'OTROS'){
        return `${cargoValor.toUpperCase()}`;
    }else{
        return `**${otroCargo.toUpperCase()}**`;
    }
    
}


//Función para habilitar o deshabilitar la sección de vobo de sitio o ETV
function habilitarDeshabilitarVoBo(){
    console.log("Habilitado")
}


//Avisa al usuario en caso de no tener su nombre, ingresar su nombre.
function preguntaNombre(){
    alert('NO SE DETECTO NOMBRE DE IDC');
    nombreIDC = prompt('Ingresa nombre IDC:');
    localStorage.setItem('nombreIDC',nombreIDC);
}

//Permite guardar estado al salir de cada formulario
function guardarEstado(){
    const guardar = document.querySelectorAll('.guardar');
    

    for (let index = 0; index < guardar.length; index++) {
        guardar[index].addEventListener('blur',()=>{

            //Ejecuta la acción que guarda el estado
            if(seleccionado === 1){
                guardandoInstalaciones();
                return;
            }

            if(seleccionado === 2){
                guardandoCorrectivos();
                return;
            }
        
        });
    }
    estadoSalvado = true;
}

function resultadoSitio(){
    let resultado;
    if(corrInfo.sitio === 'SUCURSAL'){
        resultado = '<p>Sitio:</p><select id="sitio2" name="select"><option class="guardar" selected value="SUCURSAL">SUCURSAL</option><option  class="guardar" value="REMOTO">REMOTO</option></select>';
    }else if(corrInfo.sitio == 'REMOTO'){
        resultado = '<p>Sitio:</p><select id="sitio2" name="select"><option class="guardar" value="SUCURSAL">SUCURSAL</option><option selected class="guardar" value="REMOTO">REMOTO</option></select>';
    }else{ 
        resultado = '<p>Sitio:</p><select id="sitio2" name="select"><option class="guardar" value="SUCURSAL">SUCURSAL</option><option class="guardar" value="REMOTO">REMOTO</option></select>';
    }
    return resultado;
}

function resultadoCargo(){
    let resultado;
    if(corrInfo.cargo === 'CON CARGO'){
        resultado = '<select id="cargo2" name="select"><option selected class="guardar" value="CON CARGO">CON CARGO</option><option  class="guardar" value="SIN CARGO">SIN CARGO</option></select>';
    }else if(corrInfo.cargo === 'SIN CARGO'){
        resultado = '<select id="cargo2" name="select"><option class="guardar" value="CON CARGO">CON CARGO</option><option  class="guardar" selected value="SIN CARGO">SIN CARGO</option></select>'; 
    }else{
        resultado = '<select id="cargo2" name="select"><option class="guardar" value="CON CARGO">CON CARGO</option><option  class="guardar" value="SIN CARGO">SIN CARGO</option></select>';    }
    return resultado;
}

function resultadoCargoValor(){
    let resultado;
    if(corrInfo.cargoValor === '**FALLA OPERATIVA**'){
        resultado = '<select id="cargoValor2" name="select"><option selected class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option  class="guardar" value="**VANDALISMO**">VANDALISMO</option><option  class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option  class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option  class="guardar" value="SOFTWARE**">SOFTWARE</option><option  class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    }else if(corrInfo.cargoValor === '**VANDALISMO**'){
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option selected class="guardar" value="**VANDALISMO**">VANDALISMO</option><option  class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option  class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option  class="guardar" value="**SOFTWARE**">SOFTWARE</option><option  class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    }else if(corrInfo.cargoValor === '**ADECUACIONES**'){
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option  selected class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option  class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option  class="guardar" value="**SOFTWARE**">SOFTWARE</option><option  class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    }else if(corrInfo.cargoValor === '**COMUNICACIONES**'){
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option selected class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option  class="guardar" value="**SOFTWARE**">SOFTWARE</option><option  class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    }else if(corrInfo.cargoValor === '**SOFTWARE**'){
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option selected class="guardar" value="**SOFTWARE**">SOFTWARE</option><option  class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    }else if(corrInfo.cargoValor === '**FALLA MECÁNICA**'){
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option class="guardar" value="**SOFTWARE**">SOFTWARE</option><option selected class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option  class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    }else if(corrInfo.cargoValor === '**FALLA POR USUARIO**'){
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option class="guardar" value="**SOFTWARE**">SOFTWARE</option><option class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option selected class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option  class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    }else if(corrInfo.cargoValor === '**EQUIPO SIN FALLA**'){
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option class="guardar" value="**SOFTWARE**">SOFTWARE</option><option class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option selected class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    }else if(corrInfo.cargoValor === 'OTROS'){
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option class="guardar" value="**SOFTWARE**">SOFTWARE</option><option class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option selected class="guardar" value="OTROS">OTROS</option></select>'
    }else{
        resultado = '<select id="cargoValor2" name="select"><option class="guardar" value="**FALLA OPERATIVA**">FALLA OPERATIVA</option><option class="guardar" value="**VANDALISMO**">VANDALISMO</option><option class="guardar" value="**ADECUACIONES**">ADECUACIONES</option><option class="guardar" value="**COMUNICACIONES**">COMUNICACIONES</option><option class="guardar" value="**SOFTWARE**">SOFTWARE</option><option class="guardar" value="**FALLA MECÁNICA**">FALLA MECÁNICA</option><option class="guardar" value="**FALLA POR USUARIO**">FALLA POR USUARIO</option><option class="guardar" value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option><option class="guardar" value="OTROS">OTROS</option></select>'
    }
    return resultado;

}

//Guarda la información en un objeto al ser invocado por el blur
function guardandoInstalaciones(){
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
    infoInst.horaInicioViaje =document.querySelector('#horaInicioViaje').value;
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
    localStorage.setItem('infoInstalaciones',infoString);
}



function guardandoCorrectivos(){
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
    localStorage.setItem('infoCorrectivos',infoString);
}


//Recuper la info de local
function retornarInfo(){
    const infoRetorno = localStorage.getItem('infoInstalaciones');
    
    const infoRetorno2 = localStorage.getItem('infoCorrectivos');

    infoJson = JSON.parse(infoRetorno);
    infoJson2 = JSON.parse(infoRetorno2);
    
    if(infoJson){
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
    if(infoJson2){
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
