/**
 * Created by lleir on 14/09/15.
 */

var constructorDeTablas = {

    // todo con este metodo me sobra para cojer la tabla que quiero
    construirTabla: function(request, queTabla, vColumnas) {

        // construyo la tabla
        $(".contenido-interior").append("<div class='contenido-tabla'></div>");
        $(".contenido-tabla").append("<table class='table table-listado table-condensed'></table>");

        // setea FILA CABEZERA
        this.setCabeceraTabla(vColumnas);

        // setea DATA REQUEST en la TABLA
        this.construirFilasByTabla(request, queTabla, 0);

        // construyo PAGINACION de TABLAS.
        this.construirPaginacion(request, queTabla);
    },

    // construye la cabecera de la TABLA de un Listado. Y coloca el array de columnas en cada TD.
    setCabeceraTabla : function(vColumnas){
        // construyo encabezado
        $(".table-listado").append("<tr class='tr_first'></tr>");

        for(var a = 0; a < vColumnas.length; a++){
            $(".tr_first").append("<td class='td-cabezera'>" + vColumnas[a] + "</td> ");
        }
    },

    // construye filas por tipo de tabla
    construirFilasByTabla: function(request, queTabla, filasActuales) {

        if(typeof request != "string")
        {
            switch (queTabla) {
                case "cliente" :
                    // construyo TABLA x DATOS Clientes.
                    for (var i = filasActuales; i < request.length; i++) {
                        var max = i + 15;
                        if (i < max) {

                                var tr = "#tr_" + i;
                                $(".table-listado").append("<tr class='tr_result' id='tr_" + i + "'></tr>");
                                $(tr).append("<td>" + request[i].nombre + "</td> ");
                                $(tr).append("<td>" + request[i].apellido + "</td> ");
                                $(tr).append("<td>" + request[i].direccion + "</td> ");
                                $(tr).append("<td>" + request[i].telefono + "</td> ");
                                $(tr).append("<td>" + request[i].ultima_visita + "</td> ");
                                $(tr).append("<td class='td-acciones'><a onclick='actionBorrarCliente(" + request[i].id + ")'><img src='./resources/papelera.png'></a>" +
                                    "<a onclick='actionVerCliente(" + request[i].id + ")'><img src='./resources/edit.ico'></a></td>");

                        }
                    }

                    break;

                case "factura" :

                    // construyo TABLA x DATOS Clientes.
                    for (var o = filasActuales; o < request.length; o++) {
                        var max = o + 15;
                        if (o < max) {
                            var tr1 = "#tr_" + o;
                            $(".table-listado").append("<tr class='tr_result' id='tr_" + o + "'></tr>");
                            $(tr1).append("<td>" + request[o].codigo + "</td> ");
                            $(tr1).append("<td>" + request[o].estado_factura + "</td> ");
                            $(tr1).append("<td>&nbsp;</td>");
                            $(tr1).append("<td style='width: 20%'>" + request[o].fecha + "</td> ");
                            $(tr1).append("<td>&nbsp;</td>");
                            $(tr1).append("<td>" + request[o].nombre + " " + request[o].apellido + "</td> ");
                            $(tr1).append("<td>&nbsp;</td>");
                            $(tr1).append("<td>" + formatNumber.new(request[o].total) + " </td> ");
                            $(tr1).append("<td>&nbsp;</td>");
                            $(tr1).append("<td style='width: 17%;' class='td-acciones'><a onclick='actionBorrarFactura(\"" + request[o].codigo + "\")'><img src='./resources/papelera.png'></a>" +
                                "<a onclick='exportarPdf(\"" + request[o].codigo + "\")'><img src='./resources/pdf.png'></a>" +
                                "<a onclick='actionVerFactura(\"" + request[o].codigo + "\")'><img src='./resources/edit.ico'></a></td>");

                        }
                    }

                    break;    //todo


                case "vehiculo":

                    // construyo TABLA x DATOS Clientes.
                    for (var o = filasActuales; o < request.length; o++) {
                        var max = o + 15;
                        if (o < max) {
                            var tr1 = "#tr_" + o;
                            $(".table-listado").append("<tr class='tr_result' id='tr_" + o + "'></tr>");
                            $(tr1).append("<td>" + request[o].modelo + "</td> ");
                            $(tr1).append("<td>" + request[o].marca + "</td> ");
                            $(tr1).append("<td>" + request[o].matricula + "</td> ");
                            $(tr1).append("<td>&nbsp;</td> ");
                            $(tr1).append("<td>&nbsp;</td> ");
                            $(tr1).append("<td>" + request[o].nombre + " " + request[o].apellido + "</td> ");
                            $(tr1).append("<td>" + request[o].ultima_revision + "</td> ");
                            //$(tr1).append("<td>&nbsp;</td>");
                            $(tr1).append("<td class='td-acciones'><a onclick='actionBorrarVehiculo(\"" + request[o].matricula + "\")'><img src='./resources/papelera.png'></a>" +
                                "<a onclick='actionVerVehiculo(" + request[o].id + ")'><img src='./resources/edit.ico'></a></td>");
                        }
                    }


                    break;
            }
        } else {
            $(".table-listado").append("<tr class='tr_result' id='tr_1'><td>No hay datos.</td><td></td><td></td><td></td><td></td></tr>");
        }
    },
    construirPaginacion: function(request, queTabla) {
        // construyo la paginacion de la TABLA, extraer y hacer generico para todas.
        // $(".contenido-tabla").append("<table class='table paginacion'></table>");

        var size = (sizeOf(request[0]));
        console.log(request[0]);

        $(".table-listado").append("<tr class='trresult'></tr>");
        $(".trresult").append("<td class='td-elements' >Elementos: " + request.length + "</td>");
        $(".trresult").append("<td class='td-pag-actual'>Pagina actual: " + $(".table-listado > tbody > tr.trresult").length + "</td>");
        $(".trresult").append("<td >Pagina 1 de 4 </td>");
        for(var c = 4; c < size-1; c++){
            $(".trresult").append("<td class='nobody'></td>");
        }

        // TODO hacer que al construir siguiente paginacion, pase que tabla es + la cantidad de elementos "+" que va a mostrar

        if(request.length > 25) {
            $(".trresult").append("<td class='prev' onclick='actionPaginaAnteriorListado(request)'><img src='./resources/prev.png'></td>");
            $(".trresult").append("<td class='next' onclick='actionPaginaSiguienteListado(request)'><img src='./resources/next.png'></td>");
        }else {
            $(".trresult").append("<td class='prev' onclick='actionPaginaAnteriorListado(request)'></td>");
            $(".trresult").append("<td class='next' onclick='actionPaginaSiguienteListado(request)'></td>");
        }

    }
}