import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseParams } from '../interfaces/db.interface';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private db: AngularFirestore) { }

  writeData(params: DatabaseParams) {
    const { collection, docId, data } = params;
    return this.db.collection(collection).doc(docId).set(data, { merge: true });
  }

  getData(params: DatabaseParams) {
    const { collection, docId } = params;
    return this.db.collection(collection).doc(docId).valueChanges();
  }
}
