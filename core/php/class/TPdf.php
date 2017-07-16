<?php

/**
 * Created by PhpStorm.
 * User: lleir
 * Date: 29/12/2015
 * Time: 23:12
 */

include_once ("../../../assets/fpdf/fpdf.php");

class TPdf{


    public function exportarPdf($factura, $cliente, $conceptos){


        $pdf = new FPDF('P','mm','A4');
        $pdf->AddPage();
        $pdf->SetFont('Arial','B',16);
        $this->datosMecanico($pdf);
        $this->tablaCliente($pdf, $cliente, $factura);
        $this->crearFilas($pdf, $conceptos, $cliente, $factura);
        $this->totales($pdf, $factura);
        $this->Footer($pdf);

        if(!file_exists("C:/Facturas 2017/")) {
           mkdir("C:/Facturas 2017", 0700);
        }
        $pdf->Output("C:/Users/jobe/Desktop/FACTURES 2017/LAVI" . utf8_decode($factura["codigo"]) . "_" . utf8_decode($factura['nombre']) . "_" . utf8_decode($factura['apellido']) . ".pdf");
    }



    private function datosMecanico($pdf){

        $pdf->Image("../../../resources/tallerlavi.jpg" , 25 , 25, 25 , 25 , "JPG" ,"");

        $pdf->SetXY(62, 25);
        $pdf->SetFont('Arial',"", 8.5);
        $pdf->Cell(20,7,"Josep Bellavista Rogé","", 1, "C");
        $pdf->Ln();

        $pdf->SetXY(62, 29);
        $pdf->SetFont('Arial',"", 8.5);
        $pdf->Cell(20,7,"N.I.F 77.289.449 L","", 1, "C");
        $pdf->Ln();

        $pdf->SetXY(62, 33);
        $pdf->SetFont('Arial',"", 8.5);
        $pdf->Cell(20,7,"Nº Reg. RASIC -005004968","", 1, "C");
        $pdf->Ln();

        $pdf->SetXY(62, 33);
        $pdf->Cell(20,7,"","B", 1, "C");
        $pdf->Ln();

        $pdf->SetXY(62, 39);
        $pdf->SetFont('Arial',"", 8.5);
        $pdf->Cell(20,7,"Camí Romà, 28","", 1, "C");
        $pdf->Ln();

        $pdf->SetXY(62, 44);
        $pdf->SetFont('Arial',"", 8.5);
        $pdf->Cell(20,7,"Tel. 93 849 20 10","", 1, "C");
        $pdf->Ln();

        $pdf->SetXY(62, 49);
        $pdf->SetFont('Arial',"", 8.5);
        $pdf->Cell(20,7,"08402 GRANOLLERS","", 1, "C");
        $pdf->Ln();

        $pdf->SetXY(62, 53);
        $pdf->SetFont('Arial',"", 8.5);
        $pdf->Cell(20,7,"(Barcelona)","", 1, "C");
        $pdf->Ln();
    }

