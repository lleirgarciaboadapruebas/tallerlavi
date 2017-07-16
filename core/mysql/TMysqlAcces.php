<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 29/07/15
 * Time: 20:35
 */


class TMysqlAcces extends mysqli {

     private $link;
     private $query;
     private $resultQuery;
     private $returnRequest;

     public function select($query){
          $res = false;

          // si query contiene string
          if(!empty($query)){

               // inicia BD
               $this->ini();

               // retorna objeto resultado si esta bien, o FALSE si esta mal
               $this->resultQuery       = $this->ejectQuery($query);
//                var_dump($query);
				
               // guarda array asociativo de las columnas del resultado de la consulta
               $this->returnRequest     = $this->resultQuery->fetch_all(MYSQLI_ASSOC);

               if (mysqli_errno($this->link)) {
                    $res = mysqli_error($this->link);
               }

               if($this->returnRequest != false){
                    $res = true;
               } else {
                    $res = false;
               }

          }

          return $res;
     }

     public function update($query){
          $res = false;
          // si query contiene string
          if(!empty($query)){

               // inicia BD
               $this->ini();

               // retorna objeto resultado si esta bien, o FALSE si esta mal
               $this->resultQuery       = $this->ejectQuery($query);

               if (mysqli_errno($this->link)) {
                    $res = mysqli_error($this->link);
               }
          }

          return $this->resultQuery;
     }

     public function insert($query){
          // si query contiene string
          if(!empty($query)){

               // inicia BD
               $this->ini();

               // retorna objeto resultado si esta bien, o FALSE si esta mal
               $this->resultQuery       = $this->ejectQuery($query);

               if (mysqli_errno($this->link)) {
                    $res = mysqli_error($this->link);
               }
          }

          return $this->resultQuery;
     }

     public function delete($query){
          // si query contiene string
          if(!empty($query)){

               // inicia BD
               $this->ini();

               // retorna objeto resultado si esta bien, o FALSE si esta mal
               $this->resultQuery       = $this->ejectQuery($query);

               if (mysqli_errno($this->link)) {
                    $res = mysqli_error($this->link);
               }
          }

          return $this->resultQuery;
     }

     private function ini($user="root", $password="", $server="localhost", $bd="tallerlavi1") {
          $res = false;
          $this->link = mysqli_connect($server, $user, $password, $bd);

          if (mysqli_connect_errno($this->link)) {
               $res = false;
          } else {
               $res = true;
          }
          //mysqli_set_charset($this->link, "utf-8");
          $this->ejectQuery("SET NAMES 'utf8'");
          $this->ejectQuery("SELECT convert(cast(convert(content using latin1) as binary) using utf8) AS content");

          return $res;
     }

     private function fin() {
          $res = false;
          if(!mysqli_close($this->link)) {
               $res = false;
          } else {
               $res = true;
          }
          return $res;
     }

     public function close(){
       parent::close();
     }

     public function getDataQuery(){
          return $this->returnRequest;
     }

     private function ejectQuery($query){
          return mysqli_query($this->link, $query);
     }

     private function fetch_assoc($result){
          return mysqli_fetch_assoc($result);
     }

     private function fetch_all_assco($result){
          return mysqli_fetch_all($result, MYSQLI_ASSOC);
     }

}

?>