import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clientes'
})
export class ClientesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results:any = [];

    const contAux = value;

    for(const client of contAux){
      if(client.nombres.indexOf(arg) > -1){
         results.push(client);
      }else if(client.primer_apellido.indexOf(arg) > -1){
        results.push(client);
      }else if(client.segundo_apellido.indexOf(arg) > -1){
        results.push(client);
      }else if(client.documento.indexOf(arg) > -1){
        results.push(client);
      }

    };


    return results;

  }

}
