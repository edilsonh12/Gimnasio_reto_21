import { Component, OnInit } from '@angular/core';

import { NutritionService } from 'src/app/servicios/nutrition/nutrition.service';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nutrition-general',
  templateUrl: './nutrition-general.component.html',
  styleUrls: ['./nutrition-general.component.css']
})
export class NutritionGeneralComponent implements OnInit {

  p:any = 1;
  filtro:any = '';

  listNutrition:any;

  formCreatePlanNutrition = new FormGroup({
    id_plan: new FormControl('',Validators.required),
    nombre_plan: new FormControl('',Validators.required),
    tipo: new FormControl('',Validators.required)
  });

  constructor(
    private nutrition: NutritionService,
    private router: Router
  ) { 

    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    this.nutrition.selectNutritionGeneral().subscribe(res => {

      this.listNutrition = res;

    });


  }

  searchPlanNutrition(id_plan:any){

    this.router.navigateByUrl('view-nutrition/'+id_plan);

  }

  createNutrition(form:any){

    form.id_plan =  Math.floor((Math.random() * (99999999-10000000))+10000000);
    form.tipo = 1;
    
    this.nutrition.createPlanNutrition(form).subscribe(res => {

      if(res == 'Plan Creado con exito'){

        Swal.fire({
          icon: 'success',
          text: 'A continuación deberá registrar los datos solicitados por el formulario para finalizar el proceso de registro del plan de alimentación'
        }).then(response => {

          this.router.navigateByUrl('create-nutrition/'+form.id_plan);

        });

      }else{

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'Actualmente no es posible realizar la petición, intente nuevamente'
        });

      }

    });


  }


  updateNutritionGeneral(id_plan:any){

    this.router.navigateByUrl('nutrition-general-update/'+id_plan);

  }



    //Botón del paginador ----------------------
    handlePageChange(event:any) {
      this.p = event;
    }
    //..........................................
  
  
}