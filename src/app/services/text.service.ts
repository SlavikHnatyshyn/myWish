import { Injectable, isDevMode } from '@angular/core';
import { environment } from '../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { DatabaseParams } from '../interfaces/db.interface';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  constructor(private db: DatabaseService) { }

  getTextFromHTMLByElementId(id: string): Array<string> {
    const text = [];
    document.getElementById(id)
      .childNodes
      .forEach(item => {
        const stringOnly = item.textContent
          .trim()
          .replace(/\d+/g, '')
          .replace('.', '');
        text.push(stringOnly);
      });
    return text;
  }

  getRandomString(text: string[]): string {
    const randomIndex = Math.floor(Math.random() * text.length);
    return text[randomIndex];
  }

  getUserWish(language: string = 'ru'): Observable<string | null> {
    const params = this.getUserWishParams(language);
    return this.db.getData(params)
      .pipe(
        map((response: { text: string[] }) => {
          if (!response || !response.text || response.text.length === 0) {
            return of(null);
          }
          return this.getRandomString(response.text);
        }),
        catchError(err => {
          if (isDevMode()) {
            console.error(err);
          }
          return of(null);
        }),
      );
  }

  private getUserWishParams(language: string): DatabaseParams {
    if (language === 'en') {
      return {
        ...environment.englishTextConfig
      };
    }
    return {
      ...environment.russianTextConfig
    };
  }
}
