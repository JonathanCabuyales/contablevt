import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FirmasService } from 'src/app/services/firmas/firmas.service';
import { DialogconfirmacionComponent } from '../../dialogs/dialogconfirmacion/dialogconfirmacion.component';

@Component({
  selector: 'app-dialogfirmas',
  templateUrl: './dialogfirmas.component.html',
  styleUrls: ['./dialogfirmas.component.css']
})
export class DialogfirmasComponent implements OnInit {

   // cargo la interfaz de la tabla 
   displayedColumns: string[] = ['usuario', 'fecha', 'imagen', 'editar'];
   dataSource: MatTableDataSource<any>;
 
   @ViewChild(MatPaginator) paginator: MatPaginator;
 
   token: string = '';
 
   listaFirmas: any[];
 
   showseleccionar: boolean;

   
  constructor(private _firmas: FirmasService,
    private _cookie: CookieService,
    public dialog: MatDialog,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.token = this._cookie.get("token");
    this.loadFirmas();
  }


  loadFirmas(){
    this._firmas.getFirmas(this.token).subscribe(res=>{
            
      if (res.data.length) {
        this.listaFirmas = res.data;
        this.dataSource = new MatTableDataSource(this.listaFirmas);
        this.dataSource.paginator = this.paginator;
      } else {
        this.listaFirmas = [];
        this.dataSource = new MatTableDataSource(this.listaFirmas);
        this.dataSource.paginator = this.paginator;
      }
      
    });
  }

  deleteItem(element){

    // eliminar los clientes
    const dialogRef = this.dialog.open(DialogconfirmacionComponent, {
      width: '350px',
      data: 'eliminar este registro'
    }
    );

    dialogRef.afterClosed().subscribe(res => {

      let firma = {
        token: '',
        id_fir: ''
      }

      firma.token = this.token;
      firma.id_fir = element.id_fir;

      if (res != undefined) {        
        this._firmas.deleteFirmas(firma).subscribe(res => {
          
          if (res.data) {
            this.toastSuccess("Registro borrado correctamente");
            this.loadFirmas();
          }else{
            this.toastError("Tenemos problemas para eliminar este registro intentalo nuevamente");
          }
        });
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
      timeOut: 5000,
    });
  }

  toastWarning(mensaje: string) {
    this.toastr.warning(mensaje, 'Advertencia', {
      timeOut: 5000,
    });
  }

  toastError(mensaje: string) {
    this.toastr.error(mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}
