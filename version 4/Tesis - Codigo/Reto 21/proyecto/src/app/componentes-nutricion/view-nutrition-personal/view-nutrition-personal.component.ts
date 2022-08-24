import { Component, OnInit } from '@angular/core';

import { NutritionService } from 'src/app/servicios/nutrition/nutrition.service';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';

import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable';



@Component({
  selector: 'app-view-nutrition-personal',
  templateUrl: './view-nutrition-personal.component.html',
  styleUrls: ['./view-nutrition-personal.component.css']
})
export class ViewNutritionPersonalComponent implements OnInit {

  p:any = 1;

  id_plan:any = '';
  documento_plan:any = '';

  dataNutrition:any = '';

  listData:any;

  listBreakfast:any;
  listNueves:any;
  listLunch:any;
  listOnces:any;
  listDinner:any;

  textToConvert: string|any;
  password: string = 'gKB&uH0MZQVfJA1fE%aW';
  conversionOutput:any|string;

  fecha_inicio:any = '';
  fecha_fin:any = '';
  titulo:any = '';
  nombres:any = '';
  cedula:any = '';
  meses:any = '';
  dias:any = '';
  telefono:any = '';
  correo:any = '';
  meta:any = '';

  role:any;

  constructor(
    private service: NutritionService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.id_plan = this.route.snapshot.paramMap.get('id');

    const documento_temp = localStorage.getItem('plan');
    this.textToConvert = documento_temp;
    this.decrypt();
    this.documento_plan = this.conversionOutput;

    this.updateData();

    const id_plan = this.id_plan;
    const documento = this.documento_plan;
    let form = {id_plan,documento};

    this.service.selectDataNutritionPersonal(form).subscribe(res => {

      this.dataNutrition = res;
      for(let x of this.dataNutrition){
        this.titulo = x.nombre_plan;
        this.fecha_inicio = x.fecha_inicio.substring(0,10);
        this.fecha_fin = x.fecha_fin.substring(0,10);
        this.meses = x.age.months;
        this.dias = x.age.days;
        this.meta = x.meta;
      }

    });

    const id_plan_nutri = this.id_plan;
    let form1 = {documento, id_plan_nutri};

    this.service.selectInfoGeneralUser(form1).subscribe(res => {

      this.listData = res;
      for(let x of this.listData){
 
        this.cedula = x.cedula;
        this.nombres = x.nombres + " " + x.primer_apellido + " " + x.segundo_apellido;
        this.telefono = x.numero_telefono;
        this.correo = x.correo;
        
      }

    });

    this.role = localStorage.getItem('session');
   }

  ngOnInit(): void {
  }

