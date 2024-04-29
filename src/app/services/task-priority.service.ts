import { Injectable } from '@angular/core';
import { TaskPriority } from '../interfaces/task-list.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskPriorityService {

  taskPriority: TaskPriority[] = [
    {
     id: 0,
     title: "Не к спеху",
    },
    {
     id: 1,
     title: 'Не затягивать',
    },
    {
     id: 2,
     title: 'Поторопиться',
    },
    {
      id: 3,
      title: 'Срочно',
     }
  ]

  getAllPriority(): TaskPriority[]{
    return this.taskPriority;
  }
}
