import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';

import { Todo } from '../task.model';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {
  a: any;
  foundItem: any;
  newAddress: any;
  tasks: Todo[] = [];
  result : any[] = [];
  newTaskChoice: string = 'not allowed';
  filterControl = new FormControl('');
  @Output() taskSent = new EventEmitter<Todo>();
  indexedItem: Todo = new Todo(0,"Please select a task to see its details","",false);

  constructor(private http: HttpClient) {}

  onLoadData() {
    this.tasks.splice(0,this.tasks.length);
      this.http.get("http://localhost:8000/todos/all")
      .pipe(map(responseData => {
        if (responseData !== null) {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              this.foundItem = { ...responseData[key as keyof Object], loop: key};
              if (this.foundItem !== null) {
                this.tasks.push(new Todo(this.foundItem.id, this.foundItem.title, this.foundItem.user.username, this.foundItem.completed));
              }
            }
          }
        }
      }))
      .subscribe(posts => {
    });
  }

  filterByUsername() {
    if (this.filterControl.value !== '') {
      this.tasks = [];
    this.http.get('http://localhost:8000/users/all')
    .pipe(map(responseData => {
      for (const key in responseData) {
        this.a = { ...responseData[key as keyof Object], loop: key};
        if (this.a.username === this.filterControl.value) {
          this.http.get('http://localhost:8000/users/' + this.a.id + '/todos')
          .pipe(map(responseData => {
            for (const key in responseData) {
              this.foundItem = { ...responseData[key as keyof Object], loop: key};
              if (this.foundItem !== null) {
                this.tasks.push(new Todo(this.foundItem.id, this.foundItem.title, this.foundItem.user.username, this.foundItem.completed));
              }
            }
          })).subscribe()
        }
      }
    }))
    .subscribe();
    } else {
      this.onLoadData();
    }
  }

  onNewTaskButtonPressed(choice: string) {
    this.newTaskChoice = choice;
  }

  addNewTask(newTask: Todo) {
    this.http.get('http://localhost:8000/users/all')
    .pipe(map(response => {
      for (const key in response) {
        this.a = { ...response[key as keyof Object], loop: key};
        if (this.a.username === newTask.getPropietary()) {
          this.http.post<any>('http://localhost:8000/users/' + this.a.id + '/todos/add', 
          {title: newTask.getName(), completed: newTask.isCompleted()})
          .subscribe(result => {
            this.tasks.push(new Todo(result.id, result.title, result.user.username, result.completed));
          });
        }
      }
    })).subscribe();
  }

  addNewUser(eventData: {title: string, completed: boolean, user: 
    {user: string, username: string, password: string, address: 
      {street: string, city: string, zipcode: string, country: string}}}) {
    this.http.post<any>('http://localhost:8000/address/add', eventData.user.address)
    .subscribe(result => {
      this.http.post<any>('http://localhost:8000/users/add', 
      {name: eventData.user.user, username: eventData.user.username, password: eventData.user.password, address: result})
      .subscribe(result => {
        this.http.post<any>('http://localhost:8000/users/' + result.id + '/todos/add', eventData)
        .subscribe(result => {
          this.tasks.push(new Todo(result.id, result.title, result.user.username, result.completed));
        });
      });
    });
  }

  taskCreationCancelled(cancelled: string) {
    this.newTaskChoice = cancelled;
  }

  editTaskOnDataSource(editedTask: Todo) {
    this.http.get('http://localhost:8000/users/all')
    .pipe(map(response => {
      for (const key in response) {
        this.a = { ...response[key as keyof Object], loop: key};
        if (this.a.username === editedTask.getPropietary()) {
          this.http.get('http://localhost:8000/users/' + this.a.id + '/todos')
          .pipe(map(response => {
            for (const key in response) {
              this.foundItem = { ...response[key as keyof Object], loop: key};
              if (this.foundItem.id === editedTask.getId()) {
                this.http.put('http://localhost:8000/users/' + this.a.id + '/todos/edit', 
                {id: this.foundItem.id, title: editedTask.getName(), completed: editedTask.isCompleted(), user: this.a})
                .subscribe();
              }
            }
          }))
          .subscribe();
        } else {
          this.http.get('http://localhost:8000/users/' + this.a.id + '/todos')
          .pipe(map(response => {
            for (const key in response) {
              this.foundItem = { ...response[key as keyof Object], loop: key};
              if (this.foundItem.id === editedTask.getId()) {
                this.http.delete('http://localhost:8000/todos/' + this.foundItem.id + '/delete')
                .subscribe(response => {
                  this.http.post('http://localhost:8000/users/' + this.foundItem.user.id + '/todos/add', 
                  {id: editedTask.getId(), title: editedTask.getName(), completed: editedTask.isCompleted(), user: this.foundItem.user})
                  .subscribe();
                });
              }
            }
          })).subscribe()
        }
      }})).subscribe();
  }

  deleteTaskOnDataSource(eventData: Todo) {
    if (eventData.getId() !== 0) {
      if(confirm("Are you sure you want to delete this To-Do?")) {
        this.tasks.splice(eventData.getId()-1, 1);
        this.http.delete('http://localhost:8000/todos/' + eventData.getId() + '/delete').subscribe();
      }
      this.onLoadData();
    }
  }

  gatherIndex(receivedIndex: number) {
    this.newTaskChoice = 'not allowed';
    this.indexedItem = this.tasks[receivedIndex];
  }

  ngOnInit(): void {
    this.onLoadData();
    this.tasks.sort();
  }
}
