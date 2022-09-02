import { Component, OnInit } from '@angular/core';

import { SistemaService } from 'src/app/servicios/sistema/sistema.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {

  mision:any;
  vision:any;
  objetivo:any;
  values:any;
  img:any;
  content:any = '';

  private fileTemp:any;
  public previewImg:any;


  misionForm = new FormGroup({
     mision: new FormControl('',Validators.required)
  });

  visionForm = new FormGroup({
    vision: new FormControl('',Validators.required)
  });

  objetivoForm = new FormGroup({
    objetivos: new FormControl('',Validators.required)
  });

  valuesForm = new FormGroup({
    valores: new FormControl('',Validators.required)
  });


  constructor(
    private service: SistemaService
  ) {

    this.updateData();

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


  ngOnInit(): void {
  }

  updateMision(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualizar información',
      text: "¿Está seguro que desea actualizar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.putMision(form).subscribe(res => {

          if(res == 'Información actualizada con éxito'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Actualización de la información completada'
            }).then(response => {

              this.updateData();

            });

          }else{
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'El proceso fallo, intente nuevamente'
            })
          }

        });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Proceso cancelado'
        })
      }
    })

  }

  updateVision(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualizar información',
      text: "¿Está seguro que desea actualizar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.putVision(form).subscribe(res => {

          if(res == 'Información actualizada con éxito'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Actualización de la información completada'
            }).then(response => {

              this.updateData();

            });

          }else{
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'El proceso fallo, intente nuevamente'
            })
          }

        });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Proceso cancelado'
        })
      }
    })

  }


  updateObjetivo(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualizar información',
      text: "¿Está seguro que desea actualizar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.putObjetivo(form).subscribe(res => {

          if(res == 'Información actualizada con éxito'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Actualización de la información completada'
            }).then(response => {

              this.updateData();

            });

          }else{
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'El proceso fallo, intente nuevamente'
            })
          }

        });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Proceso cancelado'
        })
      }
    })

  }

  updateValues(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualizar información',
      text: "¿Está seguro que desea actualizar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        this.service.putValues(form).subscribe(res => {

          if(res == 'Información actualizada con éxito'){

            Swal.fire({
              icon: 'success',
              title: 'Proceso Completado',
              text: 'Actualización de la información completada'
            }).then(response => {

              this.updateData();

            });

          }else{
            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'El proceso fallo, intente nuevamente'
            })
          }

        });


      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          icon: 'error',
          title: 'Proceso cancelado'
        })
      }
    })

  }


  updateData(){

    this.service.getMision().subscribe(res => {
      this.mision = res;
     });

     this.service.getVision().subscribe(res => {
       this.vision = res;
     });

     this.service.getObjetivo().subscribe(res => {
       this.objetivo = res;
     });

     this.service.getValues().subscribe(res => {
       this.values = res;
     });

     this.service.getImg().subscribe(res => {

      this.img = res;
       for(let x of this.img){

         this.content = this.arrayBufferToBase64(x.logo.data);
       }

     })

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

  sendFile(){


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualización de información',
      text: "¿Esta seguro que desea actualizar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

            if(!this.fileTemp){
              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'Para poder completar el proceso, primero debe seleccionar una imagen'
              })
            }else{

                  const body = new FormData();
                  body.append('file',this.fileTemp.fileRaw);

                  this.service.updateLogoImg(body).subscribe(res => {

                    if(res == 'Imagen actualizada con éxito'){

                      Swal.fire({
                        icon: 'success',
                        title: 'Proceso Completado',
                        text: 'Actualización del logo completado'
                      }).then(response => {

                        this.updateData();

                      });

                    }else{
                      Swal.fire({
                        icon: 'error',
                        title: 'Proceso Fallido',
                        text: 'El proceso fallo, intente nuevamente'
                      })
                    }

                  });

            }

      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {

        Swal.fire({
          icon: 'error',
          title: 'Proceso Cancelado'
        })

      }
    })

    this.previewImg = '';
  }


}
