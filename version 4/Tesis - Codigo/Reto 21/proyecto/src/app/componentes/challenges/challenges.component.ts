import { Component, OnInit } from '@angular/core';

import { SistemaService } from 'src/app/servicios/sistema/sistema.service';  
import { ChallengesService } from 'src/app/servicios/challenges/challenges.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { Router } from '@angular/router';


import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.css']
})
export class ChallengesComponent implements OnInit {

  p:any = 1;
  page:any = 1;
  pagina:any = 1;
  pague:any = 1;
  filtro:any = '';

  id_retos:any;

  listChallenges:any;
  listDataChallenges:any;
  img_logo:any;
  content:any;

  fileTemp:any;
  fileTemp_update:any;

  previewImg:any;
  previewImg_update:any;

  listClientRegister:any = '';
  listClientNoRegister:any = '';
  listState:any = '';

  oneUser:any;

  fecha:any = '';
  hora:any = '';

  listTraining:any;
  listDataFromChallenges:any;

  clientRegistered:any = '';
  clientNoRegistered:any = '';

  formCreateChallenges = new FormGroup({
    nombre_reto: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    fecha: new FormControl('',Validators.required),
    hora: new FormControl('',Validators.required)
  });

  formUpdateChallenges = new FormGroup({
    id_retos: new FormControl('',Validators.required),
    nombre_reto: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    fecha: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    hora: new FormControl('',Validators.required)
  });


  constructor(
    private system:SistemaService,
    private challenges: ChallengesService,
    private router:Router
  ) { 

    this.system.getImg().subscribe(res => {

      this.content = res;
      for(let x of this.content){

        this.img_logo = this.arrayBufferToBase64(x.logo.data);
      }

    });

    this.updateData();

  }

  ngOnInit(): void {
  }


  updateData(){

    this.challenges.selectAllChallenges().subscribe(res => {

      this.listChallenges = res;

    });


    this.challenges.selectState().subscribe(res => {

      this.listState = res;

    });


  }