  updateData(){

    const id_plan = this.id_plan;
    let id_tiempo:any = 1;
    const documento = this.documento_plan;
    let form = {id_tiempo, id_plan, documento };

    this.service.selectRegisteredAlimentoUsers(form).subscribe(res => {

      this.listBreakfast = res;

    });

    id_tiempo = 2;
    form = {id_tiempo, id_plan, documento };
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listNueves = res;

    });

    id_tiempo = 3;
    form = {id_tiempo, id_plan, documento };
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listLunch = res;

    });

    id_tiempo = 4;
    form = {id_tiempo, id_plan, documento };
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listOnces = res;

    });


    id_tiempo = 5;
    form = {id_tiempo, id_plan, documento };
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listDinner = res;

    });



  }








  backToList(){

    const session = localStorage.getItem('session');

    if(session == 'ad_i-dfg9op1_i/'){

      localStorage.removeItem('plan');
      this.router.navigateByUrl('nutrition-client');

    }else if(session == 'nt_i-dfg12op1_i2/'){

      localStorage.removeItem('plan');
      this.router.navigateByUrl('feeding-client');

    }

  }


  async getBase64ImageFromUrl(imageUrl:any) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }




  download(){

    const doc = new jsPDF({
      unit: "in",
    });

    const a1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATwAAADJCAYAAAC+LY4YAAA";
    const a2 = "AAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAFKPSURBVHhe7b0HgCRHfe/febonp8";
    const a3 =  "3pTpeTTunupJOEEMEmPsDGGCcwWSAbhHlgbN7DIkogjIVtQARjwMAfbJwe2MgECSGhfEG6qMtx804OPR3/v19N997s3ubp2Zs51eeud7qrq6uqq7";
    const a4 = "u+/avQ1SxDaRjBIJ/0K3xUFFgfwzKsJLGyT+L8vMCKPM8ImPkcx3JV34wNWPhr2YwJf0zbZix0syzGRDfLccNf4ja5XXWr+icLHA7/0R234V/1FxYSDf5h"
    const a5 = "yD+bxEscYRUjZzANkxB/NaB/8jvd3Tl+JqrhT/X/fIOF649LdR3WHIg7cWJYw7QNvJbOLkoDoILXIDo7pLUb1rZ9q5jn+23WNkDXBJ5jFYazRdZmdZu1dMZmTfi1O";
    const a6 = "BQEjlwLWGctXLNZXHdEhEP9Andc5RzxYGEBHWNgmxwPnuAo4odl3V+WiB8UJtwHxzjuxH81PJBbR4hsi8WQwS+UPXSD/ZYBB5vgboI7pNU2YZ8FRxtkG38Z+GWq7mQbhBUON";
    const a7 = "/F4Ehrut+0CKHLeNK2cplvZQtEYnJjQT+XyZlrXba0VC3k0yifXrAq8VJGFjXDuePWIbuE+FC/yAxcat133C0DO1ADXFrftTLb80MHDpQc0za5U91C8ZtqFoHjJlk3B1/mV2F";
    const a8 = "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";
    const a9 = "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";
    const a10 = "mo58frBy6VOf9fIAKnoegdYCWGC6O00WgHyw2WIjm80uhUCgUCo";
    const a11 = "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";


    const img  = a1+a2+a3+a4+a5+a6+a7+a8+a9+a10+a11;

    doc.text('Plan De Alimentación',3,1);
    doc.addImage(img, 'png', 1.5, 0.5, 1.8, 0.8);

    doc.text("NOMBRE PROFESIONAL:",1,1.8);
    doc.setFontSize(12);
    doc.text("JAVIER HELI TORRES ACOSTA",3.7,1.8);
    doc.setFontSize(16);
    doc.text("LIC.EDUCACION FISICA Y ESP ENTRENAMIENTO DEPORTIVO",1,2.1);

    doc.setFontSize(14);
    doc.text("Titulo del Plan: ",1,2.6);
    doc.setFontSize(12);
    doc.text(this.titulo,2.3,2.6);


    doc.setFontSize(16);
    doc.text("Información del Usuario:",1,3.2);
    
    doc.setFontSize(14);
    doc.text("Nombres: ",1,3.5);
    doc.setFontSize(12);
    doc.text(this.nombres,2,3.5);

    doc.setFontSize(14);
    doc.text("Correo: ",1,3.8);
    doc.setFontSize(12);
    doc.text(this.correo,2,3.8);

    doc.setFontSize(14);
    doc.text("Teléfono: ",1,4.1);
    doc.setFontSize(12);
    doc.text(this.telefono,2,4.1);
    
    doc.setFontSize(16);
    doc.text("Información Importante:",1,4.6);

    autoTable(doc,{ margin: {top: 4.5, right: 0, bottom: 0, left: 0} } );
    autoTable(doc,{
      styles: { textColor: [0,0,0] },
      headStyles: { fillColor: [255, 255, 0], }, 

      body: [
        { inicio: this.fecha_inicio, fin: this.fecha_fin, Duracion: this.meses + ' mes(es) y ' + this.dias +  ' dia(s)', meta: this.meta},
      ],
      
      columns: [
        { header: 'Fecha de Inicio', dataKey: 'inicio' },
        { header: 'Fecha de Finalización', dataKey: 'fin' },
        { header: 'Duración', dataKey: 'Duracion'},
        { header: 'Meta', dataKey: 'meta'}
      ],
      
    });


    doc.setFontSize(16);
    doc.text("Menu Patrón",3,5.6);


    doc.setFontSize(16);
    autoTable(doc,{ margin: {top: 7, right: 0, bottom: 6, left: 0} } );
    autoTable(doc,{ headStyles: { fillColor: [255, 255, 0], textColor: [0,0,0] },html: '#table_breakfast'});

    autoTable(doc,{ styles: { }, margin: {top: 4, right: 0, bottom: 2, left: 0} } );
    autoTable(doc,{headStyles: { fillColor: [255, 255, 0], textColor: [0,0,0] }, html: '#table_nueves'});

 
    autoTable(doc,{ styles: { }, margin: {top: 4, right: 0, bottom: 2, left: 0} } );
    autoTable(doc,{headStyles: { fillColor: [255, 255, 0], textColor: [0,0,0] }, html: '#table_lunch'});

    autoTable(doc,{ styles: { }, margin: {top: 1, right: 0, bottom: 0, left: 0} } );
    autoTable(doc,{headStyles: { fillColor: [255, 255, 0], textColor: [0,0,0] }, html: '#table_onces'});

   
    autoTable(doc,{ styles: { }, margin: {top: 1, right: 0, bottom: 0, left: 0} } );
    autoTable(doc,{headStyles: { fillColor: [255, 255, 0], textColor: [0,0,0] }, html: '#table_dinner'});
    

    doc.save("plan_alimentacion.pdf");

  }




  encrypt() {
    this.conversionOutput = CryptoJS.AES.encrypt(this.textToConvert.trim(), this.password.trim()).toString();
  }

  decrypt(){
    this.conversionOutput = CryptoJS.AES.decrypt(this.textToConvert.trim(), this.password.trim()).toString(CryptoJS.enc.Utf8);
  }


    //Botón del paginador ----------------------
    handlePageChange(event:any) {
      this.p = event;
    }
    //..........................................
  
  
}

