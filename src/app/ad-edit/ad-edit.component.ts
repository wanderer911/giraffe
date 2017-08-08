import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AdsService } from '../ads.service';

@Component({
  selector: 'app-ad-edit',
  templateUrl: './ad-edit.component.html',
  styleUrls: ['./ad-edit.component.css']
})
export class AdEditComponent implements OnInit {
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

  editAd(title, description) {
    this.AdsService.editById(this.route.snapshot.params['id'], title, description)
      .then(() => {
        this.router.navigate([`/${this.ad.$id}`]);
      }).catch(err => {
        if (err) {
          this.error = err;
        }
      });
  }

}
