import { Component, OnInit } from '@angular/core';

import { AssessmentService } from 'src/app/servicios/assessment/assessment.service';

import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';  

import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, addMinutes, isThisSecond } from 'date-fns';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { Subject } from 'rxjs';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SistemaService } from 'src/app/servicios/sistema/sistema.service';
import { EmailService } from 'src/app/servicios/email/email.service';
import { AuthUsersService } from 'src/app/servicios/users/auth-users.service';
import { NotificationService } from 'src/app/servicios/notification/notification.service';

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
  selector: 'app-citas-recepcion',
  templateUrl: './citas-recepcion.component.html',
  styleUrls: ['./citas-recepcion.component.css']
})
export class CitasRecepcionComponent implements OnInit {

  filtro:any = '';
  filtro_reservacion:any = '';
  p:any = 0;

  today: Date = new Date();
  pipe = new DatePipe('en-US');

  dateQuotes:any;

  fecha_min:any = '';

  listData:any;
  listTypeQuote:any;
  listUser:any;
  listTime:any;
  listState:any;

  oneQuote:any;

  documento:any;
  fecha:any;
  
  id_reservacion:any = '';

  fecha_temp:any = '';

  content:any;
  img:any;

  content_temp:any;

  state_temp:any = '';
  hora_temp:any = '';

  formUpdateQuote = new FormGroup({
    id_reservacion_usuario: new FormControl(0,Validators.required),
    documento_reservacion: new FormControl('',Validators.required),
    fecha: new FormControl('',Validators.required),
    state: new FormControl(2,Validators.required),
    hora: new FormControl(0,Validators.required)
  });

