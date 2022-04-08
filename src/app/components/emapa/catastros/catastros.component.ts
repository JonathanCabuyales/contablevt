import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CatastroI } from 'src/app/models/catastros.interface';
import { BdemapaService } from 'src/app/services/bdemapa.service';
import { CatastrosService } from 'src/app/services/catastros.service';

@Component({
  selector: 'app-catastros',
  templateUrl: './catastros.component.html',
  styleUrls: ['./catastros.component.css']
})
export class CatastrosComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'categoria', 'descripcion', 'cantidad', 'precio'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaCatastros: CatastroI[];
  listaNombres: any[];

  constructor(private _catastro: CatastrosService,
    private _bdemapa: BdemapaService) { }

  ngOnInit(): void {
    this.loadCatastros();
    // this._catastro.getNombres().subscribe(res=>{
    //   console.log(res);
      
    //   this.listaNombres = res;
    // });
  }

  loadCatastros(){
    this._catastro.getAll().subscribe(res=>{

      this.listaCatastros = res;      
      this.dataSource = new MatTableDataSource(this.listaCatastros);
      this.dataSource.paginator = this.paginator;
    });
  }

  // excel2(){
  //   let dia = new Date().getDay();
  //   let mes = new Date().getMonth();
  //   let anio = new Date().getFullYear();

  //   let hora = new Date().getHours();
  //   let min = new Date().getMinutes();
  //   let seg = new Date().getSeconds();

  //   this._bdemapa.exportToExcel(this.listaNombres, "Catastro__" + 
  //   anio + '_' + mes + '_' + dia + '_' + hora + '_' + min + '_' + seg);
  // }

  excel(){
    
    let dia = new Date().getDay();
    let mes = new Date().getMonth();
    let anio = new Date().getFullYear();

    let hora = new Date().getHours();
    let min = new Date().getMinutes();
    let seg = new Date().getSeconds();

    this._bdemapa.exportToExcel(this.listaCatastros, "Catastro__" + 
    anio + '_' + mes + '_' + dia + '_' + hora + '_' + min + '_' + seg);

  }


  // funcion para filtro de busqueda
  applyFilter(filtro: string) {
    if (filtro == '' || filtro == null) {
    } else {
      filtro = filtro.trim(); // Remove whitespace
      filtro = filtro.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.dataSource.filter = filtro;
    }
  }

}
