//VARIABLES
const btnInst = document.querySelector('.btnInstalaciones');
const btnCor = document.querySelector('.btnCorrectivos');
const btnGuardar = document.querySelector('.btnGuardar');
const btnCopiar = document.querySelector('.btnCopiar');
const salidaPlantilla = document.querySelector('.salida-plantilla');
const formAction = document.querySelector('#form-action');
const btnLayout = document.querySelector('.btnLayout');
const btnSalvar = document.querySelector('.btnSalvar');
const forms = document.querySelector('#formulario');
const formInst = document.querySelector('#formulario');

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
    //limpiarForm();
    // formAction.reset();
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
    <p>VoBo DEL SITIO SUCURSAL/ETV: ${voboSitio.toUpperCase()}</p>
    <p>SOFTWARE versión de aplicativo: ${software.toUpperCase()}</p>
    <p>COMENTARIOS ADICIONALES DEL IDC: ${comentarios.toUpperCase()}</p>
    `;

    salidaPlantilla.appendChild(elemento);
    btnCopiar.classList.remove('deshabilitar');
}
function crearFormInst(){
    const formulario = document.createElement('div');
    formulario.innerHTML=`
    <div class="form-instalaciones">
    <form action="post" id="form-action">
        <p>Ingeniero: </p>
        <select id="nombre" name="select">
            <option  value="JOSÉ CARLOS ROBLES ARECHIGA">JOSÉ CARLOS ROBLES ARECHIGA</option>
            <option  value="TOMAS LOBO INZUNZA">TOMAS LOBO INZUNZA</option>
            <option  value="DANIEL AREVALO GALVAN">DANIEL AREVALO GALVAN</option>
        </select>
        <p>Fecha:</p><input id="fecha" type="date" name="">
        <p>Banco:</p><input id="banco" type="text" name="">
        <p>Sucursal:</p><input id="sucursal" type="text" name="" >
        <p>Id:</p><input id="id" type="text" name="">
        <p>LLamada:</p><input id="llamada" type="text" name="" value="N/A">
        <p>Tiket/servicio:</p><input id="tiket" type="text" name="">
        <p>Tarea:</p><input id="tarea" type="text" name="">
        <p>Serie del equipo:</p><input id="serieEquipo" type="text" name="">
        <p>Modelo:</p><input id="modelo" type="text" name="">
        <p>Hora inicio viaje:</p><input id="horaInicioViaje" type="time" name="">
        <p>Hora de llegada:</p><input id="horaLlegada" type="time" name="">
        <p>Hora de inicio rep:</p><input id="horaInicioRep" type="time" name="">
        <p>Hora termino rep:</p><input id="horaTerminoRep" type="time" name="">
        <p>Hora de validación Bco:</p><input id="horaValidacionBco" type="time" name="">
        <p>Falla Reportada:</p><input id="fallaReportada" type="text" name="" value="PUESTA EN SERVICIO">
        <p>Comentarios:</p><TExtarea id="comentarios"></TExtarea>
        <p>Falla encontrada:</p><input id="fallaEncontrada" type="text" name="" value="SIN FALLAS">
        <p>Causa:</p><input id="causa" type="text" name="" value="457">
        <p>Solución:</p><input id="solucion" type="text" name="" value="723">
        <p>Codigo de intervencion:</p><input id="codigoIntervencion" type="text" name="" value="PUESTA EN SERVICIO">
        <p>Valida en linea:</p><input id="validaLinea" type="text" name="">
        <p>Valida en sitio:</p><input id="validaSitio" type="text" name="">
        <p>Aire acondicionado:</p><input id="aireAcondicionado" type="text" name="" value="SI">
        <p>Regulador (Solo remoto):</p><input id="regulador" type="text" name="" value="SI">
        <p>Condiciones fisicas:</p><input id="condiciones" type="text" name="" value="OK">

        <div class="voltajes">
            <p>Voltajes:</p>
            <div class="votajesIn">
                <p>Voltajes IN</p>
                <p>F-T IN:</p><input id="FTI" type="text" name="" value="0.0">
                <p>F-N IN:</p><input id="FNI" type="text" name="" value="0.0">
                <p>T-N IN:</p><input id="TNI" type="text" name="" value="0.0">
            </div>
            <div class="votajesOut">
                <p>Voltajes OUT</p>
                <p>F-T OUT:</p><input id="FTO" type="text" name="" value="120.0">
                <p>F-N OUT:</p><input id="FNO" type="text" name="" value="120.0">
                <p>T-N OUT:</p><input id="TNO" type="text" name="" value="0.2">
            </div>
        </div>


        <p>N. de parte:</p><input id="numParte" type="text" name="" value="N/A">
        <p>Descripción de la parte:</p><input id="descripcionParte" type="text" name="" value="N/A">
        <p>Cantidad:</p><input id="cantidad" type="text" name="" value="N/A">
        <p>N/S instalada:</p><input id="NSInstalada" type="text" name="" value="N/A">
        <p>N/S retirada:</p><input id="NSRetirada" type="text" name="" value="N/A">
        <p>Km:</p><input id="kilometros" type="text" name="">
    </form>
