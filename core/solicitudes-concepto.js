/**
 * Created by lleir on 02/12/2015.
 */

function actionAnadeConcepto(form){

    if(validarCampos("#form_concepto")) {

        var row = getLinesByTable("#table-conceptos") + 1;
        var data = getValuesByForm(form);

        var id = "concept_" + row;
        $(".table-conceptos").append("<tr id='" + id + "' ></tr>");

        $("#" + id).append("<td style='width: 5%;'><input class='concept' id='entity.tipo_" + row + "' name='tipo' type='text' readonly maxlength='10' maxlength='62' value='" + data[0] + "' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46)' ></td>");
        $("#" + id).append("<td style='width: 40%;'><input class='concept' id='entity.concepto_"+ row + "' name='concepto' type='text' readonly maxlength='40' value='" + data[1] + "' ></td>");
        $("#" + id).append("<td style='width: 15%'><input class='concept' id='entity.cantidad_"+ row + "' type='text' name='cantidad' readonly maxlength='5' value='" + data[2] + "' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 )' ></td>");
        $("#" + id).append("<td style='width: 17%'><input class='concept' id='entity.precio_"+ row + "' type='text' name='precio' readonly maxlength='10' value='" + data[3] + "' onkeypress='return (event.charCode >= 48 && event.charCode <= 57) || (event.charCode == 46 )' ></td>");
        //$("#" + id).append("<td style='width: 9%'><input class='concept' id='entity.iva_"+ row + "' type='text' name='iva' readonly maxlength='10' value='" + data[4] + "' ></td>");
        // }

        $("#" + id).append("<td class='td-acciones'><a onclick='actionBorrarConcepto(\"" + row + "\")'><img title='Eliminar concepto' src='./resources/papelera.png'></a>" +
            "<a onclick='actionGuardarConceptos(\"" + row + "\")'><img title='Guardara concepto' src='./resources/download.ico'></a>" +
            "<a onclick='actionEditarConceptos(\"" + row + "\")'><img title='Editar concepto' src='./resources/edit.ico'></a></td>");

        boxtotals();

        $("#form_concepto > .viewFormConceptoLine").find(":input").each(function(){
           $(this).attr("value", "");
        });
    }
}

function boxtotals(){
    $(".box-totales").remove();
    $("#anadeConceptos").append("<table class='box-totales'><tbody><tr><td></td><td></td></td>" +
        "</tr><td>MANO OBRA:</td><td><span>" + sumaManoObra(1) + "</span><input style='display: none' class='inputTotal' readonly id='mano_total' value='" + sumaManoObra(0) + "' /><img src='./resources/euro2.png'/></img></td></div></td></tr>" +
        "<tr><td>RECAMBIOS: </td><td><span>" + sumaRecambios(1) + "</span><input style='display: none' class='inputTotal' readonly id='recambio_total' value='" + sumaRecambios(0) + "' /><img src='./resources/euro2.png' /></img> </td></tr>" +
        "<tr><td>SUMAN: </td><td><span>" + suma(1) + "</span><input style='display: none' class='inputTotal' readonly id='suma_total' value='" + suma(0) + "' /></span><img src='./resources/euro2.png' /></img> </td></tr>" +
        "<tr><td>IVA: </td><td><span>" + setIva(1) + "</span><input style='display: none' class='inputTotal' readonly id='iva_total' value='" + setIva(0) + "' /><img src='./resources/euro2.png' /></img> </td></tr>" +
        "<tr><td>TOTAL: </td><td><span>" + total(1) + "</span><input style='display: none' class='inputTotal' readonly id='total' value='" + total() + "' /><img src='./resources/euro2.png' /></img> </td></tr>" +
        "</tbody></table>");

}

function actionBorrarConcepto(fila){
    $("#concept_" + fila).remove();
    recalcular(fila);
    boxtotals();
}

