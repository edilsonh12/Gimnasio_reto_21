import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notice'
})
export class NoticePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results:any = [];

    const contAux = value;

    for(const notice of contAux){
      if(notice.titulo.indexOf(arg) > -1){
         results.push(notice);
      }else if(notice.nombres.indexOf(arg) > -1){
        results.push(notice);
      }else if(notice.primer_apellido.indexOf(arg) > -1){
        results.push(notice);
      }else if(notice.segundo_apellido.indexOf(arg) > -1){
        results.push(notice);
      }else if(notice.fecha_informacion.indexOf(arg) > -1){
        results.push(notice);
      }

    };


    return results;

  }

}
