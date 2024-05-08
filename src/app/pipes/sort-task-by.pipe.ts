import { Pipe, PipeTransform } from '@angular/core';
import {TaskItem} from "../interfaces/task-list.interface";

@Pipe({
  name: 'sortBy'
})
export class SortTaskByPipe implements PipeTransform {

  transform(taskItems: TaskItem[]=[], sortBy: number = 0): TaskItem[] {

    switch (sortBy) {
      case 1:
        console.log('фильтр по имени')
        return taskItems.sort((a, b) => a.title.localeCompare(b.title));            // по имени
      case 2:
        console.log('фильтр по дате')
        return taskItems.sort((a, b) => b.dateCreate?.localeCompare(a.dateCreate)); // по дате
      case 3:
        console.log('фильтр по категории')
        return taskItems.sort((a, b) => a.category?.localeCompare(b.category));     // по категории
      case 4:
        console.log('фильтр по приоритету')
        return taskItems.sort((a, b) => a.priority?.localeCompare(b.priority));     // по приоритету
      case 5:
        console.log('фильтр по дедлайну')
        return taskItems.sort((a, b) => a.deadline?.localeCompare(b.deadline));     // по дедлайну
     case 6:
       console.log('фильтр по дедлайну')
      return taskItems.sort((a, b) => a.status?.localeCompare(b.status));           // по статусу
      default:
        return taskItems
    }
  }
}
