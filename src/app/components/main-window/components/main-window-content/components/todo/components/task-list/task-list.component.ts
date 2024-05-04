import { TaskListService } from '../../../../../../../../services/task-list.service';
import { MatDialog } from '@angular/material/dialog';
import {
  TaskItem,
  TaskList,
} from '../../../../../../../../interfaces/task-list.interface';
import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { TaskItemWndComponent } from '../task-item-wnd/task-item-wnd.component';
import { __values } from 'tslib';
import { TaskItemService } from '../../../../../../../../services/task-item.service';
import { DeleteWndComponent } from '../../../delete-wnd/delete-wnd.component';
import { TaskListWndComponent } from '../task-list-wnd/task-list-wnd.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  @Input() taskList!: TaskList;
  @Input() index!: number;

  @Input() sortBy!: number;
  @Input() search: string
  @Input() tableView: boolean;
  @Input() enterFilterFlag: number
  @Input() categoryesSearch: string[]
  @Input() priorotiesSearch: string[]



  @Output() addNewTaskItem = new EventEmitter<{
    item: TaskItem;
    index: number;
  }>();

  @Output() update = new EventEmitter<{}>();


  constructor(
    private dialog: MatDialog,
    private taskItemService: TaskItemService,
    private taskListService: TaskListService) {}




  editTask(taskItem: TaskItem) {
    console.log(this.categoryesSearch)  //Убрать
    console.log(this.priorotiesSearch)  //Убрать
    const dialogAddingNewTask = this.dialog.open(TaskItemWndComponent, {
      data: taskItem
    });
    dialogAddingNewTask.afterClosed().subscribe(
      data => {
        if (data)
          this.taskItemService.putItem(data).subscribe( data => {
            console.log(data)
            this.update.emit()
          } );
      }
    );
  }

  deleteTask(taskItem: TaskItem) {
    const dialogDeleteTask = this.dialog.open(DeleteWndComponent, { });
    dialogDeleteTask.afterClosed().subscribe(
      del => {
        if (del)
        this.taskItemService.deleteItem(taskItem).subscribe( data =>{
        console.log(data);
        this.update.emit();
      })
      }
    )
  }

  EditTaskList() {
    const dialogEditTaskList = this.dialog.open(TaskListWndComponent, {
      data: this.taskList
    });
    dialogEditTaskList.afterClosed().subscribe(
      data => {
        if (data)
          this.taskListService.editTaskList(data).subscribe( data =>{
            console.log(data);
            this.update.emit();
          })
      }
    );
  }


  DeleteTaskList(){
    const dialogDeleteTaskList = this.dialog.open(DeleteWndComponent, {});
    dialogDeleteTaskList.afterClosed().subscribe(
      del => {
      if (del){
        this.taskListService.deleteTaskList(this.taskList).subscribe( data =>{
          console.log(data);
          this.update.emit();
        })
  }})
  }


}

