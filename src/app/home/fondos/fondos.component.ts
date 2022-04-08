import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DialogfondosComponent } from 'src/app/components/fondos/dialogfondos/dialogfondos.component';
import { DialogfondosasignadosComponent } from 'src/app/components/fondos/dialogfondosasignados/dialogfondosasignados.component';
import { DialogfondosjustificacionComponent } from 'src/app/components/fondos/dialogfondosjustificacion/dialogfondosjustificacion.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-fondos',
  templateUrl: './fondos.component.html',
  styleUrls: ['./fondos.component.css']
})
export class FondosComponent implements OnInit {

  @ViewChild('fondos', { static: false }) fondos: DialogfondosComponent;
  @ViewChild('fondosasignados', { static: false }) fondosasignados: DialogfondosasignadosComponent;
  @ViewChild('fondosjustificados', {static: false}) fondosjustificados: DialogfondosjustificacionComponent;

  active = 0;
  token: string = '';
  usuario: string;
  rol: string;
  foto: string = '';

  constructor(private _cookie: CookieService,
    private _login: LoginService) { }

  ngOnInit(): void {

    this.token = this._cookie.get("token");

    this._login.getuserdata(this.token).subscribe(res=>{
      this.usuario = res.data.usuario;
      this.rol = res.data.rol;
      this.foto = res.data.foto;      
    });

  }

  onTabChange(e) {
    if(e == 0){
      this.fondos.ngOnInit();
    }else if(e == 1){
      this.fondosasignados.ngOnInit();
    }else if (e == 2){
      this.fondosjustificados.ngOnInit();
    }

  }

}
