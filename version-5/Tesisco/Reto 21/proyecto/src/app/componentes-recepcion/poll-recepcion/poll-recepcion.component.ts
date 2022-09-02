import { Component, OnInit } from '@angular/core';

import decode from 'jwt-decode';
import { PollService } from 'src/app/servicios/poll/poll.service';
import { FormControl,FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-poll-recepcion',
  templateUrl: './poll-recepcion.component.html',
  styleUrls: ['./poll-recepcion.component.css']
})
export class PollRecepcionComponent implements OnInit {

  documento:any;

  terminos:any = false;
  politicas:any = false;
  password:any = false;

  state_terminos:any = '';  
  state_politicas:any = '';

  
  state_password:any = '';
  state_password_conf:any = '';

  state_btn_update_password:any = true;

  password_temp:any = '';
  state_conf_password:any = '1';

  state_long_password:any = '';
  state_number_password:any = '';
  state_letra_minuscula:any = '';
  state_letra_mayuscula:any = '';
  state_characters_password:any = '';



  formUpdatePasswordUser = new FormGroup({
    documento: new FormControl('',Validators.required),
    password_old: new FormControl('',Validators.required),
    password_new: new FormControl('',Validators.required),
    password_new_conf: new FormControl('',Validators.required)
  });


  constructor(
    private poll: PollService
  ) { 

    const token:any = localStorage.getItem('token');

    let decodetoken:any = {};
    decodetoken = decode(token);
    const { documento } = decodetoken;

    this.documento = documento;

  }

  ngOnInit(): void {
  }

  validateCheck(){

    const terminos:any = this.terminos;
    const politicas:any = this.politicas;

    if(terminos == false){
        this.state_terminos = 'si';
    }else{
        this.state_terminos = 'no';
        this.validateStateProcessActivatedAcount();
    }

    if(politicas == false){
        this.state_politicas = 'si';
    }else{
        this.state_politicas = 'no';
        this.validateStateProcessActivatedAcount();
    }

}

validateCheckPolitics(){

  const politicas:any = this.politicas;

  if(politicas == false){
      this.state_politicas = 'si_';
      
  }else{
      this.state_politicas = 'no_';
      this.validateStateProcessActivatedAcount();
  }

  }


  updatePasswordUser(form:any){

    if(form.password_old == '' || form.password_new == '' || form.password_new_conf == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para realizar la actualización de la contraseña debe llenar todos los campos solicitados en el formulario, intente nuevamente'
      });

    }else{

      if(form.password_old == form.password_new){

        Swal.fire({
          icon: 'error',
          text: 'La contraseña actual no puede ser igual a la contraseña nueva, intente nuevamente'
        });

      }else{

        if(form.password_old == form.password_new_conf){

          Swal.fire({
            icon: 'error',
            text: 'La confirmación de la contraseña nueva no puede ser igual a la anterior, intente nuevamente'
          });
  

        }else{

          if(form.password_new != form.password_new_conf){

            Swal.fire({
              icon: 'error',
              text: 'La contraseña nueva y su confirmación deben ser la misma, intente nuevamente'
            });
    

          }else{

            if(form.password_old != this.documento){

              Swal.fire({
                icon: 'error',
                text: 'La contraseña ingresada no es igual a la actual, intente nuevamente'
              });

            }else{

              form.documento = this.documento;
              this.poll.updatePasswordPersonal(form).subscribe(res => {
 
                if(res == 'Contraseña actualizada con exito'){

                  Swal.fire({
                    icon: 'success',
                    title: 'Proceso Completado',
                    text: 'La contraseña se actualizó con éxito.'
                  }).then(response => {

                    this.password = true;
                    this.validateStateProcessActivatedAcount();

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


        }


      }


    }


  }



  validateStateProcessActivatedAcount(){

    if(this.terminos == true && this.politicas == true && this.password == true){

      Swal.fire({
        icon: 'success',
        title: '¡Proceso Terminado!',
        text: 'Ya terminaste el proceso para activar tu cuenta, ahora da click sobre el botón "Finalizar".'
      }).then(response => {

        const state:any = 1;
        localStorage.removeItem('state');
        localStorage.setItem('state',state);

      });

    }

  }





  
  segurityPassword($event:any){

    const content = $event;

    const count = content.length;
    if(count >= 12 && count <= 16){
      this.state_long_password = 'suficiente';
    }else if(count > 16){
      this.state_long_password = 'superior';
    }else if (count < 12){
      this.state_long_password = 'insuficiente';
    }

    

    let contar_numeros = content.replace(/[^0-9]/g,"").length;
  
    if(contar_numeros == 0){
      this.state_number_password = 'insuficiente';
    }else{
      this.state_number_password = 'suficiente';
    }


    var contar = 0;
    var cadena = content;
    var mayusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (var i = 0; i < mayusculas.length; i++) {
    for (var x = 0; x < cadena.length; x++) {
    if(cadena[x]==mayusculas[i]){
    contar+=1;
        }
      }
    }

    if(contar >= 1){
      this.state_letra_mayuscula = 'suficiente'
    }else if(contar == 0){
      this.state_letra_mayuscula = 'insuficiente'
    }


    let contar1 = 0;
    let minusculas = "abcdefghijklmnñopqrstuvwxyz";

    for (var i = 0; i < minusculas.length; i++) {
      for (var x = 0; x < cadena.length; x++) {
      if(cadena[x]==minusculas[i]){
      contar1+=1;
          }
        }
      }

      if(contar1 >= 1){
        this.state_letra_minuscula = 'suficiente'
      }else if(contar1 == 0){
        this.state_letra_minuscula = 'insuficiente'
      }
   

    if(content.match(/([!,%,&,@,#,$,^,*,?,_,~,{},-,.])/)){
      this.state_characters_password = 'suficiente';
    }else{
      this.state_characters_password = 'insuficiente';
    }


    if(this.state_characters_password == 'suficiente' && this.state_letra_minuscula == 'suficiente' && this.state_letra_mayuscula == 'suficiente' && this.state_number_password == 'suficiente' && this.state_long_password == 'suficiente'){

      this.state_password = 'correcto';
      this.password_temp = content;
      if(this.state_password_conf == 'correcto'){

        Swal.fire({
          icon: 'success',
          title: '¡Felicidades!',
          text: 'Ya puedes actualizar tú contraseña.'
        }).then(response => {

          this.state_conf_password = 'iguales';
          this.state_btn_update_password = false;

        });

      }

    }else if(count == 0 || count < 12 || count > 16){

      this.state_password = '';

    }


  }



  confirmPassword($event:any){

    const content = $event;
    let temp:any = 0;
    if(content == this.password_temp){

      this.state_password_conf = 'correcto';
      if(this.state_password == 'correcto'){

        Swal.fire({
          icon: 'success',
          title: '¡Felicidades!',
          text: 'Ya puedes actualizar tú contraseña.'
        }).then(response => {

          this.state_conf_password = 'iguales';
          this.state_btn_update_password = false;

        });


      }

    }else if(content != this.password_temp){

      this.state_conf_password = 'diferentes';
      this.state_btn_update_password = true;
      temp = 1;

    }else if(content == '' && temp == 1){

      this.state_conf_password = '';
      this.state_btn_update_password = true;

    }


  }











}
