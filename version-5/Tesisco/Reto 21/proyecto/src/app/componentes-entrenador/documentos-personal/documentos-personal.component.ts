import { Component, OnInit } from '@angular/core';

import decode from 'jwt-decode';
import { PollService } from 'src/app/servicios/poll/poll.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-documentos-personal',
  templateUrl: './documentos-personal.component.html',
  styleUrls: ['./documentos-personal.component.css']
})
export class DocumentosPersonalComponent implements OnInit {

  documento:any = '';

  fileTemp:any;
  previewImg:any;

  document:any = false;
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




  formRegisteredDocument = new FormGroup({
    id_educacion: new FormControl('',Validators.required),
    titulo: new FormControl('',Validators.required),
    documento_usuarios_titulo: new FormControl('',Validators.required)
  });

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


  sendImg(form:any){

    if(form.titulo == '' || this.previewImg == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para registrar un documento debe llenar la información solicitada en el formulario.'
      })

    }else{

      form.id_educacion = Math.floor((Math.random() * (99999999-10000000))+10000000);
      form.documento_usuarios_titulo = this.documento;

      const body = new FormData();
      body.append('file',this.fileTemp.fileRaw);
      body.append('titulo',form.titulo);
      body.append('id_educacion', form.id_educacion);
      body.append('documento_usuarios_titulo', form.documento_usuarios_titulo);

      this.poll.registerDocumentPerson(body).subscribe(res => {

        if(res == 'Documento insertado con exito'){

          Swal.fire({
            icon: 'success',
            title: 'Proceso Completado',
            text: 'La información se registró con éxito'
          }).then(response => {

            this.formRegisteredDocument.reset();
            this.previewImg = '';
            this.fileTemp = '';

            this.document = true;
            this.validateStateActivatedAcount();
          });

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Actualmente no es posible realizar la petición solicitada, intentelo nuevamente',
          });

        }

      });



    }



  }



  validateCheck(){

    const terminos:any = this.terminos;
    const politicas:any = this.politicas;

    if(terminos == false){
        this.state_terminos = 'si';
    }else{
        this.state_terminos = 'no';
        this.validateStateActivatedAcount();
    }

    if(politicas == false){
        this.state_politicas = 'si';
    }else{
        this.state_politicas = 'no';
        this.validateStateActivatedAcount();
    }

}

validateCheckPolitics(){

  const politicas:any = this.politicas;

  if(politicas == false){
      this.state_politicas = 'si_';
  }else{
      this.state_politicas = 'no_';
      this.validateStateActivatedAcount();
  }

}


updatePasswordUser(form:any){

    if(form.password_old == form.password_new){

      Swal.fire({
        icon: 'error',
        text: 'La contraseña que ingreso actual no puede ser igual a la nueva, intente nuevamente.'
      });

    }else{

      if(form.password_old == form.password_new_conf){

        Swal.fire({
          icon: 'error',
          text: 'La contraseña actual no puede ser igual a la confirmación de la contraseña nueva, intente nuevamente.'
        });

      }else{

        if(form.password_new != form.password_new_conf){

          Swal.fire({
            icon: 'error',
            text: 'La contraseña nueva debe ser igual a la confirmación, intente nuevamente.'
          });

        }else{

          if(form.password_old != this.documento){

            Swal.fire({
              icon: 'error',
              text: 'La contraseña que ingreso no es igual a la actual, intente nuevamente.'
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
                  this.validateStateActivatedAcount();
  
                });
  
              }else{
  
                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
                });
  
              }
  
            });


          }




        }


      }


    }



  }


  validateStateActivatedAcount(){

    if(this.document == true && this.password == true && this.politicas == true && this.terminos == true){

      Swal.fire({
        icon: 'success',
        title: '¡Proceso Finalizado!',
        text: 'Ya terminaste el proceso de activación de la cuenta, para finalizar el proceso de click en el botón "Finalizar".'
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
