<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 19/08/15
 * Time: 17:37
 */

include_once "../../../core/mysql/TMysqlAcces.php";
include_once "../../../core/php/class/TCliente.php";

class ControlCliente {


     public function devuelveListadoClientes() {
          $cliente = new TCliente();
          $res = $cliente->getAllListClients();
          if($res != null)
               return $res;
           else
               return false;
     }

     public function devuelveDatosCliente($id){
          $cliente = new TCliente();
          $res = $cliente->getClienteById($id);

          if($res != null)
               return $res;
          else
               return false;
     }

     public function devuelveDatosFiltro($values){
          $cliente = new TCliente();
          $res = $cliente->getClientesByValues($values);

          if($res != null)
               return $res;
          else
               return false;
     }

     public function existeCliente($id){
          $cliente = new TCliente();
          $res = $cliente->getCountClienteById($id);

          if($res['qtt'] != null)
               if($res['qtt'] != "0")
                    return true;
               else false;
          else false;
     }

     public function existeOtroClienteConEsteNif($id, $nif){
          $cliente = new TCliente();
          $res = $cliente->getCountClienteByIdAndNif($id, $nif);

          if($res['qtt'] != null)
               if($res['qtt'] != "0")
                    return true;
               else false;
          else false;
     }

     public function existeNifDeCliente($nif){
          $cliente = new TCliente();
          $res = $cliente->getCountClienteByNif($nif);

          if($res['qtt'] == "0")
               return false;
          else
               return true;
     }

     public function existenFacturasDeCliente($id){
          $cliente = new TCliente();
          $res = $cliente->getCountClienteInFacturas($id);

          if($res['qtt'] == "0")
               return false;
          else
               return true;
     }

     public function existenVehiculosDeCliente($id){
          $cliente = new TCliente();
          $res = $cliente->getCountClienteInVehiculos($id);

          if($res['qtt'] == "0")
               return false;
          else
               return true;
     }

     public function borrarCliente($id){
          $cliente = new TCliente();
          $res = $cliente->deleteClienteById($id);

          if($res != null)
               return $res;
          else
               return null;
     }

     public function updateCliente($id, $datos){
          $cliente = new TCliente();
          if($cliente->actualizarClienteById($id, $datos))
               return true;
          else
               return false;
     }

     public function createCliente($datosCreate){
          $cliente = new TCliente();

          if($cliente->crearClienteByDatos($datosCreate))
               return true;
          else
               return false;
     }


} 