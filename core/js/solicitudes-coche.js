function actionVerListadoVehiculos() {
    resetClassMenu();

    $.ajax({
        type: "GET",
        url: "core/php/action/ActionVehiculo.php",
        data: {  function: "DevolverListadoAction"  },
        before:      $("#coche").removeClass().addClass("tab-menu-seleccionado"),
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            vehiculo.listado(request);
        }
    });
}


function actionViewCrearVehiculo(){

    vehiculo.create();
}

function actionCrearVehiculo(form){
    resetClassMenu();
    var data = getValuesByForm(form);
    if(validarCampos("#form_create_vehiculo")){
        $.ajax({
            type: "GET",
            before:  $("#coche").removeClass().addClass("tab-menu-seleccionado"),
            url: "core/php/action/ActionVehiculo.php",
            data: {
                function: "CrearVehiculoAction",
                data: data
            },
            dataType: "json",
            async: true,
            error: function(xhr, status, error){
                alert(error + "   " + status);
            },
            success: function(request){
                mensajeDeValidacion(request.result, request.validacion);

                if(request.result == "true") {
                    vehiculo.create();
                    resetClassMenu();
                    before:  $("#coche").removeClass().addClass("tab-menu-seleccionado");
                }
            }
        });
    }
}

function actionVerVehiculosCliente(nombre){
    resetClassMenu();
    $.ajax({
        type: "GET",
        before:  $("#coche").removeClass().addClass("tab-menu-seleccionado"),
        url: "core/php/action/ActionVehiculo.php",
        data: {
            nombre: nombre,
            function: "VerVehiculoCliente"
        },
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            vehiculo.listado(request);
            filtro.filtroActualTabla("", nombre, "Nombre o Apellidos")
        }
    });
}

function actionVerVehiculo(id){
    resetClassMenu();
    $.ajax({
        type: "GET",
        url: "core/php/action/ActionVehiculo.php",
        before:  $("#coche").removeClass().addClass("tab-menu-seleccionado"),
        data: {
            id: id,
            function: "VerVehiculoAction"
        },
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            console.log(request);
            vehiculo.view(request);
        }
    });
}

function actionVerDetalleVehiculo(id){
    resetClassMenu();
    $.ajax({
        type: "GET",
        url: "core/php/action/ActionVehiculo.php",
        before:  $("#coche").removeClass().addClass("tab-menu-seleccionado"),
        data: {
            id: id,
            function: "VerVehiculoAction"
        },
        dataType: "json",
        async: true,
        error: function(xhr, status, error){
            alert(error + "   " + status);
        },
        success: function(request){
            construirVista(request, "detalle", "vehiculo");
        }
    });
}


function actionUpdateVehiculo(id, matricula, form){
    var data = getValuesByForm(form);

    if(validarCampos("#form_update_vehiculo")){
        $.ajax({
            type: "GET",
            before:  $("#coche").removeClass().addClass("tab-menu-seleccionado"),
            url: "core/php/action/ActionVehiculo.php",
            data: {
                id: id,
                matricula: matricula,
                function: "UpdateVehiculoAction",
                data: data
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

function actionBorrarVehiculo(matricula){
    if(confirm("Estas seguro de que quieres eliminar este Vehiculo con Matricula? '" + matricula + "'")) {
        $.ajax({
            type: "GET",
            url: "core/php/action/ActionVehiculo.php",
            data: {
                matricula: matricula,
                function: "BorrarVehiculoAction"
            },
            dataType: "json",
            async: true,
            error: function (xhr, status, error) {
                alert(error + "   " + status);
            },
            success: function (request) {
                console.log(request.result);
                if (request.result == "false") {
                    alert(request.validacion);
                } else {
                    alert(request.validacion);
                    actionVerListadoVehiculos();
                }
            }
        });
    }
}