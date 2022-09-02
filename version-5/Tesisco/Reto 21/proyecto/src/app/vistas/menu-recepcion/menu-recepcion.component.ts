import { Component, OnInit } from '@angular/core';
import { SistemaService } from 'src/app/servicios/sistema/sistema.service';

import decode from 'jwt-decode';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-recepcion',
  templateUrl: './menu-recepcion.component.html',
  styleUrls: ['./menu-recepcion.component.css']
})
export class MenuRecepcionComponent implements OnInit {

  nombre:any = '';
  documento:any = '';

  photo:any;
  img:any;
  content:any;

  constructor(
    private system: SistemaService,
    private auth: AuthUsersService,
    private router: Router
  ) {

    const token:any = localStorage.getItem('token');

    let decodetoken:any = {};
    decodetoken = decode(token);
    const { documento ,nombres, primer_apellido, segundo_apellido} = decodetoken;

    this.nombre = nombres + " " + primer_apellido + " " + segundo_apellido;

    let form = {};
    form = {documento};
    this.auth.getImg(form).subscribe(res => {
      this.photo = res;
    });


    this.system.getImg().subscribe(res => {

      this.img = res;
       for(let x of this.img){

         this.content = this.arrayBufferToBase64(x.logo.data);
       }

     })

   }

  ngOnInit(): void {
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


  closeSession(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Cerrar Sessión',
      text: "¿Estás seguro que desea cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.clear();
        this.router.navigateByUrl('inicio');

        Swal.fire({
          icon: 'success',
          text: 'Gracias por preferirnos. ¡Regresa prongo!'
        }).then(response => {

          window.location.reload();

        });

      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        Swal.fire({
          icon: 'info',
          text: '¡Aún continuas conectado con nosotros!'
        })

      }
    })

  }  

}
