import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FacturaclienteI } from '../models/facturacliente.interface';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private facturaCollection: AngularFirestoreCollection<FacturaclienteI>;
  private facturas: Observable<FacturaclienteI[]>;

  constructor(private afs: AngularFirestore) {
    this.facturaCollection = afs.collection<FacturaclienteI>('factura'), ref => ref.orderBy('fechaCorte');
    // , ref => ref.orderBy('fechaCorte')
    this.facturas = this.facturaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }

  getNovedades(): Observable<FacturaclienteI[]> {
    return this.facturas;
  }

  getAllNovedades() {
    this.facturaCollection = this.afs.collection<FacturaclienteI>('factura', ref => ref.orderBy('fechaCorte'));
    this.facturas = this.facturaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }

  addNovedad(facturaAdd: FacturaclienteI): Promise<DocumentReference> {
    return this.facturaCollection.add(facturaAdd);
  }

}
