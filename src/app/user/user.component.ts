import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public currentUser: any;
  public error: any;
  public usersList: any;

  constructor(private AS: AuthService) {
    AS.userObservable.subscribe(user => {
      this.currentUser = user;
    });

    AS.usersObservable.subscribe(usersList => {
      this.usersList = usersList;
    })
  }

  ngOnInit() {
  }


  login(username: string, password: string): boolean {
    if (!username || !password) {
      this.error = "Username and password fields cannot be empty";
      return false;
    }
    this.AS.login(username, password)
      .then((msg:string) => {
        console.log(msg);
      }).catch((err: Error) => {
        this.error = err;
      });
    return false;
  }

}
