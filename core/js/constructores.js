/**
 * Created by lleir on 19/08/15.
 */
var cliente = {
    modulo: "cliente",
    columnasTabla:  ["Nombre", "Apellido", "Direccion", "Telefono", "Ultima visita", "Acciones"],
    selectLista: ["id", "nombre", "apellido", "direccion", "telefono", "ultima_visita"],
    filtrosTabla:   ["nombre", "apellido", "telefono", "nif", "filtro-cliente"],
    listado: function(request) {        constructorDeVistas.listado(request, "list", this.modulo, this.columnasTabla, this.filtrosTabla);},
    view: function(request) {           constructorDeVistas.vista(request, "view", this.modulo);},
    create: function()       {           constructorDeVistas.vista(null, "create", this.modulo);},
    edit: function(request) {           constructorDeVistas.vista(request, "edit", this.modulo);}
}

var factura = {
    modulo: "factura",
    columnasTabla:  ["Codigo",  "Estado", "", "Fecha", "", "Cliente", "", "Total", "", "Acciones"],
    selectLista: ["id", "codigo", "fecha", "id_cliente", "nombre", "apellido", "estado", "telefono",  "total"],
    filtrosTabla:   ["codigo", "nombre",  "matricula", "estado", "filtro-factura"],
    listado: function(request) {        constructorDeVistas.listado(request, "list", this.modulo, this.columnasTabla, this.filtrosTabla);},
    view: function(requestData, requestConceptos) {           constructorDeVistas.vistaVerFactura(requestData, requestConceptos, "view", this.modulo);},
    create: function(codigo)       {           constructorDeVistas.vistaCrearFactura(null,codigo); },
    edit: function(requestData, requestConceptos) {           constructorDeVistas.vistaEditarFactura(requestData, requestConceptos, "edit", this.modulo);}
}

var vehiculo = {
    modulo: "vehiculo",
    columnasTabla:  ["Modelo", "Marca", "Matricula", "", "", "Cliente", "Ultima revision", "Acciones"],
    selectLista: ["v.id", "v.modelo", "v.marca", "v.matricula", "v.id_cliente", "v.ultima_revision"],
    filtrosTabla:   ["modelo", "marca", "matricula", "nombre o Apellido", "filtro-vehiculo"],
    listado: function(request) {        constructorDeVistas.listado(request, "list", this.modulo, this.columnasTabla, this.filtrosTabla);},
    view: function(request) {           constructorDeVistas.vista(request, "view", this.modulo);},
    create: function()       {           constructorDeVistas.vista(null, "create", this.modulo);},
    edit: function(request) {           constructorDeVistas.vista(request, "edit", this.modulo);}
}

var filtro = {
    filtroActualTabla: function(valores, camposFiltrados) {constructorDeFiltros.ponerFiltroActual(valores, camposFiltrados  ); }
}

    /** Recive unos DATOS y construye una tabla. Por parametros pasamos el tipo de tabla para crearla dependiendo si es CLiente, Factura o Coche. **/
    function construirTabla(request, queTabla){
        switch (queTabla){
            case "clientes" :      constructorDeTablas.construirListado(request); break;
            case "facturas" :     break;
            //todo
        }
    }


    function construirVista(request, queVista, queModulo){

        switch (queVista) {
            case "ver" :
                constructorDeVistas.vistaVerCliente(request);
                break;
            case "detalle" :
                if (queModulo == "factura") {
                    constructorDeVistas.vistaVerFactura(request);
                } else if(queModulo == "cliente") {
                    constructorDeVistas.vistaEditarCliente(request);
                } else if(queModulo == "vehiculo"){
                    constructorDeVistas.vistaEditarVehiculo(request);
                }
                break;


            case "list":
                if(queModulo == "cliente")
                    constructorDeVistas.vistaListadoClientes(request);
                else if (queModulo == "factura")
                    constructorDeVistas.vistaListadoFacturas(request);
                else if (queModulo == "vehiculo")
                    constructorDeVistas.vistaListadoCoches(request);

                break;
        }
    }

