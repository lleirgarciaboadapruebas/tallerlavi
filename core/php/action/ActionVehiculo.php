<?php

/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 01/12/2015
 * Time: 19:47
 */


    header('Content-Type', 'application/json');
    require_once "../dao/ControlVehiculo.php";

    // ambito GLOBAL
    $res = "";


    if(!empty($_GET['function'])){
        switch($_GET['function']){
            case "DevolverListadoAction":      devolverListado();            break;
            case "VerVehiculoActionCliente":    devolverVehiculosByCliente($_GET['id']); break;
            case "VerVehiculoActionClienteMatricula": devolverVehiculosByMatricula($_GET['id']); break;
            case "VerVehiculoAction":           devolverVehiculoo($_GET['id']); break;
            case "VerVehiculoCliente":          devolverVehiculoByNombre($_GET['nombre']);
            case "UpdateVehiculoAction":        updateVehiculo($_GET['id'], $_GET['data']); break;
            case "CrearVehiculoAction":         createVehiculo($_GET['data']); break;
            case "BorrarVehiculoAction":        borrarVehiculo($_GET['matricula']); break;
            case "SelectFiltroAction":         devuelveFiltro($_GET['values']); break;
        }
    }

    // devuelve DATOS de listado de clientes
    function devolverListado() {
        $control = new ControlVehiculo();
        $GLOBALS['res'] = $control->devuelveListadoVehiculos();
    }


    function devolverVehiculo(){
        $control = new ControlVehiculo();
        $GLOBALS['res'] = $control->devuelveDatosVehiculo($_GET['id']);
    }

    function devuelveFiltro($values){
        $control = new ControlVehiculo();
        $GLOBALS['res'] = $control->devuelveDatosFiltro($values);
    }


    function devolverVehiculoo($id){
        $control = new ControlVehiculo();
        $GLOBALS['res'] = $control->devuelveDatosVehiculo($id);
    }

    function devolverVehiculoByNombre($nombre){
        // TODO
    }

    function devolverVehiculosByCliente($id){
        $control = new ControlVehiculo();
        $GLOBALS['res'] = $control->devolverVehiculosByCliente($id);
    }

    function devolverVehiculosByMatricula($matricula){
        $control = new ControlVehiculo();
        $GLOBALS['res'] = $control->devolverVehiculoByMatricula($matricula);
    }

    function borrarVehiculo($matricula){
        $control = new ControlVehiculo();
        // si hay este vehiculo en una factura no dejamos borrar...
        if(!$control->existeVehiculoConFacturas($matricula)){
            if($control->borrarVehiculo($matricula)){
                $GLOBALS['res']['result'] = "true";
                $GLOBALS['res']['validacion'] = "Vehiculo borrado correctamente.";

            } else {
                $GLOBALS['res']['result'] = "false";
                $GLOBALS['res']['validacion'] = "Hubo un problema, no se pudo borrar correctamente.";
            }
        } else {
            $GLOBALS['res']['result'] = "false";
            $GLOBALS['res']['validacion'] = "Existen algunas Facturas con este vehiculo.";
        }
    }

    function updateVehiculo($id, $dataUpdate){
        $control = new ControlVehiculo();
        if($control->existeVehiculo($id)){
            if($control->updateVehiculo($id, $dataUpdate)){
                $GLOBALS['res']['result'] = "true";
                $GLOBALS['res']['validacion'] = "<i><b>Vehiculo editado</b></i> correctamente. Datos guardados.";
            } else {
                $GLOBALS['res']['result'] = "false";
                $GLOBALS['res']['validacion'] = "No se puede editar el Vehiculo. Ha habido un problema.";
            }
        } else {
            $GLOBALS['res']['result'] = "false";
            $GLOBALS['res']['validacion'] = "El <b> Vehiculo </b> no existe en la Base de Datos.";
        }
    }

    function createVehiculo($dataCreate) {
        $control = new ControlVehiculo();

        if($control->existeMatricula($dataCreate[0])){
            //var_dump("faaaaaalse, existe el niiif y no se puede crear!");
            $GLOBALS['res']['result'] = "false";
            $GLOBALS['res']['validacion'] = "<b>Error</b>! Ya hay un vehiculo existente con esta matricula.";
        } else if($control->createVehiculo($dataCreate)){
            $GLOBALS['res']['result'] = "true";
            $GLOBALS['res']['validacion'] = "<i><b>Vehiculo creado</b></i> correctamente. Datos guardados.";
        } else {
            $GLOBALS['res']['result'] = "false";
            $GLOBALS['res']['validacion'] = "Hay un error. No se puede crear el vehiculo.";
        }
    }


    echo json_encode($res);

