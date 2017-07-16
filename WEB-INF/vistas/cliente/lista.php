<?php
/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 19/08/15
 * Time: 17:22
 *
 * Listado en el Modulo de Clientes.
 *
 * Recojer el listado de todos los clientes, y pasarlos a /tags-vista/listado  y ahi constrye la tabla.
 *
 */

     include_once ("../../../core/php/dao/ControlCliente.php");


     $control = new ControlCliente();
     $lisadoClientes = $control->devuelveListadoClientes();

     var_dump($lisadoClientes);



?>

<table>
     <tr>
          <td></td>
     </tr>
</table>



