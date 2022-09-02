import { Component, OnInit } from '@angular/core';

import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';
import { EmailService } from 'src/app/servicios/email/email.service';
import { NotificationService } from 'src/app/servicios/notification/notification.service';
import { Router } from '@angular/router';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { delay } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  isEditable = false;

  correo:any = '';
  documento:any = '';
  correo_temp:any = '';
  codigo:any;

  code:any;

  state_email:any = '';
  state_phone:any = '';
  state_code:any = '';
  content_email:any;

  numero_telefono_conf:any;
  numero_telefono:any;


  timeLeft:any;
  timeLeft_second:any;

  first_code:any = false;
  disabled_first:any = '';
  description_first:any = false;


  second_code:any = false;
  disabled_second:any = '';
  description_second:any = false;


  third_code:any = false;

  formUpdatePassword = new FormGroup({
    documento: new FormControl('',Validators.required),
    password_new: new FormControl('',Validators.required),
    password_new_conf: new FormControl('',Validators.required)
  });

  constructor(
    private auth:AuthUsersService,
    private email:EmailService,
    private notification:NotificationService,
    private router:Router
  ) {


  }

  ngOnInit(): void {
  }

  updateData(){}

  searchDateUser(correo:any){

    if(correo == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para continuar con el proceso de restablecimiento de la contraseña, debe ingresar llenar todos los campos en el formulario.'
      })

    }else{

      let form = {correo};

      this.auth.searchDateUserToResetPassword(form).subscribe(res => {
  
        if(res == 'El correo que ingreso no corresponde a ningún correo registrado, intente nuevamente.'){
  
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El correo que ingreso no corresponde a ningún correo registrado, intente nuevamente.',
          });
  
        }else{

          Swal.fire({
            icon: 'info',
            text: 'A continuación deberá validar el numero de teléfono asociado a ese correo electronico.'
          }).then(response => {

            this.state_email = 1;
            this.content_email = res;
            for(let x of this.content_email){
              this.numero_telefono = x.numero_telefono;
              this.documento = x.documento;
            }
            this.correo_temp = correo;
          });

        }
  
      });

    }

 
  }




  confirmNumerPhone(numero_telefono_conf:any){

    if(numero_telefono_conf == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para continuar con el proceso de registro debe llenar todos los campos del formuario, intente nuevamente.'
      });

    }else{

        if(this.numero_telefono == numero_telefono_conf){

          const codigo:any =  Math.floor((Math.random() * (99999999-10000000))+10000000);
          const correo = this.correo_temp;
          this.codigo = codigo;
          let form1 = {correo,codigo}
          this.email.sendEmailCodeUpdatePassword(form1).subscribe(res => {

            if(res == 'Correo enviado'){

              Swal.fire({
                icon: 'info',
                text: `En el correo ${this.correo_temp} se envió un código de confirmación para finalizar el proceso de reestablecimiento de la contraseña.`
              }).then(response => {
                this.state_phone = 1;


                let timeLeft:any = 60;

                var counter:any = interval(1000);
                counter = setInterval(() => {
                  this.timeLeft = timeLeft
                  if(timeLeft > 0) {
                    timeLeft--;
                  } else if(timeLeft==0) {
            
                    clearInterval(counter);
                    this.disabled_first = 1;
                    this.description_first = true;
                  }
            
                },1000);


              });

            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
              });

            }

          });

        }else{

          Swal.fire({
            icon: 'error',
            text: 'El número de teléfono que ingreso no se encuentra registrado en la base de datos.'
          })

        }

    }

  }


  validateCodeEmail(code:any){

    if(code == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para continuar con el proceso de actualización de contraseña debe realizar llenar todos los campos solicitados en el formulario, intente nuevamente.'
      });

    }else{

      const codigo = this.codigo;
      if(codigo == code){

        Swal.fire({
          icon: 'info',
          text: 'El último paso para actualizar la contraseña se completo con éxito, a continuación podrá realizar la actualización de la contraseña.',
        }).then(response => {

          this.state_code = 1;

        });



      }else{

        Swal.fire({
          icon: 'error',
          text: 'El código que ingresó no es igual al código que se envió al correo electronico, intente nuevamente.',
        });

      }


    }

    
    

  }



  generateNewCodeSecond(){

    const codigo:any =  Math.floor((Math.random() * (99999999-10000000))+10000000);
    const correo = this.correo_temp;
    this.codigo = codigo;
    let form1 = {correo,codigo}
    this.email.sendEmailCodeUpdatePassword(form1).subscribe(res => {

      if(res == 'Correo enviado'){

        Swal.fire({
          icon: 'info',
          text: `En el correo ${this.correo_temp} se envió un código de confirmación para finalizar el proceso de reestablecimiento de la contraseña.`
        }).then(response => {

          let timeLeft:any = 30;
          let timeRight:any = 1;

          

          this.first_code = true;
          this.second_code = true;
          this.third_code = false;
      
          var counter:any = interval(1000);
          counter = setInterval(() => {
      
            if(timeLeft >= 10){
              this.timeLeft_second = '0' + timeRight + ':' +timeLeft;
            }else if(timeLeft <= 10){
              this.timeLeft_second = '0' + timeRight + ':0' +timeLeft;
            }
      
            
            if(timeLeft > 0) {
              timeLeft--;
            } else if(timeLeft==0 && timeRight == 1) {
      
              timeRight = 0;
              timeLeft = 59;
      
            }else if(timeLeft == 0 && timeRight == 0){
      
              clearInterval(counter);
              this.disabled_second = 1;
              this.description_second = true;
      
            } 
      
          },1000);

        });
      
      
      }else{

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
        });

      }


    });

  
  }








  generateNewCodeThree(){

    const codigo:any =  Math.floor((Math.random() * (99999999-10000000))+10000000);
    const correo = this.correo_temp;
    this.codigo = codigo;
    let form1 = {correo,codigo}
    this.email.sendEmailCodeUpdatePassword(form1).subscribe(res => {

      if(res == 'Correo enviado'){

        Swal.fire({
          icon: 'info',
          text: `En el correo ${this.correo_temp} se envió un código de confirmación para finalizar el proceso de reestablecimiento de la contraseña.`
        }).then(response => {          

          this.first_code = true;
          this.second_code = false;
          this.third_code = true;

        });
      
      
      }else{

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
        });

      }


    });

  
  }



  updatePassword(form:any){

    form.documento = this.documento;
    
    if(form.password_new == '' || form.password_new_conf == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para realizar la actualización de la contraseña debe llenar todos los campos solicitados en el formulario, intente nuevamente.',
      })

    }else{

      if(form.password_new == form.password_new_conf){

        this.auth.validateExistensPassword(form).subscribe(res => {

          if(res == 'La contraseña que ingreso es diferente a la actual'){

            this.auth.resetPassword(form).subscribe(res => {

              if(res == 'password update successfull'){

                const correo = this.correo_temp;
                let form1 = {correo};
                this.email.sendEmailResetPassword(form1).subscribe(res => {

                  if(res == 'Correo enviado'){

                    Swal.fire({
                      icon: 'success',
                      title: 'Proceso Completado',
                      text: 'La contraseña se actualizó con éxito, le invitamos a iniciar sesión nuevamente.',
                    }).then(response => {

                      window.location.reload();
                      localStorage.clear();

                    });

                  }else{

                    Swal.fire({
                      icon: 'error',
                      title: 'Proceso Fallido',
                      text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.',
                    })

                  }

                });

              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible actualizar la contraseña, intente nuevamente.'
                })

              }

            });

          }else if(res == 'La contraseña que ingreso es igual a la actual'){

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'La contraseña ingresada es igual a la actual, intente nuevamente.'
            })

          }

        });

      }else{

        Swal.fire({
          icon: 'error',
          text: 'Las contraseñas que ingresó no son iguales, intente nuevamente.'
        })

      }




    }

  }




}