    private function tablaCliente($pdf, $cliente, $factura){
        $pdf->SetXY(125, 20);
        $pdf->SetFont('Arial','B',9.5);
        $pdf->Cell(10,7," Data:", "", 1, "");
        $pdf->SetXY(140, 20);
        $pdf->SetFont('Arial','',8.5);
        $pdf->Cell(15,7,$factura['fecha'], "", 1, "");

        $pdf->SetFont('Arial','B',11);
        $pdf->SetXY(162, 20);
        $pdf->Cell(15,7," Nº Fac:", "", 1, "");
        $pdf->SetFont('Arial','',13);
        $pdf->SetXY(182, 20);
        $pdf->Cell(15,7,$factura['codigo'], "", 1, "");
        $pdf->Ln();

        $pdf->SetFont('Arial','B',9.5);
        $pdf->SetXY(95, 28);
        $pdf->Cell(15,7,"Client:", "", 1, "");
        $pdf->SetFont('Arial','',9.5);
        $pdf->SetXY(110, 28);
        $pdf->Cell(25,7, utf8_decode($factura['nombre']) . " " . utf8_decode($factura['apellido']), "", 1, "");
        $pdf->Ln();

        $pdf->SetXY(95, 33);
        $pdf->SetFont('Arial','B',9.5);
        $pdf->Cell(15,7,"NIF o CIF:", "", 1, "");
        $pdf->SetXY(115, 33);
        $pdf->SetFont('Arial','', 9);
        $pdf->Cell(15,7,$cliente['nif'], "", 1, "");

        $pdf->SetXY(145, 33);
        $pdf->SetFont('Arial','B',9.5);
        $pdf->Cell(15,7,"Teléfon:", "", 1, "");
        $pdf->SetXY(160, 33);
        $pdf->SetFont('Arial','', 9);
        $pdf->Cell(15,7, $cliente['telefono'], "", 1, "");
        $pdf->Ln();


        $pdf->SetFont('Arial','B',9.5);
        $pdf->SetXY(95, 38);
        $pdf->Cell(15,7,"Domicili:", "", 1, "");
        $pdf->Ln();
        $pdf->SetFont('Arial','',9);
        $pdf->SetXY(112, 38);
        $pdf->Cell(25,7, utf8_decode($factura["direccion"]), "", 1, "");
        $pdf->SetXY(160, 38);
        $pdf->Ln();

        $pdf->SetXY(95, 43);
        $pdf->SetFont('Arial','B',9.5);
        $pdf->Cell(15,7,"Localitat:", "", 1, "");
        $pdf->SetXY(112, 43);
        $pdf->SetFont('Arial','', 9);
        $pdf->Cell(15,7, $cliente['localidad'], "", 1, "");
        $pdf->Ln();

        $pdf->SetFont('Arial','B',9.5);
        $pdf->SetXY(95, 48);
        $pdf->Cell(15,7,"Vehicle:", "", 1, "");

        $pdf->SetXY(110, 48);
        $pdf->SetFont('Arial','',9);
        $pdf->Cell(45,7, " " . utf8_decode($factura["marca"]) . " (" . utf8_decode($factura["modelo"]) . ")", "", 1, "L");
        $pdf->Ln();

        $pdf->SetFont('Arial','B',9.5);
        $pdf->SetXY(95, 53);
        $pdf->Cell(10,7,"Matricula:", "", 1, "");

        $pdf->SetXY(115, 53);
        $pdf->SetFont('Arial','',9);
        $pdf->Cell(5,7, $factura['matricula'], "", 1, "L");

        $pdf->SetFont('Arial','B',9.5);
        $pdf->SetXY(135, 53);
        $pdf->Cell(5,7,"KM:", "", 1, "");

        $pdf->SetXY(142, 53);
        $pdf->SetFont('Arial','',9);
        $pdf->Cell(15,7, utf8_decode($factura['quilometros']), "", 1, "L");

        $pdf->SetFont('Arial','B',9.5);
        $pdf->SetXY(162, 53);
        $pdf->Cell(10,7,"Preu/Hora:", "", 1, "");

        $pdf->SetXY(180, 53);
        $pdf->SetFont('Arial','',9);
        $pdf->Cell(15,7, "", "", 1, "");

        $pdf->Ln();


        // border top
        $pdf->SetXY(95, 27);
        $pdf->Cell(98,7, "", "T", 1, "");

        // border bottom
        $pdf->SetXY(95, 53);
        $pdf->Cell(98,7, "", "B", 1, "");



        // border Left
        $pdf->SetXY(95, 27);
        $pdf->Cell(98, 33, "", "L", 1, "");

        // border right
        $pdf->SetXY(95, 27);
        $pdf->Cell(98, 33, "", "R", 1, "");


    }

