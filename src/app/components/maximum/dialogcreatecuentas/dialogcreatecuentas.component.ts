import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CookieService } from 'ngx-cookie-service';
import { MaximumService } from 'src/app/services/maximum/maximum.service';

export interface AgregarCuentasLibroI{
  categoria: string,
  numero: string,
  descripcion: string,
  subcuentas: string,
  token?: string
}

@Component({
  selector: 'app-dialogcreatecuentas',
  templateUrl: './dialogcreatecuentas.component.html',
  styleUrls: ['./dialogcreatecuentas.component.css']
})
export class DialogcreatecuentasComponent implements OnInit {


  agregarCuentas: AgregarCuentasLibroI;
  token: any = '';
  cuentas: any[] = [];
  obtenerValorSumar: any []= [];
  cargarSubcuentas: any[] = [];
  constructor(
    private _maximum: MaximumService,
    private _cookie: CookieService,
    private _dialogRef: MatDialogRef<DialogcreatecuentasComponent>
  ) { 
    this.agregarCuentas ={
      categoria: '',
      numero: '',
      descripcion: '',
      subcuentas: ''

    }
  }

  ngOnInit(): void {
    this.token = this._cookie.get('token');

    this.cargarLibroPrincipales();
  }


  guardarCuentasLibros(){
    console.log(this.agregarCuentas);
    this.agregarCuentas.token = this.token;
    this._maximum.insertCuentas(this.agregarCuentas)
    .subscribe((resp) =>{
      console.log(resp);
      this._dialogRef.close();
    });
    
  }


  cargarLibroPrincipales(){
    this._maximum.getCuentasPrincipalesAgregar(this.token)
    .subscribe((resp) =>{
      this.cuentas = resp.data;
    })
  }

  obtenerUltimoValor(valor: any){
    this._maximum.getSubcuentas(this.token, valor)
    .subscribe((resp) =>{
      console.log(resp);
      this.agregarCuentas.subcuentas = '#';
      this.cargarSubcuentas = resp.data;
        // this.obtenerValorSumar = resp.data[0].numero.split('.');
        // console.log(this.obtenerValorSumar);




      /* if(this.obtenerValorSumar.length > 2){
        for(let i=0; i<this.obtenerUltimoValor.length; i++){

          this.agregarCuentas.numero = this.obtenerValorSumar[i]+"."+ this.obtenerValorSumar[i + 1]+"."+(parseInt(this.obtenerValorSumar[this.obtenerValorSumar.length - 1]) + 1);
        }
      }else{
        for(let i=0; i<this.obtenerUltimoValor.length; i++){

          this.agregarCuentas.numero = this.obtenerValorSumar[i]+"."+(parseInt(this.obtenerValorSumar[this.obtenerValorSumar.length - 1]) + 1);
        }
      } */
    })
  }

//funcion para cargar las subcuentas de las cuentas principales
  cambiarNumSubcuenta(){

    this._maximum.getUltimoValorSubcuenta(this.token, this.agregarCuentas.subcuentas)
    .subscribe((resp) =>{
      
      console.log(resp.data);
      let existeNumero = this.agregarCuentas.subcuentas.endsWith(".");

      if(resp.data.length > 0){
        
        let dividirNumero = resp.data[0].numero.split(".");
        if(dividirNumero.length < 3){
          this.agregarCuentas.numero = dividirNumero[0] + "." + (parseInt(dividirNumero[1]) + 1);
        }else{
          this.agregarCuentas.numero = (existeNumero) ? this.agregarCuentas.subcuentas : this.agregarCuentas.subcuentas + ".";
        }
        
      }else{
        
        this.agregarCuentas.numero = this.agregarCuentas.subcuentas + ".1";
      }
      
    });
    

    
    // this.agregarCuentas.numero = (existePunto) ? this.agregarCuentas.subcuentas  : this.agregarCuentas.subcuentas+ ".";

  }

}
