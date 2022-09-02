import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import decode from 'jwt-decode';

import { EmailService } from 'src/app/servicios/email/email.service';
import { NotificationService } from 'src/app/servicios/notification/notification.service';
import { DatePipe } from '@angular/common';
import { SistemaService } from 'src/app/servicios/sistema/sistema.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {

  p: number = 1;
  config:any;
  cont: any = 1;

  img:any;

  listaDocumento:any;
  listaRol:any;
  listaGender:any;
  listaUsuarios:any;
  listSuscription:any;
  listTypeAssessment:any;

  listaAssist: any;

  oneUser:any;

  date_temp:any = '';
  list_temp:any;

  usuariosForm = new FormGroup({
    documento : new FormControl('',Validators.required),
    correo : new FormControl('',Validators.required),
    nombres : new FormControl('',Validators.required),
    primer_apellido : new FormControl('',Validators.required),
    segundo_apellido : new FormControl('',Validators.required),
    rol : new FormControl('',Validators.required),
    id_documento : new FormControl('',Validators.required),
    genero : new FormControl('',Validators.required),
    telefono : new FormControl('',Validators.required),
    img: new FormControl('',Validators.required)
  });

  updateUserForm = new FormGroup({
    documento: new FormControl('',Validators.required),
    nombres: new FormControl('',Validators.required),
    primer_apellido: new FormControl('',Validators.required),
    segundo_apellido: new FormControl('',Validators.required),
    numero_telefono: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    rol: new FormControl('',Validators.required)
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


  today: Date = new Date();
  pipe = new DatePipe('en-US');



  constructor(
      private service : AuthUsersService,
      private email: EmailService,
      private notification:NotificationService,
      private system:SistemaService
  ) {

    this.service.getDocuments().subscribe(res => {
      this.listaDocumento = res;
    });

    this.service.getRol().subscribe(res => {
      this.listaRol = res;
    });

    this.service.getGender().subscribe(res => {
      this.listaGender = res;
    });

    this.service.selectPlanSuscription().subscribe(res => {

      this.listSuscription = res;

    });

    this.service.selectTypeValoracion().subscribe(res => {

      this.listTypeAssessment = res;

    });


      this.updateData();

  }

  updateData(){

    const token:any = localStorage.getItem('token');
    let decodetoken:any = {};
    decodetoken = decode(token);
    const { documento } = decodetoken;

    let form = {};
    form = {documento};


    this.service.getUser(form).subscribe(res => {
      this.listaUsuarios = res;
    });

  }


  filtro:string = '';

  ngOnInit(): void {
  }

  registrarUsuarios(form:any){
      if(form.id_documento == '' || form.genero == '' || form.rol == ''){


        Swal.fire({
          icon: 'error',
          title: 'Operación fallada',
          text: 'Debe seleccionar una opción en los campos desplegables'

        });


      }else{


        this.service.createUsers(form).subscribe(res => {

          if(res == 'El documento que ingreso ya se encuentra registrado, intente nuevamente'){

            Swal.fire({
              icon: 'error',
              title: 'Operación fallada',
              text: 'El documento que ingreso ya se cuenta registrado'

            });

          }else if(res == 'Imposible registrar el usuario, intente nuevamente'){

            Swal.fire({
              icon: 'error',
              title: 'Operación fallada',
              text: 'Imposible registrar el usuario, intente nuevamente'

            });

          }else if(res == 'Usuario registrado satisfactoriamente'){

            Swal.fire({
              icon: 'success',
              title: 'Operación completada con éxito',
              text: 'Usuario registrado satisfactoriamente'

            }).then(response => {
              const token:any = localStorage.getItem('token');
              let decodetoken:any = {};
              decodetoken = decode(token);
              const { documento } = decodetoken;

              let form1 = {};
              form1 = {documento};

              const correo:any = form.correo;
              let form2 = {correo};
              this.email.sendEmailWelcome(form2);

              this.service.getUser(form1).subscribe(res => {
                this.listaUsuarios = res;
              });

              

            });

          }


    });

      }


  }



  createNewClient(form:any){




  }







  updateStateUser(document:any,estado:any){


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualización de estado del usuario',
      text: "¿Está seguro que quiere actualizar el estado del usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {


        let state:any = 0;

      if(estado=='Inactivo'){
          state = 1;
      }else if(estado=='Activo'){
          state = 2;
      }

      let form = {};
      form = {document,state};

      this.service.putStateUser(form).subscribe(res => {

          if(res == 'Estado actualizado con éxito'){


            Swal.fire({
              icon: 'success',
              title: 'Proceso realizado con éxito',
              text: 'Estado del usuario actualizado con éxito',
              showConfirmButton: false
            }).then(response => {
              const token:any = localStorage.getItem('token');
              let decodetoken:any = {};
              decodetoken = decode(token);
              const { documento } = decodetoken;

              let form = {};
              form = {documento};

              this.service.getUser(form).subscribe(res => {
                this.listaUsuarios = res;
              });
            });



          }else if(res == 'No se encontró un registro, intentelo nuevamente'){

            Swal.fire({
              icon: 'error',
              title: 'Proceso fallido',
              text: 'El proceso fallo, intente nuevamente',
              showConfirmButton: false
            })

          }


      });



      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El proceso se canceló con éxito',
          'error'
        )

      }
    })



  }

  actualizarUsuario(documento:any){

      if(documento==''){
        Swal.fire({
          icon: 'error',
          title: 'Operación fallida',
          text: 'El documento del usuario no se puede ingresar vacio, intente nuevamente'

        });
      }else{

        let form = {};
        form = {documento};

        this.service.getOneUser(form).subscribe(res => {

          this.oneUser = res;

        });

      }


  }


  updateUsers(form:any){


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualizar datos de usuario',
      text: "¿Seguro que desea actualizar los datos del usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
          console.log(form);
          this.service.putUsers(form).subscribe(res => {


            if(res == 'Datos actualizados con éxito'){

              window.location.reload();

              Swal.fire({
                icon: 'success',
                title: 'Proceso realizado con éxito',
                text: 'La información del usuario se actualizo con exito'
              }).then(response => {
                const token:any = localStorage.getItem('token');
                let decodetoken:any = {};
                decodetoken = decode(token);
                const { documento } = decodetoken;

                let form = {};
                form = {documento};

                this.service.getUser(form).subscribe(res => {
                  this.listaUsuarios = res;
                });

              });

            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso fallido',
                text: 'El proceso fallo, intente nuevamente'
              })

            }


          });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Proceso Cancelado',
          text: 'El proceso se cancelo con exito'
        })
      }
    })

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

          this.service.createNewUser(form).subscribe(res => {

            if(res == 'Nuevo usuario creado con éxito'){

              Swal.fire({
                icon: 'success',
                title: 'Proceso Completado',
                text: '¡Nuevo usuario cliente creado con éxito!, La cuenta se encuentra lista para su activación.'
              }).then(response => {

                this.updateData();
                this.createNewUser.reset();

                const correo = form.correo;

                let form1 = {correo};
                this.email.sendEmailWelcome(form1).subscribe(res => {
                  
                  if(res == 'Correo enviado'){
          
                    Swal.fire({
                      icon: 'success',
                      text: 'Se le envió un correo de bienvenida al usuario.'
                    }).then(response => {
          
                      const documento_usu = form.documento;
                      const id_noti_us:any = 1;
                      let form5 = {id_noti_us,documento_usu};
                      this.notification.sendOneNotification(form5);
          
                    });
          
                  }else{
          
                    Swal.fire({
                      icon: 'error',
                      title: 'Proceso Fallido',
                      text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
                    });
          
                  }
          
                });


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




  //Botón del paginador ----------------------
  handlePageChange(event:any) {
    this.p = event;
  }
  //..........................................


}

