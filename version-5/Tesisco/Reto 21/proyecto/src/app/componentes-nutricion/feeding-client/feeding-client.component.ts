import { Component, OnInit } from '@angular/core';

import { NutritionService } from 'src/app/servicios/nutrition/nutrition.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { DatePipe } from '@angular/common';

import { SistemaService } from 'src/app/servicios/sistema/sistema.service';
import * as CryptoJS from 'crypto-js';

import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';
import { EmailService } from 'src/app/servicios/email/email.service';
import { NotificationService } from 'src/app/servicios/notification/notification.service';

@Component({
  selector: 'app-feeding-client',
  templateUrl: './feeding-client.component.html',
  styleUrls: ['./feeding-client.component.css']
})
export class FeedingClientComponent implements OnInit {

  img_logo:any;
  content:any;

  listNewUser:any;
  listOldUser:any;
  listNutrition:any;

  listAuxiliar:any;

  listDate:any;

  listDate_now:any;

  filtro_user_old:any = '';
  filtro_user_new:any = '';

  content_temp:any;

  p:any = 1;

  documento:any = '';
  id_plan:any = '';
  nameNutrition:any;

  fecha_hoy:any = '';

  textToConvert: string|any;
  password: string = 'gKB&uH0MZQVfJA1fE%aW';
  conversionOutput:any|string;

  id_plan_temp:any = '';
  tipo_plan:any = '';

  nutritionForm = new FormGroup({
    id_plan_nutri: new FormControl('',Validators.required),
    documento_plan: new FormControl('',Validators.required),
    fecha_fin: new FormControl('',Validators.required),
    meta: new FormControl('',Validators.required)
  });

  updateNutritionDate = new FormGroup({
    documento_plan: new FormControl('',Validators.required),
    fecha_fin: new FormControl('',Validators.required),
    meta: new FormControl('',Validators.required)
  });

  createPlanNutrition = new FormGroup({
    id_plan: new FormControl('',Validators.required),
    documento_plan: new FormControl('',Validators.required),
    nombre_plan: new FormControl('',Validators.required),
    fecha_fin: new FormControl('',Validators.required),
    meta: new FormControl('',Validators.required)
  });


