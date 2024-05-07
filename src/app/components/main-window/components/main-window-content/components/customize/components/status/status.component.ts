import { Component, Input } from '@angular/core';
import { TaskStatus } from '../../../../../../../../interfaces/task-list.interface';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrl: './status.component.css'
})
export class StatusComponent {
  @Input() status!: TaskStatus;
  @Input() index!: number;
}
