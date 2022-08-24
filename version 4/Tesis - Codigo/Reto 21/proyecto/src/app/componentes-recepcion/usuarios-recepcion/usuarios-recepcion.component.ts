import { Component, OnInit } from '@angular/core';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import { DatePipe } from '@angular/common';  
import Swal from 'sweetalert2';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SistemaService } from 'src/app/servicios/sistema/sistema.service';


@Component({
  selector: 'app-usuarios-recepcion',
  templateUrl: './usuarios-recepcion.component.html',
  styleUrls: ['./usuarios-recepcion.component.css']
})
export class UsuariosRecepcionComponent implements OnInit {

  p:any = 0;
  filtro:any = '';

  perfil:any;

  listAllClient:any;
  listTypeDocument:any;
  listGender:any;
  listSuscription:any;
  listTypeAssessment:any;

  nameSuscription:any = '';
  costSuscription:any = '';
  fecha_de_inicio:any = '';
  fecha_de_fin:any = '';
  state_fecha_pago:any = '';

  list_temp:any;

  today: Date = new Date();
  pipe = new DatePipe('en-US');

  date_temp:any = '';
  date_temp_update:any = '';
  date_temp_update_pago:any = '';

  documento_usuario:any = '';

  state_update_plans:any = '';

  duracion_plan:any = '';

  content_logo:any;
  img_logo:any;

  formUpdatePago = new FormGroup({
    documento_usuarios_pago: new FormControl('',Validators.required),
    fecha_de_fin: new FormControl('',Validators.required)
  });

  formUpdateDateUser = new FormGroup({
      documento: new FormControl('',Validators.required),
      nombres: new FormControl('',Validators.required),
      primer_apellido: new FormControl('',Validators.required),
      segundo_apellido: new FormControl('',Validators.required),
      correo: new FormControl('',Validators.required),
      numero_telefono: new FormControl('',Validators.required)
  });

  formRegisterAssissment = new FormGroup({
    id_asistencia_usuario: new FormControl('',Validators.required), 
    documento_asistencia: new FormControl('',Validators.required),
    temperatura: new FormControl('',Validators.required)
  });

  formUpdateTypeAssessment = new FormGroup({
    id_valoracion_tipo: new FormControl(0,Validators.required),
    documento_tipo: new FormControl('',Validators.required),
  });

  formUpdatePlans = new FormGroup({
    documento_usuarios_pago: new FormControl('',Validators.required),
    id_suscripcion_pago: new FormControl(0,Validators.required),
    fecha_de_fin: new FormControl('',Validators.required)
  });

  createNewUser = new FormGroup({
    tipo_de_documento: new FormControl(0,Validators.required),
    documento: new FormControl('',Validators.required),
    nombres: new FormControl('',Validators.required),
    primer_apellido: new FormControl('',Validators.required),
    segundo_apellido: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    numero_telefono: new FormControl('',Validators.required),
    estado: new FormControl(1,Validators.required),
    genero: new FormControl(0,Validators.required),
    img: new FormControl(1,Validators.required),
    fecha_nacimiento: new FormControl('',Validators.required),
    id_suscripcion_pago: new FormControl(0,Validators.required),
    fecha_de_inicio: new FormControl('',Validators.required),
    fecha_de_fin: new FormControl('',Validators.required),
    id_valoracion_tipo: new FormControl(0,Validators.required)
  });

  constructor(
    private auth: AuthUsersService,
    private system: SistemaService
  ) {

    this.updateData();
    this.updateContent();

    this.system.getImg().subscribe(res => {

      this.content_logo = res;
      for(let x of this.content_logo){
        this.img_logo = this.arrayBufferToBase64(x.logo.data);
      }
      
    });

   }

  ngOnInit(): void {
  }

  updateData(){

    this.auth.selectAllClient().subscribe(res => {

        this.listAllClient = res;

    });




  }

