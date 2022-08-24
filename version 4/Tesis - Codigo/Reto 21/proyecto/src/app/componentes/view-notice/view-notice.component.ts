import { ContentObserver } from '@angular/cdk/observers';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NoticesService } from 'src/app/servicios/notices/notices.service';


@Component({
  selector: 'app-view-notice',
  templateUrl: './view-notice.component.html',
  styleUrls: ['./view-notice.component.css']
})
export class ViewNoticeComponent implements OnInit {

  ID:any;
  oneNotice:any;
  listNotice:any;

  constructor(
    private route:ActivatedRoute,
    private service:NoticesService,
    private router:Router
  ) {

    this.updateData();

  }

  updateData(){


    this.ID = this.route.snapshot.paramMap.get('id');
    const id_informacion = this.ID;
    let form = {};
    form = {id_informacion};


    this.service.getViewOneNotice(form).subscribe(res => {
      this.oneNotice = res;
    });


    this.service.getViewNoticeExcep(form).subscribe(res => {
      this.listNotice = res;
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


  refresh(id_informacion:any){
    this.router.navigateByUrl('/view-notice/'+id_informacion);
    this.updateData();


  }

}
