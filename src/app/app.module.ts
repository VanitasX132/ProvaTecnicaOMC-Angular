import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderBarComponent } from './header/header-bar/header-bar.component';
import { TasklistComponent } from './tasks/tasklist/tasklist.component';
import { TaskDetailsComponent } from './tasks/task-details/task-details.component';
import { HomePageComponent } from './homepage/home-page/home-page.component';
import { TasksPageComponent } from './tasks/tasks-page/tasks-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    TasklistComponent,
    TaskDetailsComponent,
    HomePageComponent,
    TasksPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
