import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AssessmentService } from 'src/app/servicios/assessment/assessment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from 'src/app/servicios/email/email.service';
import { NotificationService } from 'src/app/servicios/notification/notification.service';

@Component({
  selector: 'app-assessment-advanced',
  templateUrl: './assessment-advanced.component.html',
  styleUrls: ['./assessment-advanced.component.css']
})
export class AssessmentAdvancedComponent implements OnInit {

  listAssessment:any;

  assessmentTemp:any = 0;

  listAsist:any;

  content_temp:any;

  ID:any = '';

  generalesTemp:any = false;
  masa_muscularTemp:any = false;
  grasa_corporalTemp:any = false;
  medidasTemp:any = false;

  formCreateGenerales = new FormGroup({
    id_generales: new FormControl('',Validators.required),
    agua_corporal: new FormControl('',Validators.required),
    masa_osea: new FormControl('',Validators.required),
    grasa_visceral: new FormControl('',Validators.required),
    bmr: new FormControl('',Validators.required),
    k_caloria: new FormControl('',Validators.required)
  });

  formCreateMasaMuscular = new FormGroup({
    id_masa: new FormControl('',Validators.required),
    torso: new FormControl('',Validators.required),
    brazo_derecho: new FormControl('',Validators.required),
    brazo_izquierdo: new FormControl('',Validators.required),
    pierna_derecha: new FormControl('',Validators.required),
    pierna_izquierda: new FormControl('',Validators.required),
    total: new FormControl('',Validators.required),
    valoracion_fisica: new FormControl('',Validators.required),
  });

  formCreateGrasaCorporal = new FormGroup({
    id_grasa: new FormControl('',Validators.required),
    torso: new FormControl('',Validators.required),
    brazo_derecho: new FormControl('',Validators.required),
    brazo_izquierdo: new FormControl('',Validators.required),
    pierna_derecha: new FormControl('',Validators.required),
    pierna_izquierda: new FormControl('',Validators.required),
    total: new FormControl('',Validators.required)
  });

