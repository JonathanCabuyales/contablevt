import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UsuarioI } from 'src/app/models/usuario.interface';
import { SueldosService } from 'src/app/services/sueldos.service';
import { UsuarioserService } from 'src/app/services/usuarioser.service';
import { DialogsueldoempleadoComponent } from '../dialogsueldoempleado/dialogsueldoempleado.component';
import { CookieService } from 'ngx-cookie-service';
import { DialogatrasosComponent } from '../dialogatrasos/dialogatrasos.component';


@Component({
  selector: 'app-sueldos',
  templateUrl: './sueldos.component.html',
  styleUrls: ['./sueldos.component.css']
})
export class SueldosComponent implements OnInit {

  // <!-- usuario, nombres, ciruc, direccion, email, telefono -->
  displayedColumns: string[] = ['nombres', 'ciruc', 'direccion', 'email', 'telefono', 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables de combo box
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  causas: any;

  listaEmpleados: any[];
  token: string;


  constructor(private toastr: ToastrService,
    public dialog: MatDialog,
    private _empleado: UsuarioserService,
    private _sueldo: SueldosService,
    private _cookie: CookieService) { }

  ngOnInit(): void {
    this.loadEmpleados();
    this.listaEmpleados = [{}];
  }

  loadEmpleados() {

    this.token = this._cookie.get('token');

    this._empleado.getEmpeladosValidos(this.token).subscribe(res => {      
      
      if (res.data.length) {
        let numero = 0;
        for (let i = 0; i < res.data.length; i++) {
          if (res.data[i].contrato_doc !== '') {
            this.listaEmpleados[numero] = res.data[i];
            this.dataSource = new MatTableDataSource(this.listaEmpleados);
            this.dataSource.paginator = this.paginator;
            numero++;
          }
        }
      } else {
        this.toastError("No existen datos registrados");
      }

    });
  }

  sueldos(empleadoSueldo: UsuarioI) {

    const dialogRef = this.dialog.open(DialogsueldoempleadoComponent, {
      width: '900px',
      data: empleadoSueldo
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {

      }

    });

  }

  editEmpleado(empleadoUpdate: UsuarioI) {

  }

  deleteEmpleado(id_usuario: any) {


  }

  // seccion para registrar los atrasos
  atrasos(usuario){

    console.log(usuario);
    
    const dialogRef = this.dialog.open(DialogatrasosComponent, {
      width: '600px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {

      }

    });

  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    filtro = filtro.trim(); // Remove whitespace
    filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filtro;
  }

  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje + '!!!', 'Advertencia', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
