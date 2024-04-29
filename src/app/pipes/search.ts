import { Pipe, PipeTransform } from '@angular/core';
import {TaskItem} from "../interfaces/task-list.interface";

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(taskItems: TaskItem[], search: string = ''): TaskItem[] {

    if(!taskItems || !search.trim()) {
      return taskItems
    }
    return taskItems.filter(taskItem => {
      return taskItem.title.trim().toLowerCase().includes(search.trim().toLowerCase())
    })

  }

}