    private function setCabecera($pdf){
        $pdf->SetXY(25, 70);
        $pdf->SetFont('Arial', 'B', 10);
        $pdf->Cell(35, 7, "Tipus de Concepte. ", "", 1);
        $pdf->SetXY(60, 70);
        $pdf->Cell(20, 7, "Qtt. ", "B", 1);
        $pdf->SetXY(80, 70);
        $pdf->Cell(55, 7, "Detalls de la mà d'Obra o Recambis ", "", 1, "C");
        $pdf->SetXY(150, 70);
        $pdf->Cell(25, 7, " Preu ", "", 1, "C");
        $pdf->SetXY(160, 70);
        $pdf->Cell(36, 7, " Import ", "", 1, "C");

        $pdf->SetXY(25, 70);
        $pdf->Cell(165, 7, " ", "B", 1, "");

    }

    private function crearFilas($pdf, $conceptos, $cliente, $factura){

        $manoobrasize = sizeof($conceptos['manoobra']);
        $recambiossize= sizeof($conceptos['recambios']);
        $conceptossize = ($manoobrasize + $recambiossize);
        $c['conceptos'] = "";

        if($conceptossize != 0){

        }

        $ccont = 0;
        // for de conceptos...
        while ($ccont < $conceptossize) {
            for ($conceptom = 0; $conceptom < sizeof($conceptos['manoobra']); $conceptom++) {
                $c['conceptos'][$ccont] = $conceptos['manoobra'][$conceptom];
                $ccont++;;
            }

            for ($conceptom = 0; $conceptom < sizeof($conceptos['recambios']); $conceptom++){
                $c['conceptos'][$ccont] = $conceptos['recambios'][$conceptom];
                $ccont++;
            }
        }

        $this->setCabecera($pdf);
        $posx = 77;

        $posinicioconcepto = $posx;
        $linesconcepts = 0;

        if($conceptossize != 0) {
            // recorro todos los concepts
            for ($contcon = 0; $contcon < $conceptossize; $contcon++) {

                //var_dump($pdf->GetX());
                //if ($pdf->GetX() > 160|| $pdf->GetX() > 260) {
                if($linesconcepts > 30 || $linesconcepts > 18 ){
                //if($pdf->GetX() > 170 && $pdf->GetX() < 210){
                    $pdf->AddPage();
                    $this->datosMecanico($pdf);
                    $this->tablaCliente($pdf, $cliente, $factura);
                    $this->setCabecera($pdf);
                    $posx = 77;
                    $posinicioconcepto = $posx;
                    $linesconcepts = 0;
                }

                    $pdf->SetFont('Arial', '', 9);

                    $importe = number_format($c['conceptos'][$contcon]['cantidad'] * $c['conceptos'][$contcon]['importe'], 2, ",", ".");
                    $posx = $posx + 8;



                    $pdf->SetXY(25, $posinicioconcepto);
                    $pdf->Cell(35, 7, ($c['conceptos'][$contcon]['tipo'] == 1 ? "Mà d'Obra" : "Recanvi"));
                    $pdf->SetXY(60, $posinicioconcepto);
                    $pdf->Cell(20, 7,  $c['conceptos'][$contcon]['cantidad']);


                    // TOTAL DETALLE
                    $longicadena = strlen($c['conceptos'][$contcon]['detalle']);       // total lenght cadena detalle
                    $cadena = $c['conceptos'][$contcon]['detalle'];                    // cadena string
                    $linea = "";                                                    // cadena donde se almcenan lineas
                    // si pasa de 35 chars, hay que cortarla, he ira en mas lineas
                    // separo cadena por espacios
                    if($longicadena > 35){
                        $lineaCadena = 0;
                        $arr= explode(" ", $cadena);
                        $arrLine = [];
                        $cont = 0;

                        //var_dump( sizeof($arr));
                        //$a = sizeof($arr);

                        // recorro el string separado
                        for($txt = 0; $txt < sizeof($arr); $txt++) {
                            $cont = $txt;
                            $palabraActual = $arr[$txt];

                            //var_dump("[[[[[[Linea strlen actual " .strlen($linea) . " strlen actual palabra " . strlen($palabraActual) . " Palabra = " . $palabraActual . " ]]]]]]]]]");

                            if ((strlen($linea) + strlen($palabraActual)) <= 43) {
                                $linea = $linea . " " . $palabraActual;
                                //var_dump($linea);
                            } else {
                                $arrLine[$lineaCadena] = $linea;
                                $lineaCadena++;
                                $linea = "";
                                $txt = $txt -1;
                            }


                            if((strlen($linea) + strlen($palabraActual)) <= 35 && $cont == sizeof($arr)-1){
                                $lengstr = strlen($palabraActual);
                                $linea = $linea . " " . $palabraActual;
                                $linea = substr($linea, 0, ($linea - strlen($palabraActual) - 1));

                                $arrLine[$lineaCadena] = $linea;
                            }
                            //die($linea . "palabra actual" . $palabraActual);
                        }
                    } else {
                        $arrLine[0] = $cadena;
                    }


                    $posx = $posinicioconcepto;
                    for($counline = 0; $counline < sizeof($arrLine); $counline++){

                        if($counline != 0)
                            $posinicioconcepto = $posinicioconcepto + 4;

                        $pdf->SetFont('Arial', '', 9);
                        $pdf->SetXY(70, $posinicioconcepto);
                        $pdf->Cell(55, 7, utf8_decode($arrLine[$counline]));
                        $linesconcepts++;
                    }


                    $pdf->SetXY(160, $posx);
                    $pdf->Cell(15, 7,  $c['conceptos'][$contcon]['importe']);
                    $pdf->SetXY(176, $posx);
                    $pdf->Cell(15, 7, $importe, "", 1, "R");
                    $posinicioconcepto = $posinicioconcepto +  8;

                    unset($arrLine);

                }
        }
    }

