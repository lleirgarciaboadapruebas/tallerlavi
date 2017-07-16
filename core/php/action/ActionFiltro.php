<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 27/08/15
 * Time: 19:16
 */
     session_start();
     header('Content-Type', 'application/json');
     require_once "../dao/ControlFiltros.php";

     // si existe una sesion de filtros antes del FiltradoAction, la quitamos para crear una nueva ya que es una nueva busqueda
     if(isset($_SESSION['filtros']))
          unset($_SESSION['filtros']);
     else
          $_SESSION['filtro'] = null;


     $res = "";

     $posicion      = sizeof($_GET['values']) - 2;
     $tipoFiltro    = ($_GET['values'][$posicion]);


     $filtro        = new ControlFiltros();
     $res           = $filtro->devolverListadoFiltros($tipoFiltro, $_GET['values'], $_GET['ids'], $_GET['encabezado']);

     $_SESSION['filtros'] = $filtro->setSession($_GET['values'], $_GET['ids']);

echo json_encode($res);



