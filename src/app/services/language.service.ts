import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor() { }

  getUserLanguage(): string {
    const language = window.navigator.language;
    if (language && language === 'en-US') {
      return 'en';
    }

    return 'ru';
  }
}
