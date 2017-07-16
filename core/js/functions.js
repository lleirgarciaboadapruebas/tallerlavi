/**
 * Created by lleir on 22/08/15.
 */

/** Pasa una cadena String y a partir de un NUMERO pone puntos supensivos...
 *
 * @param str Cadena de texto a ser cortada.
 * @param numAcortar Posicion en la cadena donde pondra 3 puntos.
 */
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();

    $("#IO").datepicker();
});



(function( $ ) {
    $.widget( "custom.combobox", {
        _create: function() {
            this.wrapper = $( "<span>" )
                .addClass( "custom-combobox" )
                .insertAfter( this.element );

            this.element.hide();
            this._createAutocomplete();
            this._createShowAllButton();
        },

        _createAutocomplete: function() {
            var selected = this.element.children( ":selected" ),
                value = selected.val() ? selected.text() : "";

            this.input = $( "<input>" )
                .appendTo( this.wrapper )
                .val( value )
                .attr( "title", "" )
                .addClass( "custom-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
                .autocomplete({
                    delay: 0,
                    minLength: 0,
                    source: $.proxy( this, "_source" )
                })
                .tooltip({
                    tooltipClass: "ui-state-highlight"
                });

            this._on( this.input, {
                autocompleteselect: function( event, ui ) {
                    ui.item.option.selected = true;
                    this._trigger( "select", event, {
                        item: ui.item.option
                    });
                },

                autocompletechange: "_removeIfInvalid"
            });
        },

        _createShowAllButton: function() {
            var input = this.input,
                wasOpen = false;

            $( "<a>" )
                .attr( "tabIndex", -1 )
                .attr( "title", "Show All Items" )
                .tooltip()
                .appendTo( this.wrapper )
                .button({
                    icons: {
                        primary: "ui-icon-triangle-1-s"
                    },
                    text: false
                })
                .removeClass( "ui-corner-all" )
                .addClass( "custom-combobox-toggle ui-corner-right" )
                .mousedown(function() {
                    wasOpen = input.autocomplete( "widget" ).is( ":visible" );
                })
                .click(function() {
                    input.focus();

                    // Close if already visible
                    if ( wasOpen ) {
                        return;
                    }

                    // Pass empty string as value to search for, displaying all results
                    input.autocomplete( "search", "" );
                });
        },

        _source: function( request, response ) {
            var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
            response( this.element.children( "option" ).map(function() {
                var text = $( this ).text();
                if ( this.value && ( !request.term || matcher.test(text) ) )
                    return {
                        label: text,
                        value: text,
                        option: this
                    };
            }) );
        },

        _removeIfInvalid: function( event, ui ) {

            // Selected an item, nothing to do
            if ( ui.item ) {
                return;
            }

            // Search for a match (case-insensitive)
            var value = this.input.val(),
                valueLowerCase = value.toLowerCase(),
                valid = false;
            this.element.children( "option" ).each(function() {
                if ( $( this ).text().toLowerCase() === valueLowerCase ) {
                    this.selected = valid = true;
                    return false;
                }
            });

            // Found a match, nothing to do
            if ( valid ) {
                return;
            }

            // Remove invalid value
            this.input
                .val( "" )
                .attr( "title", value + " didn't match any item" )
                .tooltip( "open" );
            this.element.val( "" );
            this._delay(function() {
                this.input.tooltip( "close" ).attr( "title", "" );
            }, 2500 );
            this.input.autocomplete( "instance" ).term = "";
        },

        _destroy: function() {
            this.wrapper.remove();
            this.element.show();
        }
    });
})( jQuery );

$(function() {
    $( "#combobox" ).combobox();
    $( "#toggle" ).click(function() {
        $( "#combobox" ).toggle();
    });
});

function date(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    today = dd+'-'+mm+'-'+yyyy;
    return today;
}

function acortarString(str, numAcortar){
    var prevStr= str.substr(0, 6);

    var cadena = str.substring(6, str.length);

    prevStr = str + cadena.replace("...");
    return str;
}

function firstToUpperCase( str ) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function capitaliseFirstLetter(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function devolverFiltrosFiltrados(valuesFiltros, dataFiltros){
    var map     = [];
    var value   = [];
    var data    = [];

    for(var cont = 0; cont < valuesFiltros.length; cont++){
        if(valuesFiltros[cont] != "" && cont < valuesFiltros.length - 2){
            value.push(valuesFiltros[cont]);
            data.push(dataFiltros[cont]);
        }
    }

    map.push(value);
    map.push(data);
    return map;
}


function resetClassMenu() {
    console.log("dsfsdaf");
    $("#factura").removeClass().addClass("tab-menu-deseleccionado");
    $("#cliente").removeClass().addClass("tab-menu-deseleccionado");
    $("#coche").removeClass().addClass("tab-menu-deseleccionado");
}

function sizeOf(req){
    var i = 0;
    for(var rq in req){
        i++;
    }
    return i;
}


function getValuesByForm(form){
    //console.log("get values form: " + form);
    var data = [];
    var id = $(form).attr("id");
    //console.log(id);

    // en el caso de la factujra, si no es form concepto he de cojer todo, menos los input de los conceptos vacios.
    if(id != "form_concepto") {
        $(form).find(":input").each(function () {

            var str = $(this).attr("class");
            var id  = $(this).attr("id");
            var n = "IU";
            var e = "concept";

            if (!($(this).prop("tagName") == "BUTTON") && !($(this).attr("class") == "concept") && $(this).attr("type") != "hidden") {
                //console.log(str + " id: " + id + " " + ($(this).attr("type")));
                if(str.indexOf(n) <= 0){

                    if ($(this).val() != null || !$(this).val() == "")
                        data.push($(this).val());
                    else
                        data.push((""));
                }
            }
        });

        $(form).find("option:selected").each(function () {

            var str = $(this).attr("class");
            var id  = $(this).attr("id");
            var n = "IU";
            var e = "concept";

            if (!($(this).prop("tagName") == "BUTTON") && !$(this).attr("class") == "concept" && $(this).attr("type") != "hidden") {
               //console.log(str + " id: " + id + " " + ($(this).attr("type")));
                if(str.indexOf(n) <= 0) {
                    if ($(this).val() != null || !$(this).val() == "")
                        data.push($(this).val());
                    else
                        data.push((""));
                }
            }
        });
    } else {
        $(form).find(":input").each(function () {
            if (!($(this).prop("tagName") == "BUTTON") && !($(this).attr("class") == "concept")) {
                if ($(this).val() != null || !$(this).val() == "")
                    data.push($(this).val());
                else
                    data.push((""));
            }
        });

        $(form).find("option:selected").each(function () {
           // console.log($(this).prop("tagName"));
            if (!($(this).prop("tagName") == "BUTTON") && $(this).prop("tagName") == "SELECT" && !($(this).attr("class") == "concept")) {
                if ($(this).val() != null || !$(this).val() == "")
                    data.push($(this).val());
                else
                    data.push((""));
            }
        });
    }
    return data;

}

function showValidationAlert(msg, correct){
    $(".label-alerta").html(msg);
    //("MENSAGE " +msg);
    //console.log("CORRECTO? " + correct);

    if(!correct){
        $("#alert-level1").removeClass("success");
        $("#alert-level1").addClass("warning");

    } else {
        $("#alert-level1").removeClass("success");
        $("#alert-level1").addClass("warning");

    }

    $("#alert-level1").delay(200).show().animate({top: '1px'});

}

function hideValidationAlert(){
    $("#alert-level1").hide();
}

function validarCampos(formId){
    console.log("-------- oko vlaidar cmapos " + formId);
    $(".validation-error > span").remove();
    $(".IO").removeClass("label-obligatorio-set");
    $(".IU").removeClass("label-obligatorio-set")
    var cont = 0;
    var errors = 0;
    $(formId + " div").find(":input").each(function(){
        cont = cont + 1;
        var str = $(this).attr("class");
        var id = $(this).attr("id");
        var n = "IO";

        if($(formId).attr("id") == "form_concepto")
            n = "IU";

        if (!($(this).prop("tagName") == "BUTTON") && !($(this).attr("class") == "concept") && $(this).attr("type") != "hidden") {
            //console.log("Inputs: " + cont + " CLAS:" +str + " id: " + id + " " + ($(this).attr("type")));
            if (str != "undefined") {
                if (str.indexOf(n) >= 0)
                    if ($(this).val() == "" || $(this).val() == null) {
                        $(this).addClass("label-obligatorio-set");
                        $(this).attr("placeholder", "Has de rellenar este campo.");
                        errors++;
                    } else {
                        $(this).removeClass("label-obligatorio-set");
                    }
            }
        }
    });

    if($(formId).attr("id") != "form_concepto")
        if(errors > 0)   $(".validation-error").show().append("<span>Has de rellenar los campos obligatorios (*)</span>");

    return (errors > 0 ? false : true);
}

function setProps() {
    $("#label-cantidad").text("");
    if($("#tipoConcepto").val() == 1) {
        $("#label-cantidad").text("Horas:");
        $("input[name=entity_precio]").val($("#entity_precio_hora").val());
    } else {
        $("#label-cantidad").text("Cantidad:");
        $("input[name=entity_precio]").val("");
    }
}


function mensajeDeValidacion(bueno, mensaje){

    $("#validation").html("");

    console.log(bueno);
    console.log(mensaje);

    if(bueno == "true"){
        $("#validation").removeClass().hide().addClass("validation-success viewForm form-group").show().append("<span>" + mensaje + "</span>");
    }else {
        $("#validation").removeClass().hide().addClass("validation-error viewForm form-group").show().append("<span>" + mensaje + "</span>");
    }

}

function mensajeDeValidacionListado(bueno, mensaje){
    $("#validation-list").html("");

    console.log(    $("#validation-list"));
    console.log(mensaje);

    if(bueno == "true"){
        $("#validation-list").removeClass().addClass("validation-success viewForm form-group").show().append("<span>" + mensaje + "</span>");
    }else {
        $("#validation-list").removeClass().addClass("validation-error viewForm form-group").show().append("<span>" + mensaje + "</span>");
    }
}


function autocompleteClientes(id, matricula, modulo){

    // TODO pasarID por parametro para seleccionar el Cliente cuando es un UPDATE;
    console.log("complete clientes");
    $.ajax({
        type: "GET",
        url: "core/php/action/ActionCliente.php",
        data: {  function: "DevolverListadoAction"  },
        before:   $("#factura").removeClass().addClass("tab-menu-seleccionado"),

        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            setComboClientes(request, id, modulo);

            // si pasamos la matricula, generamos vehiculos del cliente y seleccionaremos el coche (UPDATE FACTURA)
            if(matricula != null) {
                autocompleteVehiculos(id);
                setVehiculoCombo(matricula);
            }

        }
    });
}

function autocompleteVehiculos(id){
    $.ajax({
        type: "GET",
        url: "core/php/action/ActionVehiculo.php",
        data: {  function: "VerVehiculoActionCliente",
                 id: id
        },
        before:   $("#factura").removeClass().addClass("tab-menu-seleccionado"),

        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            setComboVehiculos(request, id);
        }
    });
}

