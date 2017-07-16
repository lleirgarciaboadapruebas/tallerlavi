<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 30/08/15
 * Time: 20:15
 */

     header('Content-Type', 'application/json');
     require_once "./ActionCliente.php";
     require_once "./ActionFactura.php";
     //require_once "./ActionCoche.php";

     var_dump("38746294");

     // ambito GLOBAL
     $res      = "";
     $action   = $_GET['function'];
     $tabla    = $_GET['tabla'];


     if(!empty($_GET['function'])){
          switch($_GET['function']){

               case "DevolverListadoAction":
                    devolverListado();

                    break;


               case "Ver" . $tabla . "Action":
                    if        ($tabla == "cliente")            devolverClientee($_GET['id']);
                    else if   ($tabla == "factura")            devolverFactura();
                    else    //devolverCoche();

               break;
     }
}



