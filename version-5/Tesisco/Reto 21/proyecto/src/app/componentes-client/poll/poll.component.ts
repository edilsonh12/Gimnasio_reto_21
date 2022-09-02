import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import decode from 'jwt-decode';
import { PollService } from 'src/app/servicios/poll/poll.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {

  documento:any = '';
  genero:any = '';

  listTemp:any;

  state_3:any = '';
  state_4:any = '';
  state_5:any = '';
  state_6:any = '';
  state_7:any = '';
  state_8:any = '';
  state_9:any = '';
  state_10:any = '';
  state_11:any = '';
  state_12:any = '';
  state_13:any = '';
  state_14:any = '';

  state_19:any = '';
  state_20:any = '';
  state_21:any = '';
  state_22:any = '';

  state_23:any = '';

  state_28:any = '';

  state_exercise:any = '';
  yesTemp:any = 'SI';
  temp_state:any = false;

  history:any = false;
  exams:any = false;
  exercise:any = false;
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



  formHistory = new FormGroup({
      id_pregu: new FormControl('',Validators.required),
      documento_en: new FormControl('',Validators.required),
      respuesta: new FormControl('',Validators.required),
      observacion: new FormControl('',Validators.required)
  });

  formExams = new FormGroup({
    id_pregu: new FormControl('',Validators.required),
    documento_en: new FormControl('',Validators.required),
    respuesta: new FormControl('',Validators.required),
    observacion: new FormControl('',Validators.required)
  });

  formExercise = new FormGroup({
    id_pregu: new FormControl('',Validators.required),
    documento_en: new FormControl('',Validators.required),
    respuesta: new FormControl('',Validators.required),
    observacion: new FormControl('',Validators.required)
  });

  formPassword = new FormGroup({
    documento: new FormControl('',Validators.required),
    password_old: new FormControl('',Validators.required),
    password_new: new FormControl('',Validators.required),
    password_new_conf: new FormControl('',Validators.required)
  });


  constructor(
      private poll:PollService
  ) {

    const token:any = localStorage.getItem('token');

    let decodetoken:any = {};
    decodetoken = decode(token);
    const { documento } = decodetoken;

    this.documento = documento;

    let form = {documento};
    this.poll.selectGenderUserPoll(form).subscribe(res => {

      this.listTemp = res;
      for(let x of this.listTemp){
        this.genero = x.nombre_tipo_genero;
      }

    });


   }

  ngOnInit(): void {
  }

  updateData(){

  }

  changueState($event:any,id_pregu:any){

    const estado = $event.value;

    switch(id_pregu){
      case 3:

        if(estado == 'SI'){
          this.state_3 = 'si';
        }else{
          this.state_3 = 'no';
        }

        break;

      case 4:
        
        if(estado == 'SI'){
          this.state_4 = 'si';
        }else{
          this.state_4 = 'no';
        }
  
        break;
        
      case 5:
        
        if(estado == 'SI'){
          this.state_5 = 'si';
        }else{
          this.state_5 = 'no';
        }

        break;

      case 6:
        
        if(estado == 'SI'){
          this.state_6 = 'si';
        }else{
          this.state_6 = 'no';
        }

        break;

      case 7:
        
        if(estado == 'SI'){
          this.state_7 = 'si';
        }else{
          this.state_7 = 'no';
        }

        break;

      case 8:
        
        if(estado == 'SI'){
          this.state_8 = 'si';
        }else{
          this.state_8 = 'no';
        }

        break;
       
      case 9:
        
        if(estado == 'SI'){
          this.state_9 = 'si';
        }else{
          this.state_9 = 'no';
        }

        break;

      case 10:
        
        if(estado == 'SI'){
          this.state_10 = 'si';
        }else{
          this.state_10 = 'no';
        }

        break;

      case 11:
        
        if(estado == 'SI'){
          this.state_11 = 'si';
        }else{
          this.state_11 = 'no';
        }

        break;

      case 12:
        
        if(estado == 'SI'){
          this.state_12 = 'si';
        }else{
          this.state_12 = 'no';
        }

        break;

      case 13:

        if(estado == 'SI'){
          this.state_13 = 'si';
        }else{
          this.state_13 = 'no';
        }
        
        break;

        case 14:

          if(estado == 'SI'){
            this.state_14 = 'si';
          }else{
            this.state_14 = 'no';
          }
          
          break; 

            
            case 19:

              if(estado == 'SI'){
                this.state_19 = 'si';
              }else{
                this.state_19 = 'no';
              }
              
              break;    

              case 20:

                if(estado == 'SI'){
                  this.state_20 = 'si';
                }else{
                  this.state_20 = 'no';
                }
                
                break;

                case 21:

                  if(estado == 'SI'){
                    this.state_21 = 'si';
                  }else{
                    this.state_21 = 'no';
                  }
                  
                  break;
                
                case 22:

                  if(estado == 'SI'){
                    this.state_22 = 'si';
                  }else{
                    this.state_22 = 'no';
                  }
                  
                  break;
                
                  case 23:

                    if(estado == 'SI'){
                      this.state_23 = 'si';
                    }else{
                      this.state_23 = 'no';
                    }
                    
                    break;    

      case 28:
        
        if(estado == 'SI'){
          this.state_28 = 'si';
        }else{
          this.state_28 = 'no';
        }

        break;

    }


  }



  createHistory(form:any,id:any){
    
    form.id_pregu = id;
    form.documento_en = this.documento;

    if(form.respuesta == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para continuar con el proceso de registro de la respuesta, debe seleccionar una respuesta valida, intente nuevamente.'
      })

    }else if(form.respuesta == 'SI' && form.observacion == ''){  

      Swal.fire({
        icon: 'error',
        text: 'Para registrar la respuesta debe llenar el campo solicitado en la pregunta, intente nuevamente.'
      })

    }else{

      if(form.respuesta == 'NO'){
          form.observacion = 'No Padece';
      }  

      this.poll.createPoll(form).subscribe(res => {

        if(res == 'Respuesta registrada con exito'){

          Swal.fire({
            icon: 'success',
            text: 'La información se registró con éxito'
          }).then(response => {

              if(this.state_23 == 'si' && this.temp_state == false){

                Swal.fire({
                  icon: 'info',
                  text: 'A continuación, solicitamos respondas unas preguntas más relacionadas a tu actividad física'
                }).then(response => {

                  this.state_exercise = 'si';
                  this.temp_state = true;
                });
              
              }else if(this.temp_state == true){  
                this.state_exercise = 'si';
              }else{
                this.state_exercise = 'no';
              }

          });

        }else if(res == 'Respuesta actualizada con exito'){  

          Swal.fire({
            icon: 'success',
            text: 'La información se actualizó con éxito'
          }).then(response => {
    
                  if(this.state_23 == 'si' && this.temp_state == false){
    
                    Swal.fire({
                      icon: 'info',
                      text: 'A continuación, solicitamos respondas unas preguntas más relacionadas a tu actividad física'
                    }).then(response => {
    
                      this.state_exercise = 'si';
                      this.temp_state = true;
                    });
    
                  }else if(this.temp_state == true){  
                    this.state_exercise = 'si';
                  }else{
                    this.state_exercise = 'no';
                  }
    
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


  validateHistory(){

      const documento_en = this.documento;
      const genero = this.genero;
      let form = {documento_en, genero};

      this.poll.validateHistory(form).subscribe(res => {

          if(res == 'Completo'){

            Swal.fire({
              icon: 'success',
              text: 'La información se guardo con éxito'
            }).then(response => {

              this.history = true;
              this.validateStateActivationAcount();

            });

          }else if(res == 'Faltan preguntas'){  

            Swal.fire({
              icon: 'error',
              text: 'Para poder continuar debe responder todas las preguntas.'
            })

          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
            })

          }        

      });


  }



  validateExam(){

    const documento_en = this.documento;
    const genero = this.genero;
    let form = {documento_en,genero};
    
    this.poll.validateExams(form).subscribe(res => {

        if(res == 'Preguntas completas'){

          Swal.fire({
            icon: 'success',
            text: 'La información se guardó con exito'
          }).then(response => {

            this.exams = true;
            this.validateStateActivationAcount();

          });

        }else if(res == 'Faltan preguntas'){

          Swal.fire({
            icon: 'error',
            text: 'Para poder continuar debe responder todas las preguntas.'
          })

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
          })

        }

    });


  }


  validateExercise(){

      const documento_en = this.documento;
      const genero = this.genero;

      let form = {documento_en, genero};
      this.poll.validateExercise(form).subscribe(res => {

          if(res == 'Preguntas completas'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Las respuestas a las preguntas se almacenaron con exito',
            }).then(response => {

                this.exercise = true;
                this.validateStateActivationAcount();

            });

          }else if(res == 'Faltan preguntas'){

            Swal.fire({
              icon: 'error',
              text: 'Aún te faltan preguntas por responder del formulario.'
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


  validateCheck(){

      const terminos:any = this.terminos;
      const politicas:any = this.politicas;

      if(terminos == false){
          this.state_terminos = 'si';
      }else{
          this.state_terminos = 'no';
      }

      if(politicas == false){
          this.state_politicas = 'si';
      }else{
          this.state_politicas = 'no';
      }

  }

  validateCheckPolitics(){

    const politicas:any = this.politicas;

    if(politicas == false){
        this.state_politicas = 'si_';
    }else{
        this.state_politicas = 'no_';
    }

  }


  updatePassword(form:any){

    if(form.password_old == '' || form.password_new == '' || form.password_new_conf == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para continuar con el proceso de actualización de contraseña, debe llenar todos los campos solicitados en el formulario'
      });

    }else{

      if(form.password_old == form.password_new || form.password_old == form.password_new_conf){

        Swal.fire({
          icon: 'error',
          text: 'La nueva contraseña no puede ser similar a la antigua, ingrese una diferente'
        })


      }else{

        if(form.password_new == form.password_new_conf){

          form.documento = this.documento;

          this.poll.updatePassword(form).subscribe(res => {

              if(res == 'Contraseña actualizada con exito'){

                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Completado',
                  text: 'La contraseña se actualizó con éxito'
                }).then(response => {

                    this.password = true;
                    this.validateStateActivationAcount();

                });

              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente',
                })

              }

          });

        }else{

          Swal.fire({
            icon: 'error',
            text: 'Las nuevas contraseñas ingresadas no son iguales, intentelo nuevamente.'
          })

        }

        

      }

    }


  }


  validateStateActivationAcount(){

    if(this.history == true && this.exams == true && this.exercise == true && this.politicas == true && this.terminos == true && this.password == true){

      Swal.fire({
        icon: 'success',
        title: '¡Felicidades!',
        text: 'La cuenta ha sido activada con éxito. Da click en "Finalizar" para completar el proceso.'
      }).then(response => {

        localStorage.removeItem('state');
        const state:any = 1;
        localStorage.setItem('state',state);

      });

    }else{

      let arreglo = '';

      if(this.history == false){
        arreglo = arreglo + 'Historial y enfermedades.';
      }else if(this.exams == false){
        arreglo = arreglo + 'Examenes Clinicos.';
      }else if(this.exercise == false){
        arreglo = arreglo + 'Ejercicio Físico.';
      }else if(this.politicas == false){
        arreglo = arreglo + 'Políticas de tratamiento de datos.';
      }else if(this.terminos == false){
        arreglo = arreglo + 'Terminos y condiciones de uso.';
      }else if(this.password == false){
        arreglo = arreglo + 'Cambio de contraseña';
      }


      Swal.fire({
        icon: 'info',
        text: `A continuación pasaremos a la sección de ${arreglo} Ya estás un paso más cerca de finalizar el proceso de activación de la cuenta, ¡Vas por buen camino!.`
      })

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
