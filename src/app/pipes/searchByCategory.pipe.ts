import { Pipe, PipeTransform } from '@angular/core';
import { TaskItem } from '../interfaces/task-list.interface';

@Pipe({
  name: 'searchByCategory'
})
export class SearchByCategory implements PipeTransform {

  transform(taskItems: TaskItem[], categoryesSearch: string[]=[], searchFlag: boolean = false): TaskItem[] {

    if(!taskItems || categoryesSearch.length === 0  || searchFlag == false) {
      return taskItems
    }

    return taskItems.filter(taskItem => {
      return categoryesSearch.some(category => {
        return taskItem.category?.trim().toLowerCase().includes(category.trim().toLowerCase())
      })
    });
  }
}


