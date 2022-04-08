import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioI } from 'src/app/models/usuario.interface';
import { FondosService } from 'src/app/services/fondos/fondos.service';
import { UsuarioserService } from 'src/app/services/usuarioser.service';
import { DialogfondosasignarComponent } from '../dialogfondosasignar/dialogfondosasignar.component';

@Component({
  selector: 'app-dialogfondos',
  templateUrl: './dialogfondos.component.html',
  styleUrls: ['./dialogfondos.component.css']
})
export class DialogfondosComponent implements OnInit {

  // <!-- usuario, nombres, ciruc, direccion, email, telefono -->
  displayedColumns: string[] = ['usuario', 'nombres', 'ciruc', 'direccion', 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  // variable para el token
  token: any;

  // variable para los empleados
  listaEmpleados: UsuarioI[];

  constructor(private _empleado: UsuarioserService,
    private _cookie: CookieService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.token = this._cookie.get('token');

    this.loadEmpledos();

  }


  loadEmpledos() {

    this.token = this._cookie.get('token');

    this._empleado.getAllEmpleados(this.token).subscribe(res => {
      if (res) {
        this.listaEmpleados = res.data;
        this.dataSource = new MatTableDataSource(this.listaEmpleados);
        this.dataSource.paginator = this.paginator;
      } else {
        this.toastError("No existen datos registrados");
      }

    });

  }

  // funcion para asignar fondo a el empleado
  asignarfondos(empleado) {

    const dialogRef = this.dialog.open(DialogfondosasignarComponent, {
      width: '650px',
      data: empleado
    });


    dialogRef.afterClosed().subscribe(res => {

      if(res){
        this.toastSuccess("La asignación se ha registrado exitosamente, puedes revisar la sección fondos asignados");
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
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 5000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
