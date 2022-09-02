import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assign'
})
export class AssignPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results:any = [];

    const contAux = value;

    for(const training of contAux){
      if(training.nombre.indexOf(arg) > -1){
         results.push(training);
      }else if(training.categoria.indexOf(arg) > -1){
        results.push(training);
      }else if(training.sub_categoria.indexOf(arg) > -1){
      results.push(training);
      }

    };


    return results;

  }

}
