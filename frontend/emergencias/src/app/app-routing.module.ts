import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonalComponent } from './personal/personal.component';
import { HomeComponent } from './home/home.component';
import { EquipoComponent } from './equipo/equipo.component';
import { IncidentesComponent } from './incidentes/incidentes.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: 'personal',
    component: PersonalComponent
  },
  {
    path:'equipo',
    component: EquipoComponent,
  },
  {
    path:'incidente',
    component: IncidentesComponent,
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash : true } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
