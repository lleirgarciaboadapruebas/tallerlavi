<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 31/07/15
 * Time: 19:42
 */

     header('Content-Type', 'application/json');


     require_once "../dao/ControlUsuario.php";

     // ambito GLOBAL
     $res = "";

     if(!empty($_GET['function'])){
          switch($_GET['function']){
               case "LoginAction":      preLogin(); break;
          }
     }

     // antes de hacer login, comprobará si los datos son existentes, si existen sigue el proceso, sino devuelve 'error'
     function preLogin() {
          $control = new ControlUsuario();
          if($control->existeUser($_GET['user'], $_GET['password']))
               $GLOBALS['res'] = "ok";
          else
               $GLOBALS['res'] = "error";


     }
     echo $res;

?>