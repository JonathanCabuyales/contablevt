import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoVentaI } from 'src/app/models/empleados/empleadoventa.interface';
import { UsuarioI } from 'src/app/models/usuario.interface';
import { EmpleadoService } from 'src/app/services/empleados/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogempleadosventas',
  templateUrl: './dialogempleadosventas.component.html',
  styleUrls: ['./dialogempleadosventas.component.css']
})
export class DialogempleadosventasComponent implements OnInit {

  // <!-- usuario, nombres, ciruc, direccion, email, telefono -->
  displayedColumns: string[] = ['nombres', 'ciruc', 'direccion', 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables de combo box
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  causas: any;

  listaEmpleadosVentas: UsuarioI[];

  // variable para pasar el emplado de venta
  empleadoV: EmpleadoVentaI;
  token: string;

  constructor(private _empleadosVentas: EmpleadoService,
    public dialogRef: MatDialogRef<DialogempleadosventasComponent>, @Inject(MAT_DIALOG_DATA)
    private toastr: ToastrService,
    private _cookie: CookieService) { }

  ngOnInit(): void {


    this.loadEmpleadosVentas();

    this.empleadoV = {
      id_usuario: '',
      nombres: '',
      apellidos: '',
      telefono: ''
    }
  }

  loadEmpleadosVentas(){

    this.token = this._cookie.get('token');

    this._empleadosVentas.getEmpleadosVentas(this.token).subscribe(res=>{

      if(res.data.length){
        this.listaEmpleadosVentas = res.data;
        this.dataSource = new MatTableDataSource(this.listaEmpleadosVentas);
        this.dataSource.paginator = this.paginator;
      }else{
        Swal.fire({
          icon: 'warning',
          confirmButtonColor: '#1d1d24',
          text: 'No se encuentran empleados registros.'
        });
      }
      
    });
  }

  empleadoSeleccionado(empleado: any){
    this.empleadoV.id_usuario = empleado.id_usuario;
    this.empleadoV.nombres = empleado.nombres;
    this.empleadoV.apellidos = empleado.apellidos;
    this.empleadoV.telefono = empleado.telefono
    this.dialogRef.close(this.empleadoV);
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string){
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
