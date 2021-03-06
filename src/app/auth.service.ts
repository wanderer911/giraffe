﻿import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { Observable } from 'rxjs/Observable';
import { User } from './user';
import "rxjs/add/operator/take";

@Injectable()
export class AuthService {
  private user = new ReplaySubject<any>(1);//emit current user to new and old subsribers
  private users = new ReplaySubject<any>(1);//emit userslist to new and old subsribers
  public userObservable = this.user.asObservable();
  public usersObservable = this.users.asObservable();

  constructor() {
    //set
    this.users.next(JSON.parse(localStorage.getItem('users')) || []);
    this.user.next(JSON.parse(localStorage.getItem('currentUser')) || false);
  }

  login(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.usersObservable.take(1).subscribe(usersList => {
        for (let i = 0; i <= usersList.length; i++) {
          if (i == usersList.length) {
            //no matches. create new
			      i+=2;//prevent infinite loop
            this.createuser({ 'username': username, 'password': password })
              .then(() => { resolve('user succesfully created'); });
          }
          else if (usersList[i].username == username && usersList[i].password == password) {
            localStorage.setItem('currentUser', JSON.stringify(usersList[i]));
            this.user.next(usersList[i]);//emit current user
            resolve('succesfully loged in');
			      break;
          }
          else if (usersList[i].username == username && usersList[i].password != password) {
            reject(new Error('wrong password'));
			      break;
          }
          else {
			      continue;
          }
        }
      });
    });
  }

  createuser(user: User):Promise<string> {
    return new Promise((resolve, reject) => {
      this.usersObservable.take(1).subscribe((usersList: Array<User>) => {
        usersList.push(user);
        localStorage.setItem('users', JSON.stringify(usersList));
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.users.next(usersList);//emit userlist
        this.user.next(user);//emit current user
        resolve('created');
      });
    });
  }

  logout():void {
    localStorage.removeItem('currentUser');
    this.user.next(false);
  }
}
