import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FondosService } from 'src/app/services/fondos/fondos.service';
import { DialogfondosjustificadosComponent } from '../dialogfondosjustificados/dialogfondosjustificados.component';

@Component({
  selector: 'app-dialogfondosasignados',
  templateUrl: './dialogfondosasignados.component.html',
  styleUrls: ['./dialogfondosasignados.component.css']
})
export class DialogfondosasignadosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'monto', 'descripcion', 'justificado', 'nojustificado', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaFondos: any[];
  token: string = '';

  constructor(private _fondos: FondosService,
    private _cookie: CookieService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.token = this._cookie.get("token");

    this.loadFondosAsignados();

  }

  loadFondosAsignados() {

    this._fondos.getAll(this.token).subscribe(res => {

      if (res.data.length) {
        this.listaFondos = res.data;
        this.dataSource = new MatTableDataSource(this.listaFondos);
        this.dataSource.paginator = this.paginator;
      } else {
        this.toastWarning("Aún no has asignado fondos, para mostrarlos en esta sección");
      }

    });

  }

  // funcion para cargar los detalles de justificacion por asignacion de dinero
  verdetallesasignacion(fondo) {
    
    if (fondo.detalles_fonjus == '') {
      this.toastError("Ups, no hemos encontrado justificaciones aún para este fondo");
    } else {

      const dialogRef = this.dialog.open(DialogfondosjustificadosComponent, {
        width: '850px',
        data: fondo
      });


      dialogRef.afterClosed().subscribe(res => {

        console.log(res);


      });

    }

  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    filtro = filtro.trim(); // Remove whitespace
    filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filtro;
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 4000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Exito', {
      timeOut: 4000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 5000,
    });
  }


}
