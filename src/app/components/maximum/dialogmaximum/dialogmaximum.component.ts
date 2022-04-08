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
  
  nuevoProductoServicio: ProsernuevoI;
  subtotal12: string = '0';
  subtotal0: string = '0';
  showcomprobante = false;
  listaItems: any[] = [];
  listaempresas:any[] = [];
  token: any;
  facturaMaximum: MaximumI;
  lastIndex: number = 0;


  listaAgregarLibro: any[] = [];
  // listaItems: any= [];
  
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





  refrescarTabla(evento: any){
    this.mostrarLibro = evento;
    console.log(evento);
    
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
  
}
