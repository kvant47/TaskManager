import { Pipe, PipeTransform } from '@angular/core';
import { TaskItem } from '../interfaces/task-list.interface';

@Pipe({
  name: 'searchByPriority'
})
export class SearchByPriority implements PipeTransform {

  transform(taskItems: TaskItem[], priorotiesSearch: string[]=[], searchFlag: boolean = false): TaskItem[] {

    if(!taskItems || priorotiesSearch.length === 0 || priorotiesSearch === null || searchFlag == false) {
    console.log('Вызвался и ниче не возваращает')
    return taskItems
    }

    return taskItems.filter(taskItem => {
      return priorotiesSearch.some(priority => {
        return taskItem.priority?.trim().toLowerCase().includes(priority.trim().toLowerCase())
      })
    });

  }

}

