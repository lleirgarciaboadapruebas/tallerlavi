/**
 * Created by lleir on 14/09/15.
 */

/** Objeto que constrye vistas de un (CLiente, Factura, Coche).
 * De cada apartado hay que mirar cuantos campos Visualizara.
 * @type {{vistaVerCliente: vistaVerCliente, vistaEditarCliente: vistaEditarCliente}}
 */

var constructorDeVistas = {

    limpiarVista: function(){ $(".container-interior").empty()},


    /** Vacia el contenido interior de DATOS y genera una vista depediendo si es VIEW o EDIT.
     *
     * @param request Datos de la query.
     * @param vista Será 'listado' o 'view' para generar una u otra vista.
     */
    vistaGenerica:
        function(request, vista, modulo) {
            this.limpiarVista();

            if(vista == "list"){
                this.setEncabezado(vista, modulo);
            } else if(vista == "create"){
                this.setEncabezado(vista, modulo);
                this.tituloVista(request, vista, modulo);
                this.botonesAcciones(request, vista, modulo);
            } else {
                // construyo el titulo y los botones en el TOP de la vista.
                this.setEncabezado(vista, modulo);
                this.tituloVista(request, vista, modulo);
                this.botonesAcciones(request, vista, modulo);
            }
        },

    setEncabezado:
        function(vista, modulo) {
            var str;
            switch (vista) {
                case "create":
                    if(modulo == "cliente")
                        str = "Crear cliente";
                    if(modulo == "factura")
                        str = "Crear factura";
                    if(modulo == "vehiculo")
                        str = "Crear vehiculo";

                    break;

                case "view" :       str = "Datos de " + capitaliseFirstLetter(modulo);     break;
                case "edit" :       str = "Editar datos";  break;
                case "list" :       str = "Listado de "  + capitaliseFirstLetter(modulo) + "s";    break;
            }

            $(".container-interior").append("<div class='encabezado-modulo-interior'><label class='encabezado-modulo-interior-title'>" + str + "</label></div>");
            $(".encabezado-modulo-interior").append("<div class='div-buttons-encabezado'>");
            $(".encabezado-modulo-interior").append("<div id='validation-list' class='s' style='position: relative; float: left; margin: 2% 2%; width:50%></div>");
            if(vista == "list"){
                if(modulo == "cliente")
                    $(".div-buttons-encabezado").append("<button class='button tiny radius' id='btnCrearId' style='margin: 5px;'onclick='actionViewCrearCliente()'>Crear " + modulo + "&nbsp;&nbsp;<img src='./resources/crear" + modulo + ".png'></button></div>");
                if(modulo == "factura")
                    $(".div-buttons-encabezado").append("<button class='button tiny radius' id='btnCrearId' style='margin: 5px;'onclick='actionViewCrearFactura()'>Crear " + modulo + "&nbsp;&nbsp;<img src='./resources/crear" + modulo + ".png'></button></div>");
                if(modulo == "vehiculo")
                    $(".div-buttons-encabezado").append("<button class='button tiny radius' id='btnCrearId' style='margin: 5px;'onclick='actionViewCrearVehiculo()'>Crear " + modulo + "&nbsp;&nbsp;<img src='./resources/" + modulo + ".png'></button></div>");
            }

            $(".container-interior").append("<div class='contenido-interior'></div>");
        },

    /** Construye y pone el titulo del modulo por vista
     *
     * @param request Resultado query.
     * @param vista  Vista (listado, ver).
     */
    tituloVista: function(request, vista, modulo){
        $(".contenido-interior").append("<div class='contenido-verDatos'></div>");
        $(".contenido-verDatos").append("<div class='top-modulo-interior'></div>");

        var title = "";

        switch(vista){
            case "create" :
                if(modulo == "cliente") {
                    title = "Crea un cliente";
                    $(".top-modulo-interior").after("<div class='div-campos-requeridos'><i class='i-campos-requeridos'>Los campos marcados con (*) son obligatorios</i></div>");
                } else if(modulo == "factura") {
                    title = "Crea una factura";
                    $(".top-modulo-interior").after("<div class='div-campos-requeridos'><i class='i-campos-requeridos'>Los campos marcados con (*) son obligatorios</i></div>");
                } else {
                    title = "Crea un vehiculo";
                    $(".top-modulo-interior").after("<div class='div-campos-requeridos'><i class='i-campos-requeridos'>Los campos marcados con (*) son obligatorios</i></div>");
                }

                break;

            case "edit" :

                if(modulo == "cliente") {
                    title = "Modificar <b>" + request[0].nombre + "</b>";
                    $(".top-modulo-interior").after("<div class='div-campos-requeridos'><i class='i-campos-requeridos'>Los campos marcados con (*) son obligatorios</i></div>");
                } else if(modulo == "factura") {
                    title = "Modificar <b>" + request[0].codigo + "</b>";
                    $(".top-modulo-interior").after("<div class='div-campos-requeridos'><i class='i-campos-requeridos'>Los campos marcados con (*) son obligatorios</i></div>");
                } else {
                    title = "Modificar <b>" + request[0].marca + " " + request[0].modelo + " con matricula " + request[0].matricula + "</b>";
                    $(".top-modulo-interior").after("<div class='div-campos-requeridos'><i class='i-campos-requeridos'>Los campos marcados con (*) son obligatorios</i></div>");
                }
            break;

            case "view" :

                if(modulo == "cliente")
                    title = "Detalles de Cliente <b>" + request[0].nombre + "</b>";
                if(modulo == "factura")
                    title = "Detalles de Factura <b>" + request[0].codigo + "</b>";
                if(modulo == "vehiculo")
                    title = "Detalles de Vehiculo <b>" + request[0].marca + " " + request[0].modelo + " con matricula " + request[0].matricula + "</b>";


            break;

        }

        $(".top-modulo-interior").append("<span class='title-modulo'>" + title + "</span>");
        $(".top-modulo-interior").append("<div class='acciones-modulo' ></div>");
    },


    botonesAcciones: function(request, vista, modulo){
        var buttons;

        switch(modulo){
            case "cliente" :
                if(vista == "view")
                    buttons ="<button type='button' class='button tiny radius ' onclick='actionVerListadoClientes()'>Volver</button>";
                    //"<button type='button' class='button tiny radius'>Ver vehiculos</button>" +

                else if(vista == "edit")
                    buttons =    "<button type='button' class='button tiny radius' onclick='actionVerCliente(" + request[0].id + ")'>Volver al detalle</button>";

                else if(vista == "create")
                    buttons =    "<button type='button' class='button tiny radius' onclick='actionVerListadoClientes()'>Volver</button>";

                break;

            case "factura" :
                if(vista == "view")
                    buttons =  "<button type='button' class='button tiny radius' onclick='actionVerListadoFacturas()'>Volver</button>";
                else if(vista == "edit")
                    buttons =    "<button type='button' id='button-detalle' class='button tiny radius' onclick='actionVerFactura(\"" + request[0].codigo + "\")'>Volver al detalle</button>";
                else if(vista == "create")
                    buttons =    "<button type='button' class='button tiny radius' onclick='actionVerListadoFacturas()'>Volver</button>";

                break;

            case "vehiculo" :
                if(vista == "view")
                    buttons =  "<button type='button' class='button tiny radius' onclick='actionVerListadoVehiculos()'>Volver</button>";
                else if(vista == "edit")
                    buttons =    "<button type='button' class='button tiny radius' onclick='actionVerVehiculo(" + request[0].id + ")'>Volver al detalle</button>";
                else if(vista == "create")
                    buttons =    "<button type='button' class='button tiny radius' onclick='actionVerListadoVehiculos()'>Volver</button>";

                break;
        }

        //TODO REIVSAR
        if(modulo == "cliente" && vista == "view")
            buttons =   "<button type='button' class='button tiny radius' onclick='actionVerListadoClientes()'>Volver</button>";//"<button type='button' class='button secondary tiny radius' onclick='actionVerVehiculosCliente(request[0].nombre)'>Ver vehiculos</button>" +

        else if (modulo == "cliente" && vista == "editar")
            buttons = "<button type='button' class='btn btn-info' onclick='actionVerCliente(" + request[0].id + ")'>Volver al detalle</button>";

        $(".acciones-modulo").append(buttons);
    },


    // todo Construye una viesta VIEW
    vista: function(request, vista, modulo){

        switch (modulo){
            case "cliente" :
                if(vista == "create")  this.vistaCrearCliente(request);
                if(vista == "view") this.vistaVerCliente(request);
                if(vista == "edit") this.vistaEditarCliente(request);
                if(vista == "list") this.vistaListado(request, vista, modulo.modulo, modulo.columnasTabla, modulo.filtrosTabla);
                break;

            case "factura" :
                if(vista == "create") this.vistaCrearFactura(request);
                if(vista == "view") this.vistaVerFactura(request);
                if(vista == "edit") this.vistaEditarFactura(request);
                if(vista == "list") this.vistaListado(request, vista, modulo.modulo, modulo.columnasTabla, modulo.filtrosTabla);
                break;

            case "vehiculo" :
                if(vista == "create") this.vistaCrearVehiculo(request);
                if(vista == "view") this.vistaVerCoche(request);
                if(vista == "edit") this.vistaEditarVehiculo(request);
                if(vista == "list") this.vistaListado(request, vista, modulo.modulo, modulo.columnasTabla, modulo.filtrosTabla);
                break;
        }
    },

    //todo Construye una vista LIST
    listado : function(request, view, modulo, vEncabezado, vFiltros){
        // genera la vista generica como el encabezado (titul y botones)
        this.vistaGenerica(request, view, modulo);

        // genera la tabla con los DATOS.
        constructorDeTablas.construirTabla(request, modulo, vEncabezado);

        // genera FILTROS para consultar DATOS.
        constructorDeFiltros.construirFiltro(modulo, vFiltros);
    },

    /** Construye la vista para insertar datos de un Cliente */
    vistaCrearCliente: function(request){

        // genera la vista generica como el encabezado (titul y botones)
        this.vistaGenerica(request, "create", "cliente");

        // genera los campos a visualizar
        $(".contenido-verDatos").append("<form id='form_create_cliente' method='GET'></form>");
        $("#form_create_cliente").append("<div class='contenido-modulo-inferior'></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Datos de cliente</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-nif'>NIF: *</label><input id='IO' class='IO input-result inputForm form-control '>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-nombre'>Nombre: *</label><input id='IO' class='IO input-result inputForm form-control'>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-apellidos'>Apellidos: *</label><input id='IO' class='IO input-result inputForm form-control '>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Direccion y poblacion</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-direccion'>Direccion: </label><input class='input-result inputForm form-control'>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-localidad'>Localidad: </label><input class='input-result inputForm form-control '>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Contacto</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-telefono_principal'>Telefono principal: </label><input class='input-result inputForm form-control'>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-telefono_segundario'>Telefono segundario: </label><input class='input-result inputForm form-control'>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group div-buttons-modulo'>" +
            "<button type='button' id='btnGuardar' class='button success tiny radius' onclick='actionCreateCliente(form_create_cliente)'>Crear cliente</button>" +
            "<button type='button' id='btnCancelar' class='button alert tiny radius button-cancel' onclick='actionVerListadoClientes()'>Cancelar</button>");
        $(".contenido-modulo-inferior").append("<div id='validation' class='viewForm form-group validation-error'></div>");

        // todo
        constructorDeFiltros.construirFiltro(cliente.modulo, cliente.filtrosTabla);    },

    vistaCrearVehiculo: function(request){

        // genera la vista generica como el encabezado (titul y botones)
        this.vistaGenerica(request, "create", "vehiculo");

        // genera los campos a visualizar
        $(".contenido-verDatos").append("<form id='form_create_vehiculo' method='GET'></form>");
        $("#form_create_vehiculo").append("<div class='contenido-modulo-inferior'></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Datos del vehiculo </span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-matricula'>Matricula: *</label><input id='IO' class='IO input-result inputForm form-control '>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-marca'>Marca: *</label><input id='IO' class='IO input-result inputForm form-control'>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-modelo'>Modelo: *</label><input id='IO' class='IO input-result inputForm form-control '>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-km'>Km Actuales: </label><input class='input-result inputForm form-control'>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-bastidor'>Num. Bastidor: </label><input class='input-result inputForm form-control '>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-cliente'>Cliente: *</label><div class='IO div-autocomplete'  id='autocomplete-cliente'></div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group div-buttons-modulo'>" +
            "<button type='button' id='btnGuardar' class='button success tiny radius' onclick='actionCrearVehiculo(form_create_vehiculo)'>Crear vehiculo</button>" +
            "<button type='button' id='btnCancelar' class='button alert tiny radius button-cancel' onclick='actionVerListadoVehiculos()'>Cancelar</button>");
        $(".contenido-modulo-inferior").append("<div id='validation' class='viewForm form-group validation-error'></div>");

        autocompleteClientes("0", null, vehiculo.modulo);
        // todo
        constructorDeFiltros.construirFiltro(vehiculo.modulo, vehiculo.filtrosTabla);
    },

    vistaCrearFactura: function(request, codigo) {

        // genera la vista generica como el encabezado (titul y botones)
        this.vistaGenerica(request, "create", "factura");

        // genera los campos a visualizar
        $(".contenido-verDatos").append("<form id='form_create_factura' method='GET'></form>");
        $("#form_create_factura").append("<div class='contenido-modulo-inferior'></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Condiciones de Factura</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-cliente'>Cliente: *</label><div class='IO div-autocomplete' id='autocomplete-cliente'>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-codigo'>Codigo: *</label><input value='" + codigo + "' id='IO' class=' IO input-result inputForm form-control' ></input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-fecha'>Fecha: *</label><input id='IO' value='" + date() +"' class=' IO input-result inputForm form-control'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-estado'>Estado: *</label><select id='IO' class='div-autocomplete'>" +
            "<option value='1'> En curso </option>" +
            "<option value='2'> Cobrada </option></select>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-iva'>IVA: *</label><input style='margin-left: -82px;' id='entity_iva' value='21' class='IO input-result inputForm form-control'>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-precio_hora'>Precio hora: </label><input style='margin-left: -82px;' id='entity_precio_hora' value='36' class='input-result inputForm form-control'>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Vehiculo</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-cliente'>Vehiculo: *</label><div class='IO div-autocomplete' id='autocomplete-vehiculo'><select style='display: none' class='IO' id='combobox2'></select></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Conceptos</span> </div>");

        this.vistaConceptos(null, null, null);

        $(".contenido-modulo-inferior").append("<div class='viewForm form-group div-buttons-modulo'>" +
            "<button type='button' id='btnGuardar' class='button success tiny radius' onclick='actionCrearFactura(form_create_factura)'>Guardar datos</button>" +
            "<button type='button' id='btnCancelar' class='button alert tiny radius button-cancel' onclick='actionVerListadoFacturas()'>Cancelar</button>");
        $(".contenido-modulo-inferior").append("<div id='validation' class='viewForm form-group validation-error'></div>");

        autocompleteClientes("0", null, factura.modulo);
        // todo
        constructorDeFiltros.construirFiltro(factura.modulo, factura.filtrosTabla);
    },

    vistaConceptos: function(requestConceptos, requestFactura, esEdicion){
        $(".contenido-modulo-inferior").append("<div id='anadeConceptos' class='viewAnadirConceptos'></div>");

        // si edicion es False y no hay request de conceptos, significa que estamos en la creacion.
        if(!esEdicion && requestConceptos == null) {
           this.vistaConceptosCrear(requestConceptos, requestFactura);
            // si no es edicion y hay request de conceptos, significa que estamos en el view de la factura.
        } else if(!esEdicion && requestConceptos != null){
            this.vistaConceptosView(requestConceptos, requestFactura);
        } else {
            this.vistaConceptosEdit(requestConceptos, requestFactura);
        }

        if(requestFactura == null) {
            $("#anadeConceptos").append("<table class='box-totales'><tbody><tr><td></td><td></td></td>" +
                "</tr><td>MANO OBRA:</td><td><input class='inputTotal' readonly id='mano_total' value='0' /><img src='./resources/euro2.png'/></img></td></div></td></tr>" +
                "<tr><td>RECAMBIOS: </td><td><input class='inputTotal' readonly id='recambio_total' value='0' /><img src='./resources/euro2.png' /></img> </td></tr>" +
                "<tr><td>SUMAN: </td><td><input class='inputTotal' readonly id='suma_total' value='0' /></span><img src='./resources/euro2.png' /></img> </td></tr>" +
                "<tr><td>IVA: </td><td><input class='inputTotal' readonly id='iva_total' value='0' /><img src='./resources/euro2.png' /></img> </td></tr>" +
                "<tr><td>TOTAL: </td><td><input class='inputTotal' readonly id='total' value='0' /><img src='./resources/euro2.png' /></img> </td></tr>" +
                "</tbody></table>");
        } else {

            $("#anadeConceptos").append("<table class='box-totales'><tbody><tr><td></td><td></td></td>" +
                "</tr><td>MANO OBRA:</td><td><span>" + formatNumber.new(requestFactura[0].mano_obra) + "</span><input style='display: none;'class='inputTotal' readonly id='mano_total' value='" + requestFactura[0].mano_obra + "' /><img src='./resources/euro2.png'/></img></td></div></td></tr>" +
                "<tr><td>RECAMBIOS: </td><td><span>" + formatNumber.new(requestFactura[0].recanvios) + "</span><input style='display: none;' class='inputTotal' readonly id='recambio_total' value='" + requestFactura[0].recanvios + "' /><img src='./resources/euro2.png' /></img> </td></tr>" +
                "<tr><td>SUMAN: </td><td><span>" + formatNumber.new(requestFactura[0].suman) + "</span><input style='display: none;' class='inputTotal' readonly id='suma_total' value='" + requestFactura[0].suman + "' /></span><img src='./resources/euro2.png' /></img> </td></tr>" +
                "<tr><td>IVA: </td><td><span>" + formatNumber.new(requestFactura[0].iva_total) + "</span><input style='display: none;'class='inputTotal' readonly id='iva_total' value='" + requestFactura[0].iva_total + "' /><img src='./resources/euro2.png' /></img> </td></tr>" +
                "<tr><td>TOTAL: </td><td><span>" + formatNumber.new(requestFactura[0].total) + "</span><input class='inputTotal' style='display: none;' readonly id='total' value='" + requestFactura[0].total+ "' /><img src='./resources/euro2.png' /></img> </td></tr>" +
                "</tbody></table>");
        }
    },

    vistaConceptosCrear: function (requestConceptos, requestFactura){

        $("#anadeConceptos").append("<form id='form_concepto'> </form>");
        $("#form_concepto").append("<div class='viewFormConceptoLine'>" +
            "<label class='label-obligatorio label-result-conceptos label-cliente'>Mano de Obra o Pieza:</label>" +
            "<select id='tipoConcepto'  name='tipoConcepto' class='selectForm IU' onchange='setProps()'>" +
            "<option value='1'>Mano de Obra</option>" +
            "<option value='2'>Recanvios</option>" +
            "</select>");
            //"<input id='IOc' class='inputFormConcepto IU form-control' maxlength='35' placeholder='Escribe el Recambio o la mano de obra...'></div>");

        $("#form_concepto").append("<div class='viewFormConceptoLine' style='height: 55px'><textarea style='width: 92%; margin:0 6%' style='margin: 0 6%' id='IOc' maxlength='250' class='inputFormConcepto IU form-control' ></textarea></div>");

        $("#form_concepto").append("<div class='viewFormConceptoLine' style='margin: 3% 17%' ><label id='label-cantidad' class='label-obligatorio label-result-conceptos label-fecha'>Cantidad: *</label><input name='entity.cantidad'  maxlength='5' style='margin-left: -65px;' id='IOc' class='inputNum5 form-control IU' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)' />" +
            "<label class='label-obligatorio label-result-conceptos label-precio'>Precio: *</label><input name='entity_precio'  maxlength='8' style='margin-left: -82px;' id='IOc' class='inputNum5 IU form-control' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)'/>" +
            "<label class='label-obligatorio label-result-conceptos label-iva'></label></div>" +
            "<div class='viewFormConceptoLine'><button type='button' class='form-button-concepto button tiny radius' onclick='actionAnadeConcepto(form_concepto)'>Añadir +</button></div>");

        $("#label-cantidad").text("");
        if($("#tipoConcepto").val() == 1) {
            $("#label-cantidad").text("Horas:");
            $("input[name=entity_precio]").val($("#entity_precio_hora").val());
        }


        $("#anadeConceptos").append("<table id='table-conceptos' class='table-conceptos'><tbody><td>Tipo</td><td>Concepto</td><td>Cantidad</td><td>Precio</td><td width='19%'>Acciones</td></td></tr></tbody>");


    },

    vistaConceptosEdit: function(request, requestFactura){
        $("#anadeConceptos").append("<form id='form_concepto'> </form>");
        $("#form_concepto").append("<div class='viewFormConceptoLine'>" +
            "<label class='label-obligatorio label-result-conceptos label-cliente'>Mano de Obra o Pieza:</label>" +
            "<select id='tipoConcepto'  name='tipoConcepto' class='selectForm IU' onchange='setProps()'>" +
            "<option value='1'>Mano de Obra</option>" +
            "<option value='2'>Recanvios</option>" +
            "</select>");
            //"<input id='IOc' class='inputFormConcepto IU form-control'  maxlength='35' placeholder='Escribe el Recambio o la mano de obra...'></div>");

        $("#form_concepto").append("<div class='viewFormConceptoLine' style='height: 55px'><textarea style='width: 92%; margin: 0 6%' id='IOc' maxlength='250' class='inputFormConcepto IU form-control' ></textarea></div>");

        $("#form_concepto").append("<div class='viewFormConceptoLine' style='margin: 3% 17%'><label id='label-cantidad' class='label-obligatorio label-result-conceptos label-fecha'>Cantidad: *</label><input name='entity.cantidad' style='margin-left: -65px;' id='IOc' class='inputNum5 form-control IU' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)'/>" +
            "<label class='label-obligatorio label-result-conceptos label-precio'>Precio: *</label><input name='entity_precio' style='margin-left: -82px;' id='IOc' class='inputNum5 IU form-control' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)'/>" +
            "<label class='label-obligatorio label-result-conceptos label-iva'></label></div>" +
            "<div class='viewFormConceptoLine'><button type='button' class='form-button-concepto button tiny radius' onclick='actionAnadeConcepto(form_concepto)'>Añadir +</button></div>");

        $("#label-cantidad").text("");
        if($("#tipoConcepto").val() == 1) {
            $("#label-cantidad").text("Horas:");
            $("input[name=entity_precio]").val($("#entity_precio_hora").val());
        }

        $("#anadeConceptos").append("<table id='table-conceptos' class='table-conceptos'><tbody><td>Tipo</td><td>Concepto</td><td>Cantidad/Hora</td><td>Precio</td><td width='19%'>Acciones</td></td></tr></tbody>");

        if(request.manoobra != null || request.recambios != null) {
            var row = getLinesByTable("#table-conceptos") + 1;

            if(request.manoobra != null) {
                for (var mano = 0; mano < request.manoobra.length; mano++) {
                    var id = "concept_" + row;
                    $(".table-conceptos").append("<tr id='" + id + "' ></tr>");
                    $("#" + id).append("<td style='width: 5%;'><input class='concept' id='entity.tipo_" + row + "' name='tipo' type='text' readonly maxlength='1' maxlength='62' value='" + request.manoobra[mano].tipo + "' ></td>" +
                        "<td style='width: 40%;'><input class='concept'id='entity.concepto_" + row + "' name='concepto' type='text' readonly maxlength='250' value='" + request.manoobra[mano].detalle + "' /></td>" +
                        "<td style='width: 10%'><input class='concept' id='entity.cantidad_" + row + "' type='text' name='cantidad' readonly maxlength='5' value='" + request.manoobra[mano].cantidad + "' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)'></td>" +
                        "<td style='width: 17%'><input class='concept'  id='entity.precio_" + row + "' type='text' name='precio' readonly maxlength='8' value='" + request.manoobra[mano].importe + "' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)'></td>" +
                        "<td class='td-acciones'><a onclick='actionBorrarConcepto(\"" + row + "\")'><img title='Eliminar concepto' src='./resources/papelera.png'></a>" +
                        "<a onclick='actionGuardarConceptos(\"" + row + "\")'><img title='Guardara concepto' src='./resources/download.ico'></a>" +
                        "<a onclick='actionEditarConceptos(\"" + row + "\")'><img title='Editar concepto' src='./resources/edit.ico'></a></td>");

                    row++;
                }
            }

            if(request.recambios != null) {
                for (var re = 0; re < request.recambios.length; re++) {
                    var id = "concept_" + row;
                    $(".table-conceptos").append("<tr id='" + id + "' ></tr>");
                    $("#" + id).append("<td style='width: 5%;'><input class='concept' id='entity.tipo_" + row + "' name='tipo' type='text' readonly maxlength='10' maxlength='62' value='" + request.recambios[re].tipo + "' ></td>" +
                        "<td style='width: 40%;'><input class='concept' id='entity.concepto_" + row + "' name='concepto' type='text' readonly maxlength='250' value='" + request.recambios[re].detalle + "' ></td>" +
                        "<td style='width: 10%'><input class='concept' id='entity.cantidad_" + row + "' type='text' name='cantidad' readonly maxlength='5' value='" + request.recambios[re].cantidad + "' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)'></td>" +
                        "<td style='width: 17%'><input class='concept' id='entity.precio_" + row + "' type='text' name='precio' readonly maxlength='8' value='" + request.recambios[re].importe + "' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 )' ></td>" +
                        "<td class='td-acciones'><a onclick='actionBorrarConcepto(\"" + id + "\")'><img title='Eliminar concepto' src='./resources/papelera.png'></a>" +
                        "<a onclick='actionGuardarConceptos(\"" + row + "\")'><img title='Guardara concepto' src='./resources/download.ico'></a>" +
                        "<a onclick='actionEditarConceptos(\"" + row + "\")'><img title='Editar concepto' src='./resources/edit.ico'></a></td>");
                    row++;
                }
            }
        }
    },

    vistaConceptosView: function(requestConceptos, requestFactura){
        if(requestConceptos.manoobra || requestConceptos.recambios) {
            if (requestConceptos.manoobra != null) {
                $("#anadeConceptos").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Mano de Obra</span> </div>");
                $("#anadeConceptos").append("<table id='table-conceptos-mano'     class='table-conceptos'><tbody><th>Detalle</th><th>Horas</th><th>Precio</th></tr></tbody>");
                for (var mano = 0; mano < requestConceptos.manoobra.length; mano++) {
                    $("#table-conceptos-mano").append("<tr><td style='width: 40%;'><span>" + requestConceptos.manoobra[mano].detalle + "</span></td>" +
                        "<td style='width: 5%;'><span>" + requestConceptos.manoobra[mano].cantidad + "</span></td>" +
                        "<td style='width: 5%;'><span>" + requestConceptos.manoobra[mano].importe + "</span></td></tr>");
                }
            }

            if (requestConceptos.recambios != null) {
                $("#anadeConceptos").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Recambios</span> </div>");
                $("#anadeConceptos").append("<table id='table-conceptos-recambio'     class='table-conceptos'><tbody><th>Detalle</th><th>Cantidad</th><th>Precio</th></tr></tbody>");
                for (var recambios = 0; recambios < requestConceptos.recambios.length; recambios++) {
                    $("#table-conceptos-recambio").append("<tr><td style='width: 40%;'><span>" + requestConceptos.recambios[recambios].detalle + "</span></td>" +
                        "<td style='width: 5%;'><span>" + requestConceptos.recambios[recambios].cantidad + "</span></td>" +
                        "<td style='width: 5%;'><span>" + requestConceptos.recambios[recambios].importe + "</span></td></tr>");
                }
            }

        }
    },

    vistaEditarCliente: function(request){
        // genera la vista generica como el encabezado (titul y botones)
        this.vistaGenerica(request, "edit", "cliente");

        // genera los campos a visualizar
        $(".contenido-verDatos").append("<form id='form_update_cliente' method='GET'></form>");
        $("#form_update_cliente").append("<div class='contenido-modulo-inferior'></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Datos de cliente</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-nif'>NIF: *</label><input id='IO' class='IO input-result inputForm form-control ' value='" + request[0].nif + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-nombre'>Nombre: *</label><input id='IO' class='IO input-result inputForm form-control ' value='" + request[0].nombre + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-apellidos'>Apellidos: *</label><input id='IO' class='IO input-result inputForm form-control ' value='" + request[0].apellido + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Direccion y poblacion</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-direccion'>Direccion: </label><input  class='input-result inputForm form-control ' value='" + request[0].direccion + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-localidad'>Localidad: </label><input class='input-result inputForm form-control ' value='" + request[0].localidad + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Contacto</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-telefono_principal'>Telefono principal: </label><input  class='input-result inputForm form-control ' value='" + request[0].telefono + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-telefono_segundario'>Telefono segundario: </label><input class='input-result inputForm form-control ' value='"+ request[0].telefono_segundario + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group div-buttons-modulo'>" +
            "<button type='button' id='btnGuardar' class='button success tiny radius' onclick='actionUpdateCliente(" + request[0].id + ", \"" + request[0].nif + "\", form_update_cliente)'>Guardar datos</button>" +
            "<button type='button' id='btnCancelar' class='button alert tiny radius button-cancel' onclick='actionVerCliente(" + request[0].id + ")'>Cancelar</button>");
        $(".contenido-modulo-inferior").append("<div id='validation' class='viewForm form-group validation-error'></div>");

        // todo
        constructorDeFiltros.construirFiltro(cliente.modulo, cliente.filtrosTabla);

    },

    vistaEditarVehiculo: function(request){
        // genera la vista generica como el encabezado (titul y botones)
        this.vistaGenerica(request, "edit", "vehiculo");

        // genera los campos a visualizar
        $(".contenido-verDatos").append("<form id='form_update_vehiculo' method='GET'></form>");
        $("#form_update_vehiculo").append("<div class='contenido-modulo-inferior'></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Datos de vehiculo</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-matricula'>Matricula: *</label><input id='IO' class='IO input-result inputForm form-control ' value='" + request[0].matricula + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-marca'>Marca: *</label><input id='IO' class='IO input-result inputForm form-control ' value='" + request[0].marca + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-modelo'>Modelo: *</label><input id='IO' class='IO input-result inputForm form-control ' value='" + request[0].modelo+ "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-km'>Km actuales: </label><input  class='input-result inputForm form-control ' value='" + request[0].km + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-bastidor'>Num. Bastidor: </label><input class='input-result inputForm form-control ' value='" + request[0].num_bastidor + "'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-cliente'>Cliente: *</label><div class='div-autocomplete' id='autocomplete-cliente'></div>");

        $(".contenido-modulo-inferior").append("<div class='viewForm form-group div-buttons-modulo'>" +
            "<button type='button' id='btnGuardar' class='button success tiny radius' onclick='actionUpdateVehiculo(" + request[0].id + ", \"" + request[0].matricula + "\", form_update_vehiculo)'>Guardar datos</button>" +
            "<button type='button' id='btnCancelar' class='button alert tiny radius button-cancel' onclick='actionVerVehiculo(" + request[0].id + ")'>Cancelar</button>");
        $(".contenido-modulo-inferior").append("<div id='validation' class='viewForm form-group validation-error'></div>");

        autocompleteClientes(request[0].id_cliente, request[0].matricula, factura.modulo);

        // todo
        constructorDeFiltros.construirFiltro(vehiculo.modulo, vehiculo.filtrosTabla);
    },

    vistaEditarFactura: function(requestFactura, requestConceptos){
        // genera la vista generica como el encabezado (titul y botones)
        this.vistaGenerica(requestFactura, "edit", "factura");

        // genera los campos a visualizar
        $(".contenido-verDatos").append("<form id='form_update_factura' method='GET'></form>");
        $("#form_update_factura").append("<div class='contenido-modulo-inferior'></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Condiciones de Factura</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-cliente'>Cliente: *</label><div class='IO div-autocomplete' id='autocomplete-cliente'>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-codigo'>Codigo: *</label><input id='IO' value='" + requestFactura[0].codigo + "' class=' IO input-result inputForm form-control'></input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-fecha'>Fecha: *</label><input id='IO' value='" + requestFactura[0].fecha + "' class=' IO input-result inputForm form-control'</input>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-estado'>Estado: *</label><select id='estado' class='div-autocomplete'>" +
            "<option value='1'> En curso </option>" +
            "<option value='2'> Cobrada </option></select>");
        $("#estado").val(requestFactura[0].estado);
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-iva'>IVA: *</label><input value='" + requestFactura[0].iva + "' style='margin-left: -82px;' id='entity_iva' class='IO input-result inputForm form-control'>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-precio_hora'>Precio hora: </label><input value='" + requestFactura[0].precio_hora + "' style='margin-left: -82px;' id='entity_precio_hora' class='input-result inputForm form-control'>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Vehiculo</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-cliente'>Vehiculo: *</label><div class='IO div-autocomplete' id='autocomplete-vehiculo'>" +
            "<select class='IO' id='combobox2'></select></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Conceptos</span> </div>");

        this.vistaConceptos(requestConceptos, requestFactura, true);

        console.log("39274897234");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group div-buttons-modulo'>" +
            "<button type='button' id='btnGuardar' class='button success tiny radius' id='button-guardar' onclick='actionUpdateFactura(\"" + requestFactura[0].id + "\", \"" + requestFactura[0].codigo + "\", form_update_factura)'>Guardar datos</button>" +
            "<button type='button' id='btnCancelar' class='button alert tiny radius button-cancel' onclick='actionVerListadoFacturas()'>Cancelar</button>");
        $(".contenido-modulo-inferior").append("<div id='validation' class='viewForm form-group validation-error'></div>");

        autocompleteClientes(requestFactura[0].id_cliente, requestFactura[0].matricula, factura.modulo);


        // todo
        constructorDeFiltros.construirFiltro(factura.modulo, factura.filtrosTabla);
    },

    /** Construye la vista para ver los DATOS de un Cliente. */
    vistaVerCliente: function(request){

        // genera la vista generica como el encabezado (titul y botones)
        this.vistaGenerica(request, "view", "cliente");
        // genera los campos a visualizar
        $(".contenido-verDatos").append("<div class='contenido-modulo-inferior'></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Datos de cliente</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-nif'>NIF: </label><label class='result result-cliente'>" + request[0].nif + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-nombre'>Nombre: </label><label class='result result-cliente'>" + request[0].nombre + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-apellidos'>Apellidos: </label><label class='result result-cliente'>" + request[0].apellido + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Direccion y poblacion</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-direccion'>Direccion: </label><label class='result result-cliente'>" + request[0].direccion + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-localidad'>Localidad: </label><label class='result result-cliente'>" + request[0].localidad + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Contacto</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-telefono_principal'>Telefono principal: </label><label class='result result-cliente'>" + request[0].telefono + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-telefono_segundario'>Telefono segundario: </label><label class='result result-cliente'>" + request[0].telefono_segundario + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group div-buttons-modulo'>" +
            "<button type='button' id='btnModificar' class='button tiny radius' onclick='actionVerDetalleCliente(" + request[0].id + ")'>Modificar datos</button>");
        $(".contenido-modulo-inferior").append("<div id='validation' class='viewForm form-group validation-error'></div>");

        constructorDeFiltros.construirFiltro(cliente.modulo, cliente.filtrosTabla);
    },


    vistaVerCoche: function(request){
        // genera la vista generica como el encabezado (titul y botones)
        this.vistaGenerica(request, "view", "vehiculo");
        // genera los campos a visualizar
        $(".contenido-verDatos").append("<div class='contenido-modulo-inferior'></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Datos del vehiculo</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-matricula'>Matricula: </label><label class='result result-cliente'>" + request[0].matricula + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-marca'>Marca: </label><label class='result result-cliente'>" + request[0].marca + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-modelo'>Model: </label><label class='result result-cliente'>" + request[0].modelo+ "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-km'>Km actuales: </label><label class='result result-cliente'>" + request[0].km + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-bastidor'>Num. Bastidor: </label><label class='result result-cliente'>" + request[0].num_bastidor+ "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-result label-cliente'>Cliente: </label><label class='result result-cliente'>" + request[0].nombre+ " " + request[0].apellido + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group div-buttons-modulo'>" +
            "<button type='button' id='btnModificar' class='button tiny radius' onclick='actionVerDetalleVehiculo(" + request[0].id + ")'>Modificar datos</button>");
        $(".contenido-modulo-inferior").append("<div id='validation' class='viewForm form-group validation-error'></div>");

        constructorDeFiltros.construirFiltro(vehiculo.modulo, vehiculo.filtrosTabla);

    },

    vistaVerFactura: function(requestFactura, requestConceptos){
        // genera la vista generica como el encabezado (titul y botones)

        this.vistaGenerica(requestFactura, "view", "factura");

        // genera los campos a visualizar
        $(".contenido-verDatos").append("<form id='form_create_factura' method='GET'></form>");
        $("#form_create_factura").append("<div class='contenido-modulo-inferior'></div>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Condiciones de Factura</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-cliente'>Cliente: *</label><label class='result-cliente'>" + requestFactura[0].nombre + " " + requestFactura[0].apellido + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-codigo'>Codigo: *</label><label class='result result-codigo'>" + requestFactura[0].codigo + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-fecha'>Fecha: *</label><label class='result result-cliente'>" + requestFactura[0].fecha + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-estado'>Estado: *</label><label class='result result-estado'>" + requestFactura[0].estado_factura + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-iva'>IVA: *</label><label class='result result-cliente'>" + requestFactura[0].iva + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-precio_hora'>Precio hora: *</label><label class='result result-cliente'>" + requestFactura[0].precio_hora + "</label>");
        $(".contenido-modulo-inferior").append("<div class='viewFormTitle box effect1'><span class='titleViewForm'>Vehiculo</span> </div>");
        $(".contenido-modulo-inferior").append("<div class='viewForm form-group'><label class='label-obligatorio label-result label-cliente'>Vehiculo: *</label><label class='result result-cliente'>" + requestFactura[0].marca + " " + requestFactura[0].modelo + " " + requestFactura[0].matricula + "</label>");

        this.vistaConceptos(requestConceptos, requestFactura, false);

        $(".contenido-modulo-inferior").append("<div class='viewForm form-group div-buttons-modulo'>" +
            "<button type='button' id='btnModificar' class='button tiny radius' onclick='actionVerDetalleFactura(\"" + requestFactura[0].codigo + "\")'>Modificar datos</button>");
        $(".contenido-modulo-inferior").append("<div id='validation' class='viewForm form-group validation-error'></div>");

        autocompleteClientes("0", null, factura.modulo);
        // todo
        constructorDeFiltros.construirFiltro(factura.modulo, factura.filtrosTabla);
    }
}