  formCreateMeasures = new FormGroup({
    id_medidas: new FormControl('',Validators.required),
    pecho: new FormControl('',Validators.required),
    brazo_derecho: new FormControl('',Validators.required),
    brazo_izquierdo: new FormControl('',Validators.required),
    antebrazo_derecho: new FormControl('',Validators.required),
    antebrazo_izquierdo: new FormControl('',Validators.required),
    abdomen: new FormControl('',Validators.required),
    gluteo: new FormControl('',Validators.required),
    pierna_derecha: new FormControl('',Validators.required),
    pierna_izquierda: new FormControl('',Validators.required),
    pantorrilla_izquierda: new FormControl('',Validators.required),
    pantorrilla_derecha: new FormControl('',Validators.required)
  });

  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private service:AssessmentService,
    private email:EmailService,
    private notification:NotificationService
  ) {

    this.ID = this.route.snapshot.paramMap.get('id');
    this.updateData();

   }

  ngOnInit(): void {
  }

  updateData(){

    this.service.getAssessmentPhy().subscribe(res => {

      this.listAssessment = res;
    });

  }

  arrayBufferToBase64( buffer:any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

  createGenerales(form:any){

      if(form.agua_corporal == '' || form.masa_osea == '' || form.grasa_visceral == '' || form.bmr == '' || form.k_caloria == ''){

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'No es posible continuar el proces, debe llenar todos los campos del formulario'
        })

      }else{

        this.service.updateGenerales(form).subscribe(res => {

          if(res == 'Actualizacion generales con exito'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso completado',
              text: 'Información guardada con éxito'
            }).then(response => {

              this.generalesTemp = true;

            });

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'En este momento no es posible realizar la petición solicitada, intente nuevamente'
            })

          }

        });

      }


  }


  createMasa_Muscular(form:any){

    if(form.valoracion_fisica == '0'){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Es necesario que seleccione una opción en todos los campos'
      })

    }else {

      if(form.torso == '' || form.total == '' || form.brazo_derecho == '' || form.brazo_izquierdo == '' || form.pierna_derecha == '' || form.pierna_izquierda == ''){

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'Para poder continuar con el proceso, primero debe llenar todos los capos del formulario'
        })

      }else{

        this.service.updateMasaCorporal(form).subscribe(res => {

          if(res == 'Masa corporal actualizada con exito'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'La información se registró con éxito'
            }).then(response => {

              this.masa_muscularTemp = true;


            });

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar la petición solicitada actualmente, intente nuevamente'
            })

          }


        });

      }



    }

  }

  createGrasaCorporal(form:any){

    if(form.total == '' || form.torso == '' || form.brazo_derecho == '' || form.brazo_izquierdo == '' || form.pierna_derecha == '' || form.pierna_izquierda == ''){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Deben llenar todos los campos del formuario para poder continuar con el proceso de registro'
      })

    }else{

      this.service.updateGrasaCorporal(form).subscribe(res => {

        if(res == 'Actualizacion de grasa corporal realizada con exito'){

          Swal.fire({
            icon: 'success',
            title: 'Proceso Completado',
            text: 'La información se registro con exito'
          }).then(response => {

            this.grasa_corporalTemp = true;

          });

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'No es posible realizar la petición solicitada actualmente, intente nuevamente'
          })

        }

      });

    }


  }

  createMeasures(form:any){

    if(form.pecho == '' || form.brazo_derecho == '' || form.brazo_izquierdo == '' || form.antebrazo_derecho == '' || form.antebrazo_izquierdo == ''
     || form.abdomen == '' || form.gluteo == '' || form.pierna_derecha == '' || form.pierna_izquierda == '' || form.pantorrilla_izquierda == '' || form.pantorrilla_derecha == '' ){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Deben llenar todos los campos del formuario para poder continuar con el proceso de registro'
      })

    }else{

      this.service.createMeasuresBasic(form).subscribe(res => {

        if(res == 'Medidas registradas con exito'){

          Swal.fire({
            icon: 'success',
            title: 'Proceso Completado',
            text: 'La información se registro con exito'
          }).then(response => {

            this.medidasTemp = true;

          });


        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'No es posible realizar la petición solicitada actualmente, intente nuevamente'
          })

        }

      });


    }


  }


  finishAssessmentAdvanced(){

    if(this.medidasTemp == false || this.generalesTemp == false || this.grasa_corporalTemp == false || this.masa_muscularTemp == false){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Debe llenar todos los formularios para poder finalizar el proceso de registro de la valoración'
      })

    }else{

      Swal.fire({
        icon: 'success',
        title: 'Proceso Completado',
        text: 'La valoración se registro con éxito'
      }).then(response => {

        const session = localStorage.getItem('session');

        if(session == 'ad_i-dfg9op1_i/'){
    
          localStorage.removeItem('assessment');
          this.router.navigateByUrl('assessment');
    
        }else if(session == 'en_i-dfg8op1_i/'){
    
          localStorage.removeItem('assessment');
          this.router.navigateByUrl('valoraciones-entrenador');
          
        }

        const id_medidas_valoracion = this.ID;
        let form = {id_medidas_valoracion};
        let correo:any;
        let documento_usu:any = '';

        this.service.searchEmailUserAdvanced(form).subscribe(res => {

            this.content_temp = res;
            for(let x of this.content_temp){
              correo = x.correo;
              documento_usu = x.documento;
            }

            let form1 = {correo};
            this.email.sendEmailRegisteredAssessment(form1).subscribe(res => {

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

    }


  }

  cancellAssessmentAdvanced(){

    const id_medidas_valoracion = this.ID;

    let form = {};
    form = {id_medidas_valoracion};

    this.service.getDocumentAdvanced(form).subscribe(res => {

      this.listAsist = res;
      let documento_valoracion = '';

      for(let x of this.listAsist){
        documento_valoracion = x.documento_valoracion;
      }

      const id_medidas_valoracion = this.ID;
      const id_generales_valoracion = this.ID;

      let form = {};
      form = {documento_valoracion, id_medidas_valoracion, id_generales_valoracion};

      this.service.deleteAssessmentAdvanced(form).subscribe(res => {

        if(res == 'Valoracion Avanzada eliminada con exito'){

          const id_medidas = this.ID;

          let form = {};
          form = {id_medidas};

          this.service.deleteMeasures(form).subscribe(res => {

            if(res == 'Valoración eliminada con exito'){

              const id_generales = this.ID;

              let form = {};
              form = {id_generales};

              this.service.deleteGenerales(form).subscribe(res => {

                if(res == 'Generales eliminado con exito'){

                  const id_masa = this.ID;
                  let form = {};
                  form = {id_masa};

                  this.service.deleteMasa(form).subscribe(res => {

                    if(res == 'Masa Muscular eliminada con exito'){

                      const id_grasa = this.ID;
                      let form = {};
                      form = {id_grasa};

                      this.service.deleteGrasa(form).subscribe(res => {

                        if(res == 'Grasa eliminada con exito'){

                          Swal.fire({
                            icon: 'success',
                            title: 'Proceso Completado',
                            text: 'El proceso de cancelación de la valoración se realizó con exito'
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
                            text: 'No es posible realizar la petición solicitada actualmente, intente nuevamente'
                          })

                        }


                      });



                    }else{

                      Swal.fire({
                        icon: 'error',
                        title: 'Proceso Fallido',
                        text: 'No es posible realizar la petición solicitada actualmente, intente nuevamente'
                      })

                    }

                  });


                }else{

                  Swal.fire({
                    icon: 'error',
                    title: 'Proceso Fallido',
                    text: 'No es posible realizar la petición solicitada actualmente, intente nuevamente'
                  })

                }

              });


            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'No es posible realizar la petición solicitada actualmente, intente nuevamente'
              })

            }

          });


        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'No es posible realizar la petición solicitada actualmente, intente nuevamente'
          })

        }



      });


    });



  }





}
