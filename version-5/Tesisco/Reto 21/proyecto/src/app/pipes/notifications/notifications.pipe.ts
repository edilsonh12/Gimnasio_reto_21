import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'notifications'
})
export class NotificationsPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results:any = [];

    const contAux = value;

    for(const notification of contAux){
      if(notification.texto.indexOf(arg) > -1){
         results.push(notification);
      }

    };


    return results;

  }

}
