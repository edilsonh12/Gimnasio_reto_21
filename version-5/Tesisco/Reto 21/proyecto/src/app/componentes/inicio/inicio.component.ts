import { Component, OnInit } from '@angular/core';
declare var google: any;
import { MapInfoWindow, MapMarker } from "@angular/google-maps";

import { NoticesService } from 'src/app/servicios/notices/notices.service';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';


import * as AOS from 'aos';
import { SistemaService } from 'src/app/servicios/sistema/sistema.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EmailService } from 'src/app/servicios/email/email.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listPlans:any;
  listNotice:any;

  content_temp:any;
  img:any;

  listPersonal:any;

  oneUserInfo:any = '';
  titleUser:any = '';
  state_temp:any = false;

  listObjetivo:any;
  listValores:any;
  listMision:any;
  listVision:any;

  rol_temp:any = '';

  formSendContact = new FormGroup({
    nombre: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    numero_telefono: new FormControl('',Validators.required),
    mensaje: new FormControl('',Validators.required)
  });

  formBuzon = new FormGroup({
    buzon: new FormControl('',Validators.required)
  });


  mapOptions: google.maps.MapOptions = {
    center: { lat: 4.4035444, lng: -74.3863951 },
    zoom : 18
 }
 marker = {
    position: { lat: 4.4035444, lng: -74.3863951 },
 }

  constructor(
    private service: SistemaService,
    private notice: NoticesService,
    private auth:AuthUsersService,
    private email: EmailService
  ) {
    this.service.getPlans().subscribe(res => {
      this.listPlans = res;
    });


    this.notice.viewCortNotice().subscribe(res => {

      this.listNotice = res;

    });

    this.service.getImg().subscribe(res => {

      this.content_temp = res;
      for(let x of this.content_temp){
        this.img = this.arrayBufferToBase64(x.logo.data);
      }

    });


    this.service.getMision().subscribe(res => {

      this.listMision = res;

    });


    this.service.getVision().subscribe(res => {

      this.listVision = res;

    });


    this.service.getValues().subscribe(res => {

      this.listValores = res;

    });


    this.service.getObjetivo().subscribe(res => {

      this.listObjetivo = res;

    });



  }

  ngOnInit(): void {
    AOS.init();
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


  formatDuracion(duracion:any){

    let resultado:any = '';

    if(duracion == 1){
      resultado = duracion + ' mes de duración';
    }else if(duracion >= 2){
      resultado = duracion + ' meses de duración';
    }
    return resultado;
  }


  searchListUserFromRol(rol:any){
    
    let form = {rol};
    this.rol_temp = rol;
    this.auth.selecUserFromRol(form).subscribe(res => {


      if(res == 'No hay usuarios'){
        this.state_temp = false;
      }else{
        this.listPersonal = res;
        this.state_temp = true;
      }

      

    });

  }

  searchDataOfTitlePersonal(documento:any){

    let form = {documento};
    this.auth.searchOnePersonalInfo(form).subscribe(res => {

      this.oneUserInfo = res;

    });

    this.auth.searchOnePersonalTitle(form).subscribe(res => {

      this.titleUser = res;

    });


  }


  sendContact(form:any){

    if(form.nombre == '' || form.numero_telefono == '' || form.mensaje == '' || form.email == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para poder enviar el correo de contacto debe llenar todos los campos en el formulario'
      })

    }else{

      this.email.sendEmailContact(form).subscribe(res => {

        if(res == 'Correo enviado'){

          Swal.fire({
            icon: 'success',
            text: 'Hemos enviado el correo de contacto, en los proximos días se comunicaran contigo.'
          })

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Actualmente no es posible enviar el correo, intente más tarde'
          });

        }

      });

    }


  }



  sendBuzon(form:any){

    if(form.buzon == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para realizar el proceso de enviar una sugerencia primero debe llenar los datos solicitados en el formulario, intente nuevamente.',
      });

    }else{

      this.email.sendEmailBuzon(form).subscribe(res => {

        if(res == 'Correo enviado'){

          Swal.fire({
            icon: 'success',
            text: '¡Ya enviamos la sugerencia!, Gracias por tu participacipon.'
          })

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Actualmente no es posible enviar el el buzón de sugerencia, intente más tarde'
          })

        }

      });

    }

  }



}
