<?php

/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 01/12/2015
 * Time: 19:53
 */

include_once "../../../core/mysql/TMysqlAcces.php";
include_once "../../../core/php/class/TVehiculo.php";

class ControlVehiculo
{


    public function devuelveListadoVehiculos() {
        $vehiculo = new TVehiculo();
        $res = $vehiculo->getAllListVehiculo();
        if($res != null)
            return $res;
        else
            return false;
    }

    public function devuelveDatosVehiculo($id){
        $vehiculo = new TVehiculo();
        $res = $vehiculo->getVehiculoById($id);
        if($res != null)
            return $res;
        else
            return false;
    }

    public function devuelveDatosFiltro($values){
        $vehiculo = new TVehiculo();
        $res = $vehiculo->getVehiculosByValues($values);

        if($res != null)
            return $res;
        else
            return false;
    }

    public function devolverVehiculosByCliente($id_cliente){
        $vehiculo = new TVehiculo();
        $res = $vehiculo->getVehiculoByIdCliente($id_cliente);

        if($res != null)
            return $res;
        else
            return false;
    }

    public function devolverVehiculoByMatricula($matricula){
        $vehiculo = new TVehiculo();
        $res = $vehiculo->getVehiculoByMatricula($matricula);

        if($res != null)
            return $res;
        else
            return false;
    }

    public function borrarVehiculo($matricula){
        $vehiculo = new TVehiculo();
        $res = $vehiculo->deleteVehiculo($matricula);

        if($res != null)
            return $res;
        else
            return false;
    }

    public function borrarVehiculoByCliente($id_cliente){
        $vehiculo = new TVehiculo();
        $res = $vehiculo->deleteVehiculoByCliente($id_cliente);

        if($res != null)
            return $res;
        else
            return false;
    }

    public function existeVehiculoConFacturas($matricula){
        $vehiculo = new TVehiculo();
        $res = $vehiculo->getCountVehiculoInFactura($matricula);
        if($res['qtt'] != null)
            if($res['qtt'] > 0)
                return true;
            else false;
        else false;
    }

    public function existeVehiculo($id){
        $cliente = new TVehiculo();
        $res = $cliente->getCountVehiculoById($id);
        if($res != null)
            if($res > 0)
                return true;
            else false;
        else false;
    }

    public function existeVehiculoIdMatricula($id, $matricula){
        $cliente = new TVehiculo();
        $res = $cliente->getCountVehiculoByIdAndMatricula($id, $matricula);
        if($res != null)
            if($res > 0)
                return true;
            else false;
        else false;
    }

    public function existeMatricula($matricula){
        $cliente = new TVehiculo();
        $res = $cliente->getCountVehiculoByMatricula($matricula);
        // var_dump("Existe nif del cliente? " . $res["qtt"]);
        if($res["qtt"] > 0)
            return true;
        else
            return false;
    }

    public function updateVehiculo($id, $datos){
        $cliente = new TVehiculo();

        if($cliente->actualizarVehiculoById($id, $datos))
            return true;
        else
            return false;
    }

    public function createVehiculo($datosCreate){
        $cliente = new TVehiculo();

        if($cliente->crearVehiculoByDatos($datosCreate))
            return true;
        else
            return false;
    }


}