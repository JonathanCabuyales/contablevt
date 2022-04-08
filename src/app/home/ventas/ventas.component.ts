import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogprodservComponent } from 'src/app/components/productosservicios/dialogprodserv/dialogprodserv.component';
import { DialogappfacturasComponent } from 'src/app/components/ventas/dialogappfacturas/dialogappfacturas.component';
import { DialogfacturaComponent } from 'src/app/components/ventas/dialogfactura/dialogfactura.component';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { ProdservService } from 'src/app/services/prodserv.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'cantidad', 'precio', 'eliminar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('factura', { static: false }) factura: DialogfacturaComponent;
  // @ViewChild('lectura', { static: false }) lectura: CalculolecturasComponent;
  @ViewChild('facturas', { static: false }) facturas: DialogappfacturasComponent;

  active = 0;

  listaProSer: ProsernuevoI[];
  prodser: ProsernuevoI[];

  constructor(public dialog: MatDialog,
    private _prodser: ProdservService) { }

  ngOnInit(): void {
  }

  loadProSer() {
    const dialogRef = this.dialog.open(DialogprodservComponent, {
      width: '70%'
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {

        this.listaProSer = [];
        this.listaProSer[0] = res;
        console.log(this.listaProSer);

        this.dataSource = new MatTableDataSource(this.listaProSer);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  onTabChange(e) {
    if(e == 0){
      this.factura.ngOnInit();
    }
    // else if(e == 0){
    //   this.lectura.ngOnInit();
    // }
    else if(e == 1){
      this.facturas.ngOnInit();
    }
  }


}
