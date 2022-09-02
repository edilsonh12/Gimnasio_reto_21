import { Component, OnInit } from '@angular/core';

import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';
import { NotificationService } from 'src/app/servicios/notification/notification.service';
import { SistemaService } from 'src/app/servicios/sistema/sistema.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  filtro_client:any = '';
  filtro_notification:any = '';
  p:any = 0;

  documento:any = '';
  state:any = false;

  documentos:any = [];

  content:any;
  img:any;

  listClient:any;
  listNotification:any;

  formCreateNotification = new FormGroup({
    id_noti: new FormControl('',Validators.required),
    texto: new FormControl('',Validators.required)
  });

  formCreateMultiNotification = new FormGroup({
    documentos_usu: new FormControl('',Validators.required),
    id_noti_us: new FormControl(0,Validators.required)
  });

  formCreateOneNotification = new FormGroup({
    documento_usu: new FormControl('',Validators.required),
    id_noti_us: new FormControl(0,Validators.required)
  });

  constructor(
    private auth: AuthUsersService,
    private notification: NotificationService,
    private system: SistemaService
  ) { 

    this.system.getImg().subscribe(res => {

      this.content = res;
      for(let x of this.content){
        this.img = this.arrayBufferToBase64(x.logo.data);
      }

    });


    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    this.auth.getClient().subscribe(res => {

      this.listClient = res;

    });

    this.notification.selectAllNotifications().subscribe(res => {
     
      this.listNotification = res;

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


  createNewNotifications(form:any){

    if(form.texto == ''){

      Swal.fire({
        icon: 'error',
        text: 'Para realizar el registro debe llenar todos los campos solicitados en el formulario.'
      })

    }else{

      form.id_noti = Math.floor((Math.random() * (99999999-10000000))+10000000);
      this.notification.createNotifications(form).subscribe(res => {

        if(res == 'Notificacion creada con exito'){

          Swal.fire({
            icon: 'success',
            title: 'Proceso Completado',
            text: 'La notificación se creo con éxito'
          }).then(response => {

            this.updateData();

          });

        }else{

          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente'
          });

        }

      });

    }



  }

  assingDocument(documento:any){

    this.documento = documento;

  }

  changueStateCheck($event:any,documento:any){

    const state = $event.checked;

    if(state == true){

      this.documentos = [
        ...this.documentos, documento
      ];

    }else if(state == false){

      var myIndex = this.documentos.indexOf(documento);
      if (myIndex !== -1) {
          this.documentos.splice(myIndex, 1);
      }

    }
    
  } 





  formatText(texto:any){
    let result:any = '';
    const countText = texto.length;

    if(countText < 25){
      result = texto;
    }else if(countText >= 25){
      result = texto.substring(0,30) + '...';
    }

    return result;
  }


  createNewMultipleNotification(form:any){

      const count = this.documentos.length;

      if(count == 0){

        Swal.fire({
          icon: 'error',
          text: 'Para poder enviar una notificación a un usuario debe seleccionar minimo un cliente.'
        });

      }else if(count >= 1){

        if(form.id_noti_us == 0){

          Swal.fire({
            icon: 'error',
            text: 'Para enviar una notifiación debe seleccionar una notificación valida.'
          });

        }else{

          form.documentos_usu = this.documentos;
          this.notification.createMultipleNotifications(form).subscribe(res => {
    
            if(res == 'Notificaciones creadas con exito'){
    
              Swal.fire({
                icon: 'success',
                title: 'Proceso Completado',
                text: 'Las notificaciones se enviaron con éxito'
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


      }


  }




  createOneNotifications(form:any){

    if(form.id_noti_us == 0){

      Swal.fire({
        icon: 'error',
        text: 'Para enviar la notificación es necesario que seleccione una notificación valida.'
      })

    }else{
      
      form.documento_usu = this.documento;
      this.notification.sendOneNotification(form).subscribe(res => {

        if(res == 'Notificacion enviada con exito'){

          Swal.fire({
            icon: 'success',
            title: 'Proceso Completado',
            text: 'La notifiación se envió con éxito.'
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










      //Botón del paginador----------------------------------------
      handlePageChange(event:any) {
        this.p = event;
      }
      //-----------------------------------------------------------
  
}
