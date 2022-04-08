import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DiagloproyeccionesComponent } from 'src/app/components/proyeccion/diagloproyecciones/diagloproyecciones.component';
import { DialogmisproyeccionesComponent } from 'src/app/components/proyeccion/dialogmisproyecciones/dialogmisproyecciones.component';
import { DialogrendimientoproyectoComponent } from 'src/app/components/proyeccion/dialogrendimientoproyecto/dialogrendimientoproyecto.component';
import { AmortizacionI } from 'src/app/models/amortizacion.interface';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proyeccion',
  templateUrl: './proyeccion.component.html',
  styleUrls: ['./proyeccion.component.css']
})
export class ProyeccionComponent implements OnInit {

  @ViewChild('calculoproyeccion', { static: false }) calculoproyeccion: DialogrendimientoproyectoComponent;
  @ViewChild('proyecciones', { static: false }) proyecciones: DiagloproyeccionesComponent;
  @ViewChild('misproyecciones', { static: false }) misproyecciones: DialogmisproyeccionesComponent;
  
  active = 0;

  token: string = '';

  proyeccion: AmortizacionI;

  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  usuario: string;
  rol: string;
  foto: string = '';

  constructor(private _login: LoginService,
    private _cookie: CookieService) { }

  ngOnInit() {

    this.token = this._cookie.get("token");

    this._login.getuserdata(this.token).subscribe(res=>{
      this.usuario = res.data.usuario;
      this.rol = res.data.rol;
      this.foto = res.data.foto;      
    });

    this.proyeccion = {
      valorPrestamo: 0,
      TNA: 0,
      anios: 0,
      frecuenciaPago: 0,
      interesEqui: 0,
      pagosanio: 0,
      totalCuaotas: 0
    }
  }

  calcular() {
    if(this.proyeccion.valorPrestamo <= 0){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'El monto del prestamo no puede ser cero'
      });
    }else if(this.proyeccion.TNA <= 0){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'La tasa de interes no puede ser menor a cero'
      });
    }else if (this.proyeccion.anios <= 0){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el número de años'
      });
    }else if(this.proyeccion.frecuenciaPago == 0){
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe seleccionar la frecuencia de pago'
      });
    }else{
      console.log(this.proyeccion);
      
    }

  }

  onTabChange(e) {
    if(e == 0){
      this.calculoproyeccion.ngOnInit();
    }else if ( e == 1 ){
      this.misproyecciones.ngOnInit();
    }else if ( e == 2 ){
      this.proyecciones.ngOnInit();
    }

  }
}
