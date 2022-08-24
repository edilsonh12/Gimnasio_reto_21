import { Component, OnInit } from '@angular/core';

import { RoutinesService } from 'src/app/servicios/routines/routines.service';
import { TrainingService } from 'src/app/servicios/training/training.service';
import { ChallengesService } from 'src/app/servicios/challenges/challenges.service';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-challenges-routine',
  templateUrl: './challenges-routine.component.html',
  styleUrls: ['./challenges-routine.component.css']
})
export class ChallengesRoutineComponent implements OnInit {

  p:any = 1;
  pagina:any = 1;

  filtro = '';

  id_retos_ej:any;
  id_ejercicios_ej:any;


  listTraining:any;
  listTrainigReg:any;

  todo:any = [];

  done:any = [];


  constructor(
    private routinesService: RoutinesService,
    private training: TrainingService,
    private route:ActivatedRoute,
    private router:Router,
    private challenges:ChallengesService
  ) {
    this.id_retos_ej = this.route.snapshot.paramMap.get('id');
    this.updateData();
    this.updateDataTable();
  }

  ngOnInit(): void {
  }

  updateData(){

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

    this.todo = [];
    const id_retos_ej = this.id_retos_ej;

    let form = {id_retos_ej};

    this.challenges.selectTraining(form).subscribe(res => {

      this.listTrainigReg = res;

      for(let x of this.listTrainigReg){
        this.todo = [
          ...this.todo,
         {
          id: x.id_ejercicios_ej,
          nombre:  x.nombre_ejercicios,
          categoria: x.nombre_categoria,
          sub_categoria: x.nombre_sub
         }
        ]

      }

    });


  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      const anterior  = event.previousContainer.id.toString();
      const temp = event.item.data;
      if(anterior == 'cdk-drop-list-1'){

        const id_ejercicios_ej = temp;
        const id_retos_ej = this.id_retos_ej;
        let form = {id_retos_ej,id_ejercicios_ej};

        this.challenges.insertTraining(form).subscribe(res => {

          if(res == 'Ejercicio registrados con exito'){
  
            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Ejercicio registrado con éxito'
            }).then(response => {

              this.updateDataTable();

            });

          }else if (res == 'El ejercicio ya se encuentra registrado, intente nuevamente'){

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar el registro del ejercicio, ya se encuentra registrado, intente nuevamente'
            });

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar la petición actual, intente nuevamente'
            })

          }


        });




      }else if(anterior == 'cdk-drop-list-0'){

        const id_ejercicios_ej = event.item.data;
        const id_retos_ej = this.id_retos_ej;
        
        let form = {id_ejercicios_ej, id_retos_ej};

        this.challenges.deleteTraining(form).subscribe(res => {

          if(res == 'Ejercicio eliminado con exito'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Ejercicio eliminado de la lista con exito'
            }).then(response => {

              this.updateDataTable();

            });

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar la petición actual, intente nuevamente'
            })

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

        Swal.fire({
          icon: 'success',
          title: 'Proceso Completado',
          text: 'El registro del reto se hizo con éxito'
        }).then(response => {

          this.router.navigateByUrl('challenges');

        });

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

        const id_retos_ej = this.id_retos_ej;
        let form = { id_retos_ej };

        this.challenges.cancelChallenges(form).subscribe(res => {

          if(res == 'Reto cancelado con exito'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'El proceso de registro se canceló con éxito'
            }).then(response => {

              this.router.navigateByUrl('challenges');

            });


          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Actualmente no es posible realizar al petición, intente nuevamente'
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
