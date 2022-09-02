import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Importanto los componentes----------------------------------------------------
import { InicioComponent } from './componentes/inicio/inicio.component';
import { MenuComponent } from './vistas/menu/menu.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { MenuAdminComponent } from  './vistas/menu-admin/menu-admin.component';
import { AssistsUsersComponent } from './componentes/assists-users/assists-users.component';
import { SistemaComponent } from './componentes/sistema/sistema.component';
import { PlanesComponent } from './componentes/planes/planes.component';
import { ViewNoticeComponent } from './componentes/view-notice/view-notice.component';
import { NoticeComponent } from './componentes/notice/notice.component';
import { ListNoticesComponent } from './componentes/list-notices/list-notices.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { TrainingComponent } from './componentes/training/training.component';
import { RoutinesComponent } from './componentes/routines/routines.component';
import { RoutinesPersonalComponent } from './componentes/routines-personal/routines-personal.component';
import { RecordRoutineComponent } from './componentes/record-routine/record-routine.component';
import { RecordRoutinePersonalComponent } from './componentes/record-routine-personal/record-routine-personal.component';

import { AssessmentComponent } from './componentes/assessment/assessment.component';
import { AssessmentBasicComponent } from './componentes/assessment-basic/assessment-basic.component';
import { AssessmentAdvancedComponent } from './componentes/assessment-advanced/assessment-advanced.component';
import { AssessmentBasicUpdateComponent } from './componentes/assessment-basic-update/assessment-basic-update.component';
import { AssessmentAdvancedUpdateComponent } from './componentes/assessment-advanced-update/assessment-advanced-update.component';
import { AssessmentBasicCreateNewComponent } from './componentes/assessment-basic-create-new/assessment-basic-create-new.component';
import { AssessmentAdvancedCreateNewComponent } from './componentes/assessment-advanced-create-new/assessment-advanced-create-new.component';
import { DashboardBasicComponent } from './componentes/dashboard-basic/dashboard-basic.component';
import { DashboardAdvancedComponent } from './componentes/dashboard-advanced/dashboard-advanced.component';
import { SeeQuotesComponent } from './componentes/see-quotes/see-quotes.component';
import { SeeNutritionComponent } from './componentes/see-nutrition/see-nutrition.component';
import { NutritionClientComponent } from './componentes/nutrition-client/nutrition-client.component';
import { ViewNutritionComponent } from './componentes/view-nutrition/view-nutrition.component';
import { ChallengesComponent } from './componentes/challenges/challenges.component';
import { ChallengesRoutineComponent } from './componentes/challenges-routine/challenges-routine.component';


import { InicioLogComponent } from './componentes/inicio-log/inicio-log.component';


//Importar componentes de nutricion---------------------------------
import { MenuNutricionComponent } from './vistas/menu-nutricion/menu-nutricion.component';
import { VerValoracionesComponent } from './componentes-nutricion/ver-valoraciones/ver-valoraciones.component'; 
import { NutritionGeneralComponent } from './componentes-nutricion/nutrition-general/nutrition-general.component';
import { FeedingClientComponent } from './componentes-nutricion/feeding-client/feeding-client.component';
import { CreateNutritionComponent } from './componentes-nutricion/create-nutrition/create-nutrition.component';
import { CreateNutritionPersonalComponent } from './componentes-nutricion/create-nutrition-personal/create-nutrition-personal.component';
import { NutritionGeneralUpdateComponent } from './componentes-nutricion/nutrition-general-update/nutrition-general-update.component';
import { NutritionPersonalUpdateComponent } from './componentes-nutricion/nutrition-personal-update/nutrition-personal-update.component';
import { ViewNutritionPersonalComponent } from './componentes-nutricion/view-nutrition-personal/view-nutrition-personal.component';




//Importar componentes del entrenador----------------------------------------------------
import { MenuEntrenadorComponent } from './vistas/menu-entrenador/menu-entrenador.component';
import { ValoracionEntrenadorComponent } from './componentes-entrenador/valoracion-entrenador/valoracion-entrenador.component';
import { DocumentosPersonalComponent } from './componentes-entrenador/documentos-personal/documentos-personal.component';


//importar componentes del cliente-----------------------------------------------------------
import { MenuClienteComponent } from './vistas/menu-cliente/menu-cliente.component';
import { AssissmentClientComponent } from './componentes-client/assissment-client/assissment-client.component';
import { PollComponent } from './componentes-client/poll/poll.component';

//importar componentes para recepción--------------------------------------------------------
import { MenuRecepcionComponent } from './vistas/menu-recepcion/menu-recepcion.component';
import { UsuariosRecepcionComponent } from './componentes-recepcion/usuarios-recepcion/usuarios-recepcion.component';
import { CitasRecepcionComponent } from './componentes-recepcion/citas-recepcion/citas-recepcion.component';
import { NotificacionesComponent } from './componentes-recepcion/notificaciones/notificaciones.component';
import { PollRecepcionComponent } from './componentes-recepcion/poll-recepcion/poll-recepcion.component';


import { ResetPasswordComponent } from './componentes-recepcion/reset-password/reset-password.component';

//Improtando los guardas
import { RutasGuard } from './guards/rutas/rutas.guard';
import { RoleGuard } from './guards/role/role.guard';

