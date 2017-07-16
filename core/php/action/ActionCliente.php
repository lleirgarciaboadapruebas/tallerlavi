<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 19/08/15
 * Time: 18:09
 */

     header('Content-Type', 'application/json');
     require_once "../dao/ControlCliente.php";
     require_once "../dao/ControlVehiculo.php";
     require_once "../dao/ControlFactura.php";

     // ambito GLOBAL
     $res = "";

     //var_dump($_GET);

     if(!empty($_GET['function'])){
          switch($_GET['function']){
               case "DevolverListadoAction":      devolverListado();            break;
               case "VerClienteAction":           devolverCliente($_GET['id']); break;
               case "UpdateClienteAction":        updateCliente($_GET['id'], $_GET['values']); break;
               case "CrearClienteAction":         createCliente($_GET['values']); break;
               case "BorrarClienteAction":        borrarCliente($_GET['id']); break;
               case "SelectFiltroAction":         devuelveFiltro($_GET['values']);
          }
     }

     // devuelve DATOS de listado de clientes
     function devolverListado() {
          $control = new ControlCliente();
          $ress = $control->devuelveListadoClientes();
          //var_dump($ress);
          for($e = 0; $e < sizeof($ress); $e++){
               $ress[$e]["nombre"] = mysql_real_escape_string ($ress[$e]["nombre"]);
               $ress[$e]["apellido"] = mysql_real_escape_string ($ress[$e]["apellido"]);
               $ress[$e]["direccion"] = mysql_real_escape_string ($ress[$e]["direccion"]);
          }
          //var_dump($ress);


          $GLOBALS['res'] = $ress;
     }

     function devolverCliente(){
          $control = new ControlCliente();
          $GLOBALS['res'] = $control->devuelveDatosCliente($_GET['id']);
     }

     function devuelveFiltro($values){
          $control = new ControlCliente();
          $GLOBALS['res'] = $control->devuelveDatosFiltro($values);
     }

     function devolverClientee($id){
          $control = new ControlCliente();
          $GLOBALS['res'] = $control->devuelveDatosCliente($id);
     }

     function borrarCliente($id){
          $control = new ControlCliente();
          $controlV = new ControlVehiculo();
          $controlF = new ControlFactura();

          if($control->existenFacturasDeCliente($id)){
               if($controlF->borrarFacturaByCliente($id)){
                    if($control->existenVehiculosDeCliente($id)){
                         $controlV->borrarVehiculoByCliente($id);
                    }
                    if($control->borrarCliente($id)){
                         $GLOBALS['res']['result'] = "true";
                         $GLOBALS['res']['validacion'] = "Cliente borrado correctamente.";
                    }
               } else {
                    $GLOBALS['res']['result'] = "true";
                    $GLOBALS['res']['validacion'] = "Las Facturas no se pueden borrar.";
               }
          } else {
               if($control->existenVehiculosDeCliente($id))
                    $controlV->borrarVehiculoByCliente($id);

               if($control->borrarCliente($id)){
                    $GLOBALS['res']['result'] = "true";
                    $GLOBALS['res']['validacion'] = "Cliente borradocorrectamente.";
               }
          }
     }

     function updateCliente($id, $dataUpdate){
          $control = new ControlCliente();
          $cliente = $control->devuelveDatosCliente($id)[0];

          if($control->existeCliente($id)) {
               // si el nif actual es diferente al nif del Cliente, comprobamos que no existe en otros Clientes.
               if($dataUpdate[0] != $cliente['nif']){
                    if(!$control->existeOtroClienteConEsteNif($id, $dataUpdate[0])) {
                         if ($control->updateCliente($id, $dataUpdate)) {
                              $GLOBALS['res']['result'] = "true";
                              $GLOBALS['res']['validacion'] = "<i><b>Cliente editado</b></i> correctamente. Datos guardados.";
                         } else {
                              $GLOBALS['res']['result'] = "false";
                              $GLOBALS['res']['validacion'] = "No se puede editar el cliente. Ha habido un problema.";
                         }
                    } else {
                         $GLOBALS['res']['result'] = "false";
                         $GLOBALS['res']['validacion'] = "<i>Ya existe un <b>cliente</b></i> con este NIF.";
                    }
               } else {
                    if ($control->updateCliente($id, $dataUpdate)) {
                         $GLOBALS['res']['result'] = "true";
                         $GLOBALS['res']['validacion'] = "<i><b>Cliente editado</b></i> correctamente. Datos guardados.";
                    }
               }
          } else {
               $GLOBALS['res']['result'] = "false";
               $GLOBALS['res']['validacion'] = "El <b> Cliente </b> no existe en la Base de Datos.";
          }
     }

     function createCliente($dataCreate) {
          $control = new ControlCliente();
          if($control->existeNifDeCliente($dataCreate[0])){
               $GLOBALS['res']['result'] = "false";
               $GLOBALS['res']['validacion'] = "<b>Error</b>! Ya hay un cliente existente con ese DNI.";
          } else if($control->createCliente($dataCreate)){
                    $GLOBALS['res']['result'] = "true";
                    $GLOBALS['res']['validacion'] = "<i><b>Cliente creado</b></i> correctamente. Datos guardados.";
               } else {
                    $GLOBALS['res']['result'] = "false";
                    $GLOBALS['res']['validacion'] = "No se puede crear.";
               }
     }


     echo json_encode($res);


