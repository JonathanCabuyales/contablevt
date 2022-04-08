import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CatastroI } from '../models/catastros.interface';

@Injectable({
  providedIn: 'root'
})
export class CatastrosService {

  baseUrl = environment.baseUrl;
  resultado: any;
  
  constructor(private http: HttpClient) { }

  getAll(){
    this.resultado = this.http.get(`${this.baseUrl}/emapa/catastros_get.php`);
    return this.resultado;
  }

  getNombres(){
    this.resultado = this.http.get(`${this.baseUrl}/emapa/medidor_get.php`);
    return this.resultado;
  }

  
}