  updateContent(){

    this.auth.getDocuments().subscribe(res => {

      this.listTypeDocument = res;

    });

    this.auth.getGender().subscribe(res => {

      this.listGender = res;

    });

    this.auth.selectPlanSuscription().subscribe(res => {

      this.listSuscription = res;

    });

    this.auth.selectTypeValoracion().subscribe(res => {

      this.listTypeAssessment = res;

    });

  }


  searchPlanes(id_suscripcion:any,documento:any){

    let form = {id_suscripcion,documento};
    this.documento_usuario = documento;
    this.auth.searchSuscription(form).subscribe(res => {

      let duracion:any = '';

      this.list_temp = res;
      for(let x of this.list_temp){
        this.nameSuscription = x.titulo_suscripcion;
        this.costSuscription = x.precio
        this.fecha_de_inicio = x.fecha_de_inicio.substring(0,10);
        this.fecha_de_fin = x.fecha_de_fin.substring(0,10);
        duracion = x.duracion;
        this.duracion_plan = x.duracion;
      }

      let fecha_now:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
      if(this.fecha_de_inicio <= fecha_now && this.fecha_de_fin > fecha_now){
          this.state_fecha_pago = 'al_dia';
      }else if(this.fecha_de_fin == fecha_now){
          this.state_fecha_pago = 'casi';

          let e = new Date()
          e.setMonth(e.getMonth() + duracion);
          const date_temp = e.getMonth()+1;
          if(date_temp < 10){
            this.date_temp_update_pago = e.getFullYear() +"-0"+ (e.getMonth()+1) +"-"+ e.getDate();
          }else if(date_temp >= 10){
            this.date_temp_update_pago = e.getFullYear() +"-"+ (e.getMonth()+1) +"-"+ e.getDate();
          }
    

      }else if(this.fecha_de_fin < fecha_now){
          this.state_fecha_pago = 'sin';

          let e = new Date()
          e.setMonth(e.getMonth() + duracion);
          const date_temp = e.getMonth()+1;
          if(date_temp < 10){
            this.date_temp_update_pago = e.getFullYear() +"-0"+ (e.getMonth()+1) +"-"+ e.getDate();
          }else if(date_temp >= 10){
            this.date_temp_update_pago = e.getFullYear() +"-"+ (e.getMonth()+1) +"-"+ e.getDate();
          }

      }


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




  updateStateUsers(nombre_cuenta:any,documento:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Actualizar el estado del Usuario.',
      text: "¿Está seguro que desea actualizar el estado del usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

            let estado:any = '';
        
            if(nombre_cuenta == 'Activo'){
              estado = 2;
            }else if(nombre_cuenta == 'Inactivo'){
              estado = 1;
            }
        
            let form = {documento,estado};
        
            this.auth.updateStateClient(form).subscribe(res => {
        
              if(res == 'Estado del cliente actualizado con exito'){
        
                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Completado',
                  text: 'El estado del usuario se actualizó con éxito.'
                }).then(response => {
        
                  this.updateData();
        
                });
        
              }else{
        
                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
                })
        
              }
        
        
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

  changueDateFormat($event:any){

    const id_suscripcion = $event.target.value;
    let form1 = {id_suscripcion};

    this.system.getOnePlan(form1).subscribe(res => {
      let duracion:any = '';
      this.list_temp = res;
      for(let x of this.list_temp){
        duracion = x.duracion;
      }

      let e = new Date()
      e.setMonth(e.getMonth() + duracion);

      const date_temp = e.getMonth()+1;
      if(date_temp < 10){
        this.date_temp = e.getFullYear() +"-0"+ (e.getMonth()+1) +"-"+ e.getDate();
      }else if(date_temp >= 10){

        this.date_temp = e.getFullYear() +"-"+ (e.getMonth()+1) +"-"+ e.getDate();

      }

      
    }); 

  }




  changueDateFormatUpdate($event:any){

    const id_suscripcion = $event.target.value;
    let form1 = {id_suscripcion};

    this.system.getOnePlan(form1).subscribe(res => {
      let duracion:any = '';
      this.list_temp = res;
      for(let x of this.list_temp){
        duracion = x.duracion;
      }

      let e = new Date()
      e.setMonth(e.getMonth() + duracion);

      const date_temp = e.getMonth()+1;
      if(date_temp < 10){
        this.date_temp_update = e.getFullYear() +"-0"+ (e.getMonth()+1) +"-"+ e.getDate();
      }else if(date_temp >= 10){

        this.date_temp_update = e.getFullYear() +"-"+ (e.getMonth()+1) +"-"+ e.getDate();

      }

      
    }); 

  }



  createNewUsers(form:any){


    if(form.tipo_de_documento == 0 || form.id_suscripcion_pago == 0 || form.id_valoracion_tipo == 0 || form.genero == 0){

      Swal.fire({
        icon: 'error',
        text: 'Para continuar con el proceso de registro de un nuevo cliente debe llenar todos los campos solicitados en el formulario anterior.'
      });

    }else{

      if(form.documento == '' || form.nombres == '' || form.primer_apellido == '' || form.segundo_apellido == '' || form.numero_telefono == '' || form.correo == '' 
      || form.fecha_de_fin == '' || form.fecha_nacimiento == ''){

        Swal.fire({
          icon: 'error',
          text: 'Para continuar con el proceso de registro de un nuevo cliente debe llenar todos los campos solicitados en el formulario anterior.'
        });

      }else{

        const convertAge = new Date(form.fecha_nacimiento);
        const timeDiff = Math.abs(Date.now() - convertAge.getTime());
        const edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);

        if(edad <= 13){

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Los menores de 13 años no tienen permitido el acceso, ¡Gracias Por su asistencia!.',
          })

        }else{

          this.auth.createNewUser(form).subscribe(res => {

            if(res == 'Nuevo usuario creado con éxito'){

              Swal.fire({
                icon: 'success',
                title: 'Proceso Completado',
                text: '¡Nuevo usuario cliente creado con éxito!, La cuenta se encuentra lista para su activación.'
              }).then(response => {

                this.updateData();
                this.createNewUser.reset();

              });

            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente.'
              })

            }


        });


        }


      }


    }


  }


  assingDocument(documento:any){
    this.documento_usuario = documento;
  }


  registerAssissment(form:any){

    form.documento_asistencia = this.documento_usuario;
    
    if(form.temperatura >= 37.6){

      Swal.fire({
        icon: 'warning',
        title: 'Peligro Inminente',
        text: 'La temperatura ingresada está catalogada como Febril, se recomienda no ingresar a las instalaciones.'
      }).then(response => {

        Swal.fire({
          icon: 'warning',
          title: 'Registrar la asistencia',
          text: '¿Seguro que desea registrar su asistencia de todos modos?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Sí',
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {

            form.id_asistencia_usuario = Math.floor((Math.random() * (99999999-10000000))+10000000);
            this.auth.registeredAssist(form).subscribe(res => {
      
              if(res == 'Asistencia registrada con exito'){
      
                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Completado',
                  text: 'La asistencia del usuario se registró con éxito.'
                });
      
              }else{
      
                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
                })
      
              }
      
            });

          } else if (result.isDenied) {

            Swal.fire('¡No hemos registrado tu asistencia!', '', 'info')
          }
        })



      });



    }else if(form.temperatura >= 34 && form.temperatura <= 37.5){

      form.id_asistencia_usuario = Math.floor((Math.random() * (99999999-10000000))+10000000);
      this.auth.registeredAssist(form).subscribe(res => {

        if(res == 'Asistencia registrada con exito'){

          Swal.fire({
            icon: 'success',
            title: 'Proceso Completado',
            text: 'La asistencia del usuario se registró con éxito.'
          });

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
          })

        }

      });

    }else if(form.temperatura < 34){

      Swal.fire({
        icon: 'warning',
        text: 'La temperatura que ingreso es baja, se recomienda la asistencia al centro medico más cercano.'
      })

    }


  }


  searchPerfilUser(documento:any){

    let form = {documento};

    this.auth.searchPerfilUser(form).subscribe(res => {
      
      this.perfil = res;

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

  assingDocumentoAndValidateDate(documento_usuarios_pago:any){

    this.documento_usuario = documento_usuarios_pago;
    let form = {documento_usuarios_pago};
    this.auth.validateDateFin(form).subscribe(res => {

        this.list_temp = res;
        for(let x of this.list_temp){
            this.fecha_de_fin = x.fecha_de_fin.substring(0,10);
            this.fecha_de_inicio = x.fecha_de_inicio.substring(0,10);
        }

        let fecha_now:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
        if(fecha_now >= this.fecha_de_inicio && fecha_now < this.fecha_de_fin){

          this.state_update_plans = 'no_disponible';

        }else if(fecha_now >= this.fecha_de_fin){

          this.state_update_plans = 'disponible';

        }
       
    });

  }


  updatePlans(form:any){

    if(form.id_suscripcion_pago == 0){

      Swal.fire({
        icon: 'error',
        text: 'Para realizar el proceso de actualización del plan debe llenar el formulario, intente nueveamente'
      })

    }else{
      form.documento_usuarios_pago = this.documento_usuario;
      this.auth.updatePlanUserm(form).subscribe(res => {

        if(res == 'Plan actualizado con exito'){

          Swal.fire({
            icon: 'success',
            title: 'Proceso Completado',
            text: 'El plan contratado por el usuario se actualizó con éxito.'
          }).then(response => {

            this.updateData();

          });

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
          })

        }

      });

    }
  

  }



  updateTypeAssessment(form:any){

      if(form.id_valoracion_tipo == 0){

        Swal.fire({
          icon: 'error',
          text: 'Para continuar con el proceso de actualización del tipo de valoración del usuario, debe seleccionar un tipo de valoración.'
        });

      }else{

        form.documento_tipo = this.documento_usuario;
        this.auth.updateTypeAssessmentUser(form).subscribe(res => {

          if(res == 'Tipo de valoracion actualizada'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'El tipo de valoración del usuario se actualizó con éxito.'
            }).then(response => {

              this.updateData();

            });

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente',
            });

          }

        });


      }

  }


  updateInfoUser(form:any){

    Swal.fire({
      icon: 'warning',
      title: 'Actualización de información',
      text: '¿Está seguro que desea actualizar la información del usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      denyButtonText: `No estoy seguro`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        
            if(form.nombres == '' || form.primer_apellido == '' || form.segundo_apellido == '' || form.correo == '' || form.numero_telefono == ''){

              Swal.fire({
                icon: 'error',
                text: 'Para realizar la actualización de la información del usuario debe llenar todos los campos solicitados en el formulario.'
              });
        
            }else{
        
              this.auth.updateDatePerfil(form).subscribe(res => {
        
                if(res == 'Perfil actualizado con exito'){
        
                  Swal.fire({
                    icon: 'success',
                    title: 'Proceso Completado',
                    text: 'La información del usuario se actualizó con éxito.'
                  }).then(response => {
        
                    this.updateData();
        
                  });
        
                }else{
        
                  Swal.fire({
                    icon: 'error',
                    title: 'Proceso Fallido',
                    text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente',
                  })
        
                }
        
              });
        
            }



      } else if (result.isDenied) {
        Swal.fire('¡No se actualizó la información del usuario!', '', 'info')
      }
    })


  }


  updateTimePago(form:any){

    if(form.documento_usuarios_pago == '' || form.fecha_de_fin == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para la actualización de la información de pago del usuario debe llenar los campos del formulario.'
      });

    }else{

      this.auth.updateTimePago(form).subscribe(res => {

          if(res == 'Pago actualizado con éxito'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'La información se actualizó con éxito.'
            })

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
            })

          }


      });

    }

  }





    //Botón del paginador ----------------------
    handlePageChange(event:any) {
      this.p = event;
    }
    //..........................................

}
