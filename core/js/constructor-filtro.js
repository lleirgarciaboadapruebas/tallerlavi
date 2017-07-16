/**
 * Created by lleir on 14/09/15.
 */

var constructorDeFiltros = {

    construirFiltro: function(modulo, camposFiltros){
        $(".contenido-interior").append("<div class='div-filtros-laterales'></div>");
        $(".div-filtros-laterales").append("<label class='label-title-filtros'>Filtros de " + capitaliseFirstLetter(modulo) + "</label>");
        this.rellenarImputs(camposFiltros);
    },

    rellenarImputs: function(camposFiltros){

        var moduloFiltro = null;

        if(camposFiltros[0] == "codigo")
            moduloFiltro = "factura";
        else if(camposFiltros[0] == "nombre")
            moduloFiltro = "cliente";
        else if(camposFiltros[0] == "modelo")
            moduloFiltro = "vehiculo";

        $(".div-filtros-laterales").append("<form id='form_filtro' method='GET'></form>");
        $("#form_filtro").append("<div class='div-inputs-filtros'></div>");

        for(var a = 0; a < camposFiltros.length; a++){
            if(a < camposFiltros.length - 1){
                $(".div-inputs-filtros").append("" +
                    "<input type='text' class='input-filtro' id='"
                    + camposFiltros[a] + "' name='entity."
                    + camposFiltros[a] + "' placeholder='Buscar por "
                    + firstToUpperCase(camposFiltros[a]) + "'>");

            } else if(a == camposFiltros.length - 1)
                $(".div-inputs-filtros").append("<input type='hidden' value='" + camposFiltros[a] + "' class='input-filtro' id='filtro_" + firstToUpperCase(camposFiltros[a]) + "'>");

        }
        $(".div-inputs-filtros").append("<button type='button' id='button' class='btn btn-default form-control input-filtro' onclick='actionFiltrar(form_filtro, " + moduloFiltro + ")' >Filtrar</button>");
        $(".div-inputs-filtros").append("<span id='validation-msg'></span>");
    },

    ponerFiltroActual: function(valores, camposFiltrados){

        $(".div-inputs-filtros").append("<div class='div-resultado-filtros'> </div>");
        $(".div-resultado-filtros").append("<span onclick='actionDeshacerFiltro();'><a>Deshacer filtro</a></span><br>");

        var filtros = "<label class='label-campos-filtrados'> ";
        console.log(camposFiltrados);

        for(var cont = 0; cont < valores.length; cont++){
            filtros = filtros + "<span class='span-filtro'>" + capitaliseFirstLetter(camposFiltrados[cont]) + "</span> \"" + valores[cont] + "\", ";
        }

        $(".div-resultado-filtros").append(filtros);
    }
}