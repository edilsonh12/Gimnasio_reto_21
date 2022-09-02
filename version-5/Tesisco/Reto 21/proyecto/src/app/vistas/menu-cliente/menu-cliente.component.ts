import { Component, OnInit } from '@angular/core';
import { SistemaService } from 'src/app/servicios/sistema/sistema.service';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import Swal from 'sweetalert2';
import { ChildActivationStart, Router } from '@angular/router';

import decode from 'jwt-decode';
import * as CryptoJS from 'crypto-js';

import { AssessmentService } from 'src/app/servicios/assessment/assessment.service';
import { NutritionService } from 'src/app/servicios/nutrition/nutrition.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ForwardRefHandling } from '@angular/compiler';

import { RoutinesService } from 'src/app/servicios/routines/routines.service';
import { ChallengesService } from 'src/app/servicios/challenges/challenges.service';
import { NotificationService } from 'src/app/servicios/notification/notification.service';

import { interval } from 'rxjs';

import { NgxToastService } from 'ngx-toast-notifier';

@Component({
  selector: 'app-menu-cliente',
  templateUrl: './menu-cliente.component.html',
  styleUrls: ['./menu-cliente.component.css']
})
export class MenuClienteComponent implements OnInit {

  hidden = false;

  p:any = 1;
  filtro:any = '';
  filtro_training:any = '';

  nombre:string = '';
  documento:any = '';

  listTraining:any;
  oneTraining:any;

  nombre_ejecucion:any = '';
  numero_series:any = '';
  nombre_repeticion:any = '';

  img:any;
  content:any;

  content_temp:any;

  photo:any;

  solicituad_env:any = '';

  state_temp:any = '';

  textToConvert: string|any;
  password: string = 'gKB&uH0MZQVfJA1fE%aW';
  conversionOutput: string|any;

  fecha_cita:any;
  hora_cita:any;
  tipo_cita:any;

  listTypeAssessment:any;

  listAllAssessment:any;

  stateTraining:any = '';
  dias_entre:any = '';

  listTemp:any;
  nombre_suscripcion:any;

  fecha_inicio:any = '';
  fecha_fin:any = '';
  dias_restantes:any = '';
  state_pago:any = '';

  stateChallenges:any = '';
  stateTrainingChallenges:any = '';
  dataChallenges:any;
  listTrainingChallenges:any;
  id_retos:any;
  nombre_reto:any = '';
  oneTrainingChallenges:any;

  listNotification:any;
  countRowsNotification:any;
  amountNotification:any = 0;

  applyForm = new FormGroup({
    documento_reservacion: new FormControl('',Validators.required),
    id_reservacion_usuario: new FormControl(0,Validators.required),
    state: new FormControl(1,Validators.required)
  });

  constructor(
    private system: SistemaService,
    private authService: AuthUsersService,
    private router: Router,
    private assessment: AssessmentService,
    private nutrition: NutritionService,
    private routines: RoutinesService,
    private challenges: ChallengesService,
    private notification: NotificationService,
    private ngxToastService: NgxToastService
  ) {

    this.updateData();


    this.updateNotification();
    this.countNotificaction();

    this.updateIntervalNotification();

   }

  ngOnInit(): void {
  }

  updateData(){

    const token:any = localStorage.getItem('token');

    let decodetoken:any = {};
    decodetoken = decode(token);
    const { documento ,nombres, primer_apellido, segundo_apellido} = decodetoken;

    this.nombre = nombres + " " + primer_apellido + " " + segundo_apellido;
    this.documento = documento;

    let form = {};
    form = {documento};
    this.authService.getImg(form).subscribe(res => {
      this.photo = res;
    });



    this.system.getImg().subscribe(res => {

      this.img = res;
       for(let x of this.img){

         this.content = this.arrayBufferToBase64(x.logo.data);
       }

     })



     this.assessment.selectAllReservacion().subscribe(res => {

      this.listTypeAssessment = res;

     });


  }