const routes: Routes = [

  //Rutas para el administrador-------------------------------------
  {path: '',  pathMatch: 'full', redirectTo: 'inicio' },
  {path: 'inicio', component: InicioComponent },
  {path: 'menu-admin', component: MenuAdminComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Administrador' }  },
  {path: 'menu', component: MenuComponent },
  {path: 'usuarios', component: UsuariosComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Administrador' } },
  {path: 'assists', component: AssistsUsersComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Administrador' } },
  {path: 'sistema', component: SistemaComponent, canActivate: [RutasGuard] },
  {path: 'planes', component: PlanesComponent, canActivate: [RutasGuard]},
  {path: 'view-notice/:id', component: ViewNoticeComponent },
  {path: 'notice', component: NoticeComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Administrador' }},
  {path: 'list-notices', component: ListNoticesComponent},
  {path: 'training', component: TrainingComponent, canActivate: [RutasGuard]},
  {path: 'routines', component: RoutinesComponent, canActivate: [RutasGuard]},
  {path: 'routines-personal', component: RoutinesPersonalComponent, canActivate: [RutasGuard]},
  {path: 'record-routine/:id', component: RecordRoutineComponent, canActivate: [RutasGuard]},
  {path: 'record-routine-personal/:id', component: RecordRoutinePersonalComponent, canActivate: [RutasGuard]},
  
  

  {path: 'assessment', component: AssessmentComponent, canActivate: [RutasGuard]},
  {path: 'assessment-basic/:id', component: AssessmentBasicComponent, canActivate: [RutasGuard] },
  {path: 'assessment-advanced/:id', component: AssessmentAdvancedComponent, canActivate: [RutasGuard]},
  {path: 'assessment-basic-update/:id', component: AssessmentBasicUpdateComponent, canActivate: [RutasGuard]},
  {path: 'assessment-advanced-update/:id', component: AssessmentAdvancedUpdateComponent, canActivate: [RutasGuard]},
  {path: 'assessment-basic-create-new/:id', component: AssessmentBasicCreateNewComponent, canActivate: [RutasGuard]},
  {path: 'assessment-advanced-create-new/:id', component: AssessmentAdvancedCreateNewComponent, canActivate: [RutasGuard]},
  {path: 'dashboard-basic', component: DashboardBasicComponent, canActivate: [RutasGuard]},
  {path: 'dashboard-advanced', component: DashboardAdvancedComponent, canActivate: [RutasGuard]},




  {path: 'see-quotes', component: SeeQuotesComponent, canActivate: [RutasGuard]},
  {path: 'see-nutrition', component: SeeNutritionComponent, canActivate: [RutasGuard]},
  {path: 'nutrition-client', component: NutritionClientComponent, canActivate: [RutasGuard]},
  {path: 'view-nutrition/:id', component: ViewNutritionComponent, canActivate: [RutasGuard]},
  {path: 'challenges', component: ChallengesComponent, canActivate: [RutasGuard]},
  {path: 'challenges-routines/:id', component: ChallengesRoutineComponent, canActivate: [RutasGuard]},

  {path: 'perfil', component: PerfilComponent, canActivate: [RutasGuard]},

  {path: 'inicio-log', component: InicioLogComponent, canActivate: [RutasGuard]},

  //Rutas para el Nutricion----------------------------------------
  {path: 'menu-nutricion', component: MenuNutricionComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Nutricionista' } },
  {path: 'ver-valoracion', component: VerValoracionesComponent, canActivate: [RutasGuard]},
  {path: 'nutrition-general', component: NutritionGeneralComponent, canActivate: [RutasGuard]},
  {path: 'feeding-client', component: FeedingClientComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Nutricionista' }},
  {path: 'create-nutrition/:id', component: CreateNutritionComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Nutricionista' }},
  {path: 'create-nutrition-personal/:id', component: CreateNutritionPersonalComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Nutricionista' }},
  {path: 'nutrition-general-update/:id', component: NutritionGeneralUpdateComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Nutricionista' }},
  {path: 'nutrition-personal-update/:id', component: NutritionPersonalUpdateComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Nutricionista' }},
  {path: 'view-nutrition-personal/:id', component: ViewNutritionPersonalComponent, canActivate: [RutasGuard]},


  //Rutas para Entrenador--------------------------------------------
  {path: 'menu-entrenador', component: MenuEntrenadorComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Entrenador' } },
  {path: 'valoraciones-entrenador', component: ValoracionEntrenadorComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Entrenador' }},
  {path: 'documentos-personal', component: DocumentosPersonalComponent, canActivate: [RutasGuard]},


  //Rutas para recepción--------------------------------------------
  {path: 'menu-recepcion', component: MenuRecepcionComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Recepción' } },
  {path: 'usuarios-recepcion', component: UsuariosRecepcionComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Recepción' } },
  {path: 'citas-recepcion', component: CitasRecepcionComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Recepción' } },
  {path: 'notificaciones', component: NotificacionesComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Recepción' } },
  {path: 'poll-recepcion', component: PollRecepcionComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Recepción' } },



  {path: 'reset-password', component: ResetPasswordComponent},

  //Rutas para el cliente-------------------------------------------
  {path: 'menu-cliente', component: MenuClienteComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Cliente' } },
  {path: 'assissment-client', component: AssissmentClientComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Cliente' } },
  {path: 'poll', component: PollComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Cliente' } }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InicioComponent,MenuComponent,UsuariosComponent,MenuAdminComponent];
