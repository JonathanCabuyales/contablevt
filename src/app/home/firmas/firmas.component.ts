import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DialogfirmasComponent } from 'src/app/components/firmas/dialogfirmas/dialogfirmas.component';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-firmas',
  templateUrl: './firmas.component.html',
  styleUrls: ['./firmas.component.css']
})
export class FirmasComponent implements OnInit {

  @ViewChild('firmas', { static: false }) firmas: DialogfirmasComponent;

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
      this.firmas.ngOnInit();
    }
  }

}
