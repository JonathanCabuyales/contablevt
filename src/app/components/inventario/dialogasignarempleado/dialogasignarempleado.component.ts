import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ActualizarstockI } from 'src/app/models/inventario/actualizarstock.interface';
import { InventarioI } from 'src/app/models/inventario/inventario.interface';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { UsuarioI } from 'src/app/models/usuario.interface';
import { InventarioService } from 'src/app/services/inventario.service';
import { UsuarioserService } from 'src/app/services/usuarioser.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dialogasignarempleado',
  templateUrl: './dialogasignarempleado.component.html',
  styleUrls: ['./dialogasignarempleado.component.css']
})
export class DialogasignarempleadoComponent implements OnInit {

  // <!-- usuario, nombres, ciruc, direccion, email, telefono -->
  displayedColumns: string[] = ['nombres', 'stock', 'asignar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaEmpleados: UsuarioI[];
  // cantidad
  cantidad: number;

  // variables para el inventario
  inventarioEmpleado: InventarioI;
  actProser: any;
  token: any;

  constructor(public dialogRef: MatDialogRef<DialogasignarempleadoComponent>, @Inject(MAT_DIALOG_DATA)
  public item: ProsernuevoI,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _empleado: UsuarioserService,
    private _inventario: InventarioService,
    private _cookie: CookieService) { }

  ngOnInit(): void {
    this.loadEmpleados();
    this.inventarioEmpleado = {
      id_usuario: 0,
      id_proser: 0,
      stockasignado_inv: 0,
      stockentregado_inv: 0,
      proyectos_inv: ''
    }

    this.actProser = this.item;

  }

  loadEmpleados() {

    this.token = this._cookie.get("token");

    this._empleado.getAllEmpleados(this.token).subscribe(res => {
      if (res.data.length) {
        this.listaEmpleados = res.data;
        this.dataSource = new MatTableDataSource(this.listaEmpleados);
        this.dataSource.paginator = this.paginator;
      } else {
        this.toastError("No existen datos registrados");
      }

    });
  }

  // seccion para crear asignacion de inventario
  asignar(empleado) {

    let stock = this.item.cantidad_proser;

    if (this.cantidad == 0 || this.cantidad == null) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Debe ingresar el stock para continuar'
      });
    } else if (this.cantidad > stock) {
      Swal.fire({
        icon: 'warning',
        confirmButtonColor: '#1d1d24',
        text: 'Stock insuficiente no se puede asignar, intente nuevamente'
      });
    } else {

      this.inventarioEmpleado.id_proser = this.item.id_proser;
      this.inventarioEmpleado.id_usuario = empleado.id_usuario;
      this.inventarioEmpleado.stockasignado_inv = this.cantidad;

      let stockNuevo = this.item.cantidadfinal_proser - this.cantidad;

      if (stockNuevo == 0) {
        Swal.fire({
          icon: 'warning',
          confirmButtonColor: '#1d1d24',
          text: 'Recuerde que ya no dispone de stock de este item!!!!!!'
        });

        this.actProser.cantidadfinal_proser = stockNuevo;

        this._inventario.createInvetario(this.inventarioEmpleado).subscribe(res => {
          if (res['resultado'] == 'OK') {
            this.toastSuccess("asignado");
            this.dialogRef.close(this.actProser);
          }
        }, error => {
          this.toastError(error);
        });

      } else {

        this.actProser.cantidadfinal_proser = stockNuevo;

                    this.dialogRef.close(this.actProser);

        this._inventario.createInvetario(this.inventarioEmpleado).subscribe(res => {
          if (res['resultado'] == 'OK') {
            this.toastSuccess("asignado");
            this.dialogRef.close(this.actProser);
          }
        }, error => {
          this.toastError(error);
        });

      }
    }

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

  toastError(mensaje: string) {
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}