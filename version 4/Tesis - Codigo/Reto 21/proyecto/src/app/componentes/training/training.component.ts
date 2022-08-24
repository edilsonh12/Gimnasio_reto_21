import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { TrainingService } from 'src/app/servicios/training/training.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {

  p: number = 1;
  filtro:any = '';

  listTraining:any;
  listCategory:any;
  listSubCategory:any;
  oneTraining:any;
  oneUpdateTraining:any;

  id_categoria:any;

  video:any;
  URL1:any = '';

  fileTemp:any;
  previewImg:any;


  trainingForm = new FormGroup({
    nombre_ejercicios: new FormControl('',Validators.required),
    descripcion:  new FormControl('',Validators.required),
    categoria: new FormControl('',Validators.required),
    video: new FormControl('',Validators.required)
  });

  updateTrainingForm = new FormGroup({
    id_ejercicios: new FormControl('',Validators.required),
    nombre_ejercicios: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required),
    video: new FormControl('',Validators.required)
  });


  constructor(
    private service: TrainingService
  ) {

    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    this.service.getTrainings().subscribe(res => {
      this.listTraining = res;
    });

    this.service.getCategory().subscribe(res => {
      this.listCategory = res;
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


  changueCategory($event:any):void{

    this.id_categoria = $event.target.value;
    const id_categoria = this.id_categoria;
    let form = {};
    form = {id_categoria};

    this.service.getSubCategory(form).subscribe(res => {
      this.listSubCategory = res;
    });

  }

  changueURL($event:any){

   this.URL1 = this.video.substring(32,43);
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


  createTraining(form:any){

    if(this.video == ''){

      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'Debe ingresar un link de un video para poder continuar con el proceso de registro, intente nueveamente'
      })

    }else{

      if(this.fileTemp){

        const nombre_ejercicios = form.nombre_ejercicios;
        const descripcion = form.descripcion;
        const categoria = form.categoria;
        const video = form.video.substring(32,43);

        const body = new FormData();
        body.append('file',this.fileTemp.fileRaw);
        body.append('nombre_ejercicios',nombre_ejercicios);
        body.append('descripcion',descripcion);
        body.append('categoria',categoria);
        body.append('video',video);


        this.service.createTraining(body).subscribe(res => {

          if(res == 'Ejercicio creado con exito'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Ejercicio registrado con exito'
            }).then(response => {
              this.updateData();
              this.fileTemp= '';
              this.video = '';
              this.trainingForm.reset();
            });



          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Imposible registrar, intente nuevamente'
            })

          }


        });

      }else{


        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'Debe seleccionar una imagen para poder continuar con el proceso de registro, intente nueveamente'
        })


      }

    }


  }

  viewTraining(id_ejercicios:any){

    let form = {};
    form = {id_ejercicios};

    this.service.getOneTraining(form).subscribe(res => {
      this.oneTraining = res;
    });


  }

  refresh(){
    window.location.reload();
  }

  getOneTrainingUpdate(id_ejercicios:any){

    let form = {};
    form = {id_ejercicios};

    this.service.getOneTrainingUpdate(form).subscribe(res => {
      this.oneUpdateTraining = res;
      console.log(res);
    });

  }

  updateTraining(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualización de datos',
      text: "¿Está seguro que desea actrualizar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if(this.fileTemp){

          const id_ejercicios = form.id_ejercicios;
          const nombre_ejercicios = form.nombre_ejercicios;
          const descripcion = form.descripcion;
          const video = form.video.substring(32,43);

          const body = new FormData();
          body.append('file',this.fileTemp.fileRaw);
          body.append('id_ejercicios',id_ejercicios);
          body.append('nombre_ejercicios',nombre_ejercicios);
          body.append('descripcion',descripcion);
          body.append('video',video);

          this.service.updateTrainingImg(body).subscribe(res => {

            if(res == 'Ejercicio actualizado con exito'){

              Swal.fire({
                icon: 'success',
                title: 'Proceso Completado',
                text: 'La información se actualizo con éxito'
              }).then(response => {
                this.updateData();
                this.refresh();
              });

            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'No es posible actualizar la información, intente nuevamente'
              })

            }

          });





        }else{

          const id_ejercicios = form.id_ejercicios;
          const nombre_ejercicios = form.nombre_ejercicios;
          const descripcion = form.descripcion;
          const video = form.video.substring(32,43);

          let forms = {};
          forms = {id_ejercicios, nombre_ejercicios, descripcion, video};

          this.service.updateTraining(forms).subscribe(res => {

            if(res == 'Training actualizado con exito'){

              Swal.fire({
                icon: 'success',
                title: 'Proceso Completado',
                text: 'La información se actualizo con éxito'
              }).then(response => {
                this.updateData();
                this.refresh();
              });


            }else{

              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'No es posible actualizar la información, intente nuevamente'
              })

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
    //..........................................


}
