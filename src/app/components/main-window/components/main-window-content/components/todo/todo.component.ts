import { TaskCategoryService } from '../../../../../../services/task-category.service';
import { TaskPriorityService } from '../../../../../../services/task-priority.service';
import { __values } from 'tslib';
import { TaskItem, TaskCategory, TaskPriority } from '../../../../../../interfaces/task-list.interface';
import { TaskItemService } from '../../../../../../services/task-item.service';
import { Component, Inject, OnInit, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { TaskList } from '../../../../../../interfaces/task-list.interface';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskListService } from '../../../../../../services/task-list.service';
import { TaskItemWndComponent } from './components/task-item-wnd/task-item-wnd.component';
import { TaskListWndComponent } from './components/task-list-wnd/task-list-wnd.component';

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

  constructor(
    private dialog: MatDialog,
    private taskListService: TaskListService,
    private taskItemService: TaskItemService,
    private taskPriorityService: TaskPriorityService,
    private taskCategoryService: TaskCategoryService,
  ){
    this.isCollapsed = false;

  }

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

  test(){
    this.taskLists.forEach(list => {
      list.items.sort((a, b) => a.title.localeCompare(b.title));          //сортировка по имени
      list.items.sort((a, b) => a.category.localeCompare(b.category));    //сортировка по категории
      list.items.sort((a, b) => a.priority.localeCompare(b.priority));    //сортировка по приоритету
      list.items.sort((a, b) => a.status.localeCompare(b.status));        //сортировка по статусу

      // Создание объекта даты
let currentDate: Date = new Date();

// Получение дня, месяца и года
let day: number = currentDate.getDate(); // Получение дня
let month: number = currentDate.getMonth() + 1; // Получение месяца (начиная с 0, поэтому добавляем 1)
let year: number = currentDate.getFullYear(); // Получение года

// Вывод полученных значений
console.log(`День: ${day}, Месяц: ${month}, Год: ${year}`);
    });
  }

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

  getUniqueID(name: string, i: number): string {
    return name + i;
  }

  enterFilter(){
    this.enterFilterFlag <= 2 ? this.enterFilterFlag++ : this.enterFilterFlag = 1   // двойное нажатие - это нужно исправить
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


