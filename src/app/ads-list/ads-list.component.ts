import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AdsService } from '../ads.service';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit {
  public currentUser: any;
  public ads: any;
  public error: any;

  constructor(
    private AuthService: AuthService,
    private AdsService: AdsService
  ) {
    AuthService.userObservable.subscribe(user => {
      this.currentUser = user;
    });
    AdsService.adsObservable.subscribe(ads => {
      this.ads = ads;
    });
  }

  ngOnInit() {
  }

  delete(id) {
    this.AdsService.deleteById(id).then(() => {
      console.log('deleted');
    }).catch(err => {
      this.error = err;
    });
  }
}
