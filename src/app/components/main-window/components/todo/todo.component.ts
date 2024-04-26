import { TaskItemService } from './../../../../services/task-item.service';
import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { TaskCategory, TaskList, TaskPriority, TaskStatus } from '../../../../interfaces/task-list.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskListService } from '../../../../services/task-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskListWndComponent } from '../task-list-wnd/task-list-wnd.component';
import { TaskItemWndComponent } from '../task-item-wnd/task-item-wnd.component';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent implements OnInit {

  name!: string;
  isCollapsed: boolean;

  @Output() fullscren = new EventEmitter<{}>();

  public taskLists: any = [];
  public taskItems: any = [];

  constructor(
    private dialog: MatDialog,
    private taskListService: TaskListService,
    private taskItemService: TaskItemService
  ){
    this.isCollapsed = false;
   // this.taskItemService.getAllTaskItem().subscribe(data => this.taskItems = data)
  }



  FilterBtnClick() {
    this.isCollapsed = !this.isCollapsed;
  }

  Update(){
    this.taskListService.getAllTaskList().subscribe(data => this.taskLists = data)              //инициализация списков с задачами
    this.taskItemService.getAllTaskItem().subscribe(data => this.taskItems = data)     //инициализация задач
    this.taskItemService.getAllTaskItem().subscribe(data => this.taskLists[1].items = data)
  }


  ngOnInit(): void {
    this.Update();
  }



  AddNewTaskItem(): void {
    const dialogAddingNewListItem = this.dialog.open(TaskItemWndComponent, {
      data: null,
      width: '300px'
    });

    dialogAddingNewListItem.afterClosed().subscribe(
      data => {
        if (data)
          this.taskItemService.addNewItem(data).subscribe( data => {
          console.log(data);
          this.Update()
        });
  }
  );}


  AddNewList(): void{
    const dialogAddingNewListTask = this.dialog.open(TaskListWndComponent, {
      width: '400px',
    });
    dialogAddingNewListTask.afterClosed().subscribe(
      data => {
        const tempList: TaskList = data
        if(data){
        this.taskListService.addNewList(tempList).subscribe( data => this.taskLists.push(data) );
        };
  }
  );}

}


