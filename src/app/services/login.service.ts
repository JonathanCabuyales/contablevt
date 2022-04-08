import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;
  resultado: any;

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(private http: HttpClient,
    private router: Router) { }

  getUser(usuario: any){
    this.resultado = this.http.get(`${this.baseUrl}/login/user_get.php?usuario=${usuario}`);
    return this.resultado;
  }

  login(usuario: any, password: any){
    this.resultado = this.http.get(`${this.baseUrl}/login/login.php?usuario=${usuario}&password=${password}`);
    return this.resultado;
  }

  getuserdata(token: any){
    this.resultado = this.http.get(`${this.baseUrl}/login/login_data_get.php?token=${token}`);
    return this.resultado;
  }
  
}