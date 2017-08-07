import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject'
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/take";


@Injectable()
export class AdsService {
  private ads = new ReplaySubject<any>(1);
  public adsObservable = this.ads.asObservable();

  constructor() {
    this.ads.next(JSON.parse(localStorage.getItem('ads')) || []);
  }

  create(text, description, user) {
    return new Promise((resolve, reject) => {
      this.adsObservable.take(1).subscribe(adsList => {
        let ad = {
          //TODO need to test for different $id and created_at values
          $id: Math.floor((Math.random() * 1000000) + 1),
          created_at: new Date(),
          author: user.username,
          text: text,
          description: description,
        }; 
        adsList.push(ad);
        localStorage.setItem('ads', JSON.stringify(adsList));
        this.ads.next(adsList);
        resolve(ad);
      });
    });
  }

  getAdById(id) {
    return new Promise((resolve, reject) => {
      this.adsObservable.take(1).subscribe(adsList => {
        let myAd = adsList.filter(ad => {
          return ad.$id == id;
        });
        myAd.length > 0 ? resolve(myAd[0]) : reject(new Error('wrong id'));
      });
    });
  }

  deleteById(id) {
    return new Promise((resolve, reject) => {
      this.adsObservable.take(1).subscribe(adsList => {
        let filteredList = adsList.filter(ad => {
          return ad.$id != id;
        });
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

  editById(id, text, description) {
    return new Promise((resolve, reject) => {
      this.adsObservable.take(1).subscribe(adsList => {
        let edited;
        let newList = adsList.map(ad => {
          if (ad.id == id) {
            ad.text = text;
            ad.description = description;
            edited = true;
          }
          return ad;
        });
        if (edited) {
          resolve('edited');
        }
        else {
          reject(new Error('wrong id'));
        }
      });
    });
  }

}
