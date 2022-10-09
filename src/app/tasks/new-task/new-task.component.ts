import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../task.model';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  @Output() onUserCreated = new EventEmitter<any>();
  @Output() onTaskCreated = new EventEmitter<any>();
  @Output() onNewTaskCancelled = new EventEmitter<string>();
  taskNameForm = new FormControl('');
  taskPropietaryForm = new FormControl('');
  taskCompletedForm = new FormControl('');
  newUserNameForm = new FormControl('');
  newUserUsernameForm = new FormControl('');
  newUserPasswordForm = new FormControl('');
  newUserStreetForm = new FormControl('');
  newUserZipcodeForm = new FormControl('');
  newUserCityForm = new FormControl('');
  newUserCountryForm = new FormControl('');
  completed: boolean = false;
  newUser: boolean = true;

  createNewTask() {
    if (this.taskCompletedForm.value === '') {
      this.completed = false;
    } else if (this.taskCompletedForm.value === 'false') {
      this.completed = false;
    } else if (this.taskCompletedForm.value === 'true') {
      this.completed = true;
    }

    if (!this.newUser) {
      this.onTaskCreated.emit(new Todo(0, String(this.taskNameForm.value), String(this.taskPropietaryForm.value), this.completed));
      this.onNewTaskCancelled.emit('not allowed');
    } else if (this.newUser) {
      console.log({
        title: String(this.taskNameForm.value), 
        completed: this.completed, 
        user: {user: String(this.newUserNameForm.value), 
        username: String(this.newUserUsernameForm.value), 
        password: String(this.newUserPasswordForm.value), 
        address: {
          street: String(this.newUserStreetForm.value), 
          city: String(this.newUserCityForm.value), 
          zipcode: String(this.newUserZipcodeForm.value), 
          country: String(this.newUserCountryForm.value)
        }
      }
    });
      this.onUserCreated.emit({
        title: String(this.taskNameForm.value), 
        completed: this.completed, 
        user: {user: String(this.newUserNameForm.value), 
        username: String(this.newUserUsernameForm.value), 
        password: String(this.newUserPasswordForm.value), 
        address: {
          street: String(this.newUserStreetForm.value), 
          city: String(this.newUserCityForm.value), 
          zipcode: String(this.newUserZipcodeForm.value), 
          country: String(this.newUserCountryForm.value)
        }
      }
    });
      this.onTaskCreated.emit();
      this.onNewTaskCancelled.emit('not allowed');
    }
  }

  cancelNewTask() {
    this.onNewTaskCancelled.emit('not allowed');
  }

  changeNewUser() {
    this.newUser = !this.newUser;
  }

  constructor() { }

  ngOnInit(): void {
    this.newUser = false;
  }

}
