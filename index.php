<?php

     session_start();
     require_once('assets/spyc-master/Spyc.php');
     $data = Spyc::YAMLLoad('terms-form-action.yaml');

     // definimos una variable de session para saber donde se esta en cada momento
     $_SESSION['lugar_pagina'] = "login";


?>

<html>
<head>	
	<title>Taller Lavi</title>

    <meta http-equiv="Content-Type" content="text/html;charset=ISO-8859-8">
    <meta charset="UTF-8">

     <script type="text/javascript" src="jquery/jquery1.11.3.min.js"></script>
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>

    <link rel="stylesheet" href="/resources/demos/style.css">
     <script type="text/javascript" src="assets/bootstrap3.3.5/js/bootstrap.min.js"></script>
     <script type="text/javascript" src="assets/foundation-5.5.2/js/foundation.min.js"></script>
     <script type="text/javascript" src="assets/foundation-5.5.2/js/foundation/foundation.alert.js"></script>
     <script type="text/javascript" src="core/js/functions.js"></script>
     <script type="text/javascript" src="core/js/solicitudes-ajax.js"></script>
     <script type="text/javascript" src="core/js/solicitudes-cliente.js"></script>
     <script type="text/javascript" src="core/js/solicitudes-factura.js"></script>
     <script type="text/javascript" src="core/js/solicitudes-coche.js"></script>
    <script type="text/javascript" src="core/js/solicitudes-concepto.js"></script>
     <script type="text/javascript" src="core/js/constructores.js"></script>
     <script type="text/javascript" src="core/js/constructor-vista.js"></script>
     <script type="text/javascript" src="core/js/constructor-filtro.js"></script>
     <script type="text/javascript" src="core/js/constructor-tabla.js"></script>


     <link href='http://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400italic' rel='stylesheet' type='text/css'>

    <link rel="stylesheet" type="text/css" href="./assets/datepick-master/jquery.datepick.css">
    <link rel="stylesheet" type="text/css" href="./assets/bootstrap3.3.5/css/bootstrap.min.css">
     <link rel="stylesheet" type="text/css" href="./assets/bootstrap3.3.5/css/bootstrap-theme.min.css">
     <link rel="stylesheet" type="text/css" href="./assets/foundation-5.5.2/css/foundation.min.css">



	<link rel="stylesheet" type="text/css" href="styles/style-general.css">
	<link rel="stylesheet" type="text/css" href="styles/style-login.css">
     <link rel="stylesheet" type="text/css" href="styles/style-vista-general.css">
     <link rel="stylesheet" type="text/css" href="styles/style-tablas-listado.css">
     <link rel="stylesheet" type="text/css" href="styles/style-vista-cliente.css">
     <link rel="stylesheet" type="text/css" href="styles/style-formulario.css">
     <link rel="stylesheet" type="text/css" href="styles/style-filtros-listado.css">
     <link rel="stylesheet" type="text/css" href="styles/style-tag/style-tag-button.css">
     <link rel="stylesheet" type="text/css" href="styles/style-tag/style-tag-validations-errors.css">


	

	
	
</head>



<body>
     <div class="super-container">
	<div class="container">

           <div data-alert id='alert-level1' class='alert-box success radius alert-absolute' onclick='hideValidationAlert()'>
                <label class='label-alerta'>Datos guardados correctamente.</label><a class='close'>&times;</a>
           </div>

           <div class="div-general-top">
                       <div class="div-general-title">
                             <span class="span-general-title">Taller Lavi</span>
                       </div>
                 </div>

                <div class="div-menu-top">
                          <nav>
                               <ul class="menu">
                                    <li style="width: 18px; border-left: solid 0px; ">&nbsp;</li>
                                    <li  id="factura"><a onclick="actionVerListadoFacturas()">FACTURAS  <br><img src="./resources/sacoDolar.png"></a></li>
                                    <li style="width: 18px;">&nbsp;</li>
                                    <li  id="cliente"><a onclick="actionVerListadoClientes()">CLIENTES <br><img src="./resources/cliente.png"></a></li>
                                    <li style="width: 18px;">&nbsp;</li>
                                    <li  id="coche"><a  onclick="actionVerListadoVehiculos()"><i class="icon-camera"></i>COCHES<br><img src="./resources/vehiculo.png"></a></li>
                                    <li style="width: 18px;">&nbsp;</li>
                                    <li  id="salir"><a  href="#"><i class="icon-bullhorn"></i>SALIR<br><img src="./resources/logout.ico"></a></li>
                                    <li style="width: 18px; border-right: 0px;">&nbsp;</li>
                               </ul>
                          </nav>
                </div>
               <div class="container-interior">

               </div>



      </div>
</div>

</body>






</html>