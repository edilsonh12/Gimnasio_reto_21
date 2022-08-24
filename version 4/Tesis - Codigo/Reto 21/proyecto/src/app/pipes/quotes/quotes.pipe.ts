import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quotes'
})
export class QuotesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results:any = [];

    const contAux = value;

    for(const user of contAux){
      if(user.documento_reservacion.indexOf(arg) > -1){
         results.push(user);
      }else if(user.nombres.indexOf(arg) > -1){
        results.push(user);
      }else if(user.primer_apellido.indexOf(arg) > -1){
        results.push(user);
      }else if(user.segundo_apellido.indexOf(arg) > -1){
        results.push(user);
      }

    };


    return results;

  }

}
