// angular
import { Component, OnDestroy, isDevMode } from '@angular/core';
import { FormControl } from '@angular/forms';

// ionic
import { ToastController } from '@ionic/angular';

// rxjs
import { of, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';

// ngx-translate
import { TranslateService } from '@ngx-translate/core';

// interfaces
import { DatabaseParams } from '../interfaces/db.interface';

// services
import { DatabaseService } from '../services/database.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  private readonly onDestroy$: Subject<void>;
  public myWish: string | null;
  public spinner: boolean;
  public userLanguage: FormControl;
  constructor(
    private db: DatabaseService,
    private toastController: ToastController,
    private translate: TranslateService
  ) {
    this.onDestroy$ = new Subject();
    this.myWish = null;
    this.spinner = false;
    this.userLanguage = new FormControl(null);
    this.setUserLanguage();
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
      duration: 4000,
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
      ...options
    });
    await toast.present();
  }

  getUserLanguage(): string {
    const language = window.navigator.language;
    if (language && language === 'en-US') {
      return 'en';
    }

    return 'ru';
  }

  setUserLanguage() {
    const userLanguage = this.getUserLanguage();
    this.userLanguage = new FormControl(userLanguage);
    this.translate.setDefaultLang(userLanguage);
  }

  onLanguageChange() {
    const userLanguage = this.userLanguage.value;
    this.translate.use(userLanguage);
  }

}
