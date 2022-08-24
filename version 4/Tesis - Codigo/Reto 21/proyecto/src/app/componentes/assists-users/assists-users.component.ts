import { Component, OnInit } from '@angular/core';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';

import Swal from 'sweetalert2';

import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, addMinutes, isThisSecond } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { Subject } from 'rxjs';


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
  selector: 'app-assists-users',
  templateUrl: './assists-users.component.html',
  styleUrls: ['./assists-users.component.css']
})
export class AssistsUsersComponent implements OnInit {

  p: number = 1;

  filtro:any = '';

  documento:string = '';
  listAssist:any;
  listMean:any;
  oneUser:any;
  meanOneMonth:any;
  listDays:any;
  listClient:any;

  Month:any = '';

  month = [
    '01Enero',
    '02Febrero',
    '03Marzo',
    '04Abril',
    '05Mayo',
    '06Junio',
    '07Julio',
    '08Agosto',
    '09Septiembre',
    '10Octubre',
    '11Noviembre',
    '12Diciembre'];

  viewDate: Date = new Date();
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;

  events: CalendarEvent[] = [];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
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
    private service : AuthUsersService
  ) {

    this.service.getClient().subscribe(res => {
      this.listClient = res;
    });

  }

  ngOnInit(): void {
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  //---------------------------------------------------------------------------------------------------------

  searchUser(documento:string){

    this.documento = documento;

    let form = {};
    form = {documento};
    this.service.getHistory(form).subscribe(res => {

      this.events = [];

      this.listAssist = res;

      let fechaInicio =  [];
      let horaAssits = [];
      let minAssits = [];


      for(let x of this.listAssist){

        fechaInicio = x.fecha_asistencia;
        horaAssits = x.hora_asistencia.substring(0, 2);
        minAssits = x.hora_asistencia.substring(3,5);

        this.events = [
          ...this.events,
          {
            start: addMinutes(addHours(startOfDay(new Date(fechaInicio)), horaAssits), minAssits),
            title: 'Asistió',
            color: colors.green,
              actions: this.actions,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
              draggable: true,
            }

            ]

      }

    });


    this.service.getMean(form).subscribe(res => {
      this.listMean = res;
    });

    this.service.getOneUser(form).subscribe(res => {
      this.oneUser = res;
    });




  }

  selectMonth(Month:any){
      const mes = Month.substring(0,2);

      const documento = this.documento;

      let form = {};
      form = {documento,mes};

      this.service.getMeanOneMonth(form).subscribe(res => {
          this.meanOneMonth = res;
      });

      this.service.getDays(form).subscribe(res => {
        this.listDays = res;
      });


  }


  documentAsing(document:string){
    this.documento = document;
    console.log(this.documento);
  }


  //Paginador------------------------------------------------

  handlePageChange(event:any) {
    this.p = event;
  }

  //--------------------------------------------------------


  //-------------------------------------------------------------------------------------------------------------

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
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







}
