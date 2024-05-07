import { Injectable } from '@angular/core';
import { TaskStatus } from '../interfaces/task-list.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskStatusService {

  constructor() { }

  taskStatus: TaskStatus[] = [
    {
     id: 0,
     title: "Сделать",
    },
    {
      id: 1,
      title: 'Выполняется',
     },
     {
       id: 3,
       title: 'Статус с длинным названием',
      },
     {
      id: 2,
      title: 'Выполнено',
     }
  ]

  getAllStatus(){
    return this.taskStatus;
  }
}
