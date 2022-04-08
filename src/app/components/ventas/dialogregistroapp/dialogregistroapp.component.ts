import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NovedadreporteI } from 'src/app/models/novedadreporte.interface';
import { NovedadesService } from 'src/app/services/novedades.service';

@Component({
  selector: 'app-dialogregistroapp',
  templateUrl: './dialogregistroapp.component.html',
  styleUrls: ['./dialogregistroapp.component.css']
})
export class DialogregistroappComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'categoria', 'descripcion', 'cantidad', 'precio'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaNovedadReporte: NovedadreporteI[];
  listacomprobar: NovedadreporteI[];
  novedad: NovedadreporteI;
  arregloExcel: NovedadreporteI[];
  urlImagenes: any[];

  dia: any;
  mes: any;
  anio: any;
  fechaFront: any;

  // variables de combo box
  opcionSeleccionado: string = '0';
  verSeleccion: string = '';
  causas: any;

  textoBuscar: String = '';

  constructor(private _novedad : NovedadesService) { }

  ngOnInit(): void {
    this.loadNovedades();
  }

  loadNovedades(){
    this._novedad.getNovedades().subscribe(res => {      
      this.listaNovedadReporte = res;      
      this.dataSource = new MatTableDataSource(this.listaNovedadReporte);
      this.dataSource.paginator = this.paginator;   
    });
  }

  // funcion para filtro de busqueda
  applyFilter(filtro: string){
    if(filtro == '' || filtro == null){
    }else{
     filtro = filtro.trim(); // Remove whitespace
     filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
     this.dataSource.filter = filtro;
    }
 }
  
}
