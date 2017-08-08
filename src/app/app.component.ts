import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public currentUser: any;
  public usersList: any;

  constructor(private AS: AuthService,
    private router: Router) {
    AS.userObservable.subscribe(user => {
      this.currentUser = user;
    });

    AS.usersObservable.subscribe(usersList => {
      this.usersList = usersList;
    });
  }

  logout() {
    this.AS.logout();
    this.router.navigate(['/']);

  }
}
