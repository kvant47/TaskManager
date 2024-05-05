import { TaskItem } from './../../../../../../../../interfaces/task-list.interface';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskList } from '../../../../../../../../interfaces/task-list.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-list-wnd',
  templateUrl: './task-list-wnd.component.html',
  styleUrl: './task-list-wnd.component.css'
})

export class TaskListWndComponent implements OnInit {

  loginForm!: FormGroup;
  public title: string

  constructor(
    public dialogRef: MatDialogRef<TaskListWndComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskList
  ) {}



  ngOnInit(): void {
  if (!this.data) {
    this.title = 'Новая группа задач';
    this.loginForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
    });
  } else {
    this.title = 'Редактирование группы задач';
    this.loginForm = new FormGroup({
      title: new FormControl(this.data?.title || '', [Validators.required]), // Добавляем проверку на существование this.data и его свойства title
    });
  }
}

  save() {
    const taskList :TaskList = {
      title: this.loginForm.get('title').value,
    }
    if(this.data) {
      taskList.id = this.data.id;
    }
    this.dialogRef.close(taskList);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
