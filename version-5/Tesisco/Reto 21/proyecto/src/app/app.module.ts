import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { TokenInterceptionService } from './servicios/token/token-interception.service';




//Instanciar el paginador
import {NgxPaginationModule} from 'ngx-pagination';
import { FiltresPipe } from './pipes/filtros/filtres.pipe';


//Calendario
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AssistsUsersComponent } from './componentes/assists-users/assists-users.component';
import { ClientesPipe } from './pipes/filtros/clientes/clientes.pipe';
import { SistemaComponent } from './componentes/sistema/sistema.component';
import { PlanesComponent } from './componentes/planes/planes.component';


import {GoogleMapsModule} from '@angular/google-maps';
import { ViewNoticeComponent } from './componentes/view-notice/view-notice.component';
import { NoticeComponent } from './componentes/notice/notice.component';
import { NoticePipe } from './pipes/notice/notice.pipe';
import { ListNoticesComponent } from './componentes/list-notices/list-notices.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { TrainingComponent } from './componentes/training/training.component';
import { TrainingPipe } from './pipes/training/training.pipe';


import {YouTubePlayerModule} from "@tgillespie/ngx-youtube-player";
import { RoutinesComponent } from './componentes/routines/routines.component';
import { RoutinesPersonalComponent } from './componentes/routines-personal/routines-personal.component';
import { RecordRoutineComponent } from './componentes/record-routine/record-routine.component';
import { AssignPipe } from './pipes/assign/assign.pipe';
import { RoutinesPipe } from './pipes/routines/routines.pipe';
import { RoutinePipe } from './pipes/routine/routine.pipe';
import { AssessmentComponent } from './componentes/assessment/assessment.component';
import { AssessmentBasicComponent } from './componentes/assessment-basic/assessment-basic.component';
import { AssessmentAdvancedComponent } from './componentes/assessment-advanced/assessment-advanced.component';
import { AssessmentBasicUpdateComponent } from './componentes/assessment-basic-update/assessment-basic-update.component';
import { AssessmentAdvancedUpdateComponent } from './componentes/assessment-advanced-update/assessment-advanced-update.component';
import { AssessmentBasicCreateNewComponent } from './componentes/assessment-basic-create-new/assessment-basic-create-new.component';
import { AssessmentAdvancedCreateNewComponent } from './componentes/assessment-advanced-create-new/assessment-advanced-create-new.component';
import { DashboardBasicComponent } from './componentes/dashboard-basic/dashboard-basic.component';


import { ChartsModule } from '@rinminase/ng-charts';
import { DashboardAdvancedComponent } from './componentes/dashboard-advanced/dashboard-advanced.component';
import { SeeQuotesComponent } from './componentes/see-quotes/see-quotes.component';
import { QuotesPipe } from './pipes/quotes/quotes.pipe';
import { SeeNutritionComponent } from './componentes/see-nutrition/see-nutrition.component';
import { NutritionClientComponent } from './componentes/nutrition-client/nutrition-client.component';
import { ViewNutritionComponent } from './componentes/view-nutrition/view-nutrition.component';
import { ChallengesComponent } from './componentes/challenges/challenges.component';
import { ChallengesRoutineComponent } from './componentes/challenges-routine/challenges-routine.component';
import { ChallengesPipe } from './pipes/challenges/challenges.pipe';
import { MenuNutricionComponent } from './vistas/menu-nutricion/menu-nutricion.component';
import { VerValoracionesComponent } from './componentes-nutricion/ver-valoraciones/ver-valoraciones.component';
import { NutritionGeneralComponent } from './componentes-nutricion/nutrition-general/nutrition-general.component';
import { NutritionPipe } from './pipes/nutrition/nutrition.pipe';
import { FeedingClientComponent } from './componentes-nutricion/feeding-client/feeding-client.component';
import { CreateNutritionComponent } from './componentes-nutricion/create-nutrition/create-nutrition.component';
import { CreateNutritionPersonalComponent } from './componentes-nutricion/create-nutrition-personal/create-nutrition-personal.component';
import { NutritionGeneralUpdateComponent } from './componentes-nutricion/nutrition-general-update/nutrition-general-update.component';
import { NutritionPersonalUpdateComponent } from './componentes-nutricion/nutrition-personal-update/nutrition-personal-update.component';
import { ViewNutritionPersonalComponent } from './componentes-nutricion/view-nutrition-personal/view-nutrition-personal.component';
import { MenuEntrenadorComponent } from './vistas/menu-entrenador/menu-entrenador.component';
import { ValoracionEntrenadorComponent } from './componentes-entrenador/valoracion-entrenador/valoracion-entrenador.component';
import { MenuClienteComponent } from './vistas/menu-cliente/menu-cliente.component';
import { ReservacionesPipe } from './pipes/reservaciones/reservaciones.pipe';
import { AssissmentClientComponent } from './componentes-client/assissment-client/assissment-client.component';





