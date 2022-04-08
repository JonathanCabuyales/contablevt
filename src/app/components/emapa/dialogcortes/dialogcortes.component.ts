import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NovedadI } from 'src/app/models/emapa/novedad.interface';
import { BdemapaService } from 'src/app/services/bdemapa.service';
import { NovedadService } from 'src/app/services/novedad.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogcortes',
  templateUrl: './dialogcortes.component.html',
  styleUrls: ['./dialogcortes.component.css']
})
export class DialogcortesComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'categoria', 'tiponovedad', 'lectura', 'descripcion', 'cantidad', 'precio'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  fechaDesde: string = '';
  fechaHasta: string = '';

  listaNovedades: NovedadI[];
  token: string;


  constructor(private _bdemapa: BdemapaService,
    private _novedad: NovedadService,
    private toastr: ToastrService,
    private _cookie: CookieService) { }

  ngOnInit(): void {
    this.token = this._cookie.get('token');

    
    this.loadNovedades();
    this.fechaDesde = '';
    this.fechaHasta = '';
  }

  loadNovedades() {
    this._novedad.getCortes(this.token).subscribe(res => {

      if (res.data.length) {
        this.listaNovedades = res.data;
        this.dataSource = new MatTableDataSource(this.listaNovedades);
        this.dataSource.paginator = this.paginator;
      } else {
        this.toastWarning("No se encuentran registros de cortes para el mes en curso");
        this.listaNovedades = [];
        this.dataSource = new MatTableDataSource(this.listaNovedades);
        this.dataSource.paginator = this.paginator;
      }

    });
  }

  cargarFecha() {
    if (this.fechaDesde == '' || this.fechaHasta == '') {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe seleccionar un rango de fechas para continuar'
      });
    } else {

      this._novedad.getFechaCorte(this.fechaDesde, this.fechaHasta, this.token).subscribe(res => {

        if (res.data.length) {
          this.listaNovedades = res.data;
          this.dataSource = new MatTableDataSource(this.listaNovedades);
          this.dataSource.paginator = this.paginator;
        } else {
          this.toastWarning("No se encuentran registros de cortes entre las fechas " + this.fechaDesde + ' ' + this.fechaHasta);
        }

      });
    }

  }

  excel() {

    if (!this.listaNovedades.length) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'No hay registros para descargar'
      });
    } else {
      let dia = new Date().getUTCDate();
      let mes = new Date().getMonth() + 1;
      let anio = new Date().getFullYear();

      let hora = new Date().getHours();
      let min = new Date().getMinutes();
      let seg = new Date().getSeconds();

      this._bdemapa.exportToExcel(this.listaNovedades, "CortesRecone_" +
        anio + '_' + mes + '_' + dia + '_' + hora + '_' + min + '_' + seg);
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
