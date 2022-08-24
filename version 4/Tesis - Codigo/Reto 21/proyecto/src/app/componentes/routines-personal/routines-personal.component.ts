import { Component, OnInit } from '@angular/core';

import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import { Router } from '@angular/router';
import { RoutinesService } from 'src/app/servicios/routines/routines.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-routines-personal',
  templateUrl: './routines-personal.component.html',
  styleUrls: ['./routines-personal.component.css']
})
export class RoutinesPersonalComponent implements OnInit {

  p:any = 1;
  page:any = 1;
  pagina:any = 1;

  clientes = '';
  routine = '';

  listUsers:any;
  listRoutines:any;
  oneRoutine:any;

  listTraining:any;

  listDays:any;

  documento_entre:any;
  id_entrenamiento:any;
  dias_entre:any = 0;

  repeticiones:any;
  series:any;


  constructor(
    private router: Router,
    private users:AuthUsersService,
    private routines:RoutinesService
  ) {

    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    this.users.getUsersPlan().subscribe(res => {

      this.listUsers = res;

    });

    this.routines.getRoutines().subscribe(res => {

      this.listRoutines = res;

    });

    this.routines.getDays().subscribe(res => {

      this.listDays = res;

    });

  }

  getDocument(documento:any){
    this.documento_entre = documento;
  }



 assingRoutine(id_plan_entre:any){

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Actualización de información',
    text: "¿Seguro que desea actualizar el plan de entrenamiento del usuario?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, estoy seguro',
    cancelButtonText: 'No estoy seguro',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {

      const documento_entre = this.documento_entre;

      let form = {};
      form = {id_plan_entre, documento_entre};

      this.routines.updateRoutineUser(form).subscribe(res => {

        if(res == 'Asignación completada con exito'){

          Swal.fire({
            icon: 'success',
            title: 'Proceso Completado',
            text: 'El plan de entrenamiento del usuario se actualizó con éxito'
          }).then(response => {

            this.updateData();

          });

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'No es posible realizar el proceso actualmente, intentelo nuevamente'
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


 createRoutinePersonal(documento:any){

  const id_entrenamiento = Math.floor((Math.random() * (99999999-10000000))+10000000);
  const nombre_entrenamiento = 'Personal-'+ documento;

  let form = {};
  form = {id_entrenamiento, documento, nombre_entrenamiento};

  this.routines.createRoutinePersonal(form).subscribe(res => {

    if(res == 'Plan realizado con exito'){

      Swal.fire({
        icon: 'success',
        title: 'Proceso Completado',
        text: 'A continuación debe seleccionar los ejercicios del plan de entrenamiento'
      }).then(response => {

        this.router.navigateByUrl('/record-routine/'+id_entrenamiento);

      });

    }else{

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'No es posible realizar el proceso actualmente, intentelo nuevamente'
      })

    }

  });

 }


 updateRoutine(id_entrenamiento:any){

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  swalWithBootstrapButtons.fire({
    title: 'Actualización del plan de entrenamiento',
    text: '¿Seguro que desea actualizar el plan de entrenamiento del usuario?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, estoy seguro',
    cancelButtonText: 'No estoy seguro',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {

      Swal.fire({
        icon: 'warning',
        text: 'A continuación debe seleccionar los cambios que realizará al plan de entrenamiento'
      }).then(response => {

        this.router.navigateByUrl('/record-routine/'+id_entrenamiento);

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

 getId_Entrnamiento(id_entrenamiento:any){
  this.id_entrenamiento = id_entrenamiento;
  const dias_entre = 1;

  let form = {};
  form = {id_entrenamiento, dias_entre};

  this.routines.getListTrainingReg(form).subscribe(res => {

    this.listTraining = res;

    for(let x of this.listTraining){

      this.series = x.nombre_series;
      this.repeticiones = x.nombre_repeticion;

    }


  });


 }

 changueDay(dias_entre:any){

  const id_entrenamiento = this.id_entrenamiento;

  let form = {};
  form = {id_entrenamiento, dias_entre};

  this.routines.getListTrainingReg(form).subscribe(res => {

    this.oneRoutine = res;

  });




 }




  //Botón del paginador ----------------------
  handlePageChange(event:any) {
    this.p = event;
  }

  changuePage($event:any){
    this.page = event;
  }

  changuePagina($event:any){
    this.pagina = event;
  }

  //------------------------------------------
}
