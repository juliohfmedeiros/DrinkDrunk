import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CocktailsService {
  private user: User = new User('José Pequeno', new Date(2000,0,1), 'algures');
  private readonly localstorageUserKey = 'user';

  public userSubject: BehaviorSubject<User>;

  constructor() {
    this.user =
    localStorage.getItem(this.localstorageUserKey) === null
    ? this.user 
    : JSON.parse(localStorage.getItem(this.localstorageUserKey));
    this.userSubject = new BehaviorSubject<User>(this.user);
  }

  private streamUpdatedUser(): void {
    this.userSubject.next(this.user);
  }

  private saveUser(): void {
    localStorage.setItem(
      this.localstorageUserKey, JSON.stringify(this.user)
    );
  }

  public editUser(editedUser: User): void {
    this.user = editedUser;
    this.streamUpdatedUser();
    this.saveUser();
  }
}
