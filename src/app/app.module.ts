import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { MemberListComponent } from './components/member-list/member-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GroupListComponent,
    MemberListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
