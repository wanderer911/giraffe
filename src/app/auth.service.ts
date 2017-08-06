import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/take";

@Injectable()
export class AuthService {
  private user = new Subject<any>();
  private users = new Subject<any>();
  public userObservable = this.user.asObservable();
  public usersObservable = this.users.asObservable();

  constructor() {
    //set
    this.users.next(JSON.parse(localStorage.getItem('users')) || []);
    this.user.next(JSON.parse(localStorage.getItem('currentUser')) || false);
  }

  login(username: string, password: string):Promise<string> {
    return new Promise((resolve, reject)=> {
      this.users.forEach(user => {
        if (user.username == username && user.password == password) {
          resolve('succesfully loged in');
        }
        else if (user.username == username && user.password != password) {
          reject('wrong password');
        }
        else {
        }
      });
      this.createuser({ 'username': username, 'password': password })
        .then(() => { resolve('user succesfully created'); });

    });
  }

  createuser(user):Promise<string> {
    return new Promise((resolve, reject) => {
      this.usersObservable.take(1).subscribe(usersList => {
        usersList.push(user);
        localStorage.setItem('users', JSON.stringify(this.users));
        this.users.next(usersList);
        this.user.next(user);
        resolve('created');
      });
    });
  }

  logout():void {
    localStorage.removeItem('currentUser');
    this.user.next(false);
  }
}
