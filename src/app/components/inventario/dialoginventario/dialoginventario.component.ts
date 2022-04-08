import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProsernuevoI } from 'src/app/models/prosernuevo.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ProdservService } from 'src/app/services/prodserv.service';
import { DialogasignarempleadoComponent } from '../dialogasignarempleado/dialogasignarempleado.component';
import { DialogProSerComponent } from '../../productosservicios/dialog-pro-ser/dialog-pro-ser.component';
import { DialogconfirmacionComponent } from '../../productosservicios/dialogconfirmacion/dialogconfirmacion.component';
import { CookieService } from 'ngx-cookie-service';
import { BdemapaService } from 'src/app/services/bdemapa.service';
import { DialogeditinventarioComponent } from '../dialogeditinventario/dialogeditinventario.component';

@Component({
  selector: 'app-dialoginventario',
  templateUrl: './dialoginventario.component.html',
  styleUrls: ['./dialoginventario.component.css']
})
export class DialoginventarioComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'categoria', 'descripcion', 'cantidad', 'precio', 'asignar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables de combo box
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  causas: any;

  // interfaz para cargar todos los productos
  productosServicios: ProsernuevoI[];

  // variables para registro de un nuevo PROD/SERV
  nuevoProductoServicio: ProsernuevoI;
  prodSerAct: ProsernuevoI;
  prodSerActInv: ProsernuevoI;

  // variable para el token
  token: string = '';

  constructor(
    private _prodser: ProdservService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _cookie: CookieService,
    private _excel: BdemapaService) { }

  ngOnInit() {

    this.token = this._cookie.get('token');
    // se cargan todos los productos y servicios de la base de datos
    this.loadProdSer();
    this.nuevoProductoServicio = {
      id_proser: 0,
      codigo_proser: '',
      categoria_proser: '',
      nombre_proser: '',
      descripcion_proser: '',
      precio_proser: 0,
      cantidad_proser: 1,
      cantidadfinal_proser: 0,
      preciosugerido_proser: '',
      lote_proser: '',
      IVA_proser: '0',
      token: ''
    }
  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
  }

  // funcion para abrir el dialogo y guardar el producto o servicio
  createProSer() {
    const dialogRef = this.dialog.open(DialogProSerComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        this.nuevoProductoServicio = res;
        // this.nuevoProductoServicio.cantidadfinal_proser = this.nuevoProductoServicio.cantidad_proser;
        this.nuevoProductoServicio.token = this.token;
        // console.log(res);        

        this._prodser.createProdSer(this.nuevoProductoServicio).subscribe(res => {

          if (res.data) {
            this.toastSuccess("Registro guardado exitosamente!!!");
            this.loadProdSer();
          } else {
            this.toastError('No hemos podido registrar el item por favor intentalo más tarde');
          }

        });
      }
    });
  }

  // primero se abre el dialogo de editar y con la repuesta se actualiza 
  editarProdser(prodser) {

    console.log(prodser);


    const dialogRef = this.dialog.open(DialogeditinventarioComponent, {
      width: '550px',
      data: prodser
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res !== undefined) {

        res.token = this.token;
        this._prodser.updateProdSer(res).subscribe(res => {
          if (res.data) {
            this.toastSuccess("Hemos actualizado correctamente la información");
            this.loadProdSer();
          } else {
            this.toastError("No hemos podido actualizar la información por favor intentalo nuevamente");
          }
        });
      }

    });
  }

  deleteProdSer(id_proser: any) {
    const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
      width: '350px'
    }
    );

    dialogRef.afterClosed().subscribe(res => {
      if (res != undefined) {
        this._prodser.deleteProdSer(id_proser).subscribe(res => {
          if (res['resultado'] == 'OK') {
            this.loadProdSer();
            this.toastSuccess("borrado");
          }
        }, error => {
          this.toastError(error);
        });
      }
    });
  }

  loadProdSer() {

    this._prodser.getAll(this.token).subscribe(res => {

      if (res.data.length) {
        this.productosServicios = res.data;
        this.dataSource = new MatTableDataSource(this.productosServicios);
        this.dataSource.paginator = this.paginator;
      } else {

        this.toastError("No hemos encontrado registro de productos o servicios");

      }

    });
  }

  // seccion para asignacion de empleados
  asignarEmpleado(item: ProsernuevoI) {

    const dialogRef = this.dialog.open(DialogasignarempleadoComponent, {
      width: '600px',
      data: item
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res != undefined) {

        this.prodSerActInv = res;
        this._prodser.updateProdSer(this.prodSerActInv).subscribe(res => {
          if (res == true) {
            this.toastSuccess("El inventario general se ha actualizado exitosamenete!!!!!");
            this.loadProdSer();
          }
        }, error => {
          this.toastError(error);
        });

      }
    });

  }

  excel() {
    this._excel.exportToExcel(this.productosServicios, 'Inventario');
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

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
