<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 18/08/15
 * Time: 18:07
 */
include_once "../../mysql/TMysqlAcces.php";
include_once "../class/TUsuario.php";

class ControlUsuario {

     /** Devuelve TRUE si existe el usuario, FALSE si no existe.  */
     public function existeUser($user, $password) {
          $u = new TUsuario();

          if($u->usuarioExistente($user, $password))
               return true;
          else
               return false;

     }
}