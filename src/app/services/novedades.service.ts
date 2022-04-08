import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { NovedadreporteI } from '../models/novedadreporte.interface';

@Injectable({
  providedIn: 'root'
})
export class NovedadesService {

  private novedadCollection: AngularFirestoreCollection<NovedadreporteI>;
  private novedades: Observable<NovedadreporteI[]>;

  constructor(private afs: AngularFirestore) {
    this.novedadCollection = afs.collection<NovedadreporteI>('novedadjunio');
    this.novedades = this.novedadCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }

  getNovedades(): Observable<NovedadreporteI[]> {
    return this.novedades;
  }

  getNovedad(numeroCuenta: string): Observable<NovedadreporteI> {
    console.log(numeroCuenta);
    return this.novedadCollection.doc<NovedadreporteI>(numeroCuenta).valueChanges().pipe(
      take(1),
      map(user => {
        user.numeroCuenta = numeroCuenta;
        return user;
      })
    );
  }

  getNovedadSave(){
    return firebase.default.database().ref('/novedadjunio').once('value');
  }

  addNovedad(novedadAdd: NovedadreporteI): Promise<DocumentReference> {
    return this.novedadCollection.add(novedadAdd);
  }
  
}