  updateNotification(){

    const documento = this.documento;
    let form = {documento};
    this.notification.selectAllNotification(form).subscribe(res => {

        if(res == ''){

          this.ngxToastService.onInfo('Notificaciones','El buzón de notificaciones está vacio.')

        }else{

          this.ngxToastService.onInfo('Notificaciones','Tienes notificaciones sin revisar.')
          this.listNotification = res;

        }

    });

  }

  countNotificaction(){

    const documento = this.documento;
    let form = {documento};
    
    this.notification.countRowsNotifications(form).subscribe(res => {

        this.content_temp = res;
        for(let x of this.content_temp){
          this.countRowsNotification = x.conteo;
          this.amountNotification = x.conteo;
        }

    });

  }

  updateIntervalNotification(){

    const counter = interval(70000);

    counter.subscribe(() => {

      const documento = this.documento;
      let form = {documento};
      
      this.notification.countRowsNotifications(form).subscribe(res => {
  
          this.content_temp = res;
          let conteo:any = 0;

          for(let x of this.content_temp){
            conteo = x.conteo;
          }

          if(conteo > this.countRowsNotification){

            this.updateNotification();
            this.countRowsNotification = conteo;
            this.amountNotification = conteo - this.countRowsNotification;
          }

  
      });

    });

  }

