import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'training'
})
export class TrainingPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results:any = [];

    const contAux = value;

    for(const notice of contAux){
      if(notice.nombre_ejercicios.indexOf(arg) > -1){
         results.push(notice);
      }else if(notice.nombre_categoria.indexOf(arg) > -1){
        results.push(notice);
      }else if(notice.nombre_sub.indexOf(arg) > -1){
      results.push(notice);
      }

    };


    return results;

  }

}
