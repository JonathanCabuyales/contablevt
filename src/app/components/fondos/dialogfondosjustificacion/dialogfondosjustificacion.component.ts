import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ContultafondosI } from 'src/app/models/fondos/fondoconsulta.interface';
import { FondosService } from 'src/app/services/fondos/fondos.service';
import { LoginService } from 'src/app/services/login.service';
import { DialogfondosjustificarComponent } from '../dialogfondosjustificar/dialogfondosjustificar.component';

@Component({
  selector: 'app-dialogfondosjustificacion',
  templateUrl: './dialogfondosjustificacion.component.html',
  styleUrls: ['./dialogfondosjustificacion.component.css']
})
export class DialogfondosjustificacionComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'monto', 'fechaasignacion', 'justificado', 'nojustificado', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variable para el token
  token: string = '';

  // variables para visualizar los montos 
  listamontos: any[];

  // variables de usuario
  usuario: string;
  rol: string;
  id_usuario: string = '';

  // variables para justificacion de fondos
  usuariofondos: ContultafondosI;
  listafondos: any[];
  justificado: string = '0';
  nojustificado: string = '0';

  constructor(private _cookie: CookieService,
    private _fondos: FondosService,
    private _login: LoginService,
    private toastr: ToastrService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this._cookie.get('token');

    this.usuariofondos = {
      id_usuario: '',
      token: ''
    };

    this._login.getuserdata(this.token).subscribe(res => {

      this.usuario = res.data.usuario;
      this.rol = res.data.rol;
      this.id_usuario = res.data.id;

      this.usuariofondos.id_usuario = this.id_usuario;
      this.usuariofondos.token = this.token;


      this.loadfondosjustificar();


    });

  }

  loadfondosjustificar(){
    this._fondos.getUsarioFondos(this.usuariofondos).subscribe(res => {

      if (res.data.length) {

        this.listafondos = res.data;
        this.dataSource = new MatTableDataSource(this.listafondos);
        this.dataSource.paginator = this.paginator;

      } else {
        this.toastWarning("No tienes fondos por justificar");
      }

    });
  }

  justificardetalle(fondo) {

    const dialogRef = this.dialog.open(DialogfondosjustificarComponent, {
      width: '850px',
      data: fondo
    });


    dialogRef.afterClosed().subscribe(res => {

      this.loadfondosjustificar();

    });

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
