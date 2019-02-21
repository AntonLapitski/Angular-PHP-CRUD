import {Injectable} from '@angular/core';
import {ToDo} from '../interfaces/to-do';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError as observableThrowError} from 'rxjs';

const API_URL = 'http://localhost:8000/api/';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  todoTitle: string = '';
  idForTodo: number = 4;
  beforeEditCache: string = '';
  filter: string = 'all';
  anyRemainingModel: boolean = true;
  todos: ToDo[] = [];

  constructor(private http: HttpClient) {
    this.todos = this.getToDos();
  }

  getToDos(): ToDo[] {
    this.http.get(API_URL + 'getData.php')
      .pipe(catchError(this.errorHandler))
      .subscribe((response: any) => {
        this.todos = response;
      });
    return this.todos;
  }

  errorHandler(error: HttpErrorResponse) {
    return observableThrowError(error.message || 'Something went wrong!');
  }


  addToDo(todoTitle: string): void {
    if (todoTitle.trim().length === 0) {
      return;
    }

    this.http.get(API_URL + 'add.php?title=' + todoTitle).subscribe((response: any) => {
      this.todos.push({
        id: response.id,
        title: todoTitle,
        completed: false,
        editing: false
      });

    });


    this.idForTodo++;
  }

  editTodo(todo: ToDo): void {
    this.beforeEditCache = todo.title;
    todo.editing = true;
  }

  doneEdit(todo: ToDo): void {
    if (todo.title.trim().length === 0) {
      todo.title = this.beforeEditCache;
    }

    this.anyRemainingModel = this.anyRemaining();
    todo.editing = false;

    this.http.get(API_URL + 'update.php?id=' + todo.id + '&' + 'title=' + todo.title)
      .subscribe((response: any) => {
        // this.todos = this.todos.filter(todo => todo.id !== id);
      });
  }

  cancelEdit(todo: ToDo): void {
    todo.title = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);

    this.http.delete(API_URL + 'delete.php?id=' + id)
      .subscribe((response: any) => {
        this.todos = this.todos.filter(todo => todo.id !== id);
      });

  }

  remaining(): number {
    return this.todos.filter(todo => !todo.completed).length;
  }

  atLeastOneCompleted(): boolean {

    return this.todos.filter(todo => todo.completed).length > 0;
  }


  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  checkAllTodos(): void {
    this.todos.forEach(todo => todo.completed = (<HTMLInputElement>event.target).checked)
    this.anyRemainingModel = this.anyRemaining();
  }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  todosFiltered(): ToDo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }
}
