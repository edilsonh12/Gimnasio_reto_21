import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'challenges'
})
export class ChallengesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results:any = [];

    const contAux = value;

    for(const challenges of contAux){
      if(challenges.nombre_reto.indexOf(arg) > -1){
         results.push(challenges);
      }else  if(challenges.fecha.indexOf(arg) > -1){
        results.push(challenges);
     }

    };


    return results;

  }

}
