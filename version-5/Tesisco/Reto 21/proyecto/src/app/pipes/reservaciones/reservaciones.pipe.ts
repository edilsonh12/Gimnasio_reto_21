import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reservaciones'
})
export class ReservacionesPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const results:any = [];

    const contAux = value;          

    for(const reservation of contAux){
      if(reservation.fecha.indexOf(arg) > -1){
         results.push(reservation);
      }else if(reservation.nombre_reservacion.indexOf(arg) > -1){
        results.push(reservation);
      }else if(reservation.tipo_de_estado.indexOf(arg) > -1){
        results.push(reservation);
      }

    };


    return results;

  }

}
