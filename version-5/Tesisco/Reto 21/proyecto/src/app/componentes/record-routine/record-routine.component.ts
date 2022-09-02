import { Component, OnInit } from '@angular/core';

import { RoutinesService } from 'src/app/servicios/routines/routines.service';
import { TrainingService } from 'src/app/servicios/training/training.service';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-record-routine',
  templateUrl: './record-routine.component.html',
  styleUrls: ['./record-routine.component.css']
})
export class RecordRoutineComponent implements OnInit {

  p:any = 1;
  pagina:any = 1;

  filtro = '';

  listDays:any;
  listSeries:any;
  listRepetitions:any;
  listTipoEjecucion:any;


  listTraining:any;
  listTrainigReg:any;

  todo:any = [];

  done:any = [];

  id_dia:any = 0;
  id_tipo_de_ejecucion:any = 0;

  id_plan_entrenamiento:any;

  id_repeticiones:any = 0;
  id_series:any = 0;

  constructor(
    private routinesService: RoutinesService,
    private training: TrainingService,
    private route:ActivatedRoute,
    private router:Router
  ) {
    this.id_plan_entrenamiento = this.route.snapshot.paramMap.get('id');
    this.updateData();
    this.updateDataTable();
  }

  ngOnInit(): void {
  }

  updateData(){

    this.routinesService.getDays().subscribe(res => {

      this.listDays = res;

    });

    this.routinesService.getSeries().subscribe(res => {

      this.listSeries = res;

    });

    this.routinesService.getRepetitions().subscribe(res => {

      this.listRepetitions = res;

    });

    this.routinesService.getTipoEjecucion().subscribe(res => {

      this.listTipoEjecucion = res;

    });

    this.training.getTrainings().subscribe(res => {

      this.listTrainigReg = res;

      for(let x of this.listTrainigReg){
        this.done = [
          ...this.done,
         {
          id: x.id_ejercicios,
          nombre:  x.nombre_ejercicios,
          categoria: x.nombre_categoria,
          sub_categoria: x.nombre_sub
         }
        ]

      }

    });

  }

  updateDataTable(){

    const id_entrenamiento = this.id_plan_entrenamiento;
    const dias_entre = this.id_dia;

    let form = {};
    form = {id_entrenamiento, dias_entre};
    this.routinesService.getListTrainingReg(form).subscribe(res => {

      this.listTrainigReg = res;

      for(let x of this.listTrainigReg){
        this.todo = [
          ...this.todo,
         {
          id: x.id_ejercicios,
          nombre:  x.nombre_ejercicios,
          categoria: x.nombre_categoria,
          sub_categoria: x.nombre_sub
         }
        ]

      }

    });


  }


  changueDay(dia_entre:any){
    this.todo = [];
    this.updateDataTable();

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const anterior  = event.previousContainer.id.toString();

      if(anterior == 'cdk-drop-list-1'){

        if(this.id_dia == 0){

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'No es posible realizar el proceso, debe seleccionar un día'
          })

        }else{

          if(this.id_tipo_de_ejecucion == '0'){

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar el proceso, debe seleccionar un tipo de ejecución'
            })

          }else{

            const id_ejercicio = event.item.data;
            const id_plan_entrenamiento = this.id_plan_entrenamiento;
            const id_tipo_de_ejecucion = this.id_tipo_de_ejecucion;
            const dias_entre = this.id_dia;

            let form = {};
            form = {id_plan_entrenamiento, id_ejercicio, id_tipo_de_ejecucion, dias_entre};


            this.routinesService.insertTrainingToPlan(form).subscribe(res => {

              if(res == 'Ejercicio insertado con exito'){

                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Completado',
                  text: 'Ejercicio registrado con exito'
                }).then(response => {

                  transferArrayItem(
                    event.previousContainer.data,
                    event.container.data,
                    event.previousIndex,
                    event.currentIndex,
                  );
                  this.todo = [];
                  this.updateDataTable();

                });



              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'No es posible realizar el proceso, intente nuevamente'
                })

              }



            });

          }

        }

      }else if(anterior == 'cdk-drop-list-0'){

        const id_ejercicio = event.item.data;
        const id_plan_entrenamiento = this.id_plan_entrenamiento;
        
        let form = {};
        form = {id_ejercicio,id_plan_entrenamiento};

        this.routinesService.deleteTrainingToPlan(form).subscribe(res => {

          if(res == 'Ejercicio eliminado'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'El ejercicio se removió con éxito'
            }).then(response => {

              transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
              );
              this.todo = [];
              this.updateDataTable();

            });

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar el proceso, intente nuevamente'
            });

          }

        });

      }

    }

  }


  finishRoutine(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Finalizar proceso',
      text: "¿Esta seguro que desea finalizar el proceso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if(this.id_repeticiones == 0){

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'No es posible realizar el proceso, debe seleccionar una cantidad de repeticiones'
          });

        }else{

          if(this.id_series == 0){

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar el proceso, debe seleccionar las series del ejercicio'
            });

          }else{

            const id_plan_entrenamiento = this.id_plan_entrenamiento;
            const id_repes = this.id_repeticiones;
            const id_serie = this.id_series;

            let form = {};
            form = {id_plan_entrenamiento, id_repes, id_serie};

            this.routinesService.finishRoutine(form).subscribe(res => {

              if(res == 'Registro completado'){

                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Cumpletado',
                  text: 'El plan se registró satisfactoriamente'
                }).then(response => {

                  const role = localStorage.getItem('session');

                  if(role == 'cli_i-dfg078op1_0i1/'){

                    this.router.navigateByUrl('inicio');

                  }else if(role == 'en_i-dfg8op1_i/' || role == 'ad_i-dfg9op1_i/'){

                    this.router.navigateByUrl('routines');

                  }

                });

              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'No es posible realizar el proceso, intente nuevamente'
                });

              }

            });



          }


        }




      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        Swal.fire({
          icon: 'error',
          title: 'Cancelado'
        })

      }
    })


  }


  cancellRoutine(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Cancelar el registro',
      text: "¿Seguro que desea cancelar el proceso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const id_plan_entrenamiento = this.id_plan_entrenamiento;

        let form = {};
        form = {id_plan_entrenamiento};

        this.routinesService.cancellRoutine(form).subscribe(res => {
          
          if(res == 'ejercicios eliminados'){

            const id_entrenamiento = this.id_plan_entrenamiento;

            let form1 = {};
            form1 = {id_entrenamiento};

            this.routinesService.cancellRoutinePlan(form1).subscribe(res => {
              console.log(res);
              if(res == 'Rutina eliminada'){

                Swal.fire({
                  icon: 'success',
                  text: 'El proceso se canceló con éxito'
                }).then(response => {

                  const role = localStorage.getItem('session');

                  if(role == 'cli_i-dfg078op1_0i1/'){

                    this.router.navigateByUrl('inicio');

                  }else if(role == 'en_i-dfg8op1_i/' || role == 'ad_i-dfg9op1_i/'){

                    this.router.navigateByUrl('routines');

                  }

                  
                });


              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'No es posible realizar el proceso, intente nuevamente'
                });

              }

            });



          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar el proceso, intente nuevamente'
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




      //Botón del paginador ----------------------------
      handlePageChange(event:any) {
        this.p = event;
      }

      changuePague(event:any) {
        this.pagina = event;
      }
      //------------------------------------------------
}
