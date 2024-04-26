import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskListWndComponent } from '../task-list-wnd/task-list-wnd.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskItem } from '../../../../interfaces/task-list.interface';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-task-item-wnd',
  templateUrl: './task-item-wnd.component.html',
  styleUrl: './task-item-wnd.component.css'
})
export class TaskItemWndComponent {

  public title: string
  public active = [false, false, false];
  private imgPath: string;

  loginForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<TaskListWndComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskItem,
  ) {}

  handleRadioLabelClick(event: Event) {
    const target = event.target as HTMLInputElement;
    const inp = target.parentNode?.parentNode?.parentNode.previousSibling as HTMLInputElement;
    for(var i = 0; i < this.active.length; i++){
      this.active[i] = false
    }
    if (target.type === 'radio' && target.checked) {
      console.log('Выбрана радиокнопка с значением:', target.value);
      inp.innerHTML = target.value;
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
    if(!this.data) {
      this.title = 'Новая задача'
      this.loginForm = new FormGroup({
        title: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required]),
        date: new FormControl('', [Validators.required]),
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
        date: new FormControl(this.data.date, []),
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
    const taskItem :TaskItem = {
      title: this.loginForm.get('title').value,
      description: this.loginForm.get('description').value,
      date: this.loginForm.get('date').value,
      category: this.loginForm.get('category').value,
      status: this.loginForm.get('status').value,
      priority: this.loginForm.get('priority').value,
      imagePath: this.loginForm.get('imagePath').value,
      audioPath: this.loginForm.get('audioPath').value,
    }
    if (this.imgPath){  taskItem.imagePath = this.imgPath;
        console.log('Путь к картинке');
        console.log(this.imgPath);
    }

    if(this.data) {
      taskItem.id = this.data.id;
    }
    console.log(taskItem);
    console.log('Дата' + this.loginForm.get('date').value);
    console.log('Категория' + this.loginForm.get('category').value);
    console.log('Статус' + this.loginForm.get('status').value);
    console.log('Приоритет' + this.loginForm.get('priority').value);
    this.dialogRef.close(taskItem);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
