<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 19/08/15
 * Time: 17:33
 */

require_once "../functions/functions.php";

class TCliente {

     private $nif;
     private $nombre;
     private $apellido;
     private $direccion;
     private $localidad;
     private $telefono1;
     private $telefono2;
     private $ultima_visia;

     public function getAllListClients(){
          $query    = "SELECT id, nombre, apellido, direccion, telefono, ultima_visita FROM cliente order by nombre";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Listado no encontrado.";

          //$res      = $acces->mysql_real_escape_string
          $acces->close();
          return $res;
     }

     public function getClienteById($id){
          $query    = "SELECT * FROM cliente WHERE id = " . $id . ";";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Cliente no encontrado.";

          $acces->close();
          return $res;
     }

     public function getClientesByValues($values){
          $like = "WHERE";

          if(!empty($values[0]))
               $like = $like . " nombre like '%". $values[0] ."%' AND";

          if(!empty($values[1]))
               $like = $like . " apellido like '%". $values[1] ."%' AND";

          if(!empty($values[2]))
               $like = $like ." telefono like '%". $values[2] ."%' AND";

          if(!empty($values[3]))
               $like = $like . " nif like '%". $values[3] ."%' AND";


          $like = substr_replace($like, "", sizeof($like) - 4) . ";";

          $query    = "SELECT id, nombre, apellido, direccion, telefono, ultima_visita FROM cliente " . $like;



          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Cliente no encontrado.";

          $acces->close();
          return $res;
     }

     public function getCountClienteById($id){
          $query    = "SELECT COUNT(*) as qtt FROM cliente WHERE id = " . $id . ";";
          $acces    = new TMysqlAcces();
          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Cliente no encontrado.";

          $acces->close();
          return $res[0];
     }

     public function getCountClienteByIdAndNif($id, $nif){
          $query    = "SELECT COUNT(*) as qtt FROM cliente WHERE id != " . $id . " and nif = '" . $nif . "';";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Cliente no encontrado.";

          $acces->close();
          return $res[0];
     }

     public function getCountClienteByNif($nif){
          $query    = "SELECT COUNT(*) as qtt FROM cliente WHERE nif = '" . $nif . "';";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: De sql: '" . $query . "'";

          $acces->close();
          return $res[0];
     }

     public function getCountClienteInFacturas($id_cliente){
          $query    = "SELECT COUNT(*) as qtt FROM factura WHERE id_cliente = " . $id_cliente . ";";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: De sql: '" . $query . "'";

          $acces->close();
          return $res[0];
     }

     public function getCountClienteInVehiculos($id_cliente){
          $query    = "SELECT COUNT(*) as qtt FROM vehiculo WHERE id_cliente = " . $id_cliente . ";";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: De sql: '" . $query . "'";

          $acces->close();
          return $res[0];
     }

     public function deleteClienteById($id){
          $query    = "DELETE FROM cliente WHERE id = " . $id . ";";
          $acces    = new TMysqlAcces();

          if($acces->delete($query))
               $res = true;
          else
               $res = false;

          $acces->close();
          return $res;
     }

     public function actualizarClienteById($id, $datosEdit){
          $query    = "UPDATE cliente
                      SET nif = '" . $datosEdit[0] . "',
                      nombre = '" . $datosEdit[1] . "',
                      apellido = '" . $datosEdit[2] . "',
                      direccion = '" . $datosEdit[3] . "',
                      localidad = '" . $datosEdit[4] . "',
                      telefono = '" . $datosEdit[5] . "',
                      telefono_segundario = '" . $datosEdit[6] . "'
                      WHERE id = " . $id . ";";

          $acces    = new TMysqlAcces();
          if($acces->update($query))
               $res = true;
          else
               $res = "Error: Cliente no encontrado.";


          $acces->close();
          return $res;
     }

     public function crearClienteByDatos($datosCreate){
          $str = null;

          $query = "INSERT INTO cliente (nif, creado, nombre, apellido, direccion, localidad, telefono, telefono_segundario, ultima_visita)
                    VALUES ('" . $datosCreate[0] . "', '" . date('Y-m-d') . "',  '" . addslashes($datosCreate[1]) . "', '" . addslashes($datosCreate[2]) . "', '" . addslashes($datosCreate[3]) . "',
                            '" . addslashes($datosCreate[4]) . "', '" . $datosCreate[5] . "', '" . $datosCreate[5] . "', '".  date('Y-m-d') ."');";

          $acces    = new TMysqlAcces();
          if($acces->insert($query))
               $res = true;
          else
               $res = false;

          $acces->close();
          return $res;
     }

     /**
      * @param mixed $apellido
      */
     public function setApellido($apellido)
     {
          $this->apellido = $apellido;
     }

     /**
      * @return mixed
      */
     public function getApellido()
     {
          return $this->apellido;
     }

     /**
      * @param mixed $direccion
      */
     public function setDireccion($direccion)
     {
          $this->direccion = $direccion;
     }

     /**
      * @return mixed
      */
     public function getDireccion()
     {
          return $this->direccion;
     }

     /**
      * @param mixed $localidad
      */
     public function setLocalidad($localidad)
     {
          $this->localidad = $localidad;
     }

     /**
      * @return mixed
      */
     public function getLocalidad()
     {
          return $this->localidad;
     }

     /**
      * @param mixed $nif
      */
     public function setNif($nif)
     {
          $this->nif = $nif;
     }

     /**
      * @return mixed
      */
     public function getNif()
     {
          return $this->nif;
     }

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
      * @param mixed $telefono1
      */
     public function setTelefono1($telefono1)
     {
          $this->telefono1 = $telefono1;
     }

     /**
      * @return mixed
      */
     public function getTelefono1()
     {
          return $this->telefono1;
     }

     /**
      * @param mixed $telefono2
      */
     public function setTelefono2($telefono2)
     {
          $this->telefono2 = $telefono2;
     }

     /**
      * @return mixed
      */
     public function getTelefono2()
     {
          return $this->telefono2;
     }

     /**
      * @param mixed $ultima_visia
      */
     public function setUltimaVisia($ultima_visia)
     {
          $this->ultima_visia = $ultima_visia;
     }

     /**
      * @return mixed
      */
     public function getUltimaVisia()
     {
          return $this->ultima_visia;
     }


} 