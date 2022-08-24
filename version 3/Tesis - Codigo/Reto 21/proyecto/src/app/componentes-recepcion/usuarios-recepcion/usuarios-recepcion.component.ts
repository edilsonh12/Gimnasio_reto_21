import { Component, OnInit } from '@angular/core';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import { DatePipe } from '@angular/common';  
import Swal from 'sweetalert2';

import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-usuarios-recepcion',
  templateUrl: './usuarios-recepcion.component.html',
  styleUrls: ['./usuarios-recepcion.component.css']
})
export class UsuariosRecepcionComponent implements OnInit {

  listAllClient:any;
  listTypeDocument:any;
  listGender:any;
  listSuscription:any;
  listTypeAssessment:any;

  nameSuscription:any = '';
  costSuscription:any = '';
  fecha_de_inicio:any = '';
  fecha_de_fin:any = '';
  state_fecha_pago:any = '';

  list_temp:any;

  today: Date = new Date();
  pipe = new DatePipe('en-US');

  createNewUser = new FormGroup({
    tipo_de_documento: new FormControl(0,Validators.required),
    documento: new FormControl('',Validators.required),
    nombres: new FormControl('',Validators.required),
    primer_apellido: new FormControl('',Validators.required),
    segundo_apellido: new FormControl('',Validators.required),
    correo: new FormControl('',Validators.required),
    numero_telefono: new FormControl('',Validators.required),
    estado: new FormControl(1,Validators.required),
    genero: new FormControl(0,Validators.required),
    img: new FormControl(1,Validators.required),
    fecha_nacimiento: new FormControl('',Validators.required),
    id_suscripcion_pago: new FormControl(0,Validators.required),
    fecha_de_inicio: new FormControl('',Validators.required),
    fecha_de_fin: new FormControl('',Validators.required),
    id_valoracion_tipo: new FormControl(0,Validators.required)
  });

  constructor(
    private auth: AuthUsersService
  ) {

    this.updateData();
    this.updateContent();

   }

  ngOnInit(): void {
  }

  updateData(){

    this.auth.selectAllClient().subscribe(res => {

        this.listAllClient = res;

    });




  }

  updateContent(){

    this.auth.getDocuments().subscribe(res => {

      this.listTypeDocument = res;

    });

    this.auth.getGender().subscribe(res => {

      this.listGender = res;

    });

    this.auth.selectPlanSuscription().subscribe(res => {

      this.listSuscription = res;

    });

    this.auth.selectTypeValoracion().subscribe(res => {

      this.listTypeAssessment = res;

    });

  }


  searchPlanes(id_suscripcion:any,documento:any){

    let form = {id_suscripcion,documento};
    this.auth.searchSuscription(form).subscribe(res => {

      this.list_temp = res;
      for(let x of this.list_temp){
        this.nameSuscription = x.titulo_suscripcion;
        this.costSuscription = x.precio
        this.fecha_de_inicio = x.fecha_de_inicio;
        this.fecha_de_fin = x.fecha_de_fin;
      }

      let fecha_now:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');
      if(this.fecha_de_inicio <= fecha_now && this.fecha_de_fin > fecha_now){
          this.state_fecha_pago = 'al_dia';
      }else if(this.fecha_de_fin == fecha_now){
          this.state_fecha_pago = 'casi';
      }else if(this.fecha_de_fin < fecha_now){
          this.state_fecha_pago = 'sin';
      }


    });

  }




  updateStateUsers(nombre_cuenta:any,documento:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Actualizar el estado del Usuario.',
      text: "¿Está seguro que desea actualizar el estado del usuario?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

            let estado:any = '';
        
            if(nombre_cuenta == 'Activo'){
              estado = 2;
            }else if(nombre_cuenta == 'Inactivo'){
              estado = 1;
            }
        
            let form = {documento,estado};
        
            this.auth.updateStateClient(form).subscribe(res => {
        
              if(res == 'Estado del cliente actualizado con exito'){
        
                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Completado',
                  text: 'El estado del usuario se actualizó con éxito.'
                }).then(response => {
        
                  this.updateData();
        
                });
        
              }else{
        
                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
                })
        
              }
        
        
            });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {


        Swal.fire({
          icon: 'error',
          title: 'Cancelado'
        })

      }
    })

  }


  createNewUsers(form:any){


    if(form.tipo_de_documento == 0 || form.id_suscripcion_pago == 0 || form.id_valoracion_tipo == 0 || form.genero == 0){

      Swal.fire({
        icon: 'error',
        text: 'Para continuar con el proceso de registro de un nuevo cliente debe llenar todos los campos solicitados en el formulario anterior.'
      });

    }else{

      if(form.documento == '' || form.nombres == '' || form.primer_apellido == '' || form.segundo_apellido == '' || form.numero_telefono == '' || form.correo == '' 
      || form.fecha_de_fin == '' || form.fecha_nacimiento == ''){

        Swal.fire({
          icon: 'error',
          text: 'Para continuar con el proceso de registro de un nuevo cliente debe llenar todos los campos solicitados en el formulario anterior.'
        });

      }else{

        this.auth.createNewUser(form).subscribe(res => {

            if(res == 'Nuevo usuario creado con éxito'){

              Swal.fire({
                icon: 'success',
                title: 'Proceso Completado',
                text: '¡Nuevo usuario cliente creado con éxito!, La cuenta se encuentra lista para su activación.'
              }).then(response => {

                this.updateData();

              });

            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente.'
              })

            }


        });


      }


    }


  }




}
