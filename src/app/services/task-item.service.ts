import { Injectable } from '@angular/core';
import {  TaskItem, TaskList } from '../interfaces/task-list.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskItemService {

  url = "http://localhost:3001/TaskItem";
  constructor(private http: HttpClient) {}

  getAllTaskItem(): Observable<TaskItem[]>  {
    return this.http.get<TaskItem[]>(this.url)
 }

 addNewItem(taskList: TaskList): Observable<TaskList> {
   return this.http.post<TaskList>(this.url, taskList)
 }

 putItem(taskItem: TaskItem): Observable<TaskItem> {
   return this.http.put<TaskItem>(`${this.url}/${taskItem.id}`, taskItem)
 }

 deleteItem(taskItem: TaskItem): Observable<any> {
   return this.http.delete(`${this.url}/${taskItem.id}`)
 }
}
