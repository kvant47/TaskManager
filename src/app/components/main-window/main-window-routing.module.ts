import { NavBarComponent } from './components/main-window-content/components/nav-bar/nav-bar.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainWindowContentComponent } from './components/main-window-content/main-window-content.component';
import { TodoComponent } from './components/main-window-content/components/todo/todo.component';
import { StatisticComponent } from './components/main-window-content/components/statistic/statistic.component';
import { CalendarComponent } from './components/main-window-content/components/calendar/calendar.component';
import { ProfileComponent } from './components/main-window-content/components/profile/profile.component';

const routes: Routes = [
  {path: '', component: MainWindowContentComponent,
    children: [
      {path: 'nav-bar', component: NavBarComponent},
      {path: 'todo', component: TodoComponent},
      {path: 'statisic', component: StatisticComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'profile', component: ProfileComponent},
      {path: '', redirectTo: 'todo', pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainWindowRoutingModule { }
