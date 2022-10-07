import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Todo } from '../task.model';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {
  tasks: Todo[] = [];
  indexToDetails = { index: 0 };
  indexedItem: Todo = new Todo(0,"","",false);
  newTaskChoice: string = 'not allowed';

  @Output() taskSent = new EventEmitter<Todo>();

  constructor() { }

  onNewTaskButtonPressed(choice: string) {
    this.newTaskChoice = choice;
  }

  addNewTask(newTask: Todo) {
    newTask.setId(this.tasks.length+1);
    this.tasks.push(newTask);
  }

  taskCreationCancelled(cancelled: string) {
    this.newTaskChoice = cancelled;
  }

  editTaskOnDataSource(editedTask: Todo) {
    this.tasks[editedTask.getId()-1] = editedTask;
  }

  generateDummyData(): void {
    this.tasks = [new Todo(1,"Task1", "User1", true),
    new Todo(2,"Task2", "User1", false),
    new Todo(3,"Task3", "User2", true),
    new Todo(4,"Task4", "User2", false),
    new Todo(5,"Task5", "User3", false),
    new Todo(6,"Task6", "User3", true)];
  }

  gatherIndex(receivedIndex: number) {
    this.indexToDetails.index = receivedIndex;
    this.indexedItem = this.tasks[this.indexToDetails.index];
  }

  ngOnInit(): void {
    this.generateDummyData();
  }

}
