<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 22/08/15
 * Time: 19:44
 */

include_once "../../mysql/TMysqlAcces.php";
include_once "../class/TFactura.php";
include_once "../class/TPdf.php";
include_once "../dao/ControlCliente.php";
include_once "../dao/ControlVehiculo.php";

class ControlFactura {

     public function devuelveListadoFacturas() {
          $factura = new TFactura();
          $res = $factura->getAllFacturas();
          if($res != null)
               return $res;
          else
               return false;
     }

     public function devuelveDatosFacuraById($id){
          $factura = new TFactura();
          $res = $factura->getFacturasById($id);
          if($res != null)
               return $res;
          else
               return false;
     }


     public function devuelveDatosFiltro($values){
          $factura = new TFactura();
          $res = $factura->getFacturasByValues($values);

          if($res != null)
               return $res;
          else
               return false;
     }

     public function devuelveUltimoCodigoFacturas(){
          $factura = new TFactura();
          $res = $factura->getLastCodigoOfYear();
          if($res != null)
               return $res;
          else
               return false;
     }

     public function devuelveDatosFacturasByCliente($id_cliente){
          $factura = new TFactura();
          $res = $factura->getFacturasByCliente($id_cliente);
          if($res != null)
               return $res;
          else
               return false;
     }

     public function devuelveDatosFacura($codigo){
          $factura = new TFactura();
          $res = $factura->getFacturaByCodigo($codigo);
          if($res != null)
               return $res;
          else
               return false;
     }

     public function devuelveDatosConceptos($codigo){
          $factura = new TFactura();
          $res['manoobra'] = $factura->getConceptosManoObraByCodigo($codigo);
          $res['recambios'] = $factura->getConceptosRecambioByCodigo($codigo);

          if($res != null)
               return $res;
          else
               return false;
     }

     public function devuelveStringListado(){
          $factura  = new TFactura();
          $datos    = $factura->getDatosViewList();
          if($datos != null)
               return $datos;
          else
               return false;
     }

     public function existeFacturaById($id){
          $factura = new TFactura();
          $res = $factura->getCountFacturaById($id);
          $ret = false;

          if($res["qtt"] > 0)
               $ret = true;
          else
               $ret = false;

          return $ret;
     }


     public function existeFactura($codigo){
          $factura = new TFactura();
          $res = $factura->getCountFacturaByCodigo($codigo);
          $ret = false;

          if($res["qtt"] > 0)
               $ret = true;
          else
               $ret = false;

          return $ret;
     }

     public function borrarFacturaByCliente($id_cliente){
          $factura = new TFactura();
          $factura_data = $this->devuelveDatosFacturasByCliente($id_cliente);

          for($num = 0; $num < sizeof($factura_data); $num++){
               if ($this->borrarConceptosByCodigo($factura_data[$num]['codigo'])) {
                    return $factura->borrarDocumentoFacturaByCliente($id_cliente);
               }
          }
     }

     public function borrarFacturaByCodigo($codigo){
          $factura = new TFactura();
          $factura_data = $this->devuelveDatosFacura($codigo)[0];

          if ($this->borrarConceptosByCodigo($factura_data['codigo'])) {
               return $factura->borrarDocumentoFacturaByCodigo($codigo);
          }
     }

     public function borrarConceptosByCodigo($codigo){
          $factura = new TFactura();
          $res = $factura->borrarConceptosByFactura($codigo);
          $ret = false;

          if($res != null)
               return $res;
          else
               return null;
     }

     public function exportarFactura($factura, $cliente, $conceptos){
          $pdf = new TPdf();
          $res = $pdf->exportarPdf($factura, $cliente, $conceptos);
     }

     public function existeOtraFacturaConEsteCodigo($id, $codigo){
          $factura = new TFactura();
          $res = $factura->getCountFacturaByIdAndCodigo($id, $codigo);

          if($res['qtt'] != null)
               if($res['qtt'] != "0")
                    return true;
               else false;
          else false;
     }

     public function crearFacturaConceptos($data, $conceptos){
          $controlCliente = new ControlCliente();
          $controlCoche = new ControlVehiculo();

          $factura = new TFactura();

          $cliente[0] = $controlCliente->devuelveDatosCliente($data[0]);
          $vehiculo[0] = $controlCoche->devuelveDatosVehiculo($data[6]);

          array_push($data, $cliente[0][0]['nombre']);
          array_push($data, $cliente[0][0]['apellido']);
          array_push($data, $cliente[0][0]['direccion']);
          array_push($data, $cliente[0][0]['localidad']);
          array_push($data, $cliente[0][0]['telefono']);

          array_push($data, $vehiculo[0][0]['matricula']);
          array_push($data, $vehiculo[0][0]['marca']);
          array_push($data, $vehiculo[0][0]['modelo']);
          array_push($data, $vehiculo[0][0]['km']);

          $res = false;
          if($factura->crearDocumentoFactura($data))
                    if ($factura->crearConceptosFactura($data[1], $conceptos))
                         $res = true;


          return $res;

     }

     public function updateFactura ($id, $codigo, $data, $conceptos){
          $controlCliente = new ControlCliente();
          $controlCoche = new ControlVehiculo();

          $factura = new TFactura();


          $cliente[0] = $controlCliente->devuelveDatosCliente($data[0]);
          $vehiculo[0] = $controlCoche->devuelveDatosVehiculo($data[6]);

          array_push($data, $cliente[0][0]['nombre']);
          array_push($data, $cliente[0][0]['apellido']);
          array_push($data, $cliente[0][0]['direccion']);
          array_push($data, $cliente[0][0]['localidad']);
          array_push($data, $cliente[0][0]['telefono']);

          array_push($data, $vehiculo[0][0]['matricula']);
          array_push($data, $vehiculo[0][0]['marca']);
          array_push($data, $vehiculo[0][0]['modelo']);
          array_push($data, $vehiculo[0][0]['km']);


          $res = false;
          if($factura->updateDocumentoFactura($id, $data))
               if ($factura->updateConceptosFactura($codigo, $data[1], $conceptos))
                    $res = true;

          return $res;
     }



}
