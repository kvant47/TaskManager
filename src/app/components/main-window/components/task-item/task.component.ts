import { Component, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { TaskItem } from '../../../../interfaces/task-list.interface';
import { TaskItemService } from '../../../../services/task-item.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskItemComponent {
  @Input() taskItem!: TaskItem;
  @Input() index!: number;

  @Output() editTaskEmitter = new EventEmitter();
  @Output() deleteTaskEmitter = new EventEmitter();



  private wasInside = false;
  isCollapsed: boolean = false;

  testClick(){
    this.isCollapsed = !this.isCollapsed;
    this.wasInside = true;
  }

  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      this.isCollapsed = false;
    }
    this.wasInside = false;
  }

  constructor(
    private eRef: ElementRef,
    private taskItemService: TaskItemService) {
    this.isCollapsed = false;
  }

  editTask() {
    this.editTaskEmitter.emit(this.taskItem)
  }

  deleteTask() {
    this.deleteTaskEmitter.emit(this.taskItem)
  }
}
