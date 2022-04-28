import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { MaximumI } from 'src/app/models/maximum/maximum';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { MaximumService } from 'src/app/services/maximum/maximum.service';
import { DialogcreditmaximumComponent } from '../dialogcreditmaximum/dialogcreditmaximum.component';

@Component({
  selector: 'app-dialogmaximum',
  templateUrl: './dialogmaximum.component.html',
  styleUrls: ['./dialogmaximum.component.css']
})
export class DialogmaximumComponent implements OnInit, AfterContentInit {
  token: any = ''; //variable para el token
  cuentasContables: any[] =[]; //arreglo para almacenar las cuentas
  valorEncontradoCuenta: any; //utilziar para mostrar
  valorNivel1: string = '';
  valorNivel2: string = '';
  valorNivel3: string = '';

  constructor(
    private _dialog: MatDialog,
    private _maximum: MaximumService,
    private _cookie: CookieService,
    private _toastr: ToastrService
  ) { 
    
    this.token = this._cookie.get('token');


  }

  ngOnInit(): void {
    /* this.listaItems = [];
    this.listaempresas = []; */

  }

  ngAfterContentInit(): void {
    // this.getFactura();
    this.traerCuentas();
    
  }


  traerCuentas(){
    this._maximum.getCuentasContables(this.token)
    .subscribe((resp)=>{
      console.log(resp);
      this.cuentasContables = resp.data;
      console.log(this.cuentasContables);
      
    });
  }

  // funcion para mostrar los datos filtrando en el arreglo
  filtroNiveles(evento: any, nivel: string){
    console.log(evento.target.value, nivel);
    // let nivel1: string = evento.target.value;
    
    if(nivel === 'nivel1'){
      console.log('entra en nivel 1');
      this.valorNivel1 = evento.target.value;
      this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == evento.target.value);
      // this.cuentasContables = this.cuentasContables.filter( data => parseInt(data.nivel_1) == parseInt(nivel) );
      // console.log(this.valorEncontradoCuenta);
    }else if(nivel === 'nivel2'){
      this.valorNivel2 = evento.target.value;
      this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1 && data.nivel_2 == this.valorNivel2);
    }else if(nivel === 'nivel3'){
      
      this.valorNivel3 = evento.target.value;
      this.valorEncontradoCuenta = this.cuentasContables.filter(data => data.nivel_1 == this.valorNivel1 && data.nivel_2 == this.valorNivel2 && data.nivel_3 == this.valorNivel3);
    }

    console.log(this.valorEncontradoCuenta);
    console.log(this.valorNivel1, this.valorNivel2, this.valorNivel3);
    

    
  }
  

}