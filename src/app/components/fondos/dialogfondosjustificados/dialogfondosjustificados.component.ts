import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FondoI } from 'src/app/models/fondos/fondo.interface';
import { FondodetallesI } from 'src/app/models/fondos/fondosdetalles.interface';
import { FondosService } from 'src/app/services/fondos/fondos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dialogfondosjustificados',
  templateUrl: './dialogfondosjustificados.component.html',
  styleUrls: ['./dialogfondosjustificados.component.css']
})
export class DialogfondosjustificadosComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'monto', 'foto', 'fechaasignacion', 'acciones'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listadetalles: any[];

  token: string = '';

  parametros = {
    id_fonjus: '',
    token: ''
  }
  constructor(public dialogRef: MatDialogRef<DialogfondosjustificadosComponent>, @Inject(MAT_DIALOG_DATA)
  public fondo: any,
    private _fondos: FondosService,
    private _cookie: CookieService) { }

  ngOnInit(): void {

    this.token = this._cookie.get('token');
    this.parametros.id_fonjus = this.fondo.id_fonjus;
    this.parametros.token = this.token;

    this.loadfondos();
  }

  loadfondos() {
    
    this._fondos.getFondojustOne(this.parametros).subscribe(res => {

      console.log(this.listadetalles);
      
      this.listadetalles = JSON.parse(res.data[0].detalles_fonjus);
      this.dataSource = new MatTableDataSource(this.listadetalles);
      this.dataSource.paginator = this.paginator;

    });


  }

}
