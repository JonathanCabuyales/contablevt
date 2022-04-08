  import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { DepreciacionI } from 'src/app/models/depreciacion/depreciacion';
import { DepreciacionService } from 'src/app/services/depreciaciones/depreciacion.service';
import { DialogcreditdepreciacionComponent } from '../dialogcreditdepreciacion/dialogcreditdepreciacion.component';

@Component({
  selector: 'app-dialogdepreciacion',
  templateUrl: './dialogdepreciacion.component.html',
  styleUrls: ['./dialogdepreciacion.component.css']
})
export class DialogdepreciacionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  // refrescarTable: DialogdepreciacionComponent;
  dataSource: MatTableDataSource<any>;
  depreciacion: DepreciacionI;
  displayedColumns: string[] = ['usuario', 'nombres', 'valor inicial', 'depreciacion', 'editar'];
  token: any;
  listaDepreciacion: any[];
  constructor(
    private dialog: MatDialog,
    private _token: CookieService,
    private _depre: DepreciacionService
  ) {
    this.token = this._token.get('token');
   }

  ngOnInit(): void {

    this.mostrarToken();
    
  }

  createDepreciacion(){

  // abro el dialogo para registrar al nuevo empleado....
  const dialogRef = this.dialog.open(DialogcreditdepreciacionComponent, {
    width: '75vw',
    height: '50vh',
    data: {
      actualizar: false
    }
  });
  dialogRef.afterClosed().subscribe(res => {
    this.ngOnInit();
  });

  }
  applyFilter(filtro: string) {
    filtro = filtro.trim(); // Remove whitespace
    filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filtro;
  }


  mostrarToken(){
    this._depre.getDepreciaciones(this.token)
    .subscribe((resp) => {
      console.log(resp);
      if(resp.data){
        this.listaDepreciacion = resp.data;
        this.dataSource = new MatTableDataSource(this.listaDepreciacion);
        this.dataSource.paginator = this.paginator;
      }else{
        this.listaDepreciacion = [];
        this.dataSource = new MatTableDataSource(this.listaDepreciacion);
        this.dataSource.paginator = this.paginator;
      }
      
    })
    
  }


  //funciones para editar y eliminar las depreciaciones
  editDepreciacion(elemento: any){
    console.log(elemento);

    const dialoRef = this.dialog.open(DialogcreditdepreciacionComponent, {
      width: '75vw',
      height: '50vh',
      data: {
        actualizar: true,
        elemento
      }
    });

    dialoRef.afterClosed().subscribe((resp) =>{
      this.ngOnInit();
    })
    
  }

  eliminar(elemento: any){
    console.log(elemento);
    

    this._depre.deleteDepreciacion(elemento.id_dep)
    .subscribe((resp) =>{
      console.log(resp);
      this.ngOnInit();  
      
    })
    
  }

}
