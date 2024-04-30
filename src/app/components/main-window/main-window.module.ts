import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainWindowRoutingModule } from './main-window-routing.module';
import { TodoComponent } from './components/main-window-content/components/todo/todo.component';
import { NavBarComponent } from './components/main-window-content/components/nav-bar/nav-bar.component';
import { MainWindowContentComponent } from './components/main-window-content/main-window-content.component';
import { StatisticComponent } from './components/main-window-content/components/statistic/statistic.component';
import { CalendarComponent } from './components/main-window-content/components/calendar/calendar.component';
import { ProfileComponent } from './components/main-window-content/components/profile/profile.component';
import { TaskListComponent } from './components/main-window-content/components/todo/components/task-list/task-list.component';
import { TaskItemComponent } from './components/main-window-content/components/todo/components/task-item/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskItemWndComponent } from './components/main-window-content/components/todo/components/task-item-wnd/task-item-wnd.component';
import { DeleteWndComponent } from './components/main-window-content/components/delete-wnd/delete-wnd.component';
import { FilterPipe } from '../../pipes/searchByTitle.pipe';
import { SearchByCategory } from '../../pipes/searchByCategory.pipe';
import { SearchByPriority } from '../../pipes/searchByPriority.pipe';



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
    FilterPipe,
    SearchByCategory,
    SearchByPriority
  ],
  imports: [
    CommonModule,
    MainWindowRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class MainWindowModule { }
