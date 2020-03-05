// angular
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

// rxjs
import { Observable } from 'rxjs';

// ngx-translate
import { TranslateService } from '@ngx-translate/core';

// services
import { LanguageService } from '../services/language.service';
import { TextService } from '../services/text.service';
import { tap } from 'rxjs/operators';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public userWish$: Observable<string | null>;
  public spinner: boolean;
  public userLanguage: FormControl;
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService,
    private textService: TextService,
    private db: DatabaseService
  ) {
    this.spinner = false;
    this.setUserLanguage();
  }

  ngOnInit() { }

  public getMyWish() {
    this.spinner = true;
    this.userWish$ = this.textService.getUserWish(this.userLanguage.value)
      .pipe(
        tap(() => {
          this.spinner = false;
        })
      );
  }

  public onLanguageChange() {
    const userLanguage = this.userLanguage.value;
    this.translate.use(userLanguage);
  }

  private setUserLanguage() {
    const userLanguage = this.languageService.getUserLanguage();
    this.userLanguage = new FormControl(userLanguage);
    this.translate.setDefaultLang(userLanguage);
  }

  // workWithText() {
  //   const text = this.textService.getTextFromHTMLByElementId('myText');
  //   const params = { ...environment.englishTextConfig, data: { text } };
  //   this.db.writeData(params).catch(console.log);
  // }

}
