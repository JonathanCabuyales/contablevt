import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClienteI } from 'src/app/models/cliente.interface';
import { ClienteserService } from 'src/app/services/clienteser.service';
import { DialogclientesComponent } from 'src/app/components/clientes/dialogclientes/dialogclientes.component';
import { DialogconfirmacionComponent } from 'src/app/components/productosservicios/dialogconfirmacion/dialogconfirmacion.component';
import { DialognuevomedidorComponent } from 'src/app/components/clientes/dialognuevomedidor/dialognuevomedidor.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  // cargo la interfaz de la tabla 
  displayedColumns: string[] = ['estadocli', 'cliente', 'ciruc', 'direccion', 'email', 'telefono', 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild('nuevaconexion', { static: false }) nuevaconexion: DialognuevomedidorComponent;

  active = 0;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables para guardar clientes
  cliente: ClienteI;
  clientes: ClienteI[];

  // variable para el token
  token: string = '';

  constructor(public dialog: MatDialog,
    public _cliente: ClienteserService,
    private toastr: ToastrService,
    private cookieservice: CookieService) { }

  ngOnInit(): void {
    this.token = this.cookieservice.get('token');

    this.loadClientes();
  }

  loadClientes() {
    this._cliente.getAll(this.token).subscribe(res => {

      if(res.data){
        this.clientes = res.data;
        this.dataSource = new MatTableDataSource(this.clientes);
        this.dataSource.paginator = this.paginator;
      }else{
        this.toastError("No hemos encontrado registros de clientes, intentalo más tarde");
      }
      
    });

  }

  onTabChange(e) {
    if(e == 0){
      this.loadClientes();
    }else if(e == 1){
      this.nuevaconexion.ngOnInit();
    }
  }

  // Abrir dialogo para agregar cliente a la base de datos
  createCliente() {

    const dialogRef = this.dialog.open(DialogclientesComponent, {
      width: '450px'
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        this.cliente = res;
        this.cliente.token = this.token;
        
        this._cliente.createCliente(this.cliente).subscribe(datos => {
          if (datos.data) {
            this.loadClientes();
            this.toastSuccess("grabado");
          }
        });
      }
    });

  }

  // abro el dialogo para editar los clientes cargando la informacion
  editCliente(clienteUpdate: ClienteI) {
    const dialogRef = this.dialog.open(DialogclientesComponent, {
      width: '450px',
      data: clienteUpdate
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {
        this.cliente = res;
        this.cliente.token = this.token;

        this._cliente.updateCliente(this.cliente).subscribe(datos => {
          
          if (datos.data) {
            this.loadClientes();
            this.toastSuccess("actualizado");
          }
        });

      }
    });

  }
  
  // elimino el cliente con el campo id
  deleteCliente(idCliente: any) {
    // eliminar los clientes
    const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
      width: '350px'
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      if (res != undefined) {        
        this._cliente.deleteCliente(idCliente).subscribe(res => {
          if (res['resultado']=='OK') {
            this.loadClientes();
            this.toastSuccess("borrado");
          }
        });
      }
    });
  }
  
  // mensaje de confirmacion al realizar un registro, actualiza o elimniar
  toastSuccess(mensaje: string) {
    this.toastr.success('Registro ' + mensaje + ' exitosamente!!!', 'Exito', {
      timeOut: 3000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'Error', {
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
