import { Component, Input } from '@angular/core';
import { TaskCategory } from '../../../../../../../../interfaces/task-list.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  @Input() category!: TaskCategory;
  @Input() index!: number;

}
