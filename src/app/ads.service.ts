import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { Observable } from 'rxjs/Observable';
import { Ad } from './ad';
import { User } from './user';
import "rxjs/add/operator/take";


@Injectable()
export class AdsService {
  private ads = new ReplaySubject<any>(1);
  public adsObservable = this.ads.asObservable();

  constructor() {
    this.ads.next(JSON.parse(localStorage.getItem('ads')) || []);
  }

  create(text:string, description:string, user:User): Promise<any> {
    return new Promise((resolve, reject) => {
      this.adsObservable.take(1).subscribe((adsList: Array<Ad>) => {
        let ad: Ad = {
          $id: Math.floor((Math.random() * 1000000) + 1),
          created_at: new Date(),
          author: user.username,
          title: text,
          description: description,
        }; 
        adsList.push(ad);
        localStorage.setItem('ads', JSON.stringify(adsList));
        this.ads.next(adsList);
        resolve(ad.$id);
      });
    });
  }

  getAdById(id:string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.adsObservable.take(1).subscribe((adsList: Array<Ad>) => {
        let myAd: Array<Ad> = adsList.filter((ad:Ad) => {
          return ad.$id == parseInt(id);
        });
        myAd.length > 0 ? resolve(myAd[0]) : reject(new Error('wrong id'));
      });
    });
  }

  deleteById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.adsObservable.take(1).subscribe((adsList: Array<Ad>) => {
        //filter for id
        let filteredList: Array<Ad> = adsList.filter((ad:Ad) => {
          return ad.$id != parseInt(id);
        });
        //if filtered list< old list. then delete was succesful 
        if (adsList.length > filteredList.length) {
          localStorage.setItem('ads', JSON.stringify(filteredList));
          this.ads.next(filteredList);
          resolve(`deleted id ${id}`);
        }
        else {
          reject(new Error('wrong id'));
        }
      });
    })
  }

  editById(id: string, title: string, description: string){
    return new Promise((resolve, reject) => {
      this.adsObservable.take(1).subscribe((adsList: Array<Ad>) => {
        let edited = false;
        let newList: Array<Ad> = adsList.map((ad: Ad) => {
          if (ad.$id == parseInt(id)) {
            ad.title = title;
            ad.description = description;
            edited = true;
          }
          return ad;   //return for map
        });
        if (edited) {
          localStorage.setItem('ads', JSON.stringify(newList));
          this.ads.next(newList);
          resolve('edited');
        }
        else {
          reject(new Error('wrong id'));
        }
      });
    });
  }

}
