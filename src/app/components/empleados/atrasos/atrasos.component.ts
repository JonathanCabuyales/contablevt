import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AtrasosI } from 'src/app/models/atrasos/atrasos.interface';
import { EliminadosI } from 'src/app/models/eliminados/eliminados.interface';
import { AtrasosService } from 'src/app/services/atrasos/atrasos.service';
import { LoginService } from 'src/app/services/login.service';
import { DialogconfirmacionComponent } from '../../dialogs/dialogconfirmacion/dialogconfirmacion.component';
import { DialogatrasosjustificarComponent } from '../dialogatrasosjustificar/dialogatrasosjustificar.component';

@Component({
  selector: 'app-atrasos',
  templateUrl: './atrasos.component.html',
  styleUrls: ['./atrasos.component.css'],
})
export class AtrasosComponent implements OnInit {
  // <!-- usuario, nombres, ciruc, direccion, email, telefono -->
  displayedColumns: string[] = [
    'nombres',
    'ciruc',
    'direccion',
    'email',
    'justificado',
    'motivojusti',
    'editar',
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  token: string = '';
  listaAtrasos: any[];

  eliminar: EliminadosI;

  atraso: AtrasosI;

  // variables para ver el usuario activo
  rol: string = '';
  id_usuario: string = '';

  constructor(
    private _cookie: CookieService,
    private _atrasos: AtrasosService,
    public dialog: MatDialog,
    private _login: LoginService,
    private toastr: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.token = this._cookie.get('token');
    this.loadAtrasos();

    this.eliminar = {
      id_delete: '',
      id_usuario: '',
      detalle_reel: '',
      token: '',
    };

    this._login.getuserdata(this.token).subscribe((res) => {
      this.rol = res.data.rol;
      this.id_usuario = res.data.id;
    });
    

    this.atraso = {
      id_usu: '',
      fecha_atr: '',
      tiempo_atr: '',
      descripcion_atr: '',
      token: '',
      nombre: '',
      correo: '',
      justificado_atr: 'NO',
      justificacion_atr: '',
      fechajusti_atr: ''
    }

  }

  loadAtrasos() {
    this._atrasos.getAtrasos(this.token).subscribe((res) => {
      if (res.data) {
        this.listaAtrasos = res.data;
        this.dataSource = new MatTableDataSource(this.listaAtrasos);
        this.dataSource.paginator = this.paginator;
      } else {
        this.listaAtrasos = [];
        this.dataSource = new MatTableDataSource(this.listaAtrasos);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  justificar(atrasoupdate) {
    console.log(atrasoupdate);

    const dialogRef = this.dialog.open(DialogatrasosjustificarComponent, {
      width: '450px',
      data: atrasoupdate,
    });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadAtrasos();
      } else {
        this.loadAtrasos();
      }
    });
  }

  eliminarAtraso(element) {

    const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
      width: '450px',
      data: 'eliminar este registro',
    });

    dialogRef.afterClosed().subscribe((res) => {

      if (res) {

        this.eliminar.id_delete = element.id_atr;
        this.eliminar.id_usuario = this.id_usuario;
        this.eliminar.detalle_reel = JSON.stringify(element);
        this.eliminar.token = this.token;

        this._atrasos.deleteAtraso(this.eliminar).subscribe(res => {
          if (res.data) {
            this.toastSuccess("Atraso eliminado exitosamente");
            this.loadAtrasos();
          } else {
            this.toastError("No podemos eliminar este registro intentalo nuevamete");
            this.loadAtrasos();
          }

        });

      }
    });
  }

  reenviarNotificacion(notificacion){

    this.atraso.id_usu = notificacion.id_usuario;
    this.atraso.fecha_atr = notificacion.fecha_atr;
    this.atraso.tiempo_atr = notificacion.tiempo_atr;
    this.atraso.token = this.token;
    this.atraso.descripcion_atr = notificacion.descripcion_atr;
    this.atraso.nombre = notificacion.nombres + ' ' + notificacion.apellidos;
    this.atraso.correo = notificacion.email;
    
    this._atrasos.sendMail(this.atraso).subscribe(res=>{
      if(res.data){
        this.toastSuccess("Hemos reenviado la notificación correctamente");
      }else{
        this.toastError("Tenemos problemas para enviar la notificación");
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
      timeOut: 3000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje + '!!!', 'Advertencia', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 4000,
    });
  }


}
