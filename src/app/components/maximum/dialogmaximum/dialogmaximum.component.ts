import { AfterContentInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
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

  displayedColumns: string[] = ['fecha', 'codigo', 'cuenta', 'detalle', 'parcial', 'debe', 'haber', 'acciones'];
  dataSource: MatTableDataSource<any>;

  showComprobante:  boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  mostrarLibro: any[] = [];

  sumaDebeHaber = {
    debeTotal: '',
    HaberTotal: ''
  }

  sumaDebe: any = 0;
  sumaHaber: any = 0;
  
  nuevoProductoServicio: ProsernuevoI;
  subtotal12: string = '0';
  subtotal0: string = '0';
  showcomprobante = false;
  listaItems: any[] = [];
  listaempresas:any[] = [];
  token: any;
  facturaMaximum: MaximumI;
  lastIndex: number = 0;
  mostrarBotonRegistrar: boolean = true;

  listaAgregarLibro: any[] = [];
  // listaItems: any= [];
  convertirJson: any[]= [];
  constructor(
    private _dialog: MatDialog,
    private _maximum: MaximumService,
    private _cookie: CookieService
  ) { 
    this.facturaMaximum = {
      emision: '',
      forma_pago: '',
      num_factura: '',
      tipo: '',
      tipo_comprobante: '',
      tipo_cuentas: '',
      ice: '',
      iva_12: '',
      propina: '',
      subtotal_0: '',
      subtotal_12: '',
      total: '',
    }
    this.token = this._cookie.get('token');


  }

  ngOnInit(): void {
    /* this.listaItems = [];
    this.listaempresas = []; */

  }

  ngAfterContentInit(): void {
    this.getFactura();
    
  }
  


  getFactura(){
    this._maximum.getFacturasMaximum(this.token)
    .subscribe((resp) =>{
      console.log(resp.data);
      this.listaItems = resp.data;
      console.log(this.listaItems);
      
      
      if(resp.data){
        this.dataSource = new MatTableDataSource(resp.data);
      }
    })
  }

  comprobante(){

  }


  //funcion para activar el boton de registrar el libro
  activarBotonLibro(botonBoolean: any){
    this.mostrarBotonRegistrar = botonBoolean;
    
  }





  refrescarTabla(evento: any){
    // let suma = 0;
    
    this.mostrarLibro = evento;
    console.log(this.mostrarLibro);
    for(let i=0; i< this.mostrarLibro.length; i++){
      this.convertirJson.push(...JSON.parse(this.mostrarLibro[i].detalle));

    }

    this.sumaDebe = 0;
    this.sumaHaber = 0;
    for(let i = 0; i <this.convertirJson.length; i++){

      console.log(this.convertirJson[i].data);
      for(let s of this.convertirJson[i].data){
        if(s.debe_haber === 'Debe'){
          this.sumaDebe += parseFloat(s.monto);
        }else{
          this.sumaHaber += parseFloat(s.monto);
        }
      }
      
      /* for(let j = 0; j < this.convertirJson[i].data.length; i++){
        suma += parseFloat(this.convertirJson[i].data[j].monto);
        
      } */
      
    }

    
    
  
    
    /* if(evento){
      this.ngAfterContentInit();
    } */
  }

  items(){
    const ref = this._dialog.open(DialogcreditmaximumComponent, {
      width: '75vw',
    });

    ref.afterClosed().subscribe((res) =>{
      console.log(res);
      if (res != undefined) {

        if (!this.listaAgregarLibro.length) {
          this.listaAgregarLibro[0] = res;
        } else {
          this.lastIndex = this.listaAgregarLibro.length;
          this.listaAgregarLibro[this.lastIndex] = res;
        }
      }
      console.log(this.listaAgregarLibro);
      
      
    })
  }

  n_factura(evento: any){
    console.log(evento);
    
    this.facturaMaximum.num_factura = evento.num_factura;
    this.facturaMaximum.emision = evento.fecha;
    this.facturaMaximum.tipo_comprobante = evento.tipo_comprobante;
  }/* 
  t_comprobante(evento: any){
    console.log(evento);
    
    this.facturaMaximum.tipo_comprobante = evento;
  }
  fecha_factura(evento: any){
    console.log(evento);
    
    this.facturaMaximum.emision = evento;
  } */
  
}
