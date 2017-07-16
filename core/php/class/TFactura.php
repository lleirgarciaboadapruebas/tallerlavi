<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 22/08/15
 * Time: 19:45
 */

class TFactura {
	
     private $id;
     private $codigo;
     private $fecha;
     private $id_cliente;
     private $recanvios;
     private $mano_obra;
     private $iva;
     private $total;
     private $nombre;
     private $apellido;
     private $direccion;
     private $localidad;
     private $quilometros;
     private $precio_hora;
     private $matricula;
     private $estado;

     public function getAllFacturas(){
     	$query    = "SELECT f.id, f.codigo, f.fecha, f.id_cliente, f.nombre, f.apellido, f.telefono, f.estado, f.total, ef.estado as estado_factura
                        FROM factura f INNER JOIN estado_factura ef on f.estado = ef.id order by f.codigo desc";
          $acces    = new TMysqlAcces();
          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Listado no encontrado.";

          //$res      = $acces->mysql_real_escape_string
          $acces->close();
          return $res;
     }

     public function getLastCodigo(){
          $query    = "SELECT max(codigo) as codd FROM factura";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Listado no encontrado.";

          //$res      = $acces->mysql_real_escape_string
          $acces->close();
          return $res[0]['codd'];
     }

     public function getLastCodigoOfYear(){			// coger año actual en el like.
          $query    = "SELECT max(codigo) as codd FROM factura WHERE fecha LIKE '%2017%'";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Listado no encontrado.";

          $acces->close();
          return ($res[0]['codd'] == null ? 0 : $res[0]['codd']);
     }

     public function getFacturasByValues($values){
          $like = "WHERE";

          if(!empty($values[0]))
               $like = $like . " f.codigo like '%". $values[0] ."%' AND";

          if(!empty($values[1]))
               $like = $like . " f.nombre like '%". $values[1] ."%' AND";

          if(!empty($values[2]))
               $like = $like . " f.matricula like '%". $values[2] ."%' AND";

          if(!empty($values[3]))
               $like = $like . " ef.estado like '%". $values[3] ."%' AND";

          $like = substr_replace($like, "", sizeof($like) - 4) . ";";

          $query    = "SELECT f.id, f.codigo, ef.estado as estado_factura, f.fecha, f.id_cliente, f.nombre, f.apellido,  f.telefono, f.estado, f.total FROM factura f INNER JOIN estado_factura ef ON f.estado = ef.id " . $like;

          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Factura no encontrado.";

          $acces->close();
          return $res;
     }

     public function getFacturaByCodigo($codigo){
          $query    = "SELECT f.*, ef.estado as estado_factura  FROM factura f INNER JOIN estado_factura ef on f.estado = ef.id WHERE codigo = '" . $codigo . "';";
          $acces    = new TMysqlAcces();
          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Factura no encontrado.";
          $acces->close();
          return $res;
     }

     public function getFacturasById($id){
          $query    = "SELECT * FROM factura WHERE id = " . $id . ";";
          $acces    = new TMysqlAcces();
          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Factura no encontrado.";
          $acces->close();
          return $res;
     }

     public function getFacturasByCliente($id_cliente){
          $query    = "SELECT * FROM factura WHERE id_cliente = " . $id_cliente . ";";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Factura no encontrado.";
          $acces->close();
          return $res;
     }

     public function getConceptosManoObraByCodigo($codigo){
          $query    = "SELECT * FROM concepto_manoobra WHERE codigo_factura = '" . $codigo . "';";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = null;
          $acces->close();
          return $res;
     }

     public function getConceptosRecambioByCodigo($codigo){
          $query    = "SELECT * FROM concepto_recanvios WHERE codigo_factura = '" . $codigo . "';";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = null;
          $acces->close();
          return $res;
     }

     public function getCountFacturaById($id){
          $query    = "SELECT COUNT(*) as qtt FROM factura WHERE id = " . $id . ";";

          $acces    = new TMysqlAcces();
          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Factura no encontrada.";

          $acces->close();
          return $res[0];
     }

