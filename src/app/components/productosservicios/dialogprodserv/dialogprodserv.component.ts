import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ClienteI } from 'src/app/models/cliente.interface';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { ClienteserService } from 'src/app/services/clienteser.service';
import { ProdservService } from 'src/app/services/prodserv.service';

@Component({
  selector: 'app-dialogprodserv',
  templateUrl: './dialogprodserv.component.html',
  styleUrls: ['./dialogprodserv.component.css']
})
export class DialogprodservComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'categoria', 'nombre',  'cantidad', 'precio', 'seleccion'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // interfaz para cargar todos los productos
  productosServicios: ProsernuevoI[];
  prodser: ProsernuevoI[];
  cliente: ClienteI[];

  // variable para el token
  token: string = '';

  constructor(public dialogRef: MatDialogRef<DialogprodservComponent>, @Inject(MAT_DIALOG_DATA)
  public prodserup: any,
  private _cookie: CookieService,
    private _prodser: ProdservService,) { }

  ngOnInit() {

    this.token = this._cookie.get("token");
    
    this._prodser.getAll(this.token).subscribe(res => {

      if (res.data.length) {
        this.prodser = res.data;
        this.dataSource = new MatTableDataSource(this.prodser);
        this.dataSource.paginator = this.paginator;
      } else {
        console.log("No hemos encontrado registros");

      }

    });
  }

  selectItem(proser: ProsernuevoI) {
    this.dialogRef.close(proser);
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    filtro = filtro.trim(); // Remove whitespace
    filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filtro;
  }
}