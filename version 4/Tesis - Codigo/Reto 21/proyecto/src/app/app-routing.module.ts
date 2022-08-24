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


//importar componentes del cliente-----------------------------------------------------------
import { MenuClienteComponent } from './vistas/menu-cliente/menu-cliente.component';
import { AssissmentClientComponent } from './componentes-client/assissment-client/assissment-client.component';
import { PollComponent } from './componentes-client/poll/poll.component';

//importar componentes para recepción--------------------------------------------------------
import { MenuRecepcionComponent } from './vistas/menu-recepcion/menu-recepcion.component';
import { UsuariosRecepcionComponent } from './componentes-recepcion/usuarios-recepcion/usuarios-recepcion.component';
import { CitasRecepcionComponent } from './componentes-recepcion/citas-recepcion/citas-recepcion.component';
import { NotificacionesComponent } from './componentes-recepcion/notificaciones/notificaciones.component';


//Improtando los guardas
import { RutasGuard } from './guards/rutas/rutas.guard';
import { RoleGuard } from './guards/role/role.guard';

const routes: Routes = [

  //Rutas para el administrador-------------------------------------
  {path: '',  pathMatch: 'full', redirectTo: 'inicio' },
  {path: 'inicio', component: InicioComponent },
  {path: 'menu-admin', component: MenuAdminComponent, canActivate: [RutasGuard, RoleGuard], data: { expectedRole: 'Administrador' }  },
  {path: 'menu', component: MenuComponent },
  {path: 'usuarios', component: UsuariosComponent},
  {path: 'assists', component: AssistsUsersComponent},
  {path: 'sistema', component: SistemaComponent},
  {path: 'planes', component: PlanesComponent},
  {path: 'view-notice/:id', component: ViewNoticeComponent },
  {path: 'notice', component: NoticeComponent},
  {path: 'list-notices', component: ListNoticesComponent},
  {path: 'training', component: TrainingComponent},
  {path: 'routines', component: RoutinesComponent},
  {path: 'routines-personal', component: RoutinesPersonalComponent},
  {path: 'record-routine/:id', component: RecordRoutineComponent},

  

  {path: 'assessment', component: AssessmentComponent},
  {path: 'assessment-basic/:id', component: AssessmentBasicComponent },
  {path: 'assessment-advanced/:id', component: AssessmentAdvancedComponent},
  {path: 'assessment-basic-update/:id', component: AssessmentBasicUpdateComponent},
  {path: 'assessment-advanced-update/:id', component: AssessmentAdvancedUpdateComponent},
  {path: 'assessment-basic-create-new/:id', component: AssessmentBasicCreateNewComponent},
  {path: 'assessment-advanced-create-new/:id', component: AssessmentAdvancedCreateNewComponent},
  {path: 'dashboard-basic', component: DashboardBasicComponent},
  {path: 'dashboard-advanced', component: DashboardAdvancedComponent},




  {path: 'see-quotes', component: SeeQuotesComponent},
  {path: 'see-nutrition', component: SeeNutritionComponent},
  {path: 'nutrition-client', component: NutritionClientComponent},
  {path: 'view-nutrition/:id', component: ViewNutritionComponent},
  {path: 'challenges', component: ChallengesComponent},
  {path: 'challenges-routines/:id', component: ChallengesRoutineComponent},

  {path: 'perfil', component: PerfilComponent},


  //Rutas para el Nutricion----------------------------------------
  {path: 'menu-nutricion', component: MenuNutricionComponent},
  {path: 'ver-valoracion', component: VerValoracionesComponent},
  {path: 'nutrition-general', component: NutritionGeneralComponent},
  {path: 'feeding-client', component: FeedingClientComponent},
  {path: 'create-nutrition/:id', component: CreateNutritionComponent},
  {path: 'create-nutrition-personal/:id', component: CreateNutritionPersonalComponent},
  {path: 'nutrition-general-update/:id', component: NutritionGeneralUpdateComponent},
  {path: 'nutrition-personal-update/:id', component: NutritionPersonalUpdateComponent},
  {path: 'view-nutrition-personal/:id', component: ViewNutritionPersonalComponent},


  //Rutas para Entrenador--------------------------------------------
  {path: 'menu-entrenador', component: MenuEntrenadorComponent},
  {path: 'valoraciones-entrenador', component: ValoracionEntrenadorComponent},


  //Rutas para recepción--------------------------------------------
  {path: 'menu-recepcion', component: MenuRecepcionComponent},
  {path: 'usuarios-recepcion', component: UsuariosRecepcionComponent},
  {path: 'citas-recepcion', component: CitasRecepcionComponent},
  {path: 'notificaciones', component: NotificacionesComponent},


  //Rutas para el cliente-------------------------------------------
  {path: 'menu-cliente', component: MenuClienteComponent},
  {path: 'assissment-client', component: AssissmentClientComponent},
  {path: 'poll', component: PollComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [InicioComponent,MenuComponent,UsuariosComponent,MenuAdminComponent];
