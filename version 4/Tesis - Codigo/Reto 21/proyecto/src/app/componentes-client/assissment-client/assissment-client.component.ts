import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, addMinutes, isThisSecond } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { Subject } from 'rxjs';

import { SistemaService } from 'src/app/servicios/sistema/sistema.service';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import decode from 'jwt-decode';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#62D938',
    secondary: '#71f802'
  }
};

@Component({
  selector: 'app-assissment-client',
  templateUrl: './assissment-client.component.html',
  styleUrls: ['./assissment-client.component.css']
})
export class AssissmentClientComponent implements OnInit {

  img:any;
  content:any;

  documento:any;

  listAssist:any;

  state_temp:any = 'noAsistencia';
  listData:any;
  date_selected:any = '';

  createAssistForm = new FormGroup({
    id_asistencia_usuario: new FormControl('',Validators.required),
    documento_asistencia: new FormControl('',Validators.required),
    temperetura: new FormControl('',Validators.required)
  });


  month = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'];

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;

  events: CalendarEvent[] = [];

  actions: CalendarEventAction[] = [
    {
      label: '',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];


  constructor(
    private system: SistemaService,
    private auth: AuthUsersService
  ) { 

    const token:any = localStorage.getItem('token');
      
    let decodetoken:any = {};
    decodetoken = decode(token);
    const { documento} = decodetoken;
    this.documento = documento;


    this.updateData();

    this.system.getImg().subscribe(res => {

        this.img = res;

    });

  }

  ngOnInit(): void {
  }


  updateData(){

    const documento:any = this.documento;
    let form = {documento};

    this.auth.getHistory(form).subscribe(res => {

      this.events = [];
      this.listAssist = res;

      let fecha_Inicio =  [];
      let hora_Assits = [];
      let min_Assits = [];


      for(let x of this.listAssist){

        fecha_Inicio = x.fecha_asistencia;
        hora_Assits = x.hora_asistencia.substring(0, 2);
        min_Assits = x.hora_asistencia.substring(3,5);
    
            this.events = [
          ...this.events,
          {
            start: addMinutes(addHours(startOfDay(new Date(fecha_Inicio)), hora_Assits), min_Assits),
            title: 'Asistió',
            color: colors.green,
              actions: this.actions,
              resizable: {
                beforeStart: false,
                afterEnd: false,
              },
              draggable: false,
            }

            ]



      }  




    });




  }








  setView(view: CalendarView) {
    this.view = view;
  }




  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;

        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const day = date.getDate();

        let fecha:string | any;

        if(month < 10){

          fecha = year + '-0' + month + '-' + day;

        }else if(month >= 10){

          fecha = year + '-' + month + '-' + day;

        }

        this.date_selected = fecha;

        const fecha_asistencia = fecha;
        const documento = this.documento;
        let form = {documento,fecha_asistencia};
        this.auth.confirmAssist(form).subscribe(res => {
            
            if(res == ''){

              this.state_temp = 'noAsistencia';

            }else{

              this.listData = res;
              this.state_temp = 'asistencia';

            }

        });

      } else {
        this.activeDayIsOpen = true;

        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const day = date.getDate();

        let fecha:string | any;

        if(month < 10){

          fecha = year + '-0' + month + '-' + day;

        }else if(month >= 10){

          fecha = year + '-' + month + '-' + day;

        }

        this.date_selected = fecha;  

        const fecha_asistencia = fecha;
        const documento = this.documento;
        let form = {documento,fecha_asistencia};
        this.auth.confirmAssist(form).subscribe(res => {
            
            if(res == ''){

              this.state_temp = 'noAsistencia';

            }else{

              this.listData = res;
              this.state_temp = 'asistencia';

            }

        });

      }
      this.viewDate = date;
    }
  }



  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    //this.modalData = { event, action };
    //this.modal.open(this.modalContent, { size: 'lg' });
    

  }


  arrayBufferToBase64( buffer:any ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}



  registeredAssist(form:any){
    
      form.id_asistencia_usuario =  Math.floor((Math.random() * (99999999-10000000))+10000000);
      form.documento_asistencia = this.documento;

      if(form.temperetura == ''){

        Swal.fire({
          icon: 'error',
          text: 'Para continuar con el proceso de registro de la asistencia, debe ingresar una temperatura valida'
        });

      }else{

        if(form.temperetura >= 37.6){

          Swal.fire({
            icon: 'error',
            title: 'Peligro Inminente',
            text: 'La temperatura ingresada es catalogada como febril, se le recomienda el no ingreso a la instalación.'
          }).then(response => {

            Swal.fire({
              title: '¿Seguro que desea registrar la asistencia e ingresar a la instalación?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Sí',
              denyButtonText: `No`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {


                this.auth.registeredAssist(form).subscribe(res => {

                  if(res == 'Asistencia registrada con exito'){
    
                    Swal.fire({
                      icon: 'success',
                      title: 'Proceso Completado',
                      text: 'La información se registró con éxito'
                    }).then(response => {
    
                      this.updateData();
                      this.createAssistForm.reset();
    
                    });
    
                  }else{
    
                    Swal.fire({
                      icon: 'error',
                      title: 'Proceso Fallido',
                      text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente'
                    });
    
                  }
    
    
                });
                

                Swal.fire('Saved!', '', 'success')
              } else if (result.isDenied) {
                Swal.fire('La asistencia no se registró', '', 'info')
              }
            })


          });


        }else if(form.temperetura >= 33 && form.temperetura <= 37.5){

            this.auth.registeredAssist(form).subscribe(res => {

              if(res == 'Asistencia registrada con exito'){

                Swal.fire({
                  icon: 'success',
                  title: 'Proceso Completado',
                  text: 'La información se registró con éxito'
                }).then(response => {

                  this.updateData();
                  this.createAssistForm.reset();

                });

              }else{

                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente'
                });

              }


            });


        }


      }

  }




}
