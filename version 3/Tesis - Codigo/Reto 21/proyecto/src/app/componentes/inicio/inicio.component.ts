import { Component, OnInit } from '@angular/core';
declare var google: any;
import { MapInfoWindow, MapMarker } from "@angular/google-maps";


import * as AOS from 'aos';
import { SistemaService } from 'src/app/servicios/sistema/sistema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listPlans:any;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 4.4035444, lng: -74.3863951 },
    zoom : 18
 }
 marker = {
    position: { lat: 4.4035444, lng: -74.3863951 },
 }

  constructor(
    private service: SistemaService
  ) {
    this.service.getPlans().subscribe(res => {
      this.listPlans = res;
    });
  }

  ngOnInit(): void {
    AOS.init();
  }





}