function setVehiculoCombo(matricula){
    console.log("combo vehiculo UPDATE");
    $.ajax({
        type: "GET",
        url: "core/php/action/ActionVehiculo.php",
        data: {  function: "VerVehiculoActionClienteMatricula",
            id: matricula
        },
        before:   $("#factura").removeClass().addClass("tab-menu-seleccionado"),

        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){

            $("#combobox2").val(request[0].id);
        }
    });
}

function setComboClientes(request, id, modulo) {
    var app = "";

    if(modulo == "vehiculo")
        app = "<select id='combobox1' class='IO'>";
    else
        app = "<select id='combobox1' class='IO' onchange='chekVehiculos()' >";

    $('#autocomplete-cliente').append(app);
    $('#combobox1').append("<option value=''>Selecciona el Cliente... </option>");

    for(var line = 0; line <request.length; line++) {
          $('#combobox1').append("<option value='" + request[line].id + "'>" + request[line].nombre + " " + request[line].apellido + "</option>");
    }

    $("#combobox1").val(id);

}

function setComboVehiculos(request, id){
    //$('#autocomplete-vehiculo').append("<select id='combobox2'>");
    $('#combobox2').html("");
    $('#combobox2').show();

    if(!request) {
        $('#combobox2').append("<option value=''>No se encontraron vehiculos. </option>");
    } else {
        $('#combobox2').append("<option value=''>Selecciona el Vehiculo... </option>");
        for (var line = 0; line < request.length; line++) {
            $('#combobox2').append("<option value='" + request[line].id + "'>" + request[line].marca + " " + request[line].modelo + " (" + request[line].matricula + ")</option>");
        }
    }

    $("#combobox2").val(id);
}


