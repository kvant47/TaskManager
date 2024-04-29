import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainWindowRoutingModule } from './main-window-routing.module';
import { TodoComponent } from './components/todo/todo.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainWindowContentComponent } from './components/main-window-content/main-window-content.component';
import { StatisticComponent } from './components/statistic/statistic.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskItemComponent } from './components/task-item/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskItemWndComponent } from './components/task-item-wnd/task-item-wnd.component';
import { DeleteWndComponent } from './components/delete-wnd/delete-wnd.component';
import { FilterPipe } from '../../pipes/search';



@NgModule({
  declarations: [
    TodoComponent,
    NavBarComponent,
    MainWindowContentComponent,
    StatisticComponent,
    CalendarComponent,
    ProfileComponent,
    TaskListComponent,
    TaskItemComponent,
    TaskItemWndComponent,
    DeleteWndComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MainWindowRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MainWindowModule { }
