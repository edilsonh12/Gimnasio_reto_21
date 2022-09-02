import { Component, OnInit } from '@angular/core';

import { NutritionService } from 'src/app/servicios/nutrition/nutrition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-see-nutrition',
  templateUrl: './see-nutrition.component.html',
  styleUrls: ['./see-nutrition.component.css']
})
export class SeeNutritionComponent implements OnInit {

  p:any = 1;
  filtro:any = '';

  listNutrition:any;

  constructor(
    private nutrition: NutritionService,
    private router: Router
  ) { 

    this.updateData();

  }

  ngOnInit(): void {
  }

  updateData(){

    this.nutrition.selectNutritionGeneral().subscribe(res => {

      this.listNutrition = res;

    });


  }

  searchPlanNutrition(id_plan:any){

    this.router.navigateByUrl('view-nutrition/'+id_plan);

  }



    //Botón del paginador ----------------------
    handlePageChange(event:any) {
      this.p = event;
    }
    //..........................................
  
  
}
