import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupListComponent} from './components/group-list/group-list.component';

const routes: Routes = [
  {path: 'groups', component: GroupListComponent},
  {path: '', redirectTo: '/groups', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
