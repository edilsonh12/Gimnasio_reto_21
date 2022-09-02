import { Component, OnInit } from '@angular/core';

import { AssessmentService } from 'src/app/servicios/assessment/assessment.service';
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
  selector: 'app-see-quotes',
  templateUrl: './see-quotes.component.html',
  styleUrls: ['./see-quotes.component.css']
})
export class SeeQuotesComponent implements OnInit {

  p: number = 1;

  filtro:any = '';

  documento:string = '';
  meanOneMonth:any;
  listDays:any;

  listQuotes:any;

  listData:any;

  Month:any = '';
  fecha_agendada:any = '';
  oneQuote:any;

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
        console.log(event);
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
    private assessment : AssessmentService
  ) {

    this.updateData();

  }

  ngOnInit(): void {
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  //---------------------------------------------------------------------------------------------------------

  updateData(){

    this.assessment.selectQuotes().subscribe(res => {

      this.events = [];

      this.listData = res;

      let fechaInicio =  [];
      let hour_quote = [];
      let minute_quote = [];
      let tittle:string|any = [];

      let color:string|any = [];

      for(let x of this.listData){

        fechaInicio = x.fecha;
        hour_quote = x.horas.substring(0,2);
        minute_quote = x.horas.substring(3,5);
        
        tittle = x.nombre_reservacion + ' para ' + x.nombres + ' ' + x.primer_apellido + ' ' + x.segundo_apellido;

        if(x.tipo_de_estado == 'Pendiente'){
          color = colors.blue;
        }else if(x.tipo_de_estado == 'Asignada'){
          color = colors.yellow;
        }else if(x.tipo_de_estado == 'Finalizada'){
          color = colors.green;
        }else if(x.tipo_de_estado == 'Cancelada'){
          color = colors.red;
        }else if(x.tipo_de_estado == 'Inasistencia'){
          color = colors.red;
        }

        this.events = [
          ...this.events,
          {
            start: addMinutes(addHours(startOfDay(new Date(fechaInicio)), hour_quote), minute_quote),
            title: tittle,
            color: color,
              actions: this.actions,
              resizable: {
                beforeStart: true,
                afterEnd: true,
              },
              draggable: false,
            }

            ]

      }

    });

  }

  selectMonth(Month:any){
      const mes = Month.substring(0,2);

      const documento = this.documento;

      let form = {};

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


        const month = date.getMonth()+1;
        const year = date.getFullYear();
        const day = date.getDate();

        let fecha:string | any;

        if(month < 10){

          fecha = year + '-0' + month + '-' + day;

        }else if(month >= 10){

          fecha = year + '-' + month + '-' + day;

        }

        let form = {fecha};
        this.fecha_agendada = fecha;
        
        this.assessment.selectViewQuotes(form).subscribe(res => {

          this.listQuotes = res;

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

        let form = {fecha};
        this.fecha_agendada = fecha;
      
        this.assessment.selectViewQuotes(form).subscribe(res => {

          this.listQuotes = res;

        });


      }
      this.viewDate = date;
    }
  }

  uploadDataOneQuote(documento:any){

    const fecha = this.fecha_agendada;
    let form = {documento,fecha};

    this.assessment.selectOneQuotes(form).subscribe(res => {

      this.oneQuote = res;

    });

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
