import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RoutinesService } from 'src/app/servicios/routines/routines.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routines',
  templateUrl: './routines.component.html',
  styleUrls: ['./routines.component.css']
})
export class RoutinesComponent implements OnInit {

  p:any = 1;
  page:any = 1;

  filtro = '';

  series:any;
  repeticiones:any;
  listTemp:any;

  listRoutines:any;
  listDays:any;
  listTraining:any;

  oneRoutine:any;

  dias_entre:any = 0;

  id_plan_entrenamiento:any;
  nombre_entrenamiento:any;

  formCreateRoutines = new FormGroup({
    id_entrenamiento: new FormControl('',Validators.required),
    nombre_entrenamiento: new FormControl('',Validators.required)
  });

  formUpdateName = new FormGroup({
    id_entrenamiento: new FormControl('',Validators.required),
    nombre_entrenamiento: new FormControl('',Validators.required)
  });

  constructor(
    private service: RoutinesService,
    private router: Router
  ) {
    this.updateData();
   }

  ngOnInit(): void {
  }

  updateData(){

    this.service.getRoutines().subscribe(res => {

      this.listRoutines = res;

    });

    this.service.getDays().subscribe(res => {

      this.listDays = res;

    });

  }


  createRoutines(form:any){

    if(form.nombre_entrenamiento == ''){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Debe ingresar un nombre para plan de entrenamiento'
      })

    }else{

      const id_plan_entrenamiento:any =  Math.floor((Math.random() * (99999999-10000000))+10000000);
      const nombre_entrenamiento = form.nombre_entrenamiento;

      let forms = {};
      forms = {id_plan_entrenamiento, nombre_entrenamiento};

      this.service.createRoutines(forms).subscribe(res => {

          if(res == 'Rutina creada con exito'){

            this.router.navigateByUrl('/record-routine/'+id_plan_entrenamiento);

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar la petición pedida, intente nuevamente'
            })

          }

      });

    }

  }

  getOneRoutine(id_entrenamiento:any){

    let form = {};
    form = {id_entrenamiento};

    this.service.getOneRoutines(form).subscribe(res => {

      this.oneRoutine = res;
    });

  }

  getOneRoutinePlan(id_plan_entrenamiento:any,nombre_entrenamiento:any){

    this.id_plan_entrenamiento = id_plan_entrenamiento;
    this.nombre_entrenamiento = nombre_entrenamiento;

    const dias_entre = 1;
    const id_entrenamiento = this.id_plan_entrenamiento;

    let form1 = {};
    form1 = {id_entrenamiento,dias_entre};
    console.log(form1),
    this.service.getListTrainingReg(form1).subscribe(res => {

      this.listTemp = res;

      for(let x of this.listTemp){

        this.series = x.nombre_series;
        this.repeticiones = x.nombre_repeticion;

      }


    });

  }

  updateName(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualización de la información',
      text: "¿está seguro que desea actualizar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.updateNameRoutine(form).subscribe(res => {

          if(res == 'Nombre actualizado'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'La información se actualizó con éxito'
            }).then(response => {

              this.updateData();

            });

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar la petición pedida, intente nuevamente'
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


  deleteTraining(id_plan_entrenamiento:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Eliminar ejercicios pertenecientes al plan de entrenamiento',
      text: "¿Está seguro que desea eliminar los ejercicios?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        let form = {};
        form = {id_plan_entrenamiento};

        this.service.cleanTraining(form).subscribe(res => {

          if(res == 'Ejercicios eliminados'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Se eliminaron los ejercicios pertenecientes al plan de entrenamiento'
            }).then(response => {

              this.updateData();

            });

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar la petición pedida, intente nuevamente'
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

  changueDay(dias_entre:any){

    const id_entrenamiento = this.id_plan_entrenamiento;
    let form = {};
    form = {id_entrenamiento, dias_entre};

    this.service.getListTrainingReg(form).subscribe(res => {

      this.listTraining = res;

    });



  }



  updateTraining(id_plan_entrenamiento:any){

    Swal.fire({
      icon: 'warning',
      title: 'Actualización de la información',
      text: 'A continuación podrá actualizar la información pertinente a los ejercicios pertenecientes a dicho plan de entrenamiento'
    }).then(response => {

      this.router.navigateByUrl('/record-routine/'+id_plan_entrenamiento);

    });


  }






    //Botón del paginador ----------------------
    handlePageChange(event:any) {
      this.p = event;
    }

    changuePage(event:any) {
      this.page = event;
    }

    //------------------------------------------
}
