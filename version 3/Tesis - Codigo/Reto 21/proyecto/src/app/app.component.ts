import { Component} from '@angular/core';
import { Router } from '@angular/router';

import decode from 'jwt-decode';
import { LoginService } from './servicios/login/login.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { SistemaService } from './servicios/sistema/sistema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'index';


  usuarioIsLogin:any = localStorage.getItem('token');
  role:any = localStorage.getItem('session');

  aux: string = '';
  state:any;

  img:any;
  content:any;
  nombre:any;

  loginForm = new FormGroup({
    correo: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });



  constructor(
    private router: Router,
    private service: LoginService,
    private system: SistemaService
  ){

    this.system.getImg().subscribe(res => {

      this.img = res;
       for(let x of this.img){

         this.content = this.arrayBufferToBase64(x.logo.data);
       }

     })

     if(localStorage.getItem('state') != null && localStorage.getItem('token') != null){

      const state_temp:any = localStorage.getItem('state');
      if(state_temp == 0){
          this.state = 'primera';
      }
  
      const token:any = localStorage.getItem('token');
  
      if(token != ''){
  
        let decodetoken:any = {};
        decodetoken = decode(token);
        const { nombres, primer_apellido, segundo_apellido} = decodetoken;
    
        this.nombre = nombres + " " + primer_apellido + " " + segundo_apellido;
  
      }

     }




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


  ingresar(form:any){

    if(form.correo == '' || form.password == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para iniciar sesión debe llenar todos los campos solicitados en el formulario, intente nuevamente.'
      })


    }else{

            this.service.iniciarSesion(form).subscribe((res:any) => {

              if(!res.token){
        
                Swal.fire({
                  icon: 'error',
                  title: 'Credenciales erroneas',
                  text: 'Ingrese nuevamente los datos solicitados'
        
                });
        
                this.loginForm.reset();
              }else{
        
        
        
              Swal.fire({
                icon: 'success',
                title: 'Bienvenid@',
                text: 'Sea bienvenido a nuestro sistema, ¡Pasala Bien!.'
              }).then(response => {
        
                    localStorage.setItem('token', res.token);
        
                    this.usuarioIsLogin = localStorage.getItem('token');
              
                    let decodetoken:any = {};
                    decodetoken = decode(this.usuarioIsLogin);
                    const { documento,nombre_rol} = decodetoken;

                    let form1 = {documento};

                    this.service.comparePassword(form1).subscribe(res => {

                        if(res == 'Si es la primera session'){

                            if(nombre_rol == 'Cliente'){

                              Swal.fire({
                                icon: 'info',
                                title: '¡Bienvenid@!, Gracias Por elegirnos.',
                                text: 'Para realizar el primer inicio de sesion, te redigiremos para que respondas una encuesta y realizar el primer cambio de contraseña.',
                              }).then(response => {
    
                                this.state = 'primera';
                                const state_temp:any = 0;
                                localStorage.setItem('state',state_temp);
    

                                const token:any = localStorage.getItem('token');

                                let decodetoken:any = {};
                                decodetoken = decode(token);
                                const { nombres, primer_apellido, segundo_apellido} = decodetoken;
                            
                                this.nombre = nombres + " " + primer_apellido + " " + segundo_apellido;


                              });

                            }else{



                            }



                        }else if(res == 'No es primera session'){

                          if(nombre_rol=="Administrador"){
                            this.aux = 'ad_i-dfg9op1_i/';
              
                          }else if(nombre_rol=="Entrenador"){
                            this.aux = 'en_i-dfg8op1_i/';
              
                          }else if(nombre_rol=="Nutricionista"){
                            this.aux = "nt_i-dfg12op1_i2/";
              
                          }else if(nombre_rol=="Recepción"){
                            this.aux = "rp_i-dfg458op1_i9/";
              
                          }else if(nombre_rol=="Cliente"){
                            this.aux = "cli_i-dfg078op1_0i1/";
                          }
              
              
                          localStorage.setItem('session', this.aux);
                          this.role = localStorage.getItem('session');
                          this.loginForm.reset();
              
                        }

                    });


        

              });
        
        
        
              }
        
        
            });



    }



  }


 

  finishActivateCuenta(){

    const state:any = localStorage.getItem('state');

    if(state == 0){

      Swal.fire({
        icon: 'error',
        text: 'Para finalizar el proceso primero debe terminar primero el proceso de activación de la cuenta.'
      })

    }else if(state == 1){

      Swal.fire({
        icon: 'success',
        title: '¡Cuenta Activada!',
        text: 'A continuación te redirigiremos a la página principal del cliente.'
      }).then(response => {


        this.state = '';
        this.aux = "cli_i-dfg078op1_0i1/";


        localStorage.setItem('session', this.aux);
        this.role = localStorage.getItem('session');

      });

    }

  }


  closeSession(){

    Swal.fire({
      icon: 'warning',
      title: 'Cerrar Sesión',
      text: 'Si cierra sesión no podrá ser activada la cuenta y tendrá que iniciar desde cero, ¿Desea continuar?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {

        Swal.fire('¡Gracias por Preferirnos!, Te esperamos pronto.', '', 'success').then(response => {

          
        localStorage.clear();
        this.router.navigateByUrl('inicio');

        });
      } else if (result.isDenied) {
        Swal.fire('No cerramos tu sessión, ¡Aún sigues conectado!', '', 'info')
      }
    })


  }








}
