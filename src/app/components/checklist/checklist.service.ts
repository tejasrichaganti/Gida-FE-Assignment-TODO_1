import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ToDos } from '../../models/ToDos';

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) {}

  getToDOs(): Observable<ToDos[]> {
    return this.http.get<ToDos[]>(this.apiUrl).pipe(
      map((resp: ToDos[]) => {
        return resp;
      })
    );
  }

  addNewTasks(task: ToDos): Observable<ToDos> {
    return this.http.post<ToDos>(this.apiUrl, task).pipe(
      map((res) => {
        let taskItemsList: ToDos[] = JSON.parse(
          localStorage.getItem('todos') || '[]'
        );
        if (!res.id || taskItemsList.some(item => item.id === res.id)) {
          res.id = this.generateUniqueId(taskItemsList);
        }
        taskItemsList.unshift(res);
        // console.log(res);
        // console.log(taskItemsList);
        localStorage.setItem('todos', JSON.stringify(taskItemsList));
        return res;
      }),
      catchError((error) => {
        console.error('Error adding task:', error);
        return throwError(error);
      })
    );
  }
  updateTodo(task: ToDos): Observable<ToDos> {

    const url = `${this.apiUrl}/${task.id}`;
    console.log(url);
    return this.http.put<ToDos>(url, task).pipe(
      tap((res) => {
        let taskItemsList: ToDos[] = JSON.parse(localStorage.getItem('todos') || '[]');
        if (task.completed) {
          taskItemsList = taskItemsList.filter((item) => item.id !== task.id);
          // console.log(taskItemsList);
        }
        localStorage.setItem('todos', JSON.stringify(taskItemsList));
        return res;
      }),
      catchError((error) => {
        console.error('Error adding task:', error);
        return throwError(error);
      })
    );
  }

  deleteTodo(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }



  generateUniqueId(tasks: ToDos[]): number {
    let newId = 1;
    while (tasks.some(item => item.id === newId)) {
      newId++;
    }
    return newId;
  }
}
