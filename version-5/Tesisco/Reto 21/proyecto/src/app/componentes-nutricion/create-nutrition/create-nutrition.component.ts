import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NutritionService } from 'src/app/servicios/nutrition/nutrition.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { NotificationService } from 'src/app/servicios/notification/notification.service';
import { EmailService } from 'src/app/servicios/email/email.service';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  action: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', action: 'string'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', action: 'string'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', action: 'string'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', action: 'string'},

];  


@Component({
  selector: 'app-create-nutrition',
  templateUrl: './create-nutrition.component.html',
  styleUrls: ['./create-nutrition.component.css']
})
export class CreateNutritionComponent implements OnInit {

  id_nutricional:any;

  listAlimento:any;
  listIngredientes:any;
  id_alimento:any;
  
  breakfast:boolean = false;
  ninth:boolean = false;
  lunch:boolean = false;
  onces:boolean = false;
  dinner:boolean = false;

  content_temp:any;


  formCreateBreakfast = new FormGroup({
    id_nutricional: new FormControl('',Validators.required),
    id_tiempo_tiempo: new FormControl(1,Validators.required),
    id_ingrediente_nutri: new FormControl(0,Validators.required),
    cantidad: new FormControl('',Validators.required),
    intercambio: new FormControl('',Validators.required)
  });

  formCreateNueves = new FormGroup({
    id_nutricional: new FormControl('',Validators.required),
    id_tiempo_tiempo: new FormControl(2,Validators.required),
    id_ingrediente_nutri: new FormControl(0,Validators.required),
    cantidad: new FormControl('',Validators.required),
    intercambio: new FormControl('',Validators.required)
  });

  formCreateLunch = new FormGroup({
    id_nutricional: new FormControl('',Validators.required),
    id_tiempo_tiempo: new FormControl(3,Validators.required),
    id_ingrediente_nutri: new FormControl(0,Validators.required),
    cantidad: new FormControl('',Validators.required),
    intercambio: new FormControl('',Validators.required)
  });

  formCreateOnces = new FormGroup({
    id_nutricional: new FormControl('',Validators.required),
    id_tiempo_tiempo: new FormControl(4,Validators.required),
    id_ingrediente_nutri: new FormControl(0,Validators.required),
    cantidad: new FormControl('',Validators.required),
    intercambio: new FormControl('',Validators.required)
  });

  formCreateDinner = new FormGroup({
    id_nutricional: new FormControl('',Validators.required),
    id_tiempo_tiempo: new FormControl(5,Validators.required),
    id_ingrediente_nutri: new FormControl(0,Validators.required),
    cantidad: new FormControl('',Validators.required),
    intercambio: new FormControl('',Validators.required)
  });



  constructor(
    private service:NutritionService,
    private router:Router,
    private route:ActivatedRoute,
    private email: EmailService,
    private auth:AuthUsersService,
    private notification:NotificationService
  ) {
    this.id_nutricional = this.route.snapshot.paramMap.get('id');
    this.updateData();


   }

  ngOnInit(): void {
  }

  updateData(){

    this.service.selectAlimento().subscribe(res => {

      this.listAlimento = res;

    });

  }




  changueAlimento($event:any):void{

    this.id_alimento = $event.target.value;
    const id_alimento = this.id_alimento;
    let form = {};
    form = {id_alimento};

    this.service.selectIngredientes(form).subscribe(res => {
      this.listIngredientes = res;
    });

  }



