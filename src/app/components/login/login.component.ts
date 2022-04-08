import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any[];

  user: string = '';
  password: string = '';
  passwordConfirm: string = '';

  constructor(private router: Router,
    private _login: LoginService,
    private cookieService: CookieService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  enter() {

    this.cookieService.deleteAll();


    if (this.user == '' || this.password == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar la información para continuar'
      });
      this.cookieService.deleteAll();

    } else {

      this._login.login(this.user, this.password).subscribe(res=>{
        
        if (res.status == 'success'){
                    
          this.router.navigate(['home/dashboard']);          
          this.cookieService.set('token', res.access_token);

          this.toastSuccess("Hola de nuevo " + res.username);

        } else {
          Swal.fire({
            icon: 'warning',
            confirmButtonColor: '#1d1d24',
            text: 'Usuario o Contraseña incorrectos.'
          });
          this.cookieService.deleteAll();
          this.router.navigate(['']);
        }

      });
    }

  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Sesión Iniciada', {
      timeOut: 3000,
    });
  }

}