function recalcular(fila){

    var rows = getLinesByTable("#table-conceptos") + 1;
    var contador = 1;


    $("#table-conceptos tr:not(:first-child)").each(function(){
        $(this).attr("id", "");
        $(this).attr("id", "concept_" + contador);

        var inputs = 0;

        $(this).find(":input").each(function(){
            $(this).attr("id", "");
            if(inputs == 0)
                $(this).attr("id", "entity.tipo_" + contador);
            if(inputs == 1)
                $(this).attr("id", "entity.concepto_" + contador);
            if(inputs == 2)
                $(this).attr("id", "entity.precio_" + contador);
            if(inputs == 3)
                $(this).attr("id", "entity.cantidad_" + contador);

            inputs++;
        });

        var a = 0;

        $(this).find("a").each(function(){
            var onclick = "";
            $(this).attr("onclick", "");
            if(a == 0)
                onclick = "actionBorrarConcepto(\"" + contador + "\")";
            if(a == 1)
                onclick = "actionGuardarConceptos(\"" + contador + "\")";
            if(a == 2)
                onclick = "actionEditarConceptos(\"" + contador + "\")";

            $(this).attr("onclick", onclick);
            a++;
        });

        contador++;

    });

}

function getValuesConcepto(){
    var row = getLinesByTable("#table-conceptos") + 2;
    var conceptos = [];
    var input = [];

    // recorro filas
    for(var a = 1; a < row; a++) {
        $("#table-conceptos tr:nth-child("+ a +") td:not(:last-child) > input").each(function(){
            input.push($(this).val());
        });
        conceptos[a-1] = input;
        input = [];
    }

    return conceptos;

}

function sumaManoObra(setMile){
    var total_mano_obra = 0;
    conceptos = getValuesConcepto();

    // recorro los conceptos
    for(var e = 1; e < conceptos.length; e++) {
        var cantidad = 0;
        var precio = 0;
        var total_concepto = 0;

        // si es '1' es Mano de Obra
        if (conceptos[e][0] == 1) {
            cantidad = parseFloat(conceptos[e][2]).toFixed(2);
            precio = parseFloat(conceptos[e][3]).toFixed(2);
            //console.log("Cantidad: " + cantidad + " + " + precio);
            total_concepto = cantidad * precio;
            //console.log("Total " + total_concepto);
        }
        total_mano_obra = total_mano_obra + total_concepto;
    }
    if(setMile == 1)
        return setMiles(total_mano_obra.toFixed(2));
    else
        return parseFloat(total_mano_obra.toFixed(2));
}

function sumaRecambios(setMile){
    var total_recambios = 0;
    conceptos = getValuesConcepto();

    // recorro los conceptos
    for(var e = 1; e < conceptos.length; e++){
        var cantidad = 0;
        var precio = 0;
        var total_concepto = 0;

        // si es '1' es Mano de Obra
        if(conceptos[e][0] == 2){
            cantidad = parseFloat(conceptos[e][2]).toFixed(2);;
            precio = parseFloat(conceptos[e][3]).toFixed(2);;
            total_concepto = cantidad * precio;
        }
        total_recambios = total_recambios + total_concepto;
    }
    if(setMile == 1)
        return setMiles(total_recambios.toFixed(2));
    else
        return parseFloat(total_recambios.toFixed(2));

}

function suma(setMile) {
    var recambio = parseFloat(sumaRecambios());
    var mano_obra = parseFloat(sumaManoObra());
    var suma = recambio + mano_obra;
    if(setMile == 1)
        return setMiles(suma.toFixed(2));
    else
        return parseFloat(suma.toFixed(2));

}


function setIva(setMile){
    var iva = $("#entity_iva").val();
    var total_iva = suma(0) * (iva/100);
    if(setMile == 1)
        return setMiles(total_iva.toFixed(2));
    else
        return parseFloat(total_iva.toFixed(2));
}

function total(setMile){
    console.log(suma(0));
    console.log(setIva(0));
    var total = (suma(0) + setIva(0));
    console.log(total);
    if(setMile == 1)
        return setMiles(total.toFixed(2));
    else
        return parseFloat(total.toFixed(2));
}

function actionEditarConceptos(id){
    $("#concept_" + id).find(":input").each(function() {
        $(this).removeProp("readonly", null);
    });
}

function actionGuardarConceptos(id){

    $("#concept_" + id).find(":input").each(function() {
        $(this).prop('readonly', true);
    });

    boxtotals();

}