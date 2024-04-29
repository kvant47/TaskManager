import { TaskCategoryService } from './../../../../services/task-category.service';
import { TaskPriorityService } from './../../../../services/task-priority.service';
import { __values } from 'tslib';
import { TaskItem, TaskCategory, TaskPriority } from './../../../../interfaces/task-list.interface';
import { TaskItemService } from './../../../../services/task-item.service';
import { Component, Inject, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { TaskList } from '../../../../interfaces/task-list.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskListService } from '../../../../services/task-list.service';
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

  public taskLists: TaskList[];
  public taskItems: TaskItem[];
  search: string = '';


  public taskPriority: TaskPriority[] = []
  public taskCategory: TaskCategory[] = []

  constructor(
    private dialog: MatDialog,
    private taskListService: TaskListService,
    private taskItemService: TaskItemService,
    private taskPriorityService: TaskPriorityService,
    private taskCategoryService: TaskCategoryService,
  ){
    this.isCollapsed = false;

  }


  FilterBtnClick() {
    this.isCollapsed = !this.isCollapsed;
  }


  Update(){
    this.taskListService.getAllTaskList().subscribe(data => this.taskLists.push(data))              //инициализация списков с задачами
    this.taskItemService.getAllTaskItem().subscribe(data => this.taskLists[1].items.push(data))
  }


  ngOnInit(): void {
    this.Update();

    this.taskPriority=this.taskPriorityService.getAllPriority();
    this.taskCategory=this.taskCategoryService.getAllCategory();
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


