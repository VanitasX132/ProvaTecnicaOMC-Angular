import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Todo } from '../task.model';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  @Input() task: Todo = new Todo(0,"","",false);
  @Input() index: number = 0;

  @Output() indexGiven = new EventEmitter<number>();

  onTaskClicked() {
    this.indexGiven.emit(this.index);

  }

  constructor() { }

  ngOnInit(): void {
  }

}
