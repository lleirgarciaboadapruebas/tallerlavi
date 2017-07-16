/**
 * Created by lleir on 19/08/15.
 */


function actionVerListadoClientes() {
    resetClassMenu();

    $.ajax({
        type: "GET",
        url: "core/php/action/ActionCliente.php",
        data: {  function: "DevolverListadoAction"  },
        before:   $("#cliente").removeClass().addClass("tab-menu-seleccionado"),

        dataType: "json",
        async: true,
        error: function(xhr, status, error){
          alert(error + "   " + status);
        },
        success: function(request){

            cliente.listado(request);
        }
    });
}

function actionViewCrearCliente(){
        cliente.create();

}

function actionCreateCliente(form){
    resetClassMenu();

    if(validarCampos("#form_create_cliente")){
           $.ajax({
                type: "GET",
            url: "core/php/action/ActionCliente.php",
            before:  $("#cliente").removeClass().addClass("tab-menu-seleccionado"),
            data: {
                 function: "CrearClienteAction",
                 values: getValuesByForm(form)
            },
            dataType: "json",
            async: true,
            error: function(xhr, status, error){
                alert(error + "   " + status);
            },
            success: function(request){
                mensajeDeValidacion(request.result, request.validacion);

                if(request.result == "true") {
                    cliente.create();
                }
            }
        });
    }
}


function actionVerCliente(id){
    resetClassMenu();
    $.ajax({
        type: "GET",
        url: "core/php/action/ActionCliente.php",
        before:  $("#cliente").removeClass().addClass("tab-menu-seleccionado"),
        data: {
            id: id,
            function: "VerClienteAction"
        },
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            cliente.view(request);
            //construirVista(request, "ver", "cliente");
        }
    });
}

function actionVerDetalleCliente(id){

    $.ajax({
        type: "GET",
        url: "core/php/action/ActionCliente.php",
        data: {
            id: id,
            function: "VerClienteAction"
        },
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            construirVista(request, "detalle", "cliente");
        }
    });
}

function actionUpdateCliente(id, nif, form){
    var data = getValuesByForm(form);
    if(validarCampos("#form_update_cliente")){
        $.ajax({
            type: "GET",
            url: "core/php/action/ActionCliente.php",
            data: {
                id: id,
                nif: nif,
                function: "UpdateClienteAction",
                values: data
            },
            dataType: "json",
            async: true,
            error: function(xhr, status, error){
                alert(error + "   " + status);
            },
            success: function(request){
                mensajeDeValidacion(request.result, request.validacion);
            }

        });
    }
}


function actionBorrarCliente(id){
    if(confirm("Si se elimina el Cliente, todas las Facutras y Vehiculos en el Sistema se eliminaran. Solo permaneceran en el directorio Facturas en (C:). Estas seguro que quieres eliminar?")) {
        $.ajax({
            type: "GET",
            url: "core/php/action/ActionCliente.php",
            before: $("#cliente").addClass("tab-menu-seleccionado"),
            data: {
                id: id,
                function: "BorrarClienteAction"
            },
            dataType: "json",
            async: true,
            error: function (xhr, status, error) {
                alert(error + "   " + status);
            },
            success: function (request) {

                if (request.result == "false") {
                    //mensajeDeValidacionListado(request.result, request.validacion, "mal");
                    alert(request.validacion);
                } else {
                    actionVerListadoClientes();
                }
            }
        });
    }
}

function actionPaginaSiguienteListado(request){


}