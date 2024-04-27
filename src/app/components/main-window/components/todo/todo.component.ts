import { __values } from 'tslib';
import { TaskItem } from './../../../../interfaces/task-list.interface';
import { TaskItemService } from './../../../../services/task-item.service';
import { Component, Inject, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { TaskCategory, TaskList, TaskPriority, TaskStatus } from '../../../../interfaces/task-list.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskListService } from '../../../../services/task-list.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskListWndComponent } from '../task-list-wnd/task-list-wnd.component';
import { TaskItemWndComponent } from '../task-item-wnd/task-item-wnd.component';
import { SearchPipe } from '../../../../pipes/search';

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
  public value = '';
  constructor(
    private dialog: MatDialog,
    private taskListService: TaskListService,
    private taskItemService: TaskItemService,
  ){
    this.isCollapsed = false;

  }

  public defMass: any = []
  FilterByName(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    console.log('Значение для фильтрации ' + this.value);
    console.log('Массив до фильтрации ' + this.taskLists);


    //this.taskLists = this.defMass.filter((taskList: TaskList) => taskList.title.includes(value))  // Работает как надо, списки филтруются. Но массив портится, его элементы удаляются


    //this.taskLists.filter = value.trim().toLowerCase();    // Работает, но только в консоли. Сами списки не меняются

    console.log(this.taskLists.filter);
    console.log('Массив после ' + this.taskLists);
  }


  FilterBtnClick() {
    this.isCollapsed = !this.isCollapsed;
  }


  Update(){
    this.taskListService.getAllTaskList().subscribe(data => this.taskLists = data)              //инициализация списков с задачами
    this.taskItemService.getAllTaskItem().subscribe(data => this.taskItems = data)              //инициализация задач
    this.taskItemService.getAllTaskItem().subscribe(data => this.taskLists[1].items = data)

    this.taskListService.getAllTaskList().subscribe(data => {                                 //поптыка решить проблему фильтра через создание доп массива с дефолтными значениями
      this.taskLists = data;
      this.defMass = data;
  })

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


