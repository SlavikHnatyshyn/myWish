import { Component, OnDestroy, isDevMode } from '@angular/core';

// rxjs
import { of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

// interfaces
import { DatabaseParams } from '../interfaces/db.interface';
import { DatabaseService } from '../services/database.service';

import { environment } from '../../environments/environment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  private readonly onDestroy$: Subject<void>;
  public myWish: string | null;
  public spinner: boolean;
  constructor(
    private db: DatabaseService,
    private toastController: ToastController
  ) {
    this.onDestroy$ = new Subject();
    this.myWish = null;
    this.spinner = false;
  }

  getMyWish() {
    const params: DatabaseParams = { ...environment.russianTextConfig };
    this.spinner = true;
    return this.db.getData(params)
      .pipe(
        tap((response: { text: string[] }) => {
          if (!response || !response.text || response.text.length === 0) {
            this.spinner = false;
            return of(null);
          }
          this.myWish = this.getRandomString(response.text);
          this.spinner = false;
          this.presentToast({ message: this.myWish });
        }),
        catchError(err => {
          if (isDevMode()) {
            console.error(err);
          }
          this.spinner = false;
          return of(null);
        }),
        takeUntil(this.onDestroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  getRandomString(text: string[]): string {
    const randomIndex = Math.floor(Math.random() * text.length);
    return text[randomIndex];
  }

  async presentToast(toastOptions) {
    const options = {
      position: 'middle',
      color: 'secondary',
      buttons: [
        {
          text: 'Done',
          role: 'cancel',
        }
      ],
      ...toastOptions
    };
    const toast = await this.toastController.create({
      ...options,
    });
    await toast.present();
  }

}
