import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { NotasService } from 'src/app/services/notas/notas.service';
import { DialogeditnotaComponent } from '../dialogeditnota/dialogeditnota.component';

@Component({
  selector: 'app-dialognota',
  templateUrl: './dialognota.component.html',
  styleUrls: ['./dialognota.component.css']
})
export class DialognotaComponent implements OnInit {

  displayedColumns: string[] = ['descripcion', 'cantidad'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  listanotas: any[];

  nota = {
    descripcion_nota: '',
    token: ''
  }

  token: string = '';

  constructor(private toastr: ToastrService,
    private _cookie: CookieService,
    private _nota: NotasService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.token = this._cookie.get("token");

    this.loadNotas();

  }

  loadNotas() {
    this._nota.getAll(this.token).subscribe(res => {

      console.log(res);
      
      if (res.data.length) {
        this.listanotas = res.data;
        this.dataSource = new MatTableDataSource(this.listanotas);
        this.dataSource.paginator = this.paginator;
      } else {
        this.toastWarning("No tenemos notas registradas");
        this.listanotas = [];
        this.dataSource = new MatTableDataSource(this.listanotas);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  limpiar() {
    this.nota.descripcion_nota = '';
  }

  guardarNota() {

    if (this.nota.descripcion_nota == '' || this.nota.descripcion_nota == null) {
      this.toastError("No tenemos nada por guardar");
    } else {

      this.nota.token = this.token;

      this._nota.createNota(this.nota).subscribe(res => {
        if (res.data) {
          this.loadNotas();
          this.toastSuccess("Hemos guardado la nota correctamente");
          this.nota.descripcion_nota = '';
        }
      });
    }

  }

  editNota(nota) {
    
    const dialogRef = this.dialog.open(DialogeditnotaComponent, {
      width: '50%',
      data: nota
    });

    dialogRef.afterClosed().subscribe(res => {

      console.log(res);
      
      if (res != undefined) {
        res.token = this.token;

        this._nota.editnota(res).subscribe(res=>{
          if(res.data){
            this.loadNotas();
            this.toastSuccess("Nota editada");
          }else{
            this.toastError("Tenemos problemas para editar la nota intenalo nuevamente");
          }
        });
      }

    });

  }

  eliminarNota(nota) {

    nota.token = this.token;

    this._nota.deleteNota(nota).subscribe(res => {
      if (res.data) {
        this.toastSuccess("Hemos borrado la nota correctamente");
        this.loadNotas();
      } else {
        this.toastWarning("No hemos podido eliminar la nota intentalo nuevamente");
      }
    });
  }

  // guardarNotaEditada(){

  // }

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
    this.toastr.error('Ha ocurrido un problema, intentelo nuevamente más tarde ' + mensaje, 'ERROR', {
      timeOut: 3000,
    });
  }

}