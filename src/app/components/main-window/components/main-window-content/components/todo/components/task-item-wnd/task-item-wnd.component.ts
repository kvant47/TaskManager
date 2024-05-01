import { TaskCategory, TaskPriority, TaskStatus } from '../../../../../../../../interfaces/task-list.interface';
import { TaskCategoryService } from '../../../../../../../../services/task-category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskListWndComponent } from '../task-list-wnd/task-list-wnd.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskItem } from '../../../../../../../../interfaces/task-list.interface';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TaskStatusService } from '../../../../../../../../services/task-status.service';
import { TaskPriorityService } from '../../../../../../../../services/task-priority.service';

@Component({
  selector: 'app-task-item-wnd',
  templateUrl: './task-item-wnd.component.html',
  styleUrl: './task-item-wnd.component.css'
})
export class TaskItemWndComponent implements OnInit{

  public title: string
  public active = [false, false, false];
  private imgPath: string;
  public taskCategory: TaskCategory[];
  public taskPriority: TaskPriority[];
  public taskStatus: TaskStatus[];


  loginForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TaskListWndComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskItem,
    public taskCategoryService: TaskCategoryService,
    public taskStatusService: TaskStatusService,
    public taskPriorityService: TaskPriorityService,
  ) {}

  handleRadioLabelClick(event: Event) {
    let target = event.target as HTMLInputElement;
    target = target.previousSibling as HTMLInputElement;
    const inp = target.parentNode?.parentNode?.parentNode.previousSibling as HTMLInputElement;
    // console.log('Вставляем сюда' + target.parentNode?.parentNode?.parentNode.previousSibling)
    // console.log('Вставляем это' + target.innerHTML)
    inp.innerHTML = target.innerHTML;
    for(var i = 0; i < this.active.length; i++){
      this.active[i] = false
    }
    if (target.type === 'radio' && target.checked) {
      console.log('Выбрана радиокнопка с значением:', target.value);
      inp.innerHTML = target.innerHTML;
    }
  }

  FillAllSelectInput(){
    let input = document.getElementById('task_category_input');
    if(this.data.category) input.innerHTML = this.data.category;
    input = document.getElementById('task_status_input');
    if(this.data.status) input.innerHTML = this.data.status;
    input = document.getElementById('task_priority_input');
    if(this.data.priority) input.innerHTML = this.data.priority;
  }

  ngOnInit(): void {
    this.taskCategory = this.taskCategoryService.getAllCategory();
    this.taskStatus = this.taskStatusService.getAllStatus();
    this.taskPriority = this.taskPriorityService.getAllPriority();
    console.log(this.taskStatus)
    console.log(this.taskPriority)

    if(!this.data) {
      this.title = 'Новая задача'
      this.loginForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        deadline: new FormControl('', [Validators.required]),
        category: new FormControl('', []),
        status: new FormControl('', [Validators.required]),
        priority: new FormControl('', [Validators.required]),
        imagePath: new FormControl('', []),
        audioPath: new FormControl('', []),
      });
    }
    else {
      this.title = 'Редактирование задачи'
      this.loginForm = new FormGroup({
        title: new FormControl(this.data.title, [Validators.required]),
        description: new FormControl(this.data.description, []),
        deadline: new FormControl(this.data.deadline, []),
        category: new FormControl(this.data.category, []),
        status: new FormControl(this.data.status, [Validators.required]),
        priority: new FormControl(this.data.priority, [Validators.required]),
        imagePath: new FormControl(this.data.imagePath, []),
        audioPath: new FormControl(this.data.audioPath, []),
      });
      this.FillAllSelectInput()

    }
  }

  OnFileSelected($event: any){
    this.imgPath = '../../../../../assets/image/' + $event.target.files[0].name;
    console.log('Предполагаемый путь к файлу');
    console.log($event.target.files[0].name);
  }

  save() {
    let date = new Date;
    const taskItem :TaskItem = {
      title: this.loginForm.get('title').value,
      description: this.loginForm.get('description').value,
      deadline: this.loginForm.get('deadline').value,
      category: this.loginForm.get('category').value,
      status: this.loginForm.get('status').value,
      priority: this.loginForm.get('priority').value,
      imagePath: this.loginForm.get('imagePath').value,
      audioPath: this.loginForm.get('audioPath').value,
      dateCreate: date.getDay() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear(),

    }
    if (this.imgPath){  taskItem.imagePath = this.imgPath;
        console.log('Путь к картинке');
        console.log(this.imgPath);
    }

    if(this.data) {
      taskItem.id = this.data.id;
    }
    console.log(taskItem);
    this.dialogRef.close(taskItem);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}