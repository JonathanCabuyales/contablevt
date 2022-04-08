import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CatastroI } from '../models/catastros.interface';
import { FacturaclienteI } from '../models/facturacliente.interface';

@Injectable({
  providedIn: 'root'
})
export class CatastrosfireService {

  private catastroCollection: AngularFirestoreCollection<CatastroI>;
  private catastros: Observable<CatastroI[]>;

  constructor(private afs: AngularFirestore) {
    this.catastroCollection = afs.collection<CatastroI>('catstros'), ref => ref.orderBy('fechaCreateAt');
    // , ref => ref.orderBy('fechaCorte')
    this.catastros = this.catastroCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }

  getcATASTRO(): Observable<CatastroI[]> {
    return this.catastros;
  }

}
