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
  selector: 'app-dashboard-basic',
  templateUrl: './dashboard-basic.component.html',
  styleUrls: ['./dashboard-basic.component.css']
})
export class DashboardBasicComponent implements OnInit {

  documento:any = '';

  textToConvert: string|any;
  password: string = 'gKB&uH0MZQVfJA1fE%aW';

  listMeasures:any;
  listGenerales:any;

  listUserData:any;

  imcAuxiliar:any = '';

  role:any;

  constructor(
    private service: AssessmentService,
    private auth: AuthUsersService,
    private router: Router
  ) {

    this.textToConvert = localStorage.getItem('assessment');
    this.decrypt();

    this.updateData();

    const documento = this.documento;
    let form = {documento};
    console.log(documento);
    this.auth.selectInfoGeneralUser(form).subscribe(res => {

      this.listUserData = res;

    });

    this.role = localStorage.getItem('session');

   }

  ngOnInit(): void {
  }

  decrypt(){
    this.documento = CryptoJS.AES.decrypt(this.textToConvert.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
  }

  updateData(){

    const documento = this.documento;
    let form = {documento};

    this.service.selectMeasuresOfUser(form).subscribe(res => {

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



    this.service.selectImc(form).subscribe(res => {

      this.listGenerales = res;

      for(let x of this.listGenerales){

        this.data_imc = [...this.data_imc,x.imc];
        this.data_peso = [...this.data_peso,x.peso];

        this.chartLabels = [...this.chartLabels,"Fecha: " + x.fecha.substring(0,10)];

      }

      this.uploadData_generales();


    });


  }

  uploadData_generales(){

    this.chartData = [
      {
        data: this.data_imc,
        label: 'Imc'
      },
      {
        data: this.data_peso,
        label: 'Peso'
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
      resultado = "Peso Normal";
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












  data_imc:any[] = [];
  data_peso:any[] = [];
  labels_generales:any[] = [];

  chartData: ChartDatasets|any = [];
  chartLabels:ChartLabel|any = [];

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