    private function totales($pdf, $factura){
        $pdf->SetXY(115, 235);
        $pdf->SetFont('Arial','', 9);
        $pdf->Cell(35,7, "MÀ D'OBRA:","", 1, "R");
        $pdf->SetXY(165, 235);
        $pdf->Cell(15,7, number_format($factura['mano_obra'], 2, ",", ".") . " € ","", 1, "R");
        $pdf->Ln();

        $pdf->SetXY(115, 240);
        $pdf->Cell(35,7, "RECANVIS:","", 1, "R");
        $pdf->SetXY(165, 240);
        $pdf->Cell(15,7, number_format($factura['recanvios'], 2, ",", ".") . " € ","", 1, "R");
        $pdf->Ln();


        $pdf->SetXY(115, 245);
        $pdf->Cell(35,7, "SUMEN:","", 1, "R");
        $pdf->SetXY(165, 245);
        $pdf->Cell(15,7, number_format($factura['suman'], 2, ",", ".") . " € ","", 1, "R");
        $pdf->Ln();


        $pdf->SetXY(115, 250);
        $pdf->Cell(35,7, "IVA " . $factura['iva'] . " %:", "", 1, "R");
        $pdf->SetXY(165, 250);
        $pdf->Cell(15,7, number_format($factura['iva_total'], 2, ",", ".") . " € ","", 1, "R");
        $pdf->Ln();

        $pdf->SetFont('Arial','B', 10);
        $pdf->SetXY(115, 255);
        $pdf->Cell(35,7, "TOTAL:", "", 1, "R");
        $pdf->SetFont('Arial','', 9);
        $pdf->SetXY(165, 255);
        $pdf->Cell(15,7, number_format($factura['total'], "2", ",", ".") . " € ","", 1, "R");
        $pdf->Ln();

        $pdf->SetXY(20, 235);
        $pdf->Cell(35,7, "VIST I PLAU:", "", 1, "R");


        $pdf->SetXY(20, 260);
        $pdf->Cell(160,7, "","B", 1, "R");
    }

    private function Footer($pdf)
    {
        //Posición: a 1,5 cm del final
        $pdf->SetY(265);
        //Arial italic 8
        $pdf->SetFont('Arial','I',6);
        //Número de página
        $pdf->Cell(0,10,'Aquesta reparació resta garantida d’acord amb la LLei 23/03 i el Decret 298/1993 de la Generalitat, llevat els materials de desgast que ho són segons el quilometratge i l’ús indicat pel fabricant.',0,0,'C');
    }




}

