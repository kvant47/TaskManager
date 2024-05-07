import { Component, Input } from '@angular/core';
import { TaskPriority } from '../../../../../../../../interfaces/task-list.interface';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrl: './priority.component.css'
})
export class PriorityComponent {
  @Input() priority!: TaskPriority;
  @Input() index!: number;
}