     public function getCountFacturaByCodigo($codigo){
          $query    = "SELECT COUNT(*) as qtt FROM factura WHERE codigo = '" . $codigo . "';";

          $acces    = new TMysqlAcces();
          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Factura no encontrada.";

          $acces->close();
          return $res[0];
     }

     public function crearDocumentoFactura($data){

          $str = null;
          $data[2] = $newDate = date("Y-m-d", strtotime($data[2]));

          $query = "INSERT INTO factura (id_cliente, codigo, fecha, estado, iva, precio_hora, mano_obra, recanvios, suman, iva_total, total, nombre, apellido, direccion, localidad, quilometros, telefono,
                                    matricula, marca, modelo)
                VALUES (" . $data[0] . ", '" . $data[1] . "', '" . $data[2] . "', '" . $data[3] . "', " . $data[4] . ", " . $data[5] . ", " . $data[7] . ", " . $data[8] . ", " . $data[9] . ",
                        " . $data[10] . ", " . $data[11] . ", '" . $data[12] . "', '" . $data[13] . "', '" . $data[14] . "', '" . $data[15] . "', '" . $data[20] . "' , '" . $data[16] . "', '" . $data[17] . "',
                        '" . $data[18] . "', '" . $data[19] . "')";

          $acces    = new TMysqlAcces();

          $query_cliente = "UPDATE cliente SET ultima_visita = '" . date('Y-m-d') . "' WHERE id = " . $data[0] . ";";
          $acces->update($query_cliente);

          $query_vehiculo = "UPDATE vehiculo SET ultima_revision = '" . date('Y-m-d') . "' WHERE id_cliente = " . $data[0] . " AND matricula = '" . $data[17] . "';";
          $acces->update($query_vehiculo);

          if($acces->insert($query))
               $res = true;
          else
               $res = false;


