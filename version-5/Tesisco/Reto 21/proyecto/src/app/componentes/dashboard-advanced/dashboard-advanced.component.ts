import { Component, OnInit } from '@angular/core';


import { AssessmentService } from 'src/app/servicios/assessment/assessment.service';
import * as CryptoJS from 'crypto-js';

import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';
import { Router } from '@angular/router';



import {
  ChartColor,
  ChartDatasets,
  ChartLabel,
  ChartOptions,
} from "@rinminase/ng-charts";

@Component({
  selector: 'app-dashboard-advanced',
  templateUrl: './dashboard-advanced.component.html',
  styleUrls: ['./dashboard-advanced.component.css']
})
export class DashboardAdvancedComponent implements OnInit {

  documento:any = '';
  

  textToConvert: string|any;
  password: string = 'gKB&uH0MZQVfJA1fE%aW';

  listUserData:any;

  listMeasures:any;
  listGenerales:any;
  listMasaMuscular:any;
  listGrasaCorporal:any;

  genero:any;
  resultado:any;

  oseaAuxiliar:any = '';
  grasaVisceralAuxiliar:any = '';
  aguaCorporalAuxiliar:any = '';
  imcAuxiliar:any = '';
  grasaCorporalAuxiliar:any = '';

  role:any;

  constructor(
    private service: AssessmentService,
    private auth: AuthUsersService,
    private router: Router
  ) {

    this.textToConvert = localStorage.getItem('assessment');
    this.decrypt();
    this.updateData();

    this.role = localStorage.getItem('session');
   }

  ngOnInit(): void {
  }

