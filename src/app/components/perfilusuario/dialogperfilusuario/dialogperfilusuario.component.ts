import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialogperfilusuario',
  templateUrl: './dialogperfilusuario.component.html',
  styleUrls: ['./dialogperfilusuario.component.css']
})
export class DialogperfilusuarioComponent implements OnInit {


  foto: string = '';

  
  constructor(private _cookie: CookieService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this._cookie.deleteAll();
    this.router.navigate(['']).then(res=>{
      this.toastSuccess("Sesión cerrada exitosamente");
    });
  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 4500,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
