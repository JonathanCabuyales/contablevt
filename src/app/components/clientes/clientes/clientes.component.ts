import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ClienteI } from 'src/app/models/cliente.interface';
import { ClienteserService } from 'src/app/services/clienteser.service';
import { DialogconfirmacionComponent } from '../../productosservicios/dialogconfirmacion/dialogconfirmacion.component';
import { DialogclientesComponent } from '../dialogclientes/dialogclientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  // cargo la interfaz de la tabla 
  displayedColumns: string[] = ['cliente', 'ciruc', 'direccion', 'email', 'telefono', 'editar'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // variables para guardar clientes
  cliente: ClienteI;
  clientes: ClienteI[];

  constructor(public dialog: MatDialog,
    public _cliente: ClienteserService,
    private toastr: ToastrService,
    private cookieservice: CookieService) { }

  ngOnInit(): void {
    this.loadProdSer();
  }

  loadProdSer() {
    let token = this.cookieservice.get('token');

    console.log(token);
    
    
    this._cliente.getAll(token).subscribe(res => {
      this.clientes = res;
      console.log(res);
      
      // this.dataSource = new MatTableDataSource(this.clientes);
      // this.dataSource.paginator = this.paginator;
    });

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
        console.log(this.cliente);
        
        this._cliente.createCliente(this.cliente).subscribe(datos => {
          if (datos['resultado'] == 'OK') {
            this.loadProdSer();
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
        this._cliente.updateCliente(this.cliente).subscribe(datos => {
          
          if (datos['resultado'] == 'OK') {
            this.loadProdSer();
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
            this.loadProdSer();
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

  // funcion para filtro de busqueda
  applyFilter(filtro: string){
     filtro = filtro.trim(); // Remove whitespace
     filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filtro;
 }

}
