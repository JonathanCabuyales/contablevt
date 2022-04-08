import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { DialogproveedorComponent } from '../dialogproveedor/dialogproveedor.component';

@Component({
  selector: 'app-dialogproveedorescompras',
  templateUrl: './dialogproveedorescompras.component.html',
  styleUrls: ['./dialogproveedorescompras.component.css']
})
export class DialogproveedorescomprasComponent implements OnInit {

  // cargo la interfaz de la tabla 
  displayedColumns: string[] = ['razonsocial', 'ciruc', 'direccion', 'email', 'telefono', 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  token: string = '';

  listaProveedores: any[];

  showseleccionar: boolean;

  constructor(public dialogRef: MatDialogRef<DialogproveedorescomprasComponent>, @Inject(MAT_DIALOG_DATA)
  private toastr: ToastrService,
    public dialog: MatDialog,
    private _proveedor: ProveedoresService,
    private _cookie: CookieService) { }

  ngOnInit(): void {

    // if(this.verificar){
    //   this.showseleccionar = true;
    // }else{
    //   this.showseleccionar = false;
    // }

    this.token = this._cookie.get("token");

    this.listaProveedores = [];

    this.loadProveedores();

  }

  loadProveedores(){

    this._proveedor.getAll(this.token).subscribe(res=>{

      if(res.data.length){

        this.listaProveedores = res.data;
        this.dataSource = new MatTableDataSource(this.listaProveedores);
        this.dataSource.paginator = this.paginator;

      }else{
        this.toastWarning("Aun no tienes registrados proveedores.");
      }

    });
  }

  crearProveedor() {
    const dialogRef = this.dialog.open(DialogproveedorComponent, {
      width: '35%'
    });

    dialogRef.afterClosed().subscribe(res => {

      if(res != undefined){

        res.token = this.token;

        this._proveedor.createProveedor(res).subscribe(res=>{

          if(res.data){

            this.toastSuccess("Hemos guardado el proveedor con exito!!!");
            this.loadProveedores();

          } else {
            this.toastError("Tenemos problemas para registrar al proveedor por favor intentalo nuevamente");
          }

        });
      }

    });
  }
  
  selectProveedor(proveedor: any){
    this.dialogRef.close(proveedor);
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
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 4000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'Error', {
      timeOut: 4000,
    });
  }


}
