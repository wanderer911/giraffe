import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { AdsService } from '../ads.service';

@Component({
  selector: 'app-ad-create',
  templateUrl: './ad-create.component.html',
  styleUrls: ['./ad-create.component.css']
})
export class AdCreateComponent implements OnInit {
  public currentUser: any;
  public error: any;

  constructor(
    private router: Router,
    private AuthService: AuthService,
    private AdsService: AdsService
  ) {
    AuthService.userObservable.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
  }

  createAd(text, description) {
    //TODO validation
    this.AdsService.create(text, description, this.currentUser).then(ad => {
      this.router.navigate([`/${ad}`]);
    }).catch(err => {
      console.log(err);
    });
  }

}
