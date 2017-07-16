<?php

/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 01/12/2015
 * Time: 19:15
 */
class TVehiculo
{

    private $id;
    private $matricula;
    private $marca;
    private $modelo;

    public function getAllListVehiculo(){
        $query    = "SELECT v.id, v.matricula, v.marca, v.modelo, v.ultima_revision, v.km, c.nombre, c.apellido FROM vehiculo v INNER JOIN cliente c on v.id_cliente = c.id;";



        $acces    = new TMysqlAcces();
        if($acces->select($query))
            $res      = $acces->getDataQuery();
        else
            $res = "Error: Listado no encontrado.";


        //$res      = $acces->mysql_real_escape_string
        $acces->close();
        return $res;
    }

    public function getVehiculoById($id){

        // primero hacer una query, si existen clientes listo listado con INNER, si no, listao sin INNER

        $query    = "SELECT v.id, v.id_cliente, v.matricula, v.marca, v.modelo, v.num_bastidor, v.ultima_revision, v.km, c.nombre, c.apellido
                    FROM vehiculo v inner join cliente c on v.id_cliente = c.id WHERE v.id = " . $id . ";";

        $acces    = new TMysqlAcces();

        if($acces->select($query))
            $res      = $acces->getDataQuery();
        else
            $res = null;

        $acces->close();
        return $res;
    }

    public function getVehiculosByValues($values){
        $like = "WHERE";

        if(!empty($values[0]))
            $like = $like . " v.modelo like '%". $values[0] ."%' AND";

        if(!empty($values[1]))
            $like = $like . " v.marca like '%". $values[1] ."%' AND";

        if(!empty($values[2]))
            $like = $like ." v.matricula like '%". $values[2] ."%' AND";

        if(!empty($values[3]))
            $like = $like . " (c.nombre like '%". $values[3] ."%' OR c.apellido like '%". $values[3] ."%') AND";


        $like = substr_replace($like, "", sizeof($like) - 4) . ";";

        $query    = "SELECT v.id, v.marca, v.modelo, v.matricula, c.nombre, c.apellido,  v.km, v.ultima_revision FROM vehiculo v INNER JOIN cliente c ON v.id_cliente = c.id  " . $like;


        $acces    = new TMysqlAcces();

        if($acces->select($query))
            $res      = $acces->getDataQuery();
        else
            $res = "Error: Cliente no encontrado.";

        $acces->close();
        return $res;
    }

    public function getVehiculoByIdCliente($id_cliente){
        $query    = "SELECT * FROM vehiculo WHERE id_cliente = " . $id_cliente . ";";

        $acces    = new TMysqlAcces();
        if($acces->select($query))
            $res      = $acces->getDataQuery();
        else
            $res = null;

        $acces->close();
        return $res;
    }

    public function getVehiculoByMatricula($matricula){
        $query    = "SELECT * FROM vehiculo WHERE matricula = '" . $matricula . "';";

        $acces    = new TMysqlAcces();
        if($acces->select($query))
            $res      = $acces->getDataQuery();
        else
            $res = null;

        $acces->close();
        return $res;
    }

    public function actualizarVehiculoById($id, $datosEdit){

        $query    = "UPDATE vehiculo
                      SET matricula = '" . $datosEdit[0] . "',
                      marca = '" . $datosEdit[1] . "',
                      modelo = '" . $datosEdit[2] . "',
                      km = '" . $datosEdit[3] . "',
                      num_bastidor = '" . $datosEdit[4] . "',
                      id_cliente = " . $datosEdit[5] . "
                      WHERE id = " . $id . ";";


        $acces    = new TMysqlAcces();
        if($acces->update($query))
            $res = true;
        else
            $res = null;


        $acces->close();
        return $res;
    }

    public function getCountVehiculoById($id){
        $query    = "SELECT COUNT(*) FROM vehiculo WHERE id = " . $id . ";";
        $acces    = new TMysqlAcces();
        if($acces->select($query))
            $res      = $acces->getDataQuery();
        else
            $res = null;

        $acces->close();
        return (int)$res;
    }

    public function getCountVehiculoByIdAndMatricula($id, $matricula){
        $query    = "SELECT COUNT(*) as qtt FROM vehiculo WHERE id = " . $id . "' AND matricula = '" . $matricula . "';";
        $acces    = new TMysqlAcces();
        //var_dump($query);
        if($acces->select($query))
            $res      = $acces->getDataQuery();
        else
            $res = null;

        $acces->close();
        return (int)$res;
    }

    public function getCountVehiculoByMatricula($matricula){
        $query    = "SELECT COUNT(*) as qtt FROM vehiculo WHERE matricula = '" . $matricula . "';";
        $acces    = new TMysqlAcces();

        if($acces->select($query))
            $res      = $acces->getDataQuery();
        else
            $res = null;

        $acces->close();
        return (int)$res[0];
    }

    public function getCountVehiculoInFactura($matricula){
        $query = "SELECT COUNT(*) as qtt FROM factura WHERE matricula = '" . $matricula . "';";
        $acces    = new TMysqlAcces();


        if($acces->select($query))
            $res      = $acces->getDataQuery();
        else
            $res = null;

        $acces->close();
        return $res[0];
    }

    //public function getCountVehiculoInCliente($id_cliente){
    //    $query = "SELECT COUNT(*) as qtt FROM factura WHERE id_cliente = " . $id_cliente. ";";
    //  $acces    = new TMysqlAcces();
    ////
    //if($acces->select($query))
    //      $res      = $acces->getDataQuery();
    //  else
    ////      $res = null;

//        $acces->close();
    //      return $res[0];
    // }

    public function deleteVehiculo($matricula){
        $query = "DELETE FROM vehiculo WHERE matricula = '" . $matricula . "';";
        $acces    = new TMysqlAcces();

        if($acces->delete($query))
            $res = true;
        else
            $res = false;

        $acces->close();
        return $res;
    }

    public function deleteVehiculoByCliente($id_cliente){
        $query = "DELETE FROM vehiculo WHERE id_cliente = '" . $id_cliente . "';";
        $acces    = new TMysqlAcces();

        if($acces->delete($query))
            $res = true;
        else
            $res = false;

        $acces->close();
        return $res[0];
    }

    public function crearVehiculoByDatos($datosCreate){
        $str = null;

        $query = "INSERT INTO vehiculo (matricula, marca, modelo, km, num_bastidor, id_cliente)
                    VALUES ('" . $datosCreate[0] . "',  '" . $datosCreate[1]. "', '" . $datosCreate[2] . "', '" . $datosCreate[3] . "', '" . $datosCreate[4] . "', " . $datosCreate[5] . ");";

        $acces    = new TMysqlAcces();
        if($acces->insert($query))
            $res = true;
        else
            $res = false;

        $acces->close();
        return $res;
    }


}