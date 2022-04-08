import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NotificacionI } from 'src/app/models/emapa/notificacion.interface';
import { BdemapaService } from 'src/app/services/bdemapa.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialognotificaciones',
  templateUrl: './dialognotificaciones.component.html',
  styleUrls: ['./dialognotificaciones.component.css']
})
export class DialognotificacionesComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'categoria', 'descripcion', 'cantidad', 'precio'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  listaNotificaciones: NotificacionI[];

  fechaDesde: string = '';
  fechaHasta: string = '';
  token: string;
  spiner: boolean = false;
  tabla: boolean = true;

  constructor(private _notificacion: NotificacionService,
    private _bdemapa: BdemapaService,
    private toastr: ToastrService,
    private _cookie: CookieService) { }

  ngOnInit(): void {
    this.token = this._cookie.get('token');
    this.loadNotificaciones();
    this.fechaDesde = '';
    this.fechaHasta = '';
  }

  loadNotificaciones() {
    this._notificacion.getAll(this.token).subscribe(res => {
      if (res.data.length) {
        this.listaNotificaciones = res.data;
        this.dataSource = new MatTableDataSource(this.listaNotificaciones);
        this.dataSource.paginator = this.paginator;
        this.tabla = true;
      } else {
        this.toastWarning("No se encuentran registros de notificaciones para el mes en curso");
        this.tabla = true;
        this.listaNotificaciones = [];
        this.dataSource = new MatTableDataSource(this.listaNotificaciones);
        this.dataSource.paginator = this.paginator;
        this.tabla = true;
      }

    });
  }

  excel(){
    let dia = new Date().getDay();
    let mes = new Date().getMonth();
    let anio = new Date().getFullYear();

    let hora = new Date().getHours();
    let min = new Date().getMinutes();
    let seg = new Date().getSeconds();

    this._bdemapa.exportToExcel(this.listaNotificaciones, "Notifi__" +
      anio + '_' + mes + '_' + dia + '_' + hora + '_' + min + '_' + seg);
  }

  cargarFecha() {

    this.spiner = true;
    this.tabla = false;
    
    if (this.fechaDesde == '' || this.fechaHasta == '') {
      this.spiner = false;
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe seleccionar un rango de fechas para continuar'
      });

    } else {

      this._notificacion.getFecha(this.fechaDesde, this.fechaHasta, this.token).subscribe(res => {

        if (res.data.length) {
          this.listaNotificaciones = res.data;
          this.dataSource = new MatTableDataSource(this.listaNotificaciones);
          this.dataSource.paginator = this.paginator;
          this.spiner = false;
          this.tabla = true;
        } else {
          this.toastWarning("No se encuentran registros de notificaciones entre las fechas " + this.fechaDesde + ' ' + this.fechaHasta);
          this.listaNotificaciones = [];
          this.dataSource = new MatTableDataSource(this.listaNotificaciones);
          this.dataSource.paginator = this.paginator;
          this.spiner = false;
          this.tabla = true;
        }

      });
    }
  }

  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 4500,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    if (filtro == '' || filtro == null) {
    } else {
      filtro = filtro.trim(); // Remove whitespace
      filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filtro;
    }
  }

}
