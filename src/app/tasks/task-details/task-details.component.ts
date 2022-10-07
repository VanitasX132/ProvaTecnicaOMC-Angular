import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Todo } from '../task.model';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  checked: boolean = false;
  editable: boolean = true;
  completed: boolean = false;
  taskNameForm = new FormControl('');
  taskPropietaryForm = new FormControl('');
  taskCompletedForm = new FormControl('');
  dataToDisplay: Todo = new Todo(0, "", "", false);
  @Input() indexedItem: Todo = new Todo(0,"","",false);
  @Output() editedTask = new EventEmitter<Todo>();

  checkIfCompleted() {
    this.completed = this.indexedItem.isCompleted();
  }

  onEditButtonClick() {
    this.checkIfCompleted();
    this.editable = !this.editable;
    this.taskNameForm.setValue(this.indexedItem.getName());
    this.taskPropietaryForm.setValue(this.indexedItem.getPropietary());
    this.taskCompletedForm.setValue(String(this.completed));
    console.log(this.taskCompletedForm.value);
  }

  onSaveEditButtonClick() {
    this.indexedItem.setName(String(this.taskNameForm.value));
    this.indexedItem.setPropietary(String(this.taskPropietaryForm.value));
    this.indexedItem.setCompleted(Boolean(this.taskCompletedForm.value));
    this.editedTask.emit(this.indexedItem);
    this.editable = true;
  }

  constructor() { }

  ngOnInit(): void {
    this.checkIfCompleted();
  }

}
