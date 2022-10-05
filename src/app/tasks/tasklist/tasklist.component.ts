import { Component, OnInit } from '@angular/core';
import { Task } from '../task.model';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

  tasks: Task[] = [];

  constructor() { }

  public generateDummyData(): void {
    this.tasks = [new Task(1,"Task1", "User1", true),
    new Task(2,"Task2", "User1", false),
    new Task(3,"Task3", "User2", true),
    new Task(4,"Task4", "User2", false),
    new Task(5,"Task5", "User3", false),
    new Task(6,"Task6", "User3", true)];
  }

  ngOnInit(): void {
    this.generateDummyData();
  }

}
