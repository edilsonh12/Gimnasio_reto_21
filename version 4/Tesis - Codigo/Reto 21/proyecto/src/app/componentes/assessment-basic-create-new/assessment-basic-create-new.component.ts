import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssessmentService } from 'src/app/servicios/assessment/assessment.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-assessment-basic-create-new',
  templateUrl: './assessment-basic-create-new.component.html',
  styleUrls: ['./assessment-basic-create-new.component.css']
})
export class AssessmentBasicCreateNewComponent implements OnInit {


  listMeasures:any;

  id_medidas:any = '';

  listAuxiliar:any = '';

  documento_valoracion:any;

  estatura:any;

  formCreateMeasures = new FormGroup({
    id_medidas: new FormControl('',Validators.required),
    peso: new FormControl('',Validators.required),
    antebrazo_derecho: new FormControl('',Validators.required),
    antebrazo_izquierdo: new FormControl('',Validators.required),
    brazo_derecho: new FormControl('',Validators.required),
    brazo_izquierdo: new FormControl('',Validators.required),
    pecho: new FormControl('',Validators.required),
    abdomen: new FormControl('',Validators.required),
    gluteo: new FormControl('',Validators.required),
    pierna_derecha: new FormControl('',Validators.required),
    pierna_izquierda: new FormControl('',Validators.required),
    pantorrilla_derecha: new FormControl('',Validators.required),
    pantorrilla_izquierda: new FormControl('',Validators.required)
  });

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:AssessmentService
  ) {

    this.id_medidas = this.route.snapshot.paramMap.get('id');
    this.updateData();
  }

  ngOnInit(): void {
  }

  updateData(){

    const id_medidas_valoracion = this.id_medidas;

    let form = {};
    form = {id_medidas_valoracion};

    this.service.selectAssessmentBasic(form).subscribe(res => {

      this.listMeasures = res;

    });

  }

  createMeasures(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Finalización del proceso de registro',
      text: "¿Está seguro que desea finalizar la información de la valoración?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if(form.brazo_derecho == '' || form.brazo_izquierdo == '' || form.antebrazo_derecho == '' || form.antebrazo_izquierdo == '' || form.pecho == '' || form.abdomen == '' || form.gluteo == ''
        || form.pierna_derecha == '' || form.pierna_izquierda == '' || form.pantorrilla_derecha == '' || form.pantorrilla_izquierda == ''){

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Se deben llenar todos los campos solicitados para poder continuar con el proceso de registro'
          })

            }else{

              const id_medidas_valoracion = form.id_medidas;
              let forms = {id_medidas_valoracion};
              this.service.getDocument(forms).subscribe(res => {

                this.listAuxiliar = res;
                let documento_valoracion:any = '';
                for(let x of this.listAuxiliar){
                  documento_valoracion = x.documento_valoracion;
                }

                let forms = {documento_valoracion};

                this.service.getHeight(forms).subscribe(res => {
                  let estatura:any = '';
                  this.listAuxiliar = res;
                  for(let x of this.listAuxiliar){
                    estatura = x.estatura;
                  }

                  const peso = form.peso;
                  const altura_al_cuadrado =  Math.pow(estatura,2);
                  const imc = peso/altura_al_cuadrado;

                  let forms = {};
                  forms = {id_medidas_valoracion, documento_valoracion, imc,peso};

                  this.service.updateWeight(forms).subscribe(res => {

                    if(res == 'Peso actualizado con exito'){

                          this.service.createMeasuresBasic(form).subscribe(res => {

                            if(res == 'Medidas registradas con exito'){

                              Swal.fire({
                                icon: 'success',
                                title: 'Proceso Completado',
                                text: 'La información se registró con éxito'
                              }).then(response => {

                                const session = localStorage.getItem('session');

                                if(session == 'ad_i-dfg9op1_i/'){
                            
                                  localStorage.removeItem('assessment');
                                  this.router.navigateByUrl('assessment');
                            
                                }else if(session == 'en_i-dfg8op1_i/'){
                            
                                  localStorage.removeItem('assessment');
                                  this.router.navigateByUrl('valoraciones-entrenador');
                                  
                                }

                              });

                            }else{

                              Swal.fire({
                                icon: 'error',
                                title: 'Proceso Fallido',
                                text: 'No es posible realizar la petición actual, intentelo nuevamente'
                              })

                            }


                          });


                    }else{

                      Swal.fire({
                        icon: 'error',
                        title: 'Proceso Fallido',
                        text: 'No es posible realizar la petición actual, intente nuevamente'
                      })

                    }


                  });





                });




              });


            }



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


  cancellCreateAssessment(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Cancelar proceso',
      text: "¿Está seguro que desea cancelar el registro de la valoración?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {


        const id_medidas_valoracion = this.id_medidas;

        let form = {};
        form = {id_medidas_valoracion};

        this.service.getDocument(form).subscribe(res => {

          this.documento_valoracion = res;
          let documento_valoracion = '';

          for(let x of this.documento_valoracion){
            documento_valoracion = x.documento_valoracion;
          }

          let form = {};
          form = {documento_valoracion,id_medidas_valoracion};
          this.service.cancellAssessmentBasic(form).subscribe(res => {

            if(res == 'Valoracion cancelada'){

              const id_medidas = id_medidas_valoracion;

              let form = {};
              form = {id_medidas};

              this.service.deleteMeasures(form).subscribe(res => {

                if(res == 'Valoración eliminada con exito'){

                  Swal.fire({
                    icon: 'success',
                    title: 'Proceso Compeltado',
                    text: 'El proceso de cancelación se realizó con éxito'
                  }).then(response => {

                    const session = localStorage.getItem('session');

                    if(session == 'ad_i-dfg9op1_i/'){
                
                      localStorage.removeItem('assessment');
                      this.router.navigateByUrl('assessment');
                
                    }else if(session == 'en_i-dfg8op1_i/'){
                
                      localStorage.removeItem('assessment');
                      this.router.navigateByUrl('valoraciones-entrenador');
                      
                    }

                  });

                }else{

                  Swal.fire({
                    icon: 'error',
                    title: 'Proceso Fallido',
                    text: 'No es posible realizar la petición actual, intentelo nuevamente'
                  })

                }

              });

            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'No es posible realizar la petición actual, intentelo nuevamente'
              })

            }


          });


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

}
