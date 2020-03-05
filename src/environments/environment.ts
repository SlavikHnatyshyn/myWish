// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCx7_F0XTNimYxMKXbIbETKtIqkJSZckIU',
    authDomain: 'mywish-86124.firebaseapp.com',
    databaseURL: 'https://mywish-86124.firebaseio.com',
    projectId: 'mywish-86124',
    storageBucket: 'mywish-86124.appspot.com',
    messagingSenderId: '295486358826',
    appId: '1:295486358826:web:de1b601b7a4a6804ce4a53',
    measurementId: 'G-BZ7MXNYW5W'
  },
  russianTextConfig: {
    collection: 'wishes-russian',
    docId: 'russian-text'
  },
  englishTextConfig: {
    collection: 'wishes-english',
    docId: 'english-text'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
