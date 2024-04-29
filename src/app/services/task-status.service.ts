import { Injectable } from '@angular/core';
import { TaskStatus } from '../interfaces/task-list.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskPriorityService {

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
      id: 2,
      title: 'Выполнено',
     }
  ]

  getAllStatus(){
    return this.taskStatus;
  }
}