import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxToastNotifierModule } from 'ngx-toast-notifier';
import { PollComponent } from './componentes-client/poll/poll.component';
import { MenuRecepcionComponent } from './vistas/menu-recepcion/menu-recepcion.component';
import { UsuariosRecepcionComponent } from './componentes-recepcion/usuarios-recepcion/usuarios-recepcion.component';
import { CitasRecepcionComponent } from './componentes-recepcion/citas-recepcion/citas-recepcion.component';
import { NotificacionesComponent } from './componentes-recepcion/notificaciones/notificaciones.component';
import { NotificationsPipe } from './pipes/notifications/notifications.pipe';
import { DocumentosPersonalComponent } from './componentes-entrenador/documentos-personal/documentos-personal.component';
import { PollRecepcionComponent } from './componentes-recepcion/poll-recepcion/poll-recepcion.component';
import { ResetPasswordComponent } from './componentes-recepcion/reset-password/reset-password.component';
import { RecordRoutinePersonalComponent } from './componentes/record-routine-personal/record-routine-personal.component';
import { InicioLogComponent } from './componentes/inicio-log/inicio-log.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    FiltresPipe,
    AssistsUsersComponent,
    ClientesPipe,
    SistemaComponent,
    PlanesComponent,
    ViewNoticeComponent,
    NoticeComponent,
    NoticePipe,
    ListNoticesComponent,
    PerfilComponent,
    TrainingComponent,
    TrainingPipe,
    RoutinesComponent,
    RoutinesPersonalComponent,
    RecordRoutineComponent,
    AssignPipe,
    RoutinesPipe,
    RoutinePipe,
    AssessmentComponent,
    AssessmentBasicComponent,
    AssessmentAdvancedComponent,
    AssessmentBasicUpdateComponent,
    AssessmentAdvancedUpdateComponent,
    AssessmentBasicCreateNewComponent,
    AssessmentAdvancedCreateNewComponent,
    DashboardBasicComponent,
    DashboardAdvancedComponent,
    SeeQuotesComponent,
    QuotesPipe,
    SeeNutritionComponent,
    NutritionClientComponent,
    ViewNutritionComponent,
    ChallengesComponent,
    ChallengesRoutineComponent,
    ChallengesPipe,
    MenuNutricionComponent,
    VerValoracionesComponent,
    NutritionGeneralComponent,
    NutritionPipe,
    FeedingClientComponent,
    CreateNutritionComponent,
    CreateNutritionPersonalComponent,
    NutritionGeneralUpdateComponent,
    NutritionPersonalUpdateComponent,
    ViewNutritionPersonalComponent,
    MenuEntrenadorComponent,
    ValoracionEntrenadorComponent,
    MenuClienteComponent,
    ReservacionesPipe,
    AssissmentClientComponent,
    PollComponent,
    MenuRecepcionComponent,
    UsuariosRecepcionComponent,
    CitasRecepcionComponent,
    NotificacionesComponent,
    NotificationsPipe,
    DocumentosPersonalComponent,
    PollRecepcionComponent,
    ResetPasswordComponent,
    RecordRoutinePersonalComponent,
    InicioLogComponent,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GoogleMapsModule,

    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    YouTubePlayerModule.forRoot(),
    ChartsModule,


    BrowserAnimationsModule,
    NgxToastNotifierModule.forRoot({
      timeOut: 9000,
      bgColors: {
        info: '#ffd733',
       },
    }),
    NgxPaginationModule,
    
  ],
  providers: [
    //JWT
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    JwtHelperService,

    //TokenInterceptors
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptionService, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
