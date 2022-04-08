import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ClienteI } from 'src/app/models/cliente.interface';
import { ClienteserService } from 'src/app/services/clienteser.service';
import { DialogclientesComponent } from '../dialogclientes/dialogclientes.component';

@Component({
  selector: 'app-dialogallclientes',
  templateUrl: './dialogallclientes.component.html',
  styleUrls: ['./dialogallclientes.component.css']
})
export class DialogallclientesComponent implements OnInit {

  // cargo la interfaz de la tabla 
  displayedColumns: string[] = ['cliente', 'ciruc', 'direccion', 'email', 'telefono', 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables para guardar clientes
  cliente: ClienteI;
  clientes: ClienteI[];

  constructor(public dialogRef: MatDialogRef<DialogallclientesComponent>, @Inject(MAT_DIALOG_DATA)
    private toastr: ToastrService,
    public dialog: MatDialog,
    private _cliente: ClienteserService,
    private cookieservice: CookieService) { }

  ngOnInit(): void {

    this.loadProdSer();
  }

  loadProdSer() {
    let token = this.cookieservice.get('token');

    this._cliente.getAll(token).subscribe(res => {
      this.clientes = res.data;
      this.dataSource = new MatTableDataSource(this.clientes);
      this.dataSource.paginator = this.paginator;
    });
  }

  crearCliente(){
    const dialogRef = this.dialog.open(DialogclientesComponent, {
      width: '35%'
    });

    dialogRef.afterClosed().subscribe(res => {

      console.log(res);

    });
  }

  selectCliente(cliente: ClienteI){
    this.dialogRef.close(cliente);
  }

  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 3000,
    });
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string){
     filtro = filtro.trim(); // Remove whitespace
     filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filtro;
 }

}
