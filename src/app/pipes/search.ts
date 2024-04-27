import { Pipe, PipeTransform } from "@angular/core";
import { TaskList } from "../interfaces/task-list.interface";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform{

  // transform(taskLists, value) {
  //   return taskLists.filter(taskList => {
  //     return taskList.title.toLowerCase().includes(value.toLowerCase())
  //   })
  // }

  transform(tasks, value) {
    return tasks.filter(taskList => {
      return tasks.title.toLowerCase().includes(value.toLowerCase())
    })
  }

}