function chekVehiculos(){
    console.log($('#combobox1').val());
    if($('#combobox1').val() != "")
        autocompleteVehiculos($('#combobox1').val());
    else
        autocompleteVehiculos("0");

}


function getLinesByTable(tableId){
    return $(tableId + " tr:not(:first-child)").length;
}

function setMaxLenght(selector, max){
    $(selector).maxLength(max);
}


var formatNumber = {

    separador: ".", // separador para los miles
    sepDecimal: ',', // separador para los decimales
    formatear:function (num){

        num +='';
        var splitStr = num.split('.');
        var splitLeft = splitStr[0];
        var splitRight = splitStr.length; 1 ? this.sepDecimal + splitStr[1] : '';

        var regx = /(\d+)(\d{3})/;

        while (regx.test(splitLeft)) {
            splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
        }

        return this.simbol + splitLeft;
    },
    new:function(num, simbol){
        this.simbol = simbol ||'';
        return this.formatear(num.replace(".", ","));
    }
}


function setMiles(number){
    console.log("original: " + number);
    var len = number.length;
    console.log(len);
    var com = number.indexOf(".");
    console.log(com);

    var one = "";
    var two = "";
    var tot = number;

    console.log("longi:" + len);
    console.log("comas:" + com);

    // hay decimales....
    if(com != -1) {
        if (com == 4) {
            one = tot.substring(0, 1);
            two = tot.substring(1, number.length);
            number = one + "." + two;
            console.log("es mil: " + one + "." + two);
        } else if (com == 5) {
            one = tot.substring(0, 2);
            two = tot.substring(2, number.length);
            number = one + "." + two;
            console.log("diezmil: " + one + "." + two);
        }
    }


    return number;
}




