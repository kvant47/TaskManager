import { TaskList } from './../interfaces/task-list.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {

  url = "http://localhost:3001/TaskList";
  constructor(private http: HttpClient) {}


  getAllTaskList():  Observable<TaskList> {
    return this.http.get<TaskList>(this.url)
  }

  addNewList(taskList: TaskList): Observable<TaskList> {
    return this.http.post<TaskList>(this.url, taskList)
  }

  editTaskList(taskList: TaskList): Observable<TaskList>{
    return this.http.put<TaskList>(`${this.url}/${taskList.id}`,  taskList)
  }

  deleteTaskList(taskList: TaskList): Observable<TaskList> {
    return this.http.delete<TaskList>(`${this.url}/${taskList.id}`)
  }
}