</div>
    `;

    forms.appendChild(formulario);

}

function crearFormCorr(){
    const formulario = document.createElement('div');
    formulario.innerHTML=`
    <div class="form-instalaciones">
                <form action="post" id="form-action">
                    <p>Proveedor</p><input id="proveedor2" type="text" name="" value="DIEBOLD NIXDORF">
                    <p>Tarea/Task/TK:</p><input id="tarea2" type="text" name="">
                    <p>Tiket/servicio/SR:</p><input id="tiket2" type="text" name="">
                    <p>Id ATM:</p><input id="id2" type="text" name="">
                    <p>Nombre del sitio:</p><input id="nombreSitio2" type="text">
                    <p>Marca y modelo de ATM:</p><input id="marcaModelo2" type="text" name="">
                    <p>Serie:</p><input id="serieEquipo2" type="text" name="">
                    <p>Sitio:</p><input id="sitio2" type="text" name="">
                    <p>Nombre del IDC: </p>
                    <select id="nombre2" name="select">
                        <option  value="JOSÉ CARLOS ROBLES ARECHIGA">JOSÉ CARLOS ROBLES ARECHIGA</option>
                        <option  value="TOMAS LOBO INZUNZA">TOMAS LOBO INZUNZA</option>
                        <option  value="DANIEL AREVALO GALVAN">DANIEL AREVALO GALVAN</option>
                        <option  value="DANIEL EDUARDO VALDEZ FELIX">DANIEL EDUARDO VALDEZ FELIX</option>
                    </select> 
                    <p>Como encontró el cajero:</p><input value="" id="encontroCajero2" type="text" name="">
                    <p>Falla reportada:</p><input type="text" name="" id="fallaReportada2">
                    <p>Código de error:</p><input type="text" name="" id="codigoError2">
                    <p>Modulo:</p><input type="text" name="" id="modulo2">
                    <p>Causa:</p><textarea name="" id="causa2" cols="30" rows="5"></textarea>
                    <p>Solución:</p><textarea name="" id="solucion2" cols="30" rows="5"></textarea>
                    <p>Pruebas:</p><textarea name="" id="pruebas2" cols="30" rows="5"></textarea>
                    <p>Como deja el cajero:</p><input value="" id="dejaCajero2" type="text" name="">

                    <div class="voltajes">
                        <p>Voltajes:</p>
                        <div class="votajesIn">
                            <p>Voltajes IN</p>
                            <p>F-T IN:</p><input id="FTI2" type="text" name="" value="0.0">
                            <p>F-N IN:</p><input id="FNI2" type="text" name="" value="0.0">
                            <p>T-N IN:</p><input id="TNI2" type="text" name="" value="0.0">
                        </div>
                        <div class="votajesOut">
                            <p>Voltajes OUT</p>
                            <p>F-T OUT:</p><input id="FTO2" type="text" name="" value="120.0">
                            <p>F-N OUT:</p><input id="FNO2" type="text" name="" value="120.0">
                            <p>T-N OUT:</p><input id="TNO2" type="text" name="" value="0.2">
                        </div>
                    </div>
                    <p>Datos especificos del entorno ajeno al ATM</p><textarea name="" id="datosEntorno2" cols="30" rows="5" >No hay nada en el entono que afecte al ATM</textarea>
                    <p>Con cargo / Sin cargo</p>
                    <select id="cargo2" name="select">
                        <option  value="CON CARGO">CON CARGO</option>
                        <option  value="SIN CARGO">SIN CARGO</option>
                    </select> 
                    <select id="cargoValor2" name="select">
                        <option  value="**FALLA OPERATIVA**">FALLA OPERATIVA</option>
                        <option  value="**VANDALISMO**">VANDALISMO</option>
                        <option  value="**ADECUACIONES**">ADECUACIONES</option>
                        <option  value="**COMUNICACIONES**">COMUNICACIONES</option>
                        <option  value="**SOFTWARE**">SOFTWARE</option>
                        <option  value="**FALLA MECÁNICA**">FALLA MECÁNICA</option>
                        <option  value="**FALLA POR USUARIO**">FALLA POR USUARIO</option>
                        <option  value="**EQUIPO SIN FALLA**">EQUIPO SIN FALLA</option>
                        <option value="OTROS">OTROS</option>
                    </select> 
                    
                    <p>Partes:</p><input id="partes2" type="text" name="" value="N/A">
                    <p>Traking en caso de no tenerla en sitio:</p><input id="trakingSitio2" type="text" name="" value="N/A">
                    <p>Software:</p><input id="software2" type="text" name="" value="N/A">
                    <p>Fecha de atención:</p><input id="fechaAtencion2" type="date" name="">
                    <p>Llegada:</p><input id="llegada2" type="time" name="">
                    <p>Inicio:</p><input id="inicio2" type="time" name="">
                    <p>Nota:</p><input id="notas2" type="text" name="" value="N/A">
                    <p>Validación:</p><input id="validacion2" type="time" name="">
                    <p>Retiro:</p><input id="retiro2" type="time" name="">
                    <p>VoBo DEL BANCO  (SE):</p><input id="voboBanco2" type="text" name="">
                    <p>VoBo DEL SITIO Sucursal/ETV:</p><input id="voboSitio2" type="text" name="">
                    <p>Comentarios adicionales del IDC:</p><textarea name="" id="comentarios2" cols="30" rows="2" value="N/A">N/A</textarea>
                </form>
            </div>
    `;
    forms.appendChild(formulario);
}