  createAliment(form:any){

    form.id_nutricional = this.id_nutricional;
    if(form.id_ingrediente_nutri == 0 || form.cantidad == '' || form.intercambio == ''){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'para continuar con el proceso debe llenar todos los campos solicitados en el formulario'
      });

    }else{

      this.service.createAlimento(form).subscribe(res => {

        if(res == 'Alimento insertado con exito'){

          Swal.fire({
            icon: 'success',
            text: 'Se registró con éxito en la base de datos'
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


  saveBreakfast(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Guardar Información',
      text: "¿Está seguro que desea guardar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const id_nutricional = this.id_nutricional;
        const id_tiempo_tiempo = 1;

        let form = {id_nutricional,id_tiempo_tiempo};

        this.service.validateBreakfast(form).subscribe(res => {

          let listAuxiliar:any = res;
          let conteo:any | number = 0;

          for(let x of listAuxiliar){

            conteo = x.conteo;

          }

          if(conteo == 0){

            Swal.fire({
              icon: 'error',
              text: 'Actualmente no es posible realizar la petición, debe generar como minimo un registro en el plan de alimentación del desayuno'
            });

          }else if(conteo >= 1){

            Swal.fire({
              icon: 'success',
              text: 'La información se aguardo con éxito'
            }).then(response => {
    
              this.breakfast = true;
    
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
    })

  }


  saveNueves(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Guardar Información',
      text: "¿Está seguro que desea guardar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const id_nutricional = this.id_nutricional;
        const id_tiempo_tiempo = 2;

        let form = {id_nutricional,id_tiempo_tiempo};

        this.service.validateBreakfast(form).subscribe(res => {

          let listAuxiliar:any = res;
          let conteo:any | number = 0;

          for(let x of listAuxiliar){

            conteo = x.conteo;

          }

          if(conteo == 0){

            Swal.fire({
              icon: 'error',
              text: 'Actualmente no es posible realizar la petición, debe generar como minimo un registro en el plan de alimentación del desayuno'
            });

          }else if(conteo >= 1){

            Swal.fire({
              icon: 'success',
              text: 'La información se aguardo con éxito'
            }).then(response => {
    
              this.ninth = true;
    
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
    })

  }



  saveLunch(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Guardar Información',
      text: "¿Está seguro que desea guardar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const id_nutricional = this.id_nutricional;
        const id_tiempo_tiempo = 3;

        let form = {id_nutricional,id_tiempo_tiempo};

        this.service.validateBreakfast(form).subscribe(res => {

          let listAuxiliar:any = res;
          let conteo:any | number = 0;

          for(let x of listAuxiliar){

            conteo = x.conteo;

          }

          if(conteo == 0){

            Swal.fire({
              icon: 'error',
              text: 'Actualmente no es posible realizar la petición, debe generar como minimo un registro en el plan de alimentación del desayuno'
            });

          }else if(conteo >= 1){

            Swal.fire({
              icon: 'success',
              text: 'La información se aguardo con éxito'
            }).then(response => {
    
              this.lunch = true;
    
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
    })

  }




  saveOnces(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Guardar Información',
      text: "¿Está seguro que desea guardar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const id_nutricional = this.id_nutricional;
        const id_tiempo_tiempo = 4;

        let form = {id_nutricional,id_tiempo_tiempo};

        this.service.validateBreakfast(form).subscribe(res => {

          let listAuxiliar:any = res;
          let conteo:any | number = 0;

          for(let x of listAuxiliar){

            conteo = x.conteo;

          }

          if(conteo == 0){

            Swal.fire({
              icon: 'error',
              text: 'Actualmente no es posible realizar la petición, debe generar como minimo un registro en el plan de alimentación del desayuno'
            });

          }else if(conteo >= 1){

            Swal.fire({
              icon: 'success',
              text: 'La información se aguardo con éxito'
            }).then(response => {
    
              this.onces = true;
    
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
    })

  }




  
  saveDinner(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Guardar Información',
      text: "¿Está seguro que desea guardar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const id_nutricional = this.id_nutricional;
        const id_tiempo_tiempo = 5;

        let form = {id_nutricional,id_tiempo_tiempo};

        this.service.validateBreakfast(form).subscribe(res => {

          let listAuxiliar:any = res;
          let conteo:any | number = 0;

          for(let x of listAuxiliar){

            conteo = x.conteo;

          }

          if(conteo == 0){

            Swal.fire({
              icon: 'error',
              text: 'Actualmente no es posible realizar la petición, debe generar como minimo un registro en el plan de alimentación del desayuno'
            });

          }else if(conteo >= 1){

            Swal.fire({
              icon: 'success',
              text: 'La información se aguardo con éxito'
            }).then(response => {
    
              this.dinner = true;
    
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
    })

  }


  finishRegistered(){

    if(this.breakfast == false || this.ninth == false || this.lunch == false || this.onces == false || this.dinner == false){

      Swal.fire({
        icon: 'error',
        title: 'Proceso Fallido',
        text: 'Para finalizar el proceso debe registrar la información solicitada en todos los formularios, intente nuevamente'
      });

    }else{

      Swal.fire({
        icon: 'success',
        title: 'Proceso Completado',
        text: 'La información se registró con éxito'
      }).then(response => {

        this.router.navigateByUrl('nutrition-general');
        const id_plan_nutri = this.id_nutricional;
        let form = {id_plan_nutri};

        this.service.selectEmailUserNutrition(form).subscribe(res => {

          let correo:any = '';
          let documento_usu:any = '';
          this.content_temp = res;
          for(let x of this.content_temp){
            correo = x.correo;
            documento_usu = x.documento;
          }

          let form1 = {correo};
          this.email.sendEmailAssingPlanNutrition(form1).subscribe(res => {

            if(res == 'Correo enviado'){

              Swal.fire({
                icon: 'success',
                text: 'Se le notifico al usuario por correo electronico la asignación de un plan de alimentación.'
              }).then(response => {

                
                const id_noti_us:any = 37;
                let form5 = {id_noti_us,documento_usu};
                this.notification.sendOneNotification(form5);

              });

            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
              });

            }

          });



        });




      });

    }

  }


  cancellProcess(){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Cancelar Proceso',
      text: "¿Está seguro que desea cancelar el proceso?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        const id_nutricional = this.id_nutricional;
        let form = {id_nutricional};
    
        this.service.cancellPocess(form).subscribe(res => {
    
          if(res == 'Plan nutricional eliminado con exito'){
    
            Swal.fire({
              icon: 'success',
              text: 'El proceso de registro se canceló con éxito'
            }).then(response => {
    
              this.router.navigateByUrl('nutrition-general');
    
            });
    
          }else{
    
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
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
    })



  }







  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','action'];
  dataSource = [...ELEMENT_DATA];

  @ViewChild(MatTable) table!: MatTable<PeriodicElement>;

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
}