  decrypt(){
    this.documento = CryptoJS.AES.decrypt(this.textToConvert.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
  }

  arrayBufferToBase64( buffer:any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
  }

  updateData(){

    const documento = this.documento;
    let form = {documento};
    this.auth.selectInfoGeneralUser(form).subscribe(res => {

      this.listUserData = res;

    });

    this.service.selectMeasuresUserAdvanced(form).subscribe(res => {

      this.listMeasures = res;

      for(let x of this.listMeasures){
        this.data_pecho = [...this.data_pecho, x.pecho];
        this.data_abdomen = [...this.data_abdomen, x.abdomen];
        this.data_gluteo = [...this.data_gluteo, x.gluteo];

        this.data_brazo_derecho = [...this.data_brazo_derecho, x.brazo_derecho];
        this.data_brazo_izquierdo = [...this.data_brazo_izquierdo, x.brazo_izquierdo];
        this.data_antebrazo_derecho = [...this.data_antebrazo_derecho, x.antebrazo_derecho];
        this.data_antebrazo_izquierdo = [...this.data_antebrazo_izquierdo, x.antebrazo_izquierdo];

        this.data_pierna_derecha = [...this.data_pierna_derecha, x.pierna_derecha];
        this.data_pierna_izquierda = [...this.data_pierna_izquierda, x.pierna_izquierda];
        this.data_pantorrilla_derecha = [...this.data_pantorrilla_derecha, x.pantorrilla_derecha];
        this.data_pantorrilla_izquierda = [...this.data_pantorrilla_izquierda, x.pantorrilla_izquierda];

      }


      this.updateData_Pecho();
      this.updateData_Brazos();
      this.updateData_Piernas();
    });



    this.service.selecGeneralesAdvanced(form).subscribe(res => {

      this.listGenerales = res;

      for(let x of this.listGenerales){

        this.data_imc = [...this.data_imc ,x.imc ];
        this.data_peso = [...this.data_peso,x.peso];

        this.data_bmr = [...this.data_bmr, x.bmr];
        this.data_grasa_visceral = [...this.data_grasa_visceral, x.grasa_visceral];
        this.data_k_caloria = [...this.data_k_caloria, x.k_caloria];

        this.chartLabels = [...this.chartLabels,"Fecha: " + x.fecha.substring(0,10)];

      }

      this.uploadData_generales();
    });

      this.service.selectMasaMuscular(form).subscribe(res => {

        this.listMasaMuscular = res;

        for(let x of this.listMasaMuscular){

          this.data_masa_torso = [...this.data_masa_torso, x.torso];
          this.data_masa_brazo_derecho = [...this.data_masa_brazo_derecho, x.brazo_derecho];
          this.data_masa_brazo_izquierdo = [...this.data_masa_brazo_izquierdo, x.brazo_izquierdo];
          this.data_masa_pierna_derecha = [...this.data_masa_pierna_derecha, x.pierna_derecha];
          this.data_masa_pierna_izquierda = [...this.data_masa_pierna_izquierda, x.pierna_izquierda];

        }

        this.uploadData_MasaMuscular();
      });

    this.service.selectGrasaCorporalAdvanced(form).subscribe(res => {

      this.listGrasaCorporal = res;
      console.log(res);
      for(let x of this.listGrasaCorporal){

        this.data_grasa_torso = [...this.data_grasa_torso, x.torso];
        this.data_grasa_brazo_derecho = [...this.data_grasa_brazo_derecho, x.brazo_derecho];
        this.data_grasa_brazo_izquierdo = [...this.data_grasa_brazo_izquierdo, x.brazo_izquierdo];
        this.data_grasa_pierna_derecha = [...this.data_grasa_pierna_derecha, x.pierna_derecha];
        this.data_grasa_pierna_izquierda = [...this.data_grasa_pierna_izquierda, x.pierna_izquierda];

      }


      this.uploadData_GrasaCorporal();
    });



  }



  uploadData_generales(){

    this.chartData_imc = [
      {
        data: this.data_imc,
        label: 'Imc'
      },
      {
        data: this.data_peso,
        label: 'Peso'
      }

    ];

    this.chartData_masaOsea = [
      {
        data: this.data_bmr,
        label: 'BMR'
      },
      {
        data: this.data_grasa_visceral,
        label: 'Grasa Visceral'
      },
      {
        data: this.data_k_caloria,
        label: 'K/Calorias'
      }
    ];

  }

  uploadData_MasaMuscular(){

    this.chartData_MasaMuscular = [
      {
        data: this.data_masa_torso,
        label: 'Torso'
      },
      {
        data: this.data_masa_brazo_derecho,
        label: 'Brazo Derecho'
      },
      {
        data: this.data_masa_brazo_izquierdo,
        label: 'Brazo Izquierdo'
      },
      {
        data: this.data_masa_pierna_derecha,
        label: 'Pierna Derecha'
      },
      {
        data: this.data_masa_pierna_izquierda,
        label: 'Pierna Izquierda'
      }


    ];

  }

  uploadData_GrasaCorporal(){

    this.chartData_GrasaCorporal = [
      {
        data: this.data_grasa_torso,
        label: 'Torso'
      },
      {
        data: this.data_grasa_brazo_derecho,
        label: 'Brazo Derecho'
      },
      {
        data: this.data_grasa_brazo_izquierdo,
        label: 'Brazo Izquierdo'
      },
      {
        data: this.data_grasa_pierna_derecha,
        label: 'Pierna Derecha'
      },
      {
        data: this.data_grasa_pierna_izquierda,
        label: 'Pierna Izquierda'
      }
    ];

  }

  updateData_Pecho(){

    this.chartData1 = [
      {
        data: this.data_pecho,
        label: 'Pecho'
      },
      {
        data: this.data_abdomen,
        label: 'Abdomen'
      },
      {
        data: this.data_gluteo,
        label: 'Gluteo'
      }

    ];

  }

  updateData_Brazos(){

    this.chartData2 = [
      {
        data: this.data_brazo_derecho,
        label: 'Brazo Derecho'
      },
      {
        data: this.data_brazo_izquierdo,
        label: 'Brazo Izquierdo'
      },
      {
        data: this.data_antebrazo_derecho,
        label: 'Antebrazo Derecho'
      },
      {
        data: this.data_antebrazo_izquierdo,
        label: 'Antebrazo Izquierdo'
      },
    ];

  }

  updateData_Piernas(){

    this.chartData3 = [
      {
        data: this.data_pierna_derecha,
        label: 'Pierna Derecha'
      },
      {
        data: this.data_pierna_izquierda,
        label: 'Pierna Izquierda'
      },
      {
        data: this.data_pantorrilla_derecha,
        label: 'Pantorrilla Derecha'
      },
      {
        data: this.data_pantorrilla_izquierda,
        label: 'Pantorrilla Izquierda'
      },
    ];

  }






  cutImc(imc:any){
    const resultado:string =  String(imc); 
    return resultado.substring(0,5);
  }

  validateImc(imc:any){
    let resultado:any = '';
    if(imc < 18.5){
      resultado = "Bajo peso";
    }else if(imc >= 18.5 && imc <= 24.9){
      resultado = "Normal";
    }else if(imc >= 25 && imc <= 29.9){
      resultado = "Sobrepeso";
    }else if(imc >= 30 && imc <= 34.9){
      resultado = "Obesidad Tipo 1";
    }else if(imc >= 35 && imc <= 39.9){
      resultado = "Obesidad Tipo 2";
    }else if(imc >= 40){
      resultado = "Obesidad Tipo 3";
    } 

    return resultado;
  }

  validateImcSee(imc:any){
    if(imc < 18.5){
      this.imcAuxiliar = 'imc';
    }else if(imc >= 18.5 && imc <= 24.9){
      this.imcAuxiliar = 'bien_imc';
    }else if(imc >= 25 && imc <= 29.9){
      this.imcAuxiliar = 'imc';
    }else if(imc >= 30 && imc <= 34.9){
      this.imcAuxiliar = 'imc';
    }else if(imc >= 35 && imc <= 39.9){
      this.imcAuxiliar = 'imc';
    }else if(imc >= 40){
      this.imcAuxiliar = 'imc';
    } 

  }




  //Validación de agua corporal----------------------------------------------

  validateAguaCorporal(porcentaje:any,genero:any){

    let response:any = '';
    if(genero == 'Masculino'){

      if(porcentaje >= 50 && porcentaje <= 65){
        response =  'Nivel saludable';
      }else if(porcentaje < 50){
        response = 'Por debajo del nivel saludable';
      }else if(porcentaje > 65){
        response = 'Por encima del nivel saludable';
      }

    }else if(genero == 'Femenino'){

      if(porcentaje >= 45 && porcentaje <= 60){
        response =  'Nivel saludable';
      }else if(porcentaje < 45){
        response = 'Por debajo del nivel saludable';
      }else if (porcentaje > 60){
        response = 'Por encima del nivel saludable'
      }

    }
    return response;
  }


  validateAguaCorporalSee(porcentaje:any,genero:any){


    if(genero == 'Masculino'){

      if(porcentaje >= 50 && porcentaje <= 65){
        this.aguaCorporalAuxiliar = 'bien_agua';
      }else if(porcentaje < 50){
        this.aguaCorporalAuxiliar = 'agua';
      }else if(porcentaje > 65){
        this.aguaCorporalAuxiliar = 'agua';
      }

    }else if(genero == 'Femenino'){

      if(porcentaje >= 45 && porcentaje <= 60){
        this.aguaCorporalAuxiliar = 'bien_agua';
      }else if(porcentaje < 45){
        this.aguaCorporalAuxiliar = 'agua';
      }else if (porcentaje > 60){
        this.aguaCorporalAuxiliar = 'agua';
      }

    }

  }

  //Validación de agua corporal--------------------------------------------------


  //Validación de grasa visceral-------------------------------------------------

  evaluateGrasaVisceral(porcentaje:any){
    let resultado:any = '';
    if(porcentaje >= 1 && porcentaje <= 3){
      resultado = 'Saludable e Ideal';
    }else if(porcentaje >= 4 && porcentaje <= 6){
      resultado = 'Intermedio';
    }else if(porcentaje >= 7 && porcentaje <= 8){
      resultado = 'Riesgo';
    }else if(porcentaje >= 9 && porcentaje <= 11){
      resultado = 'Alto Riesto';
    }else if(porcentaje >= 12){
      resultado = 'Riesgo Cardiovascular';
    }
    return resultado;
  }

  evaluateGrasaVisceralSee(porcentaje:any){
    if(porcentaje >= 1 && porcentaje <= 3){
      this.grasaVisceralAuxiliar = 'bien_grasa_visceral';
    }else if(porcentaje >= 4 && porcentaje <= 6){
      this.grasaVisceralAuxiliar = 'grasa_visceral';
    }else if(porcentaje >= 7 && porcentaje <= 8){
      this.grasaVisceralAuxiliar = 'grasa_visceral';
    }else if(porcentaje >= 9 && porcentaje <= 11){
      this.grasaVisceralAuxiliar = 'grasa_visceral';
    }else if(porcentaje >= 12){
      this.grasaVisceralAuxiliar = 'grasa_visceral';
    }
  }

  //Validación de grasa visceral--------------------------------------------------








  //Validación de masa osea---------------------------------------------------------------

  validateMasaOsea(porcentaje:any,peso:any,genero:any){
    let resultado:any = '';

    if(genero == 'Femenino'){

      if(peso < 50){
      
        if(porcentaje == 1.95){
          resultado = 'Saludable';
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 1.95){
          resultado = 'Por encima de lo saludable';
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 1.95){
          resultado = 'Por debajo de lo saludabe';
          this.oseaAuxiliar = 'osea';
        }
  
      }else if(peso >= 50 && peso <= 75 ){
  
        if(porcentaje == 2.40){
          resultado = 'Saludable';
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 2.40){
          resultado = 'Por encima de lo saludable';
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 2.40){
          resultado = 'Por debajo de lo saludabe';
          this.oseaAuxiliar = 'osea';
        }

      }else if(peso > 75){

        if(porcentaje == 2.95){
          resultado = 'Saludable';
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 2.95){
          resultado = 'Por encima de lo saludable';
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 2.95){
          resultado = 'Por debajo de lo saludabe';
          this.oseaAuxiliar = 'osea';
        }

      }

    }else if (genero == 'Masculino'){

      if(peso < 65){
      
        if(porcentaje == 2.66){
          resultado = 'Saludable';
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 2.66){
          resultado = 'Por encima de lo saludable';
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 2.66){
          resultado = 'Por debajo de lo saludabe';
          this.oseaAuxiliar = 'osea';
        }
  
      }else if(peso >= 65 && peso <= 95 ){
  
        if(porcentaje == 3.29){
          resultado = 'Saludable';
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 3.29){
          resultado = 'Por encima de lo saludable';
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 3.29){
          resultado = 'Por debajo de lo saludabe';
          this.oseaAuxiliar = 'osea';
        }

      }else if(peso > 95){

        if(porcentaje == 3.69){
          resultado = 'Saludable';
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 3.69){
          resultado = 'Por encima de lo saludable';
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 3.69){
          resultado = 'Por debajo de lo saludabe';
          this.oseaAuxiliar = 'osea';
        }

      }

    }

    return resultado;
  }

  validateMasaOseaSee(porcentaje:any,peso:any,genero:any){

    if(genero == 'Femenino'){

      if(peso < 50){
      
        if(porcentaje == 1.95){
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 1.95){
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 1.95){
          this.oseaAuxiliar = 'osea';
        }
  
      }else if(peso >= 50 && peso <= 75 ){
  
        if(porcentaje == 2.40){
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 2.40){
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 2.40){
          this.oseaAuxiliar = 'osea';
        }

      }else if(peso > 75){

        if(porcentaje == 2.95){
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 2.95){
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 2.95){
          this.oseaAuxiliar = 'osea';
        }

      }

    }else if (genero == 'Masculino'){

      if(peso < 65){
      
        if(porcentaje == 2.66){
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 2.66){
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 2.66){
          this.oseaAuxiliar = 'osea';
        }
  
      }else if(peso >= 65 && peso <= 95 ){
  
        if(porcentaje == 3.29){
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 3.29){
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 3.29){
          this.oseaAuxiliar = 'osea';
        }

      }else if(peso > 95){

        if(porcentaje == 3.69){
          this.oseaAuxiliar = 'bien';
        }else if (porcentaje > 3.69){
          this.oseaAuxiliar = 'osea';
        }else if (porcentaje < 3.69){
          this.oseaAuxiliar = 'osea';
        }

      }

    }


  }

  //Validación de masa osea-------------------------------------------------------------


  //Validación grasa corporal--------------------------------------------------------------

  validateGrasaCorporal(genero:any,porcentaje:any,edad:any){

    let resultado:any = '';

    if(genero == 'Femenino'){

      if(edad >= 18 && edad <= 39){

        if(porcentaje >= 0 && porcentaje <= 20.9){

          resultado = 'Bajo en Grasa';

        }else if(porcentaje >= 21 && porcentaje <= 33.9){

          resultado = 'Saludable';

        }else if (porcentaje >= 34 && porcentaje <= 38.9){

          resultado = 'Alto en Grasa';

        }else if(porcentaje >= 39){

          resultado = 'Obeso';

        }



      }else if(edad >= 40 && edad <= 59){

        if(porcentaje >= 0 && porcentaje <= 22.9){

          resultado = 'Bajo en Grasa';

        }else if(porcentaje >= 23 && porcentaje <= 33.9){

          resultado = 'Saludable';

        }else if(porcentaje >= 34 && porcentaje <= 39.9){

          resultado = 'Alto en Grasa';

        }else if(porcentaje >= 40){

          resultado = 'Obeso';

        }




      }else if(edad >= 60 && edad <= 99){

        if(porcentaje >= 0 && porcentaje <= 23.9){

          resultado = 'Bajo en Grasa';

        }else if(porcentaje >= 24 && porcentaje <= 35.9){

          resultado = 'Saludable';

        }else if(porcentaje >= 36 && porcentaje <= 41.9){

          resultado = 'Alto en Grasa';

        }else if(porcentaje >= 42){

          resultado = 'Obeso';

        }



      }


    }else if(genero == 'Masculino'){

      if(edad >= 18 && edad <= 39){

        if(porcentaje >= 0 && porcentaje <= 7){

          resultado = 'Bajo en grasa';

        }else if(porcentaje >= 8 && porcentaje <= 20){

          resultado = 'Saludable';

        }else if(porcentaje >= 21 && porcentaje <= 25){

          resultado = 'Alto en Grasa';

        }else if(porcentaje > 25){

          resultado = 'Obeso';

        }





      }else if(edad >= 40 && edad <= 69){

        if(porcentaje >= 0 && porcentaje <= 11){

          resultado = 'Bajo en Grasa';

        }else if(porcentaje > 11 && porcentaje <= 22){

          resultado = 'Saludable';

        }else if(porcentaje > 22 && porcentaje <= 28){

          resultado = 'Alto en Grasa';

        }else if(porcentaje > 28){

          resultado = 'Obeso';

        }



      }else if(edad >= 60 && edad <= 99){

        if(porcentaje >= 0 && porcentaje <= 13){

          resultado = 'Bajo en Grasa';

        }else if(porcentaje > 13 && porcentaje <= 25){

          resultado = 'Saludable';

        }else if(porcentaje > 25 && porcentaje <= 30){

          resultado = 'Alto en Grasa';

        }else if(porcentaje > 30){

          resultado = 'Obeso';

        }

      }
      
    }

    return resultado;
  }



  validateGrasaCorporalSee(genero:any,porcentaje:any,edad:any){

    if(genero == 'Femenino'){

      if(edad >= 18 && edad <= 39){

        if(porcentaje >= 0 && porcentaje <= 20.9){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje >= 21 && porcentaje <= 33.9){
          this.aguaCorporalAuxiliar = 'bien_grasa';

        }else if (porcentaje >= 34 && porcentaje <= 38.9){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje >= 39){
          this.aguaCorporalAuxiliar = 'grasa';

        }

      }else if(edad >= 40 && edad <= 59){

        if(porcentaje >= 0 && porcentaje <= 22.9){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje >= 23 && porcentaje <= 33.9){
          this.aguaCorporalAuxiliar = 'bien_grasa';

        }else if(porcentaje >= 34 && porcentaje <= 39.9){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje >= 40){
          this.aguaCorporalAuxiliar = 'grasa';

        }




      }else if(edad >= 60 && edad <= 99){

        if(porcentaje >= 0 && porcentaje <= 23.9){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje >= 24 && porcentaje <= 35.9){
          this.aguaCorporalAuxiliar = 'bien_grasa';

        }else if(porcentaje >= 36 && porcentaje <= 41.9){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje >= 42){
          this.aguaCorporalAuxiliar = 'grasa';

        }



      }


    }else if(genero == 'Masculino'){

      if(edad >= 18 && edad <= 39){

        if(porcentaje >= 0 && porcentaje <= 7){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje >= 8 && porcentaje <= 20){
          this.aguaCorporalAuxiliar = 'bien_grasa';

        }else if(porcentaje >= 21 && porcentaje <= 25){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje > 25){
          this.aguaCorporalAuxiliar = 'grasa';

        }





      }else if(edad >= 40 && edad <= 69){

        if(porcentaje >= 0 && porcentaje <= 11){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje > 11 && porcentaje <= 22){
          this.aguaCorporalAuxiliar = 'bien_grasa';

        }else if(porcentaje > 22 && porcentaje <= 28){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje > 28){
          this.aguaCorporalAuxiliar = 'grasa';

        }



      }else if(edad >= 60 && edad <= 99){

        if(porcentaje >= 0 && porcentaje <= 13){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje > 13 && porcentaje <= 25){
          this.aguaCorporalAuxiliar = 'bien_grasa';

        }else if(porcentaje > 25 && porcentaje <= 30){
          this.aguaCorporalAuxiliar = 'grasa';

        }else if(porcentaje > 30){
          this.aguaCorporalAuxiliar = 'grasa';

        }

      }
      
    }

  }


  //Validación grasa corporal--------------------------------------------------------------




  backToList(){

    const session = localStorage.getItem('session');

    if(session == 'ad_i-dfg9op1_i/'){

      localStorage.removeItem('assessment');
      this.router.navigateByUrl('assessment');

    }else if(session == 'nt_i-dfg12op1_i2/'){

      localStorage.removeItem('assessment');
      this.router.navigateByUrl('ver-valoracion');

    }else if(session == 'en_i-dfg8op1_i/'){

      localStorage.removeItem('assessment');
      this.router.navigateByUrl('valoraciones-entrenador');
      
    }



  }







  chartLabels:ChartLabel|any = [];

  data_imc:any[] = [];
  data_peso:any[] = [];

  data_bmr:any[] = [];
  data_grasa_visceral:any[] = [];
  data_k_caloria:any[] = [];

  data_masa_torso:any[] = [];
  data_masa_brazo_derecho:any[] = [];
  data_masa_brazo_izquierdo:any[] = [];
  data_masa_pierna_derecha:any[] = [];
  data_masa_pierna_izquierda:any[] = [];

  data_grasa_torso:any[] = [];
  data_grasa_brazo_derecho:any[] = [];
  data_grasa_brazo_izquierdo:any[] = [];
  data_grasa_pierna_derecha:any[] = [];
  data_grasa_pierna_izquierda:any[] = [];

  chartData_imc: ChartDatasets|any = [];
  chartData_masaOsea: ChartDatasets|any = [];

  chartData_MasaMuscular:ChartDatasets|any = [];

  chartData_GrasaCorporal:ChartDatasets|any = [];


  data_pecho:any[] = [];
  data_abdomen:any[] = [];
  data_gluteo:any[] = [];
  data_brazo_derecho:any[] = [];
  data_brazo_izquierdo:any[] = [];
  data_antebrazo_derecho:any[] = [];
  data_antebrazo_izquierdo:any[] = [];
  data_pierna_derecha:any[] = [];
  data_pierna_izquierda:any[] = [];
  data_pantorrilla_derecha:any[] = [];
  data_pantorrilla_izquierda:any[] = [];


  chartData1: ChartDatasets|any = [];
  chartData2: ChartDatasets|any = [];
  chartData3: ChartDatasets|any = [];

  chartOptions = {
    responsive: true
  };

  chartColors: ChartColor = [
    {
        // green
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        borderColor: "rgba(76, 175, 80, 1)",
        pointBackgroundColor: "rgba(76, 175, 80, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(76, 175, 80, 0.8)",
    },
    {
        // blue
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        borderColor: "rgba(33, 150, 243, 1)",
        pointBackgroundColor: "rgba(33, 150, 243, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(33, 150, 243, 1)",
    },
    {
        // red
        backgroundColor: "rgba(244, 67, 54, 0.3)",
        borderColor: "rgba(244, 67, 54, 1)",
        pointBackgroundColor: "rgba(244, 67, 54, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(244, 67, 54, 0.8)",
    },
];







}
