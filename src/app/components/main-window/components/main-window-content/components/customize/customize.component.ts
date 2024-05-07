import { TaskCategoryService } from './../../../../../../services/task-category.service';
import { Component, OnInit } from '@angular/core';
import { TaskCategory, TaskPriority, TaskStatus } from '../../../../../../interfaces/task-list.interface';
import { TaskPriorityService } from '../../../../../../services/task-priority.service';
import { TaskStatusService } from '../../../../../../services/task-status.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.component.html',
  styleUrl: './customize.component.css'
})
export class CustomizeComponent implements OnInit{

  categoryes: TaskCategory[];
  priorityes: TaskPriority[];
  statuses: TaskStatus[];

  constructor(
    private taskCategoryService: TaskCategoryService,
    private taskPriorityService: TaskPriorityService,
    private taskStatusService: TaskStatusService,
  ){ }

  ngOnInit(): void {
    this.categoryes = this.taskCategoryService.getAllCategory();
    this.priorityes = this.taskPriorityService.getAllPriority();
    this.statuses = this.taskStatusService.getAllStatus();
  }


}
