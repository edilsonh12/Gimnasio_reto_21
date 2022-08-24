import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nutrition'
})
export class NutritionPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results:any = [];

    const contAux = value;

    for(const plan of contAux){
      if(plan.nombre_plan.indexOf(arg) > -1){
         results.push(plan);
      }else if(plan.nombre_tipo_nutri.indexOf(arg) > -1){
        results.push(plan);
     }

    };


    return results;

  }

}
