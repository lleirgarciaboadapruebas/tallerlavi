/**
 * Created by lleir on 22/08/15.
 */



function actionVerListadoFacturas() {
    resetClassMenu();

    $.ajax({
        type: "GET",
        url: "core/php/action/ActionFactura.php",
        data: {  function: "DevolverListadoAction"  },
        before:      $("#factura").addClass("tab-menu-seleccionado"),
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            factura.listado(request);
        }
    });
}


function actionViewCrearFactura(){

    $.ajax({
        type: "GET",
        url: "core/php/action/ActionFactura.php",
        data: {
            function: "DevuelveUltimoCodigo"
        },
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request) {
            var len = request.toString().length;

            var codigoactual = request.toString();
            var longcodigoact = codigoactual.length;
            console.log(codigoactual + " long " + longcodigoact);


            var codigonewint = parseFloat(request) + 1;
            var codigonuevo  = codigonewint.toString();
            var longcodigoint= codigonuevo.length;
            console.log(codigonuevo + " long " + longcodigoint);
            var strint = "";
            if(longcodigoint == 1)
                strint = "00" + codigonuevo;
            else if(longcodigoint == 2)
                strint = "0" + codigonuevo;
            else if(longcodigoint == 3)
                strint = codigonuevo;

            console.log(strint);
            factura.create(strint);

        }
    });



}

function actionCrearFactura(form){
    resetClassMenu();
    var data = getValuesByForm(form);
    var concepts = getValuesConcepto();

    // el array de conceptos empieza por 1 de length, tiene un array fantasma.
    if(concepts.length == 1) concepts = null;

    if(validarCampos("#form_create_factura")){
        $.ajax({
            type: "GET",
            url: "core/php/action/ActionFactura.php",
            before:      $("#factura").addClass("tab-menu-seleccionado"),
            data: {
                function: "CrearFacturaAction",
                datos: data,
                conceptos: concepts
            },
            dataType: "json",
            async: true,
            error: function(xhr, status, error){
                alert(error + "   " + status);
            },
            success: function(request){
                mensajeDeValidacion(request.result, request.validacion);
                if(request.result == "true")
                    actionViewCrearFactura();
                else
                     $("#factura").addClass("tab-menu-seleccionado");


            }
        });
    }
}


function actionVerDetalleFactura(id){

    $.ajax({
        type: "GET",
        url: "core/php/action/ActionFactura.php",
        data: {
            codigo: id,
            function: "VerFacturaAction"
        },
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            factura.edit(request.datos, request.conceptos);
        }
    });
}



function actionVerFactura(codigo){

    $.ajax({
        type: "GET",
        url: "core/php/action/ActionFactura.php",
        data: {
            codigo: codigo,
            function: "VerFacturaAction"
        },
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            factura.view(request.datos, request.conceptos);
        }
    });
}

function actionUpdateFactura(id, codigo, form){
    var data = getValuesByForm(form);
    var concepts = getValuesConcepto();

    if(concepts.length == 1) concepts = null;

    if(validarCampos("#form_update_factura")){
        $.ajax({
            type: "GET",
            url: "core/php/action/ActionFactura.php",
            data: {
                id: id,
                codigo: codigo,
                function: "UpdateFacturaAction",
                datos: data,
                conceptos: concepts
            },
            dataType: "json",
            async: true,
            error: function(xhr, status, error){
                alert(error + "   " + status);
            },
            success: function(request){
                mensajeDeValidacion(request.result, request.validacion);
                if(request.result == "true") {
                    $("#button-guardar").attr("onclick", "actionUpdateFactura('" + request.id_factura + "', '" + request.codigo + "', form_update_factura)");
                    $("#button-detalle").attr("onclick", "actionVerFactura(\"" + request.codigo + "\")");
                }

            }
        });
    }
}

function actionBorrarFactura(codigo){
    if(confirm("Estas seguro de que quieres eliminar estea Factura con Codigo? '" + codigo + "'")) {
        $.ajax({
            type: "GET",
            url: "core/php/action/ActionFactura.php",
            data: {
                codigo: codigo,
                function: "BorrarFacturaAction"
            },
            dataType: "json",
            async: true,
            error: function (xhr, status, error) {
                alert(error + "   " + status);
            },
            success: function (request) {
                if (request.result == "false") {
                    //mensajeDeValidacionListado(request.result, request.validacion, "mal");
                    alert("Esta Factura no puede ser borrada. Hubo un error.");
                } else {
                    actionVerListadoFacturas();
                }
            }
        });
    }
}

function exportarPdf(codigo){

    $.ajax({
        type: "GET",
        url: "core/php/action/ActionFactura.php",
        data: {
            codigo: codigo,
            function: "ExportarPfd",
        },
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            alert("PDF Exportado.");
        }
    });

}
