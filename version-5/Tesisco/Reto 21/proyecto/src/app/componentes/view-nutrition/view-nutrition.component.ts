import { Component, OnInit } from '@angular/core';

import { NutritionService } from 'src/app/servicios/nutrition/nutrition.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-nutrition',
  templateUrl: './view-nutrition.component.html',
  styleUrls: ['./view-nutrition.component.css']
})
export class ViewNutritionComponent implements OnInit {

  p:any = 1;

  id_plan:any = '';

  dataNutrition:any = '';

  listBreakfast:any;
  listNueves:any;
  listLunch:any;
  listOnces:any;
  listDinner:any;

  constructor(
    private service: NutritionService,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.id_plan = this.route.snapshot.paramMap.get('id');
    this.updateData();

    const id_plan = this.id_plan;
    let form = {id_plan};

    this.service.searchNameNutrition(form).subscribe(res => {

      this.dataNutrition = res;

    });

   }

  ngOnInit(): void {
  }

  updateData(){

    const id_plan = this.id_plan;
    let id_tiempo:any = 1;
    let form = {id_plan,id_tiempo};

    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listBreakfast = res;

    });

    id_tiempo = 2;
    form = {id_plan,id_tiempo};
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listNueves = res;

    });

    id_tiempo = 3;
    form = {id_plan,id_tiempo};
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listLunch = res;

    });

    id_tiempo = 4;
    form = {id_plan,id_tiempo};
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listOnces = res;

    });


    id_tiempo = 5;
    form = {id_plan,id_tiempo};
    this.service.selectRegisteredNutrition(form).subscribe(res => {

      this.listDinner = res;

    });



  }








  backToList(){

    const session = localStorage.getItem('session');

    if(session == 'ad_i-dfg9op1_i/'){

      this.router.navigateByUrl('see-nutrition');

    }else if(session == 'nt_i-dfg12op1_i2/'){

      this.router.navigateByUrl('nutrition-general');

    }

  }



    //Botón del paginador ----------------------
    handlePageChange(event:any) {
      this.p = event;
    }
    //..........................................
  
  
}
