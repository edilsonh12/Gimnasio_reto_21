import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'routine'
})
export class RoutinePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results:any = [];

    const contAux = value;

    for(const routine of contAux){
      if(routine.nombre_entrenamiento.indexOf(arg) > -1){
         results.push(routine);
      }else if(routine.nombre_entrenamiento.indexOf(arg) > -1){
        results.push(routine);
      }

    };


    return results;

  }

}
