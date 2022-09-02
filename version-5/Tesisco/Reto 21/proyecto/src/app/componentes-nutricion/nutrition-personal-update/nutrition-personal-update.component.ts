import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NutritionService } from 'src/app/servicios/nutrition/nutrition.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { EmailService } from 'src/app/servicios/email/email.service';
import { NotificationService } from 'src/app/servicios/notification/notification.service';



@Component({
  selector: 'app-nutrition-personal-update',
  templateUrl: './nutrition-personal-update.component.html',
  styleUrls: ['./nutrition-personal-update.component.css']
})
export class NutritionPersonalUpdateComponent implements OnInit {
  
  id_nutricional:any;

  listAlimento:any;
  listIngrediente:any;

  listBreakfast:any;
  listNueves:any;
  listLunch:any;
  listOnces:any;
  listDinner:any;

  temp:any;
  id_alimento:any;
  
  temp_ingrediente:any = '';
  temp_alimento:any = '';

  oneNutrition:any;

  id_tiempo_tiempo:any = '';

  content_temp:any;

  formCreateNutrition = new FormGroup({
    id_nutricional: new FormControl('',Validators.required),
    id_tiempo_tiempo: new FormControl('',Validators.required),
    id_ingrediente_nutri: new FormControl(0,Validators.required),
    cantidad: new FormControl('',Validators.required),
    intercambio: new FormControl('',Validators.required)
  });


  constructor(
    private service:NutritionService,
    private router:Router,
    private route:ActivatedRoute,
    private email:EmailService,
    private notification:NotificationService
  ) {

    this.id_nutricional = this.route.snapshot.paramMap.get('id');
    this.updateData();

    this.service.selectAlimento().subscribe(res => {

      this.listAlimento = res;

    });

  }

  ngOnInit(): void {
  }

  updateData(){

    const id_plan = this.id_nutricional;
    let id_tiempo = 1;
   
    let form = {id_plan, id_tiempo};
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listBreakfast = res;
      
    });

    id_tiempo = 2;
    form = {id_plan, id_tiempo};
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listNueves = res;
      
    });

    id_tiempo = 3;
    form = {id_plan, id_tiempo};
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listLunch = res;
      
    });

    id_tiempo = 4;
    form = {id_plan, id_tiempo};
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listOnces = res;
      
    });

    id_tiempo = 5;
    form = {id_plan, id_tiempo};
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listDinner = res;
      
    });




  }


  changueFeeding($event:any):void{

    this.id_alimento = $event.target.value;
    const id_alimento = this.id_alimento;
    let form = {id_alimento};

    this.service.selectIngredientes(form).subscribe(res => {
      this.listIngrediente = res;
    });

  }


  deleteRegistered(id_ingrediente:any,id_tiempo:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Eliminar información',
      text: "¿Seguro que desea eliminar información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No, estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const id_ingrediente_nutri =id_ingrediente;
        const id_nutricional = this.id_nutricional;
        const id_tiempo_tiempo = id_tiempo;
        
        let form = {id_nutricional, id_tiempo_tiempo, id_ingrediente_nutri};
    
        this.service.deleteDataNutrition(form).subscribe(res => {
    
          if(res == 'Informacion eliminada con exito'){
    
            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Información eliminada con éxito'
            }).then(response => {
    
              this.updateData();
    
            });
    
          }else{
    
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
            })
    
          }
    
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        swalWithBootstrapButtons.fire(
          'Cancelado',
          'error'
        )

      }
    })



  }


  assingTime(time:any){

    this.id_tiempo_tiempo = time;

  }

  createNutrition(form:any){

    form.id_tiempo_tiempo = this.id_tiempo_tiempo;
    form.id_nutricional = this.id_nutricional;
    
    this.service.createAlimento(form).subscribe(res => {

      if(res == 'Alimento insertado con exito'){

        Swal.fire({
          icon: 'success',
          title: 'Proceso Completado',
          text: 'la información se registró con éxito'
        }).then(response => {

          this.updateData();

        });

      }else{

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
        })

      }

    });


  }


  back(){

    this.router.navigateByUrl('feeding-client');
    const id_plan_nutri = this.id_nutricional;
    let form = {id_plan_nutri};

    this.service.selectEmailUserNutrition(form).subscribe(res => {

      let correo:any = '';
      let documento_usu:any = '';
      this.content_temp = res;
      for(let x of this.content_temp){
        correo = x.correo;
        documento_usu = x.correo;
      }

      let form1 = {correo};
      this.email.sendEmailAssingPlanNutrition(form1).subscribe(res => {

        if(res == 'Correo enviado'){

          Swal.fire({
            icon: 'success',
            text: 'Se le notifico al usuario por correo electronico la asignación de un plan de alimentación.'
          }).then(response => {

            const id_noti_us:any = 37;
            let form5 = {id_noti_us,documento_usu};
            this.notification.sendOneNotification(form5);

          });

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
          });

        }

      });



    });


  }




}
