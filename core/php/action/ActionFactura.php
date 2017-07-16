<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 22/08/15
 * Time: 19:44
 */

header('Content-Type', 'application/json');
require_once "../dao/ControlFactura.php";

// ambito GLOBAL
$res = "";

     if(!empty($_GET['function'])){
          switch($_GET['function']){
               case "DevolverListadoAction":      devolverListado(); break;
               case "VerFacturaAction":           devolverFactura($_GET['codigo']); break;
               case "UpdateFacturaAction":        updateFactura($_GET['id'], $_GET['codigo'], $_GET['datos'], $_GET['conceptos']); break;
               case "CrearFacturaAction":         crearFacturaAction($_GET['datos'], $_GET['conceptos']); break;
               case "BorrarFacturaAction":        borrarFactura($_GET['codigo']); break;
               case "ExportarPfd":                exportarFactura($_GET['codigo']); break;
               case "DevuelveUltimoCodigo":       devuelveUltimoCodigo(); break;
               case "SelectFiltroAction":         devuelveFiltro($_GET['values']); break;
          }
     }

     // devuelve DATOS de listado de clientes
     function devolverListado() {
          $control = new ControlFactura();

          $GLOBALS['res'] = $control->devuelveListadoFacturas();

     }


     function devolverFactura(){
          $control = new ControlFactura();
          $GLOBALS['res']['datos'] = $control->devuelveDatosFacura($_GET['codigo']);
          $GLOBALS['res']['conceptos'] = $control->devuelveDatosConceptos($_GET['codigo']);
     }

     function devuelveFiltro($values){
          $control = new ControlFactura();
          $GLOBALS['res'] = $control->devuelveDatosFiltro($values);
     }

     function devuelveUltimoCodigo(){
          $control = new ControlFactura();
          $isNull = $control->devuelveUltimoCodigoFacturas();

          if($isNull != 0)
               $GLOBALS['res'] = $isNull;
          else
               $GLOBALS['res'] = "0";


     }

     function exportarFactura($codigo){
          $control = new ControlFactura();
          $controlc = new ControlCliente();
          $factura  = $control->devuelveDatosFacura($codigo)[0];
          $cliente  = $controlc->devuelveDatosCliente($factura["id_cliente"])[0];
          $conceptos= $control->devuelveDatosConceptos($codigo);

          $GLOBALS['res'] = $control->exportarFactura($factura, $cliente, $conceptos);

     }

     function borrarFactura($codigo){
          $control = new ControlFactura();
          $GLOBALS['res'] = $control->borrarFacturaByCodigo($codigo);
     }

     function crearFacturaAction($data, $conceptos){
          $control = new ControlFactura();
          if(!$control->existeFactura($data[1])){
               if ($control->crearFacturaConceptos($data, $conceptos)) {
                    $GLOBALS['res']['result'] = "true";
                    $GLOBALS['res']['validacion'] = "<i><b>Factura creada</b></i> correctamente. Datos guardados.";
               } else {
                    $GLOBALS['res']['result'] = "false";
                    $GLOBALS['res']['validacion'] = "No se puede crear la factura. Ha habido un problema.";
               }

          } else {
               $GLOBALS['res']['result'] = "false";
               $GLOBALS['res']['validacion'] = "<b>Error</b>! Ya hay una factura con el mismo codigo.";
          }
     }

     function updateFactura($id, $codigo, $data, $conceptos)
     {
          $control = new ControlFactura();
          $factura = $control->devuelveDatosFacuraById($id)[0];

          if ($control->existeFacturaById($id)) {
               if ($data[1] != $factura['codigo']) {
                    if (!$control->existeOtraFacturaConEsteCodigo($id, $data[1])) {
                         if ($control->updateFactura($id, $codigo, $data, $conceptos)) {
                              $GLOBALS['res']['result'] = "true";
                              $GLOBALS['res']['validacion'] = "<i><b>Factura editado</b></i> correctamente. Datos guardados.";
                              $GLOBALS['res']['id_factura'] = $id;
                              $GLOBALS['res']['codigo'] = $data[1];
                         } else {
                              $GLOBALS['res']['result'] = "false";
                              $GLOBALS['res']['validacion'] = "No se puede editar la factura. Ha habido un problema.";
                              $GLOBALS['res']['id_factura'] = $id;
                              $GLOBALS['res']['codigo'] = $data[1];
                         }
                    } else {
                         $GLOBALS['res']['result'] = "false";
                         $GLOBALS['res']['validacion'] = "<i>Ya existe una <b>factura</b></i> con este Codigo.";
                         $GLOBALS['res']['id_factura'] = $id;
                         $GLOBALS['res']['codigo'] = $data[1];
                    }
               } else {
                    if ($control->updateFactura($id, $codigo, $data, $conceptos)) {
                         $GLOBALS['res']['result'] = "true";
                         $GLOBALS['res']['validacion'] = "<i><b>Factura editado</b></i> correctamente. Datos guardados.";
                         $GLOBALS['res']['id_factura'] = $id;
                         $GLOBALS['res']['codigo'] = $data[1];
                    } else {
                         $GLOBALS['res']['result'] = "false";
                         $GLOBALS['res']['validacion'] = "No se puede editar la factura. Ha habido un problema.";
                         $GLOBALS['res']['id_factura'] = $id;
                         $GLOBALS['res']['codigo'] = $data[1];
                    }
               }
          }
     }


echo json_encode($res);


