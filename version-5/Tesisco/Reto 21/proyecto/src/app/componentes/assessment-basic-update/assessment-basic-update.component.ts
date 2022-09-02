import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AssessmentService } from 'src/app/servicios/assessment/assessment.service';

import Swal from 'sweetalert2';
import { EmailService } from 'src/app/servicios/email/email.service';
import { NotificationService } from 'src/app/servicios/notification/notification.service';

@Component({
  selector: 'app-assessment-basic-update',
  templateUrl: './assessment-basic-update.component.html',
  styleUrls: ['./assessment-basic-update.component.css']
})
export class AssessmentBasicUpdateComponent implements OnInit {

  listMeasures:any;

  id_medidas:any = '';

  documento_valoracion:any;

  estatura:any;

  content_temp:any;

  formCreateMeasures = new FormGroup({
    id_medidas: new FormControl('',Validators.required),
    documento_valoracion: new FormControl('',Validators.required),
    peso: new FormControl('',Validators.required),
    estatura: new FormControl('',Validators.required),
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
    private service:AssessmentService,
    private email:EmailService,
    private notification:NotificationService
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
      title: 'Actualización de la información',
      text: "¿Está seguro que desea actualizar la información de la valoración?",
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
              const documento_valoracion = form.documento_valoracion;
              const peso = form.peso;

              const estatura = form.estatura;

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
                          text: 'La información se actualizó con éxito'
                        }).then(response => {

                          const session = localStorage.getItem('session');

                          if(session == 'ad_i-dfg9op1_i/' || session== 'rp_i-dfg458op1_i9/'){
                      
                            localStorage.removeItem('assessment');
                            this.router.navigateByUrl('assessment');
                      
                          }else if(session == 'en_i-dfg8op1_i/' || session== 'rp_i-dfg458op1_i9/'){
                      
                            localStorage.removeItem('assessment');
                            this.router.navigateByUrl('valoraciones-entrenador');
                            
                          }

                          const id_medidas_valoracion = this.id_medidas;
                          let form = {id_medidas_valoracion};
                          let correo:any;
                  
                          this.service.searchEmailUserBasic(form).subscribe(res => {
                  
                              this.content_temp = res;
                              for(let x of this.content_temp){
                                correo = x.correo;
                              }
                  
                              let form1 = {correo};
                              this.email.sendEmailUpdateAssessment(form1).subscribe(res => {
                  
                                if(res == 'Correo enviado'){
                                
                                  Swal.fire({
                                    icon: 'success',
                                    title: 'Se notificó via correo al usuario el registro de la nueva valoración.'
                                  })
                  
                                }else{
                  
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Proceso Fallido',
                                    text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
                                  })
                  
                                }
                  
                  
                              });
                              
                  
                  
                          });



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


        Swal.fire({
          icon: 'error',
          title: 'Proceso Completado',
          text: 'La actualización de la valoración se realizó con éxito'
        }).then(response => {

          const session = localStorage.getItem('session');

          if(session == 'ad_i-dfg9op1_i/' || session== 'rp_i-dfg458op1_i9/'){
      
            localStorage.removeItem('assessment');
            this.router.navigateByUrl('assessment');
      
          }else if(session == 'en_i-dfg8op1_i/' || session== 'rp_i-dfg458op1_i9/'){
      
            localStorage.removeItem('assessment');
            this.router.navigateByUrl('valoraciones-entrenador');
            
          }


          const id_medidas_valoracion = this.id_medidas;
          let form = {id_medidas_valoracion};
          let correo:any = '';
          let documento_usu:any = '';
  
          this.service.searchEmailUserAdvanced(form).subscribe(res => {
  
              this.content_temp = res;
              for(let x of this.content_temp){
                correo = x.correo;
                documento_usu = x.documento;
              }
  
              let form1 = {correo};
              this.email.sendEmailUpdateAssessment(form1).subscribe(res => {
  
                if(res == 'Correo enviado'){
                
                  Swal.fire({
                    icon: 'success',
                    title: 'Se notificó via correo al usuario el registro de la nueva valoración.'
                  }).then(response => {

                    const id_noti_us = 34;
                    let form5 = {id_noti_us,documento_usu};
                    this.notification.sendOneNotification(form5);

                  });
  
                }else{
  
                  Swal.fire({
                    icon: 'error',
                    title: 'Proceso Fallido',
                    text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
                  })
  
                }
  
  
              });
              
  
  
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
