import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ComprasI } from 'src/app/models/compras.interface';
import { ComprasService } from 'src/app/services/compras.service';

@Component({
  selector: 'app-dialogcomprasregistradas',
  templateUrl: './dialogcomprasregistradas.component.html',
  styleUrls: ['./dialogcomprasregistradas.component.css']
})
export class DialogcomprasregistradasComponent implements OnInit {

  displayedColumns: string[] = ['numerofac', 'conceptofac', 'items', 'tipocom', 'tipo', 'fecha', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaCompras: ComprasI[];
  listaComprasAux: ComprasI[];
  listaItems: any[];

  token: string = '';

  constructor(private _compras: ComprasService,
    private _cookie: CookieService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.loadCompras();
    
  }

  loadCompras() {

    this.token = this._cookie.get('token');

    this._compras.getAll(this.token).subscribe(res => {      

      // console.log(res);

      // AQUI CONVERTIR JSON A CADA Y VICEVERSA

      // console.log(JSON.stringify(this.productosServicios));

      // let objeto = JSON.stringify(this.productosServicios);
      // console.log(JSON.parse(objeto));
      
      if (res.data != null) {
        this.listaComprasAux = res.data;

        // JSON.stringify(this.listaComprasAux.);
        this.dataSource = new MatTableDataSource(this.listaComprasAux);
        this.dataSource.paginator = this.paginator;
      }else{
        this.toastWarning("No tienes compras registradas aun");
      }

    });

  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'Exito', {
      timeOut: 3000,
    });
  }

}