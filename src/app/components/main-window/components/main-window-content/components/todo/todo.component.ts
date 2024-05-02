import { TaskCategoryService } from '../../../../../../services/task-category.service';
import { TaskPriorityService } from '../../../../../../services/task-priority.service';
import { __values } from 'tslib';
import { TaskItem, TaskCategory, TaskPriority } from '../../../../../../interfaces/task-list.interface';
import { TaskItemService } from '../../../../../../services/task-item.service';
import { Component, Inject, OnInit, EventEmitter, Output, ChangeDetectorRef, HostListener } from '@angular/core';
import { TaskList } from '../../../../../../interfaces/task-list.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskListService } from '../../../../../../services/task-list.service';
import { TaskListWndComponent } from './components/task-list-wnd/task-list-wnd.component';
import { TaskItemWndComponent } from './components/task-item-wnd/task-item-wnd.component';

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

  //public taskLists: any;
  //public taskItems: any;
  search: string = '';                        //строка поиска

  public taskPriority: TaskPriority[] = [];   //массив с существующими приоритетами
  public taskCategory: TaskCategory[] = [];   //массив с существующими категориями
  public enterFilterFlag: number = 0;         //переменная разрешает филтрацию по чекбоксам

  public categoryesSearch: string[] = [];     //массив хранит категории для фильтров
  public priorotiesSearch: string[] = [];     //массив хранит приоритеты для фильтров

  public activeSort = false;                  //переменная для открытия/закрытия списка сортировки
  wasInside: boolean;                         //переменная для закрытия окна сорировки при клике вне

  constructor(
    private dialog: MatDialog,
    private taskListService: TaskListService,
    private taskItemService: TaskItemService,
    private taskPriorityService: TaskPriorityService,
    private taskCategoryService: TaskCategoryService,
  ){
    this.isCollapsed = false;
  }


//===========================Методы для открытия списка сортировки и закрытия окна при клике вне его====================

  sortClick(){
    this.activeSort = !this.activeSort;
    this.wasInside = true;
  }


  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.activeSort = false;
    }
    this.wasInside = false;
  }


//===========================Методы для добавления/удаления позиций для фильтров через чекбоксы====================

  ChangePriorotyes($event){
    const checkbox = $event.target as HTMLInputElement
    if (checkbox.checked) {
      console.log('Добавили элемент' + checkbox.nextElementSibling.innerHTML)
      this.priorotiesSearch.push(checkbox.nextElementSibling.innerHTML)
    } else {
      console.log('Удалили элемент' + checkbox.nextElementSibling.innerHTML)
      this.priorotiesSearch.splice(this.priorotiesSearch.indexOf(checkbox.nextElementSibling.innerHTML), 1);
    }
  }


  ChangeCategoryes($event){
    const checkbox = $event.target as HTMLInputElement
    if (checkbox.checked) {
      console.log('Добавили элемент' + checkbox.nextElementSibling.innerHTML)
      this.categoryesSearch.push(checkbox.nextElementSibling.innerHTML)
    } else {
      console.log('Удалили элемент' + checkbox.nextElementSibling.innerHTML)
      this.categoryesSearch.splice(this.categoryesSearch.indexOf(checkbox.nextElementSibling.innerHTML), 1);
    }
  }


//===========================Метод сброса фильтров====================

  UncheckAll(){
    for(let i = 0; i < this.taskPriority.length; i++){
      let checkbox = document.getElementById('priority' + i) as HTMLInputElement;
      checkbox.checked = false;
    }
    for(let i = 0; i < this.taskCategory.length; i++){
      let checkbox = document.getElementById('category' + i) as HTMLInputElement;
      checkbox.checked = false;
    }
    this.categoryesSearch = []
    this.priorotiesSearch = []
    this.enterFilterFlag = 0;
  }


//===========================Методы сортировок====================

enterValueInInput($event){
  let input = document.getElementById('task_sort_input') as HTMLInputElement;
  let value = event.target as HTMLInputElement;
  input.innerHTML = value.innerHTML
}

sortByDeadline($event) {

  this.enterValueInInput($event);

  this.taskLists.forEach(list => {
    list.items?.sort((a, b) => a.deadline?.localeCompare(b.deadline));
  })
  }

  sortByPriority($event) {

    this.enterValueInInput($event);

    this.taskLists.forEach(list => {
      list.items?.sort((a, b) => a.priority?.localeCompare(b.priority));
    })
  }

  sortByCategory($event) {

    this.enterValueInInput($event);

    this.taskLists.forEach(list => {
      list.items?.sort((a, b) => a.category?.localeCompare(b.category));
    })
  }

  sortByDate($event) {

    this.enterValueInInput($event);

    this.taskLists.forEach(list => {
      list.items?.sort((a, b) => a.dateCreate.localeCompare(b.dateCreate));
    })
  }

  sortByTitle($event) {

    this.enterValueInInput($event);

    this.taskLists.forEach(list => {
      list.items?.sort((a, b) => a.title.localeCompare(b.title));
    });
  }

  sortCustom($event) {

    this.enterValueInInput($event);

    this.taskLists.forEach(list => {
      list.items?.sort();
    });
  }



//===========================Методы раздачи уникальных ID, движения переменной для фильтрации, открытия/закрытия окна фильтров====================

  getUniqueID(name: string, i: number): string {
    return name + i;
  }

  enterFilter(){
    this.enterFilterFlag <= 2 ? this.enterFilterFlag++ : this.enterFilterFlag = 1
  }

  FilterBtnClick() {                //показать/скрыть фильтры
    this.isCollapsed = !this.isCollapsed;
  }


  Update(){
     this.taskListService.getAllTaskList().subscribe(data => this.taskLists = data)            //инициализация списков с задачами
     this.taskItemService.getAllTaskItem().subscribe(data => this.taskLists[1].items= data)
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

    dialogAddingNewListItem.afterClosed().subscribe(data => {
      if (data) {
        let date = new Date();
        let day: string = (date.getDate() < 10 ? '0' : '') + date.getDate();
        let month: string = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
        let hour: string = (date.getHours() < 10 ? '0' : '') + date.getHours();
        let minut: string = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        let second: string = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

        data.dateCreate = `${date.getFullYear()}.${month}.${day} ${hour}:${minut}:${second}`;
        this.taskItemService.addNewItem(data).subscribe(response => {
          console.log(response);
          this.Update();
        });
      }
    });}


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


