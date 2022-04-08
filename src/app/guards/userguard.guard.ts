import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserguardGuard implements CanActivate {
  constructor(
    private router: Router,
    private _login: LoginService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) { }

  canActivate() {
    if (!this.cookieService.get('token')) {
      this.router.navigate(['']).then(res=>{
        this.toastError("Inicio de sesión requerido");
        this.cookieService.deleteAll();
      });
      return false;
    } else {
      return true;
    }
  }
  
  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje + '!!!', 'Advertencia', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
