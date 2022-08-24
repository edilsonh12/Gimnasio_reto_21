import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import decode from 'jwt-decode';


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

  listaAssist: any;

  oneUser:any;

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




  constructor(
      private service : AuthUsersService
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

              let form = {};
              form = {documento};

              this.service.getUser(form).subscribe(res => {
                this.listaUsuarios = res;
              });

            });

          }


    });

      }


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





  //Botón del paginador ----------------------
  handlePageChange(event:any) {
    this.p = event;
  }
  //..........................................


}

