import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import Swal from 'sweetalert2';
import decode from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  infoUser:any;
  fileTemp:any;
  previewImg:any;

  imgAct:any;

  profileForm = new FormGroup({
    documento: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    nombres: new FormControl('',Validators.required),
    primer_apellido: new FormControl('',Validators.required),
    segundo_apellido: new FormControl('',Validators.required),
    numero_telefono: new FormControl('',Validators.required)
  });

  formPassword = new FormGroup({
    documento: new FormControl('',Validators.required),
    new_password: new FormControl('',Validators.required),
    confirm_password: new FormControl('',Validators.required),
    old_password: new FormControl('',Validators.required)
  });


  constructor(
    private service: AuthUsersService,
    private router: Router
  ) {

    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    const token:any = localStorage.getItem('token');

    let decodetoken:any = {};
    decodetoken = decode(token);
    const { documento } = decodetoken;

    let form = {};
    form = {documento};

    this.service.profileUser(form).subscribe(res => {
      this.infoUser = res;
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


getImg($event:any):void{

  const [ file ] = $event.target.files;

  this.fileTemp = {
    fileRaw: file
  };

  const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.previewImg = reader.result;
  };
    reader.readAsDataURL(file);
}

  sendFile(documento:any){

    if(this.fileTemp){

      let estado:boolean = false;

      let form = {};
      form = {documento};

      this.service.verifyImng(form).subscribe(res => {

        this.imgAct = res;
        for(let x of this.imgAct){
          this.imgAct = x.img;
          if(this.imgAct==1){
            estado = true;
          }

        }


        if(estado){//Si estado esta en true, significa que se debe crear una imagen

            const id_foto:any =  Math.floor((Math.random() * (99999999-10000000))+10000000);

            const body = new FormData();
            body.append('file',this.fileTemp.fileRaw);
            body.append('id_foto',id_foto);
            body.append('documento',documento);

            this.service.createImgProfile(body).subscribe(res => {

              if(res == 'Imagen creada y usuario actualizado'){

                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Completo',
                  text: 'Imagen actualizadea con éxito'
                }).then(response => {
                  this.updateData();
                  location.reload();
                });

              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'No es posible realizar la actualización de la información, intente nuevamente'
                })

              }

            });






        }else{//Si estado esta en falso significa que se debe actualizar la imagen

          const body = new FormData();
          body.append('file',this.fileTemp.fileRaw);
          body.append('id_foto',this.imgAct);

          this.service.updateImgProfile(body).subscribe(res => {

            if(res == 'Imagen actualizada con éxito'){
              Swal.fire({
                icon: 'success',
                title: 'Proceso Completo',
                text: 'Imagen actualizadea con éxito'
              }).then(response => {
                this.updateData();
                location.reload();
              });

            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'No es posible realizar la actualización de la información, intente nuevamente'
              })

            }


          });


        }



      });


    }else{

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Para completar el proceso se debe seleccionar primero una imagen'
      })

    }

  }


  deleteImgProfile(documento:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Eliminar Foto de perfil',
      text: "¿Está seguro que desea eliminar la foto?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        let form = {};
        form = {documento};

        this.service.verifyImng(form).subscribe(res => {

          this.imgAct = res;
          let id_foto:any;
          for(let x of this.imgAct){
            id_foto = x.img;
          }

          let form1 = {};
          form1 = {id_foto,documento};

          this.service.deleteImgProfile(form1).subscribe(res => {

            if(res == 'Imagen eliminada con exito'){
              Swal.fire({
                icon: 'success',
                title: 'Proceso Completo',
                text: 'Imagen actualizadea con éxito'
              }).then(response => {
                this.updateData();
                location.reload();
              });

            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'No es posible realizar la actualización de la información, intente nuevamente'
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
          title: 'Proceso Celado'
        })
      }
    })

  }


  updateInfoProfile(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualización de información',
      text: "¿Está seguro que desea actualizar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.updateProfile(form).subscribe(res => {

          if(res == 'Datos del perfil actualizados'){
            Swal.fire({
              icon: 'success',
              title: 'Proceso Completo',
              text: 'Información actualizada con éxito'
            }).then(response => {
              this.updateData();
              location.reload();
            });

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'No es posible realizar la actualización de la información, intente nuevamente'
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


  updatePassword(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualización de información',
      text: "¿Está seguro que desea actualizar la contraseña?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

          const new_password = form.new_password;
          const confirm_password = form.confirm_password;

          if(new_password == confirm_password){

            const documento = form.documento;
            const password = form.old_password;

            let forms = {};
            forms = {documento,password};

            this.service.confirmPassword(forms).subscribe(res => {

              if(res == 'Documento y contraseña correctos'){

                let form1 = {};
                const password = form.new_password;
                form1 = {documento,password};

                this.service.updatePasswordProfile(form1).subscribe(res => {

                  if(res == 'Contraseña actualizada con exito'){

                    Swal.fire({
                      icon: 'success',
                      title: 'Proceso Completado',
                      text: 'Contraseña actualizada con éxito, intente nuevamente'
                    }).then(response => {
                      this.updateData();
                      localStorage.removeItem('token');
                      localStorage.removeItem('session');
                      this.router.navigateByUrl('inicio');
                      location.reload();
                    });


                  }else{

                    Swal.fire({
                      icon: 'error',
                      title: 'Proceso Fallido',
                      text: 'No es posible actualizar la información, intente nuevamente'
                    })

                  }


                });



              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'La contraseña ingresada no es igual a la actual, intente nuevamente'
                })

              }

            });


          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Las contraseñas ingresadas no coinciden, intente nuevamente'
            })

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

}
