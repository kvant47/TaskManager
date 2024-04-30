import { Injectable } from '@angular/core';
import { TaskCategory } from '../interfaces/task-list.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskCategoryService {

  taskCategory: TaskCategory[] = [
    {
     id: 0,
     title: "Работа",
    },
    {
     id: 1,
     title: 'Учеба',
    },
    {
     id: 2,
     title: 'Семья',
    },
    {
      id: 3,
      title: 'Хобби',
     },
     {
      id: 4,
      title: 'Личное',
     },
     {
      id: 5,
      title: 'Досуг',
     },
     {
      id: 6,
      title: 'Другое',
     },
     {
      id: 7,
      title: 'Все в одной куче',
     }
  ]

  getAllCategory(): TaskCategory[]{
    return this.taskCategory;
  }
}
