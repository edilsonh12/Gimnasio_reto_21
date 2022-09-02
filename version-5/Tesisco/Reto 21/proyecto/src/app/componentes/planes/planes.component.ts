import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { SistemaService } from 'src/app/servicios/sistema/sistema.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {

  listPlans:any;
  onePlan:any;
  p = 1;

  planForm = new FormGroup({
    titulo_suscripcion: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    precio: new FormControl('',Validators.required),
    duracion: new FormControl('',Validators.required)
  });

  updatePlanForm = new FormGroup({
    id_suscripcion: new FormControl('',Validators.required),
    titulo_suscripcion: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    precio: new FormControl('',Validators.required),
    duracion: new FormControl('',Validators.required)
  });

  constructor(
    private service: SistemaService
  ) {

    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    this.service.getPlans().subscribe(res => {
      this.listPlans = res;
    });

  }

  formatDurationTime(duracion:any){
    let respuesta:any = '';

    if(duracion == 1){
        respuesta  = duracion + ' Mes';
    }else if(duracion >= 2){
        respuesta = duracion + ' Meses';
    }

    return respuesta;
  }


  createPlans(form:any){

    if(form.titulo_suscripcion == '' || form.precio == '' || form.descripcion == '' || form.duracion == ''){

      Swal.fire({
        icon: 'error',
        text: 'Debe llenar el formulario para poder realizar el registro de la información.'
      })

    }else{

    this.service.createPlans(form).subscribe(res => {

      if(res == 'Plan registrado con éxito'){

        Swal.fire({
          icon: 'success',
          title: 'Proceso Completado',
          text: 'Servicio ofertado registrado con éxito'
        }).then(response => {
          this.updateData();

        });

        this.planForm.reset();
      }else{

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'No es posible registrar el servicio ofertado, intente nuevamente'
        })

      }


    });


  }



  }

  selectOnePlan(id_suscripcion:any){

    let form = {};
    form = {id_suscripcion};

    this.service.getOnePlan(form).subscribe(res => {
      this.onePlan = res;
    });

  }

  updatePlan(form:any){


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: "Actualización de datos",
      text: "¿Está seguro que quiere actualizar los datos?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.putPlan(form).subscribe(res => {

          if(res == 'Plan actualizado'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Se actualizo correctamente la información'
            }).then(response => {
                this.updateData();
            });

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible actualizar la información, intente nuevamente'
            })

          }


        });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        Swal.fire({
          icon: 'error',
          title: 'Proceso Cancelado'
        })

      }
    })


  }


  //Paginador----------------------------------
  handlePageChange(event:any) {
    this.p = event;
  }
  //-------------------------------------------



}
