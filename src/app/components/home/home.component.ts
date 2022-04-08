import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { DialogperfilusuarioComponent } from '../perfilusuario/dialogperfilusuario/dialogperfilusuario.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = false;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  token: string;
  usuario: string;
  rol: string;
  foto: string = '';

  constructor(private toastr: ToastrService,
    public dialog: MatDialog,
    private router: Router,
    private _login: LoginService,
    private _cookie: CookieService) { }

  ngOnInit(): void {
    this.token = this._cookie.get("token");

    this._login.getuserdata(this.token).subscribe(res=>{
      this.usuario = res.data.usuario;
      this.rol = res.data.rol;
      this.foto = res.data.foto;      
    });

    // añado javascript desde ts
  
    document.getElementById("btn_open").addEventListener("click", open_close_menu);
    
    var side_menu = document.getElementById("menu_side");
    var btn_open = document.getElementById("btn_open");
    var body = document.getElementById("body");

    function open_close_menu(){
      body.classList.toggle("body_menu");
      side_menu.classList.toggle("menu__side_move");
    }

    // para anchos menores a 760px recarga la pagina
    // se oculata el menu automaticamente
    if(window.innerWidth < 760){
      body.classList.remove("body_menu");
      side_menu.classList.remove("menu__side_move");
    }


    // menu adaptable
    window.addEventListener("rezize", function(){
      
      if(window.innerWidth > 760){
        body.classList.remove("body_menu");
        side_menu.classList.remove("menu__side_menu");
      }

      if(window.innerWidth < 760){
        body.classList.add("body_menu");
        side_menu.classList.add("menu__side_menu");
      }

    });

    document.getElementById("btn_open").addEventListener("mouseover", this.mouseenter);
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  cerrasesion(){
    this._cookie.deleteAll();
    this.router.navigate(['']).then(res=>{
      this.toastSuccess("Sesión cerrada exitosamente");
    });
  }
  
  // perfilUsuario(){
  //   const dialogRef = this.dialog.open(DialogperfilusuarioComponent, {
  //     width: '550px'
  //   });

  //   dialogRef.afterClosed().subscribe(res => {

  //     if (res != undefined) {
        
  //     }
  //   });
  // }

  salir(){
    this.router.navigate(['']);

  }

  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Sesión Iniciada', {
      timeOut: 3000,
    });
  }

}
