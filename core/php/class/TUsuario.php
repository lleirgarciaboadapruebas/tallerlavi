<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 17/08/15
 * Time: 18:38
 */

class TUsuario {

     private $nombre;
     private $usuario;
     private $password;
     private $tipo;

     /**
      * @param mixed $nombre
      */
     public function setNombre($nombre)
     {
          $this->nombre = $nombre;
     }

     /**
      * @return mixed
      */
     public function getNombre()
     {
          return $this->nombre;
     }

     /**
      * @param mixed $usuario
      */
     public function setUsuario($usuario)
     {
          $this->usuario = $usuario;
     }

     /**
      * @return mixed
      */
     public function getUsuario()
     {
          return $this->usuario;
     }

     /**
      * @param mixed $tipo
      */
     public function setTipo($tipo)
     {
          $this->tipo = $tipo;
     }

     /**
      * @return mixed
      */
     public function getTipo()
     {
          return $this->tipo;
     }

     /**
      * @param mixed $password
      */
     public function setPassword($password)
     {
          $this->password = $password;
     }

     /**
      * @return mixed
      */
     public function getPassword()
     {
          return $this->password;
     }


     public function usuarioExistente($user, $password){
          $result = 0;
          $query = "SELECT * FROM usuario
                    WHERE usuario = '" . $user . "'
                    AND password = '" . $password . "';";

          $acces = new TMysqlAcces;

          if($acces->select($query) != false)
               $result = $acces->getDataQuery();


          if($result != false)
               return true;
          else
               return false;

     }




}







?>