  validateTime(hora:any){

    let hora_now:any;
    const hora_temp = hora.substring(0,2);
    if(hora_temp < 12){
      hora_now = hora.substring(0,5) + " - AM"
    }else if(hora_temp >= 12){
      hora_now = hora.substring(0,5) + " - PM"
    }


    return hora_now;
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


  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  addDaysToDate(date:any, days:any){
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
  }



  createChallenges(form:any){

    if(form.nombre_reto == '' || form.descripcion == '' || form.fecha == '' || form.hora == ''){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Para poder continuar con el proceso debe llenar el formulario, intente nuevamente'
      });

    }else{

      if(!this.previewImg){

        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'No es posible realizar el proceso, debe seleccionar una imagen para continuar'
        });
  
      }else{
       
        let fecha_revision:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

        if(form.fecha == fecha_revision){
    
          Swal.fire({
            icon: 'error',
            title: 'Proceso Fallido',
            text: 'Debe seleccionar una fecha diferente a la actual'
          })
    
        }else{
    
          if(form.fecha_fin < fecha_revision){
    
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Debe seleccionar una fecha valida para realizar el registro'
            });
    
          }else{
    
            const fecha_validacion = this.addDaysToDate(fecha_revision,32);
            let fecha_revision_max:any = this.pipe.transform(fecha_validacion, 'yyyy-MM-dd');
    
            if(form.fecha_fin < fecha_revision_max){
    
              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'Debe seleccionar una fecha valida para realizar el registro, los planes de alimentación se asignan minimo por un mes'
              });
    
            }else{

              const id_retos:any =  Math.floor((Math.random() * (99999999-10000000))+10000000); 
  

              const body = new FormData();
              body.append('file',this.fileTemp.fileRaw);
              body.append('id_retos',id_retos);
              body.append('nombre_reto',form.nombre_reto);
              body.append('descripcion',form.descripcion);
              body.append('fecha',form.fecha);
              body.append('hora',form.hora);
        
              this.challenges.createChallenges(body).subscribe(res => {
        
                if(res == 'Reto creado con exito'){
        
                  Swal.fire({
                    icon: 'success',
                    text: 'Reto creado con éxito, a continuación deberá asignar los ejercicios que pertenecen al reto.'
                  }).then(response => {
        
                    this.router.navigateByUrl('challenges-routines/'+ id_retos);
        
                  });
        
                }else{
        
                  Swal.fire({
                    icon: 'error',
                    title: 'Proceso Fallido',
                    text: 'Actualmente no es posible realizar la petición, intente nuevamente'
                  });
        
                }
        
              });
    
            }
    
          }
    
        }



      }


    }

  }


  updateStateChallenges(id_retos:any,estado:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Actualización de Información',
      text: "¿Está seguro que desea actualizar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, está seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {


        let state:any = '';

        if(estado == 'Programado'){
          state = 2;
        }else if(estado = 'Finalizado'){
          state = 1;
        }
    
        let form = {id_retos,state};
    
        this.challenges.updateStateChallenges(form).subscribe(res => {
    
          if(res == 'Estado actualizado con exito'){
    
            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'El proceso de actualización del estado del reto se realizó con éxito'
            }).then(response => {
    
              this.updateData();
    
            });
    
          }else{
    
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Actualmente no es posible realizar la petición, intente nuevamente'
            });
    
          }
    
        });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {

        swalWithBootstrapButtons.fire(
          'Cancelado',
          'error'
        )

      }
    });

  }


  searchClientRegisterChallenges(id_retos:any){

    let form = {id_retos};
    this.id_retos = id_retos;

    this.challenges.selectClientRegistered(form).subscribe(res => {

      this.listClientRegister = res;

    });

  }

  searchClientNoRegisteredChallenges(){
  
    const id_retos = this.id_retos;
    let form = {id_retos};

    this.challenges.selectClientNoRegistered(form).subscribe(res => {

      this.listClientNoRegister = res;

    });

  }

  registeredClientToChallenges(documento:any){

    const id_retos_us = this.id_retos;
    const documento_us = documento;

    let form = {id_retos_us,documento_us};

    this.challenges.registeredClientToChallenges(form).subscribe(res => {

      if(res == 'Usuario registrado con éxito'){

        Swal.fire({
          icon: 'success',
          title: 'Proceso Completado',
          text: 'El usuario se registró con exito en el reto'
        }).then(response => {

          this.searchClientNoRegisteredChallenges();
          const id_retos = this.id_retos;
          let form = {id_retos};
      
          this.challenges.selectClientRegistered(form).subscribe(res => {
      
            this.listClientRegister = res;
      
          });

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


    searchOneUser(documento:any){

      let form = {documento};

      this.challenges.searchOneUser(form).subscribe(res => {

        this.oneUser = res;

      });

    }

    searchChallenges(id_retos:any){
      
      let form = {id_retos};

      this.challenges.searchDataChallenges(form).subscribe(res => {

        this.listDataChallenges = res;

      });


    }

    searchChallengesData(id_retos:any){

      let form = {id_retos};

      this.challenges.selectDataFromChallenges(form).subscribe(res => {

        this.listDataFromChallenges = res;

      });

      this.challenges.selectTrainingFromChallenges(form).subscribe(res => {
        
        this.listTraining = res;

      });


    }

    transformDate(fecha:any){
      const fecha_transformada:any = this.pipe.transform(fecha, 'yyyy-MM-dd');
      this.fecha = fecha_transformada;
    }

    transformDate_(fecha:any){
      const fecha_transformada:any = this.pipe.transform(fecha, 'yyyy-MM-dd');
      return fecha_transformada;
    }




    transformTime(hora:any){
      const hora_now:string|any = hora;
      this.hora = hora_now.substring(0,5);
    }

    transformTime_(hora:any){
      const hora_now:string|any = hora;
      const hora_aux = hora_now.substring(0,2);
      let hora_:any;

      if(hora_aux < 12){
        hora_ = hora_now.substring(0,5) + " - AM";
      }else if(hora_aux >= 12){
        hora_ = hora_now.substring(0,5) + " - PM";
      }

      return hora_;
    }


    getImg_update($event:any):void{

      const [ file ] = $event.target.files;
  
      this.fileTemp_update = {
        fileRaw: file
      };
  
      const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.previewImg_update = reader.result;
      };
        reader.readAsDataURL(file);
    }


    updateChallenges(form:any){

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

          if(!this.previewImg_update){

            this.challenges.updateChallengesNoImg(form).subscribe(res => {


    
              if(res == 'Reto actualizado con exito'){
    
                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Compeltado',
                  text: 'La información del reto se actualizó con exito'
                }).then(response => {
    
                  this.updateData();
    
                });
    
              }else{
    
                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición, intente nuevamente'
                });
    
              }
    
            });
            
    
          }else{
    
            const body = new FormData();
            body.append('file',this.fileTemp_update.fileRaw);
            body.append('id_retos',form.id_retos);
            body.append('nombre_reto',form.nombre_reto);
            body.append('descripcion',form.descripcion);
            body.append('fecha',form.fecha);
            body.append('state',form.state);
            body.append('hora',form.hora);
    
            this.challenges.updateChallengesImg(body).subscribe(res => {
    
              if(res == 'Reto actualizado con exito'){
    
                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Compeltado',
                  text: 'La información del reto se actualizó con exito'
                }).then(response => {
    
                  this.updateData();
    
                });
              
              }else{
    
                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición, intente nuevamente'
                });
    
              }
    
            });
    
    
          }



        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {

          swalWithBootstrapButtons.fire(
            'Cancelado',
            'error'
          )


        }
      })




    }






      //Botón del paginador ----------------------
      handlePageChange(event:any) {
        this.p = event;
      }

      changePage(event:any) {
        this.page = event;
      }

      cambiarPagina(event:any) {
        this.pagina = event;
      }

      changePague(event:any) {
        this.pague = event;
      }

      //..........................................

}
