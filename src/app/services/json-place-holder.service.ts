import { TodoModel } from './jsonplaceholder/models/todo.model';
import { environment } from '../../environments/environment';
import { UserModel } from './jsonplaceholder/models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceHolderService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getUsers(): Observable<UserModel> {
    return this._httpClient.get(`${environment.apis.jsonplaceholder.url}/users`)
      .pipe(
        map(
          (response: any) => response.map((x: any) => (new UserModel(x.id, x.name, x.username, x.email, x.phone)))
        )
      );
  }

  public getTodos(userId: number): Observable<TodoModel> {
    return this._httpClient.get(`${environment.apis.jsonplaceholder.url}/todos?userId=${userId}`)
      .pipe(
        map(
          (response: any) => response.map((x: any) => (new TodoModel(x.userId, x.id, x.title, x.completed)))
        )
      );
  }
}
