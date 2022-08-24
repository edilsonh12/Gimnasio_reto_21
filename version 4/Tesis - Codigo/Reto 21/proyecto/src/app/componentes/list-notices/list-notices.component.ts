import { Component, OnInit } from '@angular/core';

import { NoticesService } from 'src/app/servicios/notices/notices.service';

@Component({
  selector: 'app-list-notices',
  templateUrl: './list-notices.component.html',
  styleUrls: ['./list-notices.component.css']
})
export class ListNoticesComponent implements OnInit {

  p = 1;

  listNotices:any;
  listImg:any;

  constructor(
    private service: NoticesService
  ) {
    this.updateData();
  }

  updateData(){

    this.service.getViewNotices().subscribe(res => {
      this.listNotices = res;
    });

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





    //Botón del paginador ----------------------
    handlePageChange(event:any) {
      this.p = event;
    }
    //..........................................

}
