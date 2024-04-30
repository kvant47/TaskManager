import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskListWndComponent } from '../task-list-wnd/task-list-wnd.component';

@Component({
  selector: 'app-delete-wnd',
  templateUrl: './delete-wnd.component.html',
  styleUrl: './delete-wnd.component.css'
})
export class DeleteWndComponent implements OnInit {

    constructor(
      public dialogRef: MatDialogRef<DeleteWndComponent>,
    ) {}

    ngOnInit(): void {
    }

    Delete() {
      this.dialogRef.close(true);
    }

    OnNoClick(): void {
      this.dialogRef.close(false);
    }
  }
