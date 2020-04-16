import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravellerListComponent } from './traveller-list/traveller-list.component';
import { TravellerComponent } from './traveller/traveller.component';

const routes: Routes = [
  {
    path: 'home',
    component: TravellerListComponent
  },
  {
    path: 'create',
    component: TravellerComponent
  },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
