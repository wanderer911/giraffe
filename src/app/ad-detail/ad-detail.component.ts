import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AdsService } from '../ads.service';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.component.html',
  styleUrls: ['./ad-detail.component.css']
})
export class AdDetailComponent implements OnInit {
  public currentUser: any;
  public error: any;
  public ad: any;

  constructor(
    private AuthService: AuthService,
    private AdsService: AdsService,
    public route: ActivatedRoute,
    private router: Router
  ) {
    AuthService.userObservable.subscribe(user => {
      this.currentUser = user;
    });
    AdsService.getAdById(route.snapshot.params['id']).then(ad => {
      this.ad = ad;
    }).catch(err => {
      if (err) {
        this.error = err;
      }
    })
  }

  ngOnInit() {
  }

  delete(id) {
    this.AdsService.deleteById(id).then(() => {
      this.router.navigate(['/']);
    }).catch(err => {
      this.error = err;
    });
  }

}
