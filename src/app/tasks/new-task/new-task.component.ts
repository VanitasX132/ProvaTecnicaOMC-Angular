import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @Output() onTaskCreated = new EventEmitter<Todo>();
  @Output() onNewTaskCancelled = new EventEmitter<string>();
  taskNameForm = new FormControl('');
  taskPropietaryForm = new FormControl('');
  taskCompletedForm = new FormControl('');
  completed: boolean = false;

  createNewTask() {
    if (this.taskCompletedForm.value === '') {
      this.completed = false;
    } else if (this.taskCompletedForm.value === 'false') {
      this.completed = false;
    } else if (this.taskCompletedForm.value === 'true') {
      this.completed = true;
    }
    this.onTaskCreated.emit(new Todo(0, String(this.taskNameForm.value), String(this.taskPropietaryForm.value), this.completed));
    this.onNewTaskCancelled.emit('not allowed');
  }

  cancelNewTask() {
    this.onNewTaskCancelled.emit('not allowed');
  }

  constructor() { }

  ngOnInit(): void {
  }

}
