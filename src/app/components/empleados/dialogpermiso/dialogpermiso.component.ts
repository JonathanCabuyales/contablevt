import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PermisoI } from 'src/app/models/permiso/permiso.interface';
import { LoginService } from 'src/app/services/login.service';
import { PermisosService } from 'src/app/services/permisos/permisos.service';
import { DialogconfirmacionComponent } from '../../dialogs/dialogconfirmacion/dialogconfirmacion.component';

@Component({
  selector: 'app-dialogpermiso',
  templateUrl: './dialogpermiso.component.html',
  styleUrls: ['./dialogpermiso.component.css']
})
export class DialogpermisoComponent implements OnInit {

  // <!-- descripcion, fechapedido, aprobado, fechaaprobado, acciones -->
  displayedColumns: string[] = ['descripcion', 'fechapedido', 'aprobado', 'fechaaprobado', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables para guardar el permiso
  fechapermiso: string = '';
  motivopermiso: string = '';
  fechaactual: string = '';
  id_usuario: string = '';

  // objeto para guardar el permiso
  permiso: PermisoI;
  permisoconsulta: PermisoI;
  token: string = '';

  // lista de permisos por usuario(usuario activo)
  listapermisos: any[];

  constructor(private toastr: ToastrService,
    private _cookie: CookieService,
    private _login: LoginService,
    private _permisos: PermisosService,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    this.token = this._cookie.get('token');

    this.permiso = {
      id_per: '',
      fecha_per: '',
      id_usuario: '',
      motivo_per: '',
      aprobado_per: '',
      fechaapro_per: '',
      token: ''
    }

    this.permisoconsulta = {
      id_per: '',
      fecha_per: '',
      id_usuario: '',
      motivo_per: '',
      aprobado_per: '',
      fechaapro_per: '',
      token: ''
    }

    let dia = new Date().getUTCDate();
    let mes = new Date().getMonth() + 1;
    let anio = new Date().getFullYear();

    this.fechapermiso = '';
    this.motivopermiso = '';

    if (mes < 10 && dia < 10) {
      this.fechaactual = anio + '-0' + mes + '-0' + dia;
    } else if (mes < 10) {
      this.fechaactual = anio + '-0' + mes + '-' + dia;
    } else if (dia < 10) {
      this.fechaactual = anio + '-' + mes + '-0' + dia;
    } else {
      this.fechaactual = anio + '-' + mes + '-' + dia;
    }

    this.loadPermisos();

  }

  guardarPermiso() {

    if (this.fechapermiso == '') {
      this.toastError("Debes seleccionar la fecha");
    } else if (this.motivopermiso == '') {
      this.toastError("Debes ingresar la descripción del permiso");
    } else {

      if (this.fechapermiso > this.fechaactual) {

        this._login.getuserdata(this.token).subscribe(res => {
          
          this.id_usuario = res.data.id;

          this.permiso.id_usuario = this.id_usuario;
          this.permiso.motivo_per = this.motivopermiso;
          this.permiso.fecha_per = this.fechapermiso;
          this.permiso.aprobado_per = 'NO';
          this.permiso.token = this.token;
          this.permiso.nombre = res.data.usuario;
          
          this._permisos.createPermiso(this.permiso).subscribe(res => {
            if (res.data) {
              this.fechaactual = '';
              this.motivopermiso = '';
              this.toastSuccess("Hemos creado el permiso correctamemte.");
              this.loadPermisos();
            }
          });

          this._permisos.sendMail(this.permiso).subscribe(res=>{
            if(res.data){
              this.toastSuccess("Hemos enviado la solicitud correctamente, por favor espera a su aprobación.");
              this.loadPermisos();
            }
          });


        });

      } else {
        this.toastError("Los permisos deben tener como mínimo un día de diferencia a la fecha actual");
      }

    }

  }

  loadPermisos() {

    this._login.getuserdata(this.token).subscribe(res => {

      this.permisoconsulta.id_usuario = res.data.id;
      this.permisoconsulta.token = this.token;
      
      this._permisos.getPermisosUsuario(this.permisoconsulta).subscribe(res => {
        
        if (res.data.length) {
          this.listapermisos = res.data;
          this.dataSource = new MatTableDataSource(this.listapermisos);
          this.dataSource.paginator = this.paginator;
        }
      });

    });

  }

  eliminarPermiso(permiso){

    const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
      width: '300px',
      data: 'eliminar esta solicitud'
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res) {
      
        permiso.token = this.token;
        delete permiso.apellidos;
        delete permiso.ciruc;
        delete permiso.contrasenia;
        delete permiso.create_at;
        delete permiso.direccion;
        delete permiso.email;
        delete permiso.fecha_per;
        delete permiso.fechaapro_per;
        delete permiso.fotoperfil;
        delete permiso.motivo_per;
        delete permiso.nombres;
        delete permiso.rol;
        delete permiso.sueldo;
        delete permiso.telefono;
        delete permiso.tipocontrato;
        delete permiso.usuario;
        delete permiso.aprobado_per;

        this._permisos.deletePermiso(permiso).subscribe(res=>{
          if(res.data){
            
            this.loadPermisos();
            this.toastSuccess("Hemos borrado exitosamente el registro !!!");
          }else{
            this.toastError("Tenemos problemas para borrar el registro, intentalo nuevamente");
          }
        });
        
      }

    });

  }

  reenviarPermiso(permiso){

  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success(mensaje, 'Exito', {
      timeOut: 5000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 5000,
    });
  }

}
