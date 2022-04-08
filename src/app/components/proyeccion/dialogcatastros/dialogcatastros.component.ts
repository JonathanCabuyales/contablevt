import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CatastroI } from 'src/app/models/catastros.interface';
import { BdemapaService } from 'src/app/services/bdemapa.service';
import { CatastrosService } from 'src/app/services/catastros.service';
import { CatastrosfireService } from 'src/app/services/catastrosfire.service';

@Component({
  selector: 'app-dialogcatastros',
  templateUrl: './dialogcatastros.component.html',
  styleUrls: ['./dialogcatastros.component.css']
})
export class DialogcatastrosComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'nombre', 'cantidad', 'precio'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listaCastros: CatastroI[];

  constructor(public dialog: MatDialog,
    private _catastrosFire: CatastrosfireService,
    private _emapa: BdemapaService) { }

  ngOnInit(): void {
    this.loadCatastros();
  }

  loadCatastros(){

    this._catastrosFire.getcATASTRO().subscribe(res=>{
      this.listaCastros =  res;
      this.dataSource = new MatTableDataSource(this.listaCastros);
      this.dataSource.paginator = this.paginator;
    });
  }

  excel(){
    this._emapa.exportToExcel(this.listaCastros, "CatastrosFIREBASE");
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
