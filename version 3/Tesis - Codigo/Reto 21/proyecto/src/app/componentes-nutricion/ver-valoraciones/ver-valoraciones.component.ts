import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AssessmentService } from 'src/app/servicios/assessment/assessment.service';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import { Validators, FormGroup, FormControl } from '@angular/forms';
import * as CryptoJS from 'crypto-js';


import Swal from 'sweetalert2';


@Component({
  selector: 'app-ver-valoraciones',
  templateUrl: './ver-valoraciones.component.html',
  styleUrls: ['./ver-valoraciones.component.css']
})
export class VerValoracionesComponent implements OnInit {

  encryptMode: boolean|any;
  textToConvert: string|any;
  password: string = 'gKB&uH0MZQVfJA1fE%aW';
  conversionOutput: string|any;


  filtro_nuevos:any = '';
  filtro_antiguos:any = '';


  p:any = 1;
  page:any = 1;
  page_edit:any = 1;

  listAuxiliar:any;


  listOldUserFirst:any;
  listOldUserSecond:any;

  documento_valoracion:any;
  tipo_valoracion:any;
  listAssessmentDate:any;

  documento:any;
  id_valoracion:any;

  constructor(
    private router:Router,
    private assessment:AssessmentService,
    private auth:AuthUsersService
  ) {

    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    this.auth.selectOldUsersFirstPart().subscribe(res => {

      this.listOldUserFirst = res;

    });

    this.auth.selectOldUsersSecondtPart().subscribe(res => {

      this.listOldUserSecond = res;

    });

  }




  goToDashboard(documento:any,tipo_valoracion:any){

    if(tipo_valoracion == 'Básico'){
      //Valoración básica-----------------------------------

      this.textToConvert = documento;
      this.encrypt();

      localStorage.setItem('assessment',this.conversionOutput);

      this.router.navigateByUrl('dashboard-basic');


    }else if(tipo_valoracion == 'Avanzado'){
      //Valoración avanzada---------------------------------

      this.textToConvert = documento;
      this.encrypt();

      localStorage.setItem('assessment',this.conversionOutput);

      this.router.navigateByUrl('dashboard-advanced');

    }

  }


  encrypt() {
    this.conversionOutput = CryptoJS.AES.encrypt(this.textToConvert.trim(), this.password.trim()).toString();
  }

  decrypt(){
    this.conversionOutput = CryptoJS.AES.decrypt(this.textToConvert.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
  }





    //Botón del paginador ----------------------

    change_page(event:any) {
      this.page = event;
    }

    //..........................................
}

