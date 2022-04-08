import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AtrasosComponent } from 'src/app/components/empleados/atrasos/atrasos.component';
import { DialogempleadosComponent } from 'src/app/components/empleados/dialogempleados/dialogempleados.component';
import { PermisosComponent } from 'src/app/components/empleados/permisos/permisos.component';
import { SueldosComponent } from 'src/app/components/empleados/sueldos/sueldos.component';
import { SueldospagadosComponent } from 'src/app/components/empleados/sueldospagados/sueldospagados.component';
import { VacacionesComponent } from 'src/app/components/empleados/vacaciones/vacaciones.component';
import { UsuarioI } from 'src/app/models/usuario.interface';
import { BdemapaService } from 'src/app/services/bdemapa.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  @ViewChild('variableHijo1', { static: false }) empleados: DialogempleadosComponent;
  @ViewChild('variableHijo2', { static: false }) sueldos: SueldosComponent;
  @ViewChild('rolpagos', {static: false}) rolpago: SueldospagadosComponent;
  @ViewChild('atrasos', {static: false}) atrasos: AtrasosComponent;
  @ViewChild('vaciones', {static: false}) vaciones: VacacionesComponent;
  @ViewChild('permisos', {static: false}) permisos: PermisosComponent;

  active = 0;
  token: string = '';
  usuario: string;
  rol: string;
  foto: string = '';

  showPassword: boolean = false;

  // variables para el empleado
  empleado: UsuarioI;

  constructor(private _cookie: CookieService,
    private _login: LoginService) { }

  ngOnInit(): void {

    this.empleado = {
      id_usuario: 0,
      nombres: '',
      apellidos: '',
      ciruc: '',
      direccion: '',
      email: '',
      telefono: '',
      usuario: '',
      contrasenia: '',
      rol: '',
      sueldo: '',
      fotoperfil: '',
      tipocontrato: '',
      create_at: new Date()
    }

    this.token = this._cookie.get("token");

    this._login.getuserdata(this.token).subscribe(res=>{
      this.usuario = res.data.usuario;
      this.rol = res.data.rol;
      this.foto = res.data.foto;      
    });

  }

  onTabChange(e) {
    if(e == 0){
      this.empleados.ngOnInit();
    }else if(e == 1){
      this.sueldos.ngOnInit();
    }else if (e == 2){
      this.rolpago.ngOnInit();
    }else if (e == 3){
      this.atrasos.ngOnInit();
    } else if (e == 4){
      this.vaciones.ngOnInit();
    } else if (e == 5){
      this.permisos.ngOnInit();
    } 

  }

  // para recargar los tabs revisa

  limpiarTab(tabSeleccionado) {
    if (tabSeleccionado === 1) {
      // this.empleados.listaEmpleados. resert();
    } else {
      this.sueldos.dataSource._renderChangesSubscription;
    }
  }

  contrasena() {
    if (this.showPassword == true) {
      this.showPassword = false;
    } else {
      this.showPassword = true;
    }
  }

}