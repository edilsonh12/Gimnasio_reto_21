import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { NoticesService } from 'src/app/servicios/notices/notices.service';
import decode from 'jwt-decode';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  p = 1;
  filtro:any = '';

  imgTemp:any;
  previewImg:any;

  listNotice:any;
  oneNotice:any;

  content:any;

  imgAct:any;
  tempImg:any;
  preview:any;



  noticeForm = new FormGroup({
    titulo: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required)
  });

  noticeUpdateForm = new FormGroup({
    id_informacion: new FormControl('',Validators.required),
    titulo: new FormControl('',Validators.required),
    descripcion: new FormControl('',Validators.required)
  });

  constructor(
    private notices:NoticesService
  ) {

    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    this.notices.getNotices().subscribe(res => {
      this.listNotice = res;
    });

  }

  getImg($event:any):void{

    const [ file ] = $event.target.files;

    this.imgTemp = {
      fileRaw: file
    };

    const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.previewImg = reader.result;
    };
      reader.readAsDataURL(file);
  }

  createNotice(forms:any){


    const token:any = localStorage.getItem('token');

    let decodetoken:any = {};
    decodetoken = decode(token);
    const { documento } = decodetoken;
    const autor = documento;
    const titulo = forms.titulo;
    const descripcion = forms.descripcion;

    const id_fecha:any =  Math.floor((Math.random() * (99999999-10000000))+10000000);

    let form = {};
    form = {id_fecha};

    this.notices.insertDate(form).subscribe(res => {

      if(res == 'Fecha Creada con exito'){

        const body = new FormData();
        body.append('file',this.imgTemp.fileRaw);
        body.append('id_informacion',id_fecha);
        body.append('titulo',titulo);
        body.append('descripcion',descripcion);
        body.append('autor',autor);

        let form = {};
        form = {id_fecha,titulo,descripcion,autor};

        this.notices.createNotice(body).subscribe(res => {

            if(res=='Noticia registrada con exito'){
              Swal.fire({
                icon: 'success',
                title: 'Proceso Completado',
                text: 'Se registro con exito la información'
              }).then(response => {
                  this.updateData();
                  this.noticeForm.reset();
              });
            }else{
              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'No es posible registrar la información, intente nuevamente'
              });
            }

        });

      }else{
        Swal.fire({
          icon: 'error',
          title: 'Proceso Fallido',
          text: 'No es posible registrar la información, intente nuevamente'
        })
      }

    });

  }

  closeData(){
    this.noticeForm.reset();
    this.noticeUpdateForm.reset();
  }


  deleteNotice(id_informacion:any){

    let form = {};
    form = {id_informacion};

    this.notices.getFromDelete(form).subscribe(res => {

      this.content = res;
      let fecha:any = '';
      for(let x of this.content){
        fecha = x.fecha;
      }


      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Eliminar información',
        text: "¿Está seguro que desea eliminar la información publicada?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'No estoy seguro',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {

              form = {};
              form = {id_informacion};
              this.notices.deleteNotice(form).subscribe(res => {

                      if(res == 'Noticia borrada con exito'){

                                const id_fecha = fecha;
                                let form = {};
                                form = {id_fecha};
                                this.notices.deleteDate(form).subscribe(res => {

                                  if(res == 'Fecha borrada con exito'){

                                    Swal.fire({
                                      icon: 'success',
                                      title: 'Proceso Completado',
                                      text: 'La información fue borrada con exito'
                                    }).then(response => {
                                      this.updateData();
                                      this.imgTemp = '';
                                      this.previewImg = '';
                                    });

                                  }else{
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Proceso Fallido',
                                    text: 'No es posible eliminar la información, intente nuevamente'
                                  })
                                  }

                                });



                }else{

                  Swal.fire({
                    icon: 'error',
                    title: 'Proceso Fallido',
                    text: 'No es posible eliminar la información, intente nuevamente'
                  })

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



    });

  }




  selectOneNotice(id_informacion:any){

    let form = {};
    form = {id_informacion};
    this.notices.getOneNotice(form).subscribe(res => {
      this.oneNotice = res;

      for(let x of this.oneNotice){
        this.imgAct = this.arrayBufferToBase64(x.multimedia.data);
      }

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


getImgUpdate($event:any):void{

  const [ file ] = $event.target.files;

  this.tempImg = {
    fileRaw: file
  };

  console.log(this.tempImg);

  const Reader = new FileReader();
    Reader.readAsDataURL(file);
    Reader.onloadend = () => {
      this.previewImg = Reader.result;
  };
    Reader.readAsDataURL(file);
}


  updateNotice(form:any){

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Actualizar Información',
      text: "¿Está seguro que desea actualizar información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'No estoy seguro',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        if(this.previewImg){ //Existencia de una imagen

            const { id_informacion, titulo, descripcion } = form;

            const body = new FormData();
            body.append('file',this.tempImg.fileRaw);
            body.append('id_informacion',id_informacion);
            body.append('titulo',titulo);
            body.append('descripcion',descripcion);

            this.notices.updateNoticeImg(body).subscribe(res => {

                if(res == 'Noticia actualizada con exito'){

                  Swal.fire({
                    icon: 'success',
                    title: 'Proceso Compeltado',
                    text: 'La actualización se realizo con exito'
                  }).then(response => {
                    this.updateData();
                    this.noticeUpdateForm.reset();
                    this.preview=null;
                  });


                }else{

                  Swal.fire({
                    icon: 'error',
                    title: 'Proceso Fallido',
                    text: 'Es imposible realizar actualizar la información, intente nuevamente'
                  })

                }



            });



        }else{ //No hay existencia de imagen

          this.notices.updateNotice(form).subscribe(res => {

            if(res == 'Noticia actualizada con exito'){

              Swal.fire({
                icon: 'success',
                title: 'Proceso Compeltado',
                text: 'La actualización se realizó exitosamente'
              }).then(response => {
                this.updateData();
                this.noticeUpdateForm.reset();
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


    //Paginador------------------------------------------------

    handlePageChange(event:any) {
      this.p = event;
    }

    //--------------------------------------------------------





}