          $acces->close();
          return $res;

     }

     public function borrarDocumentoFacturaByCodigo($codigo){
          $query    = "DELETE FROM factura WHERE codigo = '" . $codigo . "';";

          $acces    = new TMysqlAcces();
          if($acces->delete($query))
               $res = true;
          else
               $res = false;

          $acces->close();
          return $res;
     }

     public function borrarDocumentoFacturaByCliente($id){
          $query    = "DELETE FROM factura WHERE id_cliente = " . $id . ";";

          $acces    = new TMysqlAcces();
          if($acces->delete($query))
              $res = true;
          else
               $res = false;

          $acces->close();
          return $res;
     }

     public function crearConceptosFactura($codigo_factura, $data){
          $res = true;
          if($data != null){
               $query = "";
               $acces    = new TMysqlAcces();

               for($a = 1; $a <= sizeof($data); $a++){

                    // si es mano de obra...
                    if($data[$a][0] == 1){
                         $query = "INSERT INTO concepto_manoobra (tipo, codigo_factura, detalle, cantidad, importe)
                                   VALUES (1, '" . $codigo_factura . "', '" . $data[$a][1] . "', " . $data[$a][2] . ",  " . $data[$a][3] . ");";
                         if($acces->insert($query)) {
                              $res = true;
                         } else {
                              $res = false;
                         }

                    } else if($data[$a][0] == 2) {
                         $query = "INSERT INTO concepto_recanvios (tipo, codigo_factura, detalle, cantidad, importe)
                                   VALUES (2, '" . $codigo_factura . "', '" . $data[$a][1] . "', " . $data[$a][2] . ",  " . $data[$a][3] . ");";
                         if($acces->insert($query)) {
                              $res = true;
                         } else {
                              $res = false;
                         }
                    }
               }

               $acces->close();
          }
          return $res;
     }

     public function updateDocumentoFactura($id, $data){
          $str = null;
          $data[2] = $newDate = date("Y-m-d", strtotime($data[2]));

          $query = "UPDATE factura SET id_cliente = " . $data[0] . ", codigo = '" . $data[1] . "', fecha = '" . $data[2] . "', estado = '" . $data[3] . "', iva = " . $data[4] . " , precio_hora = " . $data[5] . ",
                    mano_obra =  " . $data[7] . ", recanvios = " . $data[8] . ", suman =  " . $data[9] . ", iva_total = " . $data[10] . ", total = " . $data[11] . ", nombre = '" . $data[12] . "',
                    apellido = '" . $data[13] . "', direccion = '" . $data[14] . "', localidad =  '" . $data[15] . "', quilometros = '" . $data[20] . "', telefono = '" . $data[16] . "',
                    matricula = '" . $data[17] . "', marca = '" . $data[18] . "', modelo = '" . $data[19] . "'
                    WHERE id = " . $id . ";";

          $acces    = new TMysqlAcces();
          if($acces->update($query))
               $res = true;
          else
               $res = false;


          $acces->close();
          return $res;
     }

     public function updateConceptosFactura($codigo_factura, $codigo, $data){
          $res = true;

          if($data != null){
               $query = "";
               $acces    = new TMysqlAcces();

               $querye = "DELETE FROM concepto_manoobra  WHERE codigo_factura = '" . $codigo_factura . "';";
               $acces->delete($querye);

               $querya = "DELETE FROM concepto_recanvios WHERE codigo_factura = '" . $codigo_factura . "';";
               $acces->delete($querya);

               for($a = 1; $a <= sizeof($data); $a++){

                    // si es mano de obra...
                    if($data[$a][0] == 1){
                         $query = "INSERT INTO concepto_manoobra (tipo, codigo_factura, detalle, cantidad, importe)
                                   VALUES (1, '" . $codigo . "', '" . $data[$a][1] . "', " . $data[$a][2] . ",  " . $data[$a][3] . ");";

                         if($acces->insert($query)) {
                              $res = true;
                         } else {
                              $res = false;
                         }

                    } else if($data[$a][0] == 2) {
                         $query = "INSERT INTO concepto_recanvios (tipo, codigo_factura, detalle, cantidad, importe)
                                   VALUES (2, '" . $codigo . "', '" . $data[$a][1] . "', " . $data[$a][2] . ",  " . $data[$a][3] . ");";
                         if($acces->insert($query)) {
                              $res = true;
                         } else {
                              $res = false;
                         }
                    }

               }
               $acces->close();
          }
          return $res;
     }

     public function borrarConceptosByFactura($codigo){
          $acces    = new TMysqlAcces();
          $querye = "DELETE FROM concepto_manoobra  WHERE codigo_factura = '" . $codigo . "';";
          $acces->delete($querye);
          if($acces->insert($querye)) {
               $res = true;
          } else {
               $res = false;
          }

          $querya = "DELETE FROM concepto_recanvios WHERE codigo_factura = '" . $codigo . "';";
          $acces->delete($querya);
          if($acces->insert($querya)) {
               $res = true;
          } else {
               $res = false;
          }

          $acces->close();
          return $res;
     }


     public function getCountFacturaByIdAndCodigo($id, $codigo){
          $query    = "SELECT COUNT(*) as qtt FROM factura WHERE id != " . $id . " and codigo = '" . $codigo . "';";
          $acces    = new TMysqlAcces();

          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Factura no encontrada no encontrado.";

          $acces->close();
          return $res[0];
     }






//todo
     public function getFacturasByNombreCliente($nombre){
          $query    = "SELECT * FROM cliente WHERE id = " . $nombre . ";";
          $acces    = new TMysqlAcces();
          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Cliente no encontrado.";

          $acces->close();
          return $res;
     }



//todo
     public function getFacturasByMatricula($id){
          $query    = "SELECT * FROM cliente WHERE id = " . $id . ";";
          $acces    = new TMysqlAcces();
          if($acces->select($query))
               $res      = $acces->getDataQuery();
          else
               $res = "Error: Cliente no encontrado.";

          $acces->close();
          return $res;
     }



}