import { TodoModel } from './../../services/jsonplaceholder/models/todo.model';
import { JsonPlaceHolderService } from '../../services/json-place-holder.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/services/jsonplaceholder/models/user.model';

@Component({
  selector: 'app-consume-api',
  templateUrl: './consume-api.component.html',
  styleUrls: ['./consume-api.component.css']
})
export class ConsumeApiComponent implements OnInit {

  public users: UserModel[];
  public userSelected: UserModel;
  public todos: TodoModel[];

  constructor(
    private _jsonPlaceHolderService: JsonPlaceHolderService
  ) { }

  ngOnInit(): void {
    this._jsonPlaceHolderService.getUsers()
      .subscribe((users: any) => {
        this.users = users;

        if (this.users !== undefined && this.users !== null && this.users.length > 0) {
          this.userSelected = this.users[0];
          this._selectUser(this.userSelected.id);
        }
      });
  }

  public selectedUser(user: UserModel): void {
    this.userSelected = user;
    this._selectUser(this.userSelected.id);
  }

  private _selectUser(userId: number): void {
    this._jsonPlaceHolderService.getTodos(userId)
      .subscribe((todos: any) => {
        this.todos = todos;
      });
  }

}