  formAssingQuote = new FormGroup({
    id_reservacion_usuario: new FormControl(0,Validators.required),
    documento_reservacion: new FormControl('',Validators.required),
    fecha: new FormControl('',Validators.required),
    hora: new FormControl(0,Validators.required)
  });



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
    private assessment: AssessmentService,
    private system: SistemaService,
    private email: EmailService,
    private auth: AuthUsersService,
    private notification:NotificationService
  ) { 

    this.system.getImg().subscribe(res => {

      this.content = res;
      for(let x of this.content){
        this.img = this.arrayBufferToBase64(x.logo.data);
      }

    });

    this.fecha_min = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

    this.updateData();
    this.updateContent();
    this.updateContentUsers();

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

  ngOnInit(): void {
  }

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


  updateContent(){

    this.assessment.selectTypeQuote().subscribe(res => {

        this.listTypeQuote = res;

    });

    this.assessment.selectAllState().subscribe(res => {

      this.listState = res;

    });

  }

  updateContentUsers(){

    this.assessment.selectUserQuotes().subscribe(res => {

      this.listUser = res;

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

        let form = {fecha};
        this.assessment.selectViewQuotes(form).subscribe(res => {

          this.dateQuotes = res;

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
        this.assessment.selectViewQuotes(form).subscribe(res => {

          this.dateQuotes = res;

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


  assingDateUser(documento:any,id_reservacion:any){

      this.documento = documento;
      this.id_reservacion = id_reservacion;
  }

  selectDate($event:any){

    const fecha = $event.target.value;
    let fecha_now:any = this.pipe.transform(Date.now(), 'yyyy-MM-dd');

    if(fecha == fecha_now){

      Swal.fire({
        icon: 'info',
        text: 'No es posible agendar la cita para el mismo día.'
      });

    }else{

      let form = {fecha};
    
      this.assessment.selectTimeQuote(form).subscribe(res => {
        
        if(res == 'No hay lugar en la agenda para la cita'){
  
          Swal.fire({
            icon: 'info',
            text: 'En la fecha seleccionada no se encuentra espacio horario disponible para la asignación de la cita.'
          });
  
        }else{
  
          this.listTime = res;
  
        }
  
  
      });


    }

  }



  assingQuote(form:any){
 
    if(form.id_reservacion_usuario == 0 || form.hora == 0 || form.fecha == '' ){

      Swal.fire({
        icon: 'error',
        text: 'Para asignar una cita de valoración debe llenar el formulario solicitado, intente nuevamente.'
      })

    }else{

      form.documento_reservacion = this.documento;
      this.assessment.assingQuote(form).subscribe(res => {

          if(res == 'Cita agendada con exito'){

              const id_noti_us:any = 35;
              const documento_usu:any = this.documento;

              let form1 = {id_noti_us,documento_usu};
              this.assessment.createNotificationQuote(form1).subscribe(res => {

                if(res == 'Notificación creada con exito'){

                  Swal.fire({
                    icon: 'success',
                    title: 'Proceso Completado',
                    text: 'La cita se asignó con éxito.'
                  }).then(response => {
                    this.updateData();
                    this.updateContentUsers();

                    const documento = documento_usu;
                    const hora = form.hora;
                    const fecha = form.fecha;
                    const id_reservacion = form.id_reservacion_usuario

                    let form3 = {documento};
                    let correo:any = '';
                    this.auth.searchEmailUser(form3).subscribe(res => {

                      this.content_temp = res;
                      for(let x of this.content_temp){
                         correo = x.correo;
                      }

                        let form4 = {correo,id_reservacion,hora,fecha};
                        this.email.sendEmailAssingQuote(form4).subscribe(res => {
    
                          if(res == 'Correo enviado'){
    
                            Swal.fire({
                              icon: 'success',
                              text: 'Se envió un correo notificando los datos de la cita'
                            })
    
                          }else{
    
                            Swal.fire({
                              icon: 'error',
                              title: 'Proceso Fallido',
                              text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
                            })
    
                          }
    
                        });



                    });



                  });

                }else{

                  Swal.fire({
                    icon: 'error',
                    title: 'Proceso Fallido',
                    text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente'
                  });

                }

              });


          }else{

            Swal.fire({
              icon: 'error',
              title: 'Proceso Fallido',
              text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
            })

          }

      });

    }



  }


  formatDateAndTime(fecha:any,hora:any){
      let resultado:any = '';
      resultado = fecha.substring(0,10) + ' - ' + hora.substring(0,5);

      return resultado;
  }


  searchOneQuote(documento:any, fecha:any){

    this.documento = documento;
    this.fecha = fecha;
    let form = {documento,fecha};

    this.assessment.selectOneQuotes(form).subscribe(res => {
 
      this.oneQuote = res;
      for(let x of this.oneQuote){
        this.fecha_temp = x.fecha.substring(0,10);
        this.state_temp = x.state;
        this.hora_temp = x.hora;
      }
      
        const documento_reservacion = documento;
        const state = 6;
        let form2 = {documento_reservacion, state};
    
        this.assessment.updateStateTemp(form2).subscribe(res => {
    
            if(res == 'Estado actualizado con exito'){
    
                let form1 = {fecha}
                this.assessment.selectAllTimeConfirm(form1).subscribe(res => {

                  this.listTime = res;

                });

            }else{
    
              Swal.fire({
                icon: 'error',
                title: 'Proceso Fallido',
                text: 'Actualmente no es posible realizar la petición solicitada, intente nueveamente'
              })

            }
    
        });


  
      

    });

    





  }




  updateQuote(form:any){
    form.documento_reservacion = this.documento;
    console.log(form);
    if(form.id_reservacion_usuario == 0 || form.hora == 0 || form.fecha == '' || form.state == 0 ){

      Swal.fire({
        icon: 'error',
        text: 'Para asignar una cita de valoración debe llenar el formulario solicitado, intente nuevamente.'
      });

    }else{

          
          this.assessment.updateQuoteAssing(form).subscribe(res => {
    
              if(res == 'La información se actualíz con exito'){
    
                  const id_noti_us:any = 36;
                  const documento_usu:any = this.documento;
    
                        this.updateData();
                        this.updateContentUsers();

                        const documento = documento_usu;
                        let form3 = {documento};
                        let correo:any = '';
                        this.auth.searchEmailUser(form3).subscribe(res => {

                          this.content_temp = res;
                          for(let x of this.content_temp){
                              correo = x.correo;
                          }

                          const hora = form.hora;
                          const fecha = form.fecha;
                          const id_reservacion = form.id_reservacion_usuario
                          let form4 = {correo,id_reservacion,hora,fecha};
                          this.email.sendEmailAssingQuote(form4).subscribe(res => {
      
                            if(res == 'Correo enviado'){
      
                              Swal.fire({
                                icon: 'success',
                                text: 'Se envió un correo notificando la actualización de la cita.'
                              }).then(response => {

                                const documento_usu:any = documento;
                                const id_noti_us:any = 36;
                                let form5 = {id_noti_us,documento_usu};
                                this.notification.sendOneNotification(form5).subscribe(res => {
                                  if(res == 'Notificacion enviada con exito'){
                                    console.log('Todo bien');
                                  }else{
                                    console.log('Todo mal');
                                  }
                                });

                              });
      
                            }else{
      
                              Swal.fire({
                                icon: 'error',
                                title: 'Proceso Fallido',
                                text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente.'
                              })
      
                            }
      
                          });

                          

                        });


                  
    

    
    
              }else{
    
                Swal.fire({
                  icon: 'error',
                  title: 'Proceso Fallido',
                  text: 'Actualmente no es posible realizar la petición solicitada, intente nuevamente'
                })
    
              }
    
          });
  


      }


  }

  
  backToList(documento:any){

    const documento_reservacion = documento;
    const state = this.state_temp;
    let form2 = {documento_reservacion, state};

    this.assessment.updateStateTemp(form2).subscribe(res => {

        if(res == 'Estado actualizado con exito'){
          this.updateContentUsers();
          this.updateData();
          this.oneQuote = null;
          this.listTime = null;
          this.hora_temp = null;
          
        }

    });

  }

  closePage(){

    const documento_reservacion = this.documento;
    const state = 2;
    let form2 = {documento_reservacion, state};

    this.assessment.updateStateTemp(form2).subscribe(res => {

        if(res == 'Estado actualizado con exito'){
          this.updateContentUsers();
          this.updateData();
          this.oneQuote = null;
          this.listTime = null;
          this.hora_temp = null;

        }

    });

  }










      //Botón del paginador -----------------------------------
      handlePageChange(event:any) {
        this.p = event;
      }
      //-------------------------------------------------------
  

}