  formatDateNotification(semanas:any,dias:any,fecha:any,hora:any){
    let result:any = '';
    const hora_temp = hora.substring(0,5);

    if(dias == 0){
      result = 'Hoy a las ' + hora_temp;
    }else if(dias == 1){

      result = 'Hace ' + dias + ' Día. Hora: ' + hora_temp;

    }else if(dias >= 2 && dias <= 7){

      result = 'Hace ' + dias + ' Días. Hora: ' + hora_temp;

    }else if(semanas == 1 && dias == 0){

      result = 'Hace ' + semanas + ' Semana.';

    }else if(semanas == 1 && dias == 1){

      result = 'Hace ' + semanas + ' Semana y ' + dias + ' Día.';

    }else if(semanas >= 2 && semanas <= 4 && dias >= 2 && dias <= 7){

      result = 'Hace ' + semanas + ' Semanas y ' + dias + ' Días.'

    }else if(semanas > 4){

      result = fecha + '  ' + hora_temp;

    }

    return result;
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




    
   closeSession(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Cerrar Sesión',
      text: "¿Seguro que desea cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
        localStorage.clear();
        this.router.navigateByUrl('inicio');

        Swal.fire({
          icon: 'success',
          text: 'Gracias por preferirnos. ¡Regresa prongo!'
        }).then(response => {

          window.location.reload();

        });

        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        swalWithBootstrapButtons.fire(
          
          'La sesión no se cerró, sigue disfrutando de nuestros servicios.',
          'success'
        )

      }
    })
    


   }





   goToDashboard(){

      const documento = this.documento;
      let form = {documento};

      this.assessment.searchTypeAssessmentclient(form).subscribe(res => {

            let nombre_valoracion:any = '';

            this.content_temp = res;
            for(let x of this.content_temp){

              nombre_valoracion = x.nombre_valoracion;

            }

            if(nombre_valoracion == 'Básico'){

              this.assessment.searchAssessmentExt(form).subscribe(res => {

                if(res == ''){

                  this.textToConvert = documento;
                  this.encrypt();
            
                  localStorage.setItem('assessment',this.conversionOutput);
            
                  this.router.navigateByUrl('dashboard-basic');

                }else{

                  Swal.fire({
                    icon: 'error',
                    text: 'Actualmente no cuentan con valoraciones, solicite una valoracion o hable con la persona encargada del local.'
                  });

                }


              });


            }else if(nombre_valoracion == 'Avanzado'){

              this.assessment.searchAssessmentExt(form).subscribe(res => {

                if(res == ''){

                  this.textToConvert = documento;
                  this.encrypt();
            
                  localStorage.setItem('assessment',this.conversionOutput);
                  this.router.navigateByUrl('dashboard-advanced');

                }else{

                  Swal.fire({
                    icon: 'error',
                    text: 'Actualmente no cuentan con valoraciones, solicite una valoracion o hable con la persona encargada del local.'
                  });

                }


              });



            }





      });




   }



   validateStateAssessment(){

    
    const documento = this.documento;
    let form = {documento};

    this.assessment.searchStateQuotes(form).subscribe(res => {

      let hora_temp:any = '';

      this.content_temp = res;
      for(let x of this.content_temp){
        this.solicituad_env = x.tipo_de_estado;
        this.state_temp = x.id_tipo;


        this.fecha_cita = x.date;
        this.tipo_cita = x.nombre_reservacion;
        hora_temp = x.hora;
      }


        this.hora_cita = hora_temp;



    });


   }


   cancellQuote(){

    
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Cancelar la Cita',
      text: "¿Está seguro que desea cancelar la cita?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const documento_reservacion = this.documento;
        const state = this.state_temp;
  
        let form = {documento_reservacion, state};
  
        this.assessment.cancellQuoteAssessment(form).subscribe(res => {
  
          if(res == 'Cita Cancelada con exito'){
  
            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'La solicitud de cita se cancelón con éxito'
            });
  
          }else{
  
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
            });
  
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


   searchAllQuotesAssessment(){

      const documento = this.documento;
      let form = {documento};

      this.assessment.selectAllQuotesOneUser(form).subscribe(res => {

        this.listAllAssessment = res;

      });

   }


   formatTime(hora:any){
      let hora_now:any;
      const hora_temp = hora.substring(0,1);

      if(hora_temp < 12){
        hora_now = hora + " - AM"
      }else if(hora_temp >= 12){
        hora_now = hora + " - PM";
      }

      return hora_now;
   }



   applyForAssessment(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Solicitar Cita de Valoración',
      text: "¿Está seguro que desea soliicitar la valoración?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        form.documento_reservacion = this.documento;
        
        if(form.id_reservacion_usuario == 0){

          Swal.fire({
            icon: 'error',
            text: 'Para poder realizar la solicitud debe seleccionar un tipo de valoración.'
          })

        }else{

          this.assessment.CreateSolicitadAssessment(form).subscribe(res => {
  
            if(res == 'Solicitud creada con exito'){
    
              Swal.fire({
                icon: 'success',
                title: 'Proceso Completado',
                text: 'La solicitud se realizó con éxito, en los próximos días se le dará a conocer los datos de la cita.'
              })
    
            }else{
    
              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
              });
    
            }
    
          });

        }


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })



 

   }


   searchPlanNutrition(){

      const documento_plan = this.documento;
      let form = {documento_plan};

      this.nutrition.searchIDNutrition(form).subscribe(res => {

        if(res == ''){

          Swal.fire({
            icon: 'error',
            text: 'Actualmente no cuenta con un plan de alimentación asignado, para esto, debe solicitar primero una valoración que se le asigne un plan de alimentación'
          })

        }else{

          let id_plan_nutri:any = '';

          this.content_temp = res;
          for(let x of this.content_temp){

            id_plan_nutri = x.id_plan_nutri;

          }

          const documento = this.documento;
          this.textToConvert = documento;
          this.encrypt();
          const new_document = this.conversionOutput;
          localStorage.setItem('plan',new_document);
          this.router.navigateByUrl('view-nutrition-personal/' + id_plan_nutri);


        }


      });


   }



   searchListTraining(dias_entre:any){

      const documento = this.documento;
      let form = {documento,dias_entre};
      this.dias_entre = dias_entre;

      this.routines.selectTrainingOfUser(form).subscribe(res => {

        this.listTraining = res;
        for(let x of this.listTraining){

          this.nombre_ejecucion = x.nombre_ejecucion;
          this.numero_series = x.numero_series;
          this.nombre_repeticion = x.nombre_repeticion;

        }



      });

   }

   validatePlanTraining(){

      const documento = this.documento;
      let form = {documento};

      this.routines.validatePlanUser(form).subscribe(res => {

        if(res == ''){

            this.stateTraining = 'sin';

        }else{

            this.stateTraining = 'con';

        }

      });

   }

   

   searchOneTraining(id_ejercicios:any){

      const dias_entre = this.dias_entre;
      let form = {id_ejercicios,dias_entre};

      this.routines.searchOneTraining(form).subscribe(res => {

        this.oneTraining = res;

      });

   }

   dataUser(){

      const documento = this.documento;
      let form = {documento};

      this.authService.selectDataUserDateInitAndFinish(form).subscribe(res => {



        this.listTemp = res;
        for(let x of this.listTemp){
          this.nombre_suscripcion = x.titulo_suscripcion;
          this.fecha_inicio = x.fecha_inicio;
          this.fecha_fin = x.fecha_fin;
        }

        let form = {documento};
        this.authService.selectNumberDays(form).subscribe(res => {

            let dias:any = '';
            let mes:any = '';

            this.listTemp = res;
            for(let x of this.listTemp){
              
              dias = x.dias;
              mes = x.mes;

            }

            if(mes == 0){

              if(dias == 1){

                this.dias_restantes  = dias + " Día.";

              }else if(dias >= 2){

                this.dias_restantes  = dias + " Días.";

              }
              this.state_pago = 'pagado';  
            }else if(mes == 1){

              if(dias == 0){

                this.dias_restantes = mes + " Mes.";

              }else if(dias == 1){

                this.dias_restantes = mes + " Mes y " + dias + " Día.";

              }else if(dias >= 2){

                this.dias_restantes = mes + " Mes y " + dias + " Días.";

              }
            this.state_pago = 'pagado';  
            }else if(mes >= 2){

              if(dias == 0){
              
                this.dias_restantes = mes + " Meses.";

              }else if(dias == 1){

                this.dias_restantes = mes + " Meses y " + dias + " Día."

              }else if(dias >= 2){

                this.dias_restantes = mes + " Meses y " + dias + " Días."

              }

            this.state_pago = 'pagado';  
            }

            if(dias == 0 && mes == 0){

              this.dias_restantes = "-";
              this.state_pago = 'vencido';

            }


        });


      });


   }


   validateStateChallenges(){

      this.challenges.selectStateChallengesUser().subscribe(res => {

          if(res == ''){

            this.stateChallenges = 'no_hay';

          }else{

            this.stateChallenges = 'hay';
            this.dataChallenges = res;

            let id_retos:any = '';

            for(let x of this.dataChallenges){
              id_retos = x.id_retos;
              this.nombre_reto = x.nombre_reto;
            }
            this.id_retos = id_retos;

            let form = {id_retos};
            this.challenges.selectTrainingChallenges(form).subscribe(res => {
      
                if(res == ''){

                    this.stateTrainingChallenges = 'no_hay';

                }else{

                    this.stateTrainingChallenges = 'si_hay';

                }

      
            });
      


          }

      });

   }


   validateTrainingChallenges(id_retos:any){

      let form = {id_retos};
      this.id_retos = id_retos;
  
      this.challenges.selectTrainingChallenges(form).subscribe(res => {

        this.listTrainingChallenges = res;

      });

   }

   searchOneTrainingChallenges(id_ejercicios:any){

    const id_retos = this.id_retos;
    let form = {id_retos, id_ejercicios};
    
    this.challenges.selectOneTrainingChallenges(form).subscribe(res => {
      
      this.oneTrainingChallenges = res;

    });

   }


   registeredUserToChallenges(){

    Swal.fire({
      title: '¿Estás seguro que quieres registrarte?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        const documento_us = this.documento;
        const id_retos_us = this.id_retos;
  
        let form = {id_retos_us, documento_us};
        this.challenges.registeredClientChallenges(form).subscribe(res => {

            if(res == 'Usuario registrado con exito'){

                const documento_usu = this.documento;
                const id_noti = Math.floor((Math.random() * (99999999-10000000))+10000000);
                const texto = '¡Ya estás registrado en el reto ' + this.nombre_reto + '! No olvides revisar tu correo electronico y tu WhatsApp.';

                let form1 = {id_noti, documento_usu, texto};
                this.notification.createNotification(form1).subscribe(res => {

                    if(res == 'Notificación creada con exito'){

                      Swal.fire({
                        icon: 'success',
                        title: 'Proceso Completado',
                        text: '¡Ya estás registrado! En breve te enviaremos un correo electronico o un mensaje de WhatsApp detallando la información necesaria para ese día.'
                      }).then(response => {

                          this.updateNotification();
                          this.countRowsNotification();

                      });

                    }else{

                      Swal.fire({
                        icon: 'error',
                        title: 'Proceso Fallido',
                        text: 'Actualmente no es posible registrar una notificación, intente nuevamente'
                      });

                    }

                });



            }else if(res == 'Ya te encuentras registrado'){  

              Swal.fire({
                icon: 'info',
                text: '¡Ya te encuentras registrado en este reto!'
              });
  
            }
  
        });


      } else if (result.isDenied) {

        Swal.fire('¡No te registramos!', '', 'info')
      }
    })

   }


   createPlanPersonal(){


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Crear Plan de Entrenamiento Personalizado',
      text: "¿Está seguro que desea crear un plan de entrenamiento sin supervisión de un profesional?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const documento_entre:any = this.documento;
        const id_entrenamiento:any = Math.floor((Math.random() * (99999999-10000000))+10000000);
        const nombre_entrenamiento:any = 'Personal-' + documento_entre;
  
        let form = {documento_entre, id_entrenamiento, nombre_entrenamiento};
        this.routines.createPlanPersonalUser(form).subscribe(res => {
  
            if(res == 'Plan personal creado con exito'){
  
            Swal.fire({
              imageUrl: 'https://img.icons8.com/external-others-iconmarket/64/000000/external-danger-traffic-signs-others-iconmarket-2.png',
              imageWidth: 100,
              imageHeight: 100,
              imageAlt: 'Custom image',
              html: '<h3 style="color: red;">Nota Importante:</h3></b><br> ' +
                    'Si decide en último momento cancelar el proceso de registro, se quedará sin plan de entrenamiento, por lo cual, deberá solicitar a un entrenador que le asigne un plan de entrenamiento.<br>' +
                    'A continuación podrá crear el plan de entrenamiento determinando ejercicios, tipo de ejecución, etc.',
              }).then(response => {

                this.router.navigateByUrl('/record-routine/'+id_entrenamiento);

              });
  
            }else{
  
              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
              });
  
            }
  
  
        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        Swal.fire('Se canceló el proceso con éxito', '', 'info')

      }
    })

   }


   deleteNotification(id_noti_us:any){

    Swal.fire({
      icon: 'warning',
      title: 'Eliminar Información',
      text: '¿Seguro que desea eliminar la notificación?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      denyButtonText: `No estoy seguro`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
        const documento_usu = this.documento;
        let form = {id_noti_us,documento_usu};
        this.notification.deleteNotificationUser(form).subscribe(res => {
  
          if(res == 'Notificación eliminada con exito'){
  
            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'La notificación se elimino con éxito'
            }).then(response => {
  
              this.updateNotification();
  
            });
  
          }else{
  
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente '
            });
  
          }
  
        });


      } else if (result.isDenied) {

        Swal.fire('No se elimino la notifiación', '', 'info')
      }
    })


   }




   encrypt() {
    this.conversionOutput = CryptoJS.AES.encrypt(this.textToConvert.trim(), this.password.trim()).toString();
  }

    decrypt(){
    this.conversionOutput = CryptoJS.AES.decrypt(this.textToConvert.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
  }


  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  } 


//Botón del paginador -------------------------------
  handlePageChange(event:any) {
    this.p = event;
  }
//----------------------------------------------------  

}
