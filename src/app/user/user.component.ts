import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

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

  
  login(username, password) {
    if (!username || !password) {
      this.error = "Username and password fields cannot be empty";
      return false;
    }
    this.AS.login(username, password)
      .then(msg => {
        console.log(msg);
      }).catch(err => {
        console.log(err);
        this.error = err;
      });
    return false;
  }

}