  constructor(
    private service:NutritionService,
    private router:Router,
    private system:SistemaService,
    private email:EmailService,
    private auth:AuthUsersService,
    private notification:NotificationService
  ) { 

    this.system.getImg().subscribe(res => {

      this.content = res;
      for(let x of this.content){

        this.img_logo = this.arrayBufferToBase64(x.logo.data);
      }

    });

    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    let fecha_hoy:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
    this.fecha_hoy = fecha_hoy;

    this.service.selectNewUsers().subscribe(res => {

      this.listNewUser = res;

    });

    this.service.selectOldUsers().subscribe(res => {

      this.listOldUser = res;

    });

    this.service.selectNutritionGeneral().subscribe(res => {

      this.listNutrition = res;

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

  assingDocument(documento:any){

    this.documento = documento;

  }

  addID_Plan(id_plan:any){

    this.id_plan = id_plan;
    this.seeNameNutrition();

  }

  cleanUpNutrition(){

    this.documento = '';
    this.id_plan = '';
    this.nutritionForm.reset();

  }

  cleanUpId_Plan(){
    this.id_plan = '';
  }

  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  addPlanNutrition(form:any){

    form.documento_plan = this.documento;
    form.id_plan_nutri = this.id_plan;

    let fecha_revision:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

    if(form.fecha_fin == fecha_revision){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Debe seleccionar una fecha diferente a la actual'
      })

    }else{

      if(form.fecha_fin < fecha_revision){

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'Debe seleccionar una fecha valida para realizar el registro'
        });

      }else{

        const fecha_validacion = this.addDaysToDate(fecha_revision,32);
        let fecha_revision_max:any = this.pipe.transform(fecha_validacion, 'yyyy-MM-dd');

        if(form.fecha_fin < fecha_revision_max){

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Debe seleccionar una fecha valida para realizar el registro, los planes de alimentación se asignan minimo por un mes'
          });

        }else{

          if(form.meta == ''){

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Debe llenar todos los campos requeridos en el formulario'
            });

          }else{

            this.service.assingNutritionForNewUser(form).subscribe(res => {

              if(res == 'Plan Nutricional asignado con exito'){

                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Completado',
                  text: 'Se asignó el plan de alimentación con éxito'
                }).then(response => {

                  this.updateData();
                  this.cleanUpNutrition();

                  const documento = this.documento;
                  let form1 = {documento};
                  this.auth.searchEmailUser(form1).subscribe(res => {

                    let correo:any = '';

                    this.content_temp = res;
                    for(let x of this.content_temp){
                      correo = x.correo;
                    }

                    let form2 = {correo};
                    this.email.sendEmailAssingPlanNutrition(form2).subscribe(res => {

                      if(res == 'Correo enviado'){

                        Swal.fire({
                          icon: 'success',
                          text: 'Se notificó via correo electronico al usuario la asignación del plan de alimentación.'
                        }).then(response => {

                          const documento_usu:any = documento;
                          const id_noti_us:any = 37;
                          let form5 = {id_noti_us,documento_usu};
                          this.notification.sendOneNotification(form5);

                        });

                      }else{

                        Swal.fire({
                          icon: 'error',
                          title: 'Proceso Fallido',
                          text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente.'
                        })

                      }

                    });


                  });





                });



              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'No es posible realizar la petición actual, intente más tarde'
                });

              }

            });



          }




        }



        
        


      }

    }


  }


  addDaysToDate(date:any, days:any){
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
  }

  seeNameNutrition(){

    const id_plan = this.id_plan;
    let form = {id_plan};

    this.service.selectNameNutrition(form).subscribe(res => {

      this.listAuxiliar = res;
      for(let x of this.listAuxiliar){
        this.nameNutrition = x.nombre_plan;
      }

    });

  }


  addPlanNutrition_OldUser(form:any){

    form.documento_plan = this.documento;
    form.id_plan_nutri = this.id_plan;

    let fecha_revision:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

    if(form.fecha_fin == fecha_revision){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Debe seleccionar una fecha diferente a la actual'
      })

    }else{

      if(form.fecha_fin < fecha_revision){

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'Debe seleccionar una fecha valida para realizar el registro'
        });

      }else{

        const fecha_validacion = this.addDaysToDate(fecha_revision,32);
        let fecha_revision_max:any = this.pipe.transform(fecha_validacion, 'yyyy-MM-dd');

        if(form.fecha_fin < fecha_revision_max){

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Debe seleccionar una fecha valida para realizar el registro, los planes de alimentación se asignan minimo por un mes'
          });

        }else{

          if(form.meta == ''){

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Debe llenar todos los campos requeridos en el formulario'
            });

          }else{

            this.service.assingNutritionForOldUser(form).subscribe(res => {

              if(res == 'Plan Nutricional asignado con exito'){

                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Completado',
                  text: 'Se asignó el plan de alimentación con éxito'
                }).then(response => {

                  this.updateData();
                  this.cleanUpNutrition();

                  const documento = this.documento;
                  let form1 = {documento};
                  this.auth.searchEmailUser(form1).subscribe(res => {

                    let correo:any = '';

                    this.content_temp = res;
                    for(let x of this.content_temp){
                      correo = x.correo;
                    }

                    let form2 = {correo};
                    this.email.sendEmailAssingPlanNutrition(form2).subscribe(res => {

                      if(res == 'Correo enviado'){

                        Swal.fire({
                          icon: 'success',
                          text: 'Se notificó via correo electronico al usuario la asignación del plan de alimentación.'
                        }).then(response => {

                          const documento_usu:any = documento;
                          const id_noti_us:any = 37;
                          let form5 = {id_noti_us,documento_usu};
                          this.notification.sendOneNotification(form5);

                        });

                      }else{

                        Swal.fire({
                          icon: 'error',
                          title: 'Proceso Fallido',
                          text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente.'
                        })

                      }

                    });


                  });



                });


              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'No es posible realizar la acción solicitada actualmente, intente nuevamente'
                });

              }


            });



          }




        }


      }

    }


  }



  searchNutrition(documento_plan:any,id_plan:any,nombre_tipo_nutri:any){

    if(nombre_tipo_nutri == 'General'){
      this.tipo_plan = '';
    }else if(nombre_tipo_nutri == 'Personalizado'){
      this.tipo_plan = 'Personalizado';
      this.id_plan_temp = id_plan;
    }

    let form = {documento_plan};

    this.service.selectDateNutrition(form).subscribe(res => {

      this.listDate = res;
      for(let x of this.listDate){
        this.listDate_now = x.fecha_fin.substring(0,10);
      }

    });


  }

  cleanUpNutrition_form(){
    this.updateNutritionDate.reset();
  }



  updateNutritionUser(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        let fecha_revision:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

        if(form.fecha_fin == fecha_revision){
    
          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Debe seleccionar una fecha diferente a la actual'
          })
    
        }else{
    
          if(form.fecha_fin < fecha_revision){
    
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Debe seleccionar una fecha valida para realizar el registro'
            });
    
          }else{
    
            const fecha_validacion = this.addDaysToDate(fecha_revision,32);
            let fecha_revision_max:any = this.pipe.transform(fecha_validacion, 'yyyy-MM-dd');
    
            if(form.fecha_fin < fecha_revision_max){
    
              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'Debe seleccionar una fecha valida para realizar el registro, los planes de alimentación se asignan minimo por un mes'
              });
    
            }else{
    
              if(form.meta == ''){
    
                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Debe llenar todos los campos requeridos en el formulario'
                });
    
              }else{
    
                this.service.updateNutrition(form).subscribe(res => {
    
                  if(res == 'Actualización de los datos del plan de nutricion'){
    
                    Swal.fire({
                      icon: 'success',
                      title: 'Proceso Completado',
                      text: 'La información del plan de alimentación se actualizó con éxito'
                    }).then(response => {
    
                      this.cleanUpNutrition_form();
                      

                      const documento = this.documento;
                      let form1 = {documento};
                      this.auth.searchEmailUser(form1).subscribe(res => {
    
                        let correo:any = '';
    
                        this.content_temp = res;
                        for(let x of this.content_temp){
                          correo = x.correo;
                        }
    
                        let form2 = {correo};
                        this.email.sendEmailAssingPlanNutrition(form2).subscribe(res => {
    
                          if(res == 'Correo enviado'){
    
                            Swal.fire({
                              icon: 'success',
                              text: 'Se notificó via correo electronico al usuario la asignación del plan de alimentación.'
                            }).then(response => {


                                const documento_usu:any = documento;
                                const id_noti_us:any = 37;
                                let form5 = {id_noti_us,documento_usu};
                                this.notification.sendOneNotification(form5);
      
                            });
    
                          }else{
    
                            Swal.fire({
                              icon: 'error',
                              title: 'Proceso Fallido',
                              text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente.'
                            })
    
                          }
    
                        });
    
    
                      });
    
                    });
    
                  }else{
    
                    Swal.fire({
                      icon: 'error',
                      title: 'Proceso Fallido',
                      text: 'Actualmente no es posible realizar la petición actual, intente nuevamente'
                    });
    
                  }
    
                });
    
    
              }
    
            }
    
          }
    
        }

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        swalWithBootstrapButtons.fire(
          'Cancelado',
          'success'
        )

      }
    })

  }


  seePlanNutrition(id_plan:any,documento:any){

    this.textToConvert = documento;
    this.encrypt();
    const new_document = this.conversionOutput;
    localStorage.setItem('plan',new_document);
    this.router.navigateByUrl('view-nutrition-personal/' + id_plan);

  }


  createPlanNutritionPersonal(form:any){

    let fecha_revision:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

    if(form.fecha_fin == fecha_revision){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Debe seleccionar una fecha diferente a la actual'
      })

    }else{

      if(form.fecha_fin < fecha_revision){

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'Debe seleccionar una fecha valida para realizar el registro'
        });

      }else{

        const fecha_validacion = this.addDaysToDate(fecha_revision,32);
        let fecha_revision_max:any = this.pipe.transform(fecha_validacion, 'yyyy-MM-dd');

        if(form.fecha_fin < fecha_revision_max){

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Debe seleccionar una fecha valida para realizar el registro, los planes de alimentación se asignan minimo por un mes'
          });

        }else{

          if(form.meta == ''){

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Debe llenar todos los campos requeridos en el formulario'
            });

          }else{

              if(form.nombre_plan == ''){

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Debe llenar todos los campos requeridos en el formulario'
                });

              }else{

                form.id_plan =  Math.floor((Math.random() * (99999999-10000000))+10000000);
                form.documento_plan = this.documento;
                console.log(form);
               
                this.service.createPlanNutritionPersonal(form).subscribe(res => {

                  if(res == 'Plan nutricional creado con exito'){

                    Swal.fire({
                      icon: 'success',
                      text: 'A continuación debe llenar el formulario para completar el registro del plan de alimentación'
                    }).then(response => {
                      
                      this.textToConvert = form.documento_plan;
                      this.encrypt();
                      const documento_now = this.conversionOutput;

                      localStorage.setItem('nutrition',documento_now);
                      this.router.navigateByUrl('create-nutrition-personal/'+form.id_plan);

                    });

                  }else{

                    Swal.fire({
                      icon: 'error',
                      title: 'Proceso Fallido',
                      text: 'Actualmente no es posible realizar el proceso solicitado, intente nuevamente'
                    });

                  }

                });

              }





          }




        }

      }

    }



  }



  createPlanNutritionPersonalOld(form:any){

    let fecha_revision:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

    if(form.fecha_fin == fecha_revision){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Debe seleccionar una fecha diferente a la actual'
      })

    }else{

      if(form.fecha_fin < fecha_revision){

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'Debe seleccionar una fecha valida para realizar el registro'
        });

      }else{

        const fecha_validacion = this.addDaysToDate(fecha_revision,32);
        let fecha_revision_max:any = this.pipe.transform(fecha_validacion, 'yyyy-MM-dd');

        if(form.fecha_fin < fecha_revision_max){

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Debe seleccionar una fecha valida para realizar el registro, los planes de alimentación se asignan minimo por un mes'
          });

        }else{

          if(form.meta == ''){

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Debe llenar todos los campos requeridos en el formulario'
            });

          }else{

              if(form.nombre_plan == ''){

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Debe llenar todos los campos requeridos en el formulario'
                });

              }else{

                form.id_plan =  Math.floor((Math.random() * (99999999-10000000))+10000000);
                form.documento_plan = this.documento;
                console.log(form);
               
                this.service.assingNutritionOldUser(form).subscribe(res => {

                  if(res == 'Nutricion creado con exito'){

                    Swal.fire({
                      icon: 'success',
                      text: 'A continuación debe llenar el formulario para completar el registro del plan de alimentación'
                    }).then(response => {
                      
                      this.textToConvert = form.documento_plan;
                      this.encrypt();
                      const documento_now = this.conversionOutput;

                      localStorage.setItem('nutrition',documento_now);
                      this.router.navigateByUrl('create-nutrition-personal/'+form.id_plan);

                    });

                  }else{

                    Swal.fire({
                      icon: 'error',
                      title: 'Proceso Fallido',
                      text: 'Actualmente no es posible realizar el proceso solicitado, intente nuevamente'
                    });

                  }

                });

              }





          }




        }

      }

    }



  }



  updatePlanNutritionPersonalizado(){

    const id_plan = this.id_plan_temp;
    
    Swal.fire({
      icon: 'warning',
      text: 'A continuación podrá editar el plan de alimentación personalizado del usuario.'
    }).then(response => {

        this.router.navigateByUrl('nutrition-personal-update/'+id_plan);

    });

  }





  encrypt() {
    this.conversionOutput = CryptoJS.AES.encrypt(this.textToConvert.trim(), this.password.trim()).toString();
  }

  decrypt(){
    this.conversionOutput = CryptoJS.AES.decrypt(this.textToConvert.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
  }

    //Paginador------------------------------------------------

    handlePageChange(event:any) {
      this.p = event;
    }
  
}
