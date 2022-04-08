import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { PermisosService } from 'src/app/services/permisos/permisos.service';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css']
})
export class PermisosComponent implements OnInit {

  // <!-- usuario, nombres, ciruc, direccion, email, telefono -->
  displayedColumns: string[] = ['nombres', 'ciruc', 'direccion', 'email', 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  listaPermisos: any[];
  token: any;

  constructor(private _permisos: PermisosService,
    private _cookie: CookieService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = this._cookie.get('token');

    this.loadPermisos();
  }

  loadPermisos(){
    this._permisos.getPermisos(this.token).subscribe(res=>{
      
      if(res.data.length){
        this.listaPermisos = res.data;
        this.dataSource = new MatTableDataSource(this.listaPermisos);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  aprobarPermiso(permiso){
    
    permiso.token = this.token;
  
    this._permisos.aprobarPermiso(permiso).subscribe(res=>{
      
      if(res.data){
        this.toastSuccess("Hemos aprobado el permiso, mensaje de confirmación enviado");
        this.loadPermisos();
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
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
