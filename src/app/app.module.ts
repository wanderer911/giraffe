import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
//services
import { AdsService } from './ads.service';
import { AuthService } from './auth.service';

//components
import { AppComponent } from './app.component';
import { AdsListComponent } from './ads-list/ads-list.component';
import { AdDetailComponent } from './ad-detail/ad-detail.component';
import { AdCreateComponent } from './ad-create/ad-create.component';
import { AdEditComponent } from './ad-edit/ad-edit.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '', component: AdsListComponent
  },
  {
    path: 'edit', component: AdCreateComponent
  },
  {
    path: 'edit/:id', component: AdEditComponent
  },
  {
    path: ':id', component: AdDetailComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    AdsListComponent,
    AdDetailComponent,
    AdCreateComponent,
    AdEditComponent,
    UserComponent,

  ],
  imports: [
      BrowserModule,
      RouterModule.forRoot(routes)
  ],
  providers: [AuthService, AdsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
