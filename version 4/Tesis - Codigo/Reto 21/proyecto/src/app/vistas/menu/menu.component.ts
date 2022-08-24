import { Component, OnInit } from '@angular/core';
import { SistemaService } from 'src/app/servicios/sistema/sistema.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    content:any;
    img:any;


  constructor(
    private service: SistemaService
  ) {

    this.updateData();
  }

  ngOnInit(): void {

  }


  updateData(){

    this.service.getImg().subscribe(res => {

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





}
