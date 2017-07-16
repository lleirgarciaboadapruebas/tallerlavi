<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 27/08/15
 * Time: 19:40
 */

include_once "../../mysql/TMysqlAcces.php";
include_once "../class/TFactura.php";
include_once "../class/TCliente.php";

//include_once "../class/TCoche";

class ControlFiltros {


     /**
      * Devuelve cualquier LISTADO usando los filtros, pasa tipo de filtro (tabla) y array de DATOS.
      * @param $tipoFiltro Factura, CLiente o Coche
      * @param $datos
      */
     public function devolverListadoFiltros($tipoFiltro, $datos, $condiciones, $encabezado){

          // construyo QUERY con NOMBRE TABLA y DATOS que seran comparados en la BD.
          $select   = $this->setSelect($encabezado);
          $from     = $this->setFrom($tipoFiltro);
          $where    = $this->setWhere($condiciones, $datos);
          $query    = $select . $from . $where;
          //die($query);
          $acces = new TMysqlAcces();
          die($query);
          $acces->select($query);
          $res['select'] = $acces->getDataQuery();
          $res['filtros']= $tipoFiltro;

          return $res;
     }

     public function setSession($datos, $condiciones){
          $cont = 0;
          $res = null;

          foreach($condiciones as $c){
               if($cont < sizeof($datos) - 2)
                    $res["filtro" . $cont] = $datos[$cont];
               $cont++;
          }

          return $res;
     }

     private function setSelect($encabezado){
         $sel = implode(", ", $encabezado);
         return "SELECT " . $sel . " ";
     }

     private function setFrom($filtro){
          $res = "";
          $inner = "";

          switch($filtro){
               case "filtro-factura" :   $res = "factura";  break;
               case "filtro-coche" :     $res = "coche";  $inner = "INNER JOIN cliente c where ";  break;
               case "filtro-cliente" :   $res = "cliente";  break;
          }

          return " FROM " .$res . " ";
     }

     private function setWhere($condiciones, $datos){
          $where = " WHERE ";

          for($x = 0; $x < sizeof($condiciones) - 2; $x++){
               if(!empty($datos[$x]))
                    $where = $where . $condiciones[$x] . " like '%" . $datos[$x] . "%' AND ";
          }

          $where = substr_replace($where, "", sizeof($where) - 6) . ";";

          return $where;
     }


}