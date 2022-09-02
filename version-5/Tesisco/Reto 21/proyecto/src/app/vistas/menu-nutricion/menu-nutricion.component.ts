import { Component, OnInit } from '@angular/core';
import { SistemaService } from 'src/app/servicios/sistema/sistema.service';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import decode from 'jwt-decode';

@Component({
  selector: 'app-menu-nutricion',
  templateUrl: './menu-nutricion.component.html',
  styleUrls: ['./menu-nutricion.component.css']
})
export class MenuNutricionComponent implements OnInit {

  nombre:string = '';
  img:any;
  content:any;

  photo:any;


  constructor(
    private system: SistemaService,
    private authService: AuthUsersService,
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
    const { documento ,nombres, primer_apellido, segundo_apellido} = decodetoken;

    this.nombre = nombres + " " + primer_apellido + " " + segundo_apellido;

    let form = {};
    form = {documento};
    this.authService.getImg(form).subscribe(res => {
      this.photo = res;
    });



    this.system.getImg().subscribe(res => {

      this.img = res;
       for(let x of this.img){

         this.content = this.arrayBufferToBase64(x.logo.data);
       }

     })

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
      title: 'Cerrar Sesión',
      text: "¿Seguro que desea cerrar sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
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

        swalWithBootstrapButtons.fire(
          
          'La sesión no se cerró, sigue disfrutando de nuestros servicios.',
          'success'
        )

      }
    })
    


   }





}
