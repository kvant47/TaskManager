import { Pipe, PipeTransform } from '@angular/core';
import { TaskItem } from '../interfaces/task-list.interface';

@Pipe({
  name: 'searchByCategoryAndPriority'
})
export class SearchFilters implements PipeTransform {

  transform(taskItems: TaskItem[], categoryesSearch: string[], priorityesSearch: string[]): TaskItem[] {

    if(!taskItems || categoryesSearch.length === 0) {
      return taskItems
    }
    return taskItems.filter(taskItem => {
      categoryesSearch.forEach(category => {
        return taskItem.category.trim().toLowerCase().includes(category.trim().toLowerCase())
      },
      priorityesSearch.forEach(priority => {
        return taskItem.priority.trim().toLowerCase().includes(priority.trim().toLowerCase())
      }
      ));
    })

  }

}


