/**
 * Created by lleir on 31/07/15.
 */

$(document).ready(function(){
    $("#alert-level1").hide();
});


function preventDefault(e){
    e.preventDefault();
}

// todo submit para el formulario 'login'
function actionLogin(){

        $.ajax({
            type: $('#login').attr("method"),
            url: "core/php/action/ActionLogin.php",
            data: {
                    password:$('#password').val(),
                    user: $('#usuario').val(),
                    function: "LoginAction"
            },
            dataType: "text",
            async: true,
            error: function(xhr, status, error){
                //alert("error: '" + error + "' status: '" + status + "' xhr: " + xhr);


                //si hay un error mostramos un mensaje (error en ajax)
            },
            success: function(request){
                console.log(request);
                alert("succes");
                if(request == "ok"){
                    alert("recibido");
                } else {
                    alert("error sql");
                }

                // todo despues de logearse se genera el div cabecera mediante appends y polladas de jquery
                //hacemos algo cuando finalice todo correctamente
            }
        });
}



// todo Coje la accion con ID, MODULO y VISTA y lanza el Action concreto.
function action(id, tabla, tipoVista) {
    console.log(tabla.modulo);
    console.log(tipoVista);
    console.log("action");

    switch (tabla.modulo){
        case "cliente" :
            console.log("cliente");
            if(tipoVista == 1) actionVerCliente(id);
            if(tipoVista == 2) actionVerDetalleCliente(id);
            if(tipoVista == 3) actionVerListadoClientes();
            if(tipoVista == 4) actionViewCrearCliente();
            break;

        case "factura" :
            if(tipoVista == 1) actionVerFactura(id);
            if(tipoVista == 2) actionVerDetalleFactura(id);
            if(tipoVista == 3) actionVerListadoFacturas();
            if(tipoVista == 4) actionViewCrearFactura();
            break;

        case "vehiculo" :
            if(tipoVista == 1) actionVerCoche(id);
            if(tipoVista == 2) actionEditCoche(id);
            if(tipoVista == 3) actionVerListadoCoches();
            if(tipoVista == 4) actionViewCrearVehiculo();
            break;
    }


    // todo hacer metodos genericos: NO SE PUEDE NO ME COJE BIEN EL AJAX
    // view, borrar, update
    // gracias a la 'tabla' buscamos el Action requerido y construimos vista requerida, funcion predefinida "Ver + tabla + Action".
}


function actionFiltrar(form, modulo){
    console.log(modulo);
    // creo array dinamico y por cada input filtro secojo value
    var values = [];
    var ids    = [];

    var data = getValuesByForm(form);
    console.log(data);

    $(form).find(":input").each(function() {
        values.push($(this).val());
        ids.push($(this).attr("id"));
    });

   // console.log(values);
    var dataFiltro = devolverFiltrosFiltrados(values, ids);
    var exit = false;
    var cont = 0;

    for(var i = 0; i < data.length; i++){
        if(data[i] != ""){
            cont = cont+1;
        }
    }

    if(cont == 0)
        exit = !exit;

    if(!exit) {
        if (modulo.modulo == "cliente") {

            $.ajax({
                type: $('#form_filtro').attr("method"),
                url: "core/php/action/ActionCliente.php",
                data: {
                    function: "SelectFiltroAction",
                    values: values
                },
                dataType: "json",
                async: true,
                error: function (xhr, status, error) {
                    //alert("error: '" + error + "' status: '" + status + "' xhr: " + xhr);


                    //si hay un error mostramos un mensaje (error en ajax)
                },
                success: function (request) {
                    if (request != "Error: Cliente no encontrado."){
                        cliente.listado(request);
                        filtro.filtroActualTabla(dataFiltro[0], dataFiltro[1]);
                    } else {
                        $("#validation-msg").html("<i>No se encontro el Cliente.</i>");
                    }
                }
            });


        } else if (modulo.modulo == "factura") {
            $.ajax({
                type: $('#form_filtro').attr("method"),
                url: "core/php/action/ActionFactura.php",
                data: {
                    function: "SelectFiltroAction",
                    values: values
                },
                dataType: "json",
                async: true,
                error: function (xhr, status, error) {
                    //alert("error: '" + error + "' status: '" + status + "' xhr: " + xhr);


                    //si hay un error mostramos un mensaje (error en ajax)
                },
                success: function (request) {
                    if (request != "Error: Factura no encontrado."){
                        factura.listado(request);
                        filtro.filtroActualTabla(dataFiltro[0], dataFiltro[1]);
                    } else {
                        $("#validation-msg").html("<i>No se encontro la Factura.</i>");
                    }

                }
            });
        } else if (modulo.modulo == "vehiculo") {
            $.ajax({
                type: $('#form_filtro').attr("method"),
                url: "core/php/action/ActionVehiculo.php",
                data: {
                    function: "SelectFiltroAction",
                    values: values
                },
                dataType: "json",
                async: true,
                error: function (xhr, status, error) {
                    //alert("error: '" + error + "' status: '" + status + "' xhr: " + xhr);


                    //si hay un error mostramos un mensaje (error en ajax)
                },
                success: function (request) {
                    if (request != "Error: Cliente no encontrado."){
                        vehiculo.listado(request);
                        filtro.filtroActualTabla(dataFiltro[0], dataFiltro[1]);
                    } else {
                        $("#validation-msg").html("<i>No se encontro el Vehiculo.</i>");
                    }
                }
            });

        }
    }

}

function actionDeshacerFiltro(modulo){
    if(modulo == "cliente")  actionVerListadoClientes();
    if(modulo == "vehiculo")  actionVerListadoVehiculos();
    if(modulo == "factura")  actionVerListadoFacturas();
}

function actionPaginaAnteriorListado(){

}

function actionPaginaSiguienteListado(){